import { Component } from '@angular/core';
import { UserStatisticsService } from './statistics/user-statistics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserStatisticsService]
})
export class AppComponent {
  title = 'app';
}
