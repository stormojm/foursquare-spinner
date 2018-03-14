import Venues from '../requests/Venues';
import { getCurrentPosition } from '../utils';

export default class PlaceListController {
    constructor($scope) {
        this.places = [];
        this.venues = new Venues();
        this.scope = $scope;
        this.range = 250;
        this.loading = false;
        this.popoverContent = 'Test';
    }

    _getLocation() {
        return new Promise((resolve, reject) => {
            if (this.searchText) {
                resolve(this.searchText);
                return;
            }

            if (this._cachedLocation) {
                resolve(this._cachedLocation);
                return;
            }

            getCurrentPosition().then(value => {
                this._cachedLocation = value;
                resolve(value);
            }, reason => {
                reject(reason);
            });
        });
    }

    search() {
        this.scope.$evalAsync(() => this.loading = true);
        this._getLocation().then(location => {
            let searchCriteria = {
                location,
                radius: this.range
            };

            return this.venues.explore(searchCriteria);
        }).then(data => {
            this.scope.$evalAsync(() => {
                if (!data.response) {
                    console.error('No data returned from venues search.');
                    return;
                }

                this.searchText = data.response.headerFullLocation;

                if (!data.response.groups || data.response.groups.length < 1) {
                    console.error('No places returned from venues search.');
                    return;
                }

                this.places = data.response.groups[0].items;
                this.loading = false;
            });
        }).catch(() => {
            console.error('Unable to search at your location');
        }).finally(() => {

        });
    }
}
