import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment'
import { of } from "rxjs/observable/of";
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
/**
 * Generated class for the AddEventModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface EventData { id: string, title: string, notes: string; startTime: string; endTime: string; }

@Component({
  selector: 'add-event-modal',
  templateUrl: 'add-event-modal.html'
})
export class AddEventModalComponent {

  event = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false,
    room: {}
  };
  minDate = new Date().toISOString();
  rooms$ = of([{ id: "room1", name: "room1" }, { id: "room2", name: "room2" }, { id: "room3", name: "room3" }])
  tempEvents = {
    id: '',
    title: '',
    notes: '',
    startTime: '',
    endTime: ''
  };
  eventCollection: AngularFirestoreCollection<EventData>;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public afStorage: AngularFireStorage,
    public afDatabase: AngularFirestore) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.eventCollection = afDatabase.collection<EventData>('events');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    const id = this.afDatabase.createId();
    const tempEventVar: EventData = {
      id: id,
      title: this.event.title,
      notes: this.event.notes,
      startTime: this.event.startTime,
      endTime: this.event.endTime
    };
    this.eventCollection.doc(id).set(tempEventVar);
    this.viewCtrl.dismiss(this.event);
  }

  blockDay($event) {
    console.log($event)
  }

  optionSelected($event) {
    console.log($event)
    this.event.room = $event
  }
}
