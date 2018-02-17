import Gallery from './gallery/index';
import Album from './album';

if (typeof window !== 'undefined') {
    const jQuery = window['jQuery'];
    
    window['JGallery'] = Gallery;
    
    if (jQuery) {
        jQuery.fn.jGallery = function(albums: Array<Album>) {
            this.each(function() {
                jQuery(this).append(jQuery((new Gallery(albums)).getElement()));
            });
        };
    }
}