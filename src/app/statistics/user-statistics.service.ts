import { EventEmitter } from '@angular/core';

export class UserStatisticsService {
  private _correct = 0;
  private _wrong = 0;
  private _tries = 0;
  onStatisticsUpdate = new EventEmitter<void>();
  onShowStatistics = new EventEmitter<void>();

  constructor() {}

  incrementCorrect() {
    this._correct++;
    this.incrementTries();
  }
  incrementWrong() {
    this._wrong++;
    this.incrementTries();
  }
  private incrementTries() {
    this._tries++;
  }

  get correct(): number {
    return this._correct;
  }

  get wrong(): number {
    return this._wrong;
  }

  get tries(): number {
    return this._tries;
  }
}
