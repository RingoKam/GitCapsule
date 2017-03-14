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

    };

    model.$onChanges = function (obj) {
        model.capsules = this.capsuleNames && this.capsuleNames.length > 0 ? this.capsuleNames : [];
        model.capsules = this.capsuleNames.map((m) => {
            return {
                name: m.name,
                goto: () => model.changeState(m.name),
                selected: false
            }
        });
        model.capsules.unshift({
            "name": "All",
            "selected": true,
            "goto": () => model.changeState("All")
        });
    };

    model.changeState = function (capsule) {
        model.capsules = model.capsules.map(e => {
            e.selected = false;
            return e;
        });
        const index = _.findIndex(model.capsules, (o) => { return o.name === capsule});
        if(index >= 0)model.capsules[index].selected = true; 
        $state.go("home", {
            "capsulename": capsule !== "All" ? capsule : ""
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