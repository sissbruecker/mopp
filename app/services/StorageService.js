/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 25.08.13
 * Time: 13:07
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').service('storage', function () {

    var RECENT_PLAYLIST_KEY = 'mopp.playlist.recent';

    var MAX_RECENT_PLAYLIST_LENGTH = 5;

    this.getRecentPlaylists = function () {
        return $.jStorage.get(RECENT_PLAYLIST_KEY) || [];
    };

    this.addRecentPlaylist = function (playlist) {

        // Get recent items or create new array
        var recentPlayLists = $.jStorage.get(RECENT_PLAYLIST_KEY) || [];

        // Only add if the playlist is not already in the recent list
        var playlistExists = false;

        $.each(recentPlayLists, function (i, list) {
            if (list.uri == playlist.uri) playlistExists = true;
        });

        if (playlistExists) return;

        // Create new item to store
        var newItem = {
            name: playlist.name,
            uri: playlist.uri,
            trackCount: playlist.tracks.length,
            timestamp: new Date()
        };

        // Add at top of the array
        recentPlayLists.unshift(newItem);

        // Remove items if we are above limit
        while (recentPlayLists.length > MAX_RECENT_PLAYLIST_LENGTH) {
            recentPlayLists.pop();
        }

        // Store modified array
        $.jStorage.set(RECENT_PLAYLIST_KEY, recentPlayLists);
    };

});