angular.module( 'jgallery' ).directive( 'jgalleryAnimation', ['$timeout', function( $timeout ) {  
    return {
        scope: {
            cols: '@',
            rows: '@'
        },
        transclude: true,
        templateUrl: '../../templates/animation.html',
        link: function(scope){
            scope.cols = new Array(+scope.cols);
            scope.rows = new Array(+scope.rows);
            scope.$apply();
        }
    };
}] );