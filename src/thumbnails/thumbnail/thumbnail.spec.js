import assert from 'assert';
import Thumbnail from './';

const thumbnail = new Thumbnail({
    item: {
        url: 'images/large/1.jpg',
        thumbUrl: 'images/thumbs/1.jpg',
        title: 'Photo1'
    }
});

describe('Thumbnail class', function() {
    it('thumbnail.getElement() should retruns HTMLElement', () => {
        assert.equal(thumbnail.getElement() instanceof HTMLElement, true);
    });
    
    it('thumbnail <img> should have correct src attribute', () => {
        const element = thumbnail.getElement();
        
        assert.equal(element.querySelectorAll(
            'img[src="images/thumbs/1.jpg"]'
        ).length, 1);
    });
    
    it('thumbnail <img> should have correct alt attribute', () => {
        const element = thumbnail.getElement();
        
        assert.equal(element.querySelectorAll(
            'img[alt="Photo1"]'
        ).length, 1);
    });
    
    it('thumbnail anchor should have correct href attribute', () => {
        const element = thumbnail.getElement();
        
        assert.equal(element.getAttribute('href'), 'images/large/1.jpg');
    });
});