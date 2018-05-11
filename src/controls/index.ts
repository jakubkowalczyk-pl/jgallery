import createElement from '../utils/create-element/index';
import {iconEllipsisHorizontal, iconGrid} from '../icons';
import Component from '../component';
import Album from '../album';
import Dropdown, {OnChange} from '../dropdown/index';
import Thumbnails from '../thumbnails/index';
import {ThumbOnClick} from '../thumbnails/thumbnail/index';

interface ThumbnailsFullScreenOnToggle {
    (fullScreen: boolean): any;
}

interface Params {
    albums: Array<Album>;
    thumbOnClick?: ThumbOnClick;
    albumOnChange?: OnChange;
    thumbnailsFullScreenOnToggle?: ThumbnailsFullScreenOnToggle;
}

export default class Controls extends Component {
    private thumbnails: Thumbnails;
    private dropdown: Dropdown;
    private album: Album;
    private toggleThumbnailsIcon: HTMLElement;
    private toggleFullScreenThumbnailsIcon: HTMLElement;
    private thumbnailsVisible: boolean;
    private fullScreenThumbnails: boolean;
    private thumbnailsFullScreenOnToggle: ThumbnailsFullScreenOnToggle;

    constructor({
        albums,
        thumbOnClick = () => {},
        albumOnChange = () => {},
        thumbnailsFullScreenOnToggle = () => {}
    }: Params) {
        super();
        this.album = albums[0];
        this.thumbnailsFullScreenOnToggle = thumbnailsFullScreenOnToggle;
        this.thumbnailsVisible = true;
        this.thumbnails = new Thumbnails({ thumbOnClick });
        this.thumbnails.setAlbum(this.album);
        this.toggleThumbnailsIcon = iconEllipsisHorizontal({ margin: '0 10px' });
        this.toggleThumbnailsIcon.addEventListener('click', () => this.toggleThumbnails());
        this.toggleThumbnailsIcon.style.fontSize = '2em';
        this.toggleFullScreenThumbnailsIcon = iconGrid({ margin: '0 10px' });
        this.toggleFullScreenThumbnailsIcon.addEventListener('click', () => this.toggleFullScreenThumbnails());
        this.toggleFullScreenThumbnailsIcon.style.fontSize = '2em';
        this.dropdown = new Dropdown({
            items: albums.map(album => album.title),
            onChange: value => {
                this.thumbnails.setAlbum(albums[value]);
                albumOnChange(value);
            }
        });
        this.element = createElement(`<div></div>`, {
            children: [
                this.toggleFullScreenThumbnailsIcon,
                this.toggleThumbnailsIcon,
                this.dropdown.getElement(),
                this.thumbnails.getElement()
            ]
        });
    }

    private toggleThumbnails() {
        this.thumbnailsVisible = !this.thumbnailsVisible;

        if (this.thumbnailsVisible) {
            this.element.appendChild(this.thumbnails.getElement());
        }
        else {
            this.element.removeChild(this.thumbnails.getElement());
        }
    }

    private toggleFullScreenThumbnails() {
        this.fullScreenThumbnails = !this.fullScreenThumbnails;
        this.thumbnailsFullScreenOnToggle(this.fullScreenThumbnails);
    }
}