/*!
 * jGallery v0.9-beta
 * http://jgallery.jakubkowalczyk.pl/
 *
 * Released under the MIT license
 *
 * Date: 2013-08-19
 */
( function( $ ) {
    $.fn.jGallery = function( options ) {
        $.fn.jGalleryOptions = $.extend( {
            'autostart': false,
            'canClose': true,
            'canResize': true,
            'descriptions': false,
            'thumbnails': true,
            'thumbnailsFullScreen': true,
            'thumbType': 'image', // [ image | square | number ]
            'thumbnailsPosition': 'bottom', // [ top | bottom | left | right ]
            'thumbWidth': 100, //px
            'thumbHeight': 100, //px
            'thumbWidthOnFullScreen': 100, //px
            'thumbHeightOnFullScreen': 100, //px
            'showEffect': 'rotate-room-right', // [ rotate-room-right | rotate-room-left | rotate-room-up | rotate-room-down ] http://jgallery.jakubkowalczyk.pl/demo.php?transitions
            'hideEffect': 'rotate-room-right', //[ rotate-room-right | rotate-room-left | rotate-room-up | rotate-room-down ] http://jgallery.jakubkowalczyk.pl/demo.php?transitions
            'showTimingFunction': 'linear', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
            'hideTimingFunction': 'linear', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
            'showDuration': '0.5s',
            'hideDuration': '0.5s',
            'zoomSize': 'fitToWindow', // [ fitToWindow | 100% ]
            'title': true,
            'titleShowEffect': 'fade',
            'titleHideEffect': 'fade',
            'titleShowTimingFunction': 'ease', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
            'titleHideTimingFunction': 'ease', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
            'titleShowDuration': '0.5s',
            'titleHideDuration': '0.5s',
            'slideshow': true,
            'slideshowAutostart': false,
            'slideshowCanRandom': true,
            'slideshowRandom': false,
            'slideshowRandomAutostart': false,
            'slideshowInterval': '8s',
            'preloadAll': false,
            'theme': 'black', // [ black | white ]
            'disabledOnIE7AndOlder': true,
            'initGallery': function() {},
            'showPhoto': function() {},
            'beforeLoadPhoto': function() {},
            'afterLoadPhoto': function() {},
            'showGallery': function() {},
            'closeGallery': function() {}
        }, options );
        
        var effects = [ 'slide-up', 'slide-down', 'slide-right', 'slide-left', 'slide-up-left', 'slide-up-right', 'slide-down-left', 'slide-down-right', 'fade' ];
        
        var intCountEffects = effects.length;
        
        var $window = $( window );
            
        if ( $.fn.jGalleryOptions.disabledOnIE7AndOlder && $.browser.version < 8 ) {
            return;
        }
            
        function initialized() {
            return $( '#jGallery' ).length == 1;
        }
        
        if ( initialized() ) {
            return;
        }

        function isHorizontalThumbs() {
            return $.fn.jGalleryOptions.thumbnailsPosition == 'top' || $.fn.jGalleryOptions.thumbnailsPosition == 'bottom';
        }

        function isVerticalThumbs() {
            return $.fn.jGalleryOptions.thumbnailsPosition == 'left' || $.fn.jGalleryOptions.thumbnailsPosition == 'right';
        }

        function getTransition( $el ) {
            return $.browser.webkit ? $el.css( '-webkit-transition' ) : $el.css( 'transition' );
        }

        function setTransition( $el, strValue ) {
            $el.css( {
                '-webkit-transition': strValue,
                '-moz-transition-duration': strValue,
                '-o-transition-duration': strValue,
                'transition': strValue
            } );
        }

        function setTransitionDuration( $el, strDuration ) {
            $el.css( {
                '-webkit-transition-duration': strDuration,
                '-moz-transition-duration': strDuration,
                '-o-transition-duration': strDuration,
                'transition-duration': strDuration
            } );
        }

        function setTransitionTimingFunction( $el, strTimingFunction ) {
            $el.css( {
                '-webkit-transition-timing-function': strTimingFunction,
                '-moz-transition-timing-function': strTimingFunction,
                '-o-transition-timing-function': strTimingFunction,
                'transition-timing-function': strTimingFunction
            } );
        }
        
        function rand( min, max ) {
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        
        function isHorizontal( $image ) {
            return $image.width() > $image.height();
        }
        
        function jGallery( $this ) {
            var $body;
            var loader;
            var $jGallery;
            var $prev;
            var $next;
            var $resize;
            var $progress;
            var $slideshow = $();
            var $random = $();
            var $thumbsChangeViewToFullScreen;
            var $thumbsChangeAlbum;
            var $descriptions;
            var $thumbnails;
            var $thumbnailsContainer;
            var $thumbnailsPrev;
            var $thumbnailsNext;
            var $thumbnailsA;
            var $thumbnailsImg;
            var $thumbnailsClose;
            var $menu;
            var $albums;
            var $loader;
            var $zoom;
            var $zoomContainer;
            var $zoomOverlayItems;
            var $zoomTitle;
            var showPhotoTimeout;
            var booSlideshowPlayed = false;
            var fltZoomRatioWidthToHeight;
            var booLoadingInProgress = false;
            var strShowEffect;
            var strHideEffect;
            var strTitleShowEffect;
            var strTitleHideEffect;
            var booIsAlbums = $this.find( '.album:has(a:has(img:first-child:last-child))' ).length > 1;

            function progress( $this ) {
                $this.clear = function() {
                    $this.stop( false, true ).css( {width: 0} );
                    return $this;
                };

                $this.start = function( width, success ) {
                    $this.animate( {
                        width: width
                    }, parseInt( $.fn.jGalleryOptions.slideshowInterval ) * 1000, 'linear', success );
                    return $this;
                };

                $this.pause = function() {
                    $this.stop( true ).clear();
                    return $this;
                };

                return $this;
            }

            function setVariables() {
                $body = $( 'body' );
                $jGallery = $( '#jGallery' );
                $zoomContainer = $jGallery.children( '.zoom-container' );
                $zoomTitle = $zoomContainer.children( '.title' );
                $prev = $zoomContainer.children( '.prev' );
                $next = $zoomContainer.children( '.next' );
                $zoom = $zoomContainer.children( '.zoom' );
                $progress = progress( $zoomContainer.children( '.progress' ) );
                $descriptions = $jGallery.find( '.descriptions' );
                $thumbnails = $jGallery.find( '.thumbnails' );
                $thumbnailsContainer = $thumbnails.find( '.container' );
                $thumbnailsPrev = $thumbnails.children( '.prev' );
                $thumbnailsNext = $thumbnails.children( '.next' );
                $thumbnailsA = $thumbnails.find( 'a' );
                $thumbnailsImg = $thumbnails.find( 'img' );
                $albums = $thumbnails.find( '.album' );
            }

            function generateThumbs() {
                var $tmp;
                var intI = 1;
                var intJ = 1;
                var $thumbnailsContainerInner = $( '#jGallery .thumbnails .container-inner' );
                
                function insertImages( $images, $container ) {
                    $images.find( 'a:has(img:first-child:last-child)' ).each( function() {
                        $container.append( $( this ) );
                        $container.children( ':last-child' ).attr( 'data-jgallery-photo-id', intI++ );
                    } );
                }
                
                function insertAlbum() {
                    var $this = $( this );
                    var strTitle = $this.is( '[data-jgallery-album-title]' ) ? $this.attr( 'data-jgallery-album-title' ) : 'Album ' + intJ;
                    var $album = $thumbnailsContainerInner.append( '<div class="album" data-jgallery-album-title="' + strTitle + '"></div>' ).children( ':last-child' );
                    
                    if ( intJ == 1 ) {
                        $album.addClass( 'active' );
                    }
                    insertImages( $this, $album );
                    intJ++;
                }

                $( 'body' ).append( '<div id="jGalleryTmp" style="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: -1; overflow: hidden;">' + $this.html() + '</div>' );
                $tmp = $( '#jGalleryTmp' );
                if ( booIsAlbums ) {
                    $tmp.find( '.album:has(a:has(img:first-child:last-child))' ).each( insertAlbum );
                }
                else {
                    insertImages( $tmp, $thumbnailsContainerInner );                    
                }
                $tmp.remove();
            }
                
            function init() {
                $.fn.jGalleryOptions.initGallery();
                $( 'body' ).append( '\
                    <div id="jGallery" style="display: none;">\
                        <div class="thumbnails hidden">\
                            <div class="container"><div class="container-inner"></div></div>\
                            <span class="prev btn hidden"><span class="icon-chevron-left ico"></span></span>\
                            <span class="next btn hidden"><span class="icon-chevron-right ico"></span></span>\
                        </div>\
                        <div class="descriptions"></div>\
                        <div class="zoom-container">\
                            <div class="title before"></div>\
                            <div id="pt-main" class="zoom before pt-perspective"></div>\
                            <span class="icon-chevron-left prev btn btn-large"></span>\
                            <span class="icon-chevron-right next btn btn-large"></span>\
                            <span class="progress"></span>\
                            <div class="nav"></div>\
                            <div class="nav-bottom"></div>\
                            <canvas id="canvas" width="1920" height="1200"></canvas>\
                        </div>\
                    </div>' );
                generateThumbs();
                setVariables();
                if ( $.fn.jGalleryOptions.theme == 'white' ) {
                    $jGallery.addClass( 'white' );
                }
                if ( $.fn.jGalleryOptions.preloadAll ) {
                    loadAll();
                }
                initThumb();
                if ( $.fn.jGalleryOptions.canResize ) {
                    $zoomContainer.find( '.nav' ).append( '<span class="icon- resize btn btn-small"></span>' );
                    $resize = $zoomContainer.find( '.resize' );
                }
                if ( $.fn.jGalleryOptions.canClose ) {
                    $zoomContainer.find( '.nav' ).append( '<span class="icon-remove close btn btn-small"></span>' );
                }
                if ( ! $.fn.jGalleryOptions.thumbnails ) {
                    $thumbnails.hide();
                    $.fn.jGalleryOptions.thumbnailsPosition = '';
                }
                if ( $.fn.jGalleryOptions.slideshow ) {
                    $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-play slideshow btn btn-small"></span>' );
                    $slideshow = $zoomContainer.find( '.slideshow' );
                    if ( $.fn.jGalleryOptions.slideshowCanRandom ) {
                        $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-random random btn btn-small inactive"></span>' );
                        $random = $zoomContainer.find( '.random' );
                        if ( $.fn.jGalleryOptions.slideshowRandom ) {
                            $random.addClass( 'active' );
                        }
                    }
                }
                if ( $.fn.jGalleryOptions.thumbnailsFullScreen && $.fn.jGalleryOptions.thumbType == 'image' ) {
                    $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-th full-screen btn btn-small"></span>' );
                    $thumbsChangeViewToFullScreen = $zoomContainer.find( '.full-screen' );
                    $thumbnails.append( '<span class="icon- icon-remove btn close btn-small"></span>' );
                    $thumbnailsClose = $thumbnails.find( '.close' );
                }
                ( function() {                    
                    if ( booIsAlbums ) {
                        $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-list-ul change-album btn btn-small"><span class="menu btn"></span></span>' );
                        $thumbsChangeAlbum = $zoomContainer.find( '.change-album' );
                        $menu = $thumbsChangeAlbum.find( '.menu' );
                        $albums.each( function() {
                            var strTitle = $( this ).attr( 'data-jgallery-album-title' );
                            
                            $menu.append( '<span class="item" data-jgallery-album-title="' + strTitle + '">' + strTitle + '</span>' );
                        } );
                    }
                } )();
                if ( ! $.fn.jGalleryOptions.descriptions ) {
                    $descriptions.hide();
                }
                if ( $.fn.jGalleryOptions.zoomSize == 'fitToWindow' ) {
                    $resize.addClass( 'icon-resize-full' );
                }
                if ( $.fn.jGalleryOptions.zoomSize == '100%' ) {
                    $resize.addClass( 'icon-resize-small' );
                }
                detectingAvailableCssProporties();
                refreshThumbsNav();
                refreshZoomNav();
                refreshZoomContainerSize();
                addEventsHandlers();
            }
            
            function initThumb() { 
                $thumbnails.addClass( 'thumbnails-' + $.fn.jGalleryOptions.thumbnailsPosition );
                if ( isVerticalThumbs() ) {
                    $thumbnails.addClass( 'thumbnails-vertical' );                    
                }
                if ( isHorizontalThumbs() ) {
                    $thumbnails.addClass( 'thumbnails-horizontal' );                    
                }              
                if ( $.fn.jGalleryOptions.thumbType == 'square' ) {
                    initThumbSquare();
                }
                if ( $.fn.jGalleryOptions.thumbType == 'number' ) {
                    initThumbNumber();
                }
                if ( $.fn.jGalleryOptions.thumbType == 'image' ) {
                    initThumbImages();
                }
            }
            
            function initThumbSquare() {
                var intI = 1;
                $thumbnails.addClass( 'square' );
                $thumbnailsA.each( function() {
                    $( this ).append( intI++ );
                } );
            }
            
            function initThumbNumber() {
                $thumbnails.addClass( 'number' );
                initThumbSquare();
            }
            
            function initThumbImages() {
                $thumbnails.addClass( 'images' );
                $( 'head' ).append( '\
                    <style type="text/css">\n\
                        #jGallery .thumbnails a {\n\
                            width: ' + $.fn.jGalleryOptions.thumbWidth + 'px;\n\
                            height: ' + $.fn.jGalleryOptions.thumbHeight + 'px;\n\
                            font-size: ' + $.fn.jGalleryOptions.thumbHeight + 'px;\n\
                        }\n\
                        #jGallery .thumbnails.full-screen a {\n\
                            width: ' + $.fn.jGalleryOptions.thumbWidthOnFullScreen + 'px;\n\
                            height: ' + $.fn.jGalleryOptions.thumbHeightOnFullScreen + 'px;\n\
                            font-size: ' + $.fn.jGalleryOptions.thumbHeightOnFullScreen + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-horizontal {\n\
                            height: ' + parseInt( $.fn.jGalleryOptions.thumbHeight + 2 ) + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-vertical {\n\
                            width: ' + parseInt( $.fn.jGalleryOptions.thumbWidth + 2 ) + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-top.hidden {\n\
                            top: -' + $.fn.jGalleryOptions.thumbHeight + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-bottom.hidden {\n\
                            bottom: -' + $.fn.jGalleryOptions.thumbHeight + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-left.hidden {\n\
                            left: -' + $.fn.jGalleryOptions.thumbWidth + 'px;\n\
                        }\n\
                        #jGallery .thumbnails-right.hidden {\n\
                            right: -' + $.fn.jGalleryOptions.thumbWidth + 'px;\n\
                        }\n\
                    </style>\n\
                ' );
                hideThumbs();
            }
            
            function addEventsHandlers() {  
                $this.find( 'a' ).on( {
                    click: function( event ) {
                        event.preventDefault();
                        showPhoto( $( this ) );
                    }
                } );

                $thumbnailsA.on( {
                    click: function( event ) {
                        var $this = $( this );
                        
                        event.preventDefault();
                        if ( $this.is( ':not(.active)' ) ) {
                            slideshowStop();
                            showPhoto( $this );
                        }
                        else if ( isThumbsViewFullScreen() ) {
                            changeThumbsViewToBar();
                        }
                    }
                } ); 

                $thumbnailsPrev.on( {
                    click: function() {
                        scrollPrevThumbs();
                    }
                } );

                $thumbnailsNext.on( {
                    click: function() {
                        scrollNextThumbs();
                    }
                } );

                $prev.on( {
                    click: function() {
                        slideshowStop();
                        showPrevPhoto();
                    }
                } );

                $next.on( {
                    click: function() {
                        slideshowStop();
                        showNextPhoto();
                    }
                } );

                $zoomContainer.find( '.close' ).on( {
                    click: function() {
                        hide();
                    }
                } );

                $random.on( {
                    click: function() {
                        slideshowRandomToggle();
                    }
                } );

                $resize.on( {
                    click: function() {
                        toggleZoomSize();
                    }
                } ); 

                $slideshow.on( {
                    click: function() {
                        slideshowPlayStop();
                    }
                } );    
                
                $thumbsChangeViewToFullScreen.on( {
                    click: function() {
                        changeThumbsViewToFullScreen();
                    }
                } );  
                
                $thumbnailsClose.on( {
                    click: function() {
                        changeThumbsViewToBar();
                    }
                } );
                
                $thumbsChangeAlbum.on( {
                    click: function( event ) {
                        toggleAlbumsMenu();
                        event.stopPropagation();
                    }
                } );
                
                $thumbsChangeAlbum.find( '.item' ).on( {
                    click: function() {
                        var $this = $( this );
                        
                        if ( $this.is( '.active' ) ) {
                            return;
                        }
                        showPhoto( $albums.filter( '[data-jgallery-album-title="' + $this.attr( 'data-jgallery-album-title' ) + '"]' ).find( 'a' ).eq( 0 ) );
                    }
                } );
            }
            
            function toggleAlbumsMenu() {
                $thumbsChangeAlbum.toggleClass( 'active' );
            }
            
            function hideAlbumsMenu() {
                $thumbsChangeAlbum.removeClass( 'active' );
            }
            
            function loadAll() {
                $thumbnailsA.each( function() {
                    var $a = $( this );
                    if ( ! isLoaded( $a ) ) {
                        $zoom.append( '<div class="container pt-page before ' + getEffect( $.fn.jGalleryOptions.showEffect ) + '"><img src="' + $a.attr( 'href' ) + '" /></div>' );
                    }
                } );
            }
            
            function detectingAvailableCssProporties() {
                if ( ! $.browser.msie ) {
                    $jGallery.addClass( 'text-shadow' );
                }
            }
            
            function getCanvasRatioWidthToHeight() {
                var intCanvasWidth;
                var intCanvasHeight;
                if ( isHorizontalThumbs() ) {
                    intCanvasWidth = $window.width();
                    intCanvasHeight = $window.height() - $thumbnails.outerHeight( true );
                }
                else if ( isVerticalThumbs() ) {
                    intCanvasWidth = $window.width() - $thumbnails.outerWidth( true );
                    intCanvasHeight = $window.height();
                }
                else {
                    intCanvasWidth = $window.width();
                    intCanvasHeight = $window.height();                    
                }
                return intCanvasWidth / intCanvasHeight;
            }
            
            function refreshZoomContainerSize() {
                $zoomContainer.css( {
                    'width': isVerticalThumbs() ? $window.width() - $thumbnails.outerWidth( true ) : 'auto',
                    'height': isHorizontalThumbs() ? $window.height() - $thumbnails.outerHeight( true ) : $window.height(),
                    'margin-top': $.fn.jGalleryOptions.thumbnailsPosition == 'top' ? $thumbnails.outerHeight( true ) : 0,
                    'margin-left': $.fn.jGalleryOptions.thumbnailsPosition == 'left' ? $thumbnails.outerWidth( true ) : 0,
                    'margin-right': $.fn.jGalleryOptions.thumbnailsPosition == 'right' ? $thumbnails.outerWidth( true ) : 0
                } );
            }

            function zoomFitToWindow() {
                var $img = $zoom.find( 'img.active' );
                
                $img.css( {
                    'width': 'auto',
                    'height': 'auto',
                    'min-width': 0,
                    'min-height': 0,
                    'max-width': isVerticalThumbs() ? $window.width() - $thumbnails.outerWidth( true ) : $window.width(),
                    'max-height': isHorizontalThumbs() ? $window.height() - $thumbnails.outerHeight( true ) : $window.height()
                } );                
                $img.css( {
                    'margin-top': - $img.height() / 2,
                    'margin-left': - $img.width() / 2
                } );
                $resize.addClass( 'icon-resize-full' ).removeClass( 'icon-resize-small' );
            }
            
            function zoom100Percent() {
                var $img = $zoom.find( 'img.active' );
                
                $img.css( {
                    'max-width': 'none',
                    'max-height': 'none',                    
                    'min-width': isVerticalThumbs() ? $window.width() - $thumbnails.outerWidth( true ) : $window.width(),
                    'min-height': isHorizontalThumbs() ? $window.height() - $thumbnails.outerHeight( true ) : $window.height()
                } );
                if ( fltZoomRatioWidthToHeight / getCanvasRatioWidthToHeight() > 1 ) {
                    $img.css( {
                        'width': 'auto',
                        'height': isHorizontalThumbs() ? $window.height() - $thumbnails.outerHeight( true ) : $window.height()
                    } );                        
                }
                else {
                    $img.css( {
                        'width': isVerticalThumbs() ? $window.width() - $thumbnails.outerWidth( true ) : $window.width(),
                        'height': 'auto'
                    } );
                }
                $img.css( {
                    'margin-top': - $img.height() / 2,
                    'margin-left': - $img.width() / 2
                } );
                $resize.addClass( 'icon-resize-small' ).removeClass( 'icon-resize-full' );
            }

            function refreshZoomSize() {
                if ( isThumbsViewFullScreen() ) {
                    return;
                }
                refreshZoomContainerSize();
                if ( $.fn.jGalleryOptions.zoomSize == 'fitToWindow' ) {
                    zoomFitToWindow();
                }
                else if ( $.fn.jGalleryOptions.zoomSize == '100%' ) {
                    zoom100Percent();
                }
                $zoom.addClass( 'visible' );
            }
            
            function toggleZoomSize() {
                var $img = $zoom.find( 'img.active' );
                
                $img.stop( false, true ).fadeOut( parseFloat( $.fn.jGalleryOptions.showDuration ) * 1000, function() {
                    if ( $.fn.jGalleryOptions.zoomSize == 'fitToWindow' ) {
                        $.fn.jGalleryOptions.zoomSize = '100%';
                        zoom100Percent();
                    }
                    else if ( $.fn.jGalleryOptions.zoomSize == '100%' ) {
                        $.fn.jGalleryOptions.zoomSize = 'fitToWindow';
                        zoomFitToWindow();
                    }
                    $img.fadeIn( parseFloat( $.fn.jGalleryOptions.hideDuration ) * 1000 );
                } );
            }

            function refreshThumbsNav() {
                if ( isVerticalThumbs() || isThumbsViewFullScreen() ) {
                    refreshVerticalThumbsNav();
                }
                else if ( isHorizontalThumbs() ) {
                    refreshHorizontalThumbsNav();
                }
            }

            function refreshHorizontalThumbsNav() {
                var $album = $albums.filter( '.active' );
                var intThumbsWidth = $.fn.jGalleryOptions.thumbType == 'image' ? $thumbnailsA.outerWidth( true ) * $album.find( 'img' ).length : $thumbnailsA.outerWidth( true ) * $album.find( 'a' ).length;
                
                $thumbnailsContainer.scrollLeft() > 0 ? $thumbnailsPrev.addClass( 'visible' ) : $thumbnailsPrev.removeClass( 'visible' );
                intThumbsWidth > $thumbnailsContainer.width() + $thumbnailsContainer.scrollLeft() ? $thumbnailsNext.addClass( 'visible' ) : $thumbnailsNext.removeClass( 'visible' );
            }
            
            function refreshVerticalThumbsNav() {
                $thumbnailsContainer.scrollTop() > 0 ? $thumbnailsPrev.addClass( 'visible' ) : $thumbnailsPrev.removeClass( 'visible' );
                $thumbnailsContainer.find( '.container-inner' ).height() > $thumbnailsContainer.height() + $thumbnailsContainer.scrollTop() ? $thumbnailsNext.addClass( 'visible' ) : $thumbnailsNext.removeClass( 'visible' );
            }

            function refreshZoomNav() {
                var $thumbActive = $thumbnails.find( '.active' );
                $thumbActive.prev( 'a' ).length == 1 ? $prev.removeClass( 'hidden' ) : $prev.addClass( 'hidden' );
                $thumbActive.next( 'a' ).length == 1 ? $next.removeClass( 'hidden' ) : $next.addClass( 'hidden' );
            }
            
            function scrollPrevThumbs() {
                if ( isVerticalThumbs() || isThumbsViewFullScreen() ) {
                    $thumbnailsContainer.stop( false, true ).animate( {
                        'scrollTop': "-=" + $window.height() * 0.7
                    }, function() {
                        refreshThumbsNav();
                    } );
                } 
                else if ( isHorizontalThumbs() ) {
                    $thumbnailsContainer.stop( false, true ).animate( {
                        'scrollLeft': "-=" + $window.width() * 0.7
                    }, function() {
                        refreshThumbsNav();
                    } );
                }
            }
            
            function scrollNextThumbs() {
                if ( isVerticalThumbs() || isThumbsViewFullScreen() ) {
                    $thumbnailsContainer.stop( false, true ).animate( {
                        'scrollTop': "+=" + $window.height() * 0.7
                    }, function() {
                        refreshThumbsNav();
                    } );                
                }
                else if ( isHorizontalThumbs() ) {
                    $thumbnailsContainer.stop( false, true ).animate( {
                        'scrollLeft': "+=" + $window.width() * 0.7
                    }, function() {
                        refreshThumbsNav();
                    } );
                }
            }
            
            function changeThumbsViewToFullScreen() {
                slideshowStop();
                $thumbnails.addClass( 'full-screen' );
                if ( isHorizontalThumbs() ) {
                    $thumbnails.addClass( 'thumbnails-vertical' ).removeClass( 'thumbnails-horizontal' );                    
                }
                refreshVerticalThumbsNav();
            }
            
            function changeThumbsViewToBar() {
                $thumbnails.removeClass( 'full-screen' );
                if ( isHorizontalThumbs() ) {
                    $thumbnails.addClass( 'thumbnails-horizontal' ).removeClass( 'thumbnails-vertical' );                    
                }
                refreshZoomSize();
                refreshThumbsNav();
            }
            
            function isThumbsViewFullScreen() {
                return $thumbnails.is( '.full-screen' );
            }

            function hide() {
                if ( ! $.fn.jGalleryOptions.canClose ) {
                    return;
                }
                $( '#jGallery:visible' ).stop( false, true ).addClass( 'hidden' ).fadeOut( 500, function() {   
                    $body.css( {
                        'overflow': 'visible'
                    } );
                } );
                booLoadingInProgress = false;
                clearTimeout( showPhotoTimeout );
                $zoom.hide().removeAttr( 'src' );
                $zoomTitle.addClass( 'hidden' );
                $prev.addClass( 'hidden' );
                $next.addClass( 'hidden' );
                hideThumbs();
                slideshowStop();
                $body.overlay( {'hide': true} );
                $.fn.jGalleryOptions.closeGallery();
            }
            
            function show() {
                $body.css( {
                    'overflow': 'hidden'
                } );
                if ( typeof $loader == 'undefined' ) {
                    loaderInit();
                }
                $( '#jGallery:not(:visible)' ).removeClass( 'hidden' ).stop( false, true ).fadeIn( 500 );
                showThumbs();
                refreshZoomContainerSize();
                $body.overlay( {'show': true, 'showLoader': false} );
                $zoomTitle.removeClass( 'hidden' );  
                $.fn.jGalleryOptions.showGallery();
            }
            
            function thumbsCenter( $a ) {
                if ( isHorizontalThumbs() ) {
                    thumbsHorizontalCenter( $a );
                }
                if ( isVerticalThumbs() ) {
                    thumbsVerticalCenter( $a );
                }
            }
            
            function thumbsHorizontalCenter( $a ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollLeft': $a.position().left - $thumbnailsContainer.scrollLeft() * -1 - $a.outerWidth() / -2 - $thumbnailsContainer.outerWidth() / 2
                }, function() {
                    refreshThumbsNav();
                } );
            }
            
            function thumbsVerticalCenter( $a ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollTop': $a.position().top - $thumbnailsContainer.scrollTop() * -1 - $a.outerHeight() / -2 - $thumbnailsContainer.outerHeight() / 2
                }, function() {
                    refreshThumbsNav();
                } );
            }
            
            function getEffect( strEffect ) {
                return strEffect == 'random' ? effects[ Math.floor( ( Math.random() * intCountEffects ) ) ] : strEffect;
            }
            
            function showPhoto( $a ) {
                var $imgThumb = $a.children( 'img' );
                
                if ( ! initialized() ) {
                    showPhotoInit();
                }
                if ( booLoadingInProgress ) {
                    return;
                }
                booLoadingInProgress = true;
                $.fn.jGalleryOptions.showPhoto();
                if ( $( '#jGallery' ).is( ':not(:visible)' ) ) {
                    show();
                }
                changeThumbsViewToBar();
                if ( true ||  ! $a.is( '[data-jgallery-photo-id]' ) ) {
                    setActiveAlbum( $albums.filter( '[data-jgallery-album-title="' + $a.parents( '.album' ).eq( 0 ).attr( 'data-jgallery-album-title' ) + '"]' ) );
                }
                setActiveThumb( $a );
                $descriptions.html( '' );
                refreshZoomNav();
                clearTimeout( loader );
                
                setTransitionDuration( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions.hideDuration );
                setTransitionTimingFunction( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions.hideTimingFunction );
                strHideEffect = getEffect( $.fn.jGalleryOptions.hideEffect );
                $zoom.addClass( 'zoom' );
                $zoom.find( 'img.active' ).parent().removeClass( 'visible' ).removeClass( strShowEffect ).addClass( 'after' ).addClass( strHideEffect );
                
                if ( $.fn.jGalleryOptions.title ) {
                    setTransitionDuration( $zoomTitle, $.fn.jGalleryOptions.titleHideDuration );
                    setTransitionTimingFunction( $zoomTitle, $.fn.jGalleryOptions.titleHideTimingFunction );
                    strTitleHideEffect = getEffect( $.fn.jGalleryOptions.titleHideEffect );
                    if ( typeof strTitleShowEffect != 'undefined' ) {
                        $zoomTitle.removeClass( strTitleShowEffect );
                    }
                    $zoomTitle.addClass( 'after ' + strTitleHideEffect );
                }
                showPhotoTimeout = setTimeout( function() {
                    var booIsLoaded = isLoaded( $a );
                    strShowEffect = getEffect( $.fn.jGalleryOptions.showEffect );
                    $zoom.find( 'img.active' ).parent().removeClass( 'after' ).removeClass( strHideEffect ).addClass( 'before' ).addClass( strShowEffect );
                    if ( ! booIsLoaded ) {
                        $zoom.append( '<div class="container pt-page before ' + strShowEffect + '"><img src="' + $a.attr( 'href' ) + '" /></div>' );
                    }   
                    $zoom.find( 'img' ).removeClass( 'active' ).parent().attr( 'class', 'container pt-page before ' + strShowEffect );
                    $zoomContainer.find( '[src="' + $a.attr( 'href' ) + '"]' ).addClass( 'active' );
                    if ( $.fn.jGalleryOptions.title && $imgThumb.is( '[alt]' ) ) {
                        strTitleShowEffect = getEffect( $.fn.jGalleryOptions.titleShowEffect );
                        $zoomTitle.removeClass( strTitleHideEffect ).addClass( strTitleShowEffect ).removeClass( 'after' ).addClass( 'before' );
                    }
                    if ( ! booIsLoaded || $.fn.jGalleryOptions.preloadAll ) {
                        $.fn.jGalleryOptions.preloadAll = false;
                        $zoomContainer.overlay( {'show': true, 'showLoader': true} );
                        $.fn.jGalleryOptions.beforeLoadPhoto();
                        loadPhoto( $zoom, $a );
                    }
                    else {
                        loadPhotoSuccess( $imgThumb );
                    }
                }, Math.max( parseFloat( $.fn.jGalleryOptions.hideDuration ) * 1000, parseFloat( $.fn.jGalleryOptions.titleHideDuration ) * 1000 ) );
            }
            
            function isLoaded( $a ) {
                return $zoom.find( 'img' ).filter( '[src="' + $a.attr( 'href' ) + '"]' ).length > 0;
            }
            
            function loadPhoto( $zoom, $a ) {
                var $imgThumb = $a.children( 'img' );
                var intPercent = 0;
                
                $zoom.jLoader( {
                    interval: 500,
                    skip: '.loaded',
                    start: function() {                        
                        $zoomContainer.find( '.overlay .imageLoaderPositionAbsolute:not(:has(.progress-value))' )
                            .append( '<span class="progress-value"></span>' );
                        $zoomContainer.find( '.progress-value' ).html( '0' );
                    },
                    success: function() {
                        $zoom.find( 'img' ).addClass( 'loaded' );
                        $zoomContainer.overlay( {'hide': true, 'hideLoader': true} );
                        clearInterval( loader );
                        $descriptions.html( $a.attr( 'data-description' ) );                                                    
                        loader = setTimeout( function() {
                            loadPhotoSuccess( $imgThumb );
                        }, 500 );
                    },
                    progress: function( data ) {
                        intPercent = data.percent;
                        $zoomContainer.find( '.overlay .imageLoaderPositionAbsolute' ).find( '.progress-value' ).html( intPercent );
                    }
                } );
            }
            
            function loadPhotoSuccess( $imgThumb ) {
                var $img = $zoom.find( 'img.active' );
                
                setTransitionDuration( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions.showDuration );
                setTransitionTimingFunction( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions.showTimingFunction );

                if ( $.fn.jGalleryOptions.title && $imgThumb.is( '[alt]' ) ) {
                    $zoomTitle.html( $imgThumb.attr( 'alt' ) ).removeClass( 'before' ).removeClass( 'after' );
                    setTransitionDuration( $zoomTitle, $.fn.jGalleryOptions.titleShowDuration );
                    setTransitionTimingFunction( $zoomTitle, $.fn.jGalleryOptions.titleShowTimingFunction );
                }
                
                $zoom.show().find( 'img.active' ).parent().removeClass( 'before' );
                fltZoomRatioWidthToHeight = $img.width() / $img.height();
                refreshZoomSize();
                refreshThumbsNav();
                if ( booSlideshowPlayed ) {
                    slideshowSetTimeout();
                }
                $.fn.jGalleryOptions.afterLoadPhoto();
                booLoadingInProgress = false;
                if ( $.fn.jGalleryOptions.autostart && $.fn.jGalleryOptions.slideshowAutostart && $.fn.jGalleryOptions.slideshow ) {
                    $.fn.jGalleryOptions.slideshowAutostart = false;
                    slideshowPlay();
                }
            }
            
            function showPhotoInit() {
                $( 'body' ).overlay( {'imageLoaderPositionAbsolute': true, 'fadeIn': false, 'show': true} );
                init();
            }

            function showPrevPhoto() {
                var $prev = $thumbnailsA.filter( '.active' ).prev( 'a' );
                if ( $prev.length == 1 ) {
                    showPhoto( $prev );
                }
            }

            function showNextPhoto() {
                var $next = $thumbnailsA.filter( '.active' ).next( 'a' );
                if ( $next.length == 1 ) {
                    showPhoto( $next );
                }
            }

            function showNextPhotoLoop() {
                var $next = $thumbnailsA.filter( '.active' ).next( 'a' );
                if ( $next.length == 0 ) {
                    $next = $albums.filter( '.active' ).find( 'a' ).eq( 0 );
                }
                showPhoto( $next );
            }

            function showRandomPhoto() {
                var $thumbnailsANotActive = $albums.filter( '.active' ).find( 'a:not(.active)' );
                showPhoto( $thumbnailsANotActive.eq( Math.floor( Math.random() * $thumbnailsANotActive.length ) ) );
            }
            
            function hideThumbs() {
                $thumbnails.addClass( 'hidden' );
                $thumbnailsA.addClass( 'hidden' );
            }
            
            function showThumbs() {                 
                if ( ! $thumbnails.is( '.hidden' ) ) {
                    return;
                }
                $thumbnails.removeClass( 'hidden' );
                if ( ! $thumbnails.is( '.loaded' ) ) {
                    $thumbnails.jLoader( {
                        start: function() {},
                        success: function(){
                            showNextThumb();
                            $thumbnails.addClass( 'loaded' );
                            $thumbnailsImg.each( function() {
                                var $image = $( this );

                                isHorizontal( $image ) ? $image.css( 'max-height', '100%' ) : $image.css( 'max-width', '100%' );
                            } );
                        }
                    } );
                }
                else {
                    showNextThumb();
                }
            }
            
            function showNextThumb() {
                $thumbnailsA.removeClass( 'hidden' );
                return;
                
                var $nextThumb = $thumbnailsA.filter( '.hidden' ).eq( 0 );
                setTimeout( function() {
                    $nextThumb.removeClass( 'hidden' );
                    if ( $nextThumb.length ) {
                        showNextThumb();
                    }
                }, 70 );
            }
            
            function setActiveThumb( $a ) {
                var $img = $a.find( 'img' );
                var $album = $albums.filter( '.active' );
                var $a = $album.find( 'img[src="' + $img.attr( 'src' ) + '"]' ).parent( 'a' );
                
                $thumbnails.find( 'a' ).removeClass( 'active' );
                $a.addClass( 'active' );
                if ( $album.find( 'a.active' ).length == 0 ) {
                    $album.find( 'a:first-child' ).eq( 0 ).addClass( 'active' );
                }
                thumbsCenter( $a );
            }
            
            function setActiveAlbum( $album ) {
                $albums.not( $album.get( 0 ) ).removeClass( 'active' );
                $album.addClass( 'active' );
                $menu.find( '.item' ).removeClass( 'active' ).filter( '[data-jgallery-album-title="' + $album.attr( 'data-jgallery-album-title' ) + '"]' ).addClass( 'active' );
            }
            
            function loaderInit()  {
                $loader = $( 'body > .overlay > [class*="imageLoader"]' );           
                if ( $.fn.jGalleryOptions.thumbnails ) {
                    if ( $.fn.jGalleryOptions.thumbnailsPosition == 'top' ) {
                        $loader.css( {
                            'margin-top': '+=' + $thumbnails.outerHeight( true ) / 2
                        } );
                    }
                    if ( $.fn.jGalleryOptions.thumbnailsPosition == 'bottom' ) {
                        $loader.css( {
                            'margin-top': '-=' + $thumbnails.outerHeight( true ) / 2
                        } );
                    }
                }
            }
            
            function slideshowPlayStop() {
                $slideshow.is( '.icon-play' ) ? slideshowPlay() : slideshowStop();
            }
            
            function slideshowPlay() {
                if ( booLoadingInProgress || booSlideshowPlayed ) {
                    return;
                }
                booSlideshowPlayed = true;
                $slideshow.removeClass( 'icon-play' ).addClass( 'icon-stop' );
                slideshowSetTimeout();
            }
            
            function slideshowStop() {
                $progress.pause();
                $slideshow.removeClass( 'icon-stop' ).addClass( 'icon-play' );
                booSlideshowPlayed = false;
            }
            
            function slideshowSetTimeout() {
                $progress.clear().start( $zoomContainer.width(), function() {
                    $progress.clear();
                    $.fn.jGalleryOptions.slideshowRandom ? showRandomPhoto() : showNextPhotoLoop();
                } );
            }
            
            function slideshowRandomToggle() {
                if ( $.fn.jGalleryOptions.slideshowRandom ) {
                    $random.removeClass( 'active' );
                    $.fn.jGalleryOptions.slideshowRandom = false;
                }
                else {
                    $random.addClass( 'active' );
                    $.fn.jGalleryOptions.slideshowRandom = true;                    
                }
            }
            
            if ( $.fn.jGalleryOptions.autostart ) {
                showPhoto( $this.find( 'a:has(img:first-child:last-child)' ).eq( 0 ) );
            }
            else {
                init();
            }

            $window.scroll( function() {
                refreshZoomSize();
                refreshThumbsNav();
            } );
            
            $window.resize( function() {
                refreshZoomSize();
                refreshThumbsNav();
            } );
            
            $( 'html' ).on( {
                keydown: function( event ) {
                    if ( $( '#jGallery' ).is( ':visible' ) ) {
                        if ( event.which == 27 ) {
                            event.preventDefault();
                            if ( $thumbnails.is( '.full-screen' ) ) {
                                changeThumbsViewToBar();
                                return;
                            }
                            hide();
                        }
                        if ( event.which == 37 ) {
                            event.preventDefault();
                            showPrevPhoto();
                        }
                        if ( event.which == 39 ) {
                            event.preventDefault();
                            showNextPhoto();
                        }
                    }
                },
                click: function() {
                    hideAlbumsMenu();
                }
            } );
        }
        
        return this.each( function() {
            jGallery( $( this ) );
        } );
    };   
    
    $.fn.overlay = function( options ) {
        var defaults = {
            'show': false,
            'hide': false,
            'showLoader': false,
            'hideLoader': false,
            'fadeIn': true,
            'fadeOut': true,
            'fadeInLoader': true,
            'fadeOutLoader': true
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
                        height: $this.is( 'body' ) ? $( 'html' ).outerHeight() : $this.outerHeight()
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
    
    $.fn.jLoader = function( options ) {
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

       function isCrossDomain( strUrl ) {
            return ( /https?\:\/\//.exec( strUrl ) );
       }

       this.each( function() {
           var $this = $( this );
           var $tmp = $();
           var $images = $();
           var timeout;
           var intCount = 0;

           function check() {
               var boolComplete = true;
               var intI = 0;
               var intComplete = 0;
               var intPercent;

               $images.each( function() {
                    intI++;
                    if ( $( this )[0].complete ) {
                        intComplete++;
                    }
                    else {
                        boolComplete = false;
                    }
                    if ( intI == intCount ) {
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
               } );
           }

           function checkOne() {
                var $image = $images.eq( 0 );
                var client = new XMLHttpRequest();
                                
                client.open( "GET", $image.attr( 'src' ) );
                client.onprogress = function( event ) {
                    if( event.lengthComputable ) {
                        options.progress( {
                            percent: parseInt( event.loaded / event.total * 100 )
                        } );
                    }
                };
                client.onloadend = function() {
                    $tmp.remove();
                    options.success();
                };
                client.send();
           }

           $this.append( '<div class="jLoaderTmp" style="position: absolute; width: 0; height: 0; line-height: 0; font-size: 0; visibility: hidden; overflow: hidden; z-index: -1;"></div>' );
           $tmp = $this.children( '.jLoaderTmp:last-child' );

           $( $this ).add( $this.find( '*' ) ).each( function() {
               var strBackgroundUrl;

               if ( ! $( this ).is( options.skip ) ) {
                   return;
               }

               if ( $( this ).css( 'background-image' ) != 'none' ) {
                    strBackgroundUrl = $( this ).css( 'background-image' );
                    if ( /url/.exec( strBackgroundUrl ) ) {
                         strBackgroundUrl = strBackgroundUrl.replace( '"', '' ).replace( "'", '' ).replace( ' ', '' ).replace( 'url(', '' ).replace( ')', '' );
                         $tmp.append( '<img src="' + strBackgroundUrl + '">' );
                    }
               }
           } );

           $images = $this.find( 'img' ).not( options.skip );
           if ( $this.is( 'img' ) ) {
               if ( ! $this.is( options.skip ) ) {
                   $images = $images.add( $this );
               }
           }
           intCount = parseInt( $images.length );
           options.start();
           intCount == 1 && ! isCrossDomain( $images.eq( 0 ).attr( 'src' ) ) && document.location.hostname != '' ? checkOne() : check();
       } );
   };

} ) ( jQuery );