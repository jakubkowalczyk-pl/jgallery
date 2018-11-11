import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import fadeIn from '../canvas/animations/fade-in';
import {iconEllipsisHorizontal, iconGrid, iconPlay, iconPause} from '../icons';
import Loading from '../loading/index'
import Album from '../album';
import ProgressBar from '../progress-bar';
import withAlbumsMenu from './with-albums-menu';
import withPreviewSizeChanger from './with-preview-size-changer';
import withBrowserHistory from './with-browser-history';
import Thumbnails from '../thumbnails/index';
import Preview from '../preview/index';
import AlbumItem from '../album-item';
import Swipe from '../swipe';
import * as css from './gallery.scss';

const iconStyle = { padding: '.25em .5em', fontSize: '1.5em' };

export interface Params {
    browserHistory?: boolean;
}

export class Gallery extends Component {
    protected albums: Album[];
    protected album: Album;
    private item: AlbumItem;
    protected preview: Preview;
    private previewElement: HTMLElement;
    private controlsElement: HTMLElement;
    private left: HTMLElement;
    private right: HTMLElement;
    private progressBar: ProgressBar;
    private transitionCanvas: Canvas;
    private loading: Loading;
    protected thumbnails: Thumbnails;
    private toggleThumbnailsIcon: HTMLElement;
    private playSlideshowIcon: HTMLElement;
    private pauseSlideshowIcon: HTMLElement;
    private slideshowRunning: boolean;
    private toggleFullScreenThumbnailsIcon: HTMLElement;
    private thumbnailsVisible: boolean;
    private fullScreenThumbnails: boolean;

    constructor(albums: Array<Album>, params: Params = {}) {
        super();
        this.slideshowRunning = false;
        this.albums = albums;
        this.album = albums[0];
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
        this.preview = new Preview;
        this.previewElement = createElement(`<div></div>`, {
            style: {
                flex: '1',
                display: 'flex',
                position: 'relative',
            },
            children: [this.preview.getElement(), this.left, this.right]
        });
        (new Swipe({
            element: this.previewElement,
            onSwipeLeft: this.next,
            onSwipeRight: this.prev,
        })).activate()
        this.loading.appendStyle({
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            position: 'absolute',
            zIndex: '1',
        })
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
            ]
        });
        this.element = createElement(`<div class="${css.gallery}"></div>`, {
            children: [
                this.previewElement,
                this.controlsElement,
                this.thumbnails.getElement(),
            ]
        });
        window.addEventListener('resize', () => this.refreshTransitionCanvasDimensions());
        requestAnimationFrame(() => {
            this.transitionCanvas = new Canvas({
                width: this.element.clientWidth,
                height: this.element.clientHeight
            });
            this.transitionCanvas.element.classList.add(css.transitionCanvas);
            this.goToItemByCurrentHash();
        });
    }

    static create(albums: Array<Album>, params: Params = {}): Gallery {
        const decorators: GalleryDecorator[] = [withPreviewSizeChanger, withAlbumsMenu];

        params = { browserHistory: true, ...params };

        if (params.browserHistory) decorators.push(withBrowserHistory);

        return new (compose(decorators, Gallery))(albums, params);
    }

    static createElement(html: string): HTMLElement {
        return createElement(html);
    }

    protected goToItemByCurrentHash() {
        return this.goToItem(
            this.findItemByCurrentHash()
        );
    }

    protected findItemByCurrentHash(): AlbumItem {
        return this.findItemByHash(location.hash.replace('#','')) || this.album.items[0];
    }

    protected appendControlsElements(elements: HTMLElement[]) {
        elements.forEach(element => {
            Object.assign(element.style, iconStyle);
            this.controlsElement.appendChild(element);
        });
    }

    private getItems(): AlbumItem[] {
        return this.albums.reduce((items, album) => [...items, ...album.items], []);
    }

    private findItemByHash(hash: string): AlbumItem | undefined {
        return this.getItems().find(item => item.hash === hash);
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

    private async prev(): Promise<void> {
        const { album, item } = this;
        const { items } = album;
        const prev = items[items.indexOf(item)-1];

        if (prev) {
            await this.goToItem(prev);
        }
        else {
            await this.goToItem(items[items.length-1]);
        }
    }

    private showTransitionCanvas(): void {
        this.previewElement.appendChild(this.transitionCanvas.element);
    }

    private hideTransitionCanvas(): void {
        this.previewElement.removeChild(this.transitionCanvas.element);
    }

    private refreshTransitionCanvasDimensions(): void {
        this.transitionCanvas.setDimensions(this.element.clientWidth, this.element.clientHeight);
        this.transitionCanvas.redraw();
    }

    private showLoading(): void {
        this.previewElement.appendChild(this.loading.getElement());
    }

    private hideLoading(): void {
        this.previewElement.removeChild(this.loading.getElement());
    }

    protected async goToItem(item: AlbumItem) {
        this.thumbnails.setActive(this.album.items.indexOf(item));
        this.showTransitionCanvas();
        this.item && await fadeIn(this.transitionCanvas);
        this.showLoading();
        await this.preview.setItem(item);
        this.hideLoading();
        this.transitionCanvas.clearLayers();
        await fadeIn(this.transitionCanvas, { reverse: true });
        this.transitionCanvas.clearLayers();
        this.hideTransitionCanvas();
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
        this.thumbnails.scrollToActiveItem();
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

    protected stopSlideshow() {
        this.pauseSlideshow();
        this.progressBar.reset();
    }
}

export type GalleryConstructor = (new (albums: AlbumItem[], params: Params) => Gallery);

export type GalleryDecorator = (constructor: GalleryConstructor) => GalleryConstructor;

const compose = (decorators: GalleryDecorator[], constructor: GalleryConstructor) => {
    return decorators.reduce((constructor, decorator) => decorator(constructor), constructor);
};

export default Gallery;