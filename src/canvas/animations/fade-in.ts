import CanvasAnimation from '../animation';
import Animation from '../../animation';
import Canvas from '../index';
import Layer from '../layer';

const fadeIn: CanvasAnimation = (canvas: Canvas) => {
    return new Promise(resolve => {
        const layers: Layer[] = [];

        for (let x = 0; x < canvas.element.width; x+=20) {
            for (let y = 0; y < canvas.element.height; y+=20) {
                layers.push(new Layer({
                    translateX: x + 10,
                    translateY: y + 10,
                    centerX: -.5,
                    centerY: -.5,
                    fillStyle: 'black',
                }));
            }
        }

        canvas.addLayers(layers);
        canvas.addAnimations([new Animation({
            duration: 1000,
            initialValue: 0,
            finalValue: 1,
            onChange: value => {
                layers.forEach(layer => {
                    layer.width = Math.min(value * 20 + (Math.abs(layer.translateX - canvas.element.width/2)/(canvas.element.width/2)) * value * 10, 20);
                    layer.height = Math.min(value * 20 + (Math.abs(layer.translateY - canvas.element.height/2)/(canvas.element.height/2)) * value * 10, 20);
                });
            },
            onComplete: () => {
                resolve();
            }
        })]);
    });
};

export default fadeIn;