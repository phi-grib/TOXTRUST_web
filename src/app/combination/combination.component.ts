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
    this.flaskService.getCombinationImagePath().subscribe((result: any) => {
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.endpoint.combinationPath = reader.result as string;
      };
    }, (e) =>
      console.log(e))

  }

}
