angular.module( 'jgallery' ).directive( 'jgalleryAlbum', function() {  
    var albumId = 1;

    return {
        scope: {},
        require: '^jgallery',
        link: function( scope, element, attrs, jgalleryController ) {
            scope.album.title = attrs['jgalleryAlbum'];
            jgalleryController.addAlbum( scope.album );
        },
        controller: ['$scope', function( $scope ){
            $scope.album = {
                id: albumId++
            };
            var photos = $scope.album.photos = [];

            this.addPhoto = function( photo ) {
                $scope.$parent.$apply( function() {
                    photos.push( photo );
                } );
            };
        }]
    };
} );