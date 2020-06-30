import {Component, ViewChild} from '@angular/core';
import {Platform, App, Nav, AlertController, ToastController, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ServiceProvider} from '../providers/service/service';
import {Storage} from '@ionic/storage';
import {MenuController} from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {UpdateprofilePage} from "../pages/updateprofile/updateprofile";
import {HomePage} from "../pages/home/home";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = HomePage;
    alertpresent: boolean = false;
    hasPermission: boolean = false;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public service: ServiceProvider, public storage: Storage, public _app: App, private alertCtrl: AlertController, public toastCtrl: ToastController, public menu: MenuController, public events: Events) {


        platform.ready().then(() => {

            statusBar.overlaysWebView(false);
            statusBar.backgroundColorByHexString('#389ddd');

            platform.registerBackButtonAction(() => {
                let nav = _app.getActiveNavs()[0];
                let activeView = (nav) ? nav.getActive().instance : null;

                if (activeView instanceof HomePage ) {
                    if (!this.alertpresent) {
                        this.alertpresent = true;

                        let alert = this.alertCtrl.create({
                            title: 'Alert!',
                            message: 'Do You want to Exit',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: () => {
                                        this.alertpresent = false;
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Confirm',
                                    handler: () => {
                                        this.alertpresent = true;

                                        platform.exitApp(); //Exit from app
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }

                } else if(activeView instanceof UpdateprofilePage ) {
                    this.nav.setRoot(HomePage);
                }
            });

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();

            splashScreen.hide();

            this.service.initializeNetworkEvents();

            // Offline event
            this.events.subscribe('network:offline', () => {
                // alert('network:offline ==> '+this.network.type);
                // alert('Please Check Your Internet Connection');
                let toast = this.toastCtrl.create({
                    position: 'top',
                    message: 'Please Check Your Internet Connection',
                    duration: 2000,
                    showCloseButton: true
                });
                toast.present();
            });
            // Online event
            this.events.subscribe('network:online', () => {
                // alert('network:online ==> '+this.network.type);
                // alert('You are Online');
                let toast = this.toastCtrl.create({
                    position: 'top',
                    message: 'You are Online',
                    duration: 2000,
                    showCloseButton: true
                });
                toast.present();
            });



        });
    }

}
