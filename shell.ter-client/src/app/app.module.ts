import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatList, MatListModule} from '@angular/material/list';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import { DogListComponent } from './dog-list/dog-list.component';
import { DogCreatorComponent } from './dog-creator/dog-creator.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DogSummaryComponent } from './dog-summary/dog-summary.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/auth.interceptor';
import { LandingComponent } from './landing/landing.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { WalkCreatorComponent } from './walk-creator/walk-creator.component';
import { WalkListComponent } from './walk-list/walk-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreatorComponent } from './user-creator/user-creator.component';
import { UserEditorComponent } from './user-editor/user-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DogListComponent,
    DogCreatorComponent,
    DogSummaryComponent,
    DogDetailsComponent,
    LoginComponent,
    LandingComponent,
    WalkCreatorComponent,
    WalkListComponent,
    UserListComponent,
    UserDetailsComponent,
    UserCreatorComponent,
    UserEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
