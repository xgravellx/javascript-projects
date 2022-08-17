const axios = require('axios');

const aramaYap = async (req, res) => { // search ile ilgili
    const aranacakKelime = req.body.search;
    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search='+aranacakKelime);
        res.render('./makaleler/index', {makaleler: blogAPI.data});
        console.log(blogAPI);
    } catch (hata) {
        console.log(hata.response.data);
        console.log(hata.response.status);
        console.log(hata.response.header);
        res.json({
            mesaj: 'Hata Çıktı ' + hata.response.data,
        })
    }
}

const tumMakaleleriGetir = async (req, res) => {
    let sayfalama = "";
    let aktifPage = ";"
    if (req.query.page) {
        sayfalama = "page"+req.query.page;
        aktifPage = req.query.page;
    }

    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+sayfalama);
/*         console.log(blogAPI.headers); */
        res.render('./makaleler/index', {makaleler: blogAPI.data, sayfalama:blogAPI.headers});
        console.log(blogAPI);
    } catch (hata) {
        console.log(hata.response.data);
        console.log(hata.response.status);
        console.log(hata.response.header);
        res.json({
            mesaj: 'Hata Çıktı ' + hata.response.data,
        })
    }
}

const tekMakaleGetir = async (req, res) => {
    let makaleID = req.params.makaleID;
    try {
        const tekMakale = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/'+ makaleID);
        res.render('./makaleler/makale', {makale:tekMakale.data});
    }catch (hata) {
        console.log(hata.response.data);
        console.log(hata.response.status);
        console.log(hata.response.header);
        res.json({
            mesaj: 'Hata Çıktı ' + hata.response.data,
        })
    }
}

module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir,
    aramaYap
};