import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { TodoService } from './services/todo-service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { CounterComponent } from './components/counter/counter.component';
import { CountByComponent } from './components/count-by/count-by.component';
import { EffectsModule } from '@ngrx/effects';
import { DemoEffects } from './effects/demo.effect';
import { CounterEffects } from './effects/counter.effects';
import { BooksModule } from './features/books/books.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DashboardComponent,
    NavComponent,
    CounterComponent,
    CountByComponent
  ],
  imports: [
    BrowserModule,
    BooksModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      DemoEffects,
      CounterEffects
    ])
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
