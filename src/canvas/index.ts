import createElement from '../utils/create-element/index';
import Animations from './animations';
import Layer from './layer';
import Path from './path';
import Circle from './circle';

interface Params {
    width: number;
    height: number;
}

class Canvas extends Layer {
    layers: Layer[];
    translateX: number;
    translateY: number;
    element: HTMLCanvasElement;

    private animations: Animations;
    private rendering: boolean;
    private ctx: CanvasRenderingContext2D | null;

    constructor({ width, height }: Params) {
        super({});
        this.layers = [];
        this.animations = new Animations;
        this.translateX = 0;
        this.translateY = 0;
        this.element = <HTMLCanvasElement>createElement('<canvas></canvas>');
        this.element.width = width;
        this.element.height = height;
        this.ctx = this.element.getContext("2d");
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    setDimensions(width: number, height: number): void {
        const { element } = this;
        const widthRatio = width / element.width;
        const heightRatio = height / element.height;

        element.width = width;
        element.height = height;
        this.getLayersRecursive().forEach(layer => {
            layer.width *= widthRatio;
            layer.height *= heightRatio;
        });
    }

    containsLayer(layer: Layer): boolean {
        return this.layers.indexOf(layer) > -1;
    }

    addLayers(layers: Array<Layer>): void {
        layers.forEach(layer => {
            if (!this.containsLayer(layer)) {
                this.layers.push(layer);
                addListeners(layer);
            }
        });
    }

    removeLayers(layers: Array<Layer>): void {
        layers.forEach(layer => {
            if (this.containsLayer(layer)) {
                this.layers.splice(this.layers.indexOf(layer), 1);
                removeListeners(layer);
            }
        });
    }

    clearLayers() {
        this.layers.forEach(layer => {
            removeListeners(layer);
        });
        this.layers.length = 0;
    }

    activateRendering() {
        if (!this.rendering) {
            this.render();
        }
    }

    render() {
        this.rendering = true;
        this.animations.render();
        this.clear();
        this.draw();
        if (this.animations.count()) {
            requestAnimationFrame(this.render);
        }
        else {
            this.rendering = false;
        }
    }

    redraw() {
        this.clear();
        this.draw();
    }

    onWindowResize() {
    }

    private getLayersRecursive(): Array<Layer> {
        return [...getLayersRecursive(this)];
    }

    applyPathMask(path = new Path([])): void {
        const { ctx } = this;
        const { points } = path;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach(point => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.clip();
    }

    applyCircleMask({ circle = new Circle({}), translateX = 0, translateY = 0 }) {
        const { ctx } = this;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(translateX + circle.translateX, translateY + circle.translateY);
        ctx.arc(translateX + circle.translateX, translateY + circle.translateY, circle.radius, circle.startAngle, circle.endAngle);
        ctx.closePath();
        ctx.clip();
    }

    drawPath({ path = new Path([]), translateX = 0, translateY = 0 }) {
        const { ctx } = this;
        const { points } = path;

        ctx.fillStyle = path.fillStyle;
        ctx.beginPath();
        ctx.moveTo(points[0].x + translateX, points[0].y + translateY);
        points.slice(1).forEach(point => ctx.lineTo(point.x + translateX, point.y + translateY));
        ctx.closePath();
        ctx.fill();
    }

    draw() {
        this.drawLayer({ layer: this });
    }

    drawLayer({ layer = new Layer({}), translateX = 0, translateY = 0 }) {
        const { ctx } = this;

        translateX += layer.translateX;
        translateY += layer.translateY;
        ctx.globalAlpha = layer.alpha;
        if (layer.mask instanceof Path) {
            this.applyPathMask(layer.mask);
        }
        else if (layer.mask instanceof Circle) {
            this.applyCircleMask({ circle: layer.mask, translateX, translateY  });
        }
        if (layer instanceof Path) {
            this.drawPath({ path: layer, translateX, translateY });
        }
        else if (layer.fillStyle) {
            ctx.fillStyle = layer.fillStyle;
            ctx.fillRect(
                translateX,
                translateY,
                layer.width,
                layer.height
            );
        }
        if (layer.mask) {
            ctx.restore();
        }
        layer.layers.forEach(layer => this.drawLayer({ layer, translateX, translateY }));
    }

    clear() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
}

const getLayersRecursive = (layer: Layer): Array<Layer> => {
    return [...layer.layers, ...layer.layers.reduce((layers, layer) => {
        return [...layers, ...getLayersRecursive(layer)];
    }, [])];
}

const addListeners = (layer: Layer) => {
    window.addEventListener('resize', layer.onWindowResize);
    layer.layers.forEach(layer => addListeners(layer));
};

const removeListeners = (layer: Layer) => {
    window.removeEventListener('resize', layer.onWindowResize);
    layer.layers.forEach(layer => removeListeners(layer));
};

export default Canvas;