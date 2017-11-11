import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { LeftPage } from '../leftpage/leftpage';
import { RightPage } from '../rightpage/rightpage';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';

import * as firebase from 'firebase';

declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    swipe: number=0;
    map: any;
    loader: any;

    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, public loadCtrl: LoadingController) {

    }

    // Navigation
    swipeEvent(e) {
        this.swipe++

        if (e.direction == 4) {
            this.navCtrl.push(LeftPage, {}, {animate: true, direction: 'back'});
        }
        if (e.direction == 2) {
            this.navCtrl.push(RightPage, {}, {animate: true, direction: 'forward'});
        }
      }

      ngOnInit() {
        let loader = this.loadCtrl.create({
            content: 'Poop',
        });

        loader.present().then(
          () => { this.initializeMap(); }
        );

        loader.dismiss();
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
                  //this.marker = new google.maps.Marker(position, map);
              },
              (error) => {
                  console.log(error);
              }, locationOptions
          );
      }
}
