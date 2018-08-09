import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-play-video',
  templateUrl: 'play-video.html'
})
export class PlayVideoPage {
  //videoUrl: string;
  video: any = {
    url: navParams.get('url'),
    title: navParams.get('title'),
  };

  trustedVideoUrl: SafeResourceUrl;
  loading: Loading;
  videoTitle: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private domSanitizer: DomSanitizer ) {}


    ionViewWillEnter(): void {
      this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);
      this.videoTitle = this.video.title;
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.loading.present();
    }

    handleIFrameLoadEvent(): void {
      this.loading.dismiss();
    }

}
