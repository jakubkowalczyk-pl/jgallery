import createElement from '../utils/create-element/index';
import View from '../view';
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
    private transitionCanvas: HTMLCanvasElement;
    
    constructor(albums: Array<Album>) {
        super();
        this.albums = albums;
        this.preview = new Preview;
        this.thumbOnClick = this.thumbOnClick.bind(this);
        this.thumbnails = new Thumbnails({ thumbOnClick: this.thumbOnClick });
        this.thumbnails.setAlbum(this.albums[0]);
        this.element = createElement(`<div class="${css.gallery}"></div>`);
        this.thumbnailsElement = createElement(`<div class="${css.thumbnails} ${css.thumbnailsBottom}"></div>`);
        this.element.appendChild(this.preview.getElement());
        this.thumbnailsElement.appendChild(this.thumbnails.getElement());
        this.element.appendChild(this.thumbnailsElement);
        this.transitionCanvas = <HTMLCanvasElement>createElement(`<canvas/>`);
    }
    
    static createElement(html: string): HTMLElement {
        return createElement(html);
    }
    
    private thumbOnClick(item: AlbumItem) {
        const { preview } = this;
        const element = preview.getElement();
        
        hideEffect({
            width: element.clientWidth,
            height: element.clientHeight,
            canvas: this.transitionCanvas
        }).then(() => preview.setItem(item));
    }
}

interface Params {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
}

const hideEffect = ({ width, height, canvas }: Params): Promise<void> => {
    return new Promise(resolve => {
        resolve();
    });
}