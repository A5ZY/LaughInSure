import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  refreshRequired;
  constructor(private http: HttpClient) {
    this.refreshRequired = new Subject<any>();
  }
  get refresh(){
    return this.refreshRequired;
  }
  addUserDetails(data: any) {
    if (data) {
      this.http.post('https://fake-api-hexagon-default-rtdb.firebaseio.com/posts.json', data).subscribe(()=>{
      this.refreshRequired.next('');
      }

      );
    }
  }
  getListOfInsurance() {
    return this.http.get('https://fake-api-hexagon-default-rtdb.firebaseio.com/posts.json');
  }
  deleteInsurance(id: string) {
    const url = `https://fake-api-hexagon-default-rtdb.firebaseio.com/posts/${id}.json`
    this.http.delete(url).subscribe(() =>{
      this.refreshRequired.next('');
    });
  }
  updateInsurance(id: string, data: any) {
    const url = `https://fake-api-hexagon-default-rtdb.firebaseio.com/posts/${id}.json`
    this.http.patch(url, data).subscribe(data => {
      this.refreshRequired.next('');
    });
  }
}
