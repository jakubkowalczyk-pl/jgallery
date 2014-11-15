require( [
    './functions/refreshHTMLClasses.js',
    './var/defaults.js',
    './var/transitions.js',
    './prototype/jgallery.js'
], function( refreshHTMLClasses, defaults, jGalleryTransitions, JGallery ) {
    var jGalleryCollection = [ '' ];
    var $ = jQuery;
    var $html = $( 'html' );
    var jGalleryId = 0;

    $.fn.jGallery = function( userOptions ) {
        var self = this;

        this.each( function() {
            var $this = $( this );

            if ( ! $this.is( '[data-jgallery-id]' ) ) {
                jGalleryCollection[ ++jGalleryId ] = new JGallery( $this, jGalleryId, userOptions );
            }
            else if( $.isPlainObject( userOptions ) ) {
                jGalleryCollection[ $this.attr( 'data-jgallery-id' ) ].update( userOptions );
            }
        } );   
        $.extend( self, {
            getDefaults: function() {
                return defaults;
            },

            getTransitions: function() {
                return jGalleryTransitions;
            },

            restoreDefaults: function() {
                return self.each( function() {
                    $( this ).jGallery( defaults );
                } );
            },

            getOptions: function() {
                return $( self ).eq( 0 ).jGallery().getOptions();
            },

            destroy: function() {
                return self.each( function() {
                    var $this = $( this );
                    var id = $this.attr( 'data-jgallery-id' );

                    jGalleryCollection[ id ] = '';
                    $this.removeAttr( 'data-jgallery-id' ).show();
                    $html.find( '.jgallery[data-jgallery-id="' + id + '"]' ).remove();
                    refreshHTMLClasses();
                } );                    
            }
        } );

        return this;
    };
} );
