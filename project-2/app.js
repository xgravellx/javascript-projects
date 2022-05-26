// arayüz elementleri seçmek
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('mail');

const form = document.getElementById('form-guide');

// Event Listenerların tanımlanması
form.addEventListener('submit', save);

function save(e) {
    e.preventDefault();

    const eklenecekKisi = {
        name:name.value,
        surname: surname.value,
        email:email.value,
    }

    const sonuc = verileriKontrolEt(eklenecekKisi);
    if(sonuc.durum) {
        console.log('Sıkıntı yok');
    }
    else {
        bilgiOlustur(sonuc.mesaj, sonuc.durum);
        console.log(sonuc.mesaj);
    }

    //console.log(eklenecekKisi);
}

function verileriKontrolEt(person) {
    // object in kullanımı
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
    return {
        durum: true,
        mesaj: '',
    }
}

function bilgiOlustur(mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'info';
    if (durum) {
        olusturulanBilgi.classList.add('info-success');
    }
    else {
        olusturulanBilgi.classList.add('info-error');
    }

    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

}
