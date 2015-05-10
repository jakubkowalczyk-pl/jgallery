angular.module( 'jgallery' ).directive( 'jgalleryDraggableElement', function() {  
    return {
        require: '?^jgalleryDraggableContainer',
        scope: {
            start: '&jgalleryDraggableElementOnStart',
            stop: '&jgalleryDraggableElementOnStop'
        },
        link: function( scope, element, attrs, jgalleryDraggableContainerController ) {
            var el = angular.element( element );
            var initialX;
            var initialY;
            var translateX;
            var translateY;
            
            var start = function( $event ) {
                initialX = $event.pageX;
                initialY = $event.pageY;
                translateX = parseInt( el.css( 'margin-left' ) );
                translateY = parseInt( el.css( 'margin-top' ) );
                el.bind( 'mousemove', move ).bind( 'mouseup mouseleave', stop );
                scope.start();
            };
            
            var move = function( $event ) {
                el.css( {
                    'margin-left': translateX + $event.pageX - initialX + 'px',
                    'margin-top': translateY + $event.pageY - initialY + 'px'
                } );
                scope.$emit( 'jgallery:draggableElement:move', el );
            };
            
            var stop = function() {
                if ( jgalleryDraggableContainerController ) {
                    jgalleryDraggableContainerController.pullEdge( el );
                }
                el.unbind( 'mousemove', move ).unbind( 'mouseup mouseleave', stop );
                scope.stop();
            };
            
            attrs.$observe( 'jgalleryDraggableElement', function( jgalleryDraggableElement ) {
                if ( jgalleryDraggableElement === 'true' ) {
                    el.bind( 'mousedown', start );
                }
                else {
                    el.unbind( 'mousedown', start );                    
                }
            } );
        }
    };
} );