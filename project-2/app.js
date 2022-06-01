// arayüz elementleri seçmek
const ad = document.getElementById('name');
const soyad = document.getElementById('surname');
const mail = document.getElementById('mail');

const form = document.getElementById('form-guide');
const kisiListesi = document.querySelector('.kisi-listesi');

// Event Listenerların tanımlanması
form.addEventListener('submit', save);
kisiListesi.addEventListener('click', kisiIslemleriniYap);

// tüm kişiler için dizi 
const tumKisilerDizisi = [];
let secilenSatir = undefined;

function kisiIslemleriniYap(event) {

    if (event.target.classList.contains('btn-trash')) {
        const silinecekTr = event.target.parentElement.parentElement;
        const silinecekMail = event.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr, silinecekMail);
    }
    else if (event.target.classList.contains('btn-edit')) {
        document.querySelector(".kaydetGuncelle").value = "Güncelle";
        const secilenTR = event.target.parentElement.parentElement;
        const guncellenecekMail = secilenTR.cells[2].textContent;

        ad.value = secilenTR.cells[0].textContent;
        soyad.value = secilenTR.cells[1].textContent;
        mail.value = secilenTR.cells[2].textContent;

        secilenSatir = secilenTR;
        console.log(tumKisilerDizisi);

    }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
    silinecekTrElement.remove();

    console.log(silinecekTrElement, silinecekMail);
    
    /*maile göre silme işlemi
    tumKisilerDizisi.forEach((person, index) => {
        if (person.mail === silinecekMail) {
            tumKisilerDizisi.splice(index, 1);
        }
    }); */

    const silinmeyecekKisiler = tumKisilerDizisi.filter(function (person, index) {
        return person.mail !== silinecekMail;
    });

    tumKisilerDizisi.length = 0; 
    tumKisilerDizisi.push(...silinmeyecekKisiler);

    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
}


function save(e) {
    e.preventDefault();

    const eklenecekOrGuncellenecekKisi = {
        ad:ad.value,
        soyad: soyad.value,
        mail:mail.value,
    }

    const sonuc = verileriKontrolEt(eklenecekOrGuncellenecekKisi);
    if(sonuc.durum) {
        if (secilenSatir) {
            kisiyiGuncelle(eklenecekOrGuncellenecekKisi);
        }
        else {
            kisiyiEkle(eklenecekOrGuncellenecekKisi);
        }
    }
    else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);
    }

    //console.log(eklenecekKisi);
}

function kisiyiGuncelle(person) {
    //kişi parametresinde seçilen kişinin yeni değerleri vardır

    // seçilen satırda güncellenmiş değerler var.
    for (let i = 0; i < tumKisilerDizisi.length; i++) {
        if (tumKisilerDizisi[i]. mail === secilenSatir.cells[2].textContent) {
            tumKisilerDizisi[i] = person;
            break;
        }
    }

    secilenSatir.cells[0].textContent = person.ad;
    secilenSatir.cells[1].textContent = person.soyad;
    secilenSatir.cells[2].textContent = person.mail;

    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir = undefined;

    console.log(tumKisilerDizisi);

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