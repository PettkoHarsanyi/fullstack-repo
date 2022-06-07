import { Component, OnInit } from '@angular/core';
import { Walk } from '../core/walk';
import { WalkService } from '../core/walk.service';

@Component({
  selector: 'app-walk-list',
  templateUrl: './walk-list.component.html',
  styleUrls: ['./walk-list.component.scss']
})
export class WalkListComponent implements OnInit {

  walks?: Walk[];

  constructor(private walkService: WalkService) { }

  async ngOnInit(): Promise<void> {
    this.walks = await this.walkService.getAllWalks();
    this.walks?.map((walk) => {
      walk.from = new Date(walk.from);
      walk.to = new Date(walk.to);
    })
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

}
