import PlaceListController from './place-list.controller';

describe("place-list.controller", () => {
    it('should be able to be constructed', () => {
        const placeListController = new PlaceListController();
        expect(placeListController).not.toBeUndefined();
        expect(placeListController.places).toEqual([]);
    });
});
