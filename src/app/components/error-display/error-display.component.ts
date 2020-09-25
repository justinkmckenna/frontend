import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { featureErrorCleared } from 'src/app/actions/app.actions';
import { AppState, selectErrorMessage, selectHasError } from 'src/app/reducers';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {

  hasErrors$ : Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.hasErrors$ = this.store.pipe(select(selectHasError));
    this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
  }

  dismiss(): void {
    this.store.dispatch(featureErrorCleared());
  }
}
