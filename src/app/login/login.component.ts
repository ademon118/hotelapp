import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  imports: [FormsModule, CommonModule, HoverDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  Login() {
    if (this.loginService.login(this.email, this.password)) {
      this.route.navigate(['/rooms']);
    }
  }
}
