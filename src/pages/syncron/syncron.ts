import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';



/**
 * Generated class for the SyncronPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-syncron',
  templateUrl: 'syncron.html',
})
export class SyncronPage {

    // authForm: FormGroup;
    arrDetailItem     = [];
    arrItemFormHeader = [];
    tanggal_inspeksi:any;

    data:any = {};
    loading:any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,  
  	private sqlite: SQLite,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private sqlitePorter: SQLitePorter,
    public formBuilder: FormBuilder) {

      // this.authForm = formBuilder.group({
      //       tanggal_inspeksi: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      //   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncronPage');
  }

    sync(){
   
         this.loading = this.loadingCtrl.create({
            content: 'Sync Data...'
        });

        this.loading.present();

        console.log('@Starting to post json');

        this.sqlite.create({
        name: 'qc_checking_subkon.db',
        location: 'default'
        }).then((db: SQLiteObject) => {           
             // STEP 1 -------- GET MASTER_INSPEKSI  
            var sql = 'SELECT * FROM m_inspek WHERE tanggal_inspeksi = ? AND is_sync = ?'
            db.executeSql(sql,[this.tanggal_inspeksi , ''])
            .then(res => {         
                this.arrDetailItem = [];
                this.arrItemFormHeader = [];
                if(res.rows.length > 0) { 
                    for (let i = 0; i < res.rows.length; i++) {   
                        let data1 = {id_inspeksi : "",
                                        tanggal_inspeksi : "",
                                        nama_inspektor : "",
                                        nama_subkon : "",
                                        lokasi_subkon : "",
                                        no_po : "",
                                        id_material : "",
                                        nama_barang : "",
                                        jenis_barang : "",
                                        qty_check : "",
                                        qty_defect : "",
                                        cat_ketidaksesuaian : "",
                                        date_created:""};   

                        // STEP 2 -------- GET ITTERATE DETAIL_PEMERIKSAAN  
                        var sql2 = 'SELECT * FROM t_detail_pemeriksaan WHERE id_inspeksi = ? '
                            db.executeSql(sql2,[res.rows.item(i).id_inspeksi])
                        .then(res2 => {  
                            if(res2.rows.length > 0) { 
                                for (var j = 0; j < res2.rows.length; j++) { 
                                    var item1 = {rowid: "" , id_inspeksi : "" , id_pemeriksaan : "" , category: "" ,  label: ""  , option:"" , qty:"" , note:""};
                                    item1.rowid          = res2.rows.item(j).rowid;
                                    item1.id_inspeksi    = res2.rows.item(j).id_inspeksi;
                                    item1.id_pemeriksaan = res2.rows.item(j).id_pemeriksaan;
                                    item1.category       = res2.rows.item(j).category;
                                    item1.label          = res2.rows.item(j).label;
                                    item1.option         = res2.rows.item(j).option;  
                                    item1.qty            = res2.rows.item(j).qty;
                                    item1.note           = res2.rows.item(j).note;
                                    this.arrDetailItem.push(item1);
                                    //console.log(JSON.stringify(this.arrDetailItem));
                                }                               
                            }
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
                            data1.qty_defect          = res.rows.item(i).qty_defect; 
                            data1.cat_ketidaksesuaian = res.rows.item(i).cat_ketidaksesuaian; 
                            data1.date_created        = res.rows.item(i).date_created; 
                            this.arrItemFormHeader.push(data1);
                           
                            //STEP 3 -------- POSTING DATA TO DOMUSCOM
                            //console.log('Count'+  i + '=' +res.rows.length);
                            if(i == res.rows.length-1){
                                var data = {
                                    m_inspek : this.arrItemFormHeader,
                                    detail : this.arrDetailItem                   
                                }
                                var postData = JSON.stringify(data); 
                                //console.log(postData);
                                this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.sync_subkon.php',postData)
                                .subscribe(data => {
                                    this.data.response = data["_body"]; 
                                    this.updateIsSync('true');
                                    var rs = JSON.parse(this.data.response);

                                    if(rs.success == true){
                                        this.showAlert('Notice' , 'Sync Success');
                                    }else{
                                        this.showAlert('Error' , 'Sync Failed!!!!');
                                    }
                                    console.log(this.data.response);
                                }, error => {
                                    this.updateIsSync('');
                                    this.loading.dismiss();
                                    this.showAlert('Fail' , 'No Network Connection');
                                });     
                            }

                        },(err) => {
                            alert('Unable to execute sql: '+JSON.stringify(err));
                        })                       
                    }
                }else{
                    this.showAlert('Notice','No Data To Sync!');
                    this.loading.dismiss();
                }
  
            },(err) => {
                alert('Unable to execute sql: '+JSON.stringify(err));
              })  


            .catch(e => {
                alert(JSON.stringify(e));
                console.log(e);         
              });
        }).catch(e => {
            alert(e);
            console.log(e);      
        });
    }

    updateIsSync(param){

        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            var sqlUpdate = "";
            for(var idx = 0; idx < this.arrItemFormHeader.length; idx++){
                var target_id_inspeksi = this.arrItemFormHeader[idx].id_inspeksi;
                //console.log("Target Id To update");
                sqlUpdate = sqlUpdate + "UPDATE m_inspek SET is_sync='"+param+"' WHERE id_inspeksi='"+target_id_inspeksi+"';";
            }
            this.sqlitePorter.importSqlToDb(db, sqlUpdate)
            .then(() => {
                console.log('Updated');
                this.loading.dismiss();
            })
            .catch(e =>{
                console.error(JSON.stringify(e))
            });
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
