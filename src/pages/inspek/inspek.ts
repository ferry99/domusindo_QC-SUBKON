import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { HomePage } from '../home/home';
import { Inspek2Page } from '../inspek2/inspek2';


/**
 * Generated class for the InspekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inspek',
  templateUrl: 'inspek.html',
})
export class InspekPage {

	// data            = { date:"", type:"", description:"", amount:0 };
	item_inspek:any = {};
	is_from_perintah = false;

	itemFormsHeader = {
		id_perintah_inspek : "",
		trid_perintah_inspek : "",
		tanggal_inspeksi : new Date().toISOString(),
		nama_inspektor : "",
		nama_subkon : "",
		lokasi_subkon : "",
		no_po : "",
		po_item :"",
		id_material : "",
		nama_barang : "",
		jenis_barang : "",
		qty_order : "",
		qty_check : "",
		new_qty_check : 0,
		cat_ketidaksesuaian : "",
	};

	itemForms       = [];
	itemForms2      = [];
	itemForms3      = [];
	total_defect = 0;
	statusInsert:boolean = true;

	disableBtn: boolean;
	myDropDown : any = '';
	date : any = '';
	today_date : String = '';
	isShow:boolean = true;

  constructor(
  			public navCtrl: NavController, 
  			public events:Events,
  			public navParams: NavParams,
			private sqlite: SQLite,
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,
			private sqlitePorter: SQLitePorter) {

  	//console.log(navParams.get("firstPassed"));
  	if(navParams.get("firstPassed") != null){//IF ENTRY FROM PERINTAH INSPEK
		this.is_from_perintah                     = true;
		this.item_inspek                          = navParams.get("firstPassed");
		//console.log(this.item_inspek.no_po);
		this.itemFormsHeader.trid_perintah_inspek = this.item_inspek.trid;
		this.itemFormsHeader.id_perintah_inspek   = this.item_inspek.no_perintah;
		this.itemFormsHeader.nama_subkon          = this.item_inspek.vendor;
		this.itemFormsHeader.no_po                = this.item_inspek.po;
		this.itemFormsHeader.po_item              = this.item_inspek.po_item;//INSERT PO ITEM
		this.itemFormsHeader.nama_barang          = this.item_inspek.deskripsi;
		this.itemFormsHeader.id_material          = this.item_inspek.idmat;
		this.itemFormsHeader.qty_order            = this.item_inspek.qty_ord;
  		console.log(JSON.stringify(navParams.get("firstPassed")));
  	}else if(navParams.get("firstPassed") == null){
  		console.log('No data passed');
		//console.log(JSON.stringify(navParams.get("firstPassed")));
  	}

  	this.itemForms = [  	
					 	{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM1" , category: "metal_mentahan" ,  label: "Ukuran Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM2" , category: "metal_mentahan" ,  label: "Kesikuan Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM3" , category: "metal_mentahan" ,  label: "Hasil Las Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM4" , category: "metal_mentahan" ,  label: "Hasil Gerinda Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM5" , category: "metal_mentahan" ,  label: "Drat Leveler Tdk Berfungsi" , option:"" , qty:"" , note:"" , status_fail:false},
					];


  	this.itemForms2 = [  	
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF1" ,category: "metal_finishing",  label: "Warna Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF2" ,category: "metal_finishing",  label: "Gloss Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF3" ,category: "metal_finishing",  label: "Buble" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF4" ,category: "metal_finishing",  label: "Saging" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF5" ,category: "metal_finishing",  label: "Scratch" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF6" ,category: "metal_finishing",  label: "Dented" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF7" ,category: "metal_finishing",  label: "Chipping" , option:"" , qty:"" , note:"" ,status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF8" ,category: "metal_finishing",  label: "Dempul Tidak Bagus" , option:"" , qty:"" , note:"" ,status_fail:false }
					];

  	this.itemForms3 = [  	
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW1" ,category: "white_wood" , label : "Permukaan Kasar" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW2" ,category: "white_wood" , label : "Ukuran Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW3" ,category: "white_wood" , label : "Jumlah Chip Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW4" ,category: "white_wood" , label : "Dempul Tidak bagus" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW5" ,category: "white_wood" , label : "Sudut tajam" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW6" ,category: "white_wood" , label : "Chipping" , option:"" , qty:"" , note:"" , status_fail:false },
						{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW7" ,category: "white_wood" , label : "Kelurusan Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false }
					];

  }


	ionViewDidLoad() {
		console.log('ionViewDidLoad InspekPage');
	}



	saveDataInspek() {
		//console.log(this.itemFormsHeader);
		this.isShow = false;
		let loading = this.loadingCtrl.create({
			content: 'Saving Data...'
		});


		if(this.itemFormsHeader.jenis_barang == ''){

		}

		//IF QTY CHECK MORE THAN CURR QTY INSPEK
		if(parseInt(this.itemFormsHeader.qty_check) > parseInt(this.item_inspek.limit_qty_inspek)){
			this.statusInsert = false;
		}else{
			this.statusInsert = true;
		}

		if(this.statusInsert == true){
					loading.present();

			this.sqlite.create({
				name: 'qc_checking_subkon.db',
				location: 'default'
			}).then((db: SQLiteObject) => {
				var qty_defect   = 0;
				var jenis_barang = this.itemFormsHeader.jenis_barang;
	       		var new_format_tanggal_inspeksi = this.itemFormsHeader.tanggal_inspeksi.substring(0,10);

	       		//MAPING DETAIL FORM TO ACTIVE FORM
				if(jenis_barang == 'MM'){
					var activeItemForm = this.itemForms;		
				}else if(jenis_barang == 'MF'){
					var activeItemForm = this.itemForms2;	
				}else if(jenis_barang == 'WW'){
					var activeItemForm = this.itemForms3;
				}

				for(var idx in activeItemForm){
					qty_defect = (+qty_defect) + (+activeItemForm[idx].qty);
				}
				this.date = new Date();
				this.today_date = this.date.getFullYear().toString()+'-'+(this.date.getMonth()+1).toString()+'-'+this.date.getDate().toString();	
				//console.log(this.itemFormsHeader.id_perintah_inspek);
				var id_perintah_inspek	= this.itemFormsHeader.id_perintah_inspek;
				var trid_perintah_inspek= this.itemFormsHeader.trid_perintah_inspek;
				var tanggal_inspeksi    = new_format_tanggal_inspeksi; 
				var nama_inspektor      = this.itemFormsHeader.nama_inspektor; 
				var nama_subkon         = this.itemFormsHeader.nama_subkon;
				var lokasi_subkon       = this.itemFormsHeader.lokasi_subkon;
				var no_po               = this.itemFormsHeader.no_po; 
				var id_material         = this.itemFormsHeader.id_material;
				var po_item             = this.itemFormsHeader.po_item;
				var nama_barang         = this.itemFormsHeader.nama_barang;
				var qty_order           = this.itemFormsHeader.qty_order;
				var qty_check           = this.itemFormsHeader.qty_check;
				var cat_ketidaksesuaian = this.itemFormsHeader.cat_ketidaksesuaian;
				var date_created        = this.today_date;
				var is_sync				= '';
				var modified_on			= '';

				//SUM ALL QTY STATUS FAIL
				var total_qty_fail = 0;
				for(var idx in activeItemForm){
					if(activeItemForm[idx].status_fail == true){
						total_qty_fail += parseInt(activeItemForm[idx].qty);
					}
				}		
	
				var arrToInsert = [id_perintah_inspek,trid_perintah_inspek,tanggal_inspeksi,nama_inspektor,nama_subkon ,lokasi_subkon,no_po ,id_material,po_item,nama_barang,jenis_barang,qty_order,qty_check,total_qty_fail,qty_defect,cat_ketidaksesuaian,date_created,is_sync]; 
			    console.log(arrToInsert);

				//INSERT MASTER HEADER
				db.executeSql('INSERT INTO m_inspek VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', arrToInsert)
				.then(res => {
					console.log('@Added Master Inspeksi: ' + JSON.stringify(res)); 
					for(var idx in activeItemForm){
						activeItemForm[idx].rowid = 'NULL';
						activeItemForm[idx].id_inspeksi = res.insertId; 						
						//console.log(JSON.stringify(activeItemForm[idx]));
					}
					
					//Update qty check - qty fail
					this.itemFormsHeader.new_qty_check = parseInt(this.itemFormsHeader.qty_check) - total_qty_fail;


					var sqlJson = {
					    "data":{
					        "inserts":{
					            "t_detail_pemeriksaan":activeItemForm
					        }
					    }
					};

					// console.log(JSON.stringify(sqlJson));
					this.sqlitePorter.importJsonToDb(db, sqlJson)
						.then(() => {
							console.log('@Added Item Pemeriksaan');
							//UPDATE curr_qty_inspek MINUS IT
							var no_po   = this.itemFormsHeader.no_po;
							var idmat   = this.itemFormsHeader.id_material;
							var po_item = this.itemFormsHeader.po_item;
							var sqlUpdate = "UPDATE t_perintah_inspek SET curr_qty_inspek=(SELECT curr_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "';"+
							                "UPDATE t_perintah_inspek SET limit_qty_inspek=(SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE po = '" + no_po + "' AND po_item = '" + po_item + "' AND trid != '" + this.itemFormsHeader.trid_perintah_inspek + "';"+					           					           
							                "UPDATE t_perintah_inspek SET limit_qty_inspek=(SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "';";
							this.sqlitePorter.importSqlToDb(db, sqlUpdate)
							.then(() => {
							    console.log('Updated');
							    loading.dismiss();
							    this.isShow = true;
							    this.showAlert('Notice','Success!');
							    if(this.is_from_perintah == true){
							    	this.events.publish('reloadDetails');
							    	this.navCtrl.setRoot(Inspek2Page);
							    }
							})
							.catch(e =>{
								loading.dismiss();
							    console.error(JSON.stringify(e))
							});
						})
						.catch(e => console.error(JSON.stringify(e)));


					// alert('success:' + JSON.stringify(res));
				})
				.catch(e => {
					loading.dismiss();
					this.isShow = true;
					this.showAlert('Notice','Error Insert DB!');
					// alert(JSON.stringify(e));
					alert(JSON.stringify(e));         
				});
			}).catch(e => {
				loading.dismiss();
				this.isShow = true;
				this.showAlert('Notice','Error!');
				// alert(JSON.stringify(e));
				console.log(e);      
			});
		}else{
			loading.dismiss();
			alert('Qty Tidak Sesuai');
			this.isShow = true;
		}
	}

	saveData1(){
		this.itemFormsHeader.jenis_barang = '';
		console.log('disable');
		// console.log(this.today_date);
		// console.log(this.myDropDown);
		// //var sql = "INSERT INTO field check subkon VALUES(NULL,?,?,?,?)",[this.itemForms[0]];
		// if(this.itemForms[0].category == "metal_mentahan"){
		// 	console.log('metal mentah');
		// 	console.log(this.itemForms[0].qty);
		// }
	}


	dropTable(){
		this.sqlite.create({
			name: 'qc_checking_subkon.db',
			location: 'default'
		}).then((db: SQLiteObject) => {
		db.executeSql('DROP TABLE m_inspek' , {})
		.then(res => {
			alert('success:' + JSON.stringify(res));
			console.log(res);         
		})
  		.catch(e => {
		    alert(e);
		    console.log(e);         
		  });
		}).catch(e => {
			alert(e);
			console.log(e);      
		});
	}

	addNewInspek(){
		this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
