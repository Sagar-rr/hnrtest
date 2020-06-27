import {Component,NgZone} from '@angular/core';
import {
  AlertController, LoadingController, MenuController, NavController, NavParams, Platform,
  ToastController,Events
} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ServiceProvider} from "../../providers/service/service";
import {UpdateprofilePage} from "../updateprofile/updateprofile";
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loadingSpan: any = false;
  loadingSpanBit: any;
  userData:any=[];
  userData2:any;
  page:any=1;
  alertpresent: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController, public menu: MenuController, public toastCtrl: ToastController, public alertCtrl: AlertController, public platform: Platform, public service: ServiceProvider,public events: Events) {
    this.getUserList();

    this.events.subscribe('network:online', () => {
      if (!this.alertpresent) {
        this.alertpresent = true;
        let alert = this.alertCtrl.create({
          title: '',
          message: 'Do You want to Retry',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.getUserList();

              }
            }
          ]
        });
        alert.present();
      }
    });

  }

  sort(){

    this.userData.sort(function(a, b) {
      if(a.full_name){
        return a.full_name.localeCompare(b.full_name);
      }else{
        return 1;
      }
    });
  }

  gotoProfilePage(data){

    this.navCtrl.push(UpdateprofilePage,{data:data})

  }
  searchUser(ev: any) {
    this.userData = this.userData2;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.userData = this.userData.filter((item) => {
        if (item.first_name != null && item.first_name != '' && item.last_name != '' && item.last_name != '' && item.email && item.email != null) {
          return (item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.last_name.toLowerCase().indexOf(val.toLowerCase() ) > -1 || item.email.toLowerCase().indexOf(val.toLowerCase() ) > -1);
        }
      });
    }



  };

  prev(){
    if(this.page >1){
      this.page -= 1;
      this.getUserList();
    }
  }

  next(){

      this.page += 1;
      this.getUserList();
  }

  getUserList() {
    let loading = this.loadingCtrl.create({
      content: 'Wait a moment'
    });
    this.loadingSpan = false;
    this.loadingSpanBit = 1;
    var timeOut = setTimeout(() => {
      loading.dismiss();
      if (this.loadingSpanBit) {
        this.loadingSpan = true;
      }
    }, 10000);

    this.service.httpcall("?page="+this.page,).subscribe((data: any) => {
      console.log("_data", data);
      clearTimeout(timeOut);
      this.loadingSpanBit = 0;
      loading.dismiss();
      this.loadingSpan = false;
      this.userData = data.data;
      for(let i=0;i<this.userData.length;i++){
        this.userData[i]['full_name'] = this.userData[i]['first_name']+""+this.userData[i]['last_name'];
      }
      this.userData2 = this.userData;

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
