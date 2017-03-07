window.$ = window.jQuery = require('jquery');
require("jstree");  

var app = angular.module("ngtree", [])

app.directive("ngtree", () => {
    return {
        restrict: "A",
        link: (scope, element, attrs) => {
            console.log({scope, element, attrs})
            if(scope.model.jstreeObj){
                
            } 
        }
    }
});

