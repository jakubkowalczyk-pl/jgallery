angular.module('jgallery').factory('jgallery.albums', function(){
    var Albums = function(){
        /**
         * @type {Array}
         */
        this.albums = [];
    };
    
    Albums.prototype = {
        constructor: Albums,
        
        /**
         * @param {Album} album
         */
        add: function(album){
            if(!album.title){
                album.title = 'Album ' + album.id;
            }
            this.albums.push(album);
        }
    };
    
    return Albums;
});