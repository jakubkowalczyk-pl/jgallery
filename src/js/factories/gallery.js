angular.module('jgallery').factory('jgallery.gallery', [
    '$filter',
    'jgallery.defaults',
    'jgallery.defaultsFullScreenMode',
    'jgallery.requiredFullScreenMode',
    'jgallery.defaultsSliderMode',
    'jgallery.requiredSliderMode',
    function($filter, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode){

        var currentId = 1,

            /**
             * @constructor
             * @returns {Gallery}
             */
            Gallery = function(){
                /**
                 * @type {Number}
                 */
                this.id = currentId++;
                /**
                 * @type {Boolean}
                 */
                this.isVisible = false;
                /**
                 * @type {Album[]}
                 */
                this.albums = [];
                /**
                 * @type {Album|undefined}
                 */
                this.activeAlbum;
                /**
                 * @type {Object}
                 */
                this.options = {};
            };

        Gallery.prototype = {
            constructor: Gallery,

            /**
             * @param {Album} album
             */
            addAlbum: function(album){
                if(!album.title){
                    album.title = 'Album ' + album.id;
                }
                this.albums.push(album);
            },

            /**
             * @param {Number} albumId
             */
            setAlbumAsActive: function( albumId ) {
                this.activeAlbum = $filter( 'filter' )( this.albums, { id: albumId } )[0];
                this.showPhoto( this.activeAlbum.photos[0] );
            },

            /**
             * @param {Photo} photo
             */
            showPhoto: function( photo ) {
                this.activeAlbum.setActivePhoto(photo);
                this.isVisible = true;
            },

            /**
             * @param {Object} options
             */
            setOptions: function(options) {
                this.options = angular.copy( defaults );
                if ( options.mode === 'full-screen' ) {
                    angular.extend( this.options, defaultsFullScreenMode, options, requiredFullScreenMode );
                }
                else if ( options.mode === 'slider' ) {
                    angular.extend( this.options, defaultsSliderMode, options, requiredSliderMode );
                }
                else {
                    angular.extend( this.options, options );
                }           
            }
        };

        return Gallery;
    }
]);