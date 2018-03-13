import angular from 'angular';
import 'angular-ui-slider';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// extract app name into a config util
angular.module('swirlApp', ['ui.slider']);
// Dynamically import place-list so that we are ensured that the module has been created.
require('./place-list/place-list.component');
