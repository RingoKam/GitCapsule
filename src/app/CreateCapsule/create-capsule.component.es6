const electron = window.require('electron').remote;
let gitFolderInfo = require('../library/git_folder_info');

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
        model.UnSelectAll();
        model.gitFolders = model.gitFolders.map((m) => {
            return GitFolderInfoService.GetFileInfo(m.repoInfo.root);
        })
    };

    model.refreshSelectedGit = function (gitFolder) {
        model.UnSelectAll();
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
                let git = GitFolderInfoService.GetGitFolders(filePath[0]);
                model.gitFolders = model.gitFolders && model.gitFolders.length > 0 ? model.gitFolders : [];
                git.map((e) => {
                    if (model.gitFolders.filter((ee) => {
                            if (e.file.dir + e.repoInfo.sha === ee.file.dir + ee.repoInfo.sha) {
                                return true;
                            }
                        }).length === 0) {
                        model.gitFolders = _.concat(model.gitFolders, e);
                    }
                })
            }
            model.loading = false;
            $scope.$apply();
        });
    }

    model.SelectAll = function () {
        model.selectedGitFolders = [];
        model.gitFolders = model.gitFolders.map(el => {
            el.selected = true;
            return el;
        });
        model.selectedGitFolders = model.gitFolders;
        model.onGitFoldersChange({
            folders: model.selectedGitFolders
        });
    }

    model.UnSelectAll = function () {
        model.selectedGitFolders = [];
        model.gitFolders = model.gitFolders.map(el => {
            el.selected = false;
            return el;
        });
        model.onGitFoldersChange({
            folders: model.selectedGitFolders
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