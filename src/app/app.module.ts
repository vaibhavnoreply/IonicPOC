import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProgramsPage } from '../pages/programs/programs';
import { VideoPage } from '../pages/video/video';
import { CalendarPage } from '../pages/calendar/calendar';
import { AddEventModalComponent } from '../pages/calendar/add-event-modal/add-event-modal';
import { ProgramDetailsPage } from '../pages/program-details/program-details';
import { AddProgramPage } from '../pages/add-program/add-program';
import { EditProgramPage } from '../pages/edit-program/edit-program';
import { AddVideoPage } from '../pages/add-video/add-video';
import { PlayVideoPage } from '../pages/play-video/play-video';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

//Import calendar module
import { NgCalendarModule  } from 'ionic2-calendar';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCTn3hmLU6SmLZnpb9rsvqTokX8HVZoB7w",
  authDomain: "sampleprojectfb.firebaseapp.com",
  databaseURL: "https://sampleprojectfb.firebaseio.com",
  storageBucket: "sampleprojectfb.appspot.com",
  messagingSenderId: "1069592166373",
   projectId: "sampleprojectfb"
};

@NgModule({
  declarations: [
    MyApp,
    ProgramsPage,
    VideoPage,
    CalendarPage,
    ProgramDetailsPage,
    AddProgramPage,
    EditProgramPage,
    AddVideoPage,
    PlayVideoPage,
    AddEventModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgramsPage,
    VideoPage,
    CalendarPage,
    ProgramDetailsPage,
    AddProgramPage,
    EditProgramPage,
    AddVideoPage,
    PlayVideoPage,
    AddEventModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
