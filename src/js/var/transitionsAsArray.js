define( ['../var/transitions.js'], function( jGalleryTransitions ) {
    var $ = jQuery;
    var jGalleryArrayTransitions = [];
    
    $.each( jGalleryTransitions, function( index, value ) {
        jGalleryArrayTransitions.push( value );
    } );
    
    return jGalleryArrayTransitions;
} );