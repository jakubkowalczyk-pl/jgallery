var Progress = ( function() {
    var Progress = function( $this, jGallery ) {
        this.jGallery = jGallery;
        this.$element = $this;
    };

    Progress.prototype = {
        clear: function() {            
            this.$element.stop( false, true ).css( {width: 0} );
            return this;         
        },

        start: function( intWidth, success ) {            
            var interval = parseInt( this.jGallery.options.slideshowInterval ) * 1000;
            var $element = this.$element;

            $element.animate( {
                width: intWidth
            }, interval - interval * ( $element.width() / $element.parent().width() ), 'linear', success );
            return this;    
        },

        pause: function() {
            this.$element.stop();
            return this;
        }        
    };
    
    return Progress;
} )();