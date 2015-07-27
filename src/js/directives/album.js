angular.module( 'jgallery' ).directive( 'jgalleryAlbum', ['jgallery.album', function(Album) {  
    return {
        scope: {},
        require: '^jgallery',
        link: function( scope, element, attrs, jgalleryController ) {
            scope.album.title = attrs['jgalleryAlbum'];
            jgalleryController.addAlbum( scope.album );
        },
        controller: ['$scope', function( $scope ){
            $scope.album = new Album();

            this.addPhoto = function( photo ) {
                $scope.$parent.$apply( function() {
                    $scope.album.addPhoto( photo );
                } );
            };
        }]
    };
}] );