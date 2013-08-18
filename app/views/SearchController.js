/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 27.07.13
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').controller('SearchController', function ($scope, bind, mopidy, mopidyModel) {

    // Reduced number of results, so we don't display too many items initially
    var reducedAlbumCount = 5;
    var reducedArtistCount = 5;
    var reducedTrackCount = 20;

    $scope.searchText = '';

    $scope.hasMoreAlbums = false;
    $scope.hasMoreArtists = false;
    $scope.hasMoreTracks = false;

    $scope.showMoreAlbums = false;
    $scope.showMoreArtists = false;
    $scope.showMoreTracks = false;

    $scope.isLoading = false;

    // Bind/Watch search result
    bind(mopidyModel, 'searchResult').to($scope).notify(function(results) {

        $scope.isLoading = false;

        if(!results) {
            return;
        }

        // Result actually contains multiple set for each media source (e.g. Spotify, file system, LastFM), so first we collate the result sets into one
        var albums = [],
            tracks = [],
            artists = [];

        $.each(results, function (i, result) {

            if (result.albums)
                albums = albums.concat(result.albums);

            if (result.artists)
                artists = artists.concat(result.artists);

            if (result.tracks)
                tracks = tracks.concat(result.tracks);
        });

        // Store process result in scope
        $scope.hasMoreAlbums = albums.length > reducedAlbumCount;
        $scope.hasMoreArtists = artists.length > reducedArtistCount;
        $scope.hasMoreTracks = tracks.length > reducedTrackCount;

        $scope.reducedAlbums = $scope.hasMoreAlbums ? albums.slice(0, reducedAlbumCount) : albums;
        $scope.moreAlbums = $scope.hasMoreAlbums ? albums.slice(reducedAlbumCount, albums.length - 1) : null;

        $scope.reducedArtists = $scope.hasMoreArtists ? artists.slice(0, reducedArtistCount) : artists;
        $scope.moreArtists = $scope.hasMoreArtists ? artists.slice(reducedArtistCount, artists.length - 1) : null;

        $scope.reducedTracks = $scope.hasMoreTracks ? tracks.slice(0, reducedTrackCount) : tracks;
        $scope.moreTracks = $scope.hasMoreTracks ? tracks.slice(reducedTrackCount, tracks.length - 1) : null;

    });

    $scope.search = function () {

        if (!$scope.searchText || !$scope.searchText.length) return;

        $scope.isLoading = true;

        mopidy.search($scope.searchText);
    };

    $scope.toggleMoreAlbums = function () {
        $scope.showMoreAlbums = !$scope.showMoreAlbums;
    };

    $scope.toggleMoreArtists = function () {
        $scope.showMoreArtists = !$scope.showMoreArtists;
    };

    $scope.toggleMoreTracks = function () {
        $scope.showMoreTracks = !$scope.showMoreTracks;
    };

    $scope.play = function (uri) {
        mopidy.playUri(uri);
    };

});