import { Component } from "@angular/core";
import { LoginDto } from "./login.model";
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import Swal from "sweetalert2";





@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
private userId: any;
public logininfo: LoginDto | any;

 constructor(private http: HttpClient, private loginSrv: LoginService, private router: Router){
  this.logininfo = new LoginDto();
 }

// SaveLoginInfo() {
//   if (!this.logininfo) {
//     return;
//   }

// this.loginSrv.getUserId(this.logininfo.username).subscribe(result => {
//   this.userId = result;
// });
// ///////////////////////////////////////////////////////
//   if(this.userId)
//     {
//       this.loginSrv.checkPassword(this.userId,this.logininfo.password).subscribe(result=>{
//       this.passed=result;
//     })
//     if(this.passed){
//       this.router.navigate(['/podcast']);
//       this.logininfo=null;
//       this.passed=null;
//       this.userId=null;
//       }
//     else if(!this.passed){
//       Swal.fire('Your password is not correct.')
//       }
//     }
//   else if(!this.userId){
//   Swal.fire('The username is invalid.')
//     }

//   }
SaveLoginInfo() {
  if (!this.logininfo) {
    return;
  }

  this.loginSrv.getUserId(this.logininfo.username).subscribe(result => {
    this.userId = result;

    if (this.userId) {
      this.loginSrv.checkPassword(this.userId, this.logininfo.password).subscribe(result => {
        const isPasswordCorrect = result.isPasswordCorrect;
        const userLevel = result.userLevel;

        if (isPasswordCorrect) {
          if(userLevel=="Main Admin"){
             this.router.navigate(['/podcast']);
             this.loginSrv.login(userLevel);
            }
          else this.router.navigate(['/podcastuser']);
          this.logininfo = null;
          this.userId = null;
        } else {
          Swal.fire('Your password is not correct.');
        }
      });
    } else {
      Swal.fire('The username is invalid.');
    }
  });
}
}
