export default class Vector {
    x: number;
    y: number;
    
    constructor({ x = 0, y = 0 }: { x: number, y: number }) {
        this.x = x;
        this.y = y;
    }

    clone(): Vector {
        return new Vector({
            x: this.x,
            y: this.y
        });
    }

    move(vector: Vector): void {
        this.x += vector.x;
        this.y += vector.y;
    }
}