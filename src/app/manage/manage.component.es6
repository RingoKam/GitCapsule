const dataStore = require('../library/datastore');
const pkg = require('../../../package');

import {
    NgTableParams
} from 'ng-table';

export default {
    template: require("./manage.html"),
    controller: ManageController,
    controllerAs: "model",
    bindings: {
        dbRecords: '<',
        dbCapsuleNames: '<'
    }
}

function ManageController($scope, $mdDialog) {
    let model = this;

    model.$onInit = function () {
        this.dbRecords;
        this.dbCapsuleNames;
        model.capsuleCollections = RestructureData(this.dbRecords, this.dbCapsuleNames);
        model.version = pkg.version;
    };

    model.$onChanges = function (changesObj) {};

    model.$onDestory = function () {};

    function RestructureData(capsules, capsuleNames) {
        return capsuleNames.map((capsuleName) => {
            return {
                name: capsuleName.name,
                capsules: capsules
                    .filter((el) => el.capsule == capsuleName.name)
                    .map((el) => {
                        return {
                            fileName: el.name,
                            createdOn: el.createdOn,
                            comment: el.comment,
                            numberOfProject: el.gitFiles.length,
                            json: el
                        }
                    })
            }
        })
    }

    model.ShowDetail = (capsule) => {

        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('JSON')
            .textContent(JSON.stringify(capsule))
            .ariaLabel('JSON')
            .ok('Got it!')
        ); 
    }
}