const electron = window.require('electron').remote;
const _ = require('lodash'); 

export default {
    template: require("./create-capsule.html"),
    //templateUrl: 'templateUrl',
    controller: createCapsuleController,
    controllerAs: "model",
    bindings: {
        gitFolders: "<",
        selectedGitFolders: '<',
        onGitFoldersChange: '&'
    },
};

createCapsuleController.inject = ['GitFolderInfoService'];
function createCapsuleController($scope, GitFolderInfoService) {
    let model = this;

    model.$onInit = function () {
        model.gitFolders = this.gitFolders;
        model.onGitFoldersChange = this.onGitFoldersChange;
        model.selectedGitFolders = this.selectedGitFolders;
    };

    model.$onChanges = function (changesObj) {};

    model.$onDestory = function () {};

    model.refreshGit = function () {
        model.gitFolders = model.gitFolders.map((m) => {
            return GitFolderInfoService.GetFileInfo(m.repoInfo.root);
        })
    };

    model.refreshSelectedGit = function (gitFolder) {
        const newInfo = GitFolderInfoService.GetFileInfo(gitFolder.repoInfo.root);
        let info = model.gitFolders[model.gitFolders.indexOf(gitFolder)];
        info.repoInfo = newInfo.repoInfo; 
        info.config = newInfo.config;
        info.file = newInfo.file;
    }

    model.OpenDirectory = function () {
        model.loading = true;
        electron.dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        }, (filePath) => {
            if (filePath) {
                let gitFolder = GitFolderInfoService.GetGitFolders(filePath[0]);
                model.gitFolders = this.gitFolders.concat.apply(gitFolder);
                model.gitFolders.sort((a, b) => {
                    let current = a.file.name.toLowerCase();
                    let next = b.file.name.toLowerCase();
                    return current < next ? -1 : current > next ? 1 : 0; 
                })
            }
            model.loading = false;
            $scope.$apply();
        });
    }

    model.AddGitFolders = function (gitFolder) {
        if (!gitFolder.selected) {
            model.selectedGitFolders.push(gitFolder);
            model.onGitFoldersChange({
                folders: model.selectedGitFolders
            })
        } else {
            let removethis = model.selectedGitFolders.filter((el) => {
                return el.repoInfo.abbreviatedSha == gitFolder.repoInfo.abbreviatedSha
            })[0];
            let index = model.selectedGitFolders.indexOf(removethis)
            if (index > -1)
                model.selectedGitFolders.splice(index, 1);
        }
    }
}