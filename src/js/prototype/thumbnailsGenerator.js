var ThumbnailsGenerator = ( function( outerHtml, jLoader ) {
    var $ = jQuery;
    
    $.fn.outerHtml = outerHtml;
    $.fn.jLoader = jLoader;
    
    var ThumbnailsGenerator = function( jGallery, options ) {
        this.options = $.extend( {}, {
            thumbsHidden: true
        }, options );
        this.jGallery = jGallery;
        this.isSlider = jGallery.isSlider();
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
            var $a = $();
            var $parent;
            
            if ( $this.is( 'a' ) ) {
                $a = $container.append( '<a href="' + $this.attr( 'href' ) + '">' + this.generateImgTag( $this.find( 'img' ).eq( 0 ) ).outerHtml() + '</a>' ).children( ':last-child' );
            }
            else if ( $this.is( 'img' ) ) {
                $a = $container.append( $( '<a href="' + $this.attr( 'src' ) + '">' + this.generateImgTag( $this ).outerHtml() + '</a>' ) ).children( ':last-child' );
                $parent = $this.parent();
                if ( this.isSlider && $parent.is( 'a' ) ) {
                    $a.attr( 'link', $parent.attr( 'href' ) );
                    if ( $parent.is( '[target]' ) ) {
                        $a.attr( 'target', $parent.attr( 'target' ) );
                    }
                }
            }
            $a.jLoader( {
                start: function() {
                    $a.overlay( {
                        fadeIn: false,
                        fadeOut: false,
                        show: true,
                        showLoader: true
                    } );
                },
                success: function() {
                    $a.overlay( {
                        hide: true
                    } );
                }
            } );
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
            var options = this.jGallery.options;

            this.$thumbnailsContainerInner.find( 'img' ).each( function() {
                var $image = $( this );
                var image = new Image();

                image.src = $image.attr( 'src' );          
                if ( ( image.width / image.height ) < ( options.thumbWidth / options.thumbHeight ) ) {
                    $image.addClass( 'thumb-vertical' ).removeClass( 'thumb-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-horizontal' ).removeClass( 'thumb-vertical' );                
                }
                if ( ( image.width / image.height ) < ( options.thumbWidthOnFullScreen / options.thumbHeightOnFullScreen ) ) {
                    $image.addClass( 'thumb-on-full-screen-vertical' ).removeClass( 'thumb-on-full-screen-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-on-full-screen-horizontal' ).removeClass( 'thumb-on-full-screen-vertical' );                
                }
            } );
        }
    };
    
    return ThumbnailsGenerator;
} )( outerHtml, jLoader );