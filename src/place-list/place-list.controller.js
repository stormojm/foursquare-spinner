import Venues from '../requests/Venues';
import { getCurrentPosition } from '../utils';

const pageLimit = 30;

export default class PlaceListController {
    constructor($scope) {
        this.places = [];
        this.venues = new Venues();
        this.scope = $scope;
        this.range = 250;
        this.loading = false;
        this.showGetMoreResults = true;
        this._currentOffset = 0;
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

    getMoreResults() {
        this._searchImpl();
    }

    _searchImpl() {
        this._getLocation().then(location => {
            let searchCriteria = {
                location,
                radius: this.range,
                offset: this._currentOffset,
                limit: pageLimit
            };

            return this.venues.explore(searchCriteria);
        }).then(data => {
            this.scope.$evalAsync(() => {
                if (!data || !data.response) {
                    console.error('No data returned from venues search.');
                    this.loading = false;
                    this.places = [];
                    return;
                }

                if (data.response.geocode) {
                    this.searchText = data.response.geocode.displayString;
                }

                if (!data.response.groups || data.response.groups.length < 1) {
                    console.error('No places returned from venues search.');
                    this.loading = false;
                    this.places = [];
                    return;
                }

                let requestPlaceResults = data.response.groups[0].items;
                this.places = this.places.concat(requestPlaceResults);
                if (requestPlaceResults.length < pageLimit) {
                    this.showGetMoreResults = false;
                }
                this._currentOffset += pageLimit;

                this.loading = false;
            });
        }).catch(() => {
            console.error('Unable to search at your location');
            this.loading = false;
        });
    }

    search() {
        // Reset our search and pagin
        this._currentOffset = 0;
        this.showGetMoreResults = true;
        this.places = [];
        this.loading = true;
        this._searchImpl();
    }
}
