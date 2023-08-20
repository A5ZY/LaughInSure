import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FakeApiService } from '../services/fake-api.service';
import { Observable } from 'rxjs';
import { map, windowWhen } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any

@Component({
  selector: 'app-insurance-details-dashboard',
  templateUrl: './insurance-details-dashboard.component.html',
  styleUrls: ['./insurance-details-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceDetailsDashboardComponent implements OnInit {
  listInsurances$!: Observable<any>;
  insurances: any;
  name!: string;
  deleteInsModal: any;
  insuranceId!: string;
  viewInsurance: any;
  viewInsModal: any;
  editInsurance: any;
  editInsModal: any;
  editInsuranceForm: FormGroup;
  insuranceTypes = ['Home Insurance', 'Health Insurance', 'Life Insurance', 'Auto Insurance'];
  selectedInsurance = '';
  editData: any;
  editInsuranceId!: string;
  constructor(private fakeApi: FakeApiService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.editInsuranceForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.required]),
      mobileNo: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      insuranceName: new FormControl(this.selectedInsurance),
      coverage: new FormControl('', Validators.required),
      insurerName: new FormControl('', Validators.required),
      nomineeName: new FormControl('', Validators.required),
      dateExpiry: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    })
    this.getData();
  }

  ngOnInit() {
  }
  getData() {
    this.listInsurances$ = this.fakeApi.getListOfInsurance().pipe(map((listInsurance: any) => {
      this.insurances = [];
      for (const lInsurance in listInsurance) {
        if (listInsurance.hasOwnProperty(lInsurance)) {
          this.insurances.push({ ...listInsurance[lInsurance], id: lInsurance })
        }
      };
      console.log(this.insurances);
      return this.insurances;
    }));
  }
  deleteInsranceModal(insData: any) {
    this.insuranceId = insData.id;
    this.deleteInsModal = new bootstrap.Modal('#deleteModal');
    this.deleteInsModal.show();
    this.name = insData.fname + '' + insData.lname;
    this.cdr.markForCheck();
  }
  deleteInsurance() {
    this.fakeApi.deleteInsurance(this.insuranceId);
    this.deleteInsModal.hide();
    this.cdr.markForCheck();
  }
  viewInsuranceModal(data: any) {
    this.viewInsurance = data;
    this.viewInsModal = new bootstrap.Modal('#viewModal');
    this.viewInsModal.show();
  }
  editInsuranceModal(eIns: any) {
    this.editInsModal = new bootstrap.Modal('#editModal');
    this.editInsModal.show();
    this.selectedInsurance = eIns.insuranceName;
    this.editInsuranceId = eIns.id;
    this.editInsuranceForm.setValue({
      fname: this.editInsuranceForm.value.fname || eIns.fname,
      lname: this.editInsuranceForm.value.lname || eIns.lname,
      email: this.editInsuranceForm.value.email || eIns.email,
      mobileNo: this.editInsuranceForm.value.mobileNo || eIns.mobileNo,
      address: this.editInsuranceForm.value.address || eIns.address,
      insuranceName: this.editInsuranceForm.value.insuranceName ? this.selectedInsurance : eIns.insuranceName,
      coverage: this.editInsuranceForm.value.coverage || eIns.coverage,
      insurerName: this.editInsuranceForm.value.insurerName || eIns.insurerName,
      nomineeName: this.editInsuranceForm.value.nomineeName || eIns.nomineeName,
      dateExpiry: this.editInsuranceForm.value.dateExpiry || eIns.dateExpiry,
      amount: this.editInsuranceForm.value.amount || eIns.amount
    });
  }
  selectInsuranceType(data: any) {
    this.selectedInsurance = data;
    this.editInsuranceForm.patchValue({
      insuranceName: this.selectedInsurance
    })
  }
  updateInsurance() {
    this.fakeApi.updateInsurance(this.editInsuranceId, this.editInsuranceForm.value);
    this.editInsuranceForm.reset();
    this.editInsModal.hide();
    this.cdr.markForCheck();
  }
}
