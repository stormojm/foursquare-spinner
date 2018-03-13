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
    });

    describe('when searching for places', () => {
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
    });
});
