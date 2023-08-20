import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private http: HttpClient) {

  }
  addUserDetails(data: any){
    if(data){
      this.http.post('https://fake-api-hexagon-default-rtdb.firebaseio.com/posts.json', data).subscribe();
    }
  }
  getListOfInsurance(){
     return this.http.get('https://fake-api-hexagon-default-rtdb.firebaseio.com/posts.json');
  }
  deleteInsurance(id: string){
    const url = `https://fake-api-hexagon-default-rtdb.firebaseio.com/posts/${id}.json`
    this.http.delete(url).subscribe();
  }
  updateInsurance(id: string, data: any){
    const url = `https://fake-api-hexagon-default-rtdb.firebaseio.com/posts/${id}.json`
   this.http.patch(url, data).subscribe(data =>{
      console.log('update', data);
    });
  }
}
