import createElement from '../utils/create-element/index';
import promise from '../utils/cancellable-promise';
import Queue from '../utils/queue';
import load from '../utils/load/index';
import AlbumItem from '../album-item';
import Component from '../component';
import Point from '../point';
import SwipeListener from '../swipe-listener';
import DragListener from '../drag-listener';

export enum Size {
    contain = 'contain',
    cover = 'cover',
    auto = 'auto',
}

export interface Params {
    onSwipeLeft?: Function;
    onSwipeRight?: Function;
    leftOnClick?: Function;
    rightOnClick?: Function;
    canDrag?: boolean;
}

export default class Preview extends Component {
    public hasImage: boolean;
    public size: Size;
    private item: AlbumItem;
    private moveDistance: Point;
    private dragListener: DragListener;
    private swipeListener: SwipeListener;
    private canDrag: boolean;
    private content: HTMLElement;
    private left: HTMLElement;
    private right: HTMLElement;

    constructor(params: Params = {}) {
        const { onSwipeLeft = () => {}, onSwipeRight = () => {}, canDrag, leftOnClick = () => {}, rightOnClick = () => {} } = params;

        super();
        this.size = Size.cover;
        this.canDrag = canDrag;
        this.element = createElement(`<div class="j-gallery-preview"/>`, {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flex: '1',
            }
        });
        this.dragListener = new DragListener({
            element: this.element,
            onMove: ({ move }) => this.move(move),
        });
        this.swipeListener = new SwipeListener({
            element: this.element,
            onSwipeLeft,
            onSwipeRight,
        });
        this.left = createElement(`
            <div class="j-gallery-left" style="left: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.left.addEventListener('click', () => leftOnClick());
        this.right = createElement(`
            <div class="j-gallery-right" style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
        `);
        this.right.addEventListener('click', () => rightOnClick());
    }

    setItem(item: AlbumItem) {
        this.moveDistance = new Point;

        const { element } = this;

        this.content = createElement(
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
        element.appendChild(this.left);
        element.appendChild(this.right);

        return promise((resolve, reject, onCancel) => {
            const queue = new Queue(
                () => load(this.hasImage ? item.url : this.content),
                () => {
                    element.appendChild(this.content);
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
                this.content.style, {
                    backgroundSize: this.size,
                    backgroundPosition: 'center center',
                }
            );
        }
        this.hasImage && size === 'auto' ? this.activateDragging() : this.deactivateDragging();
    }

    onClick(fn: Function) {
        [this.left, this.right].forEach(element => element.addEventListener('click', () => fn()));
    }

    private activateDragging() {
        if (this.canDrag) {
            this.dragListener.activate();
            this.swipeListener.deactivate();
            this.deactivateClickableArea();
            this.element.style.cursor = 'move';
        }
    }

    private deactivateDragging() {
        if (this.canDrag) {
            this.dragListener.deactivate();
            this.swipeListener.activate();
            this.activateClickableArea();
            this.element.style.cursor = 'default';
        }
    }

    private move(move: Point) {
        if (this.hasImage) {
            this.moveDistance = this.moveDistance.add(move);
            Object.assign(
                this.content.style, {
                    backgroundPosition: `calc(50% + ${this.moveDistance.x}px) calc(50% + ${this.moveDistance.y}px)`,
                }
            );
        }
    }

    private activateClickableArea() {
        [this.left, this.right].forEach(element => this.element.appendChild(element));
    }

    private deactivateClickableArea() {
        [this.left, this.right].forEach(element => this.element.removeChild(element));
    }
}