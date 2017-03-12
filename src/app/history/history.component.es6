export default {
    template: require("./history.html"),
    controller: capsuleController,
    controllerAs: "model",
    bindings: {
        capsules: '<'
    }
};

capsuleController.inject = ['$state'];

function capsuleController($state, $rootScope, $scope) {
    var model = this;
    model.$onInit = function () {
        model.capsules = this.capsules;  
    };

    model.changeState = (id) => {
        $state.go("root.home.create", {
            "capsuleid": id
        }, {
            reload: true
        });
    }
}
