export default class Venues {
    constructor($http) {
        this.$http = $http;
    }

    explore() {
        return this.$http({
            method: 'GET',
            url: 'https://api.foursquare.com/v2/venues/explore',
            params: {
                near: 'Chicago,IL',
                client_id: 'YTZT1ZRTVMXA52INRENW43SXOYHUL1XTZAIKJBMR1I0TDAWK',
                client_secret: 'DVRI3XOQAXWIIMGTGC1RS5TJ0NAMXZQZF1PALE3DXUMQ4AUJ',
                v: 20180312
            }
        }).then((response) => {
            return response.data;
        }, response => {
            return;
        });
    }
}
