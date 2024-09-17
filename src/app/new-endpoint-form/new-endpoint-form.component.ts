import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { DefineEndpointComponent } from '../define-endpoint/define-endpoint.component';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';
import { ListEvidencesComponent } from '../list-evidences/list-evidences.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DecisionSettingsComponent } from '../decision-settings/decision-settings.component';
@Component({
  selector: 'app-new-endpoint-form',
  standalone: true,
  imports: [AddEvidenceComponent,DefineEndpointComponent,MatStepperModule,ListEvidencesComponent,MatGridListModule,DecisionSettingsComponent],
  templateUrl: './new-endpoint-form.component.html',
  styleUrl: './new-endpoint-form.component.scss'
})
export class NewEndpointFormComponent {

}
