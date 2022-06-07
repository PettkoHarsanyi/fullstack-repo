import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Dog } from '../core/dog';
import { DogService } from '../core/dog.service';
import { UserService } from '../core/user.service';
import { WalkCreatorComponent } from '../walk-creator/walk-creator.component';

@Component({
  selector: 'app-dog-summary',
  templateUrl: './dog-summary.component.html',
  styleUrls: ['./dog-summary.component.scss']
})
export class DogSummaryComponent implements OnInit {

  @Input() dog!: Dog;
  @Output() onEditDog = new EventEmitter<Dog>();
  @Input() showButtons: boolean = false;

  dogImageURL?: string;
  dogBreed?: string;


  constructor(private httpClient: HttpClient, public userService: UserService,private dialog: MatDialog,private dogService: DogService) {
    this.showButtons = userService.canEdit;
  }

  ngOnInit(): void {
    this.dogBreed = this.dog.type.replace(/\s/g, "").toLowerCase();
    // const result = this.httpClient.get(`https://dog.ceo/api/breeds/image/random`).toPromise();
    // this.dogImageURL = Object.values(result)[0];
    this.dogImageURL = "assets/placeholder.png";
  }

  async onAddWalk(){
    if(this.dog?.id){
      const dialogRef = this.dialog.open(WalkCreatorComponent,{
        width: '500px',
        data: this.dog.id,
      });

      const result = await dialogRef.afterClosed().toPromise();
      if(!result){
        return
      }
      delete result['time'];


      const createdWalk = await this.dogService.createWalk(this.dog.id,result);
      createdWalk!.from = new Date(createdWalk!.from);
      createdWalk!.to = new Date(createdWalk!.to);
    }
  }

}
