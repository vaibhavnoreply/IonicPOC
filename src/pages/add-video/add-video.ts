import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Video { id: string, title: string; description: string; url: string; }

@Component({
  selector: 'page-add-video',
  templateUrl: 'add-video.html'
})
export class AddVideoPage {
  newVideo={
    id: "",
    title: "",
    description: "",
    url: ""
  };
  videoCollection: AngularFirestoreCollection<Video>;
  constructor(public navCtrl: NavController, public afStorage: AngularFireStorage, public afDatabase: AngularFirestore) {
    this.videoCollection = afDatabase.collection<Video>('videos');
  }
  uploadVideo() {
    console.log("here");
    const id = this.afDatabase.createId();
    const video: Video = {
      id: id,
      title: this.newVideo.title,
      description: this.newVideo.description,
      url: this.newVideo.url
     };

     this.videoCollection.doc(id).set(video);

     // flush the filePath
     this.newVideo = {
       id: "",
       title: "",
       description: "",
       url: ""
     };
     //redirect back to programs page
     this.navCtrl.pop();
  }

}
