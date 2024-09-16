import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/styles.css/app.config';
import { AppComponent } from './app/styles.css/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
