var Thumb = (function() {
    var $ = jQuery;
    
    var Thumb = function(data) {
        $.extend(this, {
            photoId: 0,
            number: 0,
            url: '',
            link: '',
            target: '',
            thumbUrl: '',
            title: '',
            bgColor: '',
            textColor: ''
        }, data);
    };
    
    Thumb.prototype = {
        generateImgTag: function( img ) {
            var $newImg = $( '<img src="' + img.src + '" />' );

            if ( img.alt ) {
                $newImg.attr( 'alt', img.alt );
            }
            if ( img.bgColor ) {
                $newImg.attr( 'data-jgallery-bg-color', img.bgColor );
            }
            if ( img.textColor ) {
                $newImg.attr( 'data-jgallery-text-color', img.textColor );
            }

            return $newImg;
        },
        
        preload: function() {
            var $element = this.$element;
            
            $element.jLoader( {
                start: function() {
                    $element.overlay( {
                        fadeIn: false,
                        fadeOut: false,
                        show: true,
                        showLoader: true
                    } );
                },
                success: function() {
                    $element.overlay( {
                        hide: true
                    } );
                }
            } );
        },
        
        render: function() {
            var $element = this.$element = $('<a href="' + this.url + '">' + this.generateImgTag({
                src: this.thumbUrl,
                bgColor: this.bgColor,
                textColor: this.textColor,
                alt: this.title
            }).outerHtml() + '</a>');
            
            if (this.target) {
                $element.attr('target', this.target);
            }
            
            if (this.link) {
                $element.attr('link', this.link);
            }
            
            $element.attr( 'data-jgallery-photo-id', this.photoId ).attr( 'data-jgallery-number', this.number );
            
            return $element;
        }
    };
    
    return Thumb;
})();