import DraggableListener from './drag-listener';

export interface Params {
    element: HTMLElement;
    onSwipeLeft?: Function;
    onSwipeRight?: Function;
}

export default class SwipeListener {
    private onSwipeLeft: Function;
    private onSwipeRight: Function;
    private draggableListener: DraggableListener;

    constructor({element, onSwipeRight = () => {}, onSwipeLeft = () => {}}: Params) {
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
        this.draggableListener = new DraggableListener({
            element,
            preventDefault: false,
            onMove: ({ drag, move }) => {
                if (drag.x > 100) {
                    this.onSwipeRight();
                    this.draggableListener.end();
                }
                else if (drag.x < -100) {
                    this.onSwipeLeft();
                    this.draggableListener.end();
                }
            }
        });
    }

    activate() {
        this.draggableListener.activate();
    }

    deactivate() {
        this.draggableListener.deactivate();
    }
}