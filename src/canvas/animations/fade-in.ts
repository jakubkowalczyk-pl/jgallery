import CanvasAnimation from '../animation';
import Animation from '../../animation';
import Canvas from '../index';
import Layer from '../layer';

const fadeIn: CanvasAnimation = (canvas: Canvas) => {
    return new Promise(resolve => {
        const layer = new Layer({
            width: canvas.element.width,
            height: canvas.element.height,
            fillStyle: 'black',
            alpha: 1
        });

        canvas.addLayers([layer]);
        (new Animation({
            initialValue: 0,
            finalValue: 1,
            onChange: value => {
                layer.alpha = value;
                canvas.render();
            },
            onComplete: () => {
                resolve();
            }
        })).start();
    });
};

export default fadeIn;