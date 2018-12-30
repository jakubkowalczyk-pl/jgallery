import Animation from './animation';
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
};

const transitionEffect = (canvas: Canvas, params: Params = {}) => {
    params = {...defaults, ...params};

    const sliceSize = 20*(1/params.details);
    const sliceSizeX = params.xAxis ? sliceSize : canvas.element.width;
    const sliceSizeY = params.yAxis ? sliceSize : canvas.element.height;

    return promise((resolve, reject, onCancel) => {
        const layers: Layer[] = [];
        const animation = new Animation({
            initialValue: +params.reverse,
            finalValue: 1 - +params.reverse,
            duration: params.duration,
            onChange: value => {
                const { width, height } = canvas.element;

                value *= sliceSize;
                params.xAxis && layers.forEach(layer => {
                    layer.width = value + Math.abs(layer.translateX-width*params.originX)/width * value;
                });
                params.yAxis && layers.forEach(layer => {
                    layer.height = value + Math.abs(layer.translateY-height*params.originY)/height * value;
                });
            },
            onComplete: () => {
                resolve();
            }
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