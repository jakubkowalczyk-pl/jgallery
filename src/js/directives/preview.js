angular.module( 'jgallery' ).directive( 'jgalleryPreview', ['$timeout', function( $timeout ) {        
     return {
         require: '^jgallery',
         link: function( scope, element, attrs ) {
             var options = scope.options;
             var preview = scope.preview = element[0].childNodes[0];
             
             scope.parseInt = parseInt;
             
             scope.changeZoomSize = function() {
                var photo = scope.activePhoto;
                
                if ( options.zoomSize === 'fit' ) {
                    options.zoomSize = 'fill';
                }
                else if ( options.zoomSize === 'fill' ) {
                    if ( preview.clientWidth === photo.width || preview.clientHeight === photo.height ) {
                        options.zoomSize = 'fit';
                    }
                    else {
                        options.zoomSize = 'original';
                    }
                }
                else {
                    options.zoomSize = 'fit';
                }
            };
            
            scope.startDragCallback = function() {
                scope.draggingInProgress = true;
                scope.$apply();
            };
            
            scope.stopDragCallback = function() {
                scope.draggingInProgress = false;
                scope.$apply();
            };
            
            scope.$watchGroup( ['options.zoomSize', 'activePhoto.width', 'activePhoto.height', 'preview.clientWidth', 'preview.clientHeight'], function() {
                var zoomSize = scope.options.zoomSize;
                var photo = scope.activePhoto;
                
                if ( ! photo ) {
                    return;
                }
                if ( zoomSize === 'fill' ) {
                    if ( preview.clientWidth < photo.width && preview.clientHeight < photo.height ) {
                        scope.canZoomIn = true;
                        scope.canZoomOut = false;
                        scope.draggableNavIsVisible = false;
                    }
                    else {
                        scope.canZoomIn = false;
                        scope.canZoomOut = true;
                        scope.draggableNavIsVisible = false;
                    }
                    scope.canDrag = true;
                }
                else if ( zoomSize === 'original' ) {
                    if ( preview.clientWidth < photo.width || preview.clientHeight < photo.height ) {
                        scope.canZoomIn = false;
                        scope.canZoomOut = true;
                        scope.canDrag = true;
                        scope.draggableNavIsVisible = true;
                    }
                    else {
                        scope.canZoomIn = true;
                        scope.canZoomOut = false;
                        scope.canDrag = false;
                        scope.draggableNavIsVisible = false;
                    }
                }
                else {
                    scope.canZoomIn = true;
                    scope.canZoomOut = false;
                    scope.canDrag = false;
                    scope.draggableNavIsVisible = false;
                }
            } );
            
            scope.$watchGroup( ['options.zoomSize', 'activePhoto.width', 'activePhoto.height', 'preview.clientWidth', 'preview.clientHeight'], function() {
                var zoomSize = scope.options.zoomSize;
                var photo;
                var isVertical;
                
                if ( ! scope.activePhoto ) {
                    scope.activePhoto = { style: {} };
                }
                else if ( ! scope.activePhoto.style ) {
                    scope.activePhoto.style = {};
                }
                photo = scope.activePhoto;
                isVertical = ( photo.width / photo.height ) < ( preview.clientWidth / preview.clientHeight );
                if ( zoomSize === 'fill' ) {
                    if ( isVertical ) {
                        angular.extend( photo.style, {
                            width: '100%',
                            height: 'auto',
                            'max-width': 'none',
                            'max-height': 'none'                            
                        } );
                    }
                    else {
                        angular.extend( photo.style, {
                            width: 'auto',
                            height: '100%',
                            'max-width': 'none',
                            'max-height': 'none'
                        } );                        
                    }
                }
                else if ( zoomSize === 'fit' ) {
                    if ( isVertical ) {
                        angular.extend( photo.style, {
                            width: 'auto',
                            height: '100%',
                            'max-width': '100%',
                            'max-height': 'none'
                        } );
                    }
                    else {
                        angular.extend( photo.style, {
                            width: '100%',
                            height: 'auto',
                            'max-width': 'none',
                            'max-height': '100%'
                        } );                        
                    }
                }
                else {
                    angular.extend( photo.style, {
                        width: 'auto',
                        height: 'auto',
                        'max-width': 'none',
                        'max-height': 'none'
                    } );
                }
                angular.extend( photo.style, {
                    'margin-top': '0',
                    'margin-left': '0'
                } );
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