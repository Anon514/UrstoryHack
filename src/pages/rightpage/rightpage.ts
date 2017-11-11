import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ViewController } from 'ionic-angular';

import * as firebase from 'firebase';
import { Home } from '../home/home';



@Component({
    selector: 'page-rightpage',
    templateUrl: 'rightpage.html'
})
export class RightPage {
    swipe: number=0;
    user: any;
    email: any;
    first: any;
    last: any;

    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, public viewCtrl: ViewController) {
    }

    swipeEvent(e) {
      if(e.direction == 4){
        this.navCtrl.push(Home, {}, {animate: true, direction: 'back'});
      }
    }

    logout() {
      this._auth.signOut();
      this.navCtrl.setRoot(Login);
    }

    ngOnInit() {
      this.user = this.af.database.object('/users/' + this._auth.getEmailName());
      let userData = this.user.subscribe(
        (data) => {
                   this.email = data.email;
                   this.first = data.first;
                   this.last  = data.last;
                  }
      )
    }


}
