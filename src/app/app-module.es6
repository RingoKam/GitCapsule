import 'angular-utils-pagination'

// import angular from 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import uiRouter from "angular-ui-router";
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import root from './root/root.component';
import home from './home/home.component';
import homeState from './home/home.state';
import create from './create/create.component';
import createState from './create/create.state';
import createCapsule from './CreateCapsule/create-capsule.component';
import createSh from './CreateSh/create-sh.component';
import history from './history/history.component';
import capsule from './capsule/capsule.component';
import capsuleNameFilter from './home/home-capsulename.filter';
import error from './error/error.component';
import errorState from './error/error.state';

// import manage from './manage/manage.component';
import {
    heatmap
} from './directive/calendar-heatmap.directive';
import {
    GitFolderInfoService
} from './services/git-folder-info.service';
angular
    .module('app', [
        angularMaterial,
        uiRouter,
        'angularUtils.directives.dirPagination'
    ])
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('deep-orange')
            .backgroundPalette('grey', {
                'default': '300',
                'hue-1': '50'
            })
            .warnPalette('red');

        $stateProvider
            .state('home', homeState)
            .state("create", createState)
            .state("error", errorState);
            
        $urlRouterProvider.otherwise('/home')
    }])
    .component("root", root)
    .component("home", home)
    .directive("heatmap", heatmap)
    .component("create", create)
    .component("capsule", capsule)
    .component("history", history)
    .component("createCapsule", createCapsule)
    .component("createSh", createSh)
    .component("error", error)
    .filter("capsulenamefilter", capsuleNameFilter)
    // .component("manage", manage)
    // .component("error", error)
    .service("GitFolderInfoService", GitFolderInfoService)