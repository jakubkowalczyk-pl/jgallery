import createElement from '../utils/create-element/index';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';
import * as css from './preview.scss';

export default class Preview extends Component {
    private item: AlbumItem;

    constructor() {
        super();
        this.element = createElement(`<div class="${css.container}"/>`);
    }

    setItem(item: AlbumItem): Promise<void> {
        const { element } = this;
        const content: HTMLElement = createElement(
            item.element ?
            item.element.outerHTML :
            `<img src="${item.url}"/>`
        );

        this.item = item;
        element.innerHTML = '';

        return load(content).then(() => {
            element.innerHTML = '';
            element.appendChild(content);
        });
    }
}