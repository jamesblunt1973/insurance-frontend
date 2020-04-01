import { Component, OnInit } from '@angular/core';

import { UiService } from '../../core/ui.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuStatus = '';
  userName = '';
  insuranceName = '';

  constructor(private uiService: UiService, private authService: AuthService) { }

  ngOnInit() {
    this.uiService.getMessage().subscribe(status => {
      this.menuStatus = status;
    });
    this.authService.getUsername().subscribe(res => {
      this.userName = res[0];
      this.insuranceName = res[1];
    });
  }

  changeMenuBtn() {
    this.uiService.changeSidebarStatus();
  }

  logout() {
    this.authService.logout();
  }
}
