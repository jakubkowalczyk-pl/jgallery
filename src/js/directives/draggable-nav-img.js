angular.module( 'jgallery' ).directive( 'jgalleryDraggableImg', ['$timeout', function( $timeout ) {  
    return {
        require: '^jgalleryDraggableContainer',
        link: function( scope, element, attrs, jgalleryDraggableNavControler ) {
            scope.nav = element[0];
        }
    };
}] );