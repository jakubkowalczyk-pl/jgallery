angular.module( 'jgallery' ).directive( 'jgalleryPreview', ['$timeout', function( $timeout ) {        
     return {
         require: '^jgallery',
         link: function( scope, element, attrs ) {
             var options = scope.options;
             
             scope.preview = element[0].childNodes[0];
             
             scope.changeZoomSize = function() {
                if ( options.zoomSize === 'fit' ) {
                    options.zoomSize = 'fill';
                }
                else if ( options.zoomSize === 'fill' ) {
                    var photo = scope.activePhoto;
                    var preview = scope.preview;

                    if ( preview.clientWidth === photo.width || preview.clientHeight === photo.height ) {
                        options.zoomSize = 'fit';
                    }
                    else {
                        options.zoomSize = 'original';
                    }
                }
                else {
                    options.zoomSize = 'fit';
//                        scope.canZoomIn = true;
//                        scope.canZoomOut = false;
                }
            };
            
            scope.$watch( 'options.zoomSize', function( zoomSize ) {
                try {
                    scope.activePhoto.style;
                } catch( e ) {
                    scope.activePhoto = {
                        style: {}
                    };
                }
                if ( zoomSize === 'fill' ) {
                    scope.activePhoto.style['min-width'] = '100%';
                    scope.activePhoto.style['min-height'] = '100%';
                    scope.activePhoto.style['max-width'] = 'none';
                    scope.activePhoto.style['max-height'] = 'none';
                }
                else if ( zoomSize === 'fit' ) {
                    scope.activePhoto.style['min-width'] = '0';
                    scope.activePhoto.style['min-height'] = '0';
                    scope.activePhoto.style['max-width'] = '100%';
                    scope.activePhoto.style['max-height'] = '100%';                       
                }
                else {
                    scope.activePhoto.style['min-width'] = '0';
                    scope.activePhoto.style['min-height'] = '0';
                    scope.activePhoto.style['max-width'] = 'none';
                    scope.activePhoto.style['max-height'] = 'none';
                }
            } );
            scope.$watchGroup( ['activePhoto', 'activePhoto + activeAlbum.photos'], function() {
                angular.forEach( scope.albums, function( album ) {
                    angular.forEach( album.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id ) {
                            scope.hasPrevPhoto = key > 0;
                            scope.hasNextPhoto = key < album.photos.length - 1;
                        }
                    } );
                } );
            } );
            scope.$watch( 'thumbnailsIsHidden + thumbnailsIsFullScreen', function() {
                if ( ! scope.thumbnailsIsHidden || ! scope.thumbnailsIsFullScreen ) {
                    $timeout( function() {
                        scope.$apply();
                    } );
                }
            } );
         },
         templateUrl: '../../templates/preview.html'
     };
 }] );