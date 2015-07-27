angular.module( 'jgallery' ).directive( 'jgallery', [
    '$timeout',
    '$document',
    '$window',
    'jgallery.gallery',
    function( $timeout, $document, $window, Gallery ) {
        return {
            transclude: true,
            scope: true,
            link: function( scope, element, attrs ) {
                var issetActivePhoto = function() {
                    return scope.gallery.activeAlbum.activePhoto && scope.gallery.activeAlbum.activePhoto.id;
                };
                
                scope.goToPrevPhoto = function() {
                    var prevKey;

                    angular.forEach( scope.gallery.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.gallery.activeAlbum.activePhoto.id && scope.gallery.activeAlbum.photos[key-1] ) {
                            prevKey = key - 1;
                        }
                    } );
                    if ( angular.isDefined( prevKey ) ) {
                        scope.gallery.showPhoto( scope.gallery.activeAlbum.photos[prevKey] );
                    }
                };

                scope.goToNextPhoto = function() {
                    var nextKey;

                    angular.forEach( scope.gallery.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.gallery.activeAlbum.activePhoto.id && scope.gallery.activeAlbum.photos[key+1] ) {
                            nextKey = key + 1;
                        }
                    } );
                    if ( nextKey ) {
                        scope.gallery.showPhoto( scope.gallery.activeAlbum.photos[nextKey] );
                    }
                };

                angular.element( element ).attr( 'data-jgallery-id', scope.gallery.id );
                scope.gallery.setOptions(angular.fromJson( attrs['jgallery'] ));
                scope.options = scope.gallery.options;
                if ( scope.gallery.options.autostart ) {
                    scope.gallery.isVisible = true;
                }
                scope.$watch( 'albums', function( albums ) {
                    scope.hasManyAlbums = albums.length > 1;
                } );
                scope.$watch( 'options.autostartAtAlbum + albums', function() {
                    if ( ! scope.gallery.activeAlbum ) {
                        scope.gallery.activeAlbum = scope.gallery.albums[scope.options.autostartAtAlbum - 1];
                    }
                } );
                scope.$watch( 'options.autostartAtImage + gallery.activeAlbum.photos', function() {
                    if ( ! issetActivePhoto() && scope.gallery.activeAlbum.photos[scope.options.autostartAtImage - 1] ) {
                        scope.gallery.showPhoto( scope.gallery.activeAlbum.photos[scope.options.autostartAtImage - 1] );
                    }
                } );
                scope.$watch( 'options.mode', function( mode ) {
                    scope.isSlider = mode === 'slider';
                } );
                angular.element( $window ).bind( 'resize', function() {
                    scope.$apply();
                } );
                angular.element( $document.find( 'head' ) ).append( '<style type="text/css" class="colours" data-jgallery-id="' + scope.gallery.id + '"></style>' );
            },
            controller: ['$scope', function( $scope ) {
                $scope.gallery = new Gallery();
                $scope.albums = $scope.gallery.albums;

                this.addAlbum = function( album ) {
                    $scope.gallery.addAlbum(album);
                };

                this.showPhoto = function( photo ) {
                    $scope.gallery.showPhoto( photo );
                    $timeout( function() {
                        $scope.$apply();
                    } );
                };
            }],
            templateUrl: '../../templates/jgallery.html'
        };
    }
] );