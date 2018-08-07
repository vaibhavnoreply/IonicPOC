import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Program { id: string, name: string; description: string; image: string; }

@Component({
  selector: 'page-edit-program',
  templateUrl: 'edit-program.html'
})
export class EditProgramPage {

  program:Program;
  filePath:string;
  programCollection: AngularFirestoreCollection<Program>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afStorage: AngularFireStorage, public afDatabase: AngularFirestore) {
    this.programCollection = afDatabase.collection<Program>('programs');
    this.filePath = "";

    // get the program details
    this.program = navParams.get("program");
    this.program.image = "";
  }

  uploadProgram() {

    this.program.image = this.filePath;
    this.programCollection.doc(this.program.id).update(this.program);

    this.filePath = "";

    //redirect back to programs page
    this.navCtrl.pop();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.filePath =  Math.random().toString(36).substring(2);
    const ref = this.afStorage.ref(this.filePath);
    const task = ref.put(file);
  }
  
}
