angular.module( 'jgallery' ).directive( 'jgalleryBtn', function() {        
     return {
         require: '^jgallery',
         link: function( scope, element, attrs ) {             
//             scope.$watch( 'options.backgroundColor + options.color', function() {
//                var options = scope.options;
//                var bg = options.backgroundColor;
//                var color = options.color;
//                
//                 element[0].style['text-shadow'] = '0 0 5px ' + bg  + ',1px 1px ' + bg;
//                 element[0].style.color = color;               
//             } );
         }
     };
 } );