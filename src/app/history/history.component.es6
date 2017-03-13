const capsuleNameStore = require('../library/capsule_name_store');
const remote = require('electron').remote

export default {
    template: require("./history.html"),
    controller: historyController,
    controllerAs: "model",
    bindings: {
        capsuleNames: '<'
    }
};

historyController.inject = ['$state'];

function historyController($state, $rootScope, $scope, $mdDialog) {

    var model = this;
    
    model.$onInit = function () {
        model.capsuleNames = this.capsuleNames;
    };

    model.changeState = function (capsuleName) {
        // model.capsuleNames = model.capsuleNames.map(e => {
        //     e.selected = false;
        //     return e;
        // })
        $state.go("home", {
            "capsulename": capsuleName ? capsuleName.name : "" 
        });
    }

    model.PromptNewCapsule = (ev) => {

        var confirm = $mdDialog.prompt()
            .title('New Capsule Collection')
            // .textContent('Capsule holds record of multiple git repos.')
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
                promise.then(remote.getCurrentWindow().reload());
            }
        });
    }
}