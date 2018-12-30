import Animation from './animation';

export interface OnChange {
    (): any;
}

export interface Params {
    onChange: OnChange
}

export default class Animations {
    private items: Animation[];
    private onChange: OnChange;
    private rendering: boolean;

    constructor({ onChange }: Params) {
        this.items = [];
        this.onChange = onChange;
        this.goToNextFrames = this.goToNextFrames.bind(this);
    }

    play(): void {
        if (!this.rendering) {
            this.goToNextFrames();
        }
    }

    add(animations: Animation[]): void {
        this.items.push(...animations)
        this.play();
    }

    remove(animation: Animation): void {
        const { items } = this;
        const index = items.indexOf(animation);

        if (index > -1) {
            items.splice(index, 1);
        }
    }

    count(): number {
        return this.items.length;
    }

    cancelAll(): void {
        this.items.forEach(animation => animation.cancel());
    }

    clear(): void {
        this.items.length = 0;
    }

    private goToNextFrames(): void {
        this.rendering = true;
        this.items.forEach(animation => animation.goToNextFrame());
        this.onChange();
        this.removeCompleted();
        if (this.count()) {
            requestAnimationFrame(this.goToNextFrames);
        }
        else {
            this.rendering = false;
        }
    }

    private getCompleted(): Animation[] {
        return this.items.filter(animation => animation.completed);
    }

    private removeCompleted(): void {
        this.getCompleted().forEach(animation => this.remove(animation));
    }
}