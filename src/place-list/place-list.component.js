import angular from 'angular';
import placeListTemplate from './place-list.component.html';
import PlaceListController from './place-list.controller';
import '../place-tile/place-tile.component';

angular.module('swirlApp').
  component('placeList', {
    template: placeListTemplate,
    controller: [ '$scope', PlaceListController ]
  });
