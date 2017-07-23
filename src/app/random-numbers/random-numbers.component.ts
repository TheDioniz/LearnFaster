import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { RandomNumbersService } from './random-numbers.service';
import { UserStatisticsService } from '../statistics/user-statistics.service';

@Component({
  selector: 'app-random-numbers',
  templateUrl: './random-numbers.component.html',
  styleUrls: ['./random-numbers.component.css'],
  providers: [RandomNumbersService]
})
export class RandomNumbersComponent implements OnInit {
  generatedNumbers: number;
  userNumbers: number;
  numbersVisible = true;
  isStarted = false;
  isStopped = false;
  nextLevelThreshold = 2;

  constructor(private rnService: RandomNumbersService, private usService: UserStatisticsService) {
  }

  ngOnInit() {
  }

  toggleNumbers() {
    console.log('interval ' + this.numbersVisible);
    this.numbersVisible = !this.numbersVisible;
  }

  verifyNumber() {
    return (this.userNumbers == this.generatedNumbers);
  }

  checkUserInput(e: KeyboardEvent) {
    // 'enter' pressed and user provided data?
    if (e.charCode === 13 && !isNullOrUndefined(this.userNumbers) && this.isStarted) {
      // same numbers?
      const same = this.verifyNumber();
      if (same) {
        this.usService.incrementCorrect();
      } else {
        this.usService.incrementWrong();
      }
      // adjust statistics in real time
      this.usService.onStatisticsUpdate.emit();
      // check if level needs to be adjusted
      this.adjustLevel();
      this.showNextNumbers();
    }
  }

  onStart() {
    this.isStarted = true;
    this.showNextNumbers();
  }

  private showNextNumbers() {
    // clear input of numbers each time
    this.userNumbers = null;
    // mark numbers as visible
    this.numbersVisible = true;
    this.generatedNumbers = this.rnService.generateNumbers();
    setTimeout(() => this.toggleNumbers(), this.rnService.msTimeout);
  }

  showStatistics() {
    this.usService.onShowStatistics.emit();
  }

  stopGame() {
    this.isStarted = false;
    this.isStopped = true;
    this.showStatistics();
  }

  adjustLevel() {
    // if user tried 'nextLevelTreshold' times, else do nothing
    if ((this.usService.tries % this.nextLevelThreshold) === 0) {
      this.rnService.increaseShowTimeout();
      this.rnService.increaseNumbersLength();
    }
  }

}
