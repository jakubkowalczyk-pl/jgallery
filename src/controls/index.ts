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
    thumbnails: Thumbnails;
    fullScreenThumbnails: boolean;

    private dropdown: Dropdown;
    private album: Album;
    private toggleThumbnailsIcon: HTMLElement;
    private toggleFullScreenThumbnailsIcon: HTMLElement;
    private thumbnailsVisible: boolean;
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

    disableFullScreenThumbnails() {
        this.fullScreenThumbnails = false;
        this.thumbnailsFullScreenOnToggle(this.fullScreenThumbnails);
    }

    private toggleFullScreenThumbnails() {
        this.fullScreenThumbnails ? this.disableFullScreenThumbnails() : this.enableFullScreenThumbnails();
    }

    private enableFullScreenThumbnails() {
        this.fullScreenThumbnails = true;
        this.showThumbnails();
        this.thumbnailsFullScreenOnToggle(this.fullScreenThumbnails);
    }

    private hideThumbnails() {
        this.thumbnailsVisible = false;
        this.element.removeChild(this.thumbnails.getElement());
        this.disableFullScreenThumbnails();
    }

    private toggleThumbnails() {
        this.thumbnailsVisible ? this.hideThumbnails() : this.showThumbnails();
    }

    private showThumbnails() {
        this.thumbnailsVisible = true;
        this.element.appendChild(this.thumbnails.getElement());
    }
}