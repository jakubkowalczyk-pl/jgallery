import Layer from './layer';
import Vector from './vector';

class Path extends Layer {
    points: Vector[];
    
    constructor(points: Vector[]) {
        super({});
        this.points = points;
    }

    clone(): Path {
        return new Path(this.points.map(point => point.clone()));
    }

    move(vector: Vector): void {
        this.points.forEach(point => point.move(vector));
    }
}

export default Path;