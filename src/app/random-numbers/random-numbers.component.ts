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

  checkUser(e: KeyboardEvent) {
    // enter pressed and user provided data?
    if (e.charCode === 13 && !isNullOrUndefined(this.userNumbers) && this.isStarted) {
      console.log('generated ' + this.generatedNumbers);
      console.log('user ' + this.userNumbers);
      // same numbers?
      const same = this.verifyNumber();
      if (same) {
        this.usService.incrementCorrect();
      } else {
        this.usService.incrementWrong();
      }
        this.usService.onStatisticsUpdate.emit();
      this.adjustLevel();
      this.userNumbers = null;
      this.generatedNumbers = this.rnService.generateNumbers();
      this.numbersVisible = true;
      // add to statistics
      // generate new
      this.onStart();
    }
  }

  onStart() {
    this.isStarted = true;
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
    if ((this.usService.tries % this.nextLevelThreshold) === 0) {
      this.rnService.increaseShowTimeout();
      this.rnService.increaseNumbersLength();
    }

    console.log('this.usService.tries: ' + this.usService.tries);
    console.log('this.rnService.min: ' + this.rnService.min);
    console.log('this.rnService.max: ' + this.rnService.max);

    console.log('msTimeout: ' + this.rnService.msTimeout);
  }

}
