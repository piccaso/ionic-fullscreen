import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PowerManagement } from '@ionic-native/power-management';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    powerManagement: PowerManagement,
    androidFullScreen: AndroidFullScreen,
    private platform: Platform,
    private statusbar: StatusBar,
  ) {
    this.platform.ready().then(() => {

      powerManagement.acquire().then(() => {
        this.wakelock = "available";
      }).catch(reason => {
        console.error("no-wakelock", reason);
        this.wakelock = `n/a, reason=${reason}`;
      });

      androidFullScreen.immersiveMode().then(() => {
        this.fullscreen = "available";
      }).catch(reason => {
        console.error("no-fullscreen", reason);
        this.fullscreen = `n/a, reason=${reason}`;
      });

      // androidFullScreen.showUnderSystemUI().then(() => {
      //   this.underUi = "ok";
      // }).catch(reason => {
      //   this.underUi = `n/a, reason=${reason}`;
      // });

      this.statusbar.hide();
      this.statusbar.backgroundColorByHexString('#ffffff');
      this.platformState = "ready";

      setInterval(() => {
        if (this.statusbar.isVisible) {
          this.statusbar.show();
          this.statusbar.hide();
        }
      }, 1500);

    })
  }

  underUi: string = '-';
  wakelock: string = "-";
  fullscreen: string = '-';
  platformState: string = '-';
}
