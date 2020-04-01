import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategory } from '../shared/models/category.model';
import { ICompletePrescriptionData } from '../shared/models/complete-prescription-data.model';
import { IEmployee } from '../shared/models/employee.model';
import { IEditEmployee, INewEmployee } from '../shared/models/new-employee.model';
import { IPharmacy } from '../shared/models/pharmacy.model';
import { IPrescriptionFilter } from '../shared/models/prescription-filter.model';
import { IPrescription } from '../shared/models/prescription.model';
import { IRejectPrescriptionData } from '../shared/models/reject-prescription-data.model';

@Injectable()
export class DataService {

  employees: IEmployee[] = [];

  constructor(private http: HttpClient) { }

  getDashboardData() {
    return this.http.get(environment.apiUrl + 'prescription/dashboardInfo');
  }

  getPrescriptions(model: IPrescriptionFilter) {
    return this.http.post<IPrescription[]>(environment.apiUrl + 'prescription/' + model.page + '/10', model);
  }

  getPharmacies() {
    return this.http.get<IPharmacy[]>(environment.apiUrl + 'pharmacy/1');
  }

  confirmPrescription(prescription: IPrescription) {
    return this.http.patch(environment.apiUrl + 'prescription/confirm/' + prescription.id, {});
  }

  denyPrescription(prescription: IPrescription, reason: IRejectPrescriptionData) {
    return this.http.patch(environment.apiUrl + 'prescription/reject/' + prescription.id, reason);
  }

  completePrescription(prescription: IPrescription, reason: ICompletePrescriptionData) {
    return this.http.post(environment.apiUrl + 'prescription/' + prescription.id, reason);
  }

  activatePharmacy(pharmacy: IPharmacy) {
    return this.http.put(environment.apiUrl + 'pharmacy/active/' + pharmacy.id, {});
  }

  deactivatePharmacy(pharmacy: IPharmacy) {
    return this.http.put(environment.apiUrl + 'pharmacy/deActive/' + pharmacy.id, {});
  }

  getCategories() {
    return this.http.get<ICategory[]>(environment.apiUrl + 'category/1/100');
  }

  newCategory(model: FormData, id: number) {
    return this.http.put<ICategory>(environment.apiUrl + 'category/indexes/' + id, model);
  }

  editCategory(model: FormData, id: number) {
    return this.http.patch<ICategory>(environment.apiUrl + 'category/indexes/' + id, model);
  }

  deleteCategory(model: ICategory) {
    return this.http.delete(environment.apiUrl + 'category/indexes/' + model.id);
  }

  getEmployees() {
    return this.http.get<IEmployee[]>(environment.apiUrl + 'users/employee');
  }

  deleteEmployee(id: number) {
    return this.http.delete(environment.apiUrl + 'users/employee/' + id);
  }

  newEmployee(model: INewEmployee) {
    return this.http.post(environment.apiUrl + 'users/employee', model);
  }

  editEmployee(model: IEditEmployee) {
    return this.http.patch(environment.apiUrl + 'users/employee', model)
  }
}
