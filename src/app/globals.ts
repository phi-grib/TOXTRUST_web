import { Injectable } from '@angular/core';

@Injectable()
export class Endpoint {
    name: string = "";
    id: string  = "";
    listEndpoints : string[] = []
}

export class ControlInterface {
    displayManageEndpoints = false;

}