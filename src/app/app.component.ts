import { Component } from '@angular/core';
import { DefineEndpointComponent } from './define-endpoint/define-endpoint.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DefineEndpointComponent,MatInputModule,MatFormFieldModule,MatStepperModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'toxtrust_web';
}
