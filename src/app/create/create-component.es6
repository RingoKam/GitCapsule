const dataStore = require('../library/datastore');
const capsuleNameStore = require('../library/capsule_name_store');

export default {
    bindings: {
        capsuleid: "<"
    },
    template: require("./create.html"),
    controller: directoryController,
    controllerAs: "model"
}

// directoryController.$inject = [];

function directoryController() {
    var model = this;

    model.$onInit = function ($scope) {
        model.capsuleid = this.capsuleid; 
        model.selectedGitFolders = [];
        model.gitFolders = [];
        if (model.capsuleid) {
            dataStore.find({
                _id: this.capsuleid
            }).then((data) => {
                model.gitFolders = data[0].gitFiles;
                // model.gitFolders = model.selectedGitFolders.map((e) => e.selected = true)
                // model.loading = false; 
                // if(!$scope.$$phase) {
                // $scope.$apply(); 
                // }
            });
        }
    }

    model.$onChange = function (changeObj) {
        // if (model.selectedGitFolders) {
        //     dataStore.find({
        //         _id: this.capsuleid
        //     }).then((data) => {
        //         model.selectedGitFolders = data[0];
        //         model.selectedGitFolders = model.selectedGitFolders.map((e) => e.selected = true)
        //     });
        // } else {
        //     model.selectedGitFolders.gitFiles = []; 
        // }
    }

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders;
    }
}