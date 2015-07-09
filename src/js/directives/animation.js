angular.module( 'jgallery' ).directive( 'jgalleryAnimation', ['$timeout', function( $timeout ) {  
    return {
        scope: {
            cols: '@',
            rows: '@'
        },
        transclude: true,
        templateUrl: '../../templates/animation.html',
        link: function(scope){
            scope.parseInt = parseInt;
        }
    };
}] );