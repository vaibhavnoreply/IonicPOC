import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Program { id: string, name: string; description: string; image: string; }

@Component({
  selector: 'page-add-program',
  templateUrl: 'add-program.html'
})
export class AddProgramPage {
  newProgram={
    id: "",
    name: "",
    description: ""
  };
  filePath:string;
  programCollection: AngularFirestoreCollection<Program>;
  constructor(public navCtrl: NavController, public afStorage: AngularFireStorage, public afDatabase: AngularFirestore) {
    this.programCollection = afDatabase.collection<Program>('programs');
    this.filePath = "";
  }

  uploadProgram() {
    const id = this.afDatabase.createId();
    const program: Program = {
      id: id,
      name: this.newProgram.name,
      description: this.newProgram.description,
      image: this.filePath
     };

     this.programCollection.doc(id).set(program);

     // flush the filePath
     this.newProgram = {
       id: "",
       name: "",
       description: ""
     };
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
