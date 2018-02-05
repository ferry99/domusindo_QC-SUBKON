"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, sqlite, sqlitePorter) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.sqlitePorter = sqlitePorter;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        //this.initDb();
    };
    HomePage.prototype.initDb = function () {
        this.sqlite.create({
            name: 'qc_checking_subkon.db',
            location: 'default'
        }).then(function (db) {
            var sql = "\n\t\t\t\tCREATE TABLE IF NOT EXISTS m_inspek(\n\t\t\t\t\tid_inspeksi INTEGER PRIMARY KEY,\n\t\t\t\t\ttanggal_inspeksi datetime,\n\t\t\t\t\tnama_inspektor VARCHAR(150),\n\t\t\t\t\tnama_subkon VARCHAR(150),\n\t\t\t\t\tno_po VARCHAR(150),\n\t\t\t\t\tid_material VARCHAR(150),\n\t\t\t\t\tnama_barang VARCHAR(150),\n\t\t\t\t\tjenis_barang VARCHAR(150),\n\t\t\t\t\tqty_check VARCHAR(150),\n\t\t\t\t\tqty_defect VARCHAR(150),\n\t\t\t\t\tcat_ketidaksesuaian VARCHAR(150),\n\t\t\t\t\tdate_created datetime,\n\t\t\t\t\tis_sync VARCHAR(150))";
            db.executeSql(sql, {})
                .then(function (res) { return console.log('@Executed Init SQL : m_inspek table'); }, function (err) {
                alert('Unable to execute sql: ' + JSON.stringify(err));
            })["catch"](function (e) { return console.log(JSON.stringify(e)); });
            // var sql2 = `
            // 		CREATE TABLE IF NOT EXISTS m_item_pemeriksaan(
            // 		kode_permeriksaan VARCHAR(150),
            // 		nama_pemeriksaan VARCHAR(150),
            // 		kategory VARCHAR(150))`;
            // db.executeSql(sql2, {})
            // .then(res => console.log('@Executed Init SQL : m_item_pemeriksaan table'))
            // .catch(e => console.log(JSON.stringify(e)));
            var sql3 = "CREATE TABLE IF NOT EXISTS t_detail_pemeriksaan(\n\t\t\t\t\t\trowid INTEGER PRIMARY KEY,\n\t\t\t\t\t\tid_inspeksi VARCHAR(150),\n\t\t\t\t\t\tid_pemeriksaan VARCHAR(150),\n\t\t\t\t\t\tcategory VARCHAR(150),\n\t\t\t\t\t\tlabel VARCHAR(150),\n\t\t\t\t\t\toption VARCHAR(150),\n\t\t\t\t\t\tqty VARCHAR(150),\n\t\t\t\t\t\tnote VARCHAR(150))";
            db.executeSql(sql3, {})
                .then(function (res) { return console.log('@Executed Init SQL t_detail_pemeriksaan table'); })["catch"](function (e) { return console.log(JSON.stringify(e)); });
            // let sql2 = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title] VARCHAR(150));' +
            //            'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");'+
            //            'INSERT INTO Artist(Id,Title) VALUES ("2","Fredo");';
            // this.sqlitePorter.importJsonToDb(db, sql2)
            //   .then(() => console.log('@Imported'))
            //   .catch(e => console.error(e));
        });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
