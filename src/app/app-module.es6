require('jquery');
require('../Assets/css/card.css');
const profile = require('./library/CustomProfile.js');
// require ('../Assets/css/ng-table.scss');
// require ('../Assets/css/bootstrap.css');

import angular from 'angular';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import uiRouter from "angular-ui-router";
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import create from './create/create-component';
import createState from './create/create-state';
import capsule from './capsule/capsule.component';
import history from './history/history.component'
import createCapsule from './CreateCapsule/create-capsule.component';
import createSh from './CreateSh/create-sh.component';
import home from './home/home.component';
import homeState from './home/home.state';
import manage from './manage/manage.component';
import manageState from './manage/manage.state';
import root from './root.component';
import rootState from './root.state';
import { ngTableModule } from 'ng-table';


import {
    GitFolderInfoService
} from './services/git-folder-info.service';

angular
    .module('app', [
        angularMaterial,
        uiRouter,
        ngTableModule.name
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
            .state('root', rootState)
            .state('root.home', homeState)
            .state("root.home.create", createState)
            .state("root.manage", manageState);

        $urlRouterProvider.otherwise('root/manage')
    }])
    .component("root", root)
    .component("home", home)
    .component("create", create)
    .component("capsule", capsule)
    .component("history", history)
    .component("createCapsule", createCapsule)
    .component("createSh", createSh)
    .component("manage", manage)
    .service("GitFolderInfoService", GitFolderInfoService)
// home.config();

// angular.element(document).ready(function(){
//   $('.loading').remove();
// });