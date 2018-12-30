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
    private animationFrame;
    constructor({ initialValue, finalValue, onChange, onComplete, duration, easingFunction }: Params);
    start(): void;
    pause(): void;
    setValue(value: number): void;
    reset(): void;
    goToNextFrame(): void;
    addCompleteListener(fn: Function): void;
    cancel(): void;
}
