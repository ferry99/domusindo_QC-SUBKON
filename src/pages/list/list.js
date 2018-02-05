"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, sqlite, alertCtrl, loadingCtrl, sqlitePorter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sqlitePorter = sqlitePorter;
        this.items = [];
        this.tanggal_inspeksi = new Date().toISOString();
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.items = [];
    }
    ListPage_1 = ListPage;
    ListPage.prototype.searchData = function () {
        var _this = this;
        this.items = [];
        this.loading = this.loadingCtrl.create({
            content: 'Searching Data...'
        });
        this.loading.present();
        var new_format_tanggal_inspeksi = this.tanggal_inspeksi.substring(0, 10);
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            var sql = 'SELECT * FROM m_inspek WHERE tanggal_inspeksi = ?';
            db.executeSql(sql, [new_format_tanggal_inspeksi])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.items = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        var data1 = {
                            icon: "",
                            id_inspeksi: "",
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
                            date_created: "",
                            is_sync: ""
                        };
                        data1.icon = 'paper-plane';
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
                        data1.is_sync = res.rows.item(i).is_sync;
                        if (data1.is_sync == 'true') {
                            data1.is_sync = 'synced';
                        }
                        else {
                            data1.is_sync = 'not synced';
                        }
                        _this.items.push(data1);
                    }
                }
                _this.loading.dismiss();
            })["catch"](function (e) {
                console.log(JSON.stringify(e));
                _this.loading.dismiss();
            });
        })["catch"](function (e) {
            console.log(JSON.stringify(e));
            _this.loading.dismiss();
        });
    };
    ListPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        //this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        alert(val);
        // if the value is an empty string don't filter the items
        // if (val && val.trim() != '') {
        //   this.items = this.items.filter((item) => {
        //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //   })
        // }
    };
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        core_1.Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        })
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());
exports.ListPage = ListPage;
