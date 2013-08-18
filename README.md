Description
-----------

A simple web client for Mopidy / MPD.

Right now it can display your playlists and has a search function.

Installation
------------

I use the client in combination with the fantastic MusicBox package for the Raspberry Pi (http://www.woutervanwijk.nl/pimusicbox/) by @woutervanwijk.

First install the MusicBox image on the SD card, then start up the Pi.

To overwrite the default MusicBox webclient:

    git clone https://github.com/sissbruecker/mopp <download-folder>

    scp -r <download-folder> root@<music-box-ip>:/opt/mopp

    ssh root@<music-box-ip>

    cd /opt

    mv webclient webclient_backup

    mv mopp webclient

    shutdown -r now