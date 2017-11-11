import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';


import { Home } from '../home/home';

import { Login } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root = Home;
  tab2Root = Home;
  tab3Root = Home;
  user: any;


  constructor( public navCtrl: NavController, private af: AngularFire, private _auth: AuthService, public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit(){

  }
}
