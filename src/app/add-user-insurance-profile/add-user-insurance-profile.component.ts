import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FakeApiService } from '../services/fake-api.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-add-user-insurance-profile',
  templateUrl: './add-user-insurance-profile.component.html',
  styleUrls: ['./add-user-insurance-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserInsuranceProfileComponent implements OnInit {
  userInsuranceForm: FormGroup<any>;
  insurances = ['Home Insurance', 'Health Insurance', 'Life Insurance', 'Auto Insurance'];
  selectedInsurance = this.insurances[0];
  addUserDetailsModal: any;
  constructor(private cdr: ChangeDetectorRef, private fakeApi: FakeApiService, private router: Router) {
    this.userInsuranceForm = new FormGroup({
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
  }

  ngOnInit(): void {
  }
  addUserDetail() {
    this.addUserDetailsModal = new bootstrap.Modal('#userProfileModal');
    this.addUserDetailsModal.show();
  }
  selectInsurance(data: string) {
    this.selectedInsurance = data;
    this.userInsuranceForm.patchValue({
      insuranceName: this.selectedInsurance
    })
    this.cdr.markForCheck();
  }
  saveUserDetails() {
    let userDetails = this.userInsuranceForm.value;
    if (userDetails) {
      this.fakeApi.addUserDetails(userDetails);
      console.log('type', userDetails);
      this.userInsuranceForm.reset();
      this.addUserDetailsModal.hide();
      this.router.navigate(['list-insurance/list']);
    }
  }
}
