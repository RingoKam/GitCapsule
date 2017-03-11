const calendarHeatmap = require("../library/calendarHeatmap/calendar-heatmap.js");

export {
    heatmap
}

heatmap.inject = ['$window'];

function heatmap($window) {

    var directive = {
        link: link,
        restrict: 'A',
        scope: {
            chartData: '=',
        }
    };
    return directive;

    function link(scope, element, attrs) {
        var heatmap = calendarHeatmap.calendarHeatmap()
            .data(scope.chartData)
            .selector(element[0])
            .tooltipEnabled(true)
            .colorRange(['#f4f7f7', '#79a8a9'])
            .onClick(function (data) {
                console.log('data', data);
            });
        heatmap();
    }
}