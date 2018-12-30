export default class Vector {
    x: number;
    y: number;
    constructor({ x, y }: {
        x: number;
        y: number;
    });
    clone(): Vector;
    move(vector: Vector): void;
}
