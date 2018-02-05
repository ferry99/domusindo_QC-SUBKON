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
 * Generated class for the InspekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InspekPage = /** @class */ (function () {
    function InspekPage(navCtrl, navParams, sqlite, loadingCtrl, alertCtrl, sqlitePorter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlitePorter = sqlitePorter;
        // data            = { date:"", type:"", description:"", amount:0 };
        this.itemFormsHeader = {
            tanggal_inspeksi: new Date().toISOString(),
            nama_inspektor: "",
            nama_subkon: "",
            lokasi_subkon: "",
            no_po: "",
            id_material: "",
            nama_barang: "",
            jenis_barang: "",
            qty_check: "",
            cat_ketidaksesuaian: ""
        };
        this.itemForms = [];
        this.itemForms2 = [];
        this.itemForms3 = [];
        this.total_defect = 0;
        this.myDropDown = '';
        this.date = '';
        this.today_date = '';
        this.isShow = true;
        this.itemForms = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM1", category: "metal_mentahan", label: "Ukuran Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM2", category: "metal_mentahan", label: "Kesikuan Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM3", category: "metal_mentahan", label: "Hasil Las Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM4", category: "metal_mentahan", label: "Hasil Gerinda Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MM5", category: "metal_mentahan", label: "Drat Leveler Tdk Berfungsi", option: "", qty: "", note: "" },
        ];
        this.itemForms2 = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF1", category: "metal_finishing", label: "Warna Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF2", category: "metal_finishing", label: "Gloss Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF3", category: "metal_finishing", label: "Buble", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF4", category: "metal_finishing", label: "Saging", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF5", category: "metal_finishing", label: "Scratch", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF6", category: "metal_finishing", label: "Dented", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF7", category: "metal_finishing", label: "Chipping", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "MF8", category: "metal_finishing", label: "Dempul Tidak Bagus", option: "", qty: "", note: "" }
        ];
        this.itemForms3 = [
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW1", category: "white_wood", label: "Permukaan Kasar", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW2", category: "white_wood", label: "Ukuran Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW3", category: "white_wood", label: "Jumlah Chip Tidak Sesuai", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW4", category: "white_wood", label: "Dempul Tidak bagus", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW5", category: "white_wood", label: "Sudut tajam", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW6", category: "white_wood", label: "Chipping", option: "", qty: "", note: "" },
            { rowid: "", id_inspeksi: "", id_pemeriksaan: "WW7", category: "white_wood", label: "Kelurusan Tidak Sesuai", option: "", qty: "", note: "" }
        ];
    }
    InspekPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InspekPage');
    };
    InspekPage.prototype.saveDataInspek = function () {
        var _this = this;
        //console.log(this.itemFormsHeader);
        this.isShow = false;
        var loading = this.loadingCtrl.create({
            content: 'Saving Data...'
        });
        loading.present();
        if (this.itemFormsHeader.jenis_barang == '') {
        }
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            var qty_defect = 0;
            var jenis_barang = _this.itemFormsHeader.jenis_barang;
            var new_format_tanggal_inspeksi = _this.itemFormsHeader.tanggal_inspeksi.substring(0, 10);
            if (jenis_barang == 'MM') {
                var activeItemForm = _this.itemForms;
            }
            else if (jenis_barang == 'MF') {
                var activeItemForm = _this.itemForms2;
            }
            else if (jenis_barang == 'WW') {
                var activeItemForm = _this.itemForms3;
            }
            for (var idx in activeItemForm) {
                qty_defect = (+qty_defect) + (+activeItemForm[idx].qty);
            }
            _this.date = new Date();
            _this.today_date = _this.date.getFullYear().toString() + '-' + (_this.date.getMonth() + 1).toString() + '-' + _this.date.getDate().toString();
            var tanggal_inspeksi = new_format_tanggal_inspeksi;
            var nama_inspektor = _this.itemFormsHeader.nama_inspektor;
            var nama_subkon = _this.itemFormsHeader.nama_subkon;
            var lokasi_subkon = _this.itemFormsHeader.lokasi_subkon;
            var no_po = _this.itemFormsHeader.no_po;
            var id_material = _this.itemFormsHeader.id_material;
            var nama_barang = _this.itemFormsHeader.nama_barang;
            var qty_check = _this.itemFormsHeader.qty_check;
            var cat_ketidaksesuaian = _this.itemFormsHeader.cat_ketidaksesuaian;
            var date_created = _this.today_date;
            var is_sync = '';
            var arrToInsert = [tanggal_inspeksi, nama_inspektor, nama_subkon, lokasi_subkon, no_po, id_material, nama_barang, jenis_barang, qty_check, qty_defect, cat_ketidaksesuaian, date_created, is_sync];
            //console.log(arrToInsert);
            console.log('QTY DEFECT' + qty_defect);
            db.executeSql('INSERT INTO m_inspek VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)', arrToInsert)
                .then(function (res) {
                console.log('@Added Master Inspeksi: ' + JSON.stringify(res));
                for (var idx in activeItemForm) {
                    activeItemForm[idx].rowid = 'NULL';
                    activeItemForm[idx].id_inspeksi = res.insertId;
                    //console.log(JSON.stringify(this.itemForms[idx]));
                }
                var sqlJson = {
                    "data": {
                        "inserts": {
                            "t_detail_pemeriksaan": activeItemForm
                        }
                    }
                };
                console.log(JSON.stringify(sqlJson));
                _this.sqlitePorter.importJsonToDb(db, sqlJson)
                    .then(function () { return console.log('@Added Item Pemeriksaan'); })["catch"](function (e) { return console.error(JSON.stringify(e)); });
                loading.dismiss();
                _this.isShow = true;
                _this.showAlert('Notice', 'Success!');
                // alert('success:' + JSON.stringify(res));
            })["catch"](function (e) {
                loading.dismiss();
                _this.isShow = true;
                _this.showAlert('Notice', 'Error Insert DB!');
                // alert(JSON.stringify(e));
                alert(JSON.stringify(e));
            });
        })["catch"](function (e) {
            loading.dismiss();
            _this.isShow = true;
            _this.showAlert('Notice', 'Error!');
            // alert(JSON.stringify(e));
            console.log(e);
        });
    };
    InspekPage.prototype.saveData1 = function () {
        this.itemFormsHeader.jenis_barang = '';
        console.log('disable');
        // console.log(this.today_date);
        // console.log(this.myDropDown);
        // //var sql = "INSERT INTO field check subkon VALUES(NULL,?,?,?,?)",[this.itemForms[0]];
        // if(this.itemForms[0].category == "metal_mentahan"){
        // 	console.log('metal mentah');
        // 	console.log(this.itemForms[0].qty);
        // }
    };
    InspekPage.prototype.dropTable = function () {
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DROP TABLE m_inspek', {})
                .then(function (res) {
                alert('success:' + JSON.stringify(res));
                console.log(res);
            })["catch"](function (e) {
                alert(e);
                console.log(e);
            });
        })["catch"](function (e) {
            alert(e);
            console.log(e);
        });
    };
    InspekPage.prototype.addNewInspek = function () {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    InspekPage.prototype.showAlert = function (title, subtile) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtile,
            buttons: ['OK']
        });
        alert.present();
    };
    InspekPage = __decorate([
        core_1.Component({
            selector: 'page-inspek',
            templateUrl: 'inspek.html'
        })
    ], InspekPage);
    return InspekPage;
}());
exports.InspekPage = InspekPage;
