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
                width: '64px',
                height: '64px',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#fff',
                overflow: 'hidden',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                boxSizing: 'border-box',
                flex: '0 0 64px',
                position: 'relative',
            }
        });
        this.element.appendChild((new Loading({ style: { fontSize: '.5em'} })).getElement());
        this.element.addEventListener('click', () => onClick(item));
        load(content).then(() => {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        });
    }
}