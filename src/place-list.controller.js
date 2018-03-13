import Venues from './requests/Venues';

export default class PlaceListController {
    constructor($scope) {
        this.places = [];
        this.venues = new Venues();
        this.scope = $scope;
    }

    search() {
        this.venues.explore().then(data => {
            this.scope.$evalAsync(() => {
                this.places = data.response.groups[0].items;
            });
        });
    }
}
