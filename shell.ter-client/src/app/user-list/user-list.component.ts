import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserRole } from '../core/user';
import { UserService } from '../core/user.service';
import { UserCreatorComponent } from '../user-creator/user-creator.component';
import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users?: User[];

  constructor(private userService: UserService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  isAdmin(){
    return this.userService.isAdmin;
  }

  async onAddUser(){
    const dialogRef = this.dialog.open(UserCreatorComponent, {
      width: '500px',
    });

    const result = await dialogRef.afterClosed().toPromise()
    if(result){
      const createdUser = await this.userService.createUser(result);
      this.users!.push(createdUser!);
    }

  }

  async onEditUser(user: User){
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '500px',
      data: user,
    });

    const result: User = await dialogRef.afterClosed().toPromise()
    const editedUser = await this.userService.editUser(user.id!,result);

    this.users?.splice(this.users.indexOf(user),1,editedUser!);
  }

}
