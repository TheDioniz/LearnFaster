import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserStatisticsComponent } from './statistics/user-statistics/user-statistics.component';
import { RandomNumbersComponent } from './random-numbers/random-numbers.component';

const appRoutes: Route[] = [
  {
    path: '',
    component: RandomNumbersComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserStatisticsComponent,
    RandomNumbersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
