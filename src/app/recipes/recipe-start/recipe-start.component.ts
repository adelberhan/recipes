import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
  // standalone: true
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  isAuth = false;
  endSubs: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.endSubs = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }
  ngOnDestroy(): void {
    this.endSubs.unsubscribe();
  }
}
