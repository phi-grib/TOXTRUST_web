import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlInterface, Endpoint } from '../globals';
import { ToastrService } from 'ngx-toastr';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-manage-endpoints',
  standalone: true,
  imports: [CapitalizePipe,MatInputModule,MatPaginatorModule, MatTableModule,MatIconModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './manage-endpoints.component.html',
  styleUrls: ['./manage-endpoints.component.scss']
})
export class ManageEndpointsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'name','compound','framework','project permissions','delete'];
  dataSource = new MatTableDataSource<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastr:ToastrService,private changeDetectorRef: ChangeDetectorRef,private flaskService: FlaskService,private endpoint:Endpoint,private controlInterface:ControlInterface) {}

  ngOnInit(): void {
    this.flaskService.getListEndpoints().subscribe(
      (result: string[]) => {
        this.endpoint.listEndpoints = result;
        this.dataSource.data = this.endpoint.listEndpoints; 
      },
      (error: any) => {
        console.error('Error fetching endpoints:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteEndpoint(endpoint:any,event: MouseEvent){
    event.stopPropagation();
    this.flaskService.deleteEndpoint(endpoint.name).subscribe((result:any) => {
       if(result['success']){
        this.toastr.success(result['data'],'')
           this.flaskService.getListEndpoints().subscribe(
      (result: string[]) => {
        this.endpoint.listEndpoints = result;
        this.dataSource.data = this.endpoint.listEndpoints; 
      },
      (error: any) => {
        console.error('Error fetching endpoints:', error);
      }
    );

       }else{
        this.toastr.error(result['data'],'')

       }
    })
  }
  mapSettingData(data:any){
    this.endpoint.maxUncertainty = data.decision.maxUncertainty
    this.endpoint.minBelief = data.decision.minBelief
    this.endpoint.rule = data.combination.rule
    this.endpoint.autorule = data.combination.autoRule
    this.endpoint.woe = data.combination.woe
    this.endpoint.inagakiScale = String(data.combination.inagakiScale)
  }
  mapOptionsData(data:any){

    this.endpoint.options = data

  }
  mapShouldCombine(data:any){
    this.endpoint.shouldCombine = data;
  }
  mapEndpointData(data:any){
    this.endpoint.compound = data.compound;
    this.endpoint.confidentiality = data.confidentiality;
    this.endpoint.description = data.description;
    this.endpoint.framework = data.framework;
  }

  refreshData(){
    this.endpoint.compound = "";
    this.endpoint.framework = "";
    this.endpoint.description = "";
    this.endpoint.confidentiality = ""; 
  }

  selectEndpoint(endpoint:any){
    this.refreshData();
     this.flaskService.getEndpoint(endpoint.name).subscribe(
      (result:any) => {
        if(result["success"]){
          this.controlInterface.displayManageEndpoints = false;
          this.endpoint.name = (endpoint.name)
          this.mapSettingData(result["data"]['options'])
          this.endpoint.decisions = result['data']['decisions']
          this.mapOptionsData(result['data']['options'])
          this.endpoint.probabilities = result.data?.results[this.endpoint.name]['probabilities']
          this.mapEndpointData(result["data"]["endpoint"]);
          this.mapShouldCombine(result["data"]['options']['combination']['shouldCombine'])
        }
      },
      (error:any)=> {
        console.error(error)
      }
     )
  }
}
