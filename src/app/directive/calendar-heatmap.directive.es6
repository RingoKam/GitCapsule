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
            filter: '='
        }
    };
    return directive;

    function link(scope, element, attrs) {
        var heatmap = calendarHeatmap.calendarHeatmap()
            .data(scope.chartData)
            .selector(element[0])
            .tooltipEnabled(true)
            .colorRange(['#FFF5EE', '#FF6700'])
            .onClick(function (data) {
                scope.filter = moment(data.date).format("YYYY-MM-DD")
                scope.$apply(); 
            });
        heatmap();
    }
}