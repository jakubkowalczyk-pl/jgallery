import createElement from '../utils/create-element/index';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';

type Size = 'contain' | 'cover' | 'auto';

export default class Preview extends Component {
    public hasImage: boolean;
    public size: Size;
    private item: AlbumItem;

    constructor() {
        super();
        this.size = 'cover';
        this.element = createElement(`<div/>`, {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                display: 'flex',
                flex: '1',
            }
        });
    }

    setItem(item: AlbumItem): Promise<void> {
        const { element } = this;
        const content: HTMLElement = createElement(
            item.element ?
            item.element.outerHTML :
            `<div style="
                height: 100%;
                background: center center url(${item.url}) no-repeat;
                background-size: ${this.size};
                flex: 1;
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

    setSize(size: Size) {
        this.size = size;
        if (this.hasImage) {
            (<HTMLElement>this.element.firstChild).style.backgroundSize = this.size;
        }
    }
}