import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../globals';

@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [],
  templateUrl: './combination.component.html',
  styleUrl: './combination.component.scss'
})
export class CombinationComponent implements OnInit {
  constructor(public endpoint: Endpoint){

  }
  ngOnInit(): void {
    
  }

}
