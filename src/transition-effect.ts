import Animation, {EasingFunction} from './animation';
import Canvas from './canvas/index';
import Layer from './canvas/layer';
import promise from './utils/cancellable-promise';

export interface Params {
    backgroundColor?: string;
    reverse?: boolean;
    duration?: number;
    details?: number;
    originX?: number;
    originY?: number;
    xAxis?: boolean;
    yAxis?: boolean;
    easingFunction?: EasingFunction;
    opacity?: boolean;
    animateSliceWidth?: boolean;
    animateSliceHeight?: boolean;
}

const defaults: Params = {
    reverse: false,
    backgroundColor: '#000',
    duration: 500,
    details: 1,
    originX: .5,
    originY: .5,
    xAxis: true,
    yAxis: true,
    opacity: false,
    animateSliceWidth: true,
    animateSliceHeight: false,
};

const transitionEffect = (canvas: Canvas, params: Params = {}) => {
    params = {...defaults, ...params};

    const sliceSize = 20*(1/params.details);
    const sliceSizeX = params.xAxis ? sliceSize : canvas.element.width;
    const sliceSizeY = params.yAxis ? sliceSize : canvas.element.height;
    const distanceToOrigin = (layer: Layer) => {
        const { width, height } = canvas.element;

        return Math.sqrt(
            Math.pow(Math.abs(layer.translateX-width*params.originX)/width, 2) +
            Math.pow(Math.abs(layer.translateY-height*params.originY)/height, 2)
        );
    };
    const listeners: ((layer: Layer, progress: number) => void)[] = [];

    params.animateSliceWidth && listeners.push((layer, progress) => {
        layer.width = progress * sliceSizeX * (1 + distanceToOrigin(layer));
    });
    params.animateSliceHeight && listeners.push((layer, progress) => {
        layer.height = progress * sliceSizeY * (1 + distanceToOrigin(layer));
    });
    params.opacity && listeners.push((layer, progress) => {
        layer.alpha = progress;
    });

    return promise((resolve, reject, onCancel) => {
        const layers: Layer[] = [];
        const animation = new Animation({
            initialValue: +params.reverse,
            finalValue: 1 - +params.reverse,
            easingFunction: params.easingFunction,
            duration: params.duration,
            onChange: value => layers.forEach(layer => listeners.forEach(listener => listener(layer, value))),
            onComplete: () => resolve(),
        });

        for (let x = 0; x < canvas.element.width; x+=sliceSizeX) {
            for (let y = 0; y < canvas.element.height; y += sliceSizeY) {
                layers.push(new Layer({
                    translateX: x + (sliceSizeX >> 1),
                    centerX: -.5,
                    height: canvas.element.height,
                    translateY: y + (sliceSizeY >> 1),
                    centerY: -.5,
                    width: canvas.element.width,
                    fillStyle: params.backgroundColor,
                }));
            }
        }

        canvas.addLayers(layers);
        canvas.addAnimations([animation]);
        onCancel(() => animation.cancel());
    });
};

export default transitionEffect;