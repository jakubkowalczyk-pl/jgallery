( function( document, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode ) {
    "use strict";
    var jGalleryId = 1;
    
    angular.module( 'jgallery' ).directive( 'jgallery', ['$timeout', '$filter', function( $timeout, $filter ) {        
        return {
            transclude: true,
            scope: true,
            link: function( scope, element, attrs ) {
                var id = scope.id = jGalleryId++;
                var options;
                window.scope = scope;
        
                var overrideOptions = function() {
                    scope.options = options = angular.copy( defaults );
                    try {
                        var userOptions = angular.fromJson( attrs['jgallery'] );

                        if ( userOptions.mode === 'full-screen' ) {
                            angular.extend( options, defaultsFullScreenMode, userOptions, requiredFullScreenMode );
                        }
                        else if ( userOptions.mode === 'slider' ) {
                            angular.extend( options, defaultsSliderMode, userOptions, requiredSliderMode );
                        }
                        else {
                            angular.extend( options, userOptions );
                        }                    
                    } catch( e ) {};
                };
                
                var issetActivePhoto = function() {
                    return scope.activePhoto && scope.activePhoto.id;
                };
                
                scope.setAlbumAsActive = function( albumId ) {
                    scope.activeAlbum = $filter( 'filter' )( scope.albums, { id: albumId } )[0];
                    scope.showPhoto( scope.activeAlbum.photos[0] );
                };
                
                scope.showPhoto = function( photo ) {
                    scope.activePhoto = angular.extend( {}, scope.activePhoto, photo );
                    scope.isVisible = true;
                };
                
                scope.goToPrevPhoto = function() {
                    var prevKey;
                    
                    angular.forEach( scope.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id && scope.activeAlbum.photos[key-1] ) {
                            prevKey = key - 1;
                        }
                    } );
                    if ( angular.isDefined( prevKey ) ) {
                        scope.showPhoto( scope.activeAlbum.photos[prevKey] );
                    }
                };
                
                scope.goToNextPhoto = function() {
                    var nextKey;
                    
                    angular.forEach( scope.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id && scope.activeAlbum.photos[key+1] ) {
                            nextKey = key + 1;
                        }
                    } );
                    if ( nextKey ) {
                        scope.showPhoto( scope.activeAlbum.photos[nextKey] );
                    }
                };
                
                angular.element( element ).attr( 'data-jgallery-id', id );
                overrideOptions();
                if ( options.autostart ) {
                    scope.isVisible = true;
                }
                scope.$watch( 'albums', function( albums ) {
                    scope.hasManyAlbums = albums.length > 1;
                } );
                scope.$watch( 'options.autostartAtAlbum + albums', function() {
                    if ( ! scope.activeAlbum ) {
                        scope.activeAlbum = scope.albums[options.autostartAtAlbum - 1];
                    }
                } );
                scope.$watch( 'options.autostartAtImage + activeAlbum.photos', function() {
                    if ( ! issetActivePhoto() && scope.activeAlbum.photos[options.autostartAtImage - 1] ) {
                        scope.showPhoto( scope.activeAlbum.photos[options.autostartAtImage - 1] );
                    }
                } );
                scope.$watch( 'options.mode', function( mode ) {
                    scope.isSlider = mode === 'slider';
                } );
//                attrs.$observe( 'jgallery', function() {
//                    overrideOptions();
//                } );
                angular.element( document.getElementsByTagName( 'head' ) ).append( '<style type="text/css" class="colours" data-jgallery-id="' + id + '"></style>' );
            },
            controller: ['$scope', function( $scope ) {
                var albums = $scope.albums = [];
                    
                this.addAlbum = function( album ) {
                    if ( ! album.title ) {
                        album.title = 'Album ' + album.id;
                    }
                    albums.push( album );
                };
                
                this.showPhoto = function( photo ) {
                    $scope.showPhoto( photo );
                    $timeout( function() {
                        $scope.$apply();
                    } );
                };
            }],
            templateUrl: '../../templates/jgallery.html'
        };
    }] );
} )( document, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode );