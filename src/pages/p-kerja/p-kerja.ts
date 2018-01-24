import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'underscore';


/**
 * Generated class for the PKerjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-p-kerja',
  templateUrl: 'p-kerja.html',
})
export class PKerjaPage {

  data:any = {};
  loading:any;
  perintah_inspek:any = '';
  id_perintah_inspek:any = '';


  constructor(public navCtrl: NavController,
  				public navParams: NavParams , 
  				public actionsheetCtrl: ActionSheetController,
  				private sqlite: SQLite,
  				public http: Http,
  				public loadingCtrl: LoadingController,
  				public alertCtrl: AlertController,
  				private sqlitePorter: SQLitePorter) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PKerjaPage');
  }

  openMenu() {
      let actionSheet = this.actionsheetCtrl.create({
        title: 'Menus',
        cssClass: 'action-sheets-basic-page',
        buttons: [          
          {
            text: 'Ambil PK',
            icon:  'share' ,
            handler: () => {
              console.log('Getting Perintah Kerja');
              this.getPerintahInspek();
            }
          },        
          
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: 'close' ,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }

  getPerintahInspek(){

  	this.loading = this.loadingCtrl.create({
  	    content: 'Sync Data...'
  	});

  	this.loading.present();

  	console.log('@Starting getting json');

  	this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_get_perintah_inspek.php','')
  	.subscribe(data => {
  	    this.data.response = data["_body"]; 
  	    var rs = JSON.parse(this.data.response);
  	    if(rs.success == true){
	  	    this.loading.dismiss();
  	        this.showAlert('Notice' , 'Get Perintah Inspek Success');  	        
  	        this.savePerintahInspekLocal(rs.data);
  	        let rsq = _.groupBy(rs.data, "no_perintah"); // GROUPING BY NO_PERINTAH
  	        this.id_perintah_inspek = _.keys(rsq); // GET ID_PERINTAH_INSPEK
  	    }else{
  	        this.showAlert('Error' , 'Sync Failed!!!!');
  	    }
  	    //console.log(JSON.stringify(data));
  	}, error => {
  		console.log(JSON.stringify(error));
  	    // this.loading.dismiss();
  	    // this.showAlert('Fail' , 'No Network Connection');
  	});  
  }

  savePerintahInspekLocal(objPerintahInspek){
  	console.log(JSON.stringify(objPerintahInspek));
	// this.sqlite.create({
	// 	name: 'qc_checking_subkon.db',
	// 	location: 'default'
	// }).then((db: SQLiteObject) => {  				
	// 	var arrToInsert = [tanggal_inspeksi,nama_inspektor,nama_subkon ,lokasi_subkon,no_po ,id_material,nama_barang,jenis_barang,qty_check,qty_defect,cat_ketidaksesuaian,date_created,is_sync]; 
	// 	//console.log(arrToInsert);
	// 		var sqlJson = {
	// 		    "data":{
	// 		        "inserts":{
	// 		            "t_detail_pemeriksaan":activeItemForm
	// 		        }
	// 		    }
	// 		};
	// 		console.log(JSON.stringify(sqlJson));
	// 		this.sqlitePorter.importJsonToDb(db, sqlJson)
	// 			.then(() => console.log('@Added Item Pemeriksaan'))
	// 			.catch(e => console.error(JSON.stringify(e)));

	// 		loading.dismiss();
	// 		this.isShow = true;
	// 		this.showAlert('Notice','Success!');
	// 		// alert('success:' + JSON.stringify(res));
	// 	})
	// 	.catch(e => {
	// 		loading.dismiss();
	// 		this.isShow = true;
	// 		this.showAlert('Notice','Error Insert DB!');
	// 		// alert(JSON.stringify(e));
	// 		alert(JSON.stringify(e));         
	// 	});	
  }

  showAlert(title,subtile) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtile,
      buttons: ['OK']
    });
    alert.present();
  }

}
