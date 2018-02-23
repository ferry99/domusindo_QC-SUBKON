import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

/**
 * Generated class for the EditInspekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-inspek',
  templateUrl: 'edit-inspek.html',
})
export class EditInspekPage {

	item_inspek:any = {};
	database : SQLiteObject;
	id_inspeksi: any;

	itemFormsHeader = {
		id_perintah_inspek : "",
		trid_perintah_inspek : "",
		tanggal_inspeksi : "",
		nama_inspektor : "",
		nama_subkon : "",
		lokasi_subkon : "",
		no_po : "",
		id_material : "",
		nama_barang : "",
		jenis_barang : "",
		qty_check : "",
		new_qty_check : 0,
		cat_ketidaksesuaian : "",
	};

	itemForms       = [];
	itemForms2      = [];
	itemForms3      = [];
	activeItemForm 		= [];

  constructor(public navCtrl: NavController, 
  			public events:Events,
  			public navParams: NavParams,
			private sqlite: SQLite,
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,
			private sqlitePorter: SQLitePorter) {

  	// this.itemForms = [  	
			// 		 	{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM1" , category: "metal_mentahan" ,  label: "Ukuran Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM2" , category: "metal_mentahan" ,  label: "Kesikuan Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM3" , category: "metal_mentahan" ,  label: "Hasil Las Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM4" , category: "metal_mentahan" ,  label: "Hasil Gerinda Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM5" , category: "metal_mentahan" ,  label: "Drat Leveler Tdk Berfungsi" , option:"" , qty:"" , note:"" , status_fail:false},
			// 		];


  	// this.itemForms2 = [  	
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF1" ,category: "metal_finishing",  label: "Warna Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF2" ,category: "metal_finishing",  label: "Gloss Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF3" ,category: "metal_finishing",  label: "Buble" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF4" ,category: "metal_finishing",  label: "Saging" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF5" ,category: "metal_finishing",  label: "Scratch" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF6" ,category: "metal_finishing",  label: "Dented" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF7" ,category: "metal_finishing",  label: "Chipping" , option:"" , qty:"" , note:"" ,status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF8" ,category: "metal_finishing",  label: "Dempul Tidak Bagus" , option:"" , qty:"" , note:"" ,status_fail:false }
			// 		];

  	// this.itemForms3 = [  	
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW1" ,category: "white_wood" , label : "Permukaan Kasar" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW2" ,category: "white_wood" , label : "Ukuran Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW3" ,category: "white_wood" , label : "Jumlah Chip Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW4" ,category: "white_wood" , label : "Dempul Tidak bagus" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW5" ,category: "white_wood" , label : "Sudut tajam" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW6" ,category: "white_wood" , label : "Chipping" , option:"" , qty:"" , note:"" , status_fail:false },
			// 			{rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW7" ,category: "white_wood" , label : "Kelurusan Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false }
			// 		];



  	// if(navParams.get("id_inspeksi") != null){//IF ENTRY FROM PERINTAH INSPEK
  	// 	this.id_inspeksi = navParams.get("id_inspeksi");
  	// 	console.log('Edit inspek id : ' + this.id_inspeksi);

  	// 	this.sqlite.create({
  	// 		name: 'qc_checking_subkon.db',
  	// 		location: 'default'
  	// 	}).then((db: SQLiteObject) => {  				
  	// 		this.database = db;
  	// 		var sql = 'SELECT * FROM m_inspek WHERE id_inspeksi = ?';
  	// 		this.database.executeSql(sql, [this.id_inspeksi])
  	// 		.then(res => {
  	// 			//GET FORM HEADER
  	// 			for (let i = 0; i < res.rows.length; i++) { 
  	// 				this.itemFormsHeader.id_perintah_inspek   = res.rows.item(i).id_perintah_inspek;
  	// 				this.itemFormsHeader.trid_perintah_inspek = res.rows.item(i).trid_perintah_inspek;
  	// 				this.itemFormsHeader.tanggal_inspeksi     = res.rows.item(i).tanggal_inspeksi;
  	// 				this.itemFormsHeader.nama_inspektor       = res.rows.item(i).nama_inspektor;
  	// 				this.itemFormsHeader.nama_subkon          = res.rows.item(i).nama_subkon; 
  	// 				this.itemFormsHeader.lokasi_subkon        = res.rows.item(i).lokasi_subkon;
  	// 				this.itemFormsHeader.no_po                = res.rows.item(i).no_po;  
  	// 				this.itemFormsHeader.id_material          = res.rows.item(i).id_material;
  	// 				this.itemFormsHeader.nama_barang          = res.rows.item(i).nama_barang;
  	// 				this.itemFormsHeader.jenis_barang         = res.rows.item(i).jenis_barang; 
  	// 				this.itemFormsHeader.qty_check            = res.rows.item(i).qty_check; 
  	// 			}
  	// 			//GET DETAIL FORM
  	// 			if(this.itemFormsHeader.jenis_barang == 'MM'){
  	// 				this.activeItemForm = this.itemForms;		
  	// 			}else if(this.itemFormsHeader.jenis_barang == 'MF'){
  	// 				this.activeItemForm = this.itemForms2;	
  	// 			}else if(this.itemFormsHeader.jenis_barang == 'WW'){
  	// 				this.activeItemForm = this.itemForms3;
  	// 			}

  	// 			var sql = 'SELECT * FROM t_detail_pemeriksaan WHERE id_inspeksi = ?';
  	// 			this.database.executeSql(sql, [this.id_inspeksi])
  	// 			.then(res2 => {
  	// 				for (let j = 0; j < res2.rows.length; j++) { 
  	// 					var item1 = {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "" , category: "" ,  label: ""  , option:"" , qty:"" , note:"",status_fail:""};
  	// 					this.activeItemForm.rowid          = res2.rows.item(j).rowid;
  	// 					this.activeItemForm.id_inspeksi    = res2.rows.item(j).id_inspeksi;
  	// 					this.activeItemForm.id_pemeriksaan = res2.rows.item(j).id_pemeriksaan;
  	// 					this.activeItemForm.category       = res2.rows.item(j).category;
  	// 					this.activeItemForm.label          = res2.rows.item(j).label;
  	// 					this.activeItemForm.option         = res2.rows.item(j).option;  
  	// 					this.activeItemForm.qty            = res2.rows.item(j).qty;
  	// 					this.activeItemForm.note           = res2.rows.item(j).note;
  	// 					this.activeItemForm.status_fail    = res2.rows.item(j).status_fail;
  	// 					console.log(res2.rows.item(j).qty);
  	// 				}
  					
  	// 			})
  	// 		})
  	// 	})
  	// 	.catch(e => {		
  	// 		this.showAlert('Notice','Error Connect DB!');
  	// 		alert(JSON.stringify(e));         
  	// 	});	
		

  	// }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInspekPage');
  }

}
