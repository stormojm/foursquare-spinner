import angular from 'angular';
import 'angular-ui-slider';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import pagination from 'angular-ui-bootstrap/src/pagination';

// extract app name into a config util
angular.module('swirlApp', ['ui.slider', pagination]);
// Dynamically import place-list so that we are ensured that the module has been created.
require('./place-list/place-list.component');
