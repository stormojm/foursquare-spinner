import angular from 'angular';
import placeListTemplate from './place-list.component.html';
import PlaceListController from './place-list.controller';

angular.module('swirlApp', []);
angular.module('swirlApp').
  component('placeList', {
    template: placeListTemplate,
    controller: [ '$http', PlaceListController ]
  });
