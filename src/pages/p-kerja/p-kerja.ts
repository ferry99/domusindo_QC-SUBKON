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
 * Generated class for the PKerjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-p-kerja',
  templateUrl: 'p-kerja.html',
})
export class PKerjaPage {

  data:any = {};
  loading:any;
  perintah_inspek:any = '';
  id_perintah_inspek:any = [];
  id_perintah_inspek_local:any = [];


  constructor(public navCtrl: NavController,
  				public navParams: NavParams , 
  				public actionsheetCtrl: ActionSheetController,
  				private sqlite: SQLite,
  				public http: Http,
  				public loadingCtrl: LoadingController,
  				public alertCtrl: AlertController,
  				private sqlitePorter: SQLitePorter,
  				public modalCtrl: ModalController) {
  	this.getPerintahInspekLocal();
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
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
            text: 'Ambil Perintah Inspek',
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

  //WORKFLOW GET NON LOCAL -> SAVE -> UPDATE -> GET LOCAL -> DISPLAY
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
  	        //this.showAlert('Notice' , 'Get Perintah Inspek Success');  	        
  	        this.savePerintahInspekLocal(rs.data);  	       
  	    }else{
  	    	if(rs.empty == true){
		  	    this.loading.dismiss();
  	    		this.showAlert('Error 01' , 'Perintah Inspek Baru Tidak Ditemukan');
  	    	}else{
  	    		this.showAlert('Error' , 'Sync Failed!!!!');
  	    	}
  	    }
  	}, error => {
  		console.log(JSON.stringify(error));
  	    this.loading.dismiss();
  	    this.showAlert('Fail' , 'No Network Connection');
  	});  
  }

	savePerintahInspekLocal(objPerintahInspek){
		this.sqlite.create({
			name: 'qc_checking_subkon.db',
			location: 'default'
		}).then((db: SQLiteObject) => {  				
				var sqlJson = {
				    "data":{
				        "inserts":{
				            "t_perintah_inspek":objPerintahInspek
				        }
				    }
				};
				//console.log(JSON.stringify(sqlJson));
				this.sqlitePorter.importJsonToDb(db, sqlJson)
					.then(() => {
						console.log('@Added items_inspeksi');
					 	let rsq = _.groupBy(objPerintahInspek, "no_perintah"); // GROUPING BY NO_PERINTAH
	        		this.id_perintah_inspek = _.keys(rsq); // GET ID_PERINTAH_INSPEK
						  this.updatePerintahInspekNonLocal(this.id_perintah_inspek , 'Y');
					})
					.catch(e => console.error(JSON.stringify(e)));			
				this.showAlert('Notice','Success!');
			})
			.catch(e => {		
				this.showAlert('Notice','Error Insert Local DB!');
				alert(JSON.stringify(e));         
			});	
	}


	updatePerintahInspekNonLocal(id_perintah_inspek , status){
		var objPost = {
			arr_id_perintah_inspek : id_perintah_inspek,
			status : status
		}
		var objPost2 = JSON.stringify(objPost);
		// console.log(objPost2);
	  	this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_update_perintah_inspek.php',objPost2)
	  	.subscribe(data => {
	  	    this.data.response = data["_body"]; 
	  	    var rs = JSON.parse(this.data.response);
	  	    //console.log(JSON.stringify(this.data.response));
	  	    if(rs.success == true){
            this.getPerintahInspekLocal();
		  	    console.log("@Update Status Success : " + rs.id_perintah_inspek);
		  	    //this.showAlert('Success' , 'Update Success!!!!');
	  	    }else{
	  	        this.showAlert('Error' , 'Sync Failed!!!!');
	  	    }
	  	}, error => {
	  		console.log(JSON.stringify(error));
	  	    // this.loading.dismiss();
	  	     this.showAlert('Fail' , 'No Network Connection');
	  	}); 		
	}

	getPerintahInspekLocal(){
		this.sqlite.create({
			name: 'qc_checking_subkon.db',
			location: 'default'
		}).then((db: SQLiteObject) => {  				
			var sql2 = 'SELECT * FROM t_perintah_inspek GROUP BY no_perintah';
			var arr_id_perintah_inspek = [];
			db.executeSql(sql2, {})
			.then(res => {
        var myArr = [];
				for (let i = 0; i < res.rows.length; i++) { 
					this.id_perintah_inspek_local.push(res.rows.item(i));
				}
				 console.log(this.id_perintah_inspek_local);
			})
			.catch(e => console.log(JSON.stringify(e)));
		})
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


@Component({
  template: `
	<ion-header>
	  <ion-toolbar>
	    <ion-title>
	      List Item Perintah Inspek
	    </ion-title>
	    <ion-buttons start>
	      <button ion-button (click)="dismiss()">
	        <span ion-text color="primary" showWhen="ios">Cancel</span>
	        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
	      </button>
	    </ion-buttons>
	  </ion-toolbar>
	</ion-header>

	<ion-content>
	  <ion-list>
	      <ion-item>        
	        <h2>No Perintah Inspek : {{id_perintah_inspek}}</h2>      
	      </ion-item>
	      <ion-item *ngFor="let item of items_inspeksi">
	        <h2>{{item.deskripsi}}</h2>   
	        <h2>{{item.po}}</h2>
	        <h3>{{item.vendor}}</h3>   
	        <ion-note item-end>	          
	        </ion-note>
	      </ion-item>
	  </ion-list>
	</ion-content>
	`
})

export class ModalContentPage {
  character;
  id_perintah_inspek = '';
  items_inspeksi:any = [];


  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter
  ) {

    this.clearVariable();

    //FINDING RESULT ITEM INSPECT FROM SQLITE
    this.id_perintah_inspek = this.params.get('charNum');

  	this.sqlite.create({
        name: 'qc_checking_subkon.db',
        location: 'default'
    }).then((db: SQLiteObject) => {
      		var sql = 'SELECT * FROM t_perintah_inspek WHERE no_perintah = ?';	      		
      		db.executeSql(sql ,[this.id_perintah_inspek])
      		.then(res => {
      			console.log('@Executed Select t_perintah_inspek');
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  clearVariable(){
  	this.id_perintah_inspek = '';
  	this.items_inspeksi = [];
  }
}