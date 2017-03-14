const dataStore = require('../library/datastore');

export default {
    bindings: {
        capsuleid: "<",
        gitFolders: "<"
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
        model.gitFolders = this.gitFolders && this.gitFolders.length > 0 ? this.gitFolders[0].gitFiles : []; 
    }

    model.updateGitFolders = (folders) => {
        model.selectedGitFolders = folders;
    }
}