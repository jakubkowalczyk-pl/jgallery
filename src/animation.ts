export interface OnChange {
    (value: number): void;
}

export interface OnComplete {
    (): void;
}

export interface EasingFunction {
    (time: number): number;
}

export interface Params {
    initialValue?: number;
    finalValue?: number;
    onChange?: OnChange;
    onComplete?: OnComplete;
    duration?: number;
    easingFunction?: EasingFunction;
}

export default class Animation {
    initialValue: number;
    currentValue: number;
    finalValue: number;
    currentTime: number;
    completed: boolean;
    onChange: OnChange;
    onComplete: OnComplete;
    duration: number;
    easingFunction: EasingFunction;
    private animationFrame: number;

    constructor({ initialValue = 0, finalValue = 0, onChange = () => {}, onComplete = () => {}, duration = 500, easingFunction = t => Math.sin(t*1.5707963267948966) }: Params) {
        this.initialValue = initialValue;
        this.currentValue = initialValue;
        this.finalValue = finalValue;
        this.duration = duration;
        this.easingFunction = easingFunction;
        this.onComplete = onComplete;
        this.currentTime = 0;
        this.onChange = onChange;
        this.completed = false;
        this.start = this.start.bind(this);
    }

    start() {
        this.goToNextFrame();
        if (!this.completed) {
            this.animationFrame = requestAnimationFrame(this.start);
        }
    }

    pause() {
        cancelAnimationFrame(this.animationFrame);
    }

    setValue(value: number) {
        this.currentValue = value;
    }

    reset() {
        this.pause();
        this.currentTime = 0;
        this.currentValue = this.initialValue;
        this.completed = false;
    }

    goToNextFrame(): void {
        this.currentTime += 16/this.duration;
        this.currentValue = this.initialValue + (this.finalValue - this.initialValue) * this.easingFunction(this.currentTime);
        if (this.currentTime < 1) {
            this.onChange(this.currentValue);
        }
        else {
            this.currentValue = this.finalValue;
            this.onChange(this.currentValue);
            this.completed = true;
            this.onComplete();
        }
    }

    addCompleteListener(fn: Function): void {
        const { onComplete } = this;

        this.onComplete = () => {
            onComplete();
            fn();
        };
    }

    cancel(): void {
        this.goToNextFrame = () => {};
    }
}