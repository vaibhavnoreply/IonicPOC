import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddVideoPage } from '../add-video/add-video';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

export interface Video { id: string, title: string; description: string; url: string; }

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  videoCollection: AngularFirestoreCollection<Video>;
  videoList: Observable<Video[]>;
  videoUrls: {};
  constructor(public navCtrl: NavController,public afStorage: AngularFireStorage, public afDatabase: AngularFirestore) {
    this.videoCollection = afDatabase.collection<Video>('videos');
    this.videoList = this.videoCollection.valueChanges();
    this.videoUrls = {};
    
    this.populateThumbnailUrls();
  }

  populateThumbnailUrls() {
    const _self = this;

    _self.videoList.forEach(function(videos) {
      videos.forEach(function(video) {
        let youtubeUrlId = video.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
        _self.videoUrls[video.id] = 'http://img.youtube.com/vi/' + youtubeUrlId[2] + '/default.jpg';
      })
    })
  }

  addVideo() {
    this.navCtrl.push(AddVideoPage);
  }
}
