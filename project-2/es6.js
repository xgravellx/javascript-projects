class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

class Util {
    static bosAlanKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            if (alan.length !== 0) {
                sonuc = false;
                return false;
            }
        });

        return sonuc;
    }
}

class Ui {
    constructor() {
        this.ad = document.getElementById('name');
        this.soyad = document.getElementById('surname');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.kaydetGuncelle');
        this.form = document.getElementById('form-guide').addEventListener('submit', this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".kisi-listesi");
        this.veritabani = new Veritabani();
    }

    kisiyiEkranaEkle(kisi) {
        const olusturulanTR = document.createElement('tr');
        olusturulanTR.innerHTML = `  
        <td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
            <button class="btn btn-edit"><i class="fa-solid fa-pen-to-square"></i></button> 
            <button class="btn btn-trash"><i class="fa-solid fa-trash"></i></button> 
        </td>
        `;
        this.kisiListesi.appendChild(olusturulanTR);
    }

    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail);

        // tüm alanlar doldurulmuş
        if (sonuc) {
            // yeni kisiyi ekrana ekler
            this.kisiyiEkranaEkle(kisi);

            // localStorage ekler
            this.veritabani.kisiEkle(kisi);
        }
        else {
            console.log("boş alan var");
        }
    }
}

class Veritabani{
    // uygulama ilk açıldığında veriler getirilir.
    constructor() {
        this.tumKisiler = [];
    }
    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisilerLocal = [];
        }
        else {
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        this.tumKisiler = tumKisilerLocal;
        return tumKisilerLocal;
    }

    kisiEkle(kisi) {
        const tumKisilerLocal = this.kisileriGetir();
        tumKisilerLocal.push(kisi);
        localStorage.setItem('tumKisiler', JSON.stringify(tumKisilerLocal));
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ui();
});