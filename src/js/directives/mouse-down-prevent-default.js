angular.module( 'jgallery' ).directive( 'jgalleryMousedownPreventDefault', function() {  
    return {
        link: function( scope, element ) {
            var el = angular.element( element );

            el.bind( 'mousedown', function( $event ) {
                $event.preventDefault();
            } );
        }
    };
} );