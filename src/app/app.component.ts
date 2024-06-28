import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefineEndpointComponent } from './define-endpoint/define-endpoint.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DefineEndpointComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'toxtrust_web';
}
