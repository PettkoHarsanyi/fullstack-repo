import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  title = "Shell.ter";

  constructor(public authService: AuthService, private router: Router,public userService: UserService){}

  setTitle(newTitle: string){
    this.title = newTitle;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/','login']);
  }
}
