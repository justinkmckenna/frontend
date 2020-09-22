import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { countBySet } from 'src/app/actions/counter.actions';
import { AppState, selectCountBy } from 'src/app/reducers';

@Component({
  selector: 'app-count-by',
  templateUrl: './count-by.component.html',
  styleUrls: ['./count-by.component.scss']
})
export class CountByComponent implements OnInit {

  by$: Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.by$ = this.store.pipe(select(selectCountBy));
  }

  countBySet(by: number): void {
    this.store.dispatch(countBySet({ by }));
  }

}
