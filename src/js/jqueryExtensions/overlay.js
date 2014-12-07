var overlay = ( function() {
    var $ = jQuery;
    var $html = $( 'html' );
    
    return function( options ) {
        var defaults = {
            'show': false,
            'hide': false,
            'showLoader': false,
            'hideLoader': false,
            'fadeIn': true,
            'fadeOut': true,
            'fadeInLoader': true,
            'fadeOutLoader': true,
            'afterInit': function() {}
        };
        options = $.extend( {}, defaults, options );
        this.each( function() {
            var
                $this = $( this ),
                $overlay,
                $imageLoader,
                boolInitialized = $this.is( '.overlayContainer:has(.overlay)' ),
                setImageLoaderPosition = function() {
                    var
                        top = Math.max( $this.offset().top, $( 'body, html' ).scrollTop() ),
                        bottom = Math.min( $this.offset().top + $this.outerHeight(), $( 'body, html' ).scrollTop() + $( window ).height() ),
                        center = top + ( bottom - top ) / 2 - $this.offset().top;
                    $imageLoader.css( {
                        'top': center + 'px'
                    } );
                },
                setOverlayWidthAndHeight = function() {
                    $this.children( '.overlay' ).css( {
                        width: $this.outerWidth(),
                        height: $this.is( 'body' ) ? $html.outerHeight() : $this.outerHeight()
                    } );
                },
                showOverlay = function() {
                    options.fadeIn ? $overlay.fadeIn( 500 ) : $overlay.show();
                },
                hideOverlay = function() {
                    options.fadeOut ? $overlay.fadeOut( 500 ) : $overlay.hide();
                },
                showLoader = function() {
                    options.fadeInLoader ? $imageLoader.not( ':visible' ).fadeIn( 500 ) : $imageLoader.not( ':visible' ).show();
                },
                hideLoader = function() {
                    options.fadeOutLoader ? $imageLoader.filter( ':visible' ).fadeOut( 500 ) : $imageLoader.filter( ':visible' ).hide();
                };

            $( window ).scroll( function() {
                setImageLoaderPosition();
            } );

            $( window ).resize( function() {
                setImageLoaderPosition();
                setOverlayWidthAndHeight();
            } );

            //init
            if ( $this.is( 'table' ) ) {
                if ( $this.parent().is( '.overlayContainer' ) ) {
                    $this = $this.parent();
                }
            }

            if ( ! boolInitialized ) {
                if ( $this.is( 'table' ) ) {
                    $this.wrap( '<div></div>' );
                    $this = $this.parent();
                }
                $this.addClass( 'overlayContainer' );
                $this.append( '<div class="overlay" style="display: none;"><div class="imageLoaderPositionAbsolute" style="display: none;"></div></div>' );
                options.afterInit();
            }

            $overlay = $this.children( '.overlay' );
            $imageLoader = $this.find( '.imageLoaderPositionAbsolute' );

            $overlay.stop( false, true );
            $imageLoader.stop( false, true );
            if ( options.show ) {
                showOverlay();
            }
            else if ( options.hide ) {
                hideOverlay();
            }
            if ( options.showLoader ) {
                showLoader();
            }
            else if ( options.hideLoader ) {
                hideLoader();
            }

            setImageLoaderPosition();

            setOverlayWidthAndHeight();
            //endinit
        } );
    };
} )();