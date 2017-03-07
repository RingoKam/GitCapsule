const dataStore = require('../library/datastore');
import {
    NgTableParams
} from 'ng-table';

export default {
    template: require("./manage.html"),
    controller: ManageController,
    controllerAs: "model",
    bindings: {
        dbRecords: '<',
    }
}

function ManageController($scope) {
    let model = this;

    model.$onInit = function () {
        this.dbRecords;
        model.capsuleCollections = RestructureData(this.dbRecords);
        model.tableParams = new NgTableParams({}, {
            dataset: model.capsuleCollections
        });
    };

    model.$onChanges = function (changesObj) {};

    model.$onDestory = function () {};

    function RestructureData(data) {
        return data.map(el => {
            return {
                capsule: el.capsule,
                fileName: el.name,
                createdOn: el.createdOn,
                comment: el.comment,
                numberOfProject: el.gitFiles.length
            }
        });
        // let capsuleNames = data.map((cap) => {
        //     return cap.capsule
        // }).filter((name, index, array) => {
        //     return array.indexOf(name) === index
        // });
        // let capsules = capsuleNames.map((name) => {
        //     let collection = data.filter((d) => {
        //         return d.capsule === name
        //     })
        //     return {
        //         name,
        //         collection
        //     }
        // })
        // return capsules;
    }
}