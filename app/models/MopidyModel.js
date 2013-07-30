/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 22.07.13
 * Time: 17:19
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').service('mopidyModel', function($rootScope) {

    var scope = $rootScope.$new();

    scope.currentTrack = null;
    scope.playbackState = null;
    scope.volume = 0;

    return scope;
});