import { Component } from '@angular/core';

import { MenuController, NavController, ViewController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { LeftPage } from '../leftpage/leftpage';
import { RightPage } from '../rightpage/rightpage';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';
declare var google : any;


@Component({
    selector: 'page-post',
    templateUrl: 'post.html'
})
export class Post {
    swipe: number=0;
    type: any;
    map: any;

    constructor(params: NavParams, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire,  public viewCtrl: ViewController) {
        console.log('type:', params.get('type'));
        this.type=params.get('type');
    }
    ngOnInit(){
        this.initializeMap()
    }
    dismiss() {
        this.viewCtrl.dismiss();
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
