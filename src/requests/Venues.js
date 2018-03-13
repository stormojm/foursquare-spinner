import createRequest from './createRequest';
export default class Venues {
    constructor() {
        this.request = createRequest('GET', 'https://api.foursquare.com/v2/venues/explore');
    }

    explore() {
        return this.request({
            near: 'Chicago,IL'
        }).then((response) => {
            return response;
        }, response => {
            return;
        });
    }
}
