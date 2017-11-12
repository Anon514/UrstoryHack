import { Component } from '@angular/core';

import { MenuController, NavController, ViewController, NavParams , AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { LeftPage } from '../leftpage/leftpage';
import { RightPage } from '../rightpage/rightpage';
import {Posts} from '../../app/models/post'
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
    locations: any;
    userinput: any;

    constructor(params: NavParams, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire,  public viewCtrl: ViewController,  private alertCtrl: AlertController) {
        console.log('type:', params.get('type'));
        this.type=params.get('type');
    }
    ngOnInit(){
        this.initializeMap()

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    onSubmit(){
        let locationref = this.af.database.list("/locations/location/"+this.locations+"/statuses");
        let userref = this.af.database.object("/users/"+this._auth.getEmailName());
        let personsub = userref.subscribe((data)=>{
            if(this.userinput && this.locations){
            let post =  new Posts(data.handle, new Date().getTime(), this.userinput, this._auth.getEmailName());
            locationref.push(post);
            this.success();
            }else{
                this.blankinput();
            }
        })
        

    }

    blankinput(){
        let alert = this.alertCtrl.create({
            title: 'Empty Inputs',
            message: 'One or more inputs are blank.',
            buttons: [
                {
                    text: 'Ok',
                    role: 'ok',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    }



    success(){
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: 'Your post was successfully submitted.',
            buttons: [
                {
                    text: 'Ok',
                    role: 'ok',
                    handler: () => {
                        console.log('Cancel clicked');
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
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
