import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dog } from '../core/dog';

@Component({
  selector: 'app-dog-creator',
  templateUrl: './dog-creator.component.html',
  styleUrls: ['./dog-creator.component.scss']
})
export class DogCreatorComponent implements OnInit {
  dogForm: FormGroup = this.fb.group({
    name: ['',[Validators.required]],
    type: ['',[Validators.required]],
    age: ['',[Validators.required]],
    weight: ['',[Validators.required]],
    strength: ['',[Validators.required]]
  });

  get name(): FormControl{
    return this.dogForm.get('name') as FormControl;
  }

  get type(): FormControl{
    return this.dogForm.get('type') as FormControl;
  }

  get age(): FormControl{
    return this.dogForm.get('age') as FormControl;
  }

  get weight(): FormControl{
    return this.dogForm.get('weight') as FormControl;
  }

  get strength(): FormControl{
    return this.dogForm.get('strength') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DogCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) private dog: Dog
  ) {
    if(this.dog){
      this.dogForm.reset(this.dog);
    }
  }

  ngOnInit(): void {
  }

  submit(){
    if(!this.dogForm.valid){
      return;
    }

    this.dialogRef.close(this.dogForm.value as Dog);
  }

}
