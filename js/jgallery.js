/*!
 * jGallery v1.3.0
 * http://jgallery.jakubkowalczyk.pl/
 *
 * Released under the MIT license
 *
 * Date: 2014-05-18
 */
( function( $ ) {
    "use strict";
    var defaults = {
        mode: 'full-screen', // [ full-screen, standard, slider ]
        width: '100%', // (only for standard or slider mode)
        height: '600px', // (only for standard or slider mode)
        autostart: false, // (only for full-screen mode)
        autostartAtImage: 1,
        autostartAtAlbum: 1,
        canClose: true, // (only for full-screen mode)
        canResize: true,
        draggableZoom: true,
        canChangeMode: false,
        backgroundColor: '#000',
        textColor: '#fff',
        browserHistory: true,
        thumbnails: true,
        thumbnailsFullScreen: true,
        thumbType: 'image', // [ image | square | number ]
        thumbnailsPosition: 'bottom', // [ top | bottom | left | right ]
        reloadThumbnails: true, //Reload thumbnails when function jGallery() is called again for the same item
        thumbWidth: 75, //px
        thumbHeight: 75, //px
        thumbWidthOnFullScreen: 100, //px
        thumbHeightOnFullScreen: 100, //px
        canMinimalizeThumbnails: true,
        hideThumbnailsOnInit: false,
        transition: 'moveToRight_moveFromLeft', // http://jgallery.jakubkowalczyk.pl/customize
        transitionBackward: 'moveToLeft_moveFromRight', // http://jgallery.jakubkowalczyk.pl/customize
        transitionWaveDirection: 'forward', // [ forward | backward ]
        transitionCols: 1,
        transitionRows: 5,
        showTimingFunction: 'linear', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
        hideTimingFunction: 'linear', // [ linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n) ]
        transitionDuration: '0.7s',
        zoomSize: 'fit', // [ fit | original | fill ] (only for full-screen or standard mode)
        title: true,
        slideshow: true,
        slideshowAutostart: false,
        slideshowCanRandom: true,
        slideshowRandom: false,
        slideshowInterval: '8s',
        preloadAll: false,
        appendTo: 'body', // selector (only for full-screen mode)
        disabledOnIE8AndOlder: true,
        initGallery: function() {},
        showPhoto: function() {},
        beforeLoadPhoto: function() {},
        afterLoadPhoto: function() {},
        showGallery: function() {},
        closeGallery: function() {}
    };
    
    var defaultsStandardMode = {
        autostart: true,
        canClose: false,
        canChangeMode: true,
        browserHistory: false
    };
    
    var requiredStandardMode = {
    };
    
    var defaultsSliderMode = {
        width: '940px',
        height: '300px',
        canResize: false,
        draggableZoom: false,
        browserHistory: false,
        thumbnailsFullScreen: false,
        thumbType: 'square',
        canMinimalizeThumbnails: false,
        transition: 'rotateCubeRightOut_rotateCubeRightIn',
        transitionCols: 6,
        transitionRows: 1,
        slideshow: true,
        slideshowAutostart: true,
        zoomSize: 'fill'
    };
    
    var requiredSliderMode = {
        autostart: true,
        canClose: false,
        zoomSize: 'fill',
        canChangeMode: false
    };
 
    var jGalleryTransitions = {
        moveToLeft_moveFromRight: ["pt-page-moveToLeft","pt-page-moveFromRight"],
        moveToRight_moveFromLeft: ["pt-page-moveToRight","pt-page-moveFromLeft"],
        moveToTop_moveFromBottom: ["pt-page-moveToTop","pt-page-moveFromBottom"],
        moveToBottom_moveFromTop: ["pt-page-moveToBottom","pt-page-moveFromTop"],
        fade_moveFromRight: ["pt-page-fade","pt-page-moveFromRight pt-page-ontop"],
        fade_moveFromLeft: ["pt-page-fade","pt-page-moveFromLeft pt-page-ontop"],
        fade_moveFromBottom: ["pt-page-fade","pt-page-moveFromBottom pt-page-ontop"],
        fade_moveFromTop: ["pt-page-fade","pt-page-moveFromTop pt-page-ontop"],
        moveToLeftFade_moveFromRightFade: ["pt-page-moveToLeftFade","pt-page-moveFromRightFade"],
        moveToRightFade_moveFromLeftFade: ["pt-page-moveToRightFade","pt-page-moveFromLeftFade"],
        moveToTopFade_moveFromBottomFade: ["pt-page-moveToTopFade","pt-page-moveFromBottomFade"],
        moveToBottomFade_moveFromTopFade: ["pt-page-moveToBottomFade","pt-page-moveFromTopFade"],
        moveToLeftEasing_moveFromRight: ["pt-page-moveToLeftEasing pt-page-ontop","pt-page-moveFromRight"],
        moveToRightEasing_moveFromLeft: ["pt-page-moveToRightEasing pt-page-ontop","pt-page-moveFromLeft"],
        moveToTopEasing_moveFromBottom: ["pt-page-moveToTopEasing pt-page-ontop","pt-page-moveFromBottom"],
        moveToBottomEasing_moveFromTop: ["pt-page-moveToBottomEasing pt-page-ontop","pt-page-moveFromTop"],
        scaleDown_moveFromRight: ["pt-page-scaleDown","pt-page-moveFromRight pt-page-ontop"],
        scaleDown_moveFromLeft: ["pt-page-scaleDown","pt-page-moveFromLeft pt-page-ontop"],
        scaleDown_moveFromBottom: ["pt-page-scaleDown","pt-page-moveFromBottom pt-page-ontop"],
        scaleDown_moveFromTop: ["pt-page-scaleDown","pt-page-moveFromTop pt-page-ontop"],
        scaleDown_scaleUpDown: ["pt-page-scaleDown","pt-page-scaleUpDown pt-page-delay300"],
        scaleDownUp_scaleUp: ["pt-page-scaleDownUp","pt-page-scaleUp pt-page-delay300"],
        moveToLeft_scaleUp: ["pt-page-moveToLeft pt-page-ontop","pt-page-scaleUp"],
        moveToRight_scaleUp: ["pt-page-moveToRight pt-page-ontop","pt-page-scaleUp"],
        moveToTop_scaleUp: ["pt-page-moveToTop pt-page-ontop","pt-page-scaleUp"],
        moveToBottom_scaleUp: ["pt-page-moveToBottom pt-page-ontop","pt-page-scaleUp"],
        scaleDownCenter_scaleUpCenter: ["pt-page-scaleDownCenter","pt-page-scaleUpCenter pt-page-delay400"],
        rotateRightSideFirst_moveFromRight: ["pt-page-rotateRightSideFirst","pt-page-moveFromRight pt-page-delay200 pt-page-ontop"],
        rotateLeftSideFirst_moveFromLeft: ["pt-page-rotateLeftSideFirst","pt-page-moveFromLeft pt-page-delay200 pt-page-ontop"],
        rotateTopSideFirst_moveFromTop: ["pt-page-rotateTopSideFirst","pt-page-moveFromTop pt-page-delay200 pt-page-ontop"],
        rotateBottomSideFirst_moveFromBottom: ["pt-page-rotateBottomSideFirst","pt-page-moveFromBottom pt-page-delay200 pt-page-ontop"],
        flipOutRight_flipInLeft: ["pt-page-flipOutRight","pt-page-flipInLeft pt-page-delay500"],
        flipOutLeft_flipInRight: ["pt-page-flipOutLeft","pt-page-flipInRight pt-page-delay500"],
        flipOutTop_flipInBottom: ["pt-page-flipOutTop","pt-page-flipInBottom pt-page-delay500"],
        flipOutBottom_flipInTop: ["pt-page-flipOutBottom","pt-page-flipInTop pt-page-delay500"],
        rotateFall_scaleUp: ["pt-page-rotateFall pt-page-ontop","pt-page-scaleUp"],
        rotateOutNewspaper_rotateInNewspaper: ["pt-page-rotateOutNewspaper","pt-page-rotateInNewspaper pt-page-delay500"],
        rotatePushLeft_moveFromRight: ["pt-page-rotatePushLeft","pt-page-moveFromRight"],
        rotatePushRight_moveFromLeft: ["pt-page-rotatePushRight","pt-page-moveFromLeft"],
        rotatePushTop_moveFromBottom: ["pt-page-rotatePushTop","pt-page-moveFromBottom"],
        rotatePushBottom_moveFromTop: ["pt-page-rotatePushBottom","pt-page-moveFromTop"],
        rotatePushLeft_rotatePullRight: ["pt-page-rotatePushLeft","pt-page-rotatePullRight pt-page-delay180"],
        rotatePushRight_rotatePullLeft: ["pt-page-rotatePushRight","pt-page-rotatePullLeft pt-page-delay180"],
        rotatePushTop_rotatePullBottom: ["pt-page-rotatePushTop","pt-page-rotatePullBottom pt-page-delay180"],
        rotatePushBottom_page: ["pt-page-rotatePushBottom","pt-page-rotatePullTop pt-page-delay180"],
        rotateFoldLeft_moveFromRightFade: ["pt-page-rotateFoldLeft","pt-page-moveFromRightFade"],
        rotateFoldRight_moveFromLeftFade: ["pt-page-rotateFoldRight","pt-page-moveFromLeftFade"],
        rotateFoldTop_moveFromBottomFade: ["pt-page-rotateFoldTop","pt-page-moveFromBottomFade"],
        rotateFoldBottom_moveFromTopFade: ["pt-page-rotateFoldBottom","pt-page-moveFromTopFade"],
        moveToRightFade_rotateUnfoldLeft: ["pt-page-moveToRightFade","pt-page-rotateUnfoldLeft"],
        moveToLeftFade_rotateUnfoldRight: ["pt-page-moveToLeftFade","pt-page-rotateUnfoldRight"],
        moveToBottomFade_rotateUnfoldTop: ["pt-page-moveToBottomFade","pt-page-rotateUnfoldTop"],
        moveToTopFade_rotateUnfoldBottom: ["pt-page-moveToTopFade","pt-page-rotateUnfoldBottom"],
        rotateRoomLeftOut_rotateRoomLeftIn: ["pt-page-rotateRoomLeftOut pt-page-ontop","pt-page-rotateRoomLeftIn"],
        rotateRoomRightOut_rotateRoomRightIn: ["pt-page-rotateRoomRightOut pt-page-ontop","pt-page-rotateRoomRightIn"],
        rotateRoomTopOut_rotateRoomTopIn: ["pt-page-rotateRoomTopOut pt-page-ontop","pt-page-rotateRoomTopIn"],
        rotateRoomBottomOut_rotateRoomBottomIn: ["pt-page-rotateRoomBottomOut pt-page-ontop","pt-page-rotateRoomBottomIn"],
        rotateCubeLeftOut_rotateCubeLeftIn: ["pt-page-rotateCubeLeftOut pt-page-ontop","pt-page-rotateCubeLeftIn"],
        rotateCubeRightOut_rotateCubeRightIn: ["pt-page-rotateCubeRightOut pt-page-ontop","pt-page-rotateCubeRightIn"],
        rotateCubeTopOut_rotateCubeTopIn: ["pt-page-rotateCubeTopOut pt-page-ontop","pt-page-rotateCubeTopIn"],
        rotateCubeBottomOut_rotateCubeBottomIn: ["pt-page-rotateCubeBottomOut pt-page-ontop","pt-page-rotateCubeBottomIn"],
        rotateCarouselLeftOut_rotateCarouselLeftIn: ["pt-page-rotateCarouselLeftOut pt-page-ontop","pt-page-rotateCarouselLeftIn"],
        rotateCarouselRightOut_rotateCarouselRightIn: ["pt-page-rotateCarouselRightOut pt-page-ontop","pt-page-rotateCarouselRightIn"],
        rotateCarouselTopOut_rotateCarouselTopIn: ["pt-page-rotateCarouselTopOut pt-page-ontop","pt-page-rotateCarouselTopIn"],
        rotateCarouselBottomOut_rotateCarouselBottomIn: ["pt-page-rotateCarouselBottomOut pt-page-ontop","pt-page-rotateCarouselBottomIn"],
        rotateSidesOut_rotateSidesInDelay: ["pt-page-rotateSidesOut","pt-page-rotateSidesIn pt-page-delay200"],
        rotateSlideOut_rotateSlideIn: ["pt-page-rotateSlideOut","pt-page-rotateSlideIn"]
    };
    
    var jGalleryOptions = [];
    var jGalleryCollection = [ '' ];
    
    var jGalleryArrayTransitions = [];
    
    $.each( jGalleryTransitions, function( index, value ) {
        jGalleryArrayTransitions.push( value );
    } );    
    
    var $head;
    var $title;
    var $body;
    $( function() {
        $head = $( 'head' );
        $title = $( 'title' );
        $body = $( 'body' );
    } );
    var $window = $( window );
    var jGalleryId = 0;
    
    
    
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
            }, parseInt( jGalleryOptions[ this.intJgalleryId ].slideshowInterval ) * 1000, 'linear', success );
            return this;    
        },
        
        pause: function() {
            this.$element.stop( true );
            this.clear();
            return this;
        }         
    }; 
    


    var IconChangeAlbum = function( $this, jGallery ) {        
        this.$element = $this;
        this.jGallery = jGallery;
        this.$title = this.$element.find( '.title' );
    };

    IconChangeAlbum.prototype = {
        bindEvents: function( jGallery ) {
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
                    jGallery.thumbnails.setActiveAlbum( jGallery.thumbnails.$albums.filter( '[data-jgallery-album-title="' + $this.attr( 'data-jgallery-album-title' ) + '"]' ) );
                }
            } );
            $( 'html' ).on( 'click', function(){ self.menuHide(); } );  
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
        },
        
        clearMenu: function() {
            this.getListOfAlbums().html( '' );
        },
        
        refreshMenuHeight: function() {
            this.getListOfAlbums().css( 'max-height', this.jGallery.zoom.$container.outerHeight() - 8 );
        }
    };



    var ThumbnailsGenerator = function( jGallery, options ) {
        this.options = $.extend( {}, {
            thumbsHidden: true
        }, options );
        this.jGallery = jGallery;
        this.$element = jGallery.$this;
        this.booIsAlbums = jGallery.booIsAlbums;
        this.$tmp;
        this.intI = 1;
        this.intJ = 1;
        this.intNo;
        this.$thumbnailsContainerInner = this.jGallery.$jgallery.find( '.jgallery-thumbnails .jgallery-container-inner' );
        this.start();
    };

    ThumbnailsGenerator.prototype = {
        start: function() {
            var self = this;
            var selector = this.jGallery.isSlider() ? '.album:has(img)' : '.album:has(a:has(img))';

            $( 'body' ).append( '<div id="jGalleryTmp" style="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: -1; overflow: hidden;">' + this.$element.html() + '</div>' );
            this.$tmp = $( '#jGalleryTmp' );
            this.$thumbnailsContainerInner.html( '' );
            if ( this.booIsAlbums ) {
                this.$tmp.find( selector ).each( function() {
                    self.insertAlbum( $( this ) );
                } );
            }
            else {
                this.insertImages( this.$tmp, this.$thumbnailsContainerInner );                    
            }
            this.$tmp.remove();
            this.refreshThumbsSize();
        },
        
        insertAlbum: function( $this ) {
            var strTitle = $this.is( '[data-jgallery-album-title]' ) ? $this.attr( 'data-jgallery-album-title' ) : 'Album ' + this.intJ;
            var $album = this.$thumbnailsContainerInner.append( '<div class="album" data-jgallery-album-title="' + strTitle + '"></div>' ).children( ':last-child' );

            if ( this.intJ === 1 ) {
                $album.addClass( 'active' );
            }
            this.insertImages( $this, $album );
            this.intJ++;
        },

        insertImages: function( $images, $container ) {
            var self = this;
            var selector = this.jGallery.isSlider() ? 'img' : 'a:has(img)';

            this.intNo = 1;
            $images.find( selector ).each( function() {
                self.insertImage( $( this ), $container );
            } );            
        },

        insertImage: function( $this, $container ) {            
            if ( $this.is( 'a' ) ) {
                $container.append( '<a href="' + $this.attr( 'href' ) + '">' + this.generateImgTag( $this.find( 'img' ).eq( 0 ) ).outerHtml() + '</a>' );
                if ( this.options.thumbsHidden ) {
                    $container.children( ':last-child' ).addClass( 'hidden' );
                }
            }
            else if ( $this.is( 'img' ) ) {
                $container.append( $( '<a href="' + $this.attr( 'src' ) + '">' + this.generateImgTag( $this ).outerHtml() + '</a>' ) );                
            }
            $container.children( ':last-child' ).attr( 'data-jgallery-photo-id', this.intI++ ).attr( 'data-jgallery-number', this.intNo++ );
        },
        
        generateImgTag: function( $img ) {
            var $newImg = $( '<img src="' + $img.attr( 'src' ) + '" />' );
            
            if ( $img.is( '[alt]' ) ) {
                $newImg.attr( 'alt', $img.attr( 'alt' ) );
            }
            if ( $img.is( '[data-jgallery-bg-color]' ) ) {
                $newImg.attr( 'data-jgallery-bg-color', $img.attr( 'data-jgallery-bg-color' ) );
            }
            if ( $img.is( '[data-jgallery-text-color]' ) ) {
                $newImg.attr( 'data-jgallery-text-color', $img.attr( 'data-jgallery-text-color' ) );
            }
            
            return $newImg;
        },
        
        refreshThumbsSize: function() {
            this.$thumbnailsContainerInner.find( 'img' ).each( function() {
                var $image = $( this );
                var image = new Image();
                
                image.src = $image.attr( 'src' );
                image.width > image.height ? $image.css( { 'max-height': '100%', 'max-width': 'none' } ) : $image.css( { 'max-width': '100%', 'max-height': 'none' } );
            } );  
        }
    };
    


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
    };
    
    Thumbnails.prototype = {
        getElement: function() {
            return this.$element;
        },
        
        init: function() {
            this.getElement().removeClass( 'square number images jgallery-thumbnails-left jgallery-thumbnails-right jgallery-thumbnails-top jgallery-thumbnails-bottom jgallery-thumbnails-horizontal jgallery-thumbnails-vertical' );
            this.getElement().addClass( 'jgallery-thumbnails-' + jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition );
            if ( this.isVertical() ) {
                this.getElement().addClass( 'jgallery-thumbnails-vertical' );                    
            }
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-horizontal' );                    
            }   
            if ( jGalleryOptions[ this.intJgalleryId ].thumbType === 'image' ) {
                this._initImages();
            }
            if ( jGalleryOptions[ this.intJgalleryId ].thumbType === 'square' ) {
                this._initSquare();
            }
            if ( jGalleryOptions[ this.intJgalleryId ].thumbType === 'number' ) {
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
            return jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition === 'top' || jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition === 'bottom';
        },

        isVertical: function() {
            return jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition === 'left' || jGalleryOptions[ this.intJgalleryId ].thumbnailsPosition === 'right';
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
        
        reload: function() {
            this.$a = this.getElement().find( 'a' );
            this.$img = this.getElement().find( 'img' );
            this.$albums = this.getElement().find( '.album' ).length ? this.getElement().find( '.album' ) : this.getElement().find( '.jgallery-container-inner' ).addClass( 'active' );
        },

        bindEvents: function() {
            var self = this;
            
            this.$btnNext.on( 'click', function() { self._scrollToNext(); } );
            this.$btnPrev.on( 'click', function() { self._scrollToPrev(); } );
            this.zoom.$container.find( '.full-screen' ).on( {
                click: function() {
                    self.zoom.slideshowStop();
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
            this._refreshVerticalNavigation();
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
                        width: ' + jGalleryOptions[ this.intJgalleryId ].thumbWidth + 'px;\n\
                        height: ' + jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                        font-size: ' + jGalleryOptions[ this.intJgalleryId ].thumbHeight + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails.full-screen a {\n\
                        width: ' + jGalleryOptions[ this.intJgalleryId ].thumbWidthOnFullScreen + 'px;\n\
                        height: ' + jGalleryOptions[ this.intJgalleryId ].thumbHeightOnFullScreen + 'px;\n\
                        font-size: ' + jGalleryOptions[ this.intJgalleryId ].thumbHeightOnFullScreen + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-horizontal {\n\
                        height: ' + parseInt( jGalleryOptions[ this.intJgalleryId ].thumbHeight + 2 ) + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-vertical {\n\
                        width: ' + parseInt( jGalleryOptions[ this.intJgalleryId ].thumbWidth + 2 ) + 'px;\n\
                    }\n\
            ';
            
            this.getElement().addClass( 'images' );
            $css.length ? $css.html( strCss ) : $head.append( '\
                <style type="text/css" class="jgallery-thumbnails" data-jgallery-id="' + this.intJgalleryId + '">\
                    ' + strCss + '\
                </style>\
            ');
            if ( this.isHorizontal() ) {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'icon-ellipsis-horizontal' ).removeClass( 'icon-ellipsis-vertical' );
            }
            else {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'icon-ellipsis-vertical' ).removeClass( 'icon-ellipsis-horizontal' );                
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

        _refreshHorizontalNavigation: function() {
            var $album = this.getElement().find( 'div.active' );
            var intThumbsWidth = jGalleryOptions[ this.intJgalleryId ].thumbType === 'image' ? this.$a.outerWidth( true ) * $album.find( 'img' ).length : this.$a.outerWidth( true ) * $album.find( 'a' ).length;

            this.$container.scrollLeft() > 0 ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            intThumbsWidth > this.$container.width() + this.$container.scrollLeft() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
        },

        _refreshVerticalNavigation: function() {
            this.$container.scrollTop() > 0 ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            this.$container.find( '.jgallery-container-inner' ).height() > this.$container.height() + this.$container.scrollTop() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
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
    
    
    
    var Zoom = function( jGallery ) {
        this.$container = jGallery.$element.children( '.zoom-container' );
        this.$element = this.$container.children( '.zoom' );
        this.$title = this.$container.children( '.title' );
        this.$btnPrev = this.$container.children( '.prev' );
        this.$btnNext = this.$container.children( '.next' );
        this.$left = this.$container.find( '.left' );
        this.$right = this.$container.find( '.right' );
        this.thumbnails = jGallery.thumbnails;
        this.$jGallery = jGallery.$element;
        this.jGallery = jGallery;
        this.$resize = this.$container.find( '.resize' );
        this.$dragNav = this.$container.find( '.drag-nav' );
        this.$dragNavCrop = $();
        this.$dragNavCropImg = $();
        this.$changeMode = this.$container.find( '[class*="icon-"].change-mode' );
        this.$random = this.$container.find( '.random' );
        this.$slideshow = this.$container.find( '.slideshow' );
        this.intJGalleryId = this.$jGallery.attr( 'data-jgallery-id' );
        this.booSlideshowPlayed = false;
        this.booLoadingInProgress = false;
        this.booLoadedAll = false;
        this.update();
    };
    
    Zoom.prototype = {
        update: function() {
            var transition = jGalleryTransitions[ jGalleryOptions[ this.jGallery.intId ].transition ];
            
            this.$container.attr( 'data-size', jGalleryOptions[ this.jGallery.intId ].zoomSize );
            this.$element.find( '.pt-page' )
                .removeClass( jGalleryOptions[ this.jGallery.intId ].hideEffect )
                .removeClass( jGalleryOptions[ this.jGallery.intId ].showEffect );
            if ( typeof transition !== 'undefined' ) {
                jGalleryOptions[ this.jGallery.intId ].hideEffect = transition[ 0 ];
                jGalleryOptions[ this.jGallery.intId ].showEffect = transition[ 1 ];
            }
            this.initAdvancedAnimation();  
        },
        
        initAdvancedAnimation: function() {
            if ( typeof this.advancedAnimation === 'undefined' ) {
                this.advancedAnimation = new AdvancedAnimation( this.$element );
            }
            this.advancedAnimation.setDuration( jGalleryOptions[ this.jGallery.intId ].transitionDuration );
            this.advancedAnimation.setDirection( jGalleryOptions[ this.jGallery.intId ].transitionWaveDirection );
            this.advancedAnimation.setQuantityParts( jGalleryOptions[ this.jGallery.intId ].transitionCols, jGalleryOptions[ this.jGallery.intId ].transitionRows );
            this.advancedAnimation.setHideEffect( jGalleryOptions[ this.jGallery.intId ].hideEffect );
            this.advancedAnimation.setShowEffect( jGalleryOptions[ this.jGallery.intId ].showEffect );  
        },
        
        setThumbnails: function( thumbnails ) {
            this.thumbnails = thumbnails;
        },
        
        enableDrag: function() {
            if ( ! jGalleryOptions[ this.jGallery.intId ].draggableZoom ) {
                return;
            }
            var self = this;
            var startMarginLeft;
            var startMarginTop;
            
            var startDrag = function( event ) {
                var startX = event.pageX;
                var startY = event.pageY;
                var $img = self.$element.find( 'img.active' );
                
                startMarginLeft = $img.css( 'margin-left' );
                startMarginTop = $img.css( 'margin-top' );
                self.$element.on( {
                    mousemove: function( event ) { 
                        drag( event.pageX - startX, event.pageY - startY );
                    },
                    mouseleave: function() {
                        stopDrag();
                    }
                } );
                if ( jGalleryOptions[ self.jGallery.intId ].zoomSize === 'fill' ) {
                    self.$dragNav.removeClass( 'hide' ).addClass( 'show' );
                }
                drag( 0, 0 );
            };
            
            var stopDrag = function() {
                self.$element.off( 'mousemove' );
                if ( jGalleryOptions[ self.jGallery.intId ].zoomSize === 'fill' ) {
                    self.$dragNav.removeClass( 'show' ).addClass( 'hide' );
                }
            };
            
            var drag = function( x, y ) {
                var marginLeft = parseFloat( parseFloat( startMarginLeft ) + x );
                var marginTop = parseFloat( parseFloat( startMarginTop ) + y );
                var $img = self.$element.find( 'img.active' );
                var $first = $img.eq( 0 );
                var $last = $img.eq( -1 );
                var $lastParent = $last.parent();
                
                if ( $first.position().left + marginLeft < 0 && $last.position().left + $last.width() + marginLeft > $lastParent.outerWidth() ) {
                    $img.css( {
                        'margin-left': marginLeft
                    } );
                    self.$dragNavCrop.css( {
                        left: - ( $first.position().left + marginLeft ) / $img.width() * 100 + '%'
                    } );
                }
                if ( $first.position().top + marginTop < 0 && $last.position().top + $last.height() + marginTop > $lastParent.outerHeight() ) {
                    $img.css( {
                        'margin-top': marginTop
                    } );
                    self.$dragNavCrop.css( {
                        top: - ( $first.position().top + marginTop ) / $img.height() * 100 + '%'
                    } );
                }
                self.$dragNavCropImg.css( {
                    'margin-left': - self.$dragNavCrop.position().left,
                    'margin-top': - self.$dragNavCrop.position().top
                } );
            };
            
            if ( jGalleryOptions[ self.jGallery.intId ].zoomSize === 'original' ) {
                self.$dragNav.removeClass( 'hide' ).addClass( 'show' );
            }
            this.refreshDragNavCropSize();
            this.$element.css( 'cursor', 'move' ).on( {
                mousedown: function( event ) {
                    event.preventDefault();
                    startDrag( event );
                },
                mouseup: function() {
                    stopDrag();
                }
            } );
            this.$left.add( this.$right ).hide();
        },
        
        disableDrag: function() {
            if ( ! jGalleryOptions[ this.jGallery.intId ].draggableZoom ) {
                return;
            }
            this.$dragNav.removeClass( 'show' ).addClass( 'hide' );
            this.$element.css( 'cursor', 'default' );
            this.$element.off();
            this.$left.add( this.$right ).show(); 
        },
        
        refreshContainerSize: function () {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );
            var strThumbnailsPosition = isThumbnailsVisible ? jGalleryOptions[ this.intJGalleryId ].thumbnailsPosition : '';

            this.$container.css( {
                'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : 'auto',
                'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight,
                'margin-top': strThumbnailsPosition === 'top' ? this.thumbnails.getElement().outerHeight( true ) : 0,
                'margin-left': strThumbnailsPosition === 'left' ? this.thumbnails.getElement().outerWidth( true ) : 0,
                'margin-right': strThumbnailsPosition === 'right' ? this.thumbnails.getElement().outerWidth( true ) : 0
            } );
            if ( jGalleryOptions[ this.jGallery.intId ].draggableZoom ) {
                this.refreshDragNavCropSize();
            }
        },

        refreshSize: function() {
            if ( this.thumbnails.isFullScreen() ) {
                return;
            }
            this.refreshContainerSize();
            if ( jGalleryOptions[ this.intJGalleryId ].zoomSize === 'original' ) {
                this.original();
            }
            else if ( jGalleryOptions[ this.intJGalleryId ].zoomSize === 'fill' ) {
                this.fill();
            }
            else {
                this.fit();
            }
            this.$element.addClass( 'visible' );
        },
        
        refreshDragNavCropSize: function() { 
            var $img = this.$element.find( 'img.active' );
            var cropPositionLeft;
            var cropPositionTop;
            
            this.$dragNavCrop.css( {
                width: this.$element.width() / $img.width() * 100 + '%',
                height: this.$element.height() / $img.height() * 100 + '%'
            } );
            cropPositionLeft = ( this.$dragNav.width() - this.$dragNavCrop.width() ) / 2;
            cropPositionTop = ( this.$dragNav.height() - this.$dragNavCrop.height() ) / 2;
            this.$dragNavCrop.css( {
                left: cropPositionLeft,
                top: cropPositionTop
            } );
            if ( this.$dragNavCropImg.length ) {
                this.$dragNavCropImg.css( {
                    'margin-left': - cropPositionLeft,
                    'margin-top':  - cropPositionTop
                } );
            }
        },

        changeSize: function() {
            if ( jGalleryOptions[ this.jGallery.intId ].zoomSize === 'fit' ) {
                jGalleryOptions[ this.jGallery.intId ].zoomSize = 'fill';
                this.fill();
            }
            else if ( jGalleryOptions[ this.jGallery.intId ].zoomSize === 'fill' ) {
                var $img = this.$element.find( 'img.active' ).eq( 0 );
                
                if ( this.$element.outerWidth().toString() === $img.attr( 'data-width' ) ) {
                    jGalleryOptions[ this.jGallery.intId ].zoomSize = 'fit';
                    this.fit(); 
                }
                else {        
                    jGalleryOptions[ this.jGallery.intId ].zoomSize = 'original';
                    this.original();         
                }
            }
            else if ( jGalleryOptions[ this.jGallery.intId ].zoomSize === 'original' ) {
                jGalleryOptions[ this.jGallery.intId ].zoomSize = 'fit';
                this.fit();
            }
            this.$container.attr( 'data-size', jGalleryOptions[ this.jGallery.intId ].zoomSize );
        },
   
        original: function() {
            var $img = this.$element.find( 'img.active' );
           
            this.advancedAnimation.setPositionParts();
            this.setImgSizeForOriginal( $img );
            this.setImgSizeForOriginal( this.$element.find( '.pt-page.init img' ) );
            if ( $img.attr( 'data-width' ) <= this.$element.outerWidth() && $img.attr( 'data-height' ) <= this.$element.outerHeight() ) {
                this.$resize.addClass( 'icon-zoom-in' ).removeClass( 'icon-zoom-out' );  
                this.disableDrag();
            }
            else {
                this.$resize.addClass( 'icon-zoom-out' ).removeClass( 'icon-zoom-in' );
                this.enableDrag();
            }
        },
   
        fit: function() {
            var $img = this.$element.find( 'img.active' ).add( this.$element.find( '.pt-page.init img' ) );
           
            this.advancedAnimation.setPositionParts();
            this.setImgSizeForFit( $img.filter( '.active' ) );
            this.setImgSizeForFit( $img.filter( ':not( .active )' ) );
            this.$resize.addClass( 'icon-zoom-in' ).removeClass( 'icon-zoom-out' );
            this.disableDrag();
        },
        
        fill: function() {
            var $img = this.$element.find( 'img.active' );

            this.setImgSizeForFill( $img );
            this.setImgSizeForFill( this.$element.find( '.pt-page.init img' ) );
            this.advancedAnimation.setPositionParts();
            if ( $img.attr( 'data-width' ) > $img.width() && $img.attr( 'data-height' ) > $img.height() ) {
                this.$resize.addClass( 'icon-zoom-in' ).removeClass( 'icon-zoom-out' );                
            }
            else {
                this.$resize.addClass( 'icon-zoom-out' ).removeClass( 'icon-zoom-in' );
            }
            this.enableDrag();
        },
        
        setImgSizeForOriginal: function( $img ) {
            $img.css( {
                'width': $img.attr( 'data-width' ),
                'height': $img.attr( 'data-height' ),
                'min-width': 0,
                'min-height': 0,
                'max-width': 'none',
                'max-height': 'none'
            } );       
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );            
        },
        
        setImgSizeForFit: function( $img ) {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );
            
            $img.css( {
                'width': 'auto',
                'height': 'auto',
                'min-width': 0,
                'min-height': 0,
                'max-width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                'max-height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
            } );   
            if ( $img.width() / $img.height() / this.jGallery.getCanvasRatioWidthToHeight() < 1 ) {
                $img.css( {
                    'width': 'auto',
                    'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
                } );                        
            }
            else {
                $img.css( {
                    'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                    'height': 'auto'
                } );
            }             
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );
        },
        
        setImgSizeForFill: function( $img ) {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );
            
            $img.css( {
                'width': 'auto',
                'height': 'auto',
                'max-width': 'none',
                'max-height': 'none',                    
                'min-width': 0,
                'min-height': 0
            } );
            if ( $img.width() / $img.height() / this.jGallery.getCanvasRatioWidthToHeight() > 1 ) {
                $img.css( {
                    'width': 'auto',
                    'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
                } );                        
            }
            else {
                $img.css( {
                    'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                    'height': 'auto'
                } );
            }
            $img.css( {                   
                'min-width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                'min-height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
            } );
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );
        },

        isLoaded: function( $a ) {
            return this.$element.find( 'img' ).filter( '[src="' + $a.attr( 'href' ) + '"]' ).length > 0;
        },

        refreshNav: function() {
            var $thumbActive = this.thumbnails.getElement().find( 'div.active a.active' );
            
            $thumbActive.prev( 'a' ).length === 1 ? this.$btnPrev.add( this.$container.children( '.left' ) ).removeClass( 'hidden' ) : this.$btnPrev.add( this.$container.children( '.left' ) ).addClass( 'hidden' );
            $thumbActive.next( 'a' ).length === 1 ? this.$btnNext.add( this.$container.children( '.right' ) ).removeClass( 'hidden' ) : this.$btnNext.add( this.$container.children( '.right' ) ).addClass( 'hidden' );
        },

        slideshowStop: function () {
            this.jGallery.progress.pause();
            this.$slideshow.removeClass( 'icon-stop' ).addClass( 'icon-play' );
            this.booSlideshowPlayed = false;
            if ( jGalleryOptions[ this.jGallery.intId ].slideshowCanRandom ) {
                this.$random.hide();
            }
        },

        slideshowPlay: function() {
            if ( this.booLoadingInProgress || this.booSlideshowPlayed ) {
                return;
            }
            this.booSlideshowPlayed = true;
            this.$slideshow.removeClass( 'icon-play' ).addClass( 'icon-stop' );
            this.slideshowSetTimeout();
            if ( jGalleryOptions[ this.jGallery.intId ].slideshowCanRandom ) {
                this.$random.show();
            }
        },

        slideshowPlayStop: function() {
            this.$slideshow.is( '.icon-play' ) ? this.slideshowPlay() : this.slideshowStop();
        },

        slideshowSetTimeout: function() {
            var self = this;
            
            this.jGallery.progress.clear().start( this.$container.width(), function() {
                self.jGallery.progress.clear();
                jGalleryOptions[ self.jGallery.intId ].slideshowRandom ? self.showRandomPhoto() : self.showNextPhotoLoop();
            } );
        },

        slideshowRandomToggle: function() {
            if ( jGalleryOptions[ this.jGallery.intId ].slideshowRandom ) {
                this.$random.removeClass( 'active' );
                jGalleryOptions[ this.jGallery.intId ].slideshowRandom = false;
            }
            else {
                this.$random.addClass( 'active' );
                jGalleryOptions[ this.jGallery.intId ].slideshowRandom = true;                    
            }
        },

        showNextPhotoLoop: function() {
            var $next = this.thumbnails.$a.filter( '.active' ).next( 'a' );
            
            if ( $next.length === 0 ) {
                $next = this.thumbnails.$albums.filter( '.active' ).find( 'a' ).eq( 0 );
            }
            this.showPhoto( $next );
        },

        showRandomPhoto: function() {
            var $thumbnailsANotActive = this.thumbnails.$albums.filter( '.active' ).find( 'a:not(.active)' );
            
            this.showPhoto( $thumbnailsANotActive.eq( Math.floor( Math.random() * $thumbnailsANotActive.length ) ) );
        },

        showPrevPhoto: function() {
            var $prev = this.thumbnails.$a.filter( '.active' ).prev( 'a' );
            if ( $prev.length === 1 ) {
                this.showPhoto( $prev );
            } 
        },

        showNextPhoto: function() {
            var $next = this.thumbnails.$a.filter( '.active' ).next( 'a' );
            if ( $next.length === 1 ) {
                this.showPhoto( $next );
            }
        },

        showPhotoInit: function() {
            this.jGallery.init();
        },
        
        
        showPhoto: function( $a, options ) {
            var self = this;
            var $imgThumb = $a.children( 'img' );
            var booIsLoaded;
            var albumTitle;
            var transition;

            if ( ! this.jGallery.initialized() ) {
                this.showPhotoInit();
            }
            if ( this.booLoadingInProgress ) {
                return;
            }
            this.booLoadingInProgress = true;
            transition = jGalleryTransitions[ jGalleryOptions[ this.jGallery.intId ][ $a.nextAll( '.active' ).length > 0 ? 'transitionBackward' : 'transition' ] ];
            this.advancedAnimation.setHideEffect( transition[0] );
            this.advancedAnimation.setShowEffect( transition[1] );
            this.$element.find( '.pt-page.init' ).remove();
            jGalleryOptions[ this.jGallery.intId ].showPhoto();
            if ( this.jGallery.$element.is( ':not(:visible)' ) ) {
                this.jGallery.show();
            }
            this.thumbnails.changeViewToBar();
            if ( this.jGallery.booIsAlbums ) {
                if ( this.jGallery.iconChangeAlbum.getTitle() === '' ) {
                    albumTitle = $a.parents( '.album' ).eq( 0 ).attr( 'data-jgallery-album-title' );
                    this.jGallery.iconChangeAlbum.setTitle( albumTitle );
                    this.jGallery.iconChangeAlbum.$element.find( '[data-jgallery-album-title="' + albumTitle + '"]' ).addClass( 'active' );
                    $a.parents( '.album' ).addClass( 'active' ).siblings( '.album' ).removeClass( 'active' );
                }
            }
            this.thumbnails.setActiveAlbum( this.thumbnails.$albums.filter( '[data-jgallery-album-title="' + $a.parents( '[data-jgallery-album-title]' ).attr( 'data-jgallery-album-title' ) + '"]' ) );
            this.thumbnails.setActiveThumb( $a );
            if ( this.$element.find( 'img.active' ).attr( 'src' ) === $a.attr( 'href' ) ) {
                this.booLoadingInProgress = false;
                return;
            }
            this.refreshNav();
            clearTimeout( this.jGallery.loaderTimeout );
            if ( jGalleryOptions[ this.jGallery.intId ].transition === 'random' ) {
                this.setRandomTransition();
            }
            if ( jGalleryOptions[ this.jGallery.intId ].title ) {
                this.$title.addClass( 'after fade' );
            }
            booIsLoaded = self.isLoaded( $a );
            if ( ! booIsLoaded ) {
                if ( jGalleryOptions[ self.jGallery.intId ].preloadAll && ! self.booLoadedAll ) {
                    this.appendAllPhotos();
                }
                else {
                    this.appendPhoto( $a );
                }
            }
            this.$element.find( 'img.active' ).addClass( 'prev-img' );
            self.$container.find( 'img.active' ).removeClass( 'active' );
            self.$container.find( '[src="' + $a.attr( 'href' ) + '"]' ).addClass( 'active' );
            if ( jGalleryOptions[ self.jGallery.intId ].title && $imgThumb.is( '[alt]' ) ) {
                self.$title.removeClass( 'after' ).addClass( 'before' );
            }
            if ( ! booIsLoaded || ( jGalleryOptions[ self.jGallery.intId ].preloadAll && ! self.booLoadedAll ) ) {
                self.booLoadedAll = true;
                self.$container.overlay( {'show': true, 'showLoader': true} );
                jGalleryOptions[ self.jGallery.intId ].beforeLoadPhoto();
                self.loadPhoto( self.$element, $a, options );
            }
            else {
                self.showPhotoSuccess( $imgThumb, options );
            }
        },
        
        appendPhoto: function ( $a ) {
            this.$element.find( '.pt-part' ).append( '\
                <div class="jgallery-container pt-page">\
                    <div class="pt-item"><img src="' + $a.attr( 'href' ) + '" /></div>\
                </div>' );
        },

        appendAllPhotos: function() {       
            var self = this;
            
            if ( ! jGalleryOptions[ this.jGallery.intId ].preloadAll ) {
                return;
            }                
            this.thumbnails.$a.each( function() {
                var $a = $( this );
                if ( ! self.isLoaded( $a ) ) {
                    self.$element.find( '.pt-part' ).append( '<div class="jgallery-container pt-page"><div class="pt-item"><img src="' + $a.attr( 'href' ) + '" /></div></div>' );
                }
            } );
            this.appendInitPhoto( this.thumbnails.$a.eq( -1 ) );
        },
        
        appendInitPhoto: function( $a ) {
            if ( $a.length !== 1 ) {
                return;
            }
            this.$element.find( '.pt-part' ).append( '\
                <div class="jgallery-container pt-page pt-page-current pt-page-ontop init" style="visibility: hidden;">\
                    <div class="pt-item"><img src="' + $a.attr( 'href' ) + '" class="active loaded" /></div>\
                </div>' );
        },
       
        loadPhoto: function( $zoom, $a, options ) {
            var self = this;
            var $imgThumb = $a.children( 'img' );
            var intPercent = 0;
            var $toLoading = jGalleryOptions[ this.jGallery.intId ].preloadAll ? $zoom : $zoom.find( 'img.active' );

            $toLoading.jLoader( {
                interval: 500,
                skip: '.loaded',
                start: function() {   
                    if ( jGalleryOptions[ self.jGallery.intId ].preloadAll ) {
                        self.$container.find( '.overlay .imageLoaderPositionAbsolute:not(:has(.progress-value))' ).addClass( 'preloadAll' )
                            .append( '<span class="progress-value"></span>' );
                        self.$container.find( '.progress-value' ).html( '0' );
                    }
                    else {
                        self.$container.find( '.overlay .imageLoaderPositionAbsolute:not(:has(.icon-spin))' )
                            .append( '<span class="icon-spin icon-spinner"></span>' );                            
                    }
                },
                success: function() {
                    $zoom.find( 'img' ).addClass( 'loaded' );
                    self.$container.overlay( {'hide': true, 'hideLoader': true} );
                    clearInterval( self.jGallery.loaderTimeout );                                                  
                    self.jGallery.loaderTimeout = setTimeout( function() {
                        self.showPhotoSuccess( $imgThumb, options );
                    }, 500 );
                },
                progress: function( data ) {
                    if ( ! jGalleryOptions[ self.jGallery.intId ].preloadAll ) {
                        return;
                    }
                    intPercent = data.percent;
                    self.$container.find( '.overlay .imageLoaderPositionAbsolute' ).find( '.progress-value' ).html( intPercent );
                }
            } );
        },

        showPhotoSuccess: function( $imgThumb, options ) {
            var image;
            var $active = this.$element.find( 'img.active' );
            
            options = $.extend( {}, {
                historyPushState: true
            }, options );            
            if ( $active.is( ':not([data-width])' ) ) {
                image = new Image();
                image.src = $active.attr( 'src' );
                $active.attr( 'data-width', image.width );
                $active.attr( 'data-height', image.height );
            }
            if ( jGalleryOptions[ this.jGallery.intId ].title && $imgThumb.is( '[alt]' ) ) {
                this.$title.html( $imgThumb.attr( 'alt' ) ).removeClass( 'before' ).removeClass( 'after' );
            }
            this.jGallery.setColours( {
                strBg: $imgThumb.is( '[data-jgallery-bg-color]' ) ? $imgThumb.attr( 'data-jgallery-bg-color' ) : jGalleryOptions[ this.jGallery.intId ].backgroundColor,
                strText: $imgThumb.is( '[data-jgallery-bg-color]' ) ? $imgThumb.attr( 'data-jgallery-text-color' ) : jGalleryOptions[ this.jGallery.intId ].textColor
            } );
            this.$element.find( '.pt-page.init' ).css( {
                visibility: 'visible'
            } );
            this.$element.find( 'img.prev-img' ).removeClass( 'prev-img' );
            this.advancedAnimation.show( $active.eq( 0 ).parent().parent(), {
                animation: this.$element.find( '.pt-part' ).eq( 0 ).find( '.pt-page-current:not(.pt-page-prev)' ).length === 1
            } );
            this.refreshSize();
            this.thumbnails.refreshNavigation();
            if ( this.booSlideshowPlayed ) {
                this.slideshowSetTimeout();
            }
            jGalleryOptions[ this.jGallery.intId ].afterLoadPhoto();
            this.booLoadingInProgress = false;
            if ( jGalleryOptions[ this.jGallery.intId ].autostart && jGalleryOptions[ this.jGallery.intId ].slideshowAutostart && jGalleryOptions[ this.jGallery.intId ].slideshow ) {
                jGalleryOptions[ this.jGallery.intId ].slideshowAutostart = false;
                this.slideshowPlay();
            }
            if ( jGalleryOptions[ this.jGallery.intId ].draggableZoom ) {
                this.$dragNav.html( '<img src="' + $active.attr( 'src' ) + '" class="bg">\
                    <div class="crop"><img src="' + $active.attr( 'src' ) + '"></div>' );
                this.$dragNavCrop = this.$dragNav.find( '.crop' );
                this.$dragNavCropImg = this.$dragNavCrop.find( 'img' );   
                this.refreshDragNavCropSize();
            }
            if ( options.historyPushState && jGalleryOptions[ this.jGallery.intId ].browserHistory ) {
                historyPushState( {
                    path: $active.attr( 'src' )
                } );
            }
        },
        
        showPhotoByPath: function( path ) {
            var $a = this.thumbnails.$albums.filter( '.active' ).find( 'a[href="' + path + '"]' );
            
            if ( $a.length === 0 ) {
                $a = this.thumbnails.$a.filter( 'a[href="' + path + '"]' ).eq( 0 );
            }
            if ( $a.length === 0 ) {
                return;
            }
            this.showPhoto( $a, {
                historyPushState: false
            } );
        },
        
        setTransition: function( transition ) {
            jGalleryOptions[ this.jGallery.intId ].hideEffect = jGalleryTransitions[ transition ][ 0 ];
            jGalleryOptions[ this.jGallery.intId ].showEffect = jGalleryTransitions[ transition ][ 1 ];
            this.advancedAnimation.setHideEffect( jGalleryOptions[ this.jGallery.intId ].hideEffect );
            this.advancedAnimation.setShowEffect( jGalleryOptions[ this.jGallery.intId ].showEffect );    
        },
        
        setRandomTransition: function() {
            var rand;
            
            this.$element.find( '.pt-page' )
                .removeClass( jGalleryOptions[ this.jGallery.intId ].hideEffect )
                .removeClass( jGalleryOptions[ this.jGallery.intId ].showEffect );
            rand = Math.floor( ( Math.random() * jGalleryArrayTransitions.length ) );
            jGalleryOptions[ this.jGallery.intId ].hideEffect = jGalleryArrayTransitions[ rand ][ 0 ];
            jGalleryOptions[ this.jGallery.intId ].showEffect = jGalleryArrayTransitions[ rand ][ 1 ];
            this.advancedAnimation.setHideEffect( jGalleryOptions[ this.jGallery.intId ].hideEffect );
            this.advancedAnimation.setShowEffect( jGalleryOptions[ this.jGallery.intId ].showEffect ); 
        },
        
        unmarkActive: function() {
            this.$element.find( 'img.active' ).removeClass( 'active' );
        },
        
        changeMode: function() {
            var currentMode = jGalleryOptions[ this.jGallery.intId ].mode;
            
            if ( currentMode === 'slider' ) {
                return;
            }
            if ( currentMode === 'standard' ) {
                this.goToFullScreenMode();
            }
            else if ( currentMode === 'full-screen' ) {
                this.goToStandardMode();
            }
            if ( this.jGallery.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.jGallery.iconChangeAlbum.refreshMenuHeight();
            }
        },
        
        goToFullScreenMode: function() {
            $body.css( {
                overflow: 'hidden'
            } );
            this.jGallery.$this.show();
            this.jGallery.$element.removeClass( 'jgallery-standard' ).addClass( 'jgallery-full-screen' ).css( {
                width: 'auto',
                height: 'auto'
            } );
            this.$changeMode.removeClass( 'icon-resize-full' ).addClass( 'icon-resize-small' );
            jGalleryOptions[ this.jGallery.intId ].mode = 'full-screen';
            this.jGallery.refreshDimensions();
        },
        
        goToStandardMode: function() {
            $body.css( {
                overflow: 'visible'
            } );
            this.jGallery.$this.hide();
            this.jGallery.$element.removeClass( 'jgallery-full-screen' ).addClass( 'jgallery-standard' ).css( {
                width: jGalleryOptions[ this.jGallery.intId ].width,
                height: jGalleryOptions[ this.jGallery.intId ].height
            } );
            this.$changeMode.removeClass( 'icon-resize-small' ).addClass( 'icon-resize-full' );
            jGalleryOptions[ this.jGallery.intId ].mode = 'standard';
            this.jGallery.refreshDimensions();
        }
    };
    
    
        
    var jGallery = function( $this ) {
        var self = this;
        
        this.booIsAlbums = $this.find( '.album:has(a:has(img))' ).length > 1;
        this.intId = jGalleryId;
        this.$this = $this;
        if ( jGalleryOptions[ this.intId ].disabledOnIE8AndOlder && isInternetExplorer8AndOlder() ) {
            return;
        }
        this.init();
        if ( jGalleryOptions[ this.intId ].autostart ) {
            this.autostart();
        }
        if ( jGalleryOptions[ this.intId ].browserHistory ) {
            this.browserHistory();
        }
        $( 'html' ).on( {
            keydown: function( event ) {
                if ( self.$element.is( ':visible' ) ) {
                    if ( event.which === 27 ) {
                        event.preventDefault();
                        if ( self.thumbnails.getElement().is( '.full-screen' ) ) {
                            self.thumbnails.changeViewToBar();
                            self.zoom.refreshSize();
                            return;
                        }
                        self.hide();
                    }
                    if ( event.which === 37 ) {
                        event.preventDefault();
                        self.zoom.showPrevPhoto();
                    }
                    if ( event.which === 39 ) {
                        event.preventDefault();
                        self.zoom.showNextPhoto();
                    }
                }
            }
        } );
    };
    
    jGallery.prototype = {         
        initialized: function() {
            return this.$this.is( '[data-jgallery-id]' );
        },
        
        update: function( options ) {
            jGalleryOptions[ this.intId ] = this.initialized() ? $.extend( jGalleryOptions[ this.intId ], options ) : $.extend( {}, defaults, options );
            if ( jGalleryOptions[ this.intId ].disabledOnIE8AndOlder && isInternetExplorer7AndOlder() ) {
                return;
            }
            this.booIsAlbums = this.$this.find( '.album:has(a:has(img))' ).length > 1;
            if ( jGalleryOptions[ this.intId ].reloadThumbnails ) {
                this.reloadThumbnails();
            }
            this.zoom.update();
            this.thumbnails.init();
            this.setUserOptions();
        },
        
        reloadThumbnails: function() {
            new ThumbnailsGenerator( this, {
                thumbsHidden: false
            } );
            this.thumbnails.reload();
            this.generateAlbumsDropdown();
        },

        setVariables: function() {
            this.$element = $( '.jgallery' ).filter( '[data-jgallery-id="' + this.intId + '"]' );
            this.progress = new Progress( this.$element.find( '.zoom-container' ).children( '.progress' ), this.intId );
            this.zoom = new Zoom( this );
            this.thumbnails = new Thumbnails( this );
            this.zoom.setThumbnails( this.thumbnails );
        },

        show: function() {
            this.$this.hide();
            $window.on( 'resize', { jGallery: this }, this.windowOnResize );
            if ( jGalleryOptions[ this.intId ].mode === 'full-screen' ) {
                $body.css( {
                    'overflow': 'hidden'
                } );
            }
            this.$element.not( ':visible' ).removeClass( 'hidden' ).stop( false, true ).fadeIn( 500 );
            this.zoom.refreshContainerSize();
            this.zoom.$title.removeClass( 'hidden' );  
            jGalleryOptions[ this.intId ].showGallery();
            if ( this.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.iconChangeAlbum.refreshMenuHeight();
            }
        },

        hide: function( options ) {
            var self = this;
            
            if ( ! jGalleryOptions[ this.intId ].canClose ) {
                return;
            }
            options = $.extend( {}, {
                historyPushState: true
            }, options );  
            this.$element.filter( ':visible' ).stop( false, true ).addClass( 'hidden' ).fadeOut( 500, function() {
                if ( jGalleryOptions[ self.intId ].mode === 'full-screen' ) {   
                    $body.css( {
                        'overflow': 'visible'
                    } );
                }
            } );
            this.zoom.booLoadingInProgress = false;
            clearTimeout( this.zoom.showPhotoTimeout );
            this.zoom.$title.addClass( 'hidden' );
            this.zoom.$btnPrev.addClass( 'hidden' );
            this.zoom.$btnNext.addClass( 'hidden' );
            this.zoom.slideshowStop();
            this.zoom.advancedAnimation.hideActive();
            this.zoom.unmarkActive();
            $window.off( 'resize', this.windowOnResize );
            this.$this.show();
            if ( options.historyPushState && jGalleryOptions[ this.intId ].browserHistory ) {
                historyPushState();
            }
            jGalleryOptions[ this.intId ].closeGallery();
        },
        
        autostart: function() {
            var $album;
            var $thumb;
            
            if ( this.booIsAlbums ) {
                $album = this.thumbnails.getElement().find( '.album' ).eq( jGalleryOptions[ this.intId ].autostartAtAlbum - 1 );
                if ( $album.length === 0 ) {
                    $album = this.thumbnails.getElement().find( '.album' ).eq( 0 );
                }
            }
            else {
                $album = this.thumbnails.getElement();
            }
            $thumb = $album.find( 'a' ).eq( jGalleryOptions[ this.intId ].autostartAtImage - 1 );
            if ( $thumb.length === 0 ) {
                $thumb = $album.find( 'a' ).eq( 0 );
            }
            $thumb.trigger( 'click' );
        },
        
        browserHistory: function() {
            var self = this;
            var windowOnPopState = window.onpopstate;

            function callActionByUrl() {
                var hash;

                if ( ! location.hash ) { 
                    return;
                }
                hash = location.hash.replace( '#', '' );
                switch ( hash ) {
                    case '':
                        self.hide( {
                            historyPushState: false
                        } );
                        break;
                    default:
                        self.zoom.showPhotoByPath( hash );
                }
            }

            window.onpopstate = function() {
                if ( typeof windowOnPopState === 'function' ) {
                    windowOnPopState();
                }
                callActionByUrl();
            };

            callActionByUrl();
        },
        
        generateAlbumsDropdown: function() {
            var self = this;
            
            this.$element.find( '.change-album' ).remove();
            if ( ! this.booIsAlbums ) {
                return;
            }
            this.zoom.$container.find( '.nav-bottom' ).append( '\
                <span class="icon- icon-list-ul change-album jgallery-btn jgallery-btn-small">\
                    <span class="menu jgallery-btn"></span>\
                    <span class="title"></span>\
                </span>\
            ' );
            this.iconChangeAlbum = new IconChangeAlbum( self.zoom.$container.find( '.change-album' ), this );
            this.iconChangeAlbum.clearMenu();
            this.thumbnails.$albums.each( function() {
                var strTitle = $( this ).attr( 'data-jgallery-album-title' );

                self.iconChangeAlbum.appendToMenu( '<span class="item" data-jgallery-album-title="' + strTitle + '">' + strTitle + '</span>' );
            } );
            this.thumbnails.getElement().append( this.iconChangeAlbum.getElement().outerHtml() );
            this.iconChangeAlbum = new IconChangeAlbum( this.iconChangeAlbum.getElement().add( this.thumbnails.getElement().children( ':last-child' ) ), this );
            this.iconChangeAlbum.bindEvents( this );
        },
        
        init: function() {
            var self = this;
            
            $head.append( '<style type="text/css" class="colours" data-jgallery-id="' + this.intId + '"></style>' );
            jGalleryOptions[ this.intId ].initGallery();
            this.$this.attr( 'data-jgallery-id', this.intId );
            this.generateHtml();
            new ThumbnailsGenerator( this );
            this.setVariables();
            this.thumbnails.init();
            this.thumbnails.getElement().append( '<span class="icon- icon-remove jgallery-btn jgallery-close jgallery-btn-small"></span>' );
            this.generateAlbumsDropdown();
            self.setUserOptions();
            if ( jGalleryOptions[ self.intId ].zoomSize === 'fit' || jGalleryOptions[ self.intId ].zoomSize === 'original' ) {
                self.zoom.$resize.addClass( 'icon-zoom-in' );
            }
            if ( jGalleryOptions[ self.intId ].zoomSize === 'fill' ) {
                self.zoom.$resize.addClass( 'icon-zoom-out' );
            }
            if ( ! isInternetExplorer() ) {
                self.$element.addClass( 'text-shadow' );
            }
            self.thumbnails.refreshNavigation();
            self.zoom.refreshNav();
            self.zoom.refreshSize();
            this.$this.on( 'click', 'a:has(img)', function( event ) {
                var $this = $( this );

                event.preventDefault();
                self.zoom.showPhoto( $this );
            } );

            self.thumbnails.$element.on( 'click', 'a', function( event ) {
                var $this = $( this );

                event.preventDefault();
                if ( $this.is( ':not(.active)' ) ) {
                    self.zoom.slideshowStop();
                    self.zoom.showPhoto( $this );
                }
                else if ( self.thumbnails.isFullScreen() ) {
                    self.thumbnails.changeViewToBar();
                    self.zoom.refreshSize();
                }
            } ); 

            self.zoom.$btnPrev.add( self.zoom.$container.find( '.left' ) ).on( {
                click: function() {
                    self.zoom.slideshowStop();
                    self.zoom.showPrevPhoto();
                }
            } );

            self.zoom.$btnNext.add( self.zoom.$container.find( '.right' ) ).on( {
                click: function() {
                    self.zoom.slideshowStop();
                    self.zoom.showNextPhoto();
                }
            } );

            self.zoom.$container.find( '.jgallery-close' ).on( {
                click: function() {
                    self.hide();
                }
            } );

            self.zoom.$random.on( {
                click: function() {
                    self.zoom.slideshowRandomToggle();
                }
            } );

            self.zoom.$resize.on( {
                click: function() {
                    self.zoom.changeSize();
                }
            } ); 

            self.zoom.$changeMode.on( {
                click: function() {
                    self.zoom.changeMode();
                }
            } ); 

            self.zoom.$slideshow.on( {
                click: function() {
                    self.zoom.slideshowPlayStop();
                }
            } );   

            self.zoom.$container.find( '.minimalize-thumbnails' ).on( {
                click: function() {
                    self.thumbnails.toggle();
                    self.zoom.refreshSize();
                }
            } );  
           
            self.thumbnails.bindEvents(); 
        },
        
        isSlider: function() {
            return jGalleryOptions[ this.intId ].mode === 'slider';
        },
        
        windowOnResize: function( event ) {
            event.data.jGallery.refreshDimensions();
        },
        
        refreshDimensions: function() {
            this.zoom.refreshSize();
            if ( this.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.iconChangeAlbum.refreshMenuHeight();
            }
            this.thumbnails.refreshNavigation();
        },
        
        getCanvasRatioWidthToHeight: function() {
            var intCanvasWidth;
            var intCanvasHeight;
            
            if ( this.thumbnails.isHorizontal() ) {
                intCanvasWidth = this.$element.width();
                intCanvasHeight = this.$element.height() - this.thumbnails.getElement().outerHeight( true );
            }
            else if ( this.thumbnails.isVertical() ) {
                intCanvasWidth = this.$element.width() - this.thumbnails.getElement().outerWidth( true );
                intCanvasHeight = this.$element.height();
            }
            else {
                intCanvasWidth = this.$element.width();
                intCanvasHeight = this.$element.height();                    
            }
            return intCanvasWidth / intCanvasHeight;
        },

        setUserOptions: function() {
            jGalleryOptions[ this.intId ].canResize ? this.zoom.$resize.show() : this.zoom.$resize.hide();
            jGalleryOptions[ this.intId ].canChangeMode ? this.zoom.$changeMode.show() : this.zoom.$changeMode.hide();
            jGalleryOptions[ this.intId ].mode === 'standard' ? this.zoom.$changeMode.removeClass( 'icon-resize-small' ).addClass( 'icon-resize-full' ) : this.zoom.$changeMode.removeClass( 'icon-resize-full' ).addClass( 'icon-resize-small' );
            jGalleryOptions[ this.intId ].canClose ? this.zoom.$container.find( '.jgallery-close' ).show() : this.zoom.$container.find( '.jgallery-close' ).hide();
            if ( ! jGalleryOptions[ this.intId ].thumbnails ) {
                this.thumbnails.getElement().addClass( 'inactive' );
                jGalleryOptions[ this.intId ].thumbnailsPosition = '';
            }
            else {
                this.thumbnails.getElement().removeClass( 'inactive' );
                if ( jGalleryOptions[ this.intId ].thumbnailsPosition === '' ) {
                    jGalleryOptions[ this.intId ].thumbnailsPosition = defaults.thumbnailsPosition;
                }                    
            }
            jGalleryOptions[ this.intId ].slideshow ? this.zoom.$slideshow.show() : this.zoom.$slideshow.hide();
            jGalleryOptions[ this.intId ].slideshow && jGalleryOptions[ this.intId ].slideshowCanRandom ? this.zoom.$random.show(): this.zoom.$random.hide();
            jGalleryOptions[ this.intId ].slideshow && jGalleryOptions[ this.intId ].slideshowCanRandom && jGalleryOptions[ this.intId ].slideshowRandom ? this.zoom.$random.addClass( 'active' ) : this.zoom.$random.removeClass( 'active' );

            jGalleryOptions[ this.intId ].thumbnailsFullScreen && jGalleryOptions[ this.intId ].thumbnails ? this.zoom.$container.find( '.full-screen' ).add( this.thumbnails.getElement().find( '.jgallery-close' ) ).show() : this.zoom.$container.find( '.full-screen' ).add( this.thumbnails.getElement().find( '.jgallery-close' ) ).hide();
            jGalleryOptions[ this.intId ].thumbnailsFullScreen && jGalleryOptions[ this.intId ].thumbnails ? this.zoom.$container.find( '.change-album' ).show() : this.zoom.$container.find( '.change-album' ).hide();
            jGalleryOptions[ this.intId ].canMinimalizeThumbnails && jGalleryOptions[ this.intId ].thumbnails ? this.zoom.$container.find( '.minimalize-thumbnails' ).show() : this.zoom.$container.find( '.minimalize-thumbnails' ).hide();
            jGalleryOptions[ this.intId ].hideThumbnailsOnInit && jGalleryOptions[ this.intId ].thumbnails ? this.thumbnails.hide() : this.thumbnails.show();

            this.setColours( {
                strBg: jGalleryOptions[ this.intId ].backgroundColor,
                strText: jGalleryOptions[ this.intId ].textColor
            } );
        },
        
        setColours: function( options ) {
            $head.find( 'style[data-jgallery-id="' + this.intId + '"].colours' ).html( this.getCssForColours( options ) );
        },
        
        generateHtml: function() {
            var mode = jGalleryOptions[ this.intId ].mode;
            var width = mode === 'full-screen' ? 'auto' : jGalleryOptions[ this.intId ].width;
            var height = mode === 'full-screen' ? 'auto' : jGalleryOptions[ this.intId ].height;
            var html = '\
                <div class="jgallery jgallery-' + mode + '" style="width: ' + width + '; height: ' + height + '; display: none;" data-jgallery-id="' + this.intId + '">\
                    <div class="jgallery-thumbnails hidden">\
                        <div class="jgallery-container"><div class="jgallery-container-inner"></div></div>\
                        <span class="prev jgallery-btn hidden"><span class="icon-chevron-left ico"></span></span>\
                        <span class="next jgallery-btn hidden"><span class="icon-chevron-right ico"></span></span>\
                    </div>\
                    <div class="zoom-container">\
                        <div class="title before"></div>\
                        <div class="zoom before pt-perspective"></div>\
                        <div class="drag-nav hide"></div>\
                        <div class="left"></div>\
                        <div class="right"></div>\
                        <span class="icon-chevron-left prev jgallery-btn jgallery-btn-large"></span>\
                        <span class="icon-chevron-right next jgallery-btn jgallery-btn-large"></span>\
                        <span class="progress"></span>\
                        <div class="nav">\
                            <span class="icon- resize jgallery-btn jgallery-btn-small"></span>\
                            <span class="icon- change-mode jgallery-btn jgallery-btn-small"></span>\
                            <span class="icon-remove jgallery-close jgallery-btn jgallery-btn-small"></span>\
                        </div>\
                        <div class="nav-bottom">\
                            <span class="icon- icon-play slideshow jgallery-btn jgallery-btn-small"></span>\
                            <span class="icon- icon-random random jgallery-btn jgallery-btn-small inactive" style="display: none;"></span>\
                            <span class="icon- icon-th full-screen jgallery-btn jgallery-btn-small"></span>\
                            <span class="icon- icon-ellipsis-horizontal minimalize-thumbnails jgallery-btn jgallery-btn-small inactive"></span>\
                        </div>\
                    </div>\
                </div>';
            
            if ( mode === 'full-screen' ) {
                this.$jgallery = $( jGalleryOptions[ this.intId ].appendTo ).append( html ).children( ':last-child' );
            }
            else {
                if ( jGalleryOptions[ this.intId ].autostart ) {
                    this.$this.hide();
                }
                this.$jgallery = this.$this.after( html ).next();
            }
            
        },
        
        getCssForColours: function( objOptions ) {
            objOptions = $.extend( {
                strBg: 'rgb( 0, 0, 0 )',
                strText: 'rgb( 255, 255, 255 )'
            }, objOptions );

            var arrBg = tinycolor( objOptions.strBg ).toRgb();
            var arrBgAlt = arrBg.r + arrBg.g + arrBg.b > 375 ? tinycolor.darken( objOptions.strBg ).toRgb() : tinycolor.lighten( objOptions.strBg ).toRgb();
            var arrText = tinycolor( objOptions.strText ).toRgb();

            return '\
                .jgallery[data-jgallery-id="' + this.intId + '"] {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  text-shadow: 0 0 1px rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn.active {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn:hover {\
                  text-shadow: none;\
                  text-shadow: 0 0 .15em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.75), 0 0 .45em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .full-screen .change-album .menu {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item {\
                  border-color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .full-screen .change-album .menu .item {\
                  border-color: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item.active,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item:hover {\
                  background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container:not([data-size="fill"]) .jgallery-container {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .title {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  -webkit-box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .drag-nav {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .drag-nav .crop {\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .ico {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .jgallery-container {\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .prev:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0)));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .next:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0)),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1)));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.images a:after {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .prev,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.square a {\
                  background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .overlayContainer .overlay {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.8);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .overlayContainer .imageLoaderPositionAbsolute:after {\
                  border-color: rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5 );\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .prev {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .prev:before {\
                  background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
                  background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%));\
                  background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .next:before {\
                  background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
                  background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%));\
                  background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .prev {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .prev:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .next:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .jgallery-btn {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.8);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
            ';
        }
    };    
        
    $.fn.jGallery = function( userOptions ) {
        return this.each( function() {
            var $this = $( this );
            
            $( function() {
                var modeIsDefined = typeof userOptions !== 'undefined' && typeof userOptions.mode !== 'undefined';
                var options = defaults;

                if ( $this.is( '[data-jgallery-id]' ) && modeIsDefined ) {
                    delete userOptions.mode;
                    modeIsDefined = false;
                }
                if ( $this.is( '[data-jgallery-id]' ) ) {
                    options = jGalleryOptions[ $this.attr( 'data-jgallery-id' ) ];
                }
                if ( modeIsDefined && userOptions.mode === 'standard' ) {
                    options = $.extend( {}, options, defaultsStandardMode, userOptions, requiredStandardMode );
                }
                else if ( modeIsDefined && userOptions.mode === 'slider' ) {
                    options = $.extend( {}, options, defaultsSliderMode, userOptions, requiredSliderMode );
                }
                else {
                    options = $.extend( {}, options, userOptions );
                }            
                if ( ! $this.is( '[data-jgallery-id]' ) ) {
                    jGalleryOptions[ ++jGalleryId ] = options;
                    jGalleryCollection[ jGalleryId ] = new jGallery( $this );
                }
                else {
                    jGalleryCollection[ $this.attr( 'data-jgallery-id' ) ].update( options );
                    jGalleryOptions[ $this.attr( 'data-jgallery-id' ) ] = options;
                }
            } );
        } );
    };
    
    $.jGalleryOptions = function() {
        return jGalleryOptions;
    };
    
    $.jGalleryTransitions = function() {
        return jGalleryTransitions;
    };
            
    
    
    var intAdvancedAnimationLastId = 0;

    var AdvancedAnimation = function( $this ) {
        if ( $this.is( '[data-advanced-animation-id]') ) {
            return;
        }
        this.cols = 1;
        this.rows = 1;
        this.direction = 'forward';
        this.animation = true;
        this.$element = $this;
        this.$element.filter( ':not( [data-advanced-animation-id] )' ).attr( 'data-advanced-animation-id', ++intAdvancedAnimationLastId );
        this.$element.find( '.pt-item' ).wrap( '<div class="pt-page" />' );
        this.$element.wrapInner( '<div class="pt-part" />' );
        this.generateHtml();
        this._showParts( this.$element.find( '.pt-part' ), 1 );
    };

    AdvancedAnimation.prototype = {
        next: function() {
            var $next = this.$element.find( '.pt-part' ).eq( this.direction === 'backward' ? -1 : 0 ).find( '.pt-page-current:not(.pt-page-prev)' ).next();

            if ( $next.length ) {
                this.show( $next );
            }
            else {
                this.show( this.$element.find( '.pt-part' ).eq( this.direction === 'backward' ? -1 : 0 ).find( '.pt-page' ).eq( 0 ) );
            }
        },

        show: function( $new, options ) {
            var intPtPageNumber = $new.prevAll().length + 1;
            
            if ( $new.is( '.pt-page-current:not(.pt-page-prev)' ) ) {
                return;
            }
            options = $.extend( {}, {
                animation: true
            }, options );
            this.animation = options.animation;
            this._waveJumpToEnd();
            if ( this.animation ) {
                this._runWave( intPtPageNumber );
            } else {
                this._showParts( this.$element.find( '.pt-part' ), intPtPageNumber );
            }
            this.intPrevPtPageNumber = intPtPageNumber;
        },

        setQuantityParts: function( intCols, intRows ) {
            this.cols = intCols;
            this.rows = intRows;
            this.generateHtml();
        },

        setDuration: function( duration ) {
            var intId = this.$element.attr( 'data-advanced-animation-id' );
            var $stylesheet = $head.find( 'style[data-advanced-animation-id="' + intId + '"]' );
            
            this.duration = duration;
            if ( isInternetExplorer8AndOlder() ) {
                return;
            }
            if ( $stylesheet.length === 0 ) {
                $stylesheet = $head.append( '<style type="text/css" data-advanced-animation-id="' + intId + '" />' ).children( ':last-child' );
            }
            $stylesheet.html('\
                [data-advanced-animation-id="' + intId + '"] .pt-page {\
                    -webkit-animation-duration: ' + duration + ';\
                    -moz-animation-duration: ' + duration + ';\
                    animation-duration: ' + duration + ';\
                }\
            ');
        },

        setHideEffect: function( hideEffect ) {
            this.prevHideEffect = this.hideEffect;
            this.hideEffect = hideEffect;
            if ( /moveTo|rotateRoom|rotateCarousel|rotateSlideOut/.test( hideEffect ) ) {
                this.$element.find( '.pt-part' ).addClass( 'hide-overflow' );
            }
            else {
                this.$element.find( '.pt-part' ).removeClass( 'hide-overflow' );                
            }
        },

        setShowEffect: function( showEffect ) {
            this.prevShowEffect = this.showEffect;
            this.showEffect = showEffect;
        },

        setDirection: function( direction ) {
            this.direction = direction;
        },

        _runWave: function( intPtPageNumber ) {
            this.$element.find( '.pt-part' ).addClass( 'in-queue' );
            this._showNextPart( intPtPageNumber );
        },

        _waveJumpToEnd: function() {
            clearTimeout( this.showPartsTimeout );
            if ( typeof this.intPrevPtPageNumber !== 'undefined' ) {
                this._showParts( this.$element.find( '.pt-part.in-queue' ).removeClass( 'in-queue' ), this.intPrevPtPageNumber );
            }
        },

        _showNextPart: function( intPtPageNumber ) {
            var self = this;
            var $part = this.$element.find( '.pt-part.in-queue' ).eq( this.direction === 'backward' ? -1 : 0 );

            if ( $part.length === 0 ) {
                return;
            }
            this._showParts( $part.removeClass( 'in-queue' ), intPtPageNumber );
            if ( $part.length === 0 ) {
                return;
            }
            clearTimeout( this.showPartsTimeout );
            this.showPartsTimeout = setTimeout( function() {
                self._showNextPart( intPtPageNumber );
            }, parseFloat( this.duration ) * 1000 * 0.25 / Math.max( 1, this.$element.find( '.pt-part' ).length - 1 ) );
        },

        _showParts: function( $this, intPtPageNumber ) {
            $this.find( '.pt-page-current.pt-page-prev' ).removeClass( 'pt-page-prev' ).removeClass( 'pt-page-current' );
            $this.find( '.pt-page-current' ).addClass( 'pt-page-prev' );
            $this.find( '.pt-page:nth-child(' + intPtPageNumber + ')' ).addClass( 'pt-page-current' );
            $this.find( '.pt-page' ).removeClass( this.hideEffect ).removeClass( this.showEffect );
            if ( typeof this.prevHideEffect !== 'undefined' ) {
                $this.find( '.pt-page' ).removeClass( this.prevHideEffect );
            }
            if ( typeof this.prevShowEffect !== 'undefined' ) {
                $this.find( '.pt-page' ).removeClass( this.prevShowEffect );
            }
            if ( this.animation ) {
                $this.find( '.pt-page-prev' ).addClass( this.hideEffect );
                $this.find( '.pt-page-current:not(.pt-page-prev)' ).addClass( this.showEffect );
            }
        },
        
        hideActive: function() {
            this.$element.find( '.pt-page-current' ).addClass( 'pt-page-prev' ).addClass( this.hideEffect );
        },

        generateHtml: function() {
            var intI;
            var intJ;
            var $content;

            this.$element.html( this.$element.find( '.pt-part' ).eq( 0 ).html() );
            $content = this.$element.html();
            this.$element.children( '.pt-part' ).remove();
            for ( intJ = 0; intJ < this.rows; intJ++ ) {
                for ( intI = 0; intI < this.cols; intI++ ) {
                    this.$element
                        .append( '<div class="pt-part pt-perspective" data-col-no="' + intI + '" data-row-no="' + intJ + '" style="position: absolute;"></div>' )
                        .children( ':last-child' )
                        .html( $content )
                        .find( '.pt-item' );
                }
            }
            this.setPositionParts();
            this.$element.children( ':not(.pt-part)' ).remove();
        },
        
        setPositionParts: function() {
            var self = this;
            var intWidth = this.$element.outerWidth();
            var intHeight = this.$element.outerHeight();
            var intPartWidth = intWidth / this.cols;
            var intPartHeight = intHeight / this.rows;
            
            this.$element.find( '.pt-part' ).each( function() {
                var $this = $( this );
                var intI = $this.attr( 'data-col-no' );
                var intJ = $this.attr( 'data-row-no' );
                
                $this
                .css( {
                    left: self.$element.outerWidth() * ( 100 / self.cols * intI ) / 100 + 'px',
                    top: self.$element.outerHeight() * ( 100 / self.rows * intJ ) / 100 + 'px',
                    width: self.$element.outerWidth() * ( 100 / self.cols ) / 100 + 1 + 'px',
                    height: self.$element.outerHeight() * ( 100 / self.rows ) / 100 + 1 + 'px'                   
                } )
                .find( '.pt-item' )
                .css( {
                    width: intWidth,
                    height: intHeight,
                    left: - intPartWidth * intI,
                    top: - intPartHeight * intJ
                } );
            } );          
        }
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
                    if ( intI === intCount ) {
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
            
    function historyPushState( options ) {
        options = $.extend( {}, {
            stateObj: {},
            title: $title.html(),
            path: ''
        }, options );
        window.history.pushState( options.stateObj, options.title, window.location.href.split('#')[0] + '#' + options.path );
    }
    
    function isInternetExplorer() {
        var rv = false;
        
        if ( navigator.appName === 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
            if ( re.exec(ua) !== null ) {
                rv = true;
            }
        }
        return rv;
    }
    
    function isInternetExplorer7AndOlder() {
        var rv = false;
        
        if ( navigator.appName === 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
            if ( re.exec(ua) !== null ) {
                rv = parseFloat( RegExp.$1 );
                rv = rv < 8;
            }
        }
        return rv;
    }
    
    function isInternetExplorer8AndOlder() {
        var rv = false;
        
        if ( navigator.appName === 'Microsoft Internet Explorer' ) {
            var ua = navigator.userAgent;
            var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
            if ( re.exec(ua) !== null ) {
                rv = parseFloat( RegExp.$1 );
                rv = rv < 9;
            }
        }
        return rv;
    }
} ) ( jQuery );