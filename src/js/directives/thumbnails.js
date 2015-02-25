angular.module( 'jgallery' ).directive( 'jgalleryThumbnails', function() {        
    return {
        require: '^jgallery',
        link: function( scope, element, attrs ) {
            scope.$watch( 'options.thumbnailsPosition', function( position ) {
                scope.thumbnailsIsVertical = position === 'left' || position === 'right';
            } );
            scope.$watch( 'options.thumbnailsFullScreen', function( fullScreen ) {
                if ( fullScreen ) {
                    scope.thumbWidth = scope.options.thumbWidthOnFullScreen;
                    scope.thumbHeight = scope.options.thumbHeightOnFullScreen;
                }
                else {
                    scope.thumbWidth = scope.options.thumbWidth;
                    scope.thumbHeight = scope.options.thumbHeight;                        
                }
            } );
            scope.thumbnails = element[0];
            scope.thumbnailsFullScreen = false;
        },
        templateUrl: '../../templates/thumbnails.html'
    };
} );