/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 28.07.13
 * Time: 10:23
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').directive('ngEscape', function() {

    return function(scope, element, attrs) {

        element.on("keydown", function(event) {
            if(event.which === 27) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEscape);
                });

                event.preventDefault();
            }
        });
    };
});