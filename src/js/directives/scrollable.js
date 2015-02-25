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

            scope.canScrollTop = function() {
                return container.scrollTop > 0;
            };
            scope.scrollTop = function() {
                if ( scope.canScrollTop() ) {
                    animateScrollTop( container, container.scrollTop - $window.innerHeight * 0.7, 200 );
                }
            };
            scope.canScrollBottom = function() {
                return container.offsetHeight + container.scrollTop < container.scrollHeight;
            };
            scope.scrollBottom = function() {
                if ( scope.canScrollBottom() ) {
                    animateScrollTop( container, container.scrollTop + $window.innerHeight * 0.7, 200 );
                }
            };               
            scope.canScrollLeft = function() {
                return container.scrollLeft > 0;
            };
            scope.scrollLeft = function() {
                if ( scope.canScrollLeft() ) {
                    animateScrollLeft( container, container.scrollLeft - $window.innerWidth * 0.7, 200 );
                }
            };
            scope.canScrollRight = function() {
                return container.offsetWidth + container.scrollLeft < container.scrollWidth;
            };
            scope.scrollRight = function() {
                if ( scope.canScrollRight() ) {
                    animateScrollLeft( container, container.scrollLeft + $window.innerWidth * 0.7, 200 );
                }
            };
        },
        templateUrl: '../../templates/scrollable.html'
    };
}] );