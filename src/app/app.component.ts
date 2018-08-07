import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VideoPage } from '../pages/video/video';
import { CalendarPage } from '../pages/calendar/calendar';


import { ProgramsPage } from '../pages/programs/programs';
import { timer } from 'rxjs/observable/timer';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  showSplash = true;
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = ProgramsPage;

  constructor(platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.splashScreen.show();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
  goToPrograms(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProgramsPage);
  }goToVideo(params){
    if (!params) params = {};
    this.navCtrl.setRoot(VideoPage);
  }goToCalendar(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CalendarPage);
  }
}
