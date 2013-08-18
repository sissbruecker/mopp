/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 28.07.13
 * Time: 10:00
 * To change this template use File | Settings | File Templates.
 */

// Create angular module
angular.module('app', []).config(function ($routeProvider) {

    $routeProvider
        .when('/search', { templateUrl: 'app/views/Search.html' })
        .when('/playlists', { templateUrl: 'app/views/Playlists.html' })
        .otherwise({ redirectTo: '/playlists'});
});