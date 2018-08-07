import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-play-video',
  templateUrl: 'play-video.html'
})
export class PlayVideoPage {
  videoUrl: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer) {
     this.videoUrl = navParams.get('data');
  }

}
