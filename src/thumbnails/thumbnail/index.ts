import View from '../../view';
import AlbumItem from '../../album-item';
import Loading from '../../loading/index';
import createElement from '../../utils/create-element/index';
import load from '../../utils/load/index';
import * as css from './thumbnail.scss';

export interface ThumbOnClick {
    (item: AlbumItem): void
}

interface Params {
    item: AlbumItem,
    onClick: ThumbOnClick
}

export default class Thumbnail extends View {    
    constructor({ item, onClick }: Params) {
        super();

        const content: HTMLElement = createElement(
            item.thumbElement ?
            item.thumbElement.outerHTML :
            `<img src="${item.thumbUrl}"/>`
        );

        this.element = createElement(`<span class=${css.thumbnail}></span>`);
        this.element.appendChild((new Loading).getElement());
        this.element.addEventListener('click', () => onClick(item));
        load(content).then(() => {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        });
    }
}