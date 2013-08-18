/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 18.08.13
 * Time: 13:09
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').controller('PlaylistsController', function ($scope, bind, mopidy, mopidyModel) {

    $scope.filterText = '';

    $scope.isLoading = true;

    var SORT_INDEX = 'sort_index';
    var SORT_NAME = 'sort_name';

    var compareByIndex = function(item1, item2) {
        return item1.index > item2.index ? 1 : (item1.index < item2.index ? -1 : 0);
    };

    var compareByName = function(item1, item2) {
        return item1.name.toLowerCase() > item2.name.toLowerCase() ? 1 : (item1.name.toLowerCase() < item2.name.toLowerCase() ? -1 : 0);
    };

    var sorts = [
        // Index - Ascending
        {
            compare: function(item1, item2) {
                return compareByIndex(item1, item2);
            },
            icon: 'icon-sort-by-attributes'
        },
        // Index - Descending
        {
            compare: function(item1, item2) {
                return compareByIndex(item1, item2) * -1;
            },
            icon: 'icon-sort-by-attributes-alt'
        },
        // Alphabetically - Ascending
        {
            compare: function(item1, item2) {
                return compareByName(item1, item2);
            },
            icon: 'icon-sort-by-alphabet'
        },
        // Alphabetically - Descending
        {
            compare: function(item1, item2) {
                return compareByName(item1, item2) * -1;
            },
            icon: 'icon-sort-by-alphabet-alt'
        }
    ];

    $scope.sort = sorts[0];

    bind(mopidyModel, 'playlists').to($scope).notify(function () {
        refreshIndex();
        refreshVisibility();
        refreshPlayingState();
        refreshSort();

        if ($scope.playlists)
            $scope.isLoading = false;
    });

    bind(mopidyModel, 'currentUri').to($scope).notify(function () {
        refreshPlayingState();
    });

    $scope.$watch('filterText', function () {
        refreshVisibility();
    });

    var refreshIndex = function () {

        if (!$scope.playlists) return;

        $.each($scope.playlists, function (i, playlist) {

            playlist.index = i;
        });
    };

    var refreshPlayingState = function () {

        if (!$scope.playlists) return;

        $.each($scope.playlists, function (i, playlist) {

            playlist.playing = mopidyModel.currentUri == playlist.uri;
        });
    };

    var refreshVisibility = function () {

        if (!$scope.playlists) return;

        var filter = $scope.filterText.toLowerCase();

        $.each($scope.playlists, function (i, playlist) {

            playlist.visible = true;

            if (filter && filter.length > 0)
                playlist.visible = playlist.visible && (playlist.name.toLowerCase().indexOf(filter) >= 0);
        });
    };

    var refreshSort = function () {

        if (!$scope.playlists) return;

        $scope.playlists.sort($scope.sort.compare);
    };

    $scope.toggleSort = function() {

        var index = sorts.indexOf($scope.sort);

        index = (index + 1) % (sorts.length);

        $scope.sort = sorts[index];

        refreshSort();
    };

    $scope.play = function (uri) {
        mopidy.playUri(uri);
    };

});