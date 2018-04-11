import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController,private sqlite: SQLite,private sqlitePorter: SQLitePorter) {

	}

	ionViewDidLoad() {
		//this.initDb();
	}

	initDb(){
		this.sqlite.create({
			name: 'qc_checking_subkon.db',
			location: 'default'
		}).then((db: SQLiteObject) => {
			var sql = `
				CREATE TABLE IF NOT EXISTS m_inspek(
					id_inspeksi INTEGER PRIMARY KEY,
					tanggal_inspeksi datetime,
					nama_inspektor VARCHAR(150),
					nama_subkon VARCHAR(150),
					no_po VARCHAR(150),
					id_material VARCHAR(150),
					nama_barang VARCHAR(150),
					jenis_barang VARCHAR(150),
					qty_check VARCHAR(150),
					qty_defect VARCHAR(150),
					cat_ketidaksesuaian VARCHAR(150),
					date_created datetime,
					is_sync VARCHAR(150),
					modified_on datetime)`;
			
			db.executeSql(sql, {})
			.then(res => console.log('@Executed Init SQL : m_inspek table')
			,(err) => {
                alert('Unable to execute sql: '+JSON.stringify(err));
              }) 
			.catch(e => console.log(JSON.stringify(e)));
			
			// var sql2 = `
			// 		CREATE TABLE IF NOT EXISTS m_item_pemeriksaan(
			// 		kode_permeriksaan VARCHAR(150),
			// 		nama_pemeriksaan VARCHAR(150),
			// 		kategory VARCHAR(150))`;
			
			// db.executeSql(sql2, {})
			// .then(res => console.log('@Executed Init SQL : m_item_pemeriksaan table'))
			// .catch(e => console.log(JSON.stringify(e)));
			
			var sql3 =`CREATE TABLE IF NOT EXISTS t_detail_pemeriksaan(
						rowid INTEGER PRIMARY KEY,
						id_inspeksi VARCHAR(150),
						id_pemeriksaan VARCHAR(150),
						category VARCHAR(150),
						label VARCHAR(150),
						option VARCHAR(150),
						qty VARCHAR(150),
						note VARCHAR(150))`;
					
			
			db.executeSql(sql3, {})
			.then(res => console.log('@Executed Init SQL t_detail_pemeriksaan table'))
			.catch(e => console.log(JSON.stringify(e)));

			
			// let sql2 = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title] VARCHAR(150));' +
			//            'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");'+
			//            'INSERT INTO Artist(Id,Title) VALUES ("2","Fredo");';

			// this.sqlitePorter.importJsonToDb(db, sql2)
			//   .then(() => console.log('@Imported'))
			//   .catch(e => console.error(e));
		})
	}
}
