/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 18.08.13
 * Time: 20:02
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (grunt) {

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    grunt.initConfig({

        watch: {
            options: {
                livereload: true
            },
            all: {
                files: [
                    'app/**/*.js',
                    'lib/**/*.js',
                    'app/**/*.html',
                    'css/**/*.css'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:9000'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-open");

    grunt.registerTask('server', ['connect', 'open', 'watch']);
};