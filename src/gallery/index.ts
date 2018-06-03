import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import fadeOut from '../canvas/animations/fade-out';
import fadeIn from '../canvas/animations/fade-in';
import {iconEllipsisHorizontal, iconGrid, iconPlay, iconPause} from '../icons';
import Loading from '../loading/index'
import Album from '../album';
import ProgressBar from '../progress-bar';
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
    private progressBar: ProgressBar;
    private transitionCanvas: Canvas;
    private loading: Loading;
    private thumbnails: Thumbnails;
    private dropdown: Dropdown;
    private toggleThumbnailsIcon: HTMLElement;
    private playSlideshowIcon: HTMLElement;
    private pauseSlideshowIcon: HTMLElement;
    private slideshowRunning: boolean;
    private toggleFullScreenThumbnailsIcon: HTMLElement;
    private thumbnailsVisible: boolean;
    private fullScreenThumbnails: boolean;

    constructor(albums: Array<Album>) {
        super();
        this.slideshowRunning = false;
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
        this.left.addEventListener('click', () => {
            this.prev();
            this.stopSlideshow();
        });
        this.right = createElement(`
            <div style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.right.addEventListener('click', () => {
            this.next();
            this.stopSlideshow();
        });
        this.loading.getElement().classList.add(css.loading);
        this.thumbnailsVisible = true;
        this.thumbnails = new Thumbnails({ thumbOnClick: item => {
            this.stopSlideshow();
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
        this.playSlideshowIcon.addEventListener('click', () => this.playSlideshow());
        this.pauseSlideshowIcon = iconPause(iconStyle);
        this.pauseSlideshowIcon.addEventListener('click', () => this.pauseSlideshow());
        this.toggleThumbnailsIcon = iconEllipsisHorizontal(iconStyle);
        this.toggleThumbnailsIcon.addEventListener('click', () => this.toggleThumbnails());
        this.toggleFullScreenThumbnailsIcon = iconGrid(iconStyle);
        this.toggleFullScreenThumbnailsIcon.addEventListener('click', () => this.toggleFullScreenThumbnails());
        this.dropdown = new Dropdown({
            items: albums.map(album => album.title),
            onChange: value => {
                this.stopSlideshow();
                this.thumbnails.setAlbum(albums[value]);
                this.album = albums[value];
                this.goToItem(this.album.items[0]);
            }
        });
        this.progressBar = new ProgressBar({
            duration: 4000,
            onEnd: async () => {
                this.progressBar.pause();
                this.progressBar.setValue(0);
                await this.next();
                this.progressBar.reset();
                if (this.slideshowRunning) {
                    this.progressBar.start();
                }
            },
            style: {
                position: 'absolute',
                top: '2px',
                left: '0',
                right: '0',
            },
        });
        this.controlsElement = createElement(`<div></div>`, {
            style: {
                padding: '10px',
                position: 'relative',
                zIndex: '1',
            },
            children: [
                this.playSlideshowIcon,
                this.progressBar.getElement(),
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

    private async next(): Promise<void> {
        const { album, item } = this;
        const { items } = album;
        const next = items[items.indexOf(item)+1];

        if (next) {
            await this.goToItem(next);
        }
        else {
            await this.goToItem(items[0]);
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

    private async goToItem(item: AlbumItem) {
        this.showTransitionCanvas();
        await (this.item ? fadeIn(this.transitionCanvas) : Promise.resolve())
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
        this.stopSlideshow();
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

    private playSlideshow() {
        if (!this.slideshowRunning) {
            this.controlsElement.insertBefore(this.pauseSlideshowIcon, this.playSlideshowIcon);
            this.controlsElement.removeChild(this.playSlideshowIcon);
            this.progressBar.start();
            this.slideshowRunning = true;
        }
    }

    private pauseSlideshow() {
        if (this.slideshowRunning) {
            this.controlsElement.insertBefore(this.playSlideshowIcon, this.pauseSlideshowIcon);
            this.controlsElement.removeChild(this.pauseSlideshowIcon);
            this.progressBar.pause();
            this.slideshowRunning = false;
        }
    }

    private stopSlideshow() {
        this.pauseSlideshow();
        this.progressBar.reset();
    }
}