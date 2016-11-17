var Thumb = (function() {
    var $ = jQuery;
    
    var Thumb = function(data) {
        $.extend(this, {
            url: '',
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
        
        render: function() {
            var element = '<a href="' + this.url + '">' + this.generateImgTag({
                src: this.thumbUrl,
                bgColor: this.bgColor,
                textColor: this.textColor,
                alt: this.title
            }).outerHtml() + '</a>';
            
            if (this.target) {
                element.attr('target', this.target);
            }
            
            return element;
        }
    };
    
    return Thumb;
})();