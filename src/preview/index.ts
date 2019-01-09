import createElement from '../utils/create-element/index';
import promise from '../utils/cancellable-promise';
import Queue from '../utils/queue';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';
import Point from '../point';

export enum Size {
    contain = 'contain',
    cover = 'cover',
    auto = 'auto',
}

export default class Preview extends Component {
    public hasImage: boolean;
    public size: Size;
    private item: AlbumItem;
    private moveDistance: Point;

    constructor() {
        super();
        this.size = Size.cover;
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
        this.moveDistance = new Point;

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
            this.moveDistance = new Point;
            Object.assign(
                (<HTMLElement>this.element.firstChild).style, {
                    backgroundSize: this.size,
                    backgroundPosition: 'center center',
                }
            );
        }
    }

    move(move: Point) {
        if (this.hasImage) {
            this.moveDistance = this.moveDistance.add(move);
            Object.assign(
                (<HTMLElement>this.element.firstChild).style, {
                    backgroundPosition: `calc(50% + ${this.moveDistance.x}px) calc(50% + ${this.moveDistance.y}px)`,
                }
            );
        }
    }
}