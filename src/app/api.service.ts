import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,  take,  } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Authservice } from './services/authservice';

export interface Job {
  id: number;
  title: string;
  jobDescription: string;
  company: string;
  location: string;
  jobType: string;
  createdAt: string;
  proposalsCount: number;
  companyLogo: string | null;
  salaryRange: string | null;
  jobExperience: string | null;
  jobVacancies: number | null;
  applicationDeadline: string | null;
  skillsRequired: string[] | null;
  jobBudget: string | null;
  jobCategory: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  constructor(private authService: Authservice) {}

  registerUser(myData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/registerUser`, { myData });
  }

  loginUser(myData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/loginUser`, { myData });
  }

  fetchUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/fetchUserProfile`);
  }

  updateUserProfileDp(avatar: string | null, username: string | null): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/updateUserProfileDp`, { avatar, username });
  }

  deleteAccount(password: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteAccount`, {
      body: { password },
    });
  }

  sendNotification(notification: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/notification`, { notification });
  }

  getNotification(): Observable<any> {
    let userId ='' 
     this.authService.userId$.pipe(
      take(1)).subscribe(id => {userId = id as string})
        return this.http.get(`${this.apiUrl}/users/fetchNotification`, {
          params: { userId },
        });
      
      
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/markAsRead`, { notificationId });
  }

  isFavorited(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/isFavorited`);
  }

  toggleFavorite(hasFavorited: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/toggle`, { hasFavorited });
  }

  postJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/postJob`, { jobData });
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/users/fetchJobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/users/fetchJobById/${id}`);
  }

  storeProposal(proposalData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/storeProposal`, { proposalData });
  }

  setRole(role: 'FREELANCER' | 'EMPLOYER'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/setRole`, { role });
  }
}
