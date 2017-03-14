const capsuleNameStore = require('../library/capsule_name_store');
const dataStore = require('../library/datastore');
const pkg = require('../../../package');
const remote = require('electron').remote
const moment = require('moment');
import _ from 'lodash';

export default {
    template: require("./home.html"),
    controller: ManageController,
    controllerAs: "model",
    bindings: {
        dbRecords: '<',
        dbCapsuleNames: '<',
        capsulename: '<'
    }
}

ManageController.inject = ['$state'];

function ManageController($state, $scope, $mdDialog) {
    let model = this;

    model.$onInit = function () {
        this.capsulename;
        this.dbRecords;
        this.dbCapsuleNames = this.dbCapsuleNames;
        model.capsuleCollections = BuildTableData(this.dbRecords, this.dbCapsuleNames);
        debugger;
        if (model.capsulename && model.capsulename.length > 0) model.capsuleCollections = model.capsuleCollections.map(m => {
            m.show = true;
            return m; 
        })
        model.version = pkg.version;
    };
    model.$onChanges = function (changesObj) {};
    model.$onDestory = function () {};
    model.changeState = (id) => {
        $state.go("create", {
            "capsuleid": id
        });
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

    model.Delete = function (id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('Delete?')
            .ariaLabel('Delete record')
            // .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            Delete(id);
        });
    }

    model.PromptNewCapsule = (ev) => {
        var confirm = $mdDialog.prompt()
            .title('New Capsule Collection')
            .textContent('Capsule are use to group multiple git repos together')
            .placeholder('* Capsule Name *')
            .ariaLabel('capsule name')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function (name) {
            if (name && name.length > 0) {
                let promise = capsuleNameStore.insertdb({
                    name
                });
                promise.finally(() => {
                    remote.getCurrentWindow().reload();
                })
            }
        });
    }

    function BuildHeatMapData(capsules) {
        const dates = _.uniq(capsules.map((el) =>
            moment(el.createdOn).format("YYYY-MM-DD")
        ));
        return dates.map((date) => {
            let detail = capsules.filter(cap => moment(cap.createdOn).format("YYYY-MM-DD") === date)
            return {
                date,
                "count": detail.length
            }
        })
    }

    function BuildTableData(capsules, capsuleNames) {
        return capsuleNames.map((capsuleName) => {
            const capsulesByName = _.sortBy(capsules.filter((el) => el.capsule == capsuleName.name), (o) => o.createdOn).reverse();
            return {
                name: capsuleName.name,
                heatmap: BuildHeatMapData(capsulesByName),
                capsules: capsulesByName
                    .map((el) => {
                        return {
                            id: el._id,
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

    function Delete(id) {
        debugger;
        dataStore.remove({
            _id: id
        }).then(() => {
            remote.getCurrentWindow().reload();
        })
    }
}