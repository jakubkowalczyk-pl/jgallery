/*!
 * jGallery v0.9.6
 * http://jgallery.jakubkowalczyk.pl/
 *
 * Released under the MIT license
 *
 * Date: 2013-11-22 
 */
( function( $ ) {
    "use strict";
    var defaults = {
        'autostart': false,
        'canClose': true,
        'canResize': true,
        'backgroundColor': '#000',
        'textColor': '#fff',
        'thumbnails': true,
        'thumbnailsFullScreen': true,
        'thumbType': 'image', // [ image | square | number ]
        'thumbnailsPosition': 'bottom', // [ top | bottom | left | right ]
        'thumbWidth': 100, //px
        'thumbHeight': 100, //px
        'thumbWidthOnFullScreen': 100, //px
        'thumbHeightOnFullScreen': 100, //px
        'showEffect': 'rotate-room-right', // [ rotate-room-right | rotate-room-left | rotate-room-up | rotate-room-down ] http://jgallery.jakubkowalczyk.pl/demo.php
        'hideEffect': 'rotate-room-right', //[ rotate-room-right | rotate-room-left | rotate-room-up | rotate-room-down ] http://jgallery.jakubkowalczyk.pl/demo.php
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
        'disabledOnIE7AndOlder': true,
        'initGallery': function() {},
        'showPhoto': function() {},
        'beforeLoadPhoto': function() {},
        'afterLoadPhoto': function() {},
        'showGallery': function() {},
        'closeGallery': function() {}
    };
       
    
    
    var $head;
    var $body;
    $( function() {
        $head = $( 'head' );
        $body = $( 'body' );
    } );
    var $window = $( window );      
    var effects = [ 'slide-up', 'slide-down', 'slide-right', 'slide-left', 'slide-up-left', 'slide-up-right', 'slide-down-left', 'slide-down-right', 'fade' ];
    var intCountEffects = effects.length;
    
    
    
    var Progress = function( $this, intJgalleryId ) {
        this.intJgalleryId = intJgalleryId;
        this.$element = $this;
    };

    Progress.prototype = {
        clear: function() {            
            this.$element.stop( false, true ).css( {width: 0} );
            return this;         
        },
        
        start: function( intWidth, success ) {            
            this.$element.animate( {
                width: intWidth
            }, parseInt( $.fn.jGalleryOptions[ this.intJgalleryId ].slideshowInterval ) * 1000, 'linear', success );
            return this;    
        },
        
        pause: function() {
            this.$element.stop( true );
            this.clear();
            return this;
        }         
    }; 
    


    var IconChangeAlbum = function( $this ) {
        
        this.$element = $this;
        this.$title = this.$element.find( '.title' );
    };

    IconChangeAlbum.prototype = {
        bindEvents: function( $albums, setActiveAlbum ) {
            var self = this;
          
            this.getElement().on( {
                click: function( event ) {
                    self.menuToggle();
                    event.stopPropagation();
                }
            } );
            this.getItemsOfMenu().on( {
                click: function() {
                    var $this = $( this );

                    if ( $this.is( '.active' ) ) {
                        return;
                    }
                    setActiveAlbum( $albums.filter( '[data-jgallery-album-title="' + $this.attr( 'data-jgallery-album-title' ) + '"]' ) );
                }
            } );
            $( 'html' ).on( 'click', function(){ self.menuHide() } );  
        },
        
        setTitle: function( strTitle ) {
            this.$title.html( strTitle );
        },
        
        getTitle: function() {
            return this.$title.html();
        },

        getListOfAlbums: function() {
            return this.getElement().find( '.menu' );
        },

        getElement: function() {
            return this.$element;
        },

        getItemsOfMenu: function() {
            return this.getListOfAlbums().find( '.item' );
        },

        appendToMenu: function( strHtml ) {
            this.getListOfAlbums().append( strHtml );
        },

        menuToggle: function() {
            this.getElement().toggleClass( 'active' );
        },

        menuHide: function() {
            this.getElement().removeClass( 'active' );
        } 
    };



    var ThumbnailsGenerator = function( $this, booIsAlbums ) {
        this.$element = $this;
        this.booIsAlbums = booIsAlbums;
        this.$tmp;
        this.intI = 1;
        this.intJ = 1;
        this.intNo;
        this.$thumbnailsContainerInner = $( '.jgallery' ).eq( -1 ).find( '.thumbnails .container-inner' );
        this.start();
    };

    ThumbnailsGenerator.prototype = {
        start: function() {
            var self = this;

            $( 'body' ).append( '<div id="jGalleryTmp" style="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: -1; overflow: hidden;">' + this.$element.html() + '</div>' );
            this.$tmp = $( '#jGalleryTmp' );
            if ( this.booIsAlbums ) {
                this.$tmp.find( '.album:has(a:has(img:first-child:last-child))' ).each( function() {
                    self.insertAlbum( $( this ) );
                } );
            }
            else {
                this.insertImages( this.$tmp, this.$thumbnailsContainerInner );                    
            }
            this.$tmp.remove();
        },
        
        insertAlbum: function( $this ) {
            var strTitle = $this.is( '[data-jgallery-album-title]' ) ? $this.attr( 'data-jgallery-album-title' ) : 'Album ' + this.intJ;
            var $album = this.$thumbnailsContainerInner.append( '<div class="album" data-jgallery-album-title="' + strTitle + '"></div>' ).children( ':last-child' );

            if ( this.intJ == 1 ) {
                $album.addClass( 'active' );
            }
            this.insertImages( $this, $album );
            this.intJ++;
        },

        insertImages: function( $images, $container ) {
            var self = this;

            this.intNo = 1;
            $images.find( 'a:has(img:first-child:last-child)' ).each( function() {
                self.insertImage( $( this ), $container );
            } );            
        },

        insertImage: function( $image, $container ) {
            $container.append( $image.addClass( 'hidden' ) );
            $container.children( ':last-child' ).attr( 'data-jgallery-photo-id', this.intI++ ).attr( 'data-jgallery-number', this.intNo++ );
        }
    };
    


    var Thumbnails = function( $jGallery ) {
        this.$element = $jGallery.find( '.thumbnails' );
        this.$a = this.getElement().find( 'a' );
        this.$img = this.getElement().find( 'img' );
        this.$container = this.getElement().find( '.container' );
        this.$albums = this.getElement().find( '.album' );
        this.$btnNext = this.getElement().children( '.next' );
        this.$btnPrev = this.getElement().children( '.prev' );
        this.intJgalleryId = $jGallery.attr( 'data-jgallery-id' );
        this.isJgalleryInitialized = $jGallery.is( '[data-jgallery-id]' );
    };
    
    Thumbnails.prototype = {
        getElement: function() {
            return this.$element;
        },
        
        init: function() {
            this.getElement().removeClass( 'square number images thumbnails-left thumbnails-right thumbnails-top thumbnails-bottom thumbnails-horizontal thumbnails-vertical' );
            this.getElement().addClass( 'thumbnails-' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition );
            if ( this.isVertical() ) {
                this.getElement().addClass( 'thumbnails-vertical' );                    
            }
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'thumbnails-horizontal' );                    
            }   
            if ( $.fn.jGalleryOptions[ this.intJgalleryId ].thumbType == 'image' ) {
                this._initImages();
            }
            if ( $.fn.jGalleryOptions[ this.intJgalleryId ].thumbType == 'square' ) {
                this._initSquare();
            }
            if ( $.fn.jGalleryOptions[ this.intJgalleryId ].thumbType == 'number' ) {
                this._initNumber();
            }
        },

        show: function() {
            var self = this;
            
            if ( ! this.getElement().is( '.hidden' ) ) {
                return;
            }
            this.getElement().removeClass( 'hidden' );
            if ( ! this.getElement().is( '.loaded' ) ) {
                this.getElement().jLoader( {
                    start: function() {},
                    success: function(){
                        self._showNextThumb();
                        self.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
                        self.getElement().addClass( 'loaded' );
                        self.$img.each( function() {
                            var $image = $( this );

                            isHorizontal( $image ) ? $image.css( 'max-height', '100%' ) : $image.css( 'max-width', '100%' );
                        } );
                    }
                } );
            }
            else {
                this._showNextThumb();
                this.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
            }
        },
        
        hide: function() {
            this.getElement().addClass( 'hidden' ).find( 'a' ).addClass( 'hidden' );
        },

        isHorizontal: function() {
            return $.fn.jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition == 'top' || $.fn.jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition == 'bottom';
        },

        isVertical: function() {
            return $.fn.jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition == 'left' || $.fn.jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition == 'right';
        },

        isFullScreen: function() {
            return this.getElement().is( '.full-screen' );
        },
        
        refreshNavigation: function() {
            if ( this.isVertical() || this.isFullScreen() ) {
                this._refreshVerticalNavigation();
            }
            else if ( this.isHorizontal() ) {
                this._refreshHorizontalNavigation();
            }
        },

        center: function( $a ) {
            if ( this.isHorizontal() ) {
                this._horizontalCenter( $a );
            }
            if ( this.isVertical() ) {
                this._verticalCenter( $a );
            }
        },

        _initSquare: function() {
            this.getElement().addClass( 'square' );
        },

        _initNumber: function() {
            this.getElement().addClass( 'number' );
            this._initSquare();
        },

        _initImages: function() {
            this.getElement().addClass( 'images' );
            $( 'head' ).append( '\
                <style type="text/css">\n\
                    .jgallery .thumbnails a {\n\
                        width: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbWidth + 'px;\n\
                        height: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                        font-size: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                    }\n\
                    .jgallery .thumbnails.full-screen a {\n\
                        width: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbWidthOnFullScreen + 'px;\n\
                        height: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeightOnFullScreen + 'px;\n\
                        font-size: ' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeightOnFullScreen + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-horizontal {\n\
                        height: ' + parseInt( $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeight + 2 ) + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-vertical {\n\
                        width: ' + parseInt( $.fn.jGalleryOptions[ this.intJgalleryId ].thumbWidth + 2 ) + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-top.hidden {\n\
                        top: -' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-bottom.hidden {\n\
                        bottom: -' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-left.hidden {\n\
                        left: -' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbWidth + 'px;\n\
                    }\n\
                    .jgallery .thumbnails-right.hidden {\n\
                        right: -' + $.fn.jGalleryOptions[ this.intJgalleryId ].thumbWidth + 'px;\n\
                    }\n\
                </style>\n\
            ' ); 
            if ( this.isJgalleryInitialized ) {
                return;
            }
            this.hide();
        }, 

        _showNextThumb: function() {
            var self = this;
            var $nextThumb = this.$a.parent( '.active' ).children( '.hidden' ).eq( 0 );
            
            setTimeout( function() {
                $nextThumb.removeClass( 'hidden' );
                if ( $nextThumb.length ) {
                    self._showNextThumb();
                }
            }, 70 );
        },

        _horizontalCenter: function( $a ) {
            var self = this;
            
            if ( $a.length !== 1 ) {
                return;
            }            
            this.$container.stop( false, true ).animate( {
                'scrollLeft': $a.position().left - this.$container.scrollLeft() * -1 - $a.outerWidth() / -2 - this.$container.outerWidth() / 2
            }, function() {
                self.refreshNavigation();
            } );
        },

        _verticalCenter: function( $a ) {
            var self = this;
            
            if ( $a.length !== 1 ) {
                return;
            }
            this.$container.stop( false, true ).animate( {
                'scrollTop': $a.position().top - this.$container.scrollTop() * -1 - $a.outerHeight() / -2 - this.$container.outerHeight() / 2
            }, function() {
                self.refreshNavigation();
            } );
        },

        _refreshHorizontalNavigation: function() {
            var $album = this.getElement().find( 'div.active' );
            var intThumbsWidth = $.fn.jGalleryOptions[ this.intJgalleryId ].thumbType == 'image' ? this.$a.outerWidth( true ) * $album.find( 'img' ).length : this.$a.outerWidth( true ) * $album.find( 'a' ).length;

            this.$container.scrollLeft() > 0 ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            intThumbsWidth > this.$container.width() + this.$container.scrollLeft() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
        },

        _refreshVerticalNavigation: function() {
            this.$container.scrollTop() > 0 ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            this.$container.find( '.container-inner' ).height() > this.$container.height() + this.$container.scrollTop() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
        }
    };
    
    
    
    function jGallery( $this, options ) {
        var loader;
        var $jGallery;
        var $prev;
        var $next;
        var $resize;
        var $progress;
        var $slideshow = $();
        var $random = $();
        var $thumbsChangeViewToFullScreen;
        var iconChangeAlbum;
        var thumbnails;
        var $thumbnailsContainer;
        var $thumbnailsPrev;
        var $thumbnailsNext;
        var $thumbnailsA;
        var $thumbnailsImg;
        var $thumbnailsClose;
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
        var booLoadedAll = false;
        var intId = parseInt( $( '.jgallery' ).length + 1 );
        var self = this;

        function initialized() {
            return $this.is( '[data-jgallery-id]' );
        }

        if ( initialized() ) {
            intId = $this.attr( 'data-jgallery-id' );
        }
        $.fn.jGalleryOptions[ intId ] = initialized() ? $.extend( $.fn.jGalleryOptions[ intId ], options ) : $.extend( {}, defaults, options );
        if ( $.fn.jGalleryOptions[ intId ].disabledOnIE7AndOlder && isInternetExplorer7AndOlder() ) {
            return;
        }

        function setUserOptions() {
            $resize = $zoomContainer.find( '.resize' );
            $.fn.jGalleryOptions[ intId ].canResize ? $resize.show() : $resize.hide();
            $.fn.jGalleryOptions[ intId ].canClose ? $zoomContainer.find( '.close' ).show() : $zoomContainer.find( '.close' ).hide();
            if ( ! $.fn.jGalleryOptions[ intId ].thumbnails ) {
                thumbnails.getElement().hide();
                $.fn.jGalleryOptions[ intId ].thumbnailsPosition = '';
            }
            else {
                thumbnails.getElement().show();
                if ( $.fn.jGalleryOptions[ intId ].thumbnailsPosition == '' ) {
                    $.fn.jGalleryOptions[ intId ].thumbnailsPosition = defaults.thumbnailsPosition;
                }                    
            }
            $slideshow = $zoomContainer.find( '.slideshow' );
            $.fn.jGalleryOptions[ intId ].slideshow ? $slideshow.show() : $slideshow.hide();
            $random = $zoomContainer.find( '.random' );
            $.fn.jGalleryOptions[ intId ].slideshow && $.fn.jGalleryOptions[ intId ].slideshowCanRandom ? $random.show(): $random.hide();
            $.fn.jGalleryOptions[ intId ].slideshow && $.fn.jGalleryOptions[ intId ].slideshowCanRandom && $.fn.jGalleryOptions[ intId ].slideshowRandom ? $random.addClass( 'active' ) : $random.removeClass( 'active' );

            $thumbsChangeViewToFullScreen = $zoomContainer.find( '.full-screen' );
            $thumbnailsClose = thumbnails.getElement().find( '.close' );

            $.fn.jGalleryOptions[ intId ].thumbnailsFullScreen ? $thumbsChangeViewToFullScreen.add( $thumbnailsClose ).show() : $thumbsChangeViewToFullScreen.add( $thumbnailsClose ).hide();
            $.fn.jGalleryOptions[ intId ].thumbnailsFullScreen ? $zoomContainer.find( '.change-album' ).show() : $zoomContainer.find( '.change-album' ).hide();

            $head.append( getCssForColours( {
                strBg: $.fn.jGalleryOptions[ intId ].backgroundColor,
                strText: $.fn.jGalleryOptions[ intId ].textColor
            } ) );
        }

        function setVariables() {
            $jGallery = $( '.jgallery' ).filter( '[data-jgallery-id="' + intId + '"]' );
            $zoomContainer = $jGallery.children( '.zoom-container' );
            $zoomTitle = $zoomContainer.children( '.title' );
            $prev = $zoomContainer.children( '.prev' );
            $next = $zoomContainer.children( '.next' );
            $zoom = $zoomContainer.children( '.zoom' );
            $progress = new Progress( $zoomContainer.children( '.progress' ), intId );
            thumbnails = new Thumbnails( $jGallery );
            $thumbnailsContainer = thumbnails.getElement().find( '.container' );
            $thumbnailsPrev = thumbnails.getElement().children( '.prev' );
            $thumbnailsNext = thumbnails.getElement().children( '.next' );
            $thumbnailsA = thumbnails.getElement().find( 'a' );
            $thumbnailsImg = thumbnails.getElement().find( 'img' );
            $albums = thumbnails.getElement().find( '.album' );
            if ( $albums.length == 0 ) {
                $albums = thumbnails.getElement().find( '.container-inner' ).addClass( 'active' );                    
            }
        }

        if ( initialized() ) {
            setVariables();
            loadAll();
            thumbnails.init();
            setUserOptions();
            return;
        }

        function init() {
            $.fn.jGalleryOptions[ intId ].initGallery();
            $this.attr( 'data-jgallery-id', intId );
            $( 'body' ).append( '\
                <div class="jgallery" style="display: none;" data-jgallery-id="' + intId + '">\
                    <div class="thumbnails hidden">\
                        <div class="container"><div class="container-inner"></div></div>\
                        <span class="prev btn hidden"><span class="icon-chevron-left ico"></span></span>\
                        <span class="next btn hidden"><span class="icon-chevron-right ico"></span></span>\
                    </div>\
                    <div class="zoom-container">\
                        <div class="title before"></div>\
                        <div id="pt-main" class="zoom before pt-perspective">\
                            <div class="left" />\
                            <div class="right" />\
                        </div>\
                        <span class="icon-chevron-left prev btn btn-large"></span>\
                        <span class="icon-chevron-right next btn btn-large"></span>\
                        <span class="progress"></span>\
                        <div class="nav"></div>\
                        <div class="nav-bottom"></div>\
                        <canvas id="canvas" width="1920" height="1200"></canvas>\
                    </div>\
                </div>' );
            //generateThumbs();
            new ThumbnailsGenerator( $this, booIsAlbums );
            setVariables();
            loadAll();
            thumbnails.init();
            $zoomContainer.find( '.nav' ).append( '<span class="icon- resize btn btn-small"></span>' );
            $zoomContainer.find( '.nav' ).append( '<span class="icon-remove close btn btn-small"></span>' );
            $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-play slideshow btn btn-small"></span>' );
            $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-random random btn btn-small inactive"></span>' );
            $zoomContainer.find( '.nav-bottom' ).append( '<span class="icon- icon-th full-screen btn btn-small"></span>' );
            thumbnails.getElement().append( '<span class="icon- icon-remove btn close btn-small"></span>' );

            ( function() {                    
                if ( booIsAlbums ) {
                    $zoomContainer.find( '.nav-bottom' ).append( '\
                        <span class="icon- icon-list-ul change-album btn btn-small">\
                            <span class="menu btn"></span>\
                            <span class="title"></span>\
                        </span>\
                    ' );
                    iconChangeAlbum = new IconChangeAlbum( $zoomContainer.find( '.change-album' ) );
                    $albums.each( function() {
                        var strTitle = $( this ).attr( 'data-jgallery-album-title' );

                        iconChangeAlbum.appendToMenu( '<span class="item" data-jgallery-album-title="' + strTitle + '">' + strTitle + '</span>' );
                    } );
                    thumbnails.getElement().append( iconChangeAlbum.getElement().outerHtml() );
                    iconChangeAlbum = new IconChangeAlbum( iconChangeAlbum.getElement().add( thumbnails.getElement().children( ':last-child' ) ) );
                    iconChangeAlbum.bindEvents( $albums, setActiveAlbum );
                }
            } )();

            setUserOptions();
            if ( $.fn.jGalleryOptions[ intId ].zoomSize == 'fitToWindow' ) {
                $resize.addClass( 'icon-resize-full' );
            }
            if ( $.fn.jGalleryOptions[ intId ].zoomSize == '100%' ) {
                $resize.addClass( 'icon-resize-small' );
            }
            detectingAvailableCssProporties();
            thumbnails.refreshNavigation();
            refreshZoomNav();
            refreshZoomContainerSize();
            addEventsHandlers();
        }

        function addEventsHandlers() {  
            $this.find( 'a' ).on( {
                click: function( event ) {
                    var $this = $( this );

                    event.preventDefault();
                    setActiveAlbum( $albums.filter( '[data-jgallery-album-title="' + $this.parents( '[data-jgallery-album-title]' ).attr( 'data-jgallery-album-title' ) + '"]' ) );
                    showPhoto( $this );
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
                    else if ( thumbnails.isFullScreen() ) {
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

            $prev.add( $zoom.find( '.left' ) ).on( {
                click: function() {
                    slideshowStop();
                    showPrevPhoto();
                }
            } );

            $next.add( $zoom.find( '.right' ) ).on( {
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
        }

        function loadAll() {
            if ( ! $.fn.jGalleryOptions[ intId ].preloadAll ) {
                return;
            }                
            $thumbnailsA.each( function() {
                var $a = $( this );
                if ( ! isLoaded( $a ) ) {
                    $zoom.append( '<div class="container pt-page before ' + getEffect( $.fn.jGalleryOptions[ intId ].showEffect ) + '"><img src="' + $a.attr( 'href' ) + '" /></div>' );
                }
            } );
        }

        function detectingAvailableCssProporties() {
            if ( ! isInternetExplorer() ) {
                $jGallery.addClass( 'text-shadow' );
            }
        }

        function getCanvasRatioWidthToHeight() {
            var intCanvasWidth;
            var intCanvasHeight;
            if ( thumbnails.isHorizontal() ) {
                intCanvasWidth = $jGallery.width();
                intCanvasHeight = $jGallery.height() - thumbnails.getElement().outerHeight( true );
            }
            else if ( thumbnails.isVertical() ) {
                intCanvasWidth = $jGallery.width() - thumbnails.getElement().outerWidth( true );
                intCanvasHeight = $jGallery.height();
            }
            else {
                intCanvasWidth = $jGallery.width();
                intCanvasHeight = $jGallery.height();                    
            }
            return intCanvasWidth / intCanvasHeight;
        }

        function refreshZoomContainerSize() {
            var intNavBottomHeight = $zoomContainer.find( '.nav-bottom' ).outerHeight();

            $zoomContainer.css( {
                'width': thumbnails.isVertical() ? $jGallery.width() - thumbnails.getElement().outerWidth( true ) : 'auto',
                'height': thumbnails.isHorizontal() ? $jGallery.height() - thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : $jGallery.height() - intNavBottomHeight,
                'margin-top': $.fn.jGalleryOptions[ intId ].thumbnailsPosition == 'top' ? thumbnails.getElement().outerHeight( true ) : 0,
                'margin-left': $.fn.jGalleryOptions[ intId ].thumbnailsPosition == 'left' ? thumbnails.getElement().outerWidth( true ) : 0,
                'margin-right': $.fn.jGalleryOptions[ intId ].thumbnailsPosition == 'right' ? thumbnails.getElement().outerWidth( true ) : 0
            } );
        }

        function zoomFitToWindow() {
            var $img = $zoom.find( 'img.active' );
            var intNavBottomHeight = $zoomContainer.find( '.nav-bottom' ).outerHeight();

            $img.css( {
                'width': 'auto',
                'height': 'auto',
                'min-width': 0,
                'min-height': 0,
                'max-width': thumbnails.isVertical() ? $jGallery.width() - thumbnails.getElement().outerWidth( true ) : $jGallery.width(),
                'max-height': thumbnails.isHorizontal() ? $jGallery.height() - thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : $jGallery.height() - intNavBottomHeight
            } );                
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );
            $resize.addClass( 'icon-resize-full' ).removeClass( 'icon-resize-small' );
        }

        function zoom100Percent() {
            var $img = $zoom.find( 'img.active' );
            var intNavBottomHeight = $zoomContainer.find( '.nav-bottom' ).outerHeight();

            $img.css( {
                'max-width': 'none',
                'max-height': 'none',                    
                'min-width': thumbnails.isVertical() ? $jGallery.width() - thumbnails.getElement().outerWidth( true ) : $jGallery.width(),
                'min-height': thumbnails.isHorizontal() ? $jGallery.height() - thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : $jGallery.height() - intNavBottomHeight
            } );
            if ( fltZoomRatioWidthToHeight / getCanvasRatioWidthToHeight() > 1 ) {
                $img.css( {
                    'width': 'auto',
                    'height': thumbnails.isHorizontal() ? $jGallery.height() - thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : $jGallery.height() - intNavBottomHeight
                } );                        
            }
            else {
                $img.css( {
                    'width': thumbnails.isVertical() ? $jGallery.width() - thumbnails.getElement().outerWidth( true ) : $jGallery.width(),
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
            if ( thumbnails.isFullScreen() ) {
                return;
            }
            refreshZoomContainerSize();
            if ( $.fn.jGalleryOptions[ intId ].zoomSize == 'fitToWindow' ) {
                zoomFitToWindow();
            }
            else if ( $.fn.jGalleryOptions[ intId ].zoomSize == '100%' ) {
                zoom100Percent();
            }
            $zoom.addClass( 'visible' );
        }

        function toggleZoomSize() {
            var $img = $zoom.find( 'img.active' );

            $img.stop( false, true ).fadeOut( parseFloat( $.fn.jGalleryOptions[ intId ].showDuration ) * 1000, function() {
                if ( $.fn.jGalleryOptions[ intId ].zoomSize == 'fitToWindow' ) {
                    $.fn.jGalleryOptions[ intId ].zoomSize = '100%';
                    zoom100Percent();
                }
                else if ( $.fn.jGalleryOptions[ intId ].zoomSize == '100%' ) {
                    $.fn.jGalleryOptions[ intId ].zoomSize = 'fitToWindow';
                    zoomFitToWindow();
                }
                $img.fadeIn( parseFloat( $.fn.jGalleryOptions[ intId ].hideDuration ) * 1000 );
            } );
        }

        function refreshZoomNav() {
            var $thumbActive = thumbnails.getElement().find( 'div.active a.active' );
            
            $thumbActive.prev( 'a' ).length == 1 ? $prev.removeClass( 'hidden' ) : $prev.addClass( 'hidden' );
            $thumbActive.next( 'a' ).length == 1 ? $next.removeClass( 'hidden' ) : $next.addClass( 'hidden' );
        }

        function scrollPrevThumbs() {
            if ( thumbnails.isVertical() || thumbnails.isFullScreen() ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollTop': "-=" + $window.height() * 0.7
                }, function() {
                    thumbnails.refreshNavigation();
                } );
            } 
            else if ( thumbnails.isHorizontal() ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollLeft': "-=" + $window.width() * 0.7
                }, function() {
                    thumbnails.refreshNavigation();
                } );
            }
        }

        function scrollNextThumbs() {
            if ( thumbnails.isVertical() || thumbnails.isFullScreen() ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollTop': "+=" + $window.height() * 0.7
                }, function() {
                    thumbnails.refreshNavigation();
                } );                
            }
            else if ( thumbnails.isHorizontal() ) {
                $thumbnailsContainer.stop( false, true ).animate( {
                    'scrollLeft': "+=" + $window.width() * 0.7
                }, function() {
                    thumbnails.refreshNavigation();
                } );
            }
        }

        function changeThumbsViewToFullScreen() {
            slideshowStop();
            thumbnails.getElement().addClass( 'full-screen' );
            if ( thumbnails.isHorizontal() ) {
                thumbnails.getElement().addClass( 'thumbnails-vertical' ).removeClass( 'thumbnails-horizontal' );                    
            }
            thumbnails._refreshVerticalNavigation();
        }

        function changeThumbsViewToBar() {
            thumbnails.getElement().removeClass( 'full-screen' );
            if ( thumbnails.isHorizontal() ) {
                thumbnails.getElement().addClass( 'thumbnails-horizontal' ).removeClass( 'thumbnails-vertical' );                    
            }
            refreshZoomSize();
            thumbnails.refreshNavigation();
        }

        function hide() {
            if ( ! $.fn.jGalleryOptions[ intId ].canClose ) {
                return;
            }
            $jGallery.filter( ':visible' ).stop( false, true ).addClass( 'hidden' ).fadeOut( 500, function() {   
                $body.css( {
                    'overflow': 'visible'
                } );
            } );
            booLoadingInProgress = false;
            clearTimeout( showPhotoTimeout );
            $zoom.hide().removeAttr( 'src' );
            $zoomContainer.find( 'img.active' ).removeClass( 'active' );
            $zoomTitle.addClass( 'hidden' );
            $prev.addClass( 'hidden' );
            $next.addClass( 'hidden' );
            thumbnails.hide();
            slideshowStop();
            $body.overlay( {'hide': true} );
            $window.off( 'scroll resize', refreshZoomSize );
            $window.off( 'scroll resize', function() { thumbnails.refreshNavigation(); } ); 
            $.fn.jGalleryOptions[ intId ].closeGallery();
        }

        function show() {
            $window.on( 'scroll resize', refreshZoomSize );
            $window.on( 'scroll resize', function() { thumbnails.refreshNavigation(); } );            
            $body.css( {
                'overflow': 'hidden'
            } );
            if ( typeof $loader == 'undefined' ) {
                loaderInit();
            }
            $jGallery.not( ':visible' ).removeClass( 'hidden' ).stop( false, true ).fadeIn( 500 );
            thumbnails.show();
            refreshZoomContainerSize();
            $body.overlay( {'show': true, 'showLoader': false} );
            $zoomTitle.removeClass( 'hidden' );  
            $.fn.jGalleryOptions[ intId ].showGallery();
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
            $.fn.jGalleryOptions[ intId ].showPhoto();
            if ( $jGallery.is( ':not(:visible)' ) ) {
                show();
            }
            changeThumbsViewToBar();
            if ( booIsAlbums ) {
                if ( iconChangeAlbum.getTitle() == '' ) {
                    iconChangeAlbum.setTitle( $a.parents( '.album' ).eq( 0 ).attr( 'data-jgallery-album-title' ) );
                }
            }
            setActiveThumb( $a );
            if ( $zoom.find( 'img.active' ).attr( 'src' ) === $a.attr( 'href' ) ) {
                booLoadingInProgress = false;
                return;
            }
            refreshZoomNav();
            clearTimeout( loader );

            setTransitionDuration( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions[ intId ].hideDuration );
            setTransitionTimingFunction( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions[ intId ].hideTimingFunction );
            strHideEffect = getEffect( $.fn.jGalleryOptions[ intId ].hideEffect );
            $zoom.addClass( 'zoom' );
            $zoom.find( 'img.active' ).parent().removeClass( 'visible' ).removeClass( strShowEffect ).addClass( 'after' ).addClass( strHideEffect );
            strShowEffect = getEffect( $.fn.jGalleryOptions[ intId ].showEffect );
            $zoom.find( 'img:not(.active)' ).parent().attr( 'class', 'container pt-page before ' + strShowEffect );

            if ( $.fn.jGalleryOptions[ intId ].title ) {
                setTransitionDuration( $zoomTitle, $.fn.jGalleryOptions[ intId ].titleHideDuration );
                setTransitionTimingFunction( $zoomTitle, $.fn.jGalleryOptions[ intId ].titleHideTimingFunction );
                strTitleHideEffect = getEffect( $.fn.jGalleryOptions[ intId ].titleHideEffect );
                if ( typeof strTitleShowEffect != 'undefined' ) {
                    $zoomTitle.removeClass( strTitleShowEffect );
                }
                $zoomTitle.addClass( 'after ' + strTitleHideEffect );
            }
            showPhotoTimeout = setTimeout( function() {
                var booIsLoaded = isLoaded( $a );
                if ( ! booIsLoaded ) {
                    $zoom.append( '<div class="container pt-page before ' + strShowEffect + '"><img src="' + $a.attr( 'href' ) + '" /></div>' );
                }   
                $zoomContainer.find( 'img.active' ).removeClass();
                $zoomContainer.find( '[src="' + $a.attr( 'href' ) + '"]' ).addClass( 'active' ).parent().addClass( strShowEffect );
                if ( $.fn.jGalleryOptions[ intId ].title && $imgThumb.is( '[alt]' ) ) {
                    strTitleShowEffect = getEffect( $.fn.jGalleryOptions[ intId ].titleShowEffect );
                    $zoomTitle.removeClass( strTitleHideEffect ).addClass( strTitleShowEffect ).removeClass( 'after' ).addClass( 'before' );
                }
                if ( ! booIsLoaded || ( $.fn.jGalleryOptions[ intId ].preloadAll && ! booLoadedAll ) ) {
                    booLoadedAll = true;
                    $zoomContainer.overlay( {'show': true, 'showLoader': true} );
                    $.fn.jGalleryOptions[ intId ].beforeLoadPhoto();
                    loadPhoto( $zoom, $a );
                }
                else {
                    loadPhotoSuccess( $imgThumb );
                }
            }, Math.max( parseFloat( $.fn.jGalleryOptions[ intId ].hideDuration ) * 1000, parseFloat( $.fn.jGalleryOptions[ intId ].titleHideDuration ) * 1000 ) );
        }

        function isLoaded( $a ) {
            return $zoom.find( 'img' ).filter( '[src="' + $a.attr( 'href' ) + '"]' ).length > 0;
        }

        function loadPhoto( $zoom, $a ) {
            var $imgThumb = $a.children( 'img' );
            var intPercent = 0;
            var $toLoading = $.fn.jGalleryOptions[ intId ].preloadAll ? $zoom : $zoom.find( 'img.active' );

            $toLoading.jLoader( {
                interval: 500,
                skip: '.loaded',
                start: function() {   
                    if ( $.fn.jGalleryOptions[ intId ].preloadAll ) {
                        $zoomContainer.find( '.overlay .imageLoaderPositionAbsolute:not(:has(.progress-value))' ).addClass( 'preloadAll' )
                            .append( '<span class="progress-value"></span>' );
                        $zoomContainer.find( '.progress-value' ).html( '0' );
                    }
                    else {
                        $zoomContainer.find( '.overlay .imageLoaderPositionAbsolute:not(:has(.icon-spin))' )
                            .append( '<span class="icon-spin icon-spinner"></span>' );                            
                    }
                },
                success: function() {
                    $zoom.find( 'img' ).addClass( 'loaded' );
                    $zoomContainer.overlay( {'hide': true, 'hideLoader': true} );
                    clearInterval( loader );                                                  
                    loader = setTimeout( function() {
                        loadPhotoSuccess( $imgThumb );
                    }, 500 );
                },
                progress: function( data ) {
                    if ( ! $.fn.jGalleryOptions[ intId ].preloadAll ) {
                        return;
                    }
                    intPercent = data.percent;
                    $zoomContainer.find( '.overlay .imageLoaderPositionAbsolute' ).find( '.progress-value' ).html( intPercent );
                }
            } );
        }

        function loadPhotoSuccess( $imgThumb ) {
            var $img = $zoom.find( 'img.active' );

            setTransitionDuration( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions[ intId ].showDuration );
            setTransitionTimingFunction( $( $zoom ).add( $zoomOverlayItems ), $.fn.jGalleryOptions[ intId ].showTimingFunction );

            if ( $.fn.jGalleryOptions[ intId ].title && $imgThumb.is( '[alt]' ) ) {
                $zoomTitle.html( $imgThumb.attr( 'alt' ) ).removeClass( 'before' ).removeClass( 'after' );
                setTransitionDuration( $zoomTitle, $.fn.jGalleryOptions[ intId ].titleShowDuration );
                setTransitionTimingFunction( $zoomTitle, $.fn.jGalleryOptions[ intId ].titleShowTimingFunction );
            }

            $zoom.show().find( 'img.active' ).parent().removeClass( 'before' );
            fltZoomRatioWidthToHeight = $img.width() / $img.height();
            refreshZoomSize();
            thumbnails.refreshNavigation();
            if ( booSlideshowPlayed ) {
                slideshowSetTimeout();
            }
            $.fn.jGalleryOptions[ intId ].afterLoadPhoto();
            booLoadingInProgress = false;
            if ( $.fn.jGalleryOptions[ intId ].autostart && $.fn.jGalleryOptions[ intId ].slideshowAutostart && $.fn.jGalleryOptions[ intId ].slideshow ) {
                $.fn.jGalleryOptions[ intId ].slideshowAutostart = false;
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

        function setActiveThumb( $a ) {
            var $img = $a.find( 'img' );
            var $album = $albums.filter( '.active' );
            var $a = $album.find( 'img[src="' + $img.attr( 'src' ) + '"]' ).parent( 'a' ).eq( 0 );

            thumbnails.getElement().find( 'a' ).removeClass( 'active' );
            $a.addClass( 'active' );
            if ( $album.find( 'a.active' ).length == 0 ) {
                $album.find( 'a:first-child' ).eq( 0 ).addClass( 'active' );
            }
            thumbnails.center( $a );
        }

        function setActiveAlbum( $album ) {
            if ( ! booIsAlbums ) {
                return;
            }
            $albums.not( $album.get( 0 ) ).removeClass( 'active' );
            $album.addClass( 'active' );
            iconChangeAlbum.getListOfAlbums().find( '.item' ).removeClass( 'active' ).filter( '[data-jgallery-album-title="' + $album.attr( 'data-jgallery-album-title' ) + '"]' ).addClass( 'active' );
            iconChangeAlbum.setTitle( $album.attr( 'data-jgallery-album-title' ) );
            thumbnails.refreshNavigation();
            if ( ! thumbnails.getElement().is( '.full-screen' ) && $jGallery.is( ':visible' ) ) {
                showPhoto( $album.find( 'a' ).eq( 0 ) );
            }
        }

        function loaderInit()  {
            $loader = $( 'body > .overlay > [class*="imageLoader"]' );           
            if ( $.fn.jGalleryOptions[ intId ].thumbnails ) {
                if ( $.fn.jGalleryOptions[ intId ].thumbnailsPosition == 'top' ) {
                    $loader.css( {
                        'margin-top': '+=' + thumbnails.getElement().outerHeight( true ) / 2
                    } );
                }
                if ( $.fn.jGalleryOptions[ intId ].thumbnailsPosition == 'bottom' ) {
                    $loader.css( {
                        'margin-top': '-=' + thumbnails.getElement().outerHeight( true ) / 2
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
                $.fn.jGalleryOptions[ intId ].slideshowRandom ? showRandomPhoto() : showNextPhotoLoop();
            } );
        }

        function slideshowRandomToggle() {
            if ( $.fn.jGalleryOptions[ intId ].slideshowRandom ) {
                $random.removeClass( 'active' );
                $.fn.jGalleryOptions[ intId ].slideshowRandom = false;
            }
            else {
                $random.addClass( 'active' );
                $.fn.jGalleryOptions[ intId ].slideshowRandom = true;                    
            }
        }

        if ( $.fn.jGalleryOptions[ intId ].autostart ) {
            showPhoto( $this.find( 'a:has(img:first-child:last-child)' ).eq( 0 ) );
        }
        else {
            init();
        }

        $( 'html' ).on( {
            keydown: function( event ) {
                if ( $jGallery.is( ':visible' ) ) {
                    if ( event.which == 27 ) {
                        event.preventDefault();
                        if ( thumbnails.getElement().is( '.full-screen' ) ) {
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
            }
        } );
        
        return {
            '$albums': $albums,
            'setActiveAlbum': setActiveAlbum
        };
    }
        
    $.fn.jGallery = function( options ) {       
        return this.each( function() {
            jGallery( $( this ), options );
        } );
    };
    
    $.fn.jGalleryOptions = [];
    
    $.fn.overlay = function( options ) {
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
                                
                client.open( "GET", $image.attr( 'src' ), true );
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

           $( $this ).add( $this.find( '*' ) ).not( options.skip ).each( function() {
               var strBackgroundUrl;

               if ( $( this ).css( 'background-image' ) != 'none' ) {
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
           //intCount == 1 && ! isCrossDomain( $images.eq( 0 ).attr( 'src' ) ) && document.location.hostname != '' ? checkOne() : check();
       } );
   };
   
    $.fn.outerHtml = function(){
        return (!this.length) ? this : (this[0].outerHTML || (
          function(el){
              var div = document.createElement('div');
              div.appendChild(el.cloneNode(true));
              var contents = div.innerHTML;
              div = null;
              return contents;
        })(this[0]));
    };

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
    
    function isInternetExplorer() {
        var rv = false;
        
        if ( navigator.appName == 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
            if ( re.exec(ua) != null ) {
                rv = true
            }
        }
        return rv;
    }
    
    function isInternetExplorer7AndOlder() {
        var rv = false;
        
        if ( navigator.appName == 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
            if ( re.exec(ua) != null ) {
                rv = parseFloat( RegExp.$1 );
                rv = rv < 8;
            }
        }
        return rv;
    }

    function rand( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    function isHorizontal( $image ) {
        return $image.width() > $image.height();
    }
    
    function getCssForColours( objOptions ) {
        objOptions = $.extend( {
            strBg: 'rgb( 0, 0, 0 )',
            strText: 'rgb( 255, 255, 255 )'
        }, objOptions );
        
        var arrBg = tinycolor( objOptions.strBg ).toRgb();
        var arrBgAlt = arrBg.r + arrBg.g + arrBg.b > 375 ? tinycolor.darken( objOptions.strBg ).toRgb() : tinycolor.lighten( objOptions.strBg ).toRgb();
        var arrText = tinycolor( objOptions.strText ).toRgb();
                
        return '\
            <style type="text/css">\
            .jgallery {\
              background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .btn {\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
              background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .btn.active {\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
            }\
            .jgallery .btn:hover {\
              text-shadow: none;\
              text-shadow: 0 0 .15em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.75), 0 0 .45em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.5);\
            }\
            .jgallery .change-album .menu {\
              background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .change-album .menu .item {\
              border-color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
            }\
            .jgallery .change-album .menu .item:hover {\
              background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
              color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .zoom-container .title {\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
            }\
            .jgallery .zoom-container .nav-bottom {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .zoom-container .nav-bottom .btn {\
                background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails .ico {\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
            }\
            .jgallery .thumbnails.full-screen .prev:before {\
              background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1 )),to(rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0)));\
              background-image: -webkit-linear-gradient(top,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1 ),0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0),100%);\
              background-image: -moz-linear-gradient(top,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1 ) 0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0) 100%);\
              background-image: linear-gradient(to bottom,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1 ) 0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0) 100%);\
              background-repeat: repeat-x;\
            }\
            .jgallery .thumbnails.full-screen .next:before {\
              background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0)),to(rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1)));\
              background-image: -webkit-linear-gradient(top,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0),0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1),100%);\
              background-image: -moz-linear-gradient(top,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0) 0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1) 100%);\
              background-image: linear-gradient(to bottom,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 0) 0%,rgba( ' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ', 1) 100%);\
              background-repeat: repeat-x;\
            }\
            .jgallery .thumbnails.images a:after {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails.full-screen .prev,\
            .jgallery .thumbnails.full-screen .next {\
              background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .thumbnails.square a {\
              background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
              color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
            }\
            .jgallery .overlayContainer .overlay {\
              background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
              color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
            }\
            .jgallery .overlayContainer .imageLoaderPositionAbsolute:after {\
              border-color: rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5 );\
            }\
            .jgallery .thumbnails-horizontal .prev {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails-horizontal .prev:before {\
              background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
              background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%));\
              background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
              background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
              background-repeat: repeat-x;\
            }\
            .jgallery .thumbnails-horizontal .next {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails-horizontal .next:before {\
              background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
              background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%));\
              background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
              background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
              background-repeat: repeat-x;\
            }\
            .jgallery .thumbnails-vertical .prev {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails-vertical .prev:before {\
              background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
              background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),100%);\
              background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
              background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
              background-repeat: repeat-x;\
            }\
            .jgallery .thumbnails-vertical .next {\
              background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
            }\
            .jgallery .thumbnails-vertical .next:before {\
              background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
              background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),100%);\
              background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
              background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
              background-repeat: repeat-x;\
            }\
            </style>\
        ';
    }
} ) ( jQuery );