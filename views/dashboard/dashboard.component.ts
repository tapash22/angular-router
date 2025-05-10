import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  usersData: User[] = []

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.usersData = this.authService.getAllUsers();
  }

}
