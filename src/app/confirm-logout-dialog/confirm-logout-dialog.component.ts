import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogContent} from '@angular/material/dialog'
import {MatDialogActions} from '@angular/material/dialog'


@Component({
  selector: 'app-confirm-logout-dialog',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './confirm-logout-dialog.component.html',
  styleUrl: './confirm-logout-dialog.component.css'
})
export class ConfirmLogoutDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>) {}

  confirmLogout(): void {
    this.dialogRef.close(true);  // Return true on confirm
  }

  cancel(): void {
    this.dialogRef.close(false); // Return false on cancel
  }



}
