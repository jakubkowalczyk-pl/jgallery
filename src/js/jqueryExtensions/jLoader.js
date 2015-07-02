var jLoader = ( function( overlay ) {
    var $ = jQuery;
    
    $.fn.overlay = overlay;
    
    return function( options ) {
        options = $.extend( {
             interval: 1000,
             skip: ':not(*)',
             start: function() {
                 $( 'body' ).overlay( {
                     'fadeIn': false,
                     'fadeOut': false,
                     'show': true,
                     'showLoader': true
                 } );
                 $( 'body' ).show();
             },
             success: function() {
                 $( 'body' ).overlay( {
                     'hide': true
                 } );
             },
             progress: function() {

             }
        }, options );

        this.each( function() {
            var $this = $( this );
            var $tmp = $();
            var $images = $();
            var timeout;
            var intCount = 0;

            function check() {
                var boolComplete = true;
                var intComplete = 0;
                var intPercent;

                $images.each( function() {
                     if ( $( this )[0].complete && $( this )[0].naturalWidth > 0 ) {
                         intComplete++;
                     }
                     else {
                         boolComplete = false;
                     }
                } );
                intPercent = parseInt( intComplete * 100 / intCount );
                options.progress( {
                    percent: intPercent
                } );
                if ( boolComplete ) {
                    clearTimeout( timeout );
                    $tmp.remove();
                    options.success();
                }
                else {
                    timeout = setTimeout( check, options.interval );
                }
            }

            $this.append( '<div class="jLoaderTmp" style="position: absolute; width: 0; height: 0; line-height: 0; font-size: 0; visibility: hidden; overflow: hidden; z-index: -1;"></div>' );
            $tmp = $this.children( '.jLoaderTmp:last-child' );

            $( $this ).add( $this.find( '*' ) ).not( options.skip ).each( function() {
                var strBackgroundUrl;

                if ( $( this ).css( 'background-image' ) !== 'none' ) {
                     strBackgroundUrl = $( this ).css( 'background-image' );
                     if ( /url/.exec( strBackgroundUrl ) ) {
                          strBackgroundUrl = strBackgroundUrl.replace( '"', '' ).replace( "'", '' ).replace( ' ', '' ).replace( 'url(', '' ).replace( ')', '' );
                          $tmp.append( '<img src="' + strBackgroundUrl + '">' );
                     }
                }
            } );
            $images = $this.find( 'img:not( ' + options.skip + ')' );
            if ( $this.is( 'img' ) ) {
                if ( ! $this.is( options.skip ) ) {
                    $images = $images.add( $this );
                }
            }
            intCount = parseInt( $images.length );
            options.start();
            check();
        } );
     };
} )( overlay );