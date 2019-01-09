export default class Point {
    x: number;
    y: number;

    constructor({ x, y }: { x?: number, y?: number } = {}) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add<T extends { x: number, y: number }>(point: T) {
        return new Point({
            x: this.x + point.x,
            y: this.y + point.y,
        });
    }

    subtract<T extends { x: number, y: number }>(point: T) {
        return this.add({
            x: -point.x,
            y: -point.y,
        });
    }
}
