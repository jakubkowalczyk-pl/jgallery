import createElement from '../utils/create-element/index';
import {iconEllipsisHorizontal} from '../icons';
import Component from '../component';
import Album from '../album';
import Dropdown, {OnChange} from '../dropdown/index';
import Thumbnails from '../thumbnails/index';
import {ThumbOnClick} from '../thumbnails/thumbnail/index';

interface Params {
    albums: Array<Album>;
    thumbOnClick?: ThumbOnClick;
    albumOnChange?: OnChange;
}

export default class Controls extends Component {
    private thumbnails: Thumbnails;
    private dropdown: Dropdown;
    private album: Album;
    private toggleThumbnails: HTMLElement;
    private thumbnailsVisible: boolean;

    constructor({ albums, thumbOnClick = () => {}, albumOnChange = () => {} }: Params) {
        super();
        this.album = albums[0];
        this.thumbnailsVisible = true;
        this.thumbnails = new Thumbnails({ thumbOnClick });
        this.thumbnails.setAlbum(this.album);
        this.toggleThumbnails = iconEllipsisHorizontal({ margin: '0 10px' });
        this.toggleThumbnails.addEventListener('click', () => {
            this.thumbnailsVisible = !this.thumbnailsVisible;

            if (this.thumbnailsVisible) {
                this.element.appendChild(this.thumbnails.getElement());
            }
            else {
                this.element.removeChild(this.thumbnails.getElement());
            }
        });
        this.toggleThumbnails.style.fontSize = '2em';
        this.dropdown = new Dropdown({
            items: albums.map(album => album.title),
            onChange: value => {
                this.thumbnails.setAlbum(albums[value]);
                albumOnChange(value);
            }
        });
        this.element = createElement(`<div></div>`);
        this.element.appendChild(this.toggleThumbnails);
        this.element.appendChild(this.dropdown.getElement());
        this.element.appendChild(this.thumbnails.getElement());
    }
}