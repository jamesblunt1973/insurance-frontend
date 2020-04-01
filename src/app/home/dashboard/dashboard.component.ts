import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';

@AutoUnsubscribe
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  clues = [];
  summury = [];
  weekly = [];
  days = ['یک شنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];

  ngOnInit() {
    this.dataService.getDashboardData().subscribe((res: any) => {

      let a = res[0];

      this.clues.push({ name: 'کل نسخه‌های ثبت شده', value: a.AllPrescriptions, status: 1 });
      this.clues.push({ name: 'نسخه‌های تایید شده', value: a.ConfirmedPrescriptions, status: 1 });
      this.clues.push({ name: 'نسخه‌های رد شده', value: a.RejectedPrescriptions, status: -1 });
      this.clues.push({ name: 'نسخه‌های در انتظار', value: a.WaitingPrescriptions, status: -1 });
      this.clues.push({ name: 'متوسط زمان بررسی', value: a.AverageCheckTime, status: 0 });

      this.summury = []
      this.summury.push({ name: 'تایید شده', value: a.ConfirmedPrescriptions });
      this.summury.push({ name: 'رد شده', value: a.RejectedPrescriptions });
      this.summury.push({ name: 'درانتظار', value: a.WaitingPrescriptions });

      var now = new Date();
      let dayNum = now.getDay();

      this.weekly = [];
      this.weekly.push({ name: this.days[(dayNum + 7) % 7], value: a.Today });
      this.weekly.push({ name: this.days[(dayNum + 6) % 7], value: a.Day1 });
      this.weekly.push({ name: this.days[(dayNum + 5) % 7], value: a.Day2 });
      this.weekly.push({ name: this.days[(dayNum + 4) % 7], value: a.Day3 });
      this.weekly.push({ name: this.days[(dayNum + 3) % 7], value: a.Day4 });
      this.weekly.push({ name: this.days[(dayNum + 2) % 7], value: a.Day5 });
      this.weekly.push({ name: this.days[(dayNum + 1) % 7], value: a.Day6 });
    });
  }

  onSelect(event) {
    console.log(event);
  }

}
