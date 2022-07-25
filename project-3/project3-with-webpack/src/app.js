/* import resimGetir from "./unsplash-api";
import sakaGetir from "./joke-api"; */
// OR
const getResimGetir = () => import('./unsplash-api');
const getSakaGetir = () => import('./joke-api');

class Ekran {
    constructor() {
        this.btnSakaGetir = document.querySelector('.saka-getir-button');
        this.btnSakaGetir.addEventListener('click', this.sakaGetir.bind(this));
    }

    async sakaGetir() {

        const rastgeleResim = await (await getResimGetir().resimGetir());
        const rastgeleSaka = await (await getSakaGetir().sakaGetir());
        
        
        // const rastgeleResim = await resimGetir();
        // const rastgeleSaka = await sakaGetir();

        const tumSonuclar = {
            rastgeleResim,
            rastgeleSaka
        }
        this.ekranaSonuclariYazdir(tumSonuclar);
    }

    ekranaSonuclariYazdir(sonuclar) {
        document.querySelector('.sonuch').innerHTML = `
        <div class="card">
            <div class="card-image">
                <figure class="image is-16by9">
                  <img src="${sonuclar.rastgeleResim}" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4 has-text-danger pb-4">${sonuclar.rastgeleSaka}</p>
                    </div>
                </div>
            </div>
        </div>`
    }
}

export default function uygulamayiBaslat() {
    new Ekran();
}