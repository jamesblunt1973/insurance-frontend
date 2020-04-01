import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { IEmployee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private uiService: UiService,
    private dialog: MatDialog
  ) { }

  frmGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  employee: IEmployee = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.employee = this.dataService.employees.find(a => a.id === id);
        if (this.employee) {
          this.frmGroup.setValue({
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            password: null,
            username: null
          });
          this.frmGroup.get('password').disable();
          this.frmGroup.get('username').disable();
        }
      }
    });
  }

  addEmployee() {

  }

}
