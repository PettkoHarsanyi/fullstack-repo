import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/user';
import { UserService } from '../core/user.service';
import { Walk } from '../core/walk';
import { WalkService } from '../core/walk.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user?: User;
  walks?: Walk[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private walkService: WalkService
  ) { }

  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('userId');
    if(userId){
      this.user = await this.userService.getUser(parseInt(userId));
      this.walks = await this.walkService.getWalkOfUser(parseInt(userId));

      this.walks?.map((walk)=>{
        walk.from = new Date(walk.from);
        walk.to = new Date(walk.to);
      })

      console.log(this.user);
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

}
