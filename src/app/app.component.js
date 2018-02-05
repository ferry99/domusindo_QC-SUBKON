"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
require("rxjs/add/operator/map");
var home_1 = require("../pages/home/home");
var p_kerja_1 = require("../pages/p-kerja/p-kerja");
var list_1 = require("../pages/list/list");
var inspek_1 = require("../pages/inspek/inspek");
var inspek2_1 = require("../pages/inspek2/inspek2");
var syncron_1 = require("../pages/syncron/syncron");
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, sqlite) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.sqlite = sqlite;
        this.rootPage = home_1.HomePage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: home_1.HomePage },
            { title: 'Perintah Inspek', component: p_kerja_1.PKerjaPage },
            { title: 'List Inspect', component: list_1.ListPage },
            { title: 'Entry Inspect', component: inspek_1.InspekPage },
            { title: 'Entry Inspect V2', component: inspek2_1.Inspek2Page },
            { title: 'Syncron Inspect', component: syncron_1.SyncronPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.initDb();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.initDb = function () {
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            var sql = "\n          CREATE TABLE IF NOT EXISTS m_inspek(\n            id_inspeksi INTEGER PRIMARY KEY,\n            tanggal_inspeksi datetime,\n            nama_inspektor VARCHAR(150),\n            nama_subkon VARCHAR(150),\n            lokasi_subkon VARCHAR(150),\n            no_po VARCHAR(150),\n            id_material VARCHAR(150),\n            nama_barang VARCHAR(150),\n            jenis_barang VARCHAR(150),\n            qty_check VARCHAR(150),\n            qty_defect VARCHAR(150),\n            cat_ketidaksesuaian VARCHAR(150),\n            date_created datetime,\n            is_sync VARCHAR(150))";
            db.executeSql(sql, {})
                .then(function (res) { return console.log('@Executed Init SQL : m_inspek table'); }, function (err) {
                alert('Unable to execute sql: ' + JSON.stringify(err));
            })["catch"](function (e) { return console.log(JSON.stringify(e)); });
            // var sql2 = `
            //     CREATE TABLE IF NOT EXISTS m_item_pemeriksaan(
            //     kode_permeriksaan VARCHAR(150),
            //     nama_pemeriksaan VARCHAR(150),
            //     kategory VARCHAR(150))`;
            // db.executeSql(sql2, {})
            // .then(res => console.log('@Executed Init SQL : m_item_pemeriksaan table'))
            // .catch(e => console.log(JSON.stringify(e)));
            var sql3 = "CREATE TABLE IF NOT EXISTS t_detail_pemeriksaan(\n              rowid INTEGER PRIMARY KEY,\n              id_inspeksi VARCHAR(150),\n              id_pemeriksaan VARCHAR(150),\n              category VARCHAR(150),\n              label VARCHAR(150),\n              option VARCHAR(150),\n              qty VARCHAR(150),\n              note VARCHAR(150))";
            db.executeSql(sql3, {})
                .then(function (res) { return console.log('@Executed Init SQL t_detail_pemeriksaan table'); })["catch"](function (e) { return console.log(JSON.stringify(e)); });
            var sql4 = "CREATE TABLE IF NOT EXISTS t_perintah_inspek(\n          trid varchar(30) PRIMARY KEY,\n          po varchar(20) DEFAULT NULL,\n          idmat varchar(20) DEFAULT NULL,\n          deskripsi varchar(150) DEFAULT NULL,\n          qty_ord int(5) DEFAULT NULL,\n          vendor varchar(150) DEFAULT NULL,\n          download varchar(1) DEFAULT 'N',\n          qty_inspek int(5) DEFAULT NULL,\n          tgl_entry timestamp NULL,\n          po_item varchar(10) DEFAULT NULL,\n          no_perintah varchar(20) DEFAULT NULL)";
            db.executeSql(sql4, {})
                .then(function (res) { return console.log('@Executed Init SQL perintah_inspeksi table'); })["catch"](function (e) { return console.log(JSON.stringify(e)); });
            // let sql2 = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title] VARCHAR(150));' +
            //            'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");'+
            //            'INSERT INTO Artist(Id,Title) VALUES ("2","Fredo");';
            // this.sqlitePorter.importJsonToDb(db, sql2)
            //   .then(() => console.log('@Imported'))
            //   .catch(e => console.error(e));
            'INSERT INTO pur_perintah_inspek ("2018000001", "4500126906", "10121321", "BOX MFI MONTANA EK HB+FB UMBER", "4", "BERKAT WIDA ABADI,CV.", "N", "4", "2018-01-24 09:51:47", "60", "2018000001");' +
                'INSERT INTO pur_perintah_inspek ("2018000002", "4500126906", "10121326", "BOX MFI MONTANA QN HB+FB UMBER", "10", "BERKAT WIDA ABADI,CV.", "N", "10", "2018-01-24 09:51:47", "70", "2018000001");' +
                'INSERT INTO pur_perintah_inspek ("2018000003", "4500126906", "10121327", "BOX MFI MONTANA QN/EK SR UMBER", "12", "BERKAT WIDA ABADI,CV.", "N", "12", "2018-01-24 09:51:47", "80", "2018000001");' +
                'INSERT INTO pur_perintah_inspek ("2018000004", "4500126906", "10119470", "PROT #1 MONTANA HB+FB-145X150X1390", "36", "BERKAT WIDA ABADI,CV.", "N", "20", "2018-01-24 09:51:48", "120", "2018000001");' +
                'INSERT INTO pur_perintah_inspek ("2018000005", "4500126906", "10119383", "BOX MFI MONTANA QN HB+FB WHT NAT SENGON", "4", "BERKAT WIDA ABADI,CV.", "N", "4", "2018-01-24 09:51:48", "110", "2018000001");' +
                'INSERT INTO pur_perintah_inspek ("2018000006", "4500126906", "10119387", "BOX MFI MONTANA QN/EK SR WHT NAT SENGON", "4", "BERKAT WIDA ABADI,CV.", "N", "4", "2018-01-24 09:51:48", "130", "2018000001");';
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav");
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
