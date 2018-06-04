import createElement from '../utils/create-element/index';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';

export default class Preview extends Component {
    public hasImage: boolean;
    private item: AlbumItem;
    private size: 'contain' | 'cover';

    constructor() {
        super();
        this.size = 'cover';
        this.element = createElement(`<div/>`, {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                display: 'flex',
            }
        });
    }

    isCover() {
        return this.size === 'cover';
    }

    cover() {
        this.size = 'cover';
        if (this.hasImage) {
            (<HTMLElement>this.element.firstChild).style.backgroundSize = this.size;
        }
    }

    contain() {
        this.size = 'contain';
        if (this.hasImage) {
            (<HTMLElement>this.element.firstChild).style.backgroundSize = this.size;
        }
    }

    setItem(item: AlbumItem): Promise<void> {
        const { element } = this;
        const content: HTMLElement = createElement(
            item.element ?
            item.element.outerHTML :
            `<div style="
                width: 100%;
                height: 100%;
                background: center center url(${item.url}) no-repeat;
                background-size: ${this.size};
            "/>`
        );

        this.hasImage = !item.element;
        this.item = item;
        element.innerHTML = '';

        return load(content).then(() => {
            element.innerHTML = '';
            element.appendChild(content);
        });
    }
}