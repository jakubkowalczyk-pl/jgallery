angular.module( 'jgallery' ).factory( 'jgallery.requiredSliderMode', function() {
    return {
        autostart: true,
        canClose: false,
        zoomSize: 'fill',
        canChangeMode: false
    };
} );