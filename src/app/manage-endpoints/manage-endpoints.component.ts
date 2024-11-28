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
        console.log("list endpoints details")
        console.log(result)
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
    this.endpoint.maxUncertainty = data.options.maxUncertainty;
    
  }
  mapEndpointData(data:any){
    this.endpoint.compound = data.compound;
    this.endpoint.confidentiality = data.confidentiality;
    this.endpoint.description = data.description;
    this.endpoint.framework = data.framework;
  }
  selectEndpoint(endpoint:any){
    console.log("selectEndpoint")
    console.log(endpoint.name)
     this.flaskService.getEndpoint(endpoint.name).subscribe(
      (result:any) => {
        if(result["success"]){
          this.controlInterface.displayManageEndpoints = false;
          this.endpoint.name = (endpoint.name)
          console.log("endpoint seleccionado")
          console.log(result['data'])
          this.mapEndpointData(result["data"]["endpoint"]);
        }
      },
      (error:any)=> {
        console.error(error)
      }
     )
  }
}
