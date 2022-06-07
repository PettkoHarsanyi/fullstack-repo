import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../core/user';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.component.html',
  styleUrls: ['./user-creator.component.scss']
})
export class UserCreatorComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    name: ['',[Validators.required]],
    userName: ['',[Validators.required]],
    password: ['',[Validators.required]],
    age: ['',[Validators.required]],
    strength: ['',[Validators.required]],
    role: ['',[Validators.required]],
  })

  get getName(){
    return this.userForm.get('name') as FormControl;
  }

  get getUserName(){
    return this.userForm.get('userName') as FormControl;
  }

  get getPassword(){
    return this.userForm.get('password') as FormControl;
  }

  get getAge(){
    return this.userForm.get('age') as FormControl;
  }

  get getStrength(){
    return this.userForm.get('strength') as FormControl;
  }

  get getRole(){
    return this.userForm.get('role') as FormControl;
  }

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreatorComponent>) {
  }

  ngOnInit(): void {

  }

  submit(){
    if(!this.userForm.valid){
      return;
    }

    this.dialogRef.close(this.userForm.value as User);
  }

}
