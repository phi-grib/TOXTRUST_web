import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlaskService } from '../flask.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-manage-endpoints',
  standalone: true,
  imports: [MatInputModule,MatPaginatorModule, MatTableModule,MatIconModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './manage-endpoints.component.html',
  styleUrls: ['./manage-endpoints.component.scss']
})
export class ManageEndpointsComponent implements OnInit, AfterViewInit {
  endpoints: string[] = [];
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private flaskService: FlaskService) {}

  ngOnInit(): void {
    this.flaskService.getListEndpoints().subscribe(
      (result: string[]) => {
        this.endpoints = result;
        this.dataSource.data = this.endpoints; // Actualiza dataSource después de recibir los datos
      },
      (error: any) => {
        console.error('Error fetching endpoints:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
