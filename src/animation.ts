interface OnChange {
    (value: number): void;
}

interface OnComplete {
    (): void;
}

interface Params {
    initialValue?: number;
    finalValue?: number;
    onChange?: OnChange;
    onComplete?: OnComplete;
    duration?: number;
    easingFunction?: (t: number) => number;
}

export default class Animation {
    initialValue: number;
    currentValue: number;
    finalValue: number;
    currentTime: number;
    inProgress: boolean;
    completed: boolean;
    onChange: OnChange;
    onComplete: OnComplete;
    duration: number;
    easingFunction: (t: number) => number;

    constructor({ initialValue = 0, finalValue = 0, onChange = () => {}, onComplete = () => {}, duration = 1000, easingFunction = t => 1+(--t)*t*t*t*t }: Params) {
        this.initialValue = initialValue;
        this.currentValue = initialValue;
        this.finalValue = finalValue;
        this.duration = duration;
        this.easingFunction = easingFunction;
        this.onComplete = onComplete;
        this.currentTime = 0;
        this.onChange = onChange;
        this.start = this.start.bind(this);
        this.inProgress = true;
        this.completed = false;
    }

    start() {
        this.next();
        if (!this.completed) {
            requestAnimationFrame(this.start);
        }
    }

    private next(): void {
        this.currentTime += 16/this.duration;
        this.currentValue = this.initialValue + (this.finalValue - this.initialValue) * this.easingFunction(this.currentTime);
        if (this.currentTime < 1) {
            this.onChange(this.currentValue);
        }
        else {
            this.currentValue = this.finalValue;
            this.onChange(this.currentValue);
            this.inProgress = false;
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
        this.next = () => {};
    }
}