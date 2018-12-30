import Animation from './animation';
export interface OnChange {
    (): any;
}
export interface Params {
    onChange: OnChange;
}
export default class Animations {
    private items;
    private onChange;
    private rendering;
    constructor({ onChange }: Params);
    play(): void;
    add(animations: Animation[]): void;
    remove(animation: Animation): void;
    count(): number;
    cancelAll(): void;
    clear(): void;
    private goToNextFrames;
    private getCompleted;
    private removeCompleted;
}
