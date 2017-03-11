export default {
    template: ($element, $attrs) => {
        return `<div class="heatmap"> </div>`
    },
    controller: heatmapController,
    controllerAs: "model",
    bindings: {
        Binding: '=',
    }
};

heatmapController.inject = ['$element'];

angular.element($window).bind('resize', function () {
    scope.$apply();
});

function heatmapController(element) {
    var ctrl = this;
    ctrl.$onInit = function () {};
    ctrl.$onChanges = function (changesObj) {};
    ctrl.$onDestory = function () {};
}