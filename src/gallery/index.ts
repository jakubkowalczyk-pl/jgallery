import createElement from '../utils/create-element';
import View from '../view';
import Album from '../album';
import Preview from '../preview';
import Thumbnails from '../thumbnails';
import AlbumItem from '../album-item';
import * as css from './gallery.scss';

export default class Gallery extends View {    
    private albums: Album[];
    private thumbnails: Thumbnails;
    private preview: Preview;
    
    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.preview = new Preview;
        this.thumbnails = new Thumbnails({
            thumbOnClick: ({ item, event }: ThumbOnClickParams) => {
                event.preventDefault();
                this.preview.setItem(item);
            }
        });
        this.thumbnails.setAlbum(this.albums[0]);
        this.element = createElement('<div class="' + css.gallery + '"></div>');
        this.element.appendChild(this.preview.getElement());
        this.element.appendChild(this.thumbnails.getElement());
    }
}

interface ThumbOnClickParams {
    item: AlbumItem,
    event: Event
}