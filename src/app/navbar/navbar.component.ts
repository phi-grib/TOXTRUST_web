import { Component,signal,inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { ControlInterface, Endpoint } from '../globals';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatExpansionModule,ModalCreateProjectComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);
  constructor(public endpoint: Endpoint,public controlInterface: ControlInterface){

  }
  displayNewProject: boolean = false;
  displayManageEndpoints: boolean = false;
  readonly panelOpenState = signal(false);
  display = true;
  menu_options = true;

  openNewProject() {
    this.endpoint.name = ""
    this.controlInterface.displayManageEndpoints = false;
    this.dialog.open(ModalCreateProjectComponent, {
      height: '400px',
      width: '600px',
    });
  }
  openManageEndpoints(){
    this.endpoint.name = ""
    this.controlInterface.displayManageEndpoints = true;
  }
  openLink(){
    window.open('https://github.com/phi-grib/toxtrust')
  }

}
