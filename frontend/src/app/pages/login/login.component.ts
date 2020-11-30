import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../../model/UserLogin';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;
      localStorage.setItem('user', this.userLogin.nome.split(' ')[0]);
      localStorage.setItem('token', this.userLogin.token);
      localStorage.setItem('admin', String(this.userLogin.admin));

      if (this.userLogin.admin) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/carrinho']);
      }
    });
  }
}
