import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ManageEndpointsComponent } from './manage-endpoints/manage-endpoints.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { NewEndpointFormComponent } from './new-endpoint-form/new-endpoint-form.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';
import { ControlInterface, Endpoint } from './globals';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule,ModalCreateProjectComponent,NewEndpointFormComponent,MatIconModule,CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,ManageEndpointsComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(public endpoint: Endpoint, public controlInterface: ControlInterface){
  }
  displayNewProject: boolean = false;
  displayManageEndpoints: boolean = false;
  readonly panelOpenState = signal(false);
  display = true;
  ngOnInit(): void {

  }
  openLink(){
    window.open('https://github.com/phi-grib/toxtrust')
  }
  openNewProject() {
    this.endpoint.name = ""
    this.controlInterface.displayManageEndpoints = false;
    this.dialog.open(ModalCreateProjectComponent, {
      height: '400px',
      width: '600px',
    });
  }

  // <button mat-button (click)="openDialog()">Launch dialog</button>
  openManageEndpoints(){
    this.endpoint.name = ""
    this.controlInterface.displayManageEndpoints = true;
  }

  title = 'toxtrust_web';
}

