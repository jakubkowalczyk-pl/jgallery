import createElement from '../utils/create-element/index';
import AlbumItem from '../album-item';
import View from '../view';
import * as css from './preview.scss';

export default class Preview extends View {
    private item: AlbumItem;
    
    constructor() {
        super();
        this.element = createElement('<div/>');
    }
    
    setItem(item: AlbumItem) {
        this.item = item;
        this.element.innerHTML = '';
        this.element.appendChild(createElement('<img class="' + css.img + '" src="' + item.url + '">'));
    }
}