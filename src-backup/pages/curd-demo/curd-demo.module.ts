import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurdDemoPage } from './curd-demo';

@NgModule({
  declarations: [
    CurdDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(CurdDemoPage),
  ],
})
export class CurdDemoPageModule {}
