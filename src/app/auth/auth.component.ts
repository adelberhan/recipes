import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorComponent } from '../shared/alert/error/error.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  // standalone: true,
  // imports: [
  //     PlaceholderDirective,
  //     NgIf,
  //     SpinnerComponent,
  //     ReactiveFormsModule,
  //     FormsModule,
  // ],
})
export class AuthComponent implements OnDestroy {
  //////////
  authObs: Observable<AuthResponseData>;
  isLogin = true;
  isLoading = false;
  error: string = null;
  isAuth = false;
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;

  endSubs: Subscription = new Subscription();

  ////////////
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver
  ) {}

  switchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isLogin) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorMessage(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  handelError() {
    this.error = null;
  }

  private showErrorMessage(message: string) {
    const alertFactory =
      this.componentFactory.resolveComponentFactory(ErrorComponent);

    const hostViewContainerRef = this.alertHost.viewContainer;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = message;
    this.endSubs = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.endSubs.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.endSubs.unsubscribe();
  }
}
