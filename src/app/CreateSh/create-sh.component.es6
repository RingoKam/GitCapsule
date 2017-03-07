const electron = window.require('electron').remote;
const createSh = require('../library/create_sh');
const fs = require('fs');
const notifier = require('electron-notifications');
const dataStore = require('../library/datastore');
const moment = require('moment');
const capsuleNameStore = require('../library/capsule_name_store');
const remote = require('electron').remote

export default {
    template: require("./create-sh.html"),
    //templateUrl: 'templateUrl',
    controller: createShController,
    controllerAs: "model",
    bindings: {
        gitFolders: '<',
    }
}
// createShController.inject = [''];

function createShController($mdDialog) {
    var model = this;

    model.$onInit = function () {
        // capsuleNameStore.find({}).then((data) => {
        //     model.capsuleNames = data.map(m => m.name);
        // });
    };
    model.$onChanges = function (changesObj) {
        if (this.gitFolders)
            model.gitFolders = this.gitFolders;
    };
    model.$onDestory = function () {};

    model.SaveScriptLocation = function () {
        electron.dialog.showOpenDialog({
            title: "Select output location",
            properties: ["openDirectory"]
        }, (filePath) => {
            this.outputLocation = filePath;
        })
    }

    model.exportSh = function () {
        if (model.gitFolders && model.gitFolders.length > 0 && model.outputLocation && model.name) {
            
            model.gitFolders = model.gitFolders.map((el) => {
                delete el['$$hashKey'];
                delete el['selected'];
                return el;
            });

            var baseCode = fs.readFileSync("./src/Assets/bashbase.sh");
            
            let {
                fileName,
                codeFile
            } = createSh.createScript(model.outputLocation, model.gitFolders, model.name, model.comment);
            
            const writer = fs.createWriteStream(fileName);

            writer.write(baseCode + codeFile);
            writer.end("Summary");
            writer.on('finish', () => {
                let record = {
                    capsule: model.capsuleName ? model.capsuleName : "Other",
                    name: model.name,
                    gitFiles: model.gitFolders,
                    comment: model.comment,
                    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a')
                }
                var promise = dataStore.insertdb(record);
                let myNotification = new Notification('Success!', {
                    body: `${model.name} created in ${model.outputLocation}`
                });
                promise.then(remote.getCurrentWindow().reload());
            });
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('Please fill out required field.')
                .ariaLabel('Error')
                .ok('Got it!')
            );
        }
    }
}