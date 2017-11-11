import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

export const firebaseConfig = {
    apiKey: "AIzaSyDQdcFOv5-WDn_GUn-4CxvjWzWW5JbIDu8",
    authDomain: "urstory-7f855.firebaseapp.com",
    databaseURL: "https://urstory-7f855.firebaseio.com/",
    storageBucket: "urstory-7f855.appspot.com",
    messagingSenderId: "563705458949"
};

@NgModule({
  declarations: [
    MyApp,
    Signup,
    Home,
    Login,
    Tabs
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Signup,
    Home,
    Login,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
