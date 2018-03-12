import Venues from './requests/Venues';

export default class PlaceListController {
    constructor($http) {
        this.places = [];
        this.venues = new Venues($http);
    }

    search() {
        let result = this.venues.explore().then(data => {
            this.places = data.response.groups[0].items;
        });
    }
};
