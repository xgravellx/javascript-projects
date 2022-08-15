const express = require('express');
const app = express();
const path = require('path');

const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', (req, res) => { // buraya get isteği olduğunda index.html çalışır.
    /* res.send({
        mesaj: "merhaba",
    }) */
/*     res.sendFile(path.resolve(__dirname, 'index.html')); */
    const kisilerDizisi = [
        {ad: 'hazal1', id: 1},
        {ad: 'hazal2', id: 2},
        {ad: 'hazal3', id: 3},
        {ad: 'hazal4', id: 4},
    ];
    const dersAdi = 'Node JS';
    const yas = 24;
    const renkler = ['kırmızı', 'sarı', 'mavi'];
    res.render('index', {
        kisiler : kisilerDizisi,
        ders    : dersAdi,
        yas,
        renkler
    });
})


app.listen(3000, () => {
    console.log("3000 portundan server ayaklandı");
})