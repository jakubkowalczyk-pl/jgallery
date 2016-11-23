module.exports = function( grunt ) {
    var banner = '/*!\n' +
                    '* <%= pkg.name %> <%= pkg.version %>\n' + 
                    '* http://jgallery.jakubkowalczyk.pl/\n' +
                    '*\n' +
                    '* Released under the MIT license\n' +
                    '*\n' +
                    '* Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '*/\n';
                    
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        less: {
            dev: {
                options: {
                    //paths: ["assets/css"]
                },
                files: {
                    "dist/css/jgallery.css": "src/less/jgallery.less"
                }
            },
            min: {
                options: {
                    //paths: ["assets/css"],
                    cleancss: true
                },
                files: {
                    "dist/css/jgallery.min.css": "src/less/jgallery.less"
                }
            }
        },
        concat: ( function() {
            var src = [
                'src/js/start.frag.js',
                'src/js/var/defaults.js',
                'src/js/var/defaultsFullScreenMode.js',
                'src/js/var/defaultsSliderMode.js',
                'src/js/var/requiredFullScreenMode.js',
                'src/js/var/requiredSliderMode.js',
                'src/js/var/transitions.js',
                'src/js/var/transitionsAsArray.js',
                'src/js/var/transitionsBackward.js',
                'src/js/jqueryExtensions/outerHtml.js',
                'src/js/jqueryExtensions/overlay.js',
                'src/js/jqueryExtensions/jLoader.js',
                'src/js/functions/historyPushState.js',
                'src/js/functions/isIE.js',
                'src/js/functions/isIE8AndOlder.js',
                'src/js/functions/refreshHTMLClasses.js',
                'src/js/prototype/advancedAnimation.js',
                'src/js/prototype/iconChangeAlbum.js',
                'src/js/prototype/progress.js',
                'src/js/prototype/thumb.js',
                'src/js/prototype/thumbnails.js',
                'src/js/prototype/thumbnailsGenerator.js',
                'src/js/prototype/zoom.js',
                'src/js/prototype/jgallery.js',
                'src/js/jgallery.js',
                'src/js/end.frag.js'
            ];
            
            return {
                options: {
                    banner: banner
                },
                dev: {
                    src: src,
                    dest: 'dist/js/jgallery.js'
                }
            };
        } )(),
        uglify: {
            jgallery: {
                options: {
                    banner: banner
                },
                files: {
                    'dist/js/jgallery.min.js': ['dist/js/jgallery.js']
                }
            }
        },
        watch: {
            css: {
                files: ['src/**/*.less'],
                tasks: ['build-css']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['build-js']
            }
        }
    } );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.registerTask( 'build-js', ['concat:dev','uglify:jgallery'] );
    grunt.registerTask( 'build-css', ['less:dev','less:min'] );
    grunt.registerTask( 'default', ['build-js', 'build-css'] );
};