import angular from 'angular';
import placeTileTemplate from './place-tile.component.html';
import PlaceTileController from './place-tile.controller';

angular.module('swirlApp').
  component('placeTile', {
    template: placeTileTemplate,
    controller: [ PlaceTileController ],
    bindings: {
        place: '='
    }
  });
