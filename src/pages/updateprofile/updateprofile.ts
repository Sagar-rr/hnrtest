import {Component} from '@angular/core';
import {
     LoadingController, NavController, NavParams, Platform,

} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ServiceProvider} from "../../providers/service/service";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the UpdateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-updateprofile',
    templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage {
    loadingSpan: any = false;
    private win: any = window;
    userData:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController, public platform: Platform, public service: ServiceProvider,private camera: Camera,) {
        this.userData=this.navParams.get('data');
    }
    changeProfilePic(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 128,
            targetHeight: 128,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit: true

        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.win.Ionic.WebView.convertFileSrc(imageData);
            this.userData['avatar']=this.win.Ionic.WebView.convertFileSrc(imageData);
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }




    ionViewDidLoad() {
        console.log('ionViewDidLoad UpdateprofilePage');
    }

}
