import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FlaskService } from './flask.service';
import { ManageEndpointsComponent } from './manage-endpoints/manage-endpoints.component';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { NewEndpointFormComponent } from './new-endpoint-form/new-endpoint-form.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';
import { Endpoint } from './globals';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalCreateProjectComponent,NewEndpointFormComponent,MatIconModule,MatExpansionModule,CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,ManageEndpointsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(public endpoint: Endpoint){
  }
  displayNewProject: boolean = false;
  displayManageEndpoints: boolean = false;
  readonly panelOpenState = signal(false);
  display = true;
  ngOnInit(): void {

  }
  openNewProject() {
    this.endpoint.name = ""
    this.displayManageEndpoints = false;
    this.dialog.open(ModalCreateProjectComponent, {
      height: '400px',
      width: '600px',
    });
  }

  // <button mat-button (click)="openDialog()">Launch dialog</button>
  openManageEndpoints(){
    this.endpoint.name = ""
    this.displayManageEndpoints = true;
  }

  title = 'toxtrust_web';
}

