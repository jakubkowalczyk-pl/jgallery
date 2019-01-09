import createElement from '../utils/create-element/index';
import promise from '../utils/cancellable-promise';
import Queue from '../utils/queue';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';

export enum Size {
    CONTAIN = 'CONTAIN',
    COVER = 'COVER',
    AUTO = 'AUTO',
}

export default class Preview extends Component {
    public hasImage: boolean;
    public size: Size;
    private item: AlbumItem;

    constructor() {
        super();
        this.size = Size.COVER;
        this.element = createElement(`<div class="j-gallery-preview"/>`, {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                display: 'flex',
                flex: '1',
            }
        });
    }

    setItem(item: AlbumItem) {
        const { element } = this;
        const content: HTMLElement = createElement(
            item.element ?
            item.element.outerHTML :
            `<div class="j-gallery-preview-content" style="
                height: 100%;
                background: center center url(${item.url}) no-repeat;
                background-size: ${this.size};
                flex: 1;
            "/>`
        );

        this.hasImage = !item.element;
        this.item = item;
        element.innerHTML = '';

        return promise((resolve, reject, onCancel) => {
            const queue = new Queue(
                () => load(this.hasImage ? item.url : content),
                () => {
                    element.appendChild(content);
                    resolve();
                    return Promise.resolve();
                },
            );

            queue.run();
            onCancel(() => queue.cancel());
        });
    }

    setSize(size: Size) {
        this.size = size;
        if (this.hasImage) {
            (<HTMLElement>this.element.firstChild).style.backgroundSize = this.size;
        }
    }
}