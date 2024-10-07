import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { DefineEndpointComponent } from '../define-endpoint/define-endpoint.component';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';
import { ListEvidencesComponent } from '../list-evidences/list-evidences.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DecisionSettingsComponent } from '../decision-settings/decision-settings.component';
import { SelectRuleComponent } from '../select-rule/select-rule.component';
import { CombinationComponent } from '../combination/combination.component';
@Component({
  selector: 'app-new-endpoint-form',
  standalone: true,
  imports: [CombinationComponent,AddEvidenceComponent,DefineEndpointComponent,MatStepperModule,ListEvidencesComponent,MatGridListModule,DecisionSettingsComponent,SelectRuleComponent],
  templateUrl: './new-endpoint-form.component.html',
  styleUrl: './new-endpoint-form.component.scss'
})
export class NewEndpointFormComponent {

}
