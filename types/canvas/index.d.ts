import Animation from '../animation';
import Layer from './layer';
import Path from './path';
import Circle from './circle';
export interface Params {
    width: number;
    height: number;
}
declare class Canvas extends Layer {
    layers: Layer[];
    translateX: number;
    translateY: number;
    element: HTMLCanvasElement;
    private animations;
    private ctx;
    constructor({ width, height }: Params);
    setDimensions(width: number, height: number): void;
    containsLayer(layer: Layer): boolean;
    addAnimations(animations: Animation[]): void;
    addLayers(layers: Array<Layer>): void;
    removeLayers(layers: Array<Layer>): void;
    clearLayers(): void;
    redraw(): void;
    private getLayersRecursive;
    applyPathMask(path?: Path): void;
    applyCircleMask({ circle, translateX, translateY }: {
        circle?: Circle;
        translateX?: number;
        translateY?: number;
    }): void;
    drawPath({ path, translateX, translateY }: {
        path?: Path;
        translateX?: number;
        translateY?: number;
    }): void;
    draw(): void;
    drawLayer({ layer, translateX, translateY }: {
        layer?: Layer;
        translateX?: number;
        translateY?: number;
    }): void;
    clear(): void;
}
export default Canvas;
