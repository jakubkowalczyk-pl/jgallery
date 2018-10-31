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

    constructor({ width = 0, height = 0, translateX = 0, translateY = 0, centerX = 0, centerY = 0, fillStyle = '', alpha = 1 }: Params) {
        this.width = width;
        this.height = height;
        this.translateX = translateX;
        this.translateY = translateY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.fillStyle = fillStyle;
        this.alpha = alpha;
        this.layers = [];
    }

    add(layer: Layer): void {
        this.layers.push(layer);
    }

    remove(layer: Layer): void {
        const { layers } = this;
        const index = layers.indexOf(layer);

        if (index > -1) {
            layers.splice(index, 1);
        }
    }

    clearLayers(): void {
        this.layers.length = 0;
    }
}