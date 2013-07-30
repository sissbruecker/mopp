/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 28.07.13
 * Time: 10:23
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').directive('ngEnter', function() {

    return function(scope, element, attrs) {

        element.on("keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});