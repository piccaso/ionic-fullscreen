import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PowerManagement } from '@ionic-native/power-management';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    powerManagement: PowerManagement,
    androidFullScreen: AndroidFullScreen
  ) {
    powerManagement.acquire()
      .then(() => {
        this.wakelock = "available";
      })
      .catch(reason => {
        console.error("no-wakelock", reason);
        this.wakelock = `not available, reason=${reason}`;
      })
      ;
    androidFullScreen.immersiveMode()
      .then(() => {
        this.fullscreen = "available";
      })
      .catch(reason => {
        console.error("no-fullscreen", reason);
        this.fullscreen = `not available, reason=${reason}`;
      })
      ;
  }

  wakelock: string = "";
  fullscreen: string = '';
}
