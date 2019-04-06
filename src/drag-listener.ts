import Point from './point';
import {touchSupport} from './environment';

export interface Params {
    element: HTMLElement;
    onMove?: OnMove;
    preventDefault?: boolean;
}

export interface OnMove {
    (p: { drag: Point, move: Point }): void;
}

export default class DragListener {
    private element: HTMLElement;
    private onMove: OnMove;
    private startPoint: Point;
    private prevPosition: Point;
    private active: boolean;

    constructor({element, onMove = () => {}, preventDefault = true}: Params) {
        this.element = element;
        this.onMove = onMove;
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.end = this.end.bind(this);
        if (!preventDefault) {
            this.preventDefault = () => {};
        }
    }

    activate() {
        if (!this.active) {
            this.active = true;
            this.element.addEventListener(
                touchSupport ? 'touchstart' : 'mousedown',
                touchSupport ? this.onTouchStart : this.onMouseDown
            );
        }
    }

    deactivate() {
        if (this.active) {
            this.active = false;
            this.element.removeEventListener(
                touchSupport ? 'touchstart' : 'mousedown',
                touchSupport ? this.onTouchStart : this.onMouseDown
            );
        }
    }

    end() {
        this.element.removeEventListener(
            touchSupport ? 'touchmove' : 'mousemove',
            touchSupport ? this.onTouchMove : this.onMouseMove
        );
        (touchSupport ? ['touchend'] : ['mouseleave', 'mouseup']).forEach(event => {
            this.element.removeEventListener(event, this.end);
        });
    }

    private onTouchStart(event: TouchEvent) {
        const touch = event.touches[0];

        this.preventDefault(event);
        this.start(new Point({ x: touch.pageX, y: touch.pageY }));
    }

    private onMouseDown (event: MouseEvent) {
        this.preventDefault(event);
        this.start(new Point({ x: event.pageX, y: event.pageY }));
    }

    private start(point: Point) {
        this.startPoint = point;
        this.prevPosition = point;
        this.element.addEventListener(
            touchSupport ? 'touchmove' : 'mousemove',
            touchSupport ? this.onTouchMove : this.onMouseMove
        );
        (touchSupport ? ['touchend'] : ['mouseleave', 'mouseup']).forEach(event => {
            this.element.addEventListener(event, this.end);
        });
    }

    private onTouchMove(event: TouchEvent) {
        const touch = event.touches[0];

        this.preventDefault(event);
        this.move(new Point({ x: touch.pageX, y: touch.pageY }));
    }

    private onMouseMove(event: MouseEvent) {
        this.preventDefault(event);
        this.move(new Point({ x: event.pageX, y: event.pageY }));
    }

    private move(point: Point) {
        this.onMove({
            drag: point.subtract(this.startPoint),
            move: point.subtract(this.prevPosition),
        });
        this.prevPosition = point;
    }

    private preventDefault<T extends Event>(event: T) {
        event.preventDefault();
    }
}