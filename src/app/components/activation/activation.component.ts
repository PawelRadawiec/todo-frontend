import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/state/app.state';
import { Subscription } from 'rxjs';
import { selectActiveAccount } from 'src/app/store/selectors/system-user.selector';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private activeAccount: boolean;

  constructor(private store: Store<State>) {
    this.subscriptions.push(store.select(selectActiveAccount)
      .subscribe(activeAccount => {
        this.activeAccount = activeAccount;
      }))
  }

  ngOnInit() {
  }

}
