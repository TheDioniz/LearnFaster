import { Component, Input, OnInit } from '@angular/core';
import { UserStatisticsService } from '../user-statistics.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  correct = 0;
  wrong = 0;
  tries = 0;
  statistics = false;

  constructor(private usService: UserStatisticsService) { }

  ngOnInit() {
    this.usService.onStatisticsUpdate.subscribe(() => {
      this.updateStats();
    });

    this.usService.onShowStatistics.subscribe(() => this.statistics = !this.statistics);
  }

  updateStats() {
    this.correct = this.usService.correct;
    this.wrong = this.usService.wrong;
    this.tries = this.usService.tries;
  }

}
