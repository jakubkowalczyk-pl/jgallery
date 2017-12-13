import View from '../../view';
import AlbumItem from '../../album-item';
import createElement from '../../utils/create-element';
import * as css from './thumbnail.scss';

export default class Thumbnail extends View {    
    constructor({ item, onClick }: Params) {
        super();
        this.element = createElement(''+
            '<a href="' + item.url + '" class="'+ css.thumbnail +'">'+
                '<img src="' + item.thumbUrl + '" alt="' + item.title + '" class="'+ css.img +'"/>'+
            '</a>'
        );
        this.element.addEventListener('click', (event: Event) => {
            onClick({
                item,
                event
            });
        });
    }
}

interface Params {
    item: AlbumItem,
    onClick: Function
}