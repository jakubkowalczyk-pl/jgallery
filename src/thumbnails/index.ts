import createElement from '../utils/create-element/index'
import View from '../view';
import Album from '../album';
import AlbumItem from '../album-item';
import Thumbnail from './thumbnail';
import * as css from './thumbnails.scss';

export default class Thumbnails extends View {
    private album: Album;
    private items: Array<Thumbnail>;
    private thumbOnClick: Function;
    
    constructor({ thumbOnClick = () => {} }: Params) {
        super();
        this.element = createElement('<div class="' + css.thumbnails + '"></div>');
        this.thumbOnClick = thumbOnClick;
    }
    
    setAlbum(album: Album) {
        this.album = album;
        this.items = album.items.map((item: AlbumItem) => new Thumbnail({
            item,
            onClick: this.thumbOnClick
        }));
        this.element.innerHTML = '';
        this.items.forEach((item: Thumbnail) => {
            this.element.appendChild(item.getElement());
        });
    }
}

interface Params {
    thumbOnClick: Function;
}