import assert from 'assert';
import Gallery from './';

const gallery = new Gallery([
    {
        title: 'Album 1',
        items: [
            {
                url: 'images/large/1.jpg',
                thumbUrl: 'images/thumbs/1.jpg',
                title: 'Photo1'
            },
            {
                url: 'images/large/2.jpg',
                thumbUrl: 'images/thumbs/2.jpg',
                title: 'Photo2'
            },
            {
                url: 'images/large/3.jpg',
                thumbUrl: 'images/thumbs/3.jpg',
                title: 'Photo3'
            }
        ]
    }
]);

describe('JGallery class', function() {
    it('gallery.getElement() should retruns HTMLElement', () => {
        assert.equal(gallery.getElement() instanceof HTMLElement, true);
    });
    
    it('gallery should contains thumbnails', () => {
        const element = gallery.getElement();
        
        assert.equal(element.querySelectorAll(
            'img[src="images/thumbs/1.jpg"], img[src="images/thumbs/2.jpg"], img[src="images/thumbs/3.jpg"]'
        ).length, 3);
    });
});