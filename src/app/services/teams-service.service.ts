import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamsServiceService {
  // headers = {
  //   apikey: "9eaa4b80-aaa5-11ec-8e22-99774a2aa8b3",
  // }

  headers = {
    headers: new HttpHeaders({
      apikey: 'b91ea370-aaad-11ec-b61e-7bc4df9e625a',
      'Access-Control-Allow-Headers': 'Content-Type',
      // "Content-Type": "application/json",
      // "continent":"Europe",
    }),
  };

  constructor(private http: HttpClient) {}



  getPlayers() {
    return this.http.get(
      'https://api.soccersapi.com/v2.2/players/?user=tmosh8&token=c7544864e85005a1b41a6282039529a3&t=list&country_id=4'
    );
  }

  // https://api.soccersapi.com/v2.2/players/?user=null&token=null&t=info&id=13185

  // https://api.soccersapi.com/v2.2/leagues/?user=tmosh8&token=c7544864e85005a1b41a6282039529a3&t=list

  // https://api.soccersapi.com/v2.2/countries/?user={{USERNAME}}&token={{TOKEN}}&t=info&id=4
  // https://api.soccersapi.com/v2.2/leagues/?user=null&token=null&t=list


}
