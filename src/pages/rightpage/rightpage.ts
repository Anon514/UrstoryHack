import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ViewController } from 'ionic-angular';

import * as firebase from 'firebase';
import { Home } from '../home/home';

declare var google : any;


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
    map: any;
    marker: any;

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

    initializeMap() {
        let locationOptions = {timeout: 20000, enableHighAccuracy: true};

        navigator.geolocation.getCurrentPosition(

            (position) => {

                let options = {
                  center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  disableDefaultUI: true
                }

                this.map = new google.maps.Map(document.getElementById("map"), options);
                this.marker = new google.maps.Marker(position, this.map);
            },

            (error) => {
                console.log(error);
            }, locationOptions
        );
    }


}
