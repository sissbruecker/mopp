Description
-----------

A simple web client for Mopidy / MPD. The focus lies on a minimalist design and fast access to critical features (search / filter / play stuff).

Right now it can display your playlists and has a search function.

Screenshots:

<img src="https://github.com/sissbruecker/mopp/blob/master/screenshots/playlist.png">

<img src="https://github.com/sissbruecker/mopp/blob/master/screenshots/search.png">

The client uses a responsive design, but is mainly designed for mobile use.

Installation
------------

I use the client in combination with the fantastic MusicBox package for the Raspberry Pi (http://www.woutervanwijk.nl/pimusicbox/) by @woutervanwijk.

First install the MusicBox image on the SD card, then start up the Pi.

To overwrite the default MusicBox webclient:

    git clone https://github.com/sissbruecker/mopp <repo-folder>

    scp -r <repo-folder> root@<music-box-ip>:/opt/mopp

    ssh root@<music-box-ip>

    cd /opt

    mv webclient webclient_backup

    mv mopp webclient

    shutdown -r now