import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { id: string; name: string; }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songCollection: AngularFirestoreCollection<Item>;
  songsList: Observable<Item[]>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public afDatabase: AngularFirestore) {
    this.songCollection = afDatabase.collection<Item>('songs');
    this.songsList = this.songCollection.valueChanges();

    console.log(this.songsList);
  }

  addSong(){
  let prompt = this.alertCtrl.create({
    title: 'Song Name',
    message: "Enter a name for this new song you're so keen on adding",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          // Create a new id
          const id = this.afDatabase.createId();
          const item: Item = {
            id: id,
            title: data.title
           };

         this.songCollection.doc(id).set(item);
        }
      }
    ]
  });
  prompt.present();
}
}
