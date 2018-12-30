export interface Params {
    element: HTMLElement;
    onSwipeLeft: Function;
    onSwipeRight: Function;
}
export default class Swipe {
    private element;
    private onSwipeLeft;
    private onSwipeRight;
    private startPoint;
    constructor({ element, onSwipeRight, onSwipeLeft }: Params);
    activate(): void;
    deactivate(): void;
    private onTouchStart;
    private onMouseDown;
    private start;
    private onTouchMove;
    private onMouseMove;
    private swipe;
    private end;
}
