import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private endSubs: Subscription;
  constructor(
    private httpRes: DataStorageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.endSubs = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onSaveData() {
    this.httpRes.storeRecipes();
  }
  onFetchData() {
    this.httpRes.fetchData().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.endSubs.unsubscribe();
  }
}
