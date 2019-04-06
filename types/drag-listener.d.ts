import Point from './point';
export interface Params {
    element: HTMLElement;
    onMove?: OnMove;
    preventDefault?: boolean;
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
    constructor({ element, onMove, preventDefault }: Params);
    activate(): void;
    deactivate(): void;
    end(): void;
    private onTouchStart;
    private onMouseDown;
    private start;
    private onTouchMove;
    private onMouseMove;
    private move;
    private preventDefault;
}
