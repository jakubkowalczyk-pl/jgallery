import Animation from '../../animation';
import Canvas from '../index';
import Layer from '../layer';

interface Params {
    reverse?: boolean;
}

const fadeIn = (canvas: Canvas, params: Params = {}) => {
    params = {reverse: false, ...params};

    return new Promise(resolve => {
        const layers: Layer[] = [];

        for (let x = 0; x < canvas.element.width; x+=20) {
            layers.push(new Layer({
                translateX: x + 10,
                centerX: -.5,
                height: canvas.element.height,
                fillStyle: 'black',
            }));
        }

        canvas.addLayers(layers);
        canvas.addAnimations([new Animation({
            initialValue: +params.reverse - 0,
            finalValue: 1 - +params.reverse,
            onChange: value => {
                const halfWidth = canvas.element.width >> 1;

                value *= 20;
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