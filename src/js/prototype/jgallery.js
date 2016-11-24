var JGallery = ( function( outerHtml, historyPushState, isInternetExplorer, isInternetExplorer8AndOlder, refreshHTMLClasses, defaults, defaultsFullScreenMode, defaultsSliderMode, requiredFullScreenMode, requiredSliderMode, IconChangeAlbum, Progress, Thumbnails, ThumbnailsGenerator, Zoom ) {
    var $ = jQuery;
    var $html = $( 'html' );
    var $head = $( 'head' );
    var $body = $( 'body' );
    var $window = $( window );
    
    $.fn.outerHtml = outerHtml;
    
    var JGallery = function( $this, jGalleryId, options ) {
        var self = this;
        
        if ( ! jGalleryId || $this.is( '[data-jgallery-id]' ) ) {
            return;
        }     
        this.$this = $this;   
        this.intId = jGalleryId;
        this.$this.attr( 'data-jgallery-id', this.intId );
        this.overrideOptions( options ); 
        this.booIsAlbums = (this.options.items && this.options.items[0].images) ||
                $this.find( '.album:has(a:has(img))' ).length > 1;
        if ( this.options.disabledOnIE8AndOlder && isInternetExplorer8AndOlder() ) {
            return;
        }
        this.init( {
            success: function() {
                if ( self.options.browserHistory ) {
                    self.browserHistory();
                }
                if ( self.options.autostart ) {
                    self.autostart();
                }
                refreshHTMLClasses();
                $html.on( {
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
            }
        } );
    };

    JGallery.prototype = {
        template: {
            html: '<div class="jgallery" style="display: none;">\
                        <div class="jgallery-thumbnails hidden">\
                            <div class="jgallery-container"><div class="jgallery-container-inner"></div></div>\
                            <span class="prev jgallery-btn"><span class="fa fa-chevron-left ico"></span></span>\
                            <span class="next jgallery-btn"><span class="fa fa-chevron-right ico"></span></span>\
                        </div>\
                        <div class="zoom-container">\
                            <div class="zoom before pt-perspective"></div>\
                            <div class="drag-nav hide"></div>\
                            <div class="left"></div>\
                            <div class="right"></div>\
                            <span class="fa fa-chevron-left prev jgallery-btn jgallery-btn-large"></span>\
                            <span class="fa fa-chevron-right next jgallery-btn jgallery-btn-large"></span>\
                            <span class="progress"></span>\
                            <div class="nav">\
                                <span class="fa resize jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                                <span class="fa change-mode jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                                <span class="fa fa-times jgallery-close jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                            </div>\
                            <div class="nav-bottom">\
                                <div class="icons">\
                                    <span class="fa fa-play slideshow jgallery-btn jgallery-btn-small"></span>\
                                    <span class="fa fa-random random jgallery-btn jgallery-btn-small inactive"></span>\
                                    <span class="fa fa-th full-screen jgallery-btn jgallery-btn-small"></span>\
                                    <span class="fa fa-ellipsis-h minimalize-thumbnails jgallery-btn jgallery-btn-small"></span>\
                                </div>\
                                <div class="title before"></div>\
                            </div>\
                        </div>\
                    </div>',
            
            done: function( fn ) {
                fn( this.html );
            }
        },
        
        initialized: function() {
            return this.$this.is( '[data-jgallery-id]' );
        },

        update: function( options ) {
            var self = this;
            
            this.template.done( function() {
                self.overrideOptions( options ); 
                if ( self.options.disabledOnIE8AndOlder && isInternetExplorer8AndOlder() ) {
                    return;
                }
                self.booIsAlbums = self.$this.find( '.album:has(a:has(img))' ).length > 1;
                self.zoom.update();
                self.thumbnails.init();
                self.setUserOptions();
                self.reloadThumbnails();
                self.refreshDimensions();
            } );
        },
        
        overrideOptions: function( options ) {
            var modeIsDefined = typeof options !== 'undefined' && typeof options.mode !== 'undefined';
        
            this.options = $.extend( {}, defaults, this.options );
            if ( modeIsDefined && options.mode === 'full-screen' ) {
                this.options = $.extend( {}, this.options, defaultsFullScreenMode, options, requiredFullScreenMode );
            }
            else if ( modeIsDefined && options.mode === 'slider' ) {
                this.options = $.extend( {}, this.options, defaultsSliderMode, options, requiredSliderMode );
            }
            else {
                this.options = $.extend( {}, this.options, options );
            }
        },

        reloadThumbnails: function() {
            new ThumbnailsGenerator( this, {
                thumbsHidden: false
            } );
            this.generateAlbumsDropdown();
            this.thumbnails.reload();
        },

        setVariables: function() {
            this.$element = $( '.jgallery' ).filter( '[data-jgallery-id="' + this.intId + '"]' );
            this.progress = new Progress( this.$element.find( '.zoom-container' ).children( '.progress' ), this );
            this.zoom = new Zoom( this );
            this.thumbnails = new Thumbnails( this );
            this.zoom.setThumbnails( this.thumbnails );
        },

        show: function() {
            if (!this.options.items) {
                this.$this.hide();
            }
            $window.on( 'resize', { jGallery: this }, this.windowOnResize );
            if ( this.options.mode === 'full-screen' ) {
                this.bodyOverflowBeforeShow = $body.css( 'overflow' );
                $body.css( {
                    'overflow': 'hidden'
                } );
            }
            this.$element.not( ':visible' ).removeClass( 'hidden' ).stop( false, true ).fadeIn( 500 );
            this.zoom.refreshContainerSize();
            this.zoom.$title.removeClass( 'hidden' );  
            this.options.showGallery();
            if ( this.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.iconChangeAlbum.refreshMenuHeight();
            }
            refreshHTMLClasses();
        },

        hide: function( options ) {
            var self = this;

            if ( ! this.options.canClose ) {
                return;
            }
            options = $.extend( {}, {
                historyPushState: true
            }, options );  
            this.$element.filter( ':visible' ).stop( false, true ).addClass( 'hidden' ).fadeOut( 500, function() {
                if ( self.options.mode === 'full-screen' ) {   
                    $body.css( {
                        'overflow': self.bodyOverflowBeforeShow
                    } );
                }
                refreshHTMLClasses();
            } );
            this.zoom.booLoadingInProgress = false;
            clearTimeout( this.zoom.showPhotoTimeout );
            this.zoom.$title.addClass( 'hidden' );
            this.zoom.$btnPrev.addClass( 'hidden' );
            this.zoom.$btnNext.addClass( 'hidden' );
            this.zoom.slideshowPause();
            this.zoom.advancedAnimation.hideActive();
            this.zoom.unmarkActive();
            $window.off( 'resize', this.windowOnResize );
            this.$this.show();
            if ( options.historyPushState && this.options.browserHistory ) {
                historyPushState();
            }
            this.options.closeGallery();
        },

        autostart: function() {
            var $album;
            var $thumb;

            if ( this.$element.is( ':visible' ) ) {
                return;
            }
            if ( this.booIsAlbums ) {
                $album = this.thumbnails.getElement().find( '.album' ).eq( this.options.autostartAtAlbum - 1 );
                if ( $album.length === 0 ) {
                    $album = this.thumbnails.getElement().find( '.album' ).eq( 0 );
                }
            }
            else {
                $album = this.thumbnails.getElement();
            }
            $thumb = $album.find( 'a' ).eq( this.options.autostartAtImage - 1 );
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

                if ( ! document.location.hash ) { 
                    return;
                }
                hash = document.location.hash.replace( '#', '' );
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
            if ( this.options.autostart ) {
                callActionByUrl();
            }
        },

        generateAlbumsDropdown: function() {
            var self = this;

            this.$element.find( '.change-album' ).remove();
            if ( ! this.booIsAlbums ) {
                return;
            }
            this.zoom.$container.find( '.nav-bottom > .icons' ).append( '\
                <span class="fa fa-list-ul change-album jgallery-btn jgallery-btn-small" tooltip="' + self.options.tooltipSeeOtherAlbums + '">\
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

        init: function( options ) {
            var self = this;
            
            options = $.extend( {
                success: function(){}
            }, options );
            $head.append( '<style type="text/css" class="colours" data-jgallery-id="' + this.intId + '"></style>' );
            this.options.initGallery();
            this.generateHtml( {
                success: function() { 
                    new ThumbnailsGenerator( self );
                    self.setVariables();
                    self.thumbnails.init();
                    self.thumbnails.getElement().append( '<span class="fa fa-times jgallery-btn jgallery-close jgallery-btn-small"></span>' );
                    self.generateAlbumsDropdown();
                    self.setUserOptions();
                    if ( self.options.zoomSize === 'fit' || self.options.zoomSize === 'original' ) {
                        self.zoom.$resize.addClass( 'fa-search-plus' );
                    }
                    if ( self.options.zoomSize === 'fill' ) {
                        self.zoom.$resize.addClass( 'fa-search-minus' );
                    }
                    if ( ! isInternetExplorer() ) {
                        self.$element.addClass( 'text-shadow' );
                    }
                    self.thumbnails.refreshNavigation();
                    self.zoom.refreshNav();
                    self.zoom.refreshSize();
                    self.$this.on( 'click', 'a:has(img)', function( event ) {
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
                            self.zoom.slideshowPause();
                        }
                    } ); 

                    self.zoom.$changeMode.on( {
                        click: function() {
                            self.zoom.changeMode();
                        }
                    } ); 

                    self.zoom.$slideshow.on( {
                        click: function() {
                            self.zoom.slideshowPlayPause();
                        }
                    } );   

                    self.zoom.$container.find( '.minimalize-thumbnails' ).on( {
                        click: function() {
                            self.thumbnails.toggle();
                            self.zoom.refreshSize();
                        }
                    } );  

                    self.thumbnails.bindEvents();      
                    options.success();
                    if ( self.options.hideThumbnailsOnInit ) {
                        self.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'inactive' );
                    }
                }
            } );
            this.refreshCssClassJGalleryMobile();
        },

        isSlider: function() {
            return this.options.mode === 'slider';
        },

        windowOnResize: function( event ) {
            var jGallery = event.data.jGallery;
            
            jGallery.refreshThumbnailsVisibility();
            jGallery.refreshCssClassJGalleryMobile();
        },
        
        refreshCssClassJGalleryMobile: function() {
            this.isMobile() ? this.$jgallery.addClass( 'jgallery-mobile' ) : this.$jgallery.removeClass( 'jgallery-mobile' );
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
        
        hideThumbnailsBar: function() {
            this.thumbnails.getElement().addClass( 'hidden' );
            this.zoom.$container.find( '.minimalize-thumbnails' ).hide();
        },
        
        showThumbnailsBar: function() {
            this.thumbnails.getElement().removeClass( 'hidden' );
            this.options.canMinimalizeThumbnails && this.options.thumbnails ? this.zoom.$container.find( '.minimalize-thumbnails' ).show() : this.zoom.$container.find( '.minimalize-thumbnails' ).hide();
        },
        
        refreshThumbnailsVisibility: function() {
            if ( ! this.isMobile() ) {
                if ( ! this.options.thumbnails ) {
                    this.hideThumbnailsBar();
                }
                else {
                    this.showThumbnailsBar();
                } 
            }
            else {
                if( this.options.thumbnailsHideOnMobile ) {
                    this.hideThumbnailsBar();
                }
            } 
            this.refreshDimensions();
        },
        
        isMobile: function() {
            return $window.width() <= this.options.maxMobileWidth;
        },

        setUserOptions: function() {
            var options = this.options;
            var mode = options.mode;
            var width = mode === 'full-screen' ? 'auto' : options.width;
            var height = mode === 'full-screen' ? 'auto' : options.height;

            this.refreshAttrClasses();
            this.options.canZoom ? this.zoom.$resize.show() : this.zoom.$resize.hide();
            this.options.canChangeMode ? this.zoom.$changeMode.show() : this.zoom.$changeMode.hide();
            this.options.mode === 'standard' ? this.zoom.$changeMode.removeClass( 'fa-compress' ).addClass( 'fa-expand' ) : this.zoom.$changeMode.removeClass( 'fa-expand' ).addClass( 'fa-compress' );
            this.options.canClose ? this.zoom.$container.find( '.jgallery-close' ).show() : this.zoom.$container.find( '.jgallery-close' ).hide();
            this.refreshThumbnailsVisibility();
            this.zoom.refreshSize();
            this.options.slideshow ? this.zoom.$slideshow.show() : this.zoom.$slideshow.hide();
            this.options.slideshow && this.options.slideshowCanRandom && this.options.slideshowAutostart ? this.zoom.$random.show(): this.zoom.$random.hide();
            this.options.slideshow && this.options.slideshowCanRandom && this.options.slideshowRandom ? this.zoom.$random.addClass( 'active' ) : this.zoom.$random.removeClass( 'active' );

            this.options.thumbnailsFullScreen && this.options.thumbnails ? this.zoom.$container.find( '.full-screen' ).show() : this.zoom.$container.find( '.full-screen' ).hide();
            this.options.hideThumbnailsOnInit && this.options.thumbnails ? this.thumbnails.hide() : this.thumbnails.show();
            this.options.titleExpanded ? this.zoom.$title.addClass( 'expanded' ) : this.zoom.$title.removeClass( 'expanded' );
            this.setColours( {
                strBg: this.options.backgroundColor,
                strText: this.options.textColor
            } );
            this.options.tooltips ? this.$jgallery.addClass( 'jgallery-tooltips' ) : this.$jgallery.removeClass( 'jgallery-tooltips' );
            this.$jgallery.css( {
                width: width,
                height: height
            } );
            this.options.draggableZoomHideNavigationOnMobile ? this.$jgallery.addClass( 'jgallery-hide-draggable-navigation-on-mobile' ) : this.$jgallery.removeClass( 'jgallery-hide-draggable-navigation-on-mobile' );
        },

        refreshAttrClasses: function() {
            var self = this;
            var modes = [ 'standard', 'full-screen', 'slider' ];

            $.each( modes, function( key, value ) {
                self.$jgallery.removeClass( 'jgallery-' + value );
            } );
            this.$jgallery.addClass( 'jgallery-' + this.options.mode );
        },

        setColours: function( options ) {
            $head.find( 'style[data-jgallery-id="' + this.intId + '"].colours' ).html( this.getCssForColours( options ) );
        },

        generateHtml: function( options ) {
            var self = this;
            
            options = $.extend( {}, {
                success: function(){}
            }, options );
            this.template.done( function( html ) {   
                ( function() {
                    var options = self.options; 
                    var mode = options.mode;     

                    if ( options.items ) {
                        self.$jgallery = self.$this.append( html ).children(':last-child');                        
                    }
                    else if ( mode === 'full-screen' ) {
                        self.$jgallery = self.$this.after( html ).next();
                    }
                    else {
                        if ( options.autostart ) {
                            self.$this.hide();
                        }
                        self.$jgallery = self.$this.after( html ).next();
                    }
                    self.$jgallery.addClass( 'jgallery-' + mode ).attr( 'data-jgallery-id', self.intId );
                    self.$jgallery.find( '.fa.slideshow' ).attr( 'tooltip', options.tooltipSlideshow );
                    self.$jgallery.find( '.fa.resize' ).attr( 'tooltip', options.tooltipZoom );
                    self.$jgallery.find( '.fa.change-mode' ).attr( 'tooltip', options.tooltipFullScreen );
                    self.$jgallery.find( '.fa.jgallery-close' ).attr( 'tooltip', options.tooltipClose );
                    self.$jgallery.find( '.fa.random' ).attr( 'tooltip', options.tooltipRandom );
                    self.$jgallery.find( '.fa.full-screen' ).attr( 'tooltip', options.tooltipSeeAllPhotos );
                    self.$jgallery.find( '.fa.minimalize-thumbnails' ).attr( 'tooltip', options.tooltipToggleThumbnails );
                } )();
                options.success();
            } );
        },

        getCssForColours: function( objOptions ) {
            objOptions = $.extend( {
                strBg: 'rgb( 0, 0, 0 )',
                strText: 'rgb( 255, 255, 255 )'
            }, objOptions );

            var arrText;
            var arrBg;
            var arrBgAlt;

            if ( typeof tinycolor === 'function' ) {
                arrText = tinycolor( objOptions.strText ).toRgb();
                arrBg = tinycolor( objOptions.strBg ).toRgb();
                if ( arrBg.r + arrBg.g + arrBg.b > 375 ) {
                    arrBg = tinycolor.darken( objOptions.strBg ).toRgb();
                    arrBgAlt = tinycolor( objOptions.strBg ).toRgb();
                }
                else {
                    arrBg = tinycolor( objOptions.strBg ).toRgb();
                    arrBgAlt = tinycolor.lighten( objOptions.strBg ).toRgb();                
                }
            }
            else {
                arrBg = {
                    r: 230,
                    g: 230,
                    b: 230
                };
                arrBgAlt = {
                    r: 255,
                    g: 255,
                    b: 255
                };
                arrText = {
                    r: 0,
                    g: 0,
                    b: 0
                };
            }

            return '\
                .jgallery[data-jgallery-id="' + this.intId + '"] {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] [tooltip]:after {\
                  background: rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .9);\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
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
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .change-album > .title {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  box-shadow: 4px 0 4px rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ')\
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
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  -webkit-box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .icons,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .icons .fa {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.7);\
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
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.square:not(.full-screen) a {\
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
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .overlayContainer .overlay {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
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
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom,\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: none;\
                }\
                .jgallery.has-title.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom,\
                .jgallery.has-title.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.7);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .jgallery-btn {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.8);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
            ';
        }
    };
    
    return JGallery;
} )( outerHtml, historyPushState, isInternetExplorer, isInternetExplorer8AndOlder, refreshHTMLClasses, defaults, defaultsFullScreenMode, defaultsSliderMode, requiredFullScreenMode, requiredSliderMode, IconChangeAlbum, Progress, Thumbnails, ThumbnailsGenerator, Zoom );