import View from '../../view';
import AlbumItem from '../../album-item';
import createElement from '../../utils/create-element';
import * as css from './thumbnail.scss';

export default class Thumbnail extends View {
    private link: string;
    private src: string;
    private title: string;
    
    constructor(item: AlbumItem) {
        super();
        this.link = item.url;
        this.src = item.thumbUrl;
        this.title = item.title;
        this.element = createElement(''+
            '<a href="' + this.link + '" class="'+ css.thumbnail +'">'+
                '<img src="' + this.src + '" alt="' + this.title + '" class="'+ css.img +'"/>'+
            '</a>'
        );
    }
}