import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dog } from '../core/dog';
import { DogService } from '../core/dog.service';
import { UserService } from '../core/user.service';
import { DogCreatorComponent } from '../dog-creator/dog-creator.component';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  dogs?: Dog[];

  constructor(private dogService: DogService, private dialog: MatDialog, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.dogs = await this.dogService.getDogs();
  }

  @Input() showEdit: boolean = false;

  canAdd(): boolean{
    return this.userService.canEdit;
  }

  async onEditDog(dog: Dog){
    const dialogRef = this.dialog.open(DogCreatorComponent, {
      width: '500px',
      data: dog,
    });

    const result: Dog = await dialogRef.afterClosed().toPromise()

    if(result){
      const editedDog = await this.dogService.editDog(dog.id!,result);

      this.dogs?.splice(this.dogs.indexOf(dog),1,editedDog!);
    }
  }

  async onCreateDog(){
    const dialogRef = this.dialog.open(DogCreatorComponent, {
      width: '500px',
    });

    const result = await dialogRef.afterClosed().toPromise()

    if(result){
      const createdDog = await this.dogService.createDog(result);

      this.dogs!.push(createdDog!);
    }
  }
}
