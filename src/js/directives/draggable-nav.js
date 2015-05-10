angular.module( 'jgallery' ).directive( 'jgalleryDraggableNav', ['$timeout', function( $timeout ) {  
    return {
        require: '^jgalleryDraggableContainer',
        scope: true,
        controller: ['$scope', '$element', function( $scope, $element ) {
            $scope.$watch( 'options.mode', function() {
                $timeout( function() {
                    $scope.$apply();
                } );
            } );
            $scope.$on( 'jgallery:draggableContainer:change', function( event, element ) {
                $scope.img = element[0];
                $scope.$apply();
            } );
        }],
        templateUrl: '../../templates/draggable-nav.html'
    };
}] );