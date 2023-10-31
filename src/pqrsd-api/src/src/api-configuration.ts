/* tslint:disable */

import { Injectable } from "@angular/core";


/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  //rootUrl: string = 'http://localhost:8086/PQRSD';
  //rootUrl: string = 'https://192.168.195.208:8443/PQRSD';// antiguo
  //rootUrl: string = 'http://192.168.195.208:8280/PQRSD';
  rootUrl: string = 'https://192.168.195.200:18543/PQRSD';

}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
