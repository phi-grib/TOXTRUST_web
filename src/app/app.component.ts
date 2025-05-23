import { ChangeDetectionStrategy, Component, OnInit, } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ManageEndpointsComponent } from './manage-endpoints/manage-endpoints.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { NewEndpointFormComponent } from './new-endpoint-form/new-endpoint-form.component';
import {MatCardModule} from '@angular/material/card';
import { ModalCreateProjectComponent } from './modal-create-project/modal-create-project.component';
import { ControlInterface, Endpoint } from './globals';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CodeComponent } from './code/code.component';
import { ReferencesComponent } from './references/references.component';
import { DocumentationComponent } from './documentation/documentation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule,ModalCreateProjectComponent,NewEndpointFormComponent,MatIconModule,CommonModule,MatInputModule,MatFormFieldModule,MatButtonModule,MainPageComponent,ManageEndpointsComponent,NavbarComponent,CodeComponent,ReferencesComponent,DocumentationComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(public endpoint: Endpoint, public controlInterface: ControlInterface){
  }
  displayNewProject: boolean = false;
  display = true;
  ngOnInit(): void {

  }
//  goHome(){
//    this.endpoint.name = "";
//    this.controlInterface.displayManageEndpoints = false;
//    this.controlInterface.displayCode = false;
//    this.controlInterface.displayReferences = false;
//    this.controlInterface.displayDocumentation = false
//  }

  title = 'toxtrust_web';
}
