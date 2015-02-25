angular.module( 'jgallery' ).directive( 'jgalleryPhoto', function() {
   var photoId = 1;

   return {
       scope: {
       },
       require: ['^jgalleryAlbum', '^jgallery'],
       link: function( scope, element, attrs, controllers ) {    
           var img;
           var photo = {};
           var albumController = controllers[0];
           var galleryController = controllers[1];

           if ( element.attr( 'href' ) ) {
               img = angular.element( element ).find( 'img' );
               photo.href = element.attr( 'href' );
               photo.target = element.attr( 'target' );
           }
           else if ( element.attr( 'src' ) ) {
               img = element;                  
           }
           photo.src = img.attr( 'src' );
           photo.title = img.attr( 'alt' );
           photo.bgColor = img.attr( 'data-jgallery-bg-color' );
           photo.textColor = img.attr( 'data-jgallery-text-color' );

           ( function() {
               var thumb = new Image();
               var img = new Image();

               thumb.onload = function() {
                   photo.thumbWidth = thumb.width;
                   photo.thumbHeight = thumb.height;
                   photo.id = photoId++;
                   albumController.addPhoto( photo );
                   img.onload = function() {
                       photo.width = img.width;
                       photo.height = img.height;
                   };
                   img.src = photo.href;
               };
               thumb.src = photo.src;
//                    function preloadImages(srcs, callback) {
//                        var img, imgs = [];
//                        var remaining = srcs.length;
//                        for (var i = 0; i < srcs.length; i++) {
//                            img = new Image();
//                            img.onload = function() {
//                                --remaining;
//                                if (remaining <= 0) {
//                                    callback(imgs);
//                                }
//                            };
//                            img.src = srcs[i];
//                            imgs.push(img);
//                        }
//                    }
//                    
//                    preloadImages( [photo.src, photo.href], function( images ) {
//                        photo.thumbWidth = images[0].width;
//                        photo.thumbHeight = images[0].height;
//                        photo.width = images[1].width;
//                        photo.height = images[1].height;
//                        albumController.addPhoto( photo );
//                    } );
           } )();

           angular.element( element ).bind( 'click', function( $event ) {
               $event.preventDefault();
               galleryController.showPhoto( photo );
           } );
       }
   };
} );