import View from '../../view';
import AlbumItem from '../../album-item';
import Loading from '../../loading/index';
import createElement from '../../utils/create-element/index';
import load from '../../utils/load/index';
import * as css from './thumbnail.scss';

export default class Thumbnail extends View {    
    constructor({ item, onClick }: Params) {
        super();
        this.element = createElement(`
            <a href="${item.url}" class="${css.thumbnail}"></a>
        `);
        this.element.appendChild((new Loading).getElement());
        this.element.addEventListener('click', (event: Event) => {
            onClick({
                item,
                event
            });
        });
        load(item.thumbUrl).then(() => {
            this.element.innerHTML = (`<img src="${item.thumbUrl}" alt="${item.title}" class="${css.img}"/>`);
        });
    }
}

interface Params {
    item: AlbumItem,
    onClick: Function
}