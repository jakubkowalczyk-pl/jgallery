export interface Params {
    element: HTMLElement;
    onSwipeLeft?: Function;
    onSwipeRight?: Function;
}
export default class SwipeListener {
    private onSwipeLeft;
    private onSwipeRight;
    private draggableListener;
    constructor({ element, onSwipeRight, onSwipeLeft }: Params);
    activate(): void;
    deactivate(): void;
}
