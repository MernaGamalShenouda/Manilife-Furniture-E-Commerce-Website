import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideRouter(routes)]
=======
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync()]
>>>>>>> origin/Merna
};
