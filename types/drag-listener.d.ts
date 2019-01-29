import Point from './point';
export interface Params {
    element: HTMLElement;
    onMove?: OnMove;
}
export interface OnMove {
    (p: {
        drag: Point;
        move: Point;
    }): void;
}
export default class DragListener {
    private element;
    private onMove;
    private startPoint;
    private prevPosition;
    private active;
    constructor({ element, onMove }: Params);
    activate(): void;
    deactivate(): void;
    end(): void;
    private onTouchStart;
    private onMouseDown;
    private start;
    private onTouchMove;
    private onMouseMove;
    private move;
}
