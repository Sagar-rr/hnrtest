import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ServiceProvider } from '../providers/service/service';
import { UpdateprofilePage } from '../pages/updateprofile/updateprofile';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {Network} from "@ionic-native/network";
import { ActionSheet } from '@ionic-native/action-sheet';
import {HomePage} from "../pages/home/home";
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,UpdateprofilePage,HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,UpdateprofilePage,HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,Network,ActionSheet,Camera
  ]
})
export class AppModule {}
