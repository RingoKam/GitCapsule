const capsuleNameStore = require('../library/capsule_name_store');
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
        this.dbCapsuleNames;
        model.heatMapData = BuildHeatMapData(this.dbRecords);
        model.capsuleCollections = BuildTableData(this.dbRecords, this.dbCapsuleNames);
        model.version = pkg.version;
    };

    model.$onChanges = function (changesObj) {};

    model.$onDestory = function () {};

    function BuildHeatMapData(capsules) {
        debugger;
        const dates = _.uniq(capsules.map((el) =>
            moment(el.createdOn).format("MMMM Do YYYY")
        ));
        return dates.map((date) => {
            let detail = capsules.filter(cap => moment(cap.createdOn).format("MMMM Do YYYY") === moment(date).format("MMMM Do YYYY"))
            return {
                date: "2017-01-01",
                "count": detail.length
            }
        })
        // var now = moment().endOf('day').toDate();
        // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
        // return d3.time.days(yearAgo, now).map(function (dateElement) {
        //     return {
        //         date: dateElement,
        //         count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(
        //             Math.random() * 10)
        //     };
        // });
    }

    model.filterNull = function(field1) {
      if(field1 === "" || field1 === null) return true;
      return false
    };

    function BuildTableData(capsules, capsuleNames) {
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
}