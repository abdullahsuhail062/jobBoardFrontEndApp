import { Component, OnInit } from '@angular/core';
import { Authservice } from '../services/authservice';
import {MatIcon, MatIconModule} from '@angular/material/icon'
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ApiService } from '../api.service';
import { ImageServiceService } from '../image-service.service';
import { HostListener } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatMenuModule} from '@angular/material/menu'
import { Observable, take } from 'rxjs';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe,MatIcon, MatMenuModule, MatIconModule, NgClass,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string  =''
  shareVisible = false;
  imageUrl: any
  user: string = ''
  isAdmin: boolean = false;
  notifications: any[] = [];
  hasFavorited = false;
  item: [] =[]
  unreadCount = 0;
  dropdownVisible = false;
   userId: string | null = null
  
  role$: Observable<string | null>;
  constructor(private authService:Authservice,private imageService: ImageServiceService,private apiService: ApiService, private router: Router, private dialog: MatDialog){
  this.role$ = authService.role$;
  }
  
  

  
  
  
    ngOnInit(): void {      
    this.getFavoriteStatus()     
    this.loadNotification()
      const token = this.authService.getToken()
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isAdmin = payload?.isAdmin || false;}
  
    this.apiService.fetchUserProfile().subscribe({next: (data) => {
      this.imageService.updateImage(data.user.avatar)}})
       this.imageService.currentImage$.subscribe({next: (url) => {
   if (url) {this.imageUrl = url;}}})
     this.apiService.fetchUserProfile().subscribe({next: (data) => {
      if (data.user !== null) {
      this.user =data.user.email}}})}
      loadNotification(){
      this.apiService.getNotification().subscribe({next: (response) => {
      this.notifications = response.notification;
      this.unreadCount = response.notification.length;
      this.updateUnreadCount()}})}

      toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;}
     

  markAsRead(notificationId: number) {
    this.authService.userId$.pipe(take(1)).subscribe(id => {this.userId = id})
    this.apiService.markAsRead(notificationId).subscribe(() => {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification && !notification.readBy.includes(this.userId)) {
        notification.readBy.push(this.userId);
        this.updateUnreadCount();}});}

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.readBy.includes(this.userId)).length;}



  
    
  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn') && !target.closest('.dropdown-menu')) {
      this.dropdownVisible = false;}}
   
  
    

  openProfileDialog(): void{
  const dialogRef = this.dialog.open(ProfileDialogComponent, {data: this.user,width: '250px', height: '330px',panelClass: 'dialog-slide-in',
  position: { right: '5px', top: '60px' }, // Initial right alignment
  disableClose: false})}
  navigateToAdmin(){
  this.router.navigate(['/admin-notification'])}


toggleShareVisibility(){
this.shareVisible = true}

      
toggle() {
  const toggleValue = this.toggleFavoriteStatus()
  this.apiService.toggleFavorite(toggleValue).subscribe({next: (res)=> {
  const {hasFavorited} = res    
  this.hasFavorited = hasFavorited}});}

toggleFavoriteStatus(): boolean {
  this.hasFavorited = !this.hasFavorited;
  return this.hasFavorited}

getFavoriteStatus(){
   this.apiService.isFavorited().subscribe(response => {
      const {hasFavorited} = response
    this.hasFavorited = hasFavorited;});}

  


    }

    
