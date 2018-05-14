import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import fadeOut from '../canvas/animations/fade-out';
import fadeIn from '../canvas/animations/fade-in';
import {iconEllipsisHorizontal, iconGrid, iconPlay} from '../icons';
import Loading from '../loading/index'
import Album from '../album';
import Dropdown from '../dropdown/index';
import Thumbnails from '../thumbnails/index';
import Preview from '../preview/index';
import AlbumItem from '../album-item';
import * as css from './gallery.scss';

const iconStyle = { padding: '.25em .5em', fontSize: '1.5em' };

export default class Gallery extends Component {
    private albums: Album[];
    private album: Album;
    private item: AlbumItem;
    private preview: Preview;
    private controlsElement: HTMLElement;
    private left: HTMLElement;
    private right: HTMLElement;
    private transitionCanvas: Canvas;
    private loading: Loading;
    private thumbnails: Thumbnails;
    private dropdown: Dropdown;
    private toggleThumbnailsIcon: HTMLElement;
    private playSlideshowIcon: HTMLElement;
    private toggleFullScreenThumbnailsIcon: HTMLElement;
    private thumbnailsVisible: boolean;
    private fullScreenThumbnails: boolean;


    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.album = albums[0];
        this.preview = new Preview;
        this.preview.appendStyle({
            flex: '1',
        });
        this.loading = new Loading;
        this.goToItem = this.goToItem.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.controlsElement = createElement(`<div></div>`, {

        });
        this.left = createElement(`
            <div style="left: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.left.addEventListener('click', this.prev);
        this.right = createElement(`
            <div style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.right.addEventListener('click', this.next);
        this.loading.getElement().classList.add(css.loading);
        this.thumbnailsVisible = true;
        this.thumbnails = new Thumbnails({ thumbOnClick: item => {
            if (this.fullScreenThumbnails) {
                this.disableFullScreenThumbnails();
            }
            this.goToItem(item);
        } });
        this.thumbnails.appendStyle({
            position: 'relative',
            zIndex: '1',
        });
        this.thumbnails.setAlbum(this.album);
        this.playSlideshowIcon = iconPlay(iconStyle);
        this.playSlideshowIcon.addEventListener('click', () => {});
        this.toggleThumbnailsIcon = iconEllipsisHorizontal(iconStyle);
        this.toggleThumbnailsIcon.addEventListener('click', () => this.toggleThumbnails());
        this.toggleFullScreenThumbnailsIcon = iconGrid(iconStyle);
        this.toggleFullScreenThumbnailsIcon.addEventListener('click', () => this.toggleFullScreenThumbnails());
        this.dropdown = new Dropdown({
            items: albums.map(album => album.title),
            onChange: value => {
                this.thumbnails.setAlbum(albums[value]);
                this.album = albums[value];
                this.goToItem(this.album.items[0]);
            }
        });
        this.controlsElement = createElement(`<div></div>`, {
            style: {
                padding: '5px',
                position: 'relative',
                zIndex: '1',
            },
            children: [
                this.playSlideshowIcon,
                this.toggleFullScreenThumbnailsIcon,
                this.toggleThumbnailsIcon,
                this.dropdown.getElement(),
            ]
        });
        this.element = createElement(`<div class="${css.gallery}"></div>`, {
            children: [
                this.preview.getElement(),
                this.controlsElement,
                this.thumbnails.getElement(),
                this.left,
                this.right
            ]
        });
        window.addEventListener('resize', () => this.refreshTransitionCanvasDimensions());
        requestAnimationFrame(() => {
            this.transitionCanvas = new Canvas({
                width: this.element.clientWidth,
                height: this.element.clientHeight
            });
            this.transitionCanvas.element.classList.add(css.transitionCanvas);
            this.goToItem(this.album.items[0]);
        });
    }

    static createElement(html: string): HTMLElement {
        return createElement(html);
    }

    private next(): void {
        const { album, item } = this;
        const { items } = album;
        const next = items[items.indexOf(item)+1];

        if (next) {
            this.goToItem(next);
        }
        else {
            this.goToItem(items[0]);
        }
    }

    private prev(): void {
        const { album, item } = this;
        const { items } = album;
        const prev = items[items.indexOf(item)-1];

        if (prev) {
            this.goToItem(prev);
        }
        else {
            this.goToItem(items[items.length-1]);
        }
    }

    private showTransitionCanvas(): void {
        this.element.appendChild(this.transitionCanvas.element);
    }

    private hideTransitionCanvas(): void {
        this.element.removeChild(this.transitionCanvas.element);
    }

    private refreshTransitionCanvasDimensions(): void {
        this.transitionCanvas.setDimensions(this.element.clientWidth, this.element.clientHeight);
        this.transitionCanvas.redraw();
    }

    private showLoading(): void {
        this.element.appendChild(this.loading.getElement());
    }

    private hideLoading(): void {
        this.element.removeChild(this.loading.getElement());
    }

    private goToItem(item: AlbumItem) {
        this.showTransitionCanvas();
        (this.item ? fadeIn(this.transitionCanvas) : Promise.resolve())
            .then(() => this.showLoading())
            .then(() => this.preview.setItem(item))
            .then(() => this.hideLoading())
            .then(() => this.transitionCanvas.clearLayers())
            .then(() => fadeOut(this.transitionCanvas))
            .then(() => this.transitionCanvas.clearLayers())
            .then(() => this.hideTransitionCanvas());
        this.item = item;
    }

    private disableFullScreenThumbnails() {
        this.fullScreenThumbnails = false;
        this.thumbnails.disableWrap();
    }

    private toggleFullScreenThumbnails() {
        this.fullScreenThumbnails ? this.disableFullScreenThumbnails() : this.enableFullScreenThumbnails();
    }

    private enableFullScreenThumbnails() {
        this.fullScreenThumbnails = true;
        this.showThumbnails();
        this.thumbnails.enableWrap();
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