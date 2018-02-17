import createElement from '../utils/create-element/index';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import View from '../view';
import Loading from '../loading/index';
import * as css from './preview.scss';

export default class Preview extends View {
    private item: AlbumItem;
    
    constructor() {
        super();
        this.element = createElement(`<div class="${css.container}"/>`);
    }
    
    setItem(item: AlbumItem) {
        const { element } = this;

        this.item = item;
        element.innerHTML = '';
        element.appendChild((new Loading).getElement());
        load(item.thumbUrl).then(() => {
            element.innerHTML = (`<img class="${css.img}" src="${item.url}">`);
        });
    }
}