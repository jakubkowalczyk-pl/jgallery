angular.module( 'jgallery' ).directive( 'jgalleryScrollable', ['$interval', '$window', function( $interval, $window ) {  
    return {
        transclude: true,
        scope: true,
        link: function( scope, element, attrs ) {
            var container = $window.container = element[0].childNodes[0];

            var animateScrollTop = function( element, to, duration ) {
                animateScroll( element, to, duration, 'scrollTop' );
            };

            var animateScrollLeft = function( element, to, duration ) {
                animateScroll( element, to, duration, 'scrollLeft' );
            };

            var animateScroll = function( element, to, duration, scrollDirection ) {
                var interval = 40;
                var from = element[scrollDirection];
                var iteration = duration / interval;
                var diff = ( to - from ) / iteration;
                var i = 0;

                var promise = $interval( function() {
                    i++;
                    element[scrollDirection] += diff;
                    if ( i === iteration ) {
                        $interval.cancel( promise );
                    }
                }, interval );
            };

            scope.thumbnailsCanScrollTop = function() {
                return container.scrollTop > 0;
            };
            scope.thumbnailsScrollTop = function() {
                if ( scope.thumbnailsCanScrollTop() ) {
                    animateScrollTop( container, container.scrollTop - $window.innerHeight * 0.7, 200 );
                }
            };
            scope.thumbnailsCanScrollBottom = function() {
                return container.offsetHeight + container.scrollTop < container.scrollHeight;
            };
            scope.thumbnailsScrollBottom = function() {
                if ( scope.thumbnailsCanScrollBottom() ) {
                    animateScrollTop( container, container.scrollTop + $window.innerHeight * 0.7, 200 );
                }
            };               
            scope.thumbnailsCanScrollLeft = function() {
                return container.scrollLeft > 0;
            };
            scope.thumbnailsScrollLeft = function() {
                if ( scope.thumbnailsCanScrollLeft() ) {
                    animateScrollLeft( container, container.scrollLeft - $window.innerWidth * 0.7, 200 );
                }
            };
            scope.thumbnailsCanScrollRight = function() {
                return container.offsetWidth + container.scrollLeft < container.scrollWidth;
            };
            scope.thumbnailsScrollRight = function() {
                if ( scope.thumbnailsCanScrollRight() ) {
                    animateScrollLeft( container, container.scrollLeft + $window.innerWidth * 0.7, 200 );
                }
            };
        },
        templateUrl: '../../templates/scrollable.html'
    };
}] );