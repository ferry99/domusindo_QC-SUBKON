import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController} from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'underscore';

/**
 * Generated class for the UtilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-utilities',
  templateUrl: 'utilities.html',
})
export class UtilitiesPage {

	data:any = {};
	  database: SQLiteObject;


  constructor(public navCtrl: NavController,
  				public navParams: NavParams , 
  				public actionsheetCtrl: ActionSheetController,
  				private sqlite: SQLite,
  				public http: Http,
  				public loadingCtrl: LoadingController,
  				public alertCtrl: AlertController,
  				private sqlitePorter: SQLitePorter,
  				public modalCtrl: ModalController) {

  	this.sqlite.create({
  		name: 'qc_checking_subkon.db',
  		location: 'default'
  	}).then((db: SQLiteObject) => {  
  			this.database = db;
  			
  		})
  		.catch(e => {		
  			this.showAlert('Notice','Error Insert Local DB!');
  			alert(JSON.stringify(e));         
  		});	
  }

  exportData(){
  	console.log('EXPORTING');
	this.sqlite.create({
		name: 'qc_checking_subkon.db',
		location: 'default'
	}).then((db: SQLiteObject) => {  
			this.database = db;

			// var successFn = function(sql, count){
			//     //console.log("Exported SQL: "+sql);
			//     //console.log("Exported SQL: "+sql);
		 //      	this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_export.php',sql)
		 //      	.subscribe(data => {
		 //      	    this.data.response = data["_body"]; 
		 //      	    console.log(JSON.stringify(this.data.response));
		 //      	}, error => {
		 //      		console.log(JSON.stringify(error));
		 //      	    this.loading.dismiss();
		 //      	    this.showAlert('Fail' , 'No Network Connection');
		 //      	});  
			// };

		this.sqlitePorter.exportDbToSql(this.database)
			.then((data ) => {
			    console.log("Exported SQL: "+data);
			    var newSql = JSON.stringify(data);
	         	this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_export.php',newSql)
	         	.subscribe(data => {
	         	    this.data.response = data["_body"]; 
	         	    //console.log(JSON.stringify(this.data.response));
	         	    alert('succcess');
	         	}, error => {
	         		console.log(JSON.stringify(error));
	         	    this.showAlert('Fail' , 'No Network Connection');
	         	}); 				    
			})
			
		})
		.catch(e => {		
			this.showAlert('Notice','Error Insert Local DB!');
			alert(JSON.stringify(e));         
		});	
  }

  importData(){
  	this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_import.php','')
  	.subscribe(data => {
  	    this.data.response = data["_body"]; 
  	    // console.log(JSON.stringify(this.data.response));
  	    var sql = this.data.response;
  	    this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
          	alert('success');
           	console.log('success');
          })
          .catch(e => {
          		console.error(JSON.stringify(e))
          		alert('error');
          	}
          );
  	}, error => {
  		console.log(JSON.stringify(error));
  	    this.showAlert('Fail' , 'No Network Connection');
  	}); 	
  }


  showAlert(title,subtile) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtile,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilitiesPage');
  }

}
