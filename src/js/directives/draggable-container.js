angular.module( 'jgallery' ).directive( 'jgalleryDraggableContainer', function() {
    var calculateDiffX = function( childRect, containerRect ) {
        var left = Math.max( childRect.left - containerRect.left, 0 );

        if ( left ) {
            return - left;
        }
        return Math.max( - childRect.left - childRect.width + containerRect.left + containerRect.width, 0 );
    };
    
    var calculateDiffY = function( childRect, containerRect ) {
        var top = Math.max( childRect.top - containerRect.top, 0 );

        if ( top ) {
            return - top;
        }
        return Math.max( - childRect.top - childRect.height + containerRect.top + containerRect.height, 0 );
    };
    
    return {
        controller: ['$scope', '$element', function( $scope, $element ) {
            $scope.$on( 'jgallery:draggableElement:move', function( event, element ) {
                $scope.$broadcast( 'jgallery:draggableContainer:change', element );
            } );
            this.pullEdge = function( element ) {
                var childRect = element[0].getBoundingClientRect();
                var containerRect = $element[0].getBoundingClientRect();
                
                element.css( {
                    'margin-top': containerRect.height < childRect.height ? parseInt( element.css('margin-top') ) + calculateDiffY( childRect, containerRect ) + 'px' : '0',
                    'margin-left': containerRect.width < childRect.width ? parseInt( element.css('margin-left') ) + calculateDiffX( childRect, containerRect ) + 'px' : '0'
                } );
                $scope.$broadcast( 'jgallery:draggableContainer:change', element );
            };
        }]
    };
} );