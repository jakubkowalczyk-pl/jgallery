import 'mocha';
import 'assert';
import Gallery from './index';

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

describe('JGallery class', function(): void {
    it('gallery.getElement() should retruns HTMLElement', (): void => {
        assert.equal(gallery.getElement() instanceof HTMLElement, true);
    });
    
    it('gallery should contains thumbnails', (): void => {
        const element: HTMLElement = gallery.getElement();
        
        assert.equal(element.querySelectorAll(
            '[class*="gallery__thumbnails--"]'
        ).length, 1);
    });
});