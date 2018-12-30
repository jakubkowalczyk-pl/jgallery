import Layer, {Params as LayerParams} from './layer';

const { PI } = Math;

export interface Params extends LayerParams {
    radius?: number;
    startAngle?: number;
    endAngle?: number;
}

export default class Circle extends Layer {
    radius: number;
    startAngle: number;
    endAngle: number;

    constructor({ translateX = 0, translateY = 0, radius = 0, startAngle = 0, endAngle = 2*PI }: Params) {
        super({ translateX, translateY });
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}
