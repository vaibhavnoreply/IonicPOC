import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { AddEventModalComponent } from './add-event-modal/add-event-modal';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

export interface EventData { id: string, title: string, notes: string; startTime: string; endTime: string; }

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  selectedDay = new Date()
  selectedObject
  eventSource = []
  viewTitle;
  isToday: boolean;
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date()
  }; // these are the variable used by the calendar.

  eventList: Observable<EventData[]>;
  eventCollection: AngularFirestoreCollection<EventData>;

  constructor(public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public afStorage: AngularFireStorage,
    public afDatabase: AngularFirestore) {
      const tempArray= [];
    this.eventCollection = afDatabase.collection<EventData>('events');
    this.eventList = this.eventCollection.valueChanges();
    this.eventList.forEach(function(events) {
      events.forEach(function(event) {
        let tempStartTime = moment(event.startTime);
        let tempEndTime = moment(event.endTime);
        event.startTime = tempStartTime._d;
        event.endTime = tempEndTime._d;
        tempArray.push(event);
      });
    });
    this.eventSource = tempArray;
    // this.markDisabled(new Date(2017, 12, 25))
  }

  loadEvents() {
    //this.eventSource = this.createRandomEvents();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedObject = ev
    // this.openActionSheet(ev)
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return (date < current);
  };

  openActionSheet(event) {
    let actionsheet = this.actionSheetCtrl.create({
      title: "Choose Option",
      buttons: [
        {
          text: 'Block Date',
          handler: () => {
            console.log("Block Date Clicked: ", event);
            let d = event.selectedTime;
            //d.setHours(0, 0, 0);
            setTimeout(() => {
              this.blockDayEvent(d)
            }, 2);
          }
        },
        {
          text: 'Meet Up With',
          handler: function() {
            console.log("Meet Up With Clicked");
          }
        }
      ]
    }); actionsheet.present();
  }

  blockDayEvent(date) {
    let startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let events = this.eventSource;
    events.push({
      title: 'All Day ',
      startTime: startTime,
      endTime: endTime,
      allDay: true
    });
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  addEvent() {
    let modal = this.modalCtrl.create(AddEventModalComponent, { selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data, "data")
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource, "this.eventSource")
        });
      }
    });
  }

  onOptionSelected($event: any) {
    console.log($event)
    //this.calendar.mode = $event
  }

}
