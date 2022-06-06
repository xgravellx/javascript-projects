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
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}

class Ui {
    constructor() {
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.kaydetGuncelle');
        this.form = document.getElementById('form-guide').addEventListener('submit', this.kaydeGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".kisi-listesi");
        this.kisiListesi.addEventListener('click', this.guncelleOrSil.bind(this));
        this.veritabani = new Veritabani();

        // update ve delete butonlarına basıldığında ilgili tr elemeni burda tutulur.
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdır();
    }

    alanlariTemizle() {
        this.ad.value = '';
        this.soyad.value = '';
        this.mail.value = '';

    }

    guncelleOrSil(e) {
        const tiklanmaYeri = e.target;
    
        if (tiklanmaYeri.classList.contains('btn-trash')) {
            this.secilenSatir = tiklanmaYeri.parentElement;
            this.kisiyiEkrandanSil();
        }
        else if (tiklanmaYeri.classList.contains('btn-edit')) {
            this.secilenSatir = tiklanmaYeri.parentElement;

        }
    }

    kisiyiEkrandanSil() {
        this.secilenSatir.remove();
        const silinecekMail = this.secilenSatir.cells[2].textContent;
        this.veritabani.kisiSil(silinecekMail);
        this.alanlariTemizle();
    }

    kisileriEkranaYazdır() {
        this.veritabani.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        })
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
            this.alanlariTemizle();
        }
        else {
            console.log("boş alan var");
        }
    }
}

class Veritabani{
    // uygulama ilk açıldığında veriler getirilir.
    constructor() {
        this.tumKisiler = this.kisileriGetir();
    }
    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisilerLocal = [];
        }
        else {
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        return tumKisilerLocal;
    }

    kisiEkle(kisi) {
        this.tumKisiler.push(kisi);
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }

    kisiSil(mail) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === mail) {
                this.tumKisiler.splice(index, 1);
            }
        });
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }

    kisiGuncelle(guncellenmisKisi, mail) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === mail) {
                this.tumKisiler[index] = guncellenmisKisi;
            }
        });
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ui();
});