import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PKerjaPage } from '../pages/p-kerja/p-kerja';
import { ListPage } from '../pages/list/list';
import { InspekPage } from '../pages/inspek/inspek';
import { Inspek2Page } from '../pages/inspek2/inspek2';
import { SyncronPage } from '../pages/syncron/syncron';

import { SQLite , SQLiteObject} from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PKerjaPage,
    ListPage,
    InspekPage,
    Inspek2Page,
    SyncronPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PKerjaPage,
    ListPage,
    InspekPage,
    Inspek2Page,
    SyncronPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SQLitePorter
  ]
})
export class AppModule {}
