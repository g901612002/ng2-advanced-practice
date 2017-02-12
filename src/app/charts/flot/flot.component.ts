import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flot',
  templateUrl: './flot.component.html',
  styleUrls: ['./flot.component.css']
})
export class FlotComponent implements OnInit, OnDestroy {

  username: string;
  parentParams$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.parentParams$ = this.route.parent.params.subscribe(params => {
      console.log(params['username']);
    });
  };

  ngOnDestroy() {
    this.parentParams$.unsubscribe();
  };

}
