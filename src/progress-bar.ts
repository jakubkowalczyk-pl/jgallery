import createElement from './utils/create-element/index';
import Component from './component';
import Animation from './animation';

interface Params {
    duration: number;
    onEnd: () => any;
    style?: Partial<CSSStyleDeclaration>;
}

export default class ProgressBar extends Component {
    private value: number;
    private animation: Animation;
    private duration: number;
    private onEnd: () => any;

    constructor({ duration, onEnd, style = {} }: Params) {
        super();
        this.duration = duration;
        this.onEnd = onEnd;
        this.element = createElement(`
            <div></div>
        `);
        this.appendStyle({
            height: '1px',
            background: '#fff',
            ...style,
        });
        this.animation = new Animation({
            initialValue: this.value,
            finalValue: 1,
            duration: this.duration,
            easingFunction: x => x,
            onChange: value => this.setValue(value),
            onComplete: this.onEnd,
        });
        this.setValue(0);
    }

    start() {
        this.animation.start();
    }

    pause() {
        this.animation.pause();
    }

    reset() {
        this.animation.reset();
        this.setValue(0);
    }

    setValue(value: number) {
        this.appendStyle({
            width: `${value*100}%`,
        });
        this.animation.setValue(value);
        this.value = value;
    }
}