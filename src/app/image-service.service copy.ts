import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authservice } from './services/authservice';


@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private imageSource = new BehaviorSubject<any>(null);
  currentImage$ = this.imageSource.asObservable();

  constructor(private authService: Authservice) {
    }

  updateImage(newImageUrl: string) {
    this.imageSource.next(newImageUrl); 
  }

  

  }

