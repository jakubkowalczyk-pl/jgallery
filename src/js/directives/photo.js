angular.module( 'jgallery' ).directive( 'jgalleryPhoto', ['jgallery.photo', function(Photo) {
   var photoId = 1;

   return {
       require: ['^jgalleryAlbum', '^jgallery'],
       link: function( scope, element, attrs, controllers ) {    
           var img;
           var photo = new Photo();
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
                   photo.thumb = thumb;
                   photo.setThumbSize(thumb.width, thumb.height);
                   albumController.addPhoto( photo );
                   img.onload = function() {
                       photo.element = img;
                       photo.setSize(img.width, img.height);
                       scope.$apply();
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
}] );