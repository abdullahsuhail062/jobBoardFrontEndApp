import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatDialogActions} from '@angular/material/dialog'
import {MatDialogContent} from '@angular/material/dialog'
import { MatFormField } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Authservice } from '../services/authservice';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';
import { SettingsComponent } from '../settings/settings.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';


MAT_DIALOG_DATA
@Component({
  selector: 'app-profile-dialog',
  imports: [FormsModule,MatDividerModule, MatListModule,
    MatIconModule
  ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
  
})
export class ProfileDialogComponent  {



  constructor(    private dialogRef: MatDialogRef<ProfileDialogComponent>
,private dialog: MatDialog,private router: Router,private authService: Authservice,public matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {email: string, name: string, avatar: any, dashboard: any, setting: any}){}




  openLogoutDialog(): void {
    const confirmDialog = this.dialog.open(ConfirmLogoutDialogComponent,  {width: '500px', height: '200px'});
    
    

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout();
        this.dialogRef.close()
        this.router.navigate(['/signin'])
      }
    });

}

openSettingsDialog(){
  const settingsDialog = this.dialog.open(SettingsComponent, {width: '250px', height: '210px',
  position: { right: '100px', top: '60px'}})}

navigateToDashboard(){
  this.dialogRef.close()
  this.router.navigate(['/dashboard'])


}

openHelpDialog(){

  this.dialog.open(HelpDialogComponent,{width: '500px',height:'400px'})

}


}
