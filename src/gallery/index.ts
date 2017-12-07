import createElement from '../utils/create-element';
import View from '../view';
import Album from '../album';
import Thumbnails from '../thumbnails';

export default class Gallery extends View {    
    private albums: Album[];
    private thumbnails: Thumbnails;
    
    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.thumbnails = new Thumbnails();
        this.thumbnails.setAlbum(this.albums[0]);
        this.element = createElement('<div class="jgallery"></div>');
        this.element.appendChild(this.thumbnails.getElement());
    }
}