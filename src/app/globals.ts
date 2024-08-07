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
}

export class ControlInterface {
    displayManageEndpoints = false;

}