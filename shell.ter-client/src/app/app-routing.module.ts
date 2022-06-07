import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { DogCreatorComponent } from './dog-creator/dog-creator.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { DogListComponent } from './dog-list/dog-list.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { WalkListComponent } from './walk-list/walk-list.component';

const routes: Routes = [{
  path: 'dogs',
  component: DogListComponent,
  canActivate: [AuthGuard],
},{
  path: 'walks',
  component: WalkListComponent,
  canActivate: [AuthGuard],
},{
  path: 'users',
  component: UserListComponent,
  canActivate: [AuthGuard],
},
{
  path: 'dog-create',
  component: DogCreatorComponent,
  canActivate: [AuthGuard],
},
{
  path: 'users/:userId',
  component: UserDetailsComponent,
  canActivate: [AuthGuard],
},
{
  path: 'dogs/:dogId',
  component: DogDetailsComponent,
  canActivate: [AuthGuard],
},
{
  path: "landing",
  component: LandingComponent
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: "**",
  redirectTo: "landing",
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
