import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import fadeIn from '../canvas/animations/fade-in';
import Loading from '../loading/index'
import Album from '../album';
import withAlbumsMenu from './with-albums-menu';
import withPreviewSizeChanger from './with-preview-size-changer';
import withBrowserHistory from './with-browser-history';
import Preview from '../preview/index';
import AlbumItem from '../album-item';
import Swipe from '../swipe';
import withSlideShow from "./with-slideshow";
import withThumbnails from "./with-thumbnails";

const iconStyle = { padding: '.25em .5em', fontSize: '1.2em' };

export interface Params {
    thumbnails?: boolean;
    browserHistory?: boolean;
    slideShow?: true,
}

export class Gallery extends Component {
    protected albums: Album[];
    protected album: Album;
    private item: AlbumItem;
    protected preview: Preview;
    private previewElement: HTMLElement;
    private controlsElement: HTMLElement;
    protected left: HTMLElement;
    protected right: HTMLElement;
    private transitionCanvas: Canvas;
    private loading: Loading;

    constructor(albums: Array<Album>, params: Params = {}) {
        super();
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
        });
        this.right = createElement(`
            <div style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.right.addEventListener('click', () => {
            this.next();
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
        this.controlsElement = createElement(`<div></div>`, {
            style: {
                padding: '10px',
                position: 'relative',
                zIndex: '1',
            },
        });
        this.element = createElement(`
            <div class="j-gallery"></div>`, {
            children: [
                this.previewElement,
                this.controlsElement,
            ],
            style: {
                height: '100vh',
                padding: '10px',
                background: '#000',
                color: '#fff',
                boxSizing: 'border-box',
                position: 'relative',
                flexDirection: 'column',
                userSelect: 'none',
                display: 'flex',
            },
        });
        window.addEventListener('resize', () => this.refreshTransitionCanvasDimensions());
        requestAnimationFrame(() => {
            this.transitionCanvas = new Canvas({
                width: this.element.clientWidth,
                height: this.element.clientHeight
            });
            Object.assign(this.transitionCanvas.element.style, {
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                position: 'absolute',
            });
            this.goToItemByCurrentHash();
        });
    }

    static create(albums: Array<Album>, params: Params = {}): Gallery {
        const decorators: GalleryDecorator[] = [];

        params = { browserHistory: true, slideShow: true, thumbnails: true, ...params };

        if (params.browserHistory) decorators.push(withBrowserHistory);
        if (params.slideShow) decorators.push(withSlideShow);
        if (params.thumbnails) decorators.push(withThumbnails);

        decorators.push(withPreviewSizeChanger, withAlbumsMenu);

        return new (compose(decorators, Gallery))(albums, params);
    }

    static createElement(html: string): HTMLElement {
        return createElement(html);
    }

    protected goToItemByCurrentHash() {
        const item = this.findItemByCurrentHash();

        return this.goToAlbum(
            this.albums.indexOf(this.findAlbumByAlbumItem(item)),
            item,
        );
    }

    private findAlbumByAlbumItem(item: AlbumItem) {
        return this.albums.find(album => !!album.items.includes(item));
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

    protected async next(): Promise<void> {
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

    protected async goToAlbum(value: number, item?: AlbumItem) {
        this.album = this.albums[value];
        return this.goToItem(item || this.album.items[0]);
    }
}

export type GalleryConstructor = (new (albums: AlbumItem[], params: Params) => Gallery);

export type GalleryDecorator = (constructor: GalleryConstructor) => GalleryConstructor;

const compose = (decorators: GalleryDecorator[], constructor: GalleryConstructor) => {
    return decorators.reduce((constructor, decorator) => decorator(constructor), constructor);
};

export default Gallery;

const style = document.createElement('style');
style.innerHTML = `
    .j-gallery ::-webkit-scrollbar {
        height: 1em;
        background: transparent;
        top: 0;
        left: 0;
        right: 0;
        position: absolute;
    }

    .j-gallery *::-webkit-scrollbar-thumb {
        background: #ffffff44;
    }
`;
if (typeof document !== 'undefined') {
    document.querySelector('head').appendChild(style);
}