import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FlaskService } from './flask.service';
import { ManageEndpointsComponent } from './manage-endpoints/manage-endpoints.component';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { NewEndpointFormComponent } from './new-endpoint-form/new-endpoint-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewEndpointFormComponent,MatIconModule,MatExpansionModule,CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,ManageEndpointsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(){
  }
  displayNewProject: boolean = false;
  displayManageEndpoints: boolean = false;
  readonly panelOpenState = signal(false);
  display = true;
  ngOnInit(): void {

  }
  openNewProject() {
    this.displayNewProject = true;
    this.displayManageEndpoints = false;
  }
  openManageEndpoints(){
    this.displayNewProject = false;
    this.displayManageEndpoints = true;
  }

  title = 'toxtrust_web';
}
