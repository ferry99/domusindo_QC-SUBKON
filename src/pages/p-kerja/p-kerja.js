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
var underscore_1 = require("underscore");
/**
 * Generated class for the PKerjaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PKerjaPage = /** @class */ (function () {
    function PKerjaPage(navCtrl, navParams, actionsheetCtrl, sqlite, http, loadingCtrl, alertCtrl, sqlitePorter, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionsheetCtrl = actionsheetCtrl;
        this.sqlite = sqlite;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlitePorter = sqlitePorter;
        this.modalCtrl = modalCtrl;
        this.data = {};
        this.perintah_inspek = '';
        this.id_perintah_inspek = '';
    }
    PKerjaPage.prototype.openModal = function (characterNum) {
        var modal = this.modalCtrl.create(ModalContentPage, characterNum);
        modal.present();
    };
    PKerjaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PKerjaPage');
    };
    PKerjaPage.prototype.openMenu = function () {
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Menus',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Ambil PK',
                    icon: 'share',
                    handler: function () {
                        console.log('Getting Perintah Kerja');
                        _this.getPerintahInspek();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PKerjaPage.prototype.getPerintahInspek = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Sync Data...'
        });
        this.loading.present();
        console.log('@Starting getting json');
        this.http.post('http://192.168.0.8/domuscom/f_lib_domuscom/dept/qa/qc_checking_subkon/controller/c.api_get_perintah_inspek.php', '')
            .subscribe(function (data) {
            _this.data.response = data["_body"];
            var rs = JSON.parse(_this.data.response);
            if (rs.success == true) {
                _this.loading.dismiss();
                _this.showAlert('Notice', 'Get Perintah Inspek Success');
                _this.savePerintahInspekLocal(rs.data);
                var rsq = underscore_1["default"].groupBy(rs.data, "no_perintah"); // GROUPING BY NO_PERINTAH
                _this.id_perintah_inspek = underscore_1["default"].keys(rsq); // GET ID_PERINTAH_INSPEK
            }
            else {
                _this.showAlert('Error', 'Sync Failed!!!!');
            }
            //console.log(JSON.stringify(data));
        }, function (error) {
            console.log(JSON.stringify(error));
            // this.loading.dismiss();
            // this.showAlert('Fail' , 'No Network Connection');
        });
    };
    PKerjaPage.prototype.savePerintahInspekLocal = function (objPerintahInspek) {
        console.log(JSON.stringify(objPerintahInspek));
        // this.sqlite.create({
        // 	name: 'qc_checking_subkon.db',
        // 	location: 'default'
        // }).then((db: SQLiteObject) => {  				
        // 	var arrToInsert = [tanggal_inspeksi,nama_inspektor,nama_subkon ,lokasi_subkon,no_po ,id_material,nama_barang,jenis_barang,qty_check,qty_defect,cat_ketidaksesuaian,date_created,is_sync]; 
        // 	//console.log(arrToInsert);
        // 		var sqlJson = {
        // 		    "data":{
        // 		        "inserts":{
        // 		            "t_detail_pemeriksaan":activeItemForm
        // 		        }
        // 		    }
        // 		};
        // 		console.log(JSON.stringify(sqlJson));
        // 		this.sqlitePorter.importJsonToDb(db, sqlJson)
        // 			.then(() => console.log('@Added Item Pemeriksaan'))
        // 			.catch(e => console.error(JSON.stringify(e)));
        // 		loading.dismiss();
        // 		this.isShow = true;
        // 		this.showAlert('Notice','Success!');
        // 		// alert('success:' + JSON.stringify(res));
        // 	})
        // 	.catch(e => {
        // 		loading.dismiss();
        // 		this.isShow = true;
        // 		this.showAlert('Notice','Error Insert DB!');
        // 		// alert(JSON.stringify(e));
        // 		alert(JSON.stringify(e));         
        // 	});	
    };
    PKerjaPage.prototype.showAlert = function (title, subtile) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtile,
            buttons: ['OK']
        });
        alert.present();
    };
    PKerjaPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-p-kerja',
            templateUrl: 'p-kerja.html'
        })
    ], PKerjaPage);
    return PKerjaPage;
}());
exports.PKerjaPage = PKerjaPage;
var ModalContentPage = /** @class */ (function () {
    function ModalContentPage(params, viewCtrl) {
        // var characters = [
        //   {
        //     name: 'Gollum',       
        //     items: [
        //       { title: 'Race', note: 'Hobbit' },
        //       { title: 'Culture', note: 'River Folk' },
        //       { title: 'Alter Ego', note: 'Smeagol' }
        //     ]
        //   },
        //   {
        //     name: 'Frodo',
        //     quote: 'Go back, Sam! I\'m going to Mordor alone!',
        //     image: 'assets/img/avatar-frodo.jpg',
        //     items: [
        //       { title: 'Race', note: 'Hobbit' },
        //       { title: 'Culture', note: 'Shire Folk' },
        //       { title: 'Weapon', note: 'Sting' }
        //     ]
        //   },
        //   {
        //     name: 'Samwise Gamgee',
        //     quote: 'What we need is a few good taters.',
        //     image: 'assets/img/avatar-samwise.jpg',
        //     items: [
        //       { title: 'Race', note: 'Hobbit' },
        //       { title: 'Culture', note: 'Shire Folk' },
        //       { title: 'Nickname', note: 'Sam' }
        //     ]
        //   }
        // ];
        this.params = params;
        this.viewCtrl = viewCtrl;
        //FINDING RESULT FROM SQLITE
        console.log(this.params.get('charNum'));
        var id_perintah_inspek = this.params.get('charNum');
        //this.character = characters[this.params.get('charNum')];
    }
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalContentPage = __decorate([
        core_1.Component({
            template: "\n\t<ion-header>\n\t  <ion-toolbar>\n\t    <ion-title>\n\t      Description\n\t    </ion-title>\n\t    <ion-buttons start>\n\t      <button ion-button (click)=\"dismiss()\">\n\t        <span ion-text color=\"primary\" showWhen=\"ios\">Cancel</span>\n\t        <ion-icon name=\"md-close\" showWhen=\"android, windows\"></ion-icon>\n\t      </button>\n\t    </ion-buttons>\n\t  </ion-toolbar>\n\t</ion-header>\n\n\t<ion-content>\n\t  <ion-list>\n\t      <ion-item>        \n\t        <h2>2018000001</h2>      \n\t      </ion-item>\n\t      <ion-item *ngFor=\"let item of character['items']\">\n\t        {{item.title}}\n\t        <h2>Box MFI</h2>   \n\t        <h3>CV BERKAT</h3>   \n\t        <p>Other Note</p>   \n\t        <ion-note item-end>\n\t          {{item.note}}\n\t        </ion-note>\n\t      </ion-item>\n\t  </ion-list>\n\t</ion-content>\n\t"
        })
    ], ModalContentPage);
    return ModalContentPage;
}());
exports.ModalContentPage = ModalContentPage;
