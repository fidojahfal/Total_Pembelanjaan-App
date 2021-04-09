const express = require('express');
const connection = require('../models/database');
const Router = express();
const authController = require('../controller/auth');

Router.get('/', (req, res) => {
    res.redirect('/dashboard')
});

Router.get('/dashboard', (req, res) => {
    let sql = 'SELECT * FROM history ORDER BY Tanggal ASC'
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        if (req.query.error === 'Already_Exist') {
            return res.render('dashboard', {
                title: 'Crud with mysql baru',
                user: rows,
                messages: 'Data sudah ada dalam database, masukan data yang lain!'
            })
        }
        if (req.query.done === 'Data_Input') {
            return res.render('dashboard', {
                title: 'Crud with mysql baru',
                user: rows,
                messages: 'Data Terinput :)'
            })
        }
        return res.render('dashboard', {
            title: 'Crud with mysql baru',
            user: rows,
            messages: ''
        })

    })
})

Router.post('/auth/inputData', authController.InputData);
Router.get('/auth/delete', authController.reset);

module.exports = Router;