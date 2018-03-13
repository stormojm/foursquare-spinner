import Venues from '../requests/Venues';
import { getCurrentPosition } from '../utils';

export default class PlaceListController {
    constructor($scope) {
        this.places = [];
        this.venues = new Venues();
        this.scope = $scope;
    }

    search() {
        getCurrentPosition().then(location => {
            let searchCriteria = {
                location,
                radius: 250
            };

            return this.venues.explore(searchCriteria);
        }).then(data => {
            this.scope.$evalAsync(() => {
                this.places = data.response.groups[0].items;
            });
        }).catch(() => {
            console.error('Unable to search at your location');
        });
    }
}
