/* tslint:disable */

import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { PqrsdControllerService } from './services/pqrsd-controller.service';
import { NotificacionesControllerService } from './services/notificaciones-controller.service';
import { PaisesControllerService } from './services/paises-controller.service';
import { NgModule } from '@angular/core';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    PqrsdControllerService,
    NotificacionesControllerService,
    PaisesControllerService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
