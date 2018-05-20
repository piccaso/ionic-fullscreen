import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PowerManagement } from '@ionic-native/power-management';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private powerManagement: PowerManagement) {
    powerManagement.acquire()
      .then(()=>{
        this.wakelock="available"
      })
      .catch(reason => {
        console.error("no-wakelock", reason);
        this.wakelock=`not available, reason=${reason}`;
      });
  }

  wakelock:string;
}
