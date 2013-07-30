/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 21.07.13
 * Time: 20:14
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').controller('FooterController', function($scope, bind, mopidy, mopidyModel) {

    // Bind current track
    bind(mopidyModel, 'currentTrack').to($scope);
    bind(mopidyModel, 'playbackState').to($scope);

    $scope.play = function() {
        mopidy.play();
    };

    $scope.pause = function() {
        mopidy.pause();
    };

    $scope.stop = function() {
        mopidy.stop();
    };

    $scope.next = function() {
        mopidy.next();
    };

    $scope.previous = function() {
        mopidy.previous();
    };

    $scope.increaseVolume = function() {
        mopidy.increaseVolume();
    };

    $scope.decreaseVolume = function() {
        mopidy.decreaseVolume();
    };
});