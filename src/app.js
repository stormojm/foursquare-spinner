import angular from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

angular.module('swirlApp', []);
// Dynamically import place-list so that we are ensured that the module has been created.
require('./place-list/place-list.component');
