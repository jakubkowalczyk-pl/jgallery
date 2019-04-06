import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import transitionEffect from '../transition-effect';
import Loading from '../loading/index'
import Album from '../album';
import withAlbumsMenu from './with-albums-menu';
import withPreviewSizeChanger from './with-preview-size-changer';
import withBrowserHistory from './with-browser-history';
import Preview from '../preview/index';
import AlbumItem from '../album-item';
import promise, {CancellablePromise} from '../utils/cancellable-promise';
import Queue from '../utils/queue';
import Params from './parameters';
import defaults from './defaults';
import withSlideShow from "./with-slideshow";
import withThumbnails from "./with-thumbnails";

let id = 1;

export class Gallery extends Component {
    protected albums: Album[];
    protected album: Album;
    private item: AlbumItem;
    protected preview: Preview;
    protected previewElement: HTMLElement;
    private controlsElement: HTMLElement;
    private transitionCanvas: Canvas;
    private loading: Loading;
    protected params: Params;
    private changingItem: CancellablePromise<void>;

    constructor(albums: Array<Album>, params: Params = {}) {
        super();
        this.params = params;
        this.albums = albums;
        this.album = albums[params.autoStartAtAlbum-1];
        this.loading = new Loading({ color: params.textColor });
        this.goToItem = this.goToItem.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        const style = document.createElement('style');
        style.innerHTML = `
            .j-gallery-${id} ::-webkit-scrollbar {
                height: 1em;
                background: transparent;
                top: 0;
                left: 0;
                right: 0;
                position: absolute;
            }

            .j-gallery-${id} *::-webkit-scrollbar-thumb {
                background: ${params.textColor};
            }
        `;
        if (typeof document !== 'undefined') {
            document.querySelector('head').appendChild(style);
        }
        this.controlsElement = createElement(`<div class="j-gallery-controls"></div>`, {
            style: {
                padding: '5px 0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                zIndex: '1',
            },
        });
        this.preview = new Preview({
            onSwipeLeft: this.next,
            onSwipeRight: this.prev,
            canDrag: params.previewDraggable,
            leftOnClick: params.navigationOnPreviewClick ? this.prev : () => {},
            rightOnClick: params.navigationOnPreviewClick ? this.next : () => {},
        });
        this.preview.setSize(params.previewSize);
        this.previewElement = createElement(`<div class="j-gallery-preview-container"></div>`, {
            style: {
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            },
            children: [this.preview.getElement(), this.controlsElement]
        });
        this.loading.appendStyle({
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            position: 'absolute',
            zIndex: '1',
        })
        this.element = createElement(`
            <div class="j-gallery j-gallery-${id++}"></div>`, {
            children: [
                this.previewElement,
            ],
            style: {
                height: '100vh',
                padding: '10px',
                background: params.backgroundColor,
                color: params.textColor,
                boxSizing: 'border-box',
                position: 'relative',
                flexDirection: 'column',
                userSelect: 'none',
                display: 'flex',
            },
        });
        window.addEventListener('resize', () => this.refreshTransitionCanvasDimensions());
        requestAnimationFrame(() => {
            this.initialize();
        });
    }

    protected initialize() {
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
    }

    static create(albums: Array<Album>, params: Params = {}): Gallery {
        const decorators: GalleryDecorator[] = [];

        params = { ...defaults, ...params };
        if (params.browserHistory) decorators.push(withBrowserHistory);
        if (params.slideShow) decorators.push(withSlideShow);
        if (params.thumbnails) decorators.push(withThumbnails);
        if (params.canChangePreviewSize) decorators.push(withPreviewSizeChanger);
        if (albums.length > 1) decorators.push(withAlbumsMenu);

        return new (compose([...decorators, ...params.decorators], Gallery))(albums, params);
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
        return this.findItemByHash(location.hash.replace('#', '')) || this.album.items[this.params.autoStartAtItem-1];
    }

    protected appendControlsElements(elements: HTMLElement[]) {
        elements.forEach(element => {
            Object.assign(element.style, { margin: '0 .25em' });
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

    protected async prev(): Promise<void> {
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
        if (this.previewElement.contains(this.transitionCanvas.element)) {
            this.previewElement.removeChild(this.transitionCanvas.element);
        }
    }

    private refreshTransitionCanvasDimensions(): void {
        this.transitionCanvas.setDimensions(this.element.clientWidth, this.element.clientHeight);
        this.transitionCanvas.redraw();
    }

    private showLoading(): void {
        this.previewElement.appendChild(this.loading.getElement());
    }

    private hideLoading(): void {
        if (this.previewElement.contains(this.loading.getElement())) {
            this.previewElement.removeChild(this.loading.getElement());
        }
    }

    protected goToItem(item: AlbumItem) {
        const options = {
            backgroundColor: this.params.backgroundColor,
            duration: this.params.transitionDuration,
            details: this.params.transitionDetails,
            xAxis: this.params.transitionXAxis,
            yAxis: this.params.transitionYAxis,
            originX: this.params.transitionOriginX,
            originY: this.params.transitionOriginY,
            easingFunction: this.params.transitionEasingFunction,
            animateSliceHeight: this.params.transitionAnimateSliceHeight,
            animateSliceWidth: this.params.transitionAnimateSliceWidth,
            opacity: this.params.transitionOpacity,
        };

        this.changingItem && this.changingItem.cancel();
        this.changingItem = promise((resolve, reject, onCancel) => {
            const queue = new Queue(
                () => {
                    this.showTransitionCanvas();
                    this.params.onChange({ prevItem: this.item, item, album: this.album });
                    return this.item ? transitionEffect(this.transitionCanvas, options) : Promise.resolve();
                },
                () => {
                    this.showLoading();
                    this.params.itemOnHide({ item: this.item, album: this.album });
                    return this.preview.setItem(item);
                },
                () => {
                    this.params.itemOnLoad({ item, album: this.album });
                    this.hideLoading();
                    this.transitionCanvas.clearLayers();
                    return transitionEffect(this.transitionCanvas, {...options, reverse: true});
                },
                () => {
                    this.params.itemOnShow({ item, album: this.album });
                    this.transitionCanvas.clearLayers();
                    this.hideTransitionCanvas();
                    this.item = item;
                    resolve();
                    return Promise.resolve();
                },
            );

            queue.run();
            onCancel(() => {
                queue.cancel();
                this.transitionCanvas.clearLayers();
                this.hideTransitionCanvas();
                this.hideLoading();
            });
        });

        return this.changingItem;
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