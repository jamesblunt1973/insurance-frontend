import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { IPharmacy } from '../../shared/models/pharmacy.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pharmacies: IPharmacy[] = [];
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    let sub = this.dataService.getPharmacies().subscribe(res => {
      this.loading = false;
      this.pharmacies = res;
    });
    this.subscriptions.push(sub);
  }

  addPharmacy(pharmacy: IPharmacy) {
    let sub = this.dataService.activatePharmacy(pharmacy).subscribe(res => {
      pharmacy.active = true;
    });
    this.subscriptions.push(sub);
  }

  removePharmacy(pharmacy: IPharmacy) {
    let sub = this.dataService.deactivatePharmacy(pharmacy).subscribe(res => {
      pharmacy.active = false;
    });
    this.subscriptions.push(sub);
  }

}
