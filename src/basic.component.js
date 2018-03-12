import angular from 'angular';

angular.module('swirlApp', []);
angular.module('swirlApp').
  component('placeList', {
    template:
        '<ul>' +
          '<li ng-repeat="place in $ctrl.places">' +
            '<span>{{place.name}}</span>' +
          '</li>' +
        '</ul>',
    controller: function PlaceListController() {
      this.places = [
        {
          name: 'McDonals'
        }, {
          name: 'Restaurant',
        }, {
          name: 'Bar',
        }
      ];
    }
  });
