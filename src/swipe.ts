const touchSupport = 'ontouchstart' in window || navigator.msMaxTouchPoints;

interface Params {
    element: HTMLElement;
    onSwipeLeft: Function;
    onSwipeRight: Function;
}

interface Point {
    x: number;
    y: number;
}

export default class Swipe {
    private element: HTMLElement;
    private onSwipeLeft: Function;
    private onSwipeRight: Function;
    private startPoint: Point;

    constructor({element, onSwipeRight, onSwipeLeft}: Params) {
        this.element = element;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
        this.startPoint = {
            x: 0,
            y: 0
        };
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    activate() {
        this.element.addEventListener(
            touchSupport ? 'touchstart' : 'mousedown',
            touchSupport ? this.onTouchStart : this.onMouseDown
        );
    }

    deactivate() {
        this.element.removeEventListener(
            touchSupport ? 'touchstart' : 'mousedown',
            touchSupport ? this.onTouchStart : this.onMouseDown
        );
    }

    private onTouchStart(event: TouchEvent) {
        const touch = event.touches[0];

        this.start({ x: touch.pageX, y: touch.pageY });
    }

    private onMouseDown (event: MouseEvent) {
        this.start({ x: event.pageX, y: event.pageY });
    }

    private start(point: Point) {
        this.startPoint = point;
        this.element.addEventListener(
            touchSupport ? 'touchmove' : 'mousemove',
            touchSupport ? this.onTouchMove : this.onMouseMove
        );
        this.element.addEventListener(
            touchSupport ? 'touchend' : 'mouseup',
            this.end.bind(this)
        );
    }

    private onTouchMove(event: TouchEvent) {
        const touch = event.touches[0];

        this.swipe({ x: touch.pageX, y: touch.pageY });
    }

    private onMouseMove(event: MouseEvent) {
        this.swipe({ x: event.pageX, y: event.pageY });
    }

    private swipe(point: Point) {
        if (this.startPoint.x + 100 < point.x) {
            this.onSwipeRight();
            this.end();
        }
        else if (point.x < this.startPoint.x - 100) {
            this.onSwipeLeft();
            this.end();
        }
    }

    private end() {
        this.element.removeEventListener(
            touchSupport ? 'touchmove' : 'mousemove',
            touchSupport ? this.onTouchMove : this.onMouseMove
        );
    }
}