/* jshint jasmine:true */
import PlaceListController from './place-list.controller';

describe('place-list.controller', () => {
    it('should be able to be constructed', () => {
        const mockScope = {};
        const placeListController = new PlaceListController(mockScope);
        expect(placeListController).not.toBeUndefined();
        expect(placeListController.places).toEqual([]);
    });

    describe('when searching for places', () => {
        let placeListController;
        beforeEach(done => {
            const mockScope = {
                '$evalAsync': callback => {
                    callback();
                    done();
                }
            };

            placeListController = new PlaceListController(mockScope);
            spyOn(placeListController.venues, 'explore').and.returnValue(new Promise((resolve, reject) => {
                resolve({
                    response: {
                        groups: [{
                            items: [{name:'test'}]
                        }]
                    }
                });
            }));

            placeListController.search();
        });

        it ('should update the places on the controller', () => {
            expect(placeListController.places).toEqual([{name:'test'}]);
        });
    });
});
