"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
/**
 * Generated class for the SyncronPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SyncronPage = /** @class */ (function () {
    function SyncronPage(navCtrl, navParams, sqlite, http, alertCtrl, loadingCtrl, sqlitePorter, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sqlitePorter = sqlitePorter;
        this.formBuilder = formBuilder;
        // authForm: FormGroup;
        this.arrDetailItem = [];
        this.arrItemFormHeader = [];
        this.data = {};
        // this.authForm = formBuilder.group({
        //       tanggal_inspeksi: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        //   });
    }
    SyncronPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SyncronPage');
    };
    SyncronPage.prototype.sync = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Sync Data...'
        });
        this.loading.present();
        console.log('@Starting to post json');
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            // STEP 1 -------- GET MASTER_INSPEKSI  
            var sql = 'SELECT * FROM m_inspek WHERE tanggal_inspeksi = ? AND is_sync = ?';
            db.executeSql(sql, [_this.tanggal_inspeksi, ''])
                .then(function (res) {
                _this.arrDetailItem = [];
                _this.arrItemFormHeader = [];
                if (res.rows.length > 0) {
                    var _loop_1 = function (i) {
                        var data1 = { id_inspeksi: "",
                            tanggal_inspeksi: "",
                            nama_inspektor: "",
                            nama_subkon: "",
                            lokasi_subkon: "",
                            no_po: "",
                            id_material: "",
                            nama_barang: "",
                            jenis_barang: "",
                            qty_check: "",
                            qty_defect: "",
                            cat_ketidaksesuaian: "",
                            date_created: "" };
                        // STEP 2 -------- GET ITTERATE DETAIL_PEMERIKSAAN  
                        sql2 = 'SELECT * FROM t_detail_pemeriksaan WHERE id_inspeksi = ? ';
                        db.executeSql(sql2, [res.rows.item(i).id_inspeksi])
                            .then(function (res2) {
                            if (res2.rows.length > 0) {
                                for (var j = 0; j < res2.rows.length; j++) {
                                    var item1 = { rowid: "", id_inspeksi: "", id_pemeriksaan: "", category: "", label: "", option: "", qty: "", note: "" };
                                    item1.rowid = res2.rows.item(j).rowid;
                                    item1.id_inspeksi = res2.rows.item(j).id_inspeksi;
                                    item1.id_pemeriksaan = res2.rows.item(j).id_pemeriksaan;
                                    item1.category = res2.rows.item(j).category;
                                    item1.label = res2.rows.item(j).label;
                                    item1.option = res2.rows.item(j).option;
                                    item1.qty = res2.rows.item(j).qty;
                                    item1.note = res2.rows.item(j).note;
                                    _this.arrDetailItem.push(item1);
                                    //console.log(JSON.stringify(this.arrDetailItem));
                                }
                            }
                            data1.id_inspeksi = res.rows.item(i).id_inspeksi;
                            data1.tanggal_inspeksi = res.rows.item(i).tanggal_inspeksi;
                            data1.nama_inspektor = res.rows.item(i).nama_inspektor;
                            data1.nama_subkon = res.rows.item(i).nama_subkon;
                            data1.lokasi_subkon = res.rows.item(i).lokasi_subkon;
                            data1.no_po = res.rows.item(i).no_po;
                            data1.id_material = res.rows.item(i).id_material;
                            data1.nama_barang = res.rows.item(i).nama_barang;
                            data1.jenis_barang = res.rows.item(i).jenis_barang;
                            data1.qty_check = res.rows.item(i).qty_check;
                            data1.qty_defect = res.rows.item(i).qty_defect;
                            data1.cat_ketidaksesuaian = res.rows.item(i).cat_ketidaksesuaian;
                            data1.date_created = res.rows.item(i).date_created;
                            _this.arrItemFormHeader.push(data1);
                            //STEP 3 -------- POSTING DATA TO DOMUSCOM
                            //console.log('Count'+  i + '=' +res.rows.length);
                            if (i == res.rows.length - 1) {
                                var data = {
                                    m_inspek: _this.arrItemFormHeader,
                                    detail: _this.arrDetailItem
                                };
                                var postData = JSON.stringify(data);
                                //console.log(postData);
                                _this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.sync_subkon.php', postData)
                                    .subscribe(function (data) {
                                    _this.data.response = data["_body"];
                                    _this.updateIsSync('true');
                                    var rs = JSON.parse(_this.data.response);
                                    // if(rs.success == true){
                                    //     this.showAlert('Notice' , 'Sync Success');
                                    // }else{
                                    //     this.showAlert('Error' , 'Sync Failed!!!!');
                                    // }
                                    console.log(_this.data.response);
                                }, function (error) {
                                    _this.updateIsSync('');
                                    _this.loading.dismiss();
                                    _this.showAlert('Fail', 'No Network Connection');
                                });
                            }
                        }, function (err) {
                            alert('Unable to execute sql: ' + JSON.stringify(err));
                        });
                    };
                    var sql2;
                    for (var i = 0; i < res.rows.length; i++) {
                        _loop_1(i);
                    }
                }
                else {
                    _this.showAlert('Notice', 'No Data To Sync!');
                    _this.loading.dismiss();
                }
            }, function (err) {
                alert('Unable to execute sql: ' + JSON.stringify(err));
            })["catch"](function (e) {
                alert(JSON.stringify(e));
                console.log(e);
            });
        })["catch"](function (e) {
            alert(e);
            console.log(e);
        });
    };
    SyncronPage.prototype.updateIsSync = function (param) {
        var _this = this;
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        })
            .then(function (db) {
            var sqlUpdate = "";
            for (var idx = 0; idx < _this.arrItemFormHeader.length; idx++) {
                var target_id_inspeksi = _this.arrItemFormHeader[idx].id_inspeksi;
                //console.log("Target Id To update");
                sqlUpdate = sqlUpdate + "UPDATE m_inspek SET is_sync='" + param + "' WHERE id_inspeksi='" + target_id_inspeksi + "';";
            }
            _this.sqlitePorter.importSqlToDb(db, sqlUpdate)
                .then(function () {
                console.log('Updated');
                _this.loading.dismiss();
            })["catch"](function (e) {
                console.error(JSON.stringify(e));
            });
        });
    };
    SyncronPage.prototype.showAlert = function (title, subtile) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtile,
            buttons: ['OK']
        });
        alert.present();
    };
    SyncronPage = __decorate([
        core_1.Component({
            selector: 'page-syncron',
            templateUrl: 'syncron.html'
        })
    ], SyncronPage);
    return SyncronPage;
}());
exports.SyncronPage = SyncronPage;
