/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 21.07.13
 * Time: 19:12
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').service('mopidy', function ($rootScope, $q, $timeout, mopidyModel) {

    // Initialize mopidy client
    var mopidy = new Mopidy({
        webSocketUrl: "ws://192.168.178.27/mopidy/ws/"
    });

    // Log all events
    mopidy.on(function(message) {
        console.log(message);
    });

    // Update model on certain events
    mopidy.on('state:online', function () {
        this.getCurrentTrack();
        this.getCurrentState();
        this.getCurrentVolume();
    }.bind(this));

    mopidy.on('event:trackPlaybackStarted', function () {
        this.getCurrentTrack();
    }.bind(this));

    mopidy.on('event:playbackStateChanged', function (event) {
        mopidyModel.playbackState = event.new_state;
    }.bind(this));

    mopidy.on('event:volumeChanged', function (event) {
        mopidyModel.volume = event.volume;
    }.bind(this));

    // Mopidy API

    // region Playback
    this.getCurrentTrack = function () {

        var d = $q.defer();

        mopidy.playback.getCurrentTrack().then(function (track) {
            $timeout(function () {
                mopidyModel.currentTrack = track;
                d.resolve(track);
            });
        });

        return d.promise;
    };

    this.getCurrentState = function () {

        var d = $q.defer();

        mopidy.playback.getState().then(function (state) {
            $timeout(function () {
                mopidyModel.playbackState = state;
                d.resolve(state);
            });
        });

        return d.promise;
    };

    this.getCurrentVolume = function () {

        var d = $q.defer();

        mopidy.playback.getVolume().then(function (volume) {
            $timeout(function () {
                mopidyModel.volume = volume;
                d.resolve(volume);
            });
        });

        return d.promise;
    };

    this.play = function (track) {

        var d = $q.defer();

        mopidy.playback.play().then(function () {
            $timeout(function () {
                d.resolve();
            });
        }, handleError);

        return d.promise;
    };

    this.pause = function () {

        var d = $q.defer();

        mopidy.playback.pause().then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    this.stop = function () {

        var d = $q.defer();

        mopidy.playback.stop().then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    this.next = function () {

        var d = $q.defer();

        mopidy.playback.next().then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    this.previous = function () {

        var d = $q.defer();

        mopidy.playback.previous().then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    this.increaseVolume = function() {

        var d = $q.defer();

        var volume = Math.min(mopidyModel.volume + 5, 100);

        mopidy.playback.setVolume(volume).then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    this.decreaseVolume = function() {

        var d = $q.defer();

        var volume = Math.max(mopidyModel.volume - 5, 0);

        mopidy.playback.setVolume(volume).then(function () {
            $timeout(function () {
                d.resolve();
            });
        });

        return d.promise;
    };

    // endregion

    // region Track list
    this.clear = function () {

        var d = $q.defer();

        mopidy.tracklist.clear().then(function () {
            $timeout(function () {
                d.resolve();
            });
        }, handleError);

        return d.promise;
    };

    this.addTracks = function (tracks) {

        var d = $q.defer();

        mopidy.tracklist.add(tracks).then(function (track) {
            $timeout(function () {
                d.resolve(track);
            });
        }, handleError);

        return d.promise;
    };

    // endregion

    // region Library
    this.search = function (searchText) {

        var d = $q.defer();
        var query = {};

        query['any'] = searchText;

        mopidy.library.search(query).then(function (searchResult) {
            $timeout(function () {
                mopidyModel.searchResult = searchResult;
                d.resolve(searchResult);
            });
        }, handleError);

        return d.promise;
    };

    this.lookup = function (uri) {

        var d = $q.defer();

        mopidy.library.lookup(uri).then(function (tracks) {
            $timeout(function () {
                d.resolve(tracks);
            });
        }, handleError);

        return d.promise;
    };

    // endregion

    var handleError = function(error) {
        console.error(error.message);

        if(error.event)
            console.error(JSON.stringify(error.event));
        if(error.closeEvent)
            console.error(JSON.stringify(error.closeEvent));
    }
});