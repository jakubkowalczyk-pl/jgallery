import assert from 'assert';
import Thumbnails from './';

const thumbnails = new Thumbnails();

thumbnails.setAlbum({
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
});

describe('Thumbnails class', function() {
    it('thumbnails.getElement() should retruns HTMLElement', () => {
        assert.equal(thumbnails.getElement() instanceof HTMLElement, true);
    });
    
    it('thumbnails should contains items', () => {
        const element = thumbnails.getElement();
        
        assert.equal(element.querySelectorAll('[class*="__thumbnail--"]').length, 3);
    });
});