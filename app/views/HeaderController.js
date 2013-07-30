/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 28.07.13
 * Time: 11:48
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').controller('HeaderController', function ($scope, mopidy) {

    $scope.searchText = '';

    $scope.search = function () {

        if (!$scope.searchText || !$scope.searchText.length) return;

        mopidy.search($scope.searchText);
    };

});