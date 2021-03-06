import { Component } from '@angular/core';
import {  Events , NavController , NavParams , ActionSheetController} from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { InspekPage } from '../inspek/inspek';
import { HomePage } from '../home/home';
import _ from 'underscore';


/**
 * Generated class for the Inspek2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspek2',
  templateUrl: 'inspek2.html',
})
export class Inspek2Page {

  items_inspeksi:any = [];
  
  constructor(public navCtrl: NavController,
  				public navParams: NavParams , 
          public events:Events,
  				public actionsheetCtrl: ActionSheetController,
  				private sqlite: SQLite,
  				public http: Http,
  				public loadingCtrl: LoadingController,
  				public alertCtrl: AlertController,
  				private sqlitePorter: SQLitePorter,
  				public modalCtrl: ModalController) 
  {

    this.events.subscribe('reloadDetails',() => {
      console.log('reload inspekV2');
      let loading = this.loadingCtrl.create({
            content: 'Saving Data...'
          });
      loading.present();
      this.sqlite.create({
      name: 'qc_checking_subkon.db',
      location: 'default'
      }).then((db: SQLiteObject) => {
        var sql = 'SELECT * FROM t_perintah_inspek WHERE curr_qty_inspek > ?';            
        db.executeSql(sql ,['0'])
        .then(res => {
          this.items_inspeksi = [];
          console.log('@Executed Select t_perintah_inspek on inspek_page2');
          if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                  this.items_inspeksi.push(res.rows.item(i));                  
                }
            } 
            this.events.unsubscribe('reloadDetails');
            loading.dismiss();           
         }
        ,(err)=>{
            alert('Unable to execute sql: '+JSON.stringify(err));
      }) 
        .catch(e => console.log(JSON.stringify(e)));
      })

      // this.navCtrl.setRoot(HomePage);
    });

   	this.sqlite.create({
  	name: 'qc_checking_subkon.db',
  	location: 'default'
  	}).then((db: SQLiteObject) => {
  		var sql = 'SELECT * FROM t_perintah_inspek WHERE curr_qty_inspek > ? AND is_deleted = ?';	      		
  		db.executeSql(sql ,['0' , ''])
  		.then(res => {
  			console.log('@Executed Select t_perintah_inspek on inspek_page2');
  			if (res.rows.length > 0) {
  		        for (var i = 0; i < res.rows.length; i++) {
  		          this.items_inspeksi.push(res.rows.item(i));  			          
  		        }
  		    }  			    
  		}
  		,(err)=>{
  		    alert('Unable to execute sql: '+JSON.stringify(err));
  	}) 
  		.catch(e => console.log(JSON.stringify(e)));
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Inspek2Page');
  }

  openPage(event , item){
    event.stopPropagation();
  	this.navCtrl.push(InspekPage, {
		  firstPassed: item
    })
  }

  delete(event , item){
    event.stopPropagation();
    let confirm = this.alertCtrl.create({
    title: 'CONFIRMATION !! ',
    message: 'DELETE THIS ITEM?',
    buttons: [
      {
         text: 'No',
         handler: () => {
         }
      },
      {
         text: 'Yes',
         handler: () => {
           this.deleteItem(item);
         }
      }
    ]
    });
    confirm.present();
  }

  deleteItem(item){
    this.sqlite.create({
      name: 'qc_checking_subkon.db',
      location: 'default'
    }).then((db: SQLiteObject) => {          
        var sqlUpdate = "UPDATE t_perintah_inspek SET is_deleted = 'true' WHERE trid= '" + item.trid + "'";
        this.sqlitePorter.importSqlToDb(db, sqlUpdate)
        .then(() => {
            //arr = _.reject(arr, function(objArr){ return objArr.id == 3; });
            this.items_inspeksi = _.reject(this.items_inspeksi, function(items_inspeksi:any){ return items_inspeksi.trid == item.trid; });
            console.log('Deleted');       
        })
        .catch(e =>{
          console.error(JSON.stringify(e))
        });
    })
  }

}
