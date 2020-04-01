import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UiService } from '../../core/ui.service';
import { ILogin } from '../../shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  model: ILogin = {
    password: '',
    username: ''
  };

  loading = false;

  constructor(private authService: AuthService, private uiService: UiService, private router: Router) { }

  login(loginForm) {
    if (loginForm.valid) {
      this.loading = true;
      this.authService.login(this.model).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.fullName);
        localStorage.setItem('insuranceName', res.insuranceName)
        this.authService.changeUserStatus(res.fullName);
        this.router.navigate(['']);
        this.loading = false;
      }, error => {
          this.loading = false;
          console.log(error);
          this.uiService.showErrorSnack('نام کاربری یا کلمه عبور اشتباه است');
      });
    }
  }

}
