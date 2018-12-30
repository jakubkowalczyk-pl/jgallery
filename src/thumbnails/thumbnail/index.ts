import Component from '../../component';
import AlbumItem from '../../album-item';
import Loading from '../../loading/index';
import createElement from '../../utils/create-element/index';
import load from '../../utils/load/index';

export interface ThumbOnClick {
    (item: AlbumItem): void
}

export interface Params {
    item: AlbumItem,
    textColor: string;
    onClick: ThumbOnClick;
    width: string;
    height: string;
}

export default class Thumbnail extends Component {
    constructor({ item, onClick, textColor, width, height }: Params) {
        super();

        const content: HTMLElement = createElement(
            item.thumbElement ?
            item.thumbElement.outerHTML :
            `<img draggable="false" src="${item.thumbUrl}" style="max-width: 100%; max-height: 100%"/>`
        );

        this.element = createElement(`<span class="j-gallery-thumbnail"></span>`, {
            style: {
                width,
                height,
                marginRight: '5px',
                marginBottom: '5px',
                color: textColor,
                overflow: 'hidden',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                boxSizing: 'border-box',
                flex: `0 0 ${width}`,
                position: 'relative',
            }
        });
        this.element.appendChild((new Loading({ style: { fontSize: '.5em'}, color: textColor })).getElement());
        this.element.addEventListener('click', () => onClick(item));
        load(content).then(() => {
            this.element.innerHTML = '';
            this.element.appendChild(content);
        });
    }

    setSize({ width, height }: { width: string; height: string }) {
        Object.assign(this.element.style, {
            width,
            height,
            flexBasis: width,
        });
    }
}