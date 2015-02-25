angular.module( 'jgallery' ).factory( 'requiredSliderMode', function() {
    return {
        autostart: true,
        canClose: false,
        zoomSize: 'fill',
        canChangeMode: false
    };
} );