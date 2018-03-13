import createRequest from './createRequest';
export default class Venues {
    constructor() {
        this.request = createRequest('GET', 'https://api.foursquare.com/v2/venues/explore');
    }

    explore(searchCriteria) {
        let foursquareCriteria = {};
        foursquareCriteria.radius = searchCriteria.radius;
        if (typeof searchCriteria.location === 'object') {
            foursquareCriteria.ll = `${searchCriteria.location.latitude},${searchCriteria.location.longitude}`;
        } else {
            foursquareCriteria.near = searchCriteria.location;
        }

        return this.request(foursquareCriteria).then(response => {
            return response;
        }, response => {
            return;
        });
    }
}
