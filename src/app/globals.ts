import { Injectable } from '@angular/core';

@Injectable()
export class Endpoint {
    name: string = "";
    id: string  = "";
    compound: string = ""
    confidentiality: string = "";
    description: string = "";
    framework: string = "";
    listEndpoints : string[] = []
    maxUncertainty: number = 0;
    minBelief: number = 0;
    combinationPath: any;
    options:any;
    probabilities: any;
    decisions: any;
    rule: any;
    autorule: any
    woe: any;
    inagakiScale: any
    shouldCombine:any
}

export class ControlInterface {
    displayManageEndpoints = false;
    displayCode = false;
    displayReferences = false;
    displayDocumentation = false;
}