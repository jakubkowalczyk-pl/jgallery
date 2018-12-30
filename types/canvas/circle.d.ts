import Layer, { Params as LayerParams } from './layer';
export interface Params extends LayerParams {
    radius?: number;
    startAngle?: number;
    endAngle?: number;
}
export default class Circle extends Layer {
    radius: number;
    startAngle: number;
    endAngle: number;
    constructor({ translateX, translateY, radius, startAngle, endAngle }: Params);
}
