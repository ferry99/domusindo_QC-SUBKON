import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { ListPage } from '../list/list';


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
  statusInsert = false;

	itemFormsHeader = {
    id_inspeksi : "",
		id_perintah_inspek : "",
		trid_perintah_inspek : "",
		tanggal_inspeksi : "",
		nama_inspektor : "",
		nama_subkon : "",
		lokasi_subkon : "",
		no_po : "",
    po_item : "",
		id_material : "",
		nama_barang : "",
    jenis_barang : "",
		source_jenis_barang : "",
		qty_check : "",
    qty_fail : "",
		new_qty_check : "",
		cat_ketidaksesuaian : "",
    qty_defect : "",
    total_qty_fail : ""
	};

  itemForms = [    
               {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM1" , category: "metal_mentahan" ,  label: "Ukuran Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM2" , category: "metal_mentahan" ,  label: "Kesikuan Tidak Sesuai"  , option:"" , qty:"" , note:"" , status_fail:false},
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM3" , category: "metal_mentahan" ,  label: "Hasil Las Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM4" , category: "metal_mentahan" ,  label: "Hasil Gerinda Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false},
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MM5" , category: "metal_mentahan" ,  label: "Drat Leveler Tdk Berfungsi" , option:"" , qty:"" , note:"" , status_fail:false},
            ];


  itemForms2 = [    
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF1" ,category: "metal_finishing",  label: "Warna Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF2" ,category: "metal_finishing",  label: "Gloss Tidak Sesuai" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF3" ,category: "metal_finishing",  label: "Buble" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF4" ,category: "metal_finishing",  label: "Saging" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF5" ,category: "metal_finishing",  label: "Scratch" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF6" ,category: "metal_finishing",  label: "Dented" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF7" ,category: "metal_finishing",  label: "Chipping" , option:"" , qty:"" , note:"" ,status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "MF8" ,category: "metal_finishing",  label: "Dempul Tidak Bagus" , option:"" , qty:"" , note:"" ,status_fail:false }
            ];

  itemForms3 = [    
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW1" ,category: "white_wood" , label : "Permukaan Kasar" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW2" ,category: "white_wood" , label : "Ukuran Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW3" ,category: "white_wood" , label : "Jumlah Chip Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW4" ,category: "white_wood" , label : "Dempul Tidak bagus" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW5" ,category: "white_wood" , label : "Sudut tajam" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW6" ,category: "white_wood" , label : "Chipping" , option:"" , qty:"" , note:"" , status_fail:false },
              {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "WW7" ,category: "white_wood" , label : "Kelurusan Tidak Sesuai" , option:"" , qty:"" , note:"" , status_fail:false }
            ];

  itemForms4 = [    
         {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "RS1" ,category: "resin" , label : "Dimensi Sesuai" , option:"" , qty:"" , note:"" , status_fail:false },
         {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "RS2" ,category: "resin" , label : "Lubang Jarum" , option:"" , qty:"" , note:"" , status_fail:false },
         {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "RS3" ,category: "resin" , label : "Chipping" , option:"" , qty:"" , note:"" , status_fail:false },
         {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "RS4" ,category: "resin" , label : "Cacat" , option:"" , qty:"" , note:"" , status_fail:false }
       ];
 
  activeItemForm:any = [];
  isShow = true;

  constructor(public navCtrl: NavController, 
  			public events:Events,
  			public navParams: NavParams,
			private sqlite: SQLite,
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,
			private sqlitePorter: SQLitePorter) {

  	
  	if(navParams.get("id_inspeksi") != null){//IF ENTRY FROM PERINTAH INSPEK
  		this.id_inspeksi = navParams.get("id_inspeksi");
  		console.log('Edit inspek id : ' + this.id_inspeksi);

  		this.sqlite.create({
  			name: 'qc_checking_subkon.db',
  			location: 'default'
  		}).then((db: SQLiteObject) => {  				
  			this.database = db;
  			var sql = 'SELECT * FROM m_inspek WHERE id_inspeksi = ?';
  			this.database.executeSql(sql, [this.id_inspeksi])
  			.then(res => {
  				//GET FORM HEADER
  				for (let i = 0; i < res.rows.length; i++) { 
            this.itemFormsHeader.id_inspeksi   = res.rows.item(i).id_inspeksi;
  					this.itemFormsHeader.id_perintah_inspek   = res.rows.item(i).id_perintah_inspek;
  					this.itemFormsHeader.trid_perintah_inspek = res.rows.item(i).trid_perintah_inspek;
  					this.itemFormsHeader.tanggal_inspeksi     = res.rows.item(i).tanggal_inspeksi;
  					this.itemFormsHeader.nama_inspektor       = res.rows.item(i).nama_inspektor;
  					this.itemFormsHeader.nama_subkon          = res.rows.item(i).nama_subkon; 
  					this.itemFormsHeader.lokasi_subkon        = res.rows.item(i).lokasi_subkon;
  					this.itemFormsHeader.no_po                = res.rows.item(i).no_po; 
            this.itemFormsHeader.po_item              = res.rows.item(i).po_item;   
  					this.itemFormsHeader.id_material          = res.rows.item(i).id_material;
  					this.itemFormsHeader.nama_barang          = res.rows.item(i).nama_barang;
  					this.itemFormsHeader.jenis_barang         = res.rows.item(i).jenis_barang; 
            this.itemFormsHeader.source_jenis_barang   = res.rows.item(i).jenis_barang; 
  					this.itemFormsHeader.qty_check            = res.rows.item(i).qty_check; 
            this.itemFormsHeader.qty_fail            = res.rows.item(i).qty_fail; 
            this.itemFormsHeader.new_qty_check        = res.rows.item(i).qty_check;
  				}
  				//GET DETAIL FORM
  				// if(this.itemFormsHeader.jenis_barang == 'MM'){
  				// 	this.activeItemForm = this.itemForms;		
  				// }else if(this.itemFormsHeader.jenis_barang == 'MF'){
  				// 	this.activeItemForm = this.itemForms2;	
  				// }else if(this.itemFormsHeader.jenis_barang == 'WW'){
  				// 	this.activeItemForm = this.itemForms3;
  				// }

  				var sql = 'SELECT * FROM t_detail_pemeriksaan WHERE id_inspeksi = ?';
  				this.database.executeSql(sql, [this.id_inspeksi])
  				.then(res2 => {
            this.activeItemForm = [];
  					for (let j = 0; j < res2.rows.length; j++) { 
  						// var item1 = [];
              this.activeItemForm.push(res2.rows.item(j));
              // console.log(JSON.stringify(this.activeItemForm[j]));
  					}
            //console.log(JSON.stringify(this.activeItemForm));
  				})
  			})
  		})
  		.catch(e => {		
  			this.showAlert('Notice','Error Connect DB!');
  			alert(JSON.stringify(e));         
  		});	
		

  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditInspekPage');
  }

  onChange(val){
    if(val == this.itemFormsHeader.source_jenis_barang){
      // alert('aaa');
    }else if(val != this.itemFormsHeader.source_jenis_barang){
      this.activeItemForm = [];
      if(val == 'MM'){
        console.log(JSON.stringify(this.itemForms));
        this.activeItemForm = this.itemForms;    
        //this.itemFormsHeader.jenis_barang = 'MM';

      }else if(val == 'MF'){
        this.activeItemForm = this.itemForms2;  
        //this.itemFormsHeader.jenis_barang = 'MF';

      }else if(val == 'WW'){
        this.activeItemForm = this.itemForms3;
                //this.itemFormsHeader.jenis_barang = 'WW';

      }else if(val == 'RS'){
        this.activeItemForm = this.itemForms4;
                //this.itemFormsHeader.jenis_barang = 'WW';

      }
    }
  }

  editDataInspek(){
    // console.log(JSON.stringify(this.itemFormsHeader));
    // console.log(JSON.stringify(this.activeItemForm));

    this.isShow = false;
    let loading = this.loadingCtrl.create({
      content: 'Updating Data...'
    });
    let limit_qty_inspek = 0;

    //IF QTY CHECK MORE THAN CURR QTY INSPEK PERINTAH KERJA
    this.sqlite.create({
      name: 'qc_checking_subkon.db',
      location: 'default'
    }).then((db: SQLiteObject) => {          
      this.database = db;
      var sql = 'SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = ?';
      return this.database.executeSql(sql, [this.itemFormsHeader.trid_perintah_inspek]);   
    })
      .then(res => { 
        for (let i = 0; i < res.rows.length; i++) { 
          limit_qty_inspek = res.rows.item(i).limit_qty_inspek;
        }   
        let new_limit_qty_inspek = (+limit_qty_inspek) + parseInt(this.itemFormsHeader.qty_check);
        console.log(this.itemFormsHeader.new_qty_check + 'vs' + new_limit_qty_inspek);
        if(parseInt(this.itemFormsHeader.new_qty_check) > new_limit_qty_inspek){
          this.statusInsert = false;
          loading.dismiss();
          alert('Qty Tidak Sesuai');
          this.isShow = true;
          return Promise.reject(false);
        }else{
          this.statusInsert = true;
        }
      })

      .then(res => { //UPDATE M MASTER
        console.log('QTY VALID COTINUE CHAIN 3');  
        loading.present();
        var qty_defect   = 0;
        var total_qty_fail = 0; 
        var updatedDetailPemeriksaan = [];

        for(var idx in this.activeItemForm){
          if(this.activeItemForm[idx].status_fail == "true"){
            total_qty_fail += parseInt(this.activeItemForm[idx].qty);
          }

          qty_defect = (+qty_defect) + (+this.activeItemForm[idx].qty);

          var obj = {
            "set" : this.activeItemForm[idx],
            "where" : {"rowid" : this.activeItemForm[idx].rowid}
          }
          updatedDetailPemeriksaan.push(obj);
        }

        //DETERMINE UPDATE LIMIT QTY INSPEK
        var selisihCheck = (+this.itemFormsHeader.new_qty_check) - (+this.itemFormsHeader.qty_check); 
        var selisihfail  = (+this.itemFormsHeader.qty_fail) - +total_qty_fail;
        
        var new_limit_qty_inspek = limit_qty_inspek;
        if(selisihCheck !== 0){ // IF QTY CHECK 
          new_limit_qty_inspek = (+new_limit_qty_inspek) - (+selisihCheck);
        }

        if(selisihfail !== 0){
          new_limit_qty_inspek = (+new_limit_qty_inspek) + (+selisihfail);
        }

        // alert('limit qty' + limit_qty_inspek);       

        var updatedPerintahKerja = [
          // {
          //   "set" : {"limit_qty_inspek" : new_limit_qty_inspek},
          //   "where" : {"trid" : this.itemFormsHeader.trid_perintah_inspek }
          // },
          {
            "set" : {"limit_qty_inspek" : new_limit_qty_inspek},
            "where" : {"po" : this.itemFormsHeader.no_po , "idmat" : this.itemFormsHeader.id_material , "po_item" : this.itemFormsHeader.po_item}
          }
        ]

        console.log(JSON.stringify(updatedPerintahKerja));

        var arrMasterInspekToUpdate = {  
            "tanggal_inspeksi" : this.itemFormsHeader.tanggal_inspeksi,
            "nama_inspektor" : this.itemFormsHeader.nama_inspektor,
            "lokasi_subkon" : this.itemFormsHeader.lokasi_subkon,
            "qty_check" : this.itemFormsHeader.new_qty_check,
            "qty_fail" : total_qty_fail,
            "qty_defect" : qty_defect,  
            "modified_on" : new Date().toISOString(),          
        }        

        var updatedMasterInspek = {
          "set" : arrMasterInspekToUpdate,
          "where" : {"id_inspeksi" : this.itemFormsHeader.id_inspeksi}
        }

        var sqlJson = {
          "data":{
            "updates":{
                "m_inspek":[updatedMasterInspek],
                "t_detail_pemeriksaan":updatedDetailPemeriksaan,
                "t_perintah_inspek" : updatedPerintahKerja
            }
          }
        }

        //console.log(JSON.stringify(sqlJson));
        this.sqlitePorter.importJsonToDb(this.database, sqlJson)
        .then(() => {
            loading.dismiss();
            this.showAlert('Notice','Update Success!');
            this.navCtrl.setRoot(ListPage);
        })
        .catch(e =>{
          this.showAlert('ERROR','UPDATE ERRORRR!');
          loading.dismiss();
          console.error(JSON.stringify(e))
        });        
      })
      .catch(e => {
        console.log('Qty not suitable');
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

}
