import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  Title: string = "";
  constructor(private configService : ConfigService) {

  }


  ngOnInit(): void {
  }

}
