import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Dog } from '../core/dog';
import { DogService } from '../core/dog.service';
import { Walk } from '../core/walk';
import { WalkService } from '../core/walk.service';
import { WalkCreatorComponent } from '../walk-creator/walk-creator.component';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {

  dog?: Dog;
  walks?: Walk[];

  constructor(
    private dogService: DogService,
    private walkService: WalkService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  async ngOnInit(): Promise<void> {
    const dogId = this.route.snapshot.paramMap.get('dogId');
    if(dogId)
    {
      this.dog = await this.dogService.getDog(parseInt(dogId));
      this.walks = await this.walkService.getWalks(parseInt(dogId));

      this.walks?.map((walk)=>{
        walk.from = new Date(walk.from);
        walk.to = new Date(walk.to);
      })

    }
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
      this.walks!.push(createdWalk!);
    }
  }

  dayOfWeek(n: number){
    if(n==1){
      return "monday";
    }else if(n==2){
      return "tuesday";
    }else if(n==3){
      return "wednesday";
    }else if(n==4){
      return "thursday";
    }else if(n == 5){
      return "friday";
    }else if(n==6){
      return "saturday";
    }else{
      return "Sun";
    }
  }

  getStrengthInfo(n: number){
    if(n<2){
      return "is a very politely walking cutie,";
    }else if(n<4){
      return "is a ladybug with mixed feelings of pulling the walker,";
    }else if(n<6){
      return "can be a bit harsh with the burst of exciteness over some flower scents,";
    }else if(n<10){
      return "is for you if You could stop a tornado that would destroy any standing organism,"
    }else{
      return "is born to be a mustang, I wouldn't be in it's way when the smell of the freedom slaps it's nose,"
    }
  }

  getAgeInfo(n: number){
    if(n<2){
      return "is a baby";
    }else if(n<4){
      return "is in the age of a teenager";
    }else if(n<6){
      return "is all grown up now, it's not so long ago since it was a little baby,";
    }else if(n<8){
      return "has some age but still has some potential,";
    }else if(n<10){
      return "is like an old lady that still has energy,";
    }else{
      return "is a cute veteran,"
    }
  }

  getWeightInfo(n: number){
    if(n<5){
      return "is lightweight, soft as a pillow or a bird's feather."
    }else if(n<12){
      return "weights not really much, but would eat the whole city if it could."
    }else if(n<18){
      return "has been eating A LOT, not the lightest of them all, but still cute with it's pillows."
    }else{
      return "would require a whole crane to pick up, nah, just kidding, but I don't think I could lift it."
    }
  }

}
