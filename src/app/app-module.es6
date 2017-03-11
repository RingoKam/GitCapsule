import '../assets/js/bootstrap.min.js';
import '../assets/js/material.min.js';
import '../assets/js/chartist.min.js';
import '../assets/js/bootstrap-notify.js';
import '../assets/js/material-dashboard.js';

import angular from 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import uiRouter from "angular-ui-router";
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import root from './root/root.component';
import rootState from './root/root.state';
import home from './home/home.component';
import homeState from './home/home.state';
//import heatmap from './heatmap/heatmap.component';
import { heatmap } from './directive/calendar-heatmap.directive';

angular
    .module('app', [
        angularMaterial,
        uiRouter
    ])
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root', rootState)
            .state('root.home', homeState)
        // .state("root.home.create", createState)
        // .state("root.manage", manageState)
        // .state("root.error", errorState);

        $urlRouterProvider.otherwise('root/home')
    }])
    .component("root", root)
    .component("home", home)
    .directive("heatmap", heatmap)
// .component("create", create)
// .component("capsule", capsule)
// .component("history", history)
// .component("createCapsule", createCapsule)
// .component("createSh", createSh)
// .component("manage", manage)
// .component("error", error)
// .service("GitFolderInfoService", GitFolderInfoService)