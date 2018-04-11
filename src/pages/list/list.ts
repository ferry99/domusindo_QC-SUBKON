import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { EditInspekPage } from '../edit-inspek/edit-inspek';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items = [];
  tanggal_inspeksi: String = new Date().toISOString();
  //tanggal_inspeksi = '2018-04-07';
  loading:any;

    constructor(    
        public navCtrl: NavController,
        public navParams: NavParams,  
        private sqlite: SQLite,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private sqlitePorter: SQLitePorter){
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        this.items = [];
        
    }


    searchData(){
        this.items = [];
        this.loading = this.loadingCtrl.create({
            content: 'Searching Data...'
        });
        this.loading.present();
        var new_format_tanggal_inspeksi = this.tanggal_inspeksi.substring(0,10);
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
            }).then((db: SQLiteObject) => {        
                var sql = 'SELECT * FROM m_inspek WHERE tanggal_inspeksi = ?'
                db.executeSql(sql,[new_format_tanggal_inspeksi])
                .then(res => {
                    if(res.rows.length > 0) { 
                        this.items = [];                        
                        for(var i=0; i<res.rows.length; i++) {
                            let data1 = {
                                            icon:"",
                                            id_perintah_inspek : "",
                                            id_inspeksi : "",
                                            tanggal_inspeksi : "",
                                            nama_inspektor : "",
                                            nama_subkon : "",
                                            lokasi_subkon : "",
                                            no_po : "",
                                            id_material : "",
                                            nama_barang : "",
                                            jenis_barang : "",
                                            qty_check : "",
                                            qty_fail : "",
                                            qty_defect : "",
                                            cat_ketidaksesuaian : "",
                                            date_created:"",
                                            is_sync:""};  
                            data1.icon                = 'paper-plane';
                            data1.id_perintah_inspek  = res.rows.item(i).id_perintah_inspek;
                            data1.id_inspeksi         = res.rows.item(i).id_inspeksi;
                            data1.tanggal_inspeksi    = res.rows.item(i).tanggal_inspeksi;
                            data1.nama_inspektor      = res.rows.item(i).nama_inspektor;
                            data1.nama_subkon         = res.rows.item(i).nama_subkon; 
                            data1.lokasi_subkon       = res.rows.item(i).lokasi_subkon;
                            data1.no_po               = res.rows.item(i).no_po;  
                            data1.id_material         = res.rows.item(i).id_material;
                            data1.nama_barang         = res.rows.item(i).nama_barang;
                            data1.jenis_barang        = res.rows.item(i).jenis_barang; 
                            data1.qty_check           = res.rows.item(i).qty_check; 
                            data1.qty_fail            = res.rows.item(i).qty_fail; 
                            data1.qty_defect          = res.rows.item(i).qty_defect; 
                            data1.cat_ketidaksesuaian = res.rows.item(i).cat_ketidaksesuaian; 
                            data1.date_created        = res.rows.item(i).date_created; 
                            data1.is_sync             = res.rows.item(i).is_sync; 
                            if(data1.is_sync == 'true'){
                                data1.is_sync = 'synced';
                            }else{
                                data1.is_sync = 'not synced';
                            }
                            this.items.push(data1);
                        }
                    }
                    this.loading.dismiss();
                })
                .catch(e => {console.log(JSON.stringify(e))
                                this.loading.dismiss();
                            });
            }).catch(e => {console.log(JSON.stringify(e))
                                this.loading.dismiss();
                           });
    }

    getItems(ev: any) {
      // Reset items back to all of the items
      //this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;
      alert(val);

      // if the value is an empty string don't filter the items
      // if (val && val.trim() != '') {
      //   this.items = this.items.filter((item) => {
      //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   })
      // }
    }

    itemTapped(event, item){
     // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage, {
           item: item
        });
    }

    editInspek(id_inspeksi , is_sync){
      if(is_sync == 'synced'){
        alert('Tidak Bisa Mengedit Karena sudah Di SYNCRON');
      }else{
        this.navCtrl.push(EditInspekPage, {
          id_inspeksi:id_inspeksi
        });
      }      
    }
}
