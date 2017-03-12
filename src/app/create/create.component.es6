const dataStore = require('../library/datastore');

export default {
    bindings: {
        capsuleid: "<"
    },
    template: require("./create.html"),
    controller: createController,
    controllerAs: "model"
}

function createController() {
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
            });
        }
    }

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders;
    }
}