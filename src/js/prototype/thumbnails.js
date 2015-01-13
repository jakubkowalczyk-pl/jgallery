var Thumbnails = ( function( jLoader ) {
    var $ = jQuery;
    var $head = $( 'head' );
    var $window = $( window );
    
    $.fn.jLoader = jLoader;
    
    var Thumbnails = function( jGallery ) {
        this.$element = jGallery.$element.find( '.jgallery-thumbnails' );
        this.$a = this.getElement().find( 'a' );
        this.$img = this.getElement().find( 'img' );
        this.$container = this.getElement().find( '.jgallery-container' );
        this.$albums = this.getElement().find( '.album' ).length ? this.getElement().find( '.album' ) : this.getElement().find( '.jgallery-container-inner' ).addClass( 'active' );
        this.$btnNext = this.getElement().children( '.next' );
        this.$btnPrev = this.getElement().children( '.prev' );
        this.intJgalleryId = jGallery.$element.attr( 'data-jgallery-id' );
        this.isJgalleryInitialized = jGallery.$element.is( '[data-jgallery-id]' );
        this.zoom = jGallery.zoom;
        this.$iconToggleThumbsVisibility = this.zoom.$container.find( '.minimalize-thumbnails' );
        this.jGallery = jGallery;
        if ( this.jGallery.options.swipeEvents ) {
            this.initSwipeEvents();
        }
    };

    Thumbnails.prototype = {
        getElement: function() {
            return this.$element;
        },

        init: function() {
            this.getElement().removeClass( 'square number images jgallery-thumbnails-left jgallery-thumbnails-right jgallery-thumbnails-top jgallery-thumbnails-bottom jgallery-thumbnails-horizontal jgallery-thumbnails-vertical' );
            this.getElement().addClass( 'jgallery-thumbnails-' + this.jGallery.options.thumbnailsPosition );
            if ( this.isVertical() ) {
                this.getElement().addClass( 'jgallery-thumbnails-vertical' );                    
            }
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-horizontal' );                    
            }   
            if ( this.jGallery.options.thumbType === 'image' ) {
                this._initImages();
            }
            if ( this.jGallery.options.thumbType === 'square' ) {
                this._initSquare();
            }
            if ( this.jGallery.options.thumbType === 'number' ) {
                this._initNumber();
            }
        },
        
        initSwipeEvents: function() {
            if ( ! $.fn.swipe ) {
                return;
            }
            
            var $container = this.$container;
            var self = this;
            var canScrollToPrev;
            var canScrollToNext;
            var translate = function( distance ) {
                if ( self.isVertical() || self.isFullScreen() ) {
                    $container.css( {
                        "-webkit-transform": 'translateY(' + distance +  'px)',
                        "transform": 'translateY(' + distance +  'px)'
                    } );  
                }
                else {    
                    $container.css( {
                        "-webkit-transform": 'translateX(' + distance +  'px)',
                        "transform": 'translateX(' + distance +  'px)'
                    } );              
                }
            };
            
            $container.swipe( {
                swipeStatus: function ( event, phase, direction, distance ) {
                    if ( phase === "start" ) {
                        canScrollToPrev = self.canScrollToPrev();
                        canScrollToNext = self.canScrollToNext();
                    } 
                    else if ( phase === "move" ) {
                        if ( canScrollToNext && ( direction === "left" || direction === "down" ) ) {
                            translate( - distance );
                        } else if ( canScrollToPrev ) {
                            translate( distance );
                        }
                    } else if ( phase === "end" ) {
                        if ( canScrollToNext && ( direction === "left" || direction === "down" ) ) {
                            self._scrollToNext();
                            translate( 0 );
                        } else if ( canScrollToPrev ) {
                            self._scrollToPrev();
                            translate( 0 );
                        }
                    } else {
                        translate( 0 );
                    }
                }
            } );
        },

        show: function() {
            var self = this;

            if ( ! this.getElement().is( '.hidden' ) ) {
                return;
            }
            if ( ! ( this.jGallery.isMobile() && this.jGallery.options.thumbnailsHideOnMobile ) ) {
                this.getElement().removeClass( 'hidden' );
            }
            if ( ! this.getElement().is( '.loaded' ) ) {
                this.getElement().jLoader( {
                    start: function() {},
                    success: function(){
                        self._showNextThumb();
                        self.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
                        self.getElement().addClass( 'loaded' );
                    }
                } );
            }
            else {
                this._showNextThumb();
                this.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
            }
            this.$iconToggleThumbsVisibility.removeClass( 'inactive' );
        },

        showThumbsForActiveAlbum: function() {
            this.$a.addClass( 'hidden' );
            this._showNextThumb();
        },

        hide: function( options ) {
            options = $.extend( { hideEachThumb: true }, options );
            this.getElement().addClass( 'hidden' );
            if ( options.hideEachThumb ) {
                this.$a.addClass( 'hidden' );
            }
            this.$iconToggleThumbsVisibility.addClass( 'inactive' );
        },

        toggle: function() {                    
            this.getElement().is( '.hidden' ) ? this.show() : this.hide( { hideEachThumb: false } );
        },

        setActiveThumb: function( $a ) {
            var $img = $a.find( 'img' );
            var $album = this.$albums.filter( '.active' );
            var $a = $album.find( 'img[src="' + $img.attr( 'src' ) + '"]' ).parent( 'a' ).eq( 0 );

            this.getElement().find( 'a' ).removeClass( 'active' );
            $a.addClass( 'active' );
            if ( $album.find( 'a.active' ).length === 0 ) {
                $album.find( 'a:first-child' ).eq( 0 ).addClass( 'active' );
            }
            this.center( $a );
        },

        isHorizontal: function() {
            return this.jGallery.options.thumbnailsPosition === 'top' || this.jGallery.options.thumbnailsPosition === 'bottom';
        },

        isVertical: function() {
            return this.jGallery.options.thumbnailsPosition === 'left' || this.jGallery.options.thumbnailsPosition === 'right';
        },

        isFullScreen: function() {
            return this.getElement().is( '.full-screen' );
        },

        refreshNavigation: function() {
            this.canScrollToPrev() ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            this.canScrollToNext() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
        },

        center: function( $a ) {
            if ( this.isHorizontal() ) {
                this._horizontalCenter( $a );
            }
            if ( this.isVertical() ) {
                this._verticalCenter( $a );
            }
        },

        reload: function() {
            this.$a = this.getElement().find( 'a' );
            this.$img = this.getElement().find( 'img' );
            this.$albums = this.getElement().find( '.album' ).length ? this.getElement().find( '.album' ) : this.getElement().find( '.jgallery-container-inner' );
            this.zoom.showPhoto( this.$albums.find( 'a' ).eq( 0 ) );
        },

        bindEvents: function() {
            var self = this;

            this.$btnNext.on( 'click', function() { self._scrollToNext(); } );
            this.$btnPrev.on( 'click', function() { self._scrollToPrev(); } );
            this.zoom.$container.find( '.full-screen' ).on( {
                click: function() {
                    self.zoom.slideshowPause();
                    self.changeViewToFullScreen();
                }
            } );
            this.getElement().find( '.jgallery-close' ).on( {
                click: function() {
                    self.changeViewToBar();
                    self.zoom.refreshSize();
                }
            } );
        },

        changeViewToBar: function() {
            this.getElement().removeClass( 'full-screen' );
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-horizontal' ).removeClass( 'jgallery-thumbnails-vertical' );                    
            }
            this.refreshNavigation();
        },

        changeViewToFullScreen: function() {
            this.getElement().addClass( 'full-screen' );
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-vertical' ).removeClass( 'jgallery-thumbnails-horizontal' );                    
            }
            this.refreshNavigation();
        },

        setActiveAlbum: function( $album ) {
            if ( ! this.jGallery.booIsAlbums || $album.is( '.active' ) ) {
                return;
            }
            this.$albums.not( $album.get( 0 ) ).removeClass( 'active' );
            $album.addClass( 'active' );
            this.jGallery.iconChangeAlbum.getListOfAlbums().find( '.item' ).removeClass( 'active' ).filter( '[data-jgallery-album-title="' + $album.attr( 'data-jgallery-album-title' ) + '"]' ).addClass( 'active' );
            this.jGallery.iconChangeAlbum.setTitle( $album.attr( 'data-jgallery-album-title' ) );
            this.refreshNavigation();
            if ( ! this.getElement().is( '.full-screen' ) && this.jGallery.$element.is( ':visible' ) ) {
                this.zoom.showPhoto( $album.find( 'a' ).eq( 0 ) );
            }
            this.showThumbsForActiveAlbum();
        },

        _initSquare: function() {
            this.getElement().addClass( 'square' );
        },

        _initNumber: function() {
            this.getElement().addClass( 'number' );
            this._initSquare();
        },

        _initImages: function() {
            var $css = $head.find( 'style.jgallery-thumbnails[data-jgallery-id="' + this.intJgalleryId + '"]' );
            var strCss = '\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails a {\n\
                        width: ' + this.jGallery.options.thumbWidth + 'px;\n\
                        height: ' + this.jGallery.options.thumbHeight + 'px;\n\
                        font-size: ' + this.jGallery.options.thumbHeight + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails.full-screen a {\n\
                        width: ' + this.jGallery.options.thumbWidthOnFullScreen + 'px;\n\
                        height: ' + this.jGallery.options.thumbHeightOnFullScreen + 'px;\n\
                        font-size: ' + this.jGallery.options.thumbHeightOnFullScreen + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-horizontal {\n\
                        height: ' + parseInt( this.jGallery.options.thumbHeight + 2 ) + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-vertical {\n\
                        width: ' + parseInt( this.jGallery.options.thumbWidth + 2 ) + 'px;\n\
                    }\n\
            ';

            this.getElement().addClass( 'images' );
            $css.length ? $css.html( strCss ) : $head.append( '\
                <style type="text/css" class="jgallery-thumbnails" data-jgallery-id="' + this.intJgalleryId + '">\
                    ' + strCss + '\
                </style>\
            ');
            if ( this.isHorizontal() ) {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'fa-ellipsis-h' ).removeClass( 'fa-ellipsis-v' );
            }
            else {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'fa-ellipsis-v' ).removeClass( 'fa-ellipsis-h' );                
            }
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
        
        canScrollToPrev: function() {
            if ( this.isVertical() || this.isFullScreen() ) {
                return this.$container.scrollTop() > 0;
            }
            else {
                return this.$container.scrollLeft() > 0;
            }
        },
        
        canScrollToNext: function() {
            if ( this.isVertical() || this.isFullScreen() ) {
                return this.$container.find( '.jgallery-container-inner' ).height() > this.$container.height() + this.$container.scrollTop();
            }
            else {
                var $album = this.getElement().find( 'div.active' );
                var intThumbsWidth = this.jGallery.options.thumbType === 'image' ? this.$a.outerWidth( true ) * $album.find( 'img' ).length : this.$a.outerWidth( true ) * $album.find( 'a' ).length;
                
                return intThumbsWidth > this.$container.width() + this.$container.scrollLeft();
            }
        },

        _scrollToPrev: function() {
            var self = this;

            if ( this.isVertical() || this.isFullScreen() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollTop': "-=" + $window.height() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            } 
            else if ( this.isHorizontal() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollLeft': "-=" + $window.width() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            }
        },

        _scrollToNext: function() {
            var self = this;

            if ( this.isVertical() || this.isFullScreen() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollTop': "+=" + $window.height() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );                
            }
            else if ( this.isHorizontal() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollLeft': "+=" + $window.width() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            }
        }
    };
    
    return Thumbnails;
} )( jLoader );