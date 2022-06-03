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
        this.form = document.getElementById('form-guide').addEventListener('submit', this.kaydetGuncelle);
        this.veritabani = new Veritabani();
    }

    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail);

        // tüm alanlar doldurulmuş
        if (sonuc) {
            
        }
        else {
            
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