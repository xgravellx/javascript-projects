class UnsplashApi{
    constructor() {
        this.baseURL = 'https://api.unsplash.com';
        this.clientID = 'Client-ID n1ObXm_Bhfy3-AIWUQ9IRa9oKNysBLaKeehm6SzwaEM';
        this.axiosNesne = axios.create({
            baseURL : this.baseURL,
            headers: {
                Authorization: this.clientID
            },
            params : {
                query: 'animal',
                count : 1
            }
        });
    }

    async randomResimGetir() {
        try {
            const resimResponse = await this.axiosNesne.get('/photos/random');
            console.log(resimResponse.data[0].urls.regular);
            return resimResponse.data[0].urls.regular;
        }
        catch (err) {
            console.log(err);
            return 'https://bulma.io/images/placeholders/1280x960.png';
        }
    }
}

export default function resimGetir() {
    const getirilenResim = new UnsplashApi().randomResimGetir();
    return getirilenResim;
}