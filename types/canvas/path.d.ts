import Layer from './layer';
import Vector from './vector';
declare class Path extends Layer {
    points: Vector[];
    constructor(points: Vector[]);
    clone(): Path;
    move(vector: Vector): void;
}
export default Path;
