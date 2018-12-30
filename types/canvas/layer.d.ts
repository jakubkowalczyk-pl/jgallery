export interface Params {
    width?: number;
    height?: number;
    translateX?: number;
    translateY?: number;
    centerX?: number;
    centerY?: number;
    fillStyle?: string;
    alpha?: number;
}
export default class Layer {
    width: number;
    height: number;
    translateX: number;
    translateY: number;
    centerX: number;
    centerY: number;
    fillStyle: string;
    alpha: number;
    mask: Layer;
    layers: Layer[];
    constructor({ width, height, translateX, translateY, centerX, centerY, fillStyle, alpha }: Params);
    add(layer: Layer): void;
    remove(layer: Layer): void;
    clearLayers(): void;
}
