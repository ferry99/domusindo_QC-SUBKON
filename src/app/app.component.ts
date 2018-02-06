import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HttpModule } from '@angular/http';
// import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { HomePage } from '../pages/home/home';
import { PKerjaPage } from '../pages/p-kerja/p-kerja';
import { ListPage } from '../pages/list/list';
import { InspekPage } from '../pages/inspek/inspek';
import { Inspek2Page } from '../pages/inspek2/inspek2';
import { SyncronPage } from '../pages/syncron/syncron';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private sqlite: SQLite,private sqlitePorter: SQLitePorter) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Perintah Inspek', component: PKerjaPage },
      { title: 'List Inspect', component: ListPage },
      // { title: 'Entry Inspect', component: InspekPage },
      { title: 'Entry Inspect V2', component: Inspek2Page },
      { title: 'Syncron Inspect', component: SyncronPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.initDb();
      this.splashScreen.hide();
    });
  }

    initDb(){
      this.sqlite.create({
        name: 'qc_checking_subkon.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        var sql = `
          CREATE TABLE IF NOT EXISTS m_inspek(
            id_inspeksi INTEGER PRIMARY KEY,
            id_perintah_inspek VARCHAR(150),
            tanggal_inspeksi datetime,
            nama_inspektor VARCHAR(150),
            nama_subkon VARCHAR(150),
            lokasi_subkon VARCHAR(150),
            no_po VARCHAR(150),
            id_material VARCHAR(150),
            nama_barang VARCHAR(150),
            jenis_barang VARCHAR(150),
            qty_check VARCHAR(150),
            qty_defect VARCHAR(150),
            cat_ketidaksesuaian VARCHAR(150),
            date_created datetime,
            is_sync VARCHAR(150))`;
        
        db.executeSql(sql, {})
        .then(res => console.log('@Executed Init SQL : m_inspek table')
        ,(err) => {
                  alert('Unable to execute sql: '+JSON.stringify(err));
                }) 
        .catch(e => console.log(JSON.stringify(e)));
        
        // var sql2 = `
        //     CREATE TABLE IF NOT EXISTS m_item_pemeriksaan(
        //     kode_permeriksaan VARCHAR(150),
        //     nama_pemeriksaan VARCHAR(150),
        //     kategory VARCHAR(150))`;
        
        // db.executeSql(sql2, {})
        // .then(res => console.log('@Executed Init SQL : m_item_pemeriksaan table'))
        // .catch(e => console.log(JSON.stringify(e)));
        
        var sql3 =`CREATE TABLE IF NOT EXISTS t_detail_pemeriksaan(
              rowid INTEGER PRIMARY KEY,
              id_inspeksi VARCHAR(150),
              id_pemeriksaan VARCHAR(150),
              category VARCHAR(150),
              label VARCHAR(150),
              option VARCHAR(150),
              qty VARCHAR(150),
              note VARCHAR(150))`;
            
        
        db.executeSql(sql3, {})
        .then(res => console.log('@Executed Init SQL t_detail_pemeriksaan table'))
        .catch(e => console.log(JSON.stringify(e)));

         var sql4 = `CREATE TABLE IF NOT EXISTS t_perintah_inspek(
          trid varchar(30) PRIMARY KEY,
          po varchar(20) DEFAULT NULL,
          idmat varchar(20) DEFAULT NULL,
          deskripsi varchar(150) DEFAULT NULL,
          qty_ord int(5) DEFAULT NULL,
          vendor varchar(150) DEFAULT NULL,
          download varchar(1) DEFAULT 'N',
          tgl_download varchar(150) DEFAULT NULL,
          qty_inspek int(5) DEFAULT NULL,
          tgl_entry timestamp NULL,
          po_item varchar(10) DEFAULT NULL,
          no_perintah varchar(50) DEFAULT NULL,
          tgl_inspek varchar(50) DEFAULT NULL,
          curr_qty_inspek varchar(20) DEFAULT NULL)`;
            
 
        
        db.executeSql(sql4, {})
        .then(res => console.log('@Executed Init SQL perintah_inspeksi table'))
        .catch(e => console.log(JSON.stringify(e)));

        
        // let sql2 = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title] VARCHAR(150));' +
        //            'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");'+
        //            'INSERT INTO Artist(Id,Title) VALUES ("2","Fredo");';

        // this.sqlitePorter.importJsonToDb(db, sql2)
        //   .then(() => console.log('@Imported'))
        //   .catch(e => console.error(e));
        // (trid,po,idmat,deskripsi,qty_ord,vendor,download,qty_inspek,tgl_entry,po_item,no_perintah)

        // let sqlIns = 'DELETE FROM t_perintah_inspek';
     
        //  this.sqlitePorter.importSqlToDb(db, sqlIns)
        //  .then(() => console.log('@Imported'))
        //  .catch(e => console.error(e));
      })
    }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
