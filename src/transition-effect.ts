import Animation from './animation';
import Canvas from './canvas/index';
import Layer from './canvas/layer';

interface Params {
    backgroundColor?: string;
    reverse?: boolean;
    duration?: number;
    details?: number;
    xAxis?: boolean;
    yAxis?: boolean;
}

const defaults: Params = {
    reverse: false,
    backgroundColor: '#000',
    duration: 500,
    details: 1,
    xAxis: true,
    yAxis: true,
};

const transitionEffect = (canvas: Canvas, params: Params = {}) => {
    params = {...defaults, ...params};

    const sliceSize = 20*(1/params.details);
    const sliceSizeX = params.xAxis ? sliceSize : canvas.element.width;
    const sliceSizeY = params.yAxis ? sliceSize : canvas.element.height;

    return new Promise(resolve => {
        const layers: Layer[] = [];

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
        canvas.addAnimations([new Animation({
            initialValue: +params.reverse,
            finalValue: 1 - +params.reverse,
            duration: params.duration,
            onChange: value => {
                const halfWidth = canvas.element.width >> 1;
                const halfHeight = canvas.element.height >> 1;

                value *= sliceSize;
                params.xAxis && layers.forEach(layer => {
                    layer.width = value + (1-Math.abs(layer.translateX - halfWidth)/halfWidth) * value;
                });
                params.yAxis && layers.forEach(layer => {
                    layer.height = value + (1-Math.abs(layer.translateY - halfHeight)/halfHeight) * value;
                });
            },
            onComplete: () => {
                resolve();
            }
        })]);
    });
};

export default transitionEffect;