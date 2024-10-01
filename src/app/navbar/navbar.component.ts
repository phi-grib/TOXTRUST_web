import { Component,signal,inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { ControlInterface, Endpoint } from '../globals';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatExpansionModule,ModalCreateProjectComponent],
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
  menu_options = true;
  hidden = false;
  toggleMenu() {
    this.menu_options = !this.menu_options;
    if (!this.menu_options) {
      setTimeout(() => {
        this.hidden = true;
      }, 300); // 
    } else {
      this.hidden = false;
    }
  }

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
