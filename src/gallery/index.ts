import createElement from '../utils/create-element/index';
import Component from '../component';
import Canvas from '../canvas/index';
import fadeOut from '../canvas/animations/fade-out';
import fadeIn from '../canvas/animations/fade-in';
import Loading from '../loading/index'
import Album from '../album';
import Preview from '../preview/index';
import Controls from '../controls/index';
import AlbumItem from '../album-item';
import * as css from './gallery.scss';

export default class Gallery extends Component {
    private albums: Album[];
    private album: Album;
    private item: AlbumItem;
    private preview: Preview;
    private controlsWrapper: HTMLElement;
    private left: HTMLElement;
    private right: HTMLElement;
    private controls: Controls;
    private transitionCanvas: Canvas;
    private loading: Loading;

    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.album = albums[0];
        this.preview = new Preview;
        this.loading = new Loading;
        this.goToItem = this.goToItem.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.controls = new Controls({
            albums,
            thumbOnClick: this.goToItem,
            albumOnChange: value => {
                this.album = albums[value];
                this.goToItem(this.album.items[0]);
            },
            thumbnailsFullScreenOnToggle: fullScreen => {
                this.preview.getElement().style.height = fullScreen ? '0' : 'auto';
            },
        });
        this.element = createElement(`<div class="${css.gallery}"></div>`);
        this.controlsWrapper = createElement(`<div></div>`, {
            style: {
                padding: '5px',
                position: 'relative',
                zIndex: '1',
            }
        });
        this.left = createElement(`
            <div style="left: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.left.addEventListener('click', this.prev);
        this.right = createElement(`
            <div style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.right.addEventListener('click', this.next);
        this.element.appendChild(this.preview.getElement());
        this.controlsWrapper.appendChild(this.controls.getElement());
        this.element.appendChild(this.controlsWrapper);
        this.loading.getElement().classList.add(css.loading);
        this.element.appendChild(this.left);
        this.element.appendChild(this.right);
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
}