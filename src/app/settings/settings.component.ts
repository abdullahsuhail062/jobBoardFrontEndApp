import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../dark-mode.service';




@Component({
  selector: 'app-settings',
  imports: [MatIcon,CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  
    isDarkMode$!: Observable<boolean>;

  constructor(private darkModeService: DarkModeService,private dialog: MatDialog, private router: Router, private authService: Authservice){}
   ngOnInit(){
    this.isDarkMode$ = this.darkModeService.getDarkMode();
  }
  
  openEditProfileDialog() {
  const dialogRef = this.dialog.open(EditProfileComponent, {
    width: '400px',
    data: {
    
    }
  });

  }
openDeleteAccountDialog(){
const dialogRef = this.dialog.open(DeleteAccountComponent,{width: '650px', height: '250px'})



  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.dialog.closeAll()
       this.authService.logout()
      this.router.navigate(['/signin'])

    }
  });
}

toggle(){
  this.darkModeService.toggle()

}

}

  


