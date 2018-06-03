import Component from '../../component';
import AlbumItem from '../../album-item';
import Loading from '../../loading/index';
import createElement from '../../utils/create-element/index';
import load from '../../utils/load/index';

export interface ThumbOnClick {
    (item: AlbumItem): void
}

interface Params {
    item: AlbumItem,
    onClick: ThumbOnClick
}

export default class Thumbnail extends Component {
    constructor({ item, onClick }: Params) {
        super();

        const content: HTMLElement = createElement(
            item.thumbElement ?
            item.thumbElement.outerHTML :
            `<img src="${item.thumbUrl}"/>`
        );

        this.element = createElement(`<span></span>`, {
            style: {
                width: '100px',
                height: '100px',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#fff',
                overflow: 'hidden',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                flex: '0 0 100px',
                position: 'relative',
            }
        });
        this.element.appendChild((new Loading).getElement());
        this.element.addEventListener('click', () => onClick(item));
        load(content).then(() => {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        });
    }
}