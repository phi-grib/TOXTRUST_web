import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlInterface, Endpoint } from '../globals';

@Component({
  selector: 'app-manage-endpoints',
  standalone: true,
  imports: [MatInputModule,MatPaginatorModule, MatTableModule,MatIconModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './manage-endpoints.component.html',
  styleUrls: ['./manage-endpoints.component.scss']
})
export class ManageEndpointsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRef: ChangeDetectorRef,private flaskService: FlaskService,private endpoint:Endpoint,private controlInterface:ControlInterface) {}

  ngOnInit(): void {
    this.flaskService.getListEndpoints().subscribe(
      (result: string[]) => {
        this.endpoint.listEndpoints = result;
        this.dataSource.data = this.endpoint.listEndpoints; // Actualiza dataSource después de recibir los datos
      },
      (error: any) => {
        console.error('Error fetching endpoints:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mapEndpointData(data:any){
    this.endpoint.compound = data.compound;
    this.endpoint.confidentiality = data.confidentiality;
    this.endpoint.description = data.description;
    this.endpoint.framework = data.framework;
  }
  selectEndpoint(endpoint_name:any){
     this.flaskService.getEndpoint(endpoint_name).subscribe(
      (result:any) => {
        console.log("se activa?")
        if(result["success"]){
          this.controlInterface.displayManageEndpoints = false;
          this.endpoint.name = endpoint_name
          this.mapEndpointData(result["data"]["endpoint"]);
          console.log(this.endpoint.name)
          console.log(this.controlInterface.displayManageEndpoints)
        }
      },
      (error:any)=> {
        console.error(error)
      }
     )
  }
}
