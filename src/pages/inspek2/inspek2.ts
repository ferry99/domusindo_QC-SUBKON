import { Component } from '@angular/core';
import {  NavController , NavParams , ActionSheetController} from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { InspekPage } from '../inspek/inspek';

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
  				public actionsheetCtrl: ActionSheetController,
  				private sqlite: SQLite,
  				public http: Http,
  				public loadingCtrl: LoadingController,
  				public alertCtrl: AlertController,
  				private sqlitePorter: SQLitePorter,
  				public modalCtrl: ModalController) 
  {
	this.sqlite.create({
	name: 'qc_checking_subkon.db',
	location: 'default'
	}).then((db: SQLiteObject) => {
		var sql = 'SELECT * FROM t_perintah_inspek WHERE download = ?';	      		
		db.executeSql(sql ,['N'])
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

  openPage(item){
  	this.navCtrl.push(InspekPage, {
		firstPassed: item
    })
  }

}
