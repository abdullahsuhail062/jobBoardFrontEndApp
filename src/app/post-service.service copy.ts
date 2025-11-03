import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
    private apiUrl = environment.apiBaseUrl


    constructor(private http: HttpClient) {}

  getIds(): Promise<string[]> {
    return firstValueFrom(this.http.get<string[]>(`${this.apiUrl}/users/fetchJobIds`));
  }

  
}
