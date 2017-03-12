const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');
const remote = require('electron').remote

import Q from 'q';

export default {
    template: require("./capsule.html"),
    controller: capsuleController,
    controllerAs: "model",
    bindings: {
        capsules: '<',
        capsulesName: '<'
    }
};

capsuleController.inject = ['$state'];

function capsuleController($state, $rootScope, $scope, $mdDialog) {

    var model = this;

    model.$onInit = function () {

    };

    model.$onChanges = function (changesObj) {
        model.capsules = RestructureData(model.capsules);
    };


    model.$onDestory = function () {};

    model.changeState = (id) => {
        $state.go("create", {
            "capsuleid": id
        }, {
            reload: true
        });
    }

    function RestructureData(data) {
        if (data && data.length > 0) {
            let capsuleNames = data.map((cap) => {
                return cap.capsule
            }).filter((name, index, array) => {
                return array.indexOf(name) === index
            });
            let capsules = capsuleNames.map((name) => {
                let collection = data.filter((d) => {
                    return d.capsule === name
                })
                return {
                    name,
                    collection
                }
            })
            return capsules;
        }
    }
}