import { Time } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Walk } from '../core/walk';

@Component({
  selector: 'app-walk-creator',
  templateUrl: './walk-creator.component.html',
  styleUrls: ['./walk-creator.component.scss']
})
export class WalkCreatorComponent implements OnInit {
  walkForm: FormGroup = this.fb.group({
    duration: ['',[Validators.required]],
    from: ['',[Validators.required]],
    time: ['',[Validators.required]],
    to: [''],
  })

  get getTime(): FormControl{
    return this.walkForm.get('time') as FormControl;
  }

  get getDuration(): FormControl{
    return this.walkForm.get('duration') as FormControl;
  }

  get getFrom(): FormControl{
    return this.walkForm.get('from') as FormControl;
  }

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<WalkCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) private dogId: number
    ) {
     }

  ngOnInit(): void {
  }

  submit(){
    if(!this.walkForm.valid){
      return;
    }

    let fromISO : Date = new Date(this.getFrom.value + " " + this.getTime.value + ":00");
    fromISO.toISOString

    let toTime : Date = new Date(this.getFrom.value + " " + this.getTime.value + ":00");
    toTime.setMinutes(toTime.getMinutes() + this.getDuration.value);

    this.walkForm.patchValue({
      from: fromISO,
      to:toTime,
    })

    this.dialogRef.close(this.walkForm.value as Walk);
  }

}
