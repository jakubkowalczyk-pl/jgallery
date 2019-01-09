export default class Point {
    x: number;
    y: number;
    constructor({ x, y }?: {
        x?: number;
        y?: number;
    });
    add<T extends {
        x: number;
        y: number;
    }>(point: T): Point;
    subtract<T extends {
        x: number;
        y: number;
    }>(point: T): Point;
}
