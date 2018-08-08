import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddProgramPage } from '../add-program/add-program';
import { ProgramDetailsPage } from '../program-details/program-details';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

export interface Program { name: string; description: string; image: string; }

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPage {
  programCollection: AngularFirestoreCollection<Program>;
  programList: Observable<Program[]>;
  imageUrlList: {};

  constructor(
    public navCtrl: NavController,
    public afStorage: AngularFireStorage,
    public afDatabase: AngularFirestore
  ) {
    this.programCollection = afDatabase.collection<Program>('programs');
    this.programList = this.programCollection.valueChanges();
    this.imageUrlList = {};
    // add the image urls
    this.addImageUrls();
  }

  addImageUrls() {
    const _self = this;
    this.programList.forEach(function(programs) {
      programs.forEach(function(program) {
        const ref = _self.afStorage.ref(program.image);
        _self.imageUrlList[program.image] = ref.getDownloadURL();
      });
    });
  }

  addProgram() {
    this.navCtrl.push(AddProgramPage);
  }

  getProgramImage(imageId) {
    const ref = this.afStorage.ref(imageId);
    return ref.getDownloadURL();
  }

  navigateToDetail(program) {
    this.navCtrl.push(ProgramDetailsPage, {
      programImage: this.imageUrlList[program.image],
      program: program
    });
  }
}
