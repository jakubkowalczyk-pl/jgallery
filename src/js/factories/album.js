angular.module('jgallery').factory('jgallery.album', function(){
    
    var currentId = 1,
    
        /**
         * @constructor
         * @returns {Album}
         */
        Album = function(){
            /**
             * @type {Number}
             */
            this.id = currentId++;
            /**
             * @type {String}
             */
            this.title;
            /**
             * @type {Photo[]}
             */
            this.photos = [];
            /**
             * @type {Photo|undefined}
             */
            this.activePhoto;
            /**
             * @type {Boolean}
             */
            this.hasPrevPhoto = false;
            /**
             * @type {Boolean}
             */
            this.hasNextPhoto = false;
        };
    
    Album.prototype = {
        constructor: Album,
        
        /**
         * @param {Photo} photo
         */
        addPhoto: function(photo){
            this.photos.push(photo);
            this.checkNextAndPrevPhotos();
        },
        
        /**
         * @param {Photo} photo
         */
        setActivePhoto: function(photo){
            this.activePhoto = photo;
            this.checkNextAndPrevPhotos();
        },
            
        checkNextAndPrevPhotos: function(){
            var album = this;                

            angular.forEach( this.photos, function( photo, key ) {
                if ( album.activePhoto && photo.id === album.activePhoto.id ) {
                    album.hasPrevPhoto = key > 0;
                    album.hasNextPhoto = key < album.photos.length - 1;
                }
            } );
        }
    };
    
    return Album;
    
});