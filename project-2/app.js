// arayüz elementleri seçmek
const ad = document.getElementById('name');
const soyad = document.getElementById('surname');
const mail = document.getElementById('mail');

const form = document.getElementById('form-guide');
const kisiListesi = document.querySelector('.kisi-listesi');

// Event Listenerların tanımlanması
form.addEventListener('submit', save);

// tüm kişiler için dizi 
const tumKisilerDizisi = [];

function save(e) {
    e.preventDefault();

    const eklenecekKisi = {
        ad:ad.value,
        soyad: soyad.value,
        mail:mail.value,
    }

    const sonuc = verileriKontrolEt(eklenecekKisi);
    if(sonuc.durum) {
        kisiyiEkle(eklenecekKisi);
    }
    else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);
    }

    //console.log(eklenecekKisi);
}

function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = `
    <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn-edit"><i class="fa-solid fa-pen-to-square"></i></button> 
        <button class="btn btn-trash"><i class="fa-solid fa-trash"></i></button> 
    </td>
    `;
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekKisi);

    bilgiOlustur('Kişi Rehbere kaydedildi.', true);
}

function verileriKontrolEt(person) {
    // objectlerde in kullanımı
    for (const deger in person) {
        if (person[deger]) {
            console.log(person[deger]);
        }
        else {
            const sonuc = {
                durum: false,
                mesaj: 'boş alan bırakmayınız'
            }
            return sonuc;
        }
    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj: 'kaydedildi',
    }
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'info';
    /* if (durum) {
        olusturulanBilgi.classList.add('info-success');
    }
    else {
        olusturulanBilgi.classList.add('info-error');
    } */
    olusturulanBilgi.classList.add(durum ? 'info-success' : 'info-error');

    document.querySelector('.container').insertBefore(olusturulanBilgi, form);
    
    // setTimeOut, setInterval
    setTimeout(function() {
        const silinecekDiv = document.querySelector('.info');
        if(silinecekDiv) {
            silinecekDiv.remove();
        }
    }, 2000);
}

function alanlariTemizle() {
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}