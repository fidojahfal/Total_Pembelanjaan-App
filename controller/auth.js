const mysql = require('mysql');
const connection = require('../models/database');

exports.InputData = (req, res) => {
    const name = req.body.name
    const tanggal = req.body.tanggal
    let laporan_db = 'SELECT * FROM laporan WHERE DATE(Tanggal) = ?'
    let queryLaporan = connection.query(laporan_db, tanggal, async(err, rowsLaporan) => {
        if (err) throw err;
        const Laporan = rowsLaporan;
        let transaksi = `SELECT * FROM transaksi WHERE Nama_Pelanggan = ?`
        let queryTransaksi = connection.query(transaksi, name, async(err, rowsTransaksi) => {
            if (err) throw err;
            const Transaksi = rowsTransaksi;
            const totalBelanja = (Laporan[0].Omset / Laporan[0].Total_Quantity) * Transaksi[0].Quantity;
            console.log(totalBelanja)
            let data = { Nama_Pelanggan: name, Tanggal: tanggal, Total_Belanja: totalBelanja }
            let history = `INSERT INTO history SET ?`
            let find = 'SELECT * FROM history WHERE Nama_Pelanggan = ? AND Tanggal = ?'
            let findSame = connection.query(find, [data.Nama_Pelanggan, data.Tanggal], (err, results) => {
                if (err) {
                    throw err
                }
                if (results.length) {
                    return res.redirect('/dashboard?error=' + encodeURIComponent('Already_Exist'))
                }
                let queryHistory = connection.query(history, data, (err, rowsHistory) => {
                    if (err)
                        throw err
                    return res.redirect('/dashboard?done=' + encodeURIComponent('Data_Input'))
                })

            })
        })

    })
}

exports.reset = (req, res) => {
    let hapus = 'DELETE FROM history'
    let sql = connection.query(hapus, (err, rows) => {
        if (err) throw err
        res.redirect('/dashboard')
    })
}