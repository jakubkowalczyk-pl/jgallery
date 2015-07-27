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
        };
    
    Album.prototype = {
        constructor: Album,
        
        /**
         * @param {Photo} photo
         */
        addPhoto: function(photo){
            this.photos.push(photo);
        }
    };
    
    return Album;
    
});