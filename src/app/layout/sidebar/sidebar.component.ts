import { Component, OnInit } from '@angular/core';

import { IMneuItem } from './menuItem.model';
import { UiService } from '../../core/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: IMneuItem[] = [];

  constructor(private uiService: UiService) { }

  ngOnInit() {

    this.menuItems = [{
      icon: 'view-dashboard',
      title: 'داشبورد',
      url: '/home'
    }, {
      icon: 'format-list-checks',
      title: 'نسخه‌های در دست بررسی',
      url: '/wip'
    }, {
      icon: 'archive',
      title: 'آرشیو',
      url: '/archive'
    }, {
      icon: 'settings-transfer',
      title: 'داروخانه‌ها',
      url: '/pharmacies'
    }, {
      icon: 'shape',
      title: 'مدیریت دسته‌ها',
      url: '/categories'
    }, {
      icon: 'account-multiple',
      title: 'مدیریت پرسنل',
      url: '/employees'
    }];
  }

  collapseSidebar() {
    this.uiService.changeSidebarStatus();
  }

}
