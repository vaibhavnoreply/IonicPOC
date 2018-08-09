import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EditProgramPage } from '../edit-program/edit-program';
import {AddProgramPage} from "../add-program/add-program";

export interface Program { id:string, name: string; description: string; image: string; }


@Component({
  selector: 'page-program-details',
  templateUrl: 'program-details.html'
})
export class ProgramDetailsPage {
  programImage:string;
  program: Program;
  programCollection: AngularFirestoreCollection<Program>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFirestore) {
    this.programCollection = afDatabase.collection<Program>('programs');
    this.programImage = navParams.get("programImage");
    this.program = navParams.get("program");
  }

  editProgram() {
    this.navCtrl.push(EditProgramPage, {
      program: this.program
    });
  }

  deleteProgram(programId) {
    console.log(programId);
    // delete the program
    this.programCollection.doc(programId).delete();

    // switch back to the previous page
    this.navCtrl.pop();
  }

}
