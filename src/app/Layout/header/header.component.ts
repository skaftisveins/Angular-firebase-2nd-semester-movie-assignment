import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { MainComponent } from '../../themoviedb/main/main.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
