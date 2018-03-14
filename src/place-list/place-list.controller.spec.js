/* jshint jasmine:true */
import placeListControllerInject from 'inject-loader!babel-loader!./place-list.controller.js';

describe('place-list.controller', () => {
    let PlaceListController,
        mocks = {};
    beforeEach(() => {
        mocks.scope = {};
        mocks.utils = {
            getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.returnValue(new Promise((resolve, reject) => {
                resolve({latitude: '2', longitude: '1'});
            }))
        };
        mocks.venue = {
            explore: jasmine.createSpy('explore').and.returnValue(new Promise((resolve, reject) => {
                resolve({
                    response: {
                        geocode: {
                            displayString: 'Test Location'
                        },
                        groups: [{
                            items: [{name:'test'}]
                        }]
                    }
                });
            }))
        };
        mocks.Venues = function() {
            return mocks.venue;
        };

        PlaceListController = placeListControllerInject({
            '../utils': mocks.utils,
            '../requests/Venues': mocks.Venues
        }).default;
    });
    it('should be able to be constructed', () => {
        const placeListController = new PlaceListController(mocks.scope);
        expect(placeListController).not.toBeUndefined();
        expect(placeListController.places).toEqual([]);
        expect(placeListController.loading).toBe(false);
    });

    describe('when searching for places with empty location', () => {
        let placeListController;
        beforeEach(done => {
            mocks.scope = {
                '$evalAsync': callback => {
                    callback();
                    done();
                }
            };

            placeListController = new PlaceListController(mocks.scope);
            placeListController.search();

            // This should be moved into an it, and a new
            // describe block where the evalAsync (or the venues search)
            // is called manually instead of automatically.
            expect(placeListController.loading).toBe(true);
        });

        it('should update the places on the controller', () => {
            expect(placeListController.places).toEqual([{name:'test'}]);
        });

        it('should call the venue request', () => {
            expect(mocks.venue.explore).toHaveBeenCalled();
            expect(mocks.venue.explore.calls.argsFor(0)[0].location).toEqual({latitude: '2', longitude: '1'});
        });

        it('should request the current position of the agent', () => {
            expect(mocks.utils.getCurrentPosition).toHaveBeenCalled();
        });

        it('should reset loading to false', () => {
            expect(placeListController.loading).toBe(false);
        });

        it('should change the search text to the location', () => {
            expect(placeListController.searchText).toBe('Test Location');
        });
    });

    describe('when searching for places with search text', () => {
        let placeListController;
        beforeEach(done => {
            mocks.scope = {
                '$evalAsync': callback => {
                    callback();
                    done();
                }
            };

            placeListController = new PlaceListController(mocks.scope);
            placeListController.searchText = 'Test, NL';
            placeListController.search();
        });

        it('should call the venue request', () => {
            expect(mocks.venue.explore).toHaveBeenCalled();
            expect(mocks.venue.explore.calls.argsFor(0)[0].location).toEqual('Test, NL');
        });

        it('should not request the current position of the agent', () => {
            expect(mocks.utils.getCurrentPosition).not.toHaveBeenCalled();
        });
    });
});
