"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Generated class for the EditInspekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditInspekPage = /** @class */ (function () {
    function EditInspekPage(navCtrl, events, navParams, sqlite, loadingCtrl, alertCtrl, sqlitePorter) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlitePorter = sqlitePorter;
        this.item_inspek = {};
        this.statusInsert = false;
        this.itemFormsHeader = {
            id_inspeksi: "",
            id_perintah_inspek: "",
            trid_perintah_inspek: "",
            tanggal_inspeksi: "",
            nama_inspektor: "",
            nama_subkon: "",
            lokasi_subkon: "",
            no_po: "",
            id_material: "",
            nama_barang: "",
            jenis_barang: "",
            qty_check: "",
            new_qty_check: "",
            cat_ketidaksesuaian: "",
            qty_defect: "",
            total_qty_fail: ""
        };
        this.itemForms = [];
        this.itemForms2 = [];
        this.itemForms3 = [];
        this.activeItemForm = [];
        this.isShow = true;
        this.itemForms = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM1", category: "metal_mentahan", label: "Ukuran Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM2", category: "metal_mentahan", label: "Kesikuan Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM3", category: "metal_mentahan", label: "Hasil Las Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM4", category: "metal_mentahan", label: "Hasil Gerinda Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM5", category: "metal_mentahan", label: "Drat Leveler Tdk Berfungsi", option: "", qty: "", note: "", status_fail: false },
        ];
        this.itemForms2 = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF1", category: "metal_finishing", label: "Warna Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF2", category: "metal_finishing", label: "Gloss Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF3", category: "metal_finishing", label: "Buble", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF4", category: "metal_finishing", label: "Saging", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF5", category: "metal_finishing", label: "Scratch", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF6", category: "metal_finishing", label: "Dented", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF7", category: "metal_finishing", label: "Chipping", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF8", category: "metal_finishing", label: "Dempul Tidak Bagus", option: "", qty: "", note: "", status_fail: false }
        ];
        this.itemForms3 = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW1", category: "white_wood", label: "Permukaan Kasar", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW2", category: "white_wood", label: "Ukuran Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW3", category: "white_wood", label: "Jumlah Chip Tidak Sesuai", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW4", category: "white_wood", label: "Dempul Tidak bagus", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW5", category: "white_wood", label: "Sudut tajam", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW6", category: "white_wood", label: "Chipping", option: "", qty: "", note: "", status_fail: false },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW7", category: "white_wood", label: "Kelurusan Tidak Sesuai", option: "", qty: "", note: "", status_fail: false }
        ];
        if (navParams.get("id_inspeksi") != null) {
            this.id_inspeksi = navParams.get("id_inspeksi");
            console.log('Edit inspek id : ' + this.id_inspeksi);
            this.sqlite.create({
                name: 'qc_checking_subkon.db',
                location: 'default'
            }).then(function (db) {
                _this.database = db;
                var sql = 'SELECT * FROM m_inspek WHERE id_inspeksi = ?';
                _this.database.executeSql(sql, [_this.id_inspeksi])
                    .then(function (res) {
                    //GET FORM HEADER
                    for (var i = 0; i < res.rows.length; i++) {
                        _this.itemFormsHeader.id_inspeksi = res.rows.item(i).id_inspeksi;
                        _this.itemFormsHeader.id_perintah_inspek = res.rows.item(i).id_perintah_inspek;
                        _this.itemFormsHeader.trid_perintah_inspek = res.rows.item(i).trid_perintah_inspek;
                        _this.itemFormsHeader.tanggal_inspeksi = res.rows.item(i).tanggal_inspeksi;
                        _this.itemFormsHeader.nama_inspektor = res.rows.item(i).nama_inspektor;
                        _this.itemFormsHeader.nama_subkon = res.rows.item(i).nama_subkon;
                        _this.itemFormsHeader.lokasi_subkon = res.rows.item(i).lokasi_subkon;
                        _this.itemFormsHeader.no_po = res.rows.item(i).no_po;
                        _this.itemFormsHeader.id_material = res.rows.item(i).id_material;
                        _this.itemFormsHeader.nama_barang = res.rows.item(i).nama_barang;
                        _this.itemFormsHeader.jenis_barang = res.rows.item(i).jenis_barang;
                        _this.itemFormsHeader.qty_check = res.rows.item(i).qty_check;
                        _this.itemFormsHeader.new_qty_check = res.rows.item(i).qty_check;
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
                    _this.database.executeSql(sql, [_this.id_inspeksi])
                        .then(function (res2) {
                        _this.activeItemForm = [];
                        for (var j = 0; j < res2.rows.length; j++) {
                            // var item1 = [];
                            _this.activeItemForm.push(res2.rows.item(j));
                            // console.log(JSON.stringify(this.activeItemForm[j]));
                        }
                        //console.log(JSON.stringify(this.activeItemForm));
                    });
                });
            })["catch"](function (e) {
                _this.showAlert('Notice', 'Error Connect DB!');
                alert(JSON.stringify(e));
            });
        }
    }
    EditInspekPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditInspekPage');
    };
    EditInspekPage.prototype.editDataInspek = function () {
        // console.log(JSON.stringify(this.itemFormsHeader));
        // console.log(JSON.stringify(this.activeItemForm));
        var _this = this;
        this.isShow = false;
        var loading = this.loadingCtrl.create({
            content: 'Updating Data...'
        });
        //IF QTY CHECK MORE THAN CURR QTY INSPEK PERINTAH KERJA
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            _this.database = db;
            self = _this;
            var sql = 'SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = ?';
            return _this.database.executeSql(sql, [_this.itemFormsHeader.trid_perintah_inspek]);
        })
            .then(function (res) {
            for (var i = 0; i < res.rows.length; i++) {
                var limit_qty_inspek = res.rows.item(i).limit_qty_inspek;
            }
            var new_limit_qty_inspek = parseInt(limit_qty_inspek) + parseInt(_this.itemFormsHeader.qty_check);
            //console.log(this.itemFormsHeader.new_qty_check + 'vs' + new_limit_qty_inspek);
            if (parseInt(_this.itemFormsHeader.new_qty_check) > new_limit_qty_inspek) {
                _this.statusInsert = false;
                loading.dismiss();
                alert('Qty Tidak Sesuai');
                _this.isShow = true;
                return Promise.reject(err);
            }
            else {
                _this.statusInsert = true;
            }
        })
            .then(function (res) {
            console.log('QTY VALID COTINUE CHAIN 3');
            loading.present();
            var qty_defect = 0;
            var total_qty_fail = 0;
            var updatedDetailPemeriksaan = [];
            for (var idx in _this.activeItemForm) {
                if (_this.activeItemForm[idx].status_fail == "true") {
                    total_qty_fail += parseInt(_this.activeItemForm[idx].qty);
                }
                qty_defect = (+qty_defect) + (+_this.activeItemForm[idx].qty);
                var obj = {
                    "set": _this.activeItemForm[idx],
                    "where": { "rowid": _this.activeItemForm[idx].rowid }
                };
                updatedDetailPemeriksaan.push(obj);
            }
            //DETERMINE UPDATE LIMIT QTY INSPEK
            if (_this.itemFormsHeader.new_qty_check > _this.itemFormsHeader.qty_check) {
                selisih = _this.itemFormsHeader.new_qty_check - _this.itemFormsHeader.qty_check;
            }
            else {
                selisih = _this.itemFormsHeader.new_qty_check - _this.itemFormsHeader.qty_check;
            }
            // alert('new qty fail' + total_qty_fail);
            var arrToUpdate = {
                "nama_inspektor": _this.itemFormsHeader.nama_inspektor,
                "lokasi_subkon": _this.itemFormsHeader.lokasi_subkon,
                "qty_check": _this.itemFormsHeader.new_qty_check,
                "qty_fail": total_qty_fail,
                "qty_defect": qty_defect
            };
            var updatedMasterInspek = {
                "set": arrToUpdate,
                "where": { "id_inspeksi": _this.itemFormsHeader.id_inspeksi }
            };
            var sqlJson = {
                "data": {
                    "updates": {
                        "m_inspek": [updatedMasterInspek],
                        "t_detail_pemeriksaan": updatedDetailPemeriksaan
                    }
                }
            };
            console.log(JSON.stringify(sqlJson));
            res = _this.sqlitePorter.importJsonToDb(_this.database, sqlJson);
            loading.dismiss();
            _this.showAlert('Notice', 'Update Success!');
        });
        // if(parseInt(this.itemFormsHeader.qty_check) > parseInt(this.item_inspek.limit_qty_inspek)){
        //   this.statusInsert = false;
        // }else{
        //   this.statusInsert = true;
        // }
        //if(this.statusInsert == true){
        // loading.present();
        // this.sqlite.create({
        //   name: 'qc_checking_subkon.db',
        //   location: 'default'
        // }).then((db: SQLiteObject) => {
        //   var qty_defect   = 0;
        //   var jenis_barang = this.itemFormsHeader.jenis_barang;
        //        var new_format_tanggal_inspeksi = this.itemFormsHeader.tanggal_inspeksi.substring(0,10);
        //        //MAPING DETAIL FORM TO ACTIVE FORM
        //   if(jenis_barang == 'MM'){
        //     var activeItemForm = this.itemForms;    
        //   }else if(jenis_barang == 'MF'){
        //     var activeItemForm = this.itemForms2;  
        //   }else if(jenis_barang == 'WW'){
        //     var activeItemForm = this.itemForms3;
        //   }
        //   for(var idx in activeItemForm){
        //     qty_defect = (+qty_defect) + (+activeItemForm[idx].qty);
        //   }
        //   this.date = new Date();
        //   this.today_date = this.date.getFullYear().toString()+'-'+(this.date.getMonth()+1).toString()+'-'+this.date.getDate().toString();  
        //   //console.log(this.itemFormsHeader.id_perintah_inspek);
        //   var id_perintah_inspek  = this.itemFormsHeader.id_perintah_inspek;
        //   var trid_perintah_inspek= this.itemFormsHeader.trid_perintah_inspek;
        //   var tanggal_inspeksi    = new_format_tanggal_inspeksi; 
        //   var nama_inspektor      = this.itemFormsHeader.nama_inspektor; 
        //   var nama_subkon         = this.itemFormsHeader.nama_subkon;
        //   var lokasi_subkon       = this.itemFormsHeader.lokasi_subkon;
        //   var no_po               = this.itemFormsHeader.no_po; 
        //   var id_material         = this.itemFormsHeader.id_material;
        //   var po_item             = this.itemFormsHeader.po_item;
        //   var nama_barang         = this.itemFormsHeader.nama_barang;
        //   var qty_order           = this.itemFormsHeader.qty_order;
        //   var qty_check           = this.itemFormsHeader.qty_check;
        //   var cat_ketidaksesuaian = this.itemFormsHeader.cat_ketidaksesuaian;
        //   var date_created        = this.today_date;
        //   var is_sync        = '';
        //   //SUM ALL QTY STATUS FAIL
        //   var total_qty_fail = 0;
        //   for(var idx in activeItemForm){
        //     if(activeItemForm[idx].status_fail == true){
        //       total_qty_fail += parseInt(activeItemForm[idx].qty);
        //     }
        //   }    
        //   var arrToInsert = [id_perintah_inspek,trid_perintah_inspek,tanggal_inspeksi,nama_inspektor,nama_subkon ,lokasi_subkon,no_po ,id_material,po_item,nama_barang,jenis_barang,qty_order,qty_check,total_qty_fail,qty_defect,cat_ketidaksesuaian,date_created,is_sync]; 
        //     console.log(arrToInsert);
        //   //INSERT MASTER HEADER
        //   db.executeSql('INSERT INTO m_inspek VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', arrToInsert)
        //   .then(res => {
        //     console.log('@Added Master Inspeksi: ' + JSON.stringify(res)); 
        //     for(var idx in activeItemForm){
        //       activeItemForm[idx].rowid = 'NULL';
        //       activeItemForm[idx].id_inspeksi = res.insertId;             
        //       //console.log(JSON.stringify(activeItemForm[idx]));
        //     }
        //     //Update qty check - qty fail
        //     this.itemFormsHeader.new_qty_check = parseInt(this.itemFormsHeader.qty_check) - total_qty_fail;
        //     var sqlJson = {
        //         "data":{
        //             "inserts":{
        //                 "t_detail_pemeriksaan":activeItemForm
        //             }
        //         }
        //     };
        //     // console.log(JSON.stringify(sqlJson));
        //     this.sqlitePorter.importJsonToDb(db, sqlJson)
        //       .then(() => {
        //         console.log('@Added Item Pemeriksaan');
        //         //UPDATE curr_qty_inspek MINUS IT
        //         var no_po   = this.itemFormsHeader.no_po;
        //         var idmat   = this.itemFormsHeader.id_material;
        //         var po_item = this.itemFormsHeader.po_item;
        //         var sqlUpdate = "UPDATE t_perintah_inspek SET curr_qty_inspek=(SELECT curr_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "';"+
        //                         "UPDATE t_perintah_inspek SET limit_qty_inspek=(SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE po = '" + no_po + "' AND po_item = '" + po_item + "' AND trid != '" + this.itemFormsHeader.trid_perintah_inspek + "';"+                                          
        //                         "UPDATE t_perintah_inspek SET limit_qty_inspek=(SELECT limit_qty_inspek FROM t_perintah_inspek WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "')-'" + this.itemFormsHeader.new_qty_check + "' WHERE trid = '" + this.itemFormsHeader.trid_perintah_inspek + "';";
        //         this.sqlitePorter.importSqlToDb(db, sqlUpdate)
        //         .then(() => {
        //             console.log('Updated');
        //             loading.dismiss();
        //             this.isShow = true;
        //             this.showAlert('Notice','Success!');
        //             if(this.is_from_perintah == true){
        //               this.events.publish('reloadDetails');
        //               this.navCtrl.setRoot(Inspek2Page);
        //             }
        //         })
        //         .catch(e =>{
        //           loading.dismiss();
        //             console.error(JSON.stringify(e))
        //         });
        //       })
        //       .catch(e => console.error(JSON.stringify(e)));
        //     // alert('success:' + JSON.stringify(res));
        //   })
        //   .catch(e => {
        //     loading.dismiss();
        //     this.isShow = true;
        //     this.showAlert('Notice','Error Insert DB!');
        //     // alert(JSON.stringify(e));
        //     alert(JSON.stringify(e));         
        //   });
        // }).catch(e => {
        //   loading.dismiss();
        //   this.isShow = true;
        //   this.showAlert('Notice','Error!');
        //   // alert(JSON.stringify(e));
        //   console.log(e);      
        // });
        // }else{
        //   loading.dismiss();
        //   alert('Qty Tidak Sesuai');
        //   this.isShow = true;
        // }
    };
    EditInspekPage.prototype.showAlert = function (title, subtile) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtile,
            buttons: ['OK']
        });
        alert.present();
    };
    EditInspekPage = __decorate([
        core_1.Component({
            selector: 'page-edit-inspek',
            templateUrl: 'edit-inspek.html'
        })
    ], EditInspekPage);
    return EditInspekPage;
}());
exports.EditInspekPage = EditInspekPage;
