import Animation from '../../animation';
import Canvas from '../index';
import Layer from '../layer';

interface Params {
    backgroundColor?: string;
    reverse?: boolean;
    duration?: number;
    details?: number;
}

const fadeIn = (canvas: Canvas, params: Params = {}) => {
    params = {reverse: false, backgroundColor: '#000', details: 1, ...params};

    const sliceSize = 20*(1/params.details);

    return new Promise(resolve => {
        const layers: Layer[] = [];

        for (let x = 0; x < canvas.element.width; x+=sliceSize) {
            layers.push(new Layer({
                translateX: x + (sliceSize >> 1),
                centerX: -.5,
                height: canvas.element.height,
                fillStyle: params.backgroundColor,
            }));
        }

        canvas.addLayers(layers);
        canvas.addAnimations([new Animation({
            initialValue: +params.reverse,
            finalValue: 1 - +params.reverse,
            duration: params.duration,
            onChange: value => {
                const halfWidth = canvas.element.width >> 1;

                value *= sliceSize;
                layers.forEach(layer => {
                    layer.width = value + (1-Math.abs(layer.translateX - halfWidth)/halfWidth) * value;
                });
            },
            onComplete: () => {
                resolve();
            }
        })]);
    });
};

export default fadeIn;