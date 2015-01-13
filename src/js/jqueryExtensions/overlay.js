var overlay = ( function() {
    var $ = jQuery;
    
    return function( options ) {
        var defaults = {
            'show': false,
            'hide': false,
            'showLoader': false,
            'hideLoader': false,
            'showProgress': false,
            'hideProgress': false,
            'resetProgress': false,
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
                $progress,
                $spinner,
                boolInitialized = $this.is( '.overlayContainer:has(.overlay)' ),
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

            //init
            if ( ! boolInitialized ) {
                $this.addClass( 'overlayContainer' );
                $this.append( '<span class="overlay" style="display: none;"><span class="imageLoaderPositionAbsolute" style="display: none;"><span class="fa fa-spin fa-spinner"></span><span class="progress-value" style="display: none;">0</span></span></span>' );
                options.afterInit();
            }

            $overlay = $this.children( '.overlay' );
            $imageLoader = $this.find( '.imageLoaderPositionAbsolute' );
            
            $progress = $imageLoader.find( '.progress-value' );
            $spinner = $imageLoader.find( '.fa-spinner' );
            if ( options.resetProgress ) {
                $progress.html( '0' );
            }
            if ( options.showProgress ) {
                $imageLoader.addClass( 'preloadAll' );
                $progress.show();
                $spinner.hide();
            }
            else if ( options.hideProgress ) {
                $imageLoader.removeClass( 'preloadAll' );
                $progress.hide(); 
                $spinner.show();               
            }

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
            //endinit
        } );
    };
} )();