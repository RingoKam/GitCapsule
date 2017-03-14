export default {
    template: require("./error.html"),
    controller: ControllerController,
    controllerAs: "model",
    bindings: {
        error: '<'
    }
}

ControllerController.inject = ['$state'];

function ControllerController($state) {
    var model = this;
    model.$onInit = function () {
        this.error;
    };

    model.goHome = () => {
        $state.go("home")
    }
}