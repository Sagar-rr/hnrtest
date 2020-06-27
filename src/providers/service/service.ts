import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {Network} from "@ionic-native/network";
import { AlertController, Events } from 'ionic-angular';


/*
 Generated class for the ServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
export enum ConnectionStatusEnum {
    Online,
    Offline,
}

@Injectable()
export class ServiceProvider {
  baseurl: any='https://reqres.in/api/users';
  token: any;
  previousStatus;
 enableRefresh:any=true;
  constructor(public httpClient: HttpClient,public alertCtrl: AlertController,public network: Network,public eventCtrl: Events) {
    console.log('Hello ServiceProvider Provider');
      this.previousStatus = ConnectionStatusEnum.Online;
  }

  //Http Call Universal
  public httpcall(url) {
    console.log('this is url' + url);

    return this.httpClient.get(this.baseurl + url)
        .map(data => {
          return data;
        });
  }

  public httppostcall(url, data) {
    console.log(url + JSON.stringify(data));
    console.log('httppostcall_baseurl', this.baseurl);
    return this.httpClient.post(this.baseurl + url, data)
        .map(data => {
          return data;
        });
  }

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
    }


}
