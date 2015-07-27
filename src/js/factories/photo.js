angular.module('jgallery').factory('jgallery.photo', function(){
    
    var currentId = 1,
    
        /**
         * @constructor
         * @returns {Photo}
         */
        Photo = function(){
            /**
             * @type {Number}
             */
            this.id = currentId++;
            /**
             * Href attribute of anchor containing this photo
             * @type {String}
             */
            this.href = '';
            /**
             * Target attribute of anchor containing this photo
             * @type {String}
             */
            this.target = '';
            /**
             * Source path
             * @type {String}
             */
            this.src = '';
            /**
             * @type {String}
             */
            this.bgColor = '';
            /**
             * @type {String}
             */
            this.textColor = '';
            /**
             * Large photo
             * @type {HTMLImageElement}
             */
            this.element = '';
            /**
             * @type {Number}
             */
            this.width = 0;
            /**
             * @type {Number}
             */
            this.height = 0;
            /**
             * Thumbnail
             * @type {HTMLImageElement}
             */
            this.thumb = '';
            /**
             * @type {Number}
             */
            this.thumbWidth = 0;
            /**
             * @type {Number}
             */
            this.thumbHeight = 0;
            /**
             * @type {Boolean}
             */
            this.thumbIsVertical = false;
        };
    
    Photo.prototype = {
        constructor: Photo,
        
        /**
         * @param {Number} width
         * @param {Number} height
         */
        setSize: function(width, height){
            this.width = width;
            this.height = height;
            this.isVertical = this.width < this.height;
        },
        
        /**
         * @param {Number} width
         * @param {Number} height
         */
        setThumbSize: function(width, height){
            this.thumbWidth = width;
            this.thumbHeight = height;
            this.thumbIsVertical = this.thumbWidth < this.thumbHeight;
        }
    };
    
    return Photo;
    
});