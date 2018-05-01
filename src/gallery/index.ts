import createElement from '../utils/create-element/index';
import View from '../view';
import Canvas from '../canvas/index';
import fadeOut from '../canvas/animations/fade-out';
import fadeIn from '../canvas/animations/fade-in';
import Loading from '../loading/index'
import Album from '../album';
import Preview from '../preview/index';
import Thumbnails from '../thumbnails/index';
import AlbumItem from '../album-item';
import * as css from './gallery.scss';

export default class Gallery extends View {
    private albums: Album[];
    private thumbnails: Thumbnails;
    private preview: Preview;
    private thumbnailsElement: HTMLElement;
    private transitionCanvas: Canvas;
    private loading: Loading;

    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.preview = new Preview;
        this.loading = new Loading;
        this.thumbOnClick = this.thumbOnClick.bind(this);
        this.thumbnails = new Thumbnails({ thumbOnClick: this.thumbOnClick });
        this.thumbnails.setAlbum(this.albums[0]);
        this.element = createElement(`<div class="${css.gallery}"></div>`);
        this.thumbnailsElement = createElement(`<div class="${css.thumbnails} ${css.thumbnailsBottom}"></div>`);
        this.element.appendChild(this.preview.getElement());
        this.thumbnailsElement.appendChild(this.thumbnails.getElement());
        this.element.appendChild(this.thumbnailsElement);
        this.loading.getElement().classList.add(css.loading);
        window.addEventListener('resize', () => this.refreshTransitionCanvasDimensions());
        requestAnimationFrame(() => {
            this.transitionCanvas = new Canvas({
                width: this.element.clientWidth,
                height: this.element.clientHeight
            });
            this.transitionCanvas.element.classList.add(css.transitionCanvas);
        });
    }

    static createElement(html: string): HTMLElement {
        return createElement(html);
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

    private thumbOnClick(item: AlbumItem) {
        this.showTransitionCanvas();
        fadeIn(this.transitionCanvas)
            .then(() => this.showLoading())
            .then(() => this.preview.setItem(item))
            .then(() => this.hideLoading())
            .then(() => this.transitionCanvas.clearLayers())
            .then(() => fadeOut(this.transitionCanvas))
            .then(() => this.transitionCanvas.clearLayers())
            .then(() => this.hideTransitionCanvas());
    }
}