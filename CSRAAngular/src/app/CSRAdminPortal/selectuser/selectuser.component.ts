/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 17 DEC 2018, Monday
 * Decription :  Screen to select user from Producer, Employer and Member
 **************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-selectuser',
  templateUrl: './selectuser.component.html',
  styleUrls: ['./selectuser.component.scss']
})
export class SelectuserComponent {

  users = ['Producer', 'Employer', 'Member'];
  selectedUser: string;
  default = new User('');
  divLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.selectedUser = this.route.snapshot.params['id'];
  }


  //This will redirect to different user's components
  GoToSearch() {
    if (this.default.user == "Producer") {
      this.router.navigate(['/producersearch']);
    }
    else if (this.default.user == "Employer") {
      this.router.navigate(['/employersearch']);
    }
    else if (this.default.user == "Member") {
      this.router.navigate(['/membersearch']);
    }
  }
}