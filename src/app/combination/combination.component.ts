import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../globals';
import { FlaskService } from '../flask.service';
import { CommonModule } from '@angular/common';
import { PlotlyGraphComponent } from '../plotly-graph/plotly-graph.component';


@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [CommonModule, PlotlyGraphComponent],
  templateUrl: './combination.component.html',
  styleUrl: './combination.component.scss'
})
export class CombinationComponent implements OnInit {
  constructor(public endpoint: Endpoint, private flaskService: FlaskService) {

  }
  ngOnInit(): void {
  }
}
