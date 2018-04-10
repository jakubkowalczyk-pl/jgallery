import Animation from '../animation';

export default class Animations {
    private items: Animation[];

    constructor() {
        this.items = [];
    }

    add(animation: Animation): void {
        this.items.push(animation);
    }

    remove(animation: Animation): void {
        const { items } = this;
        const index = items.indexOf(animation);

        if (index > -1) {
            items.splice(index, 1);
        }
    }

    render(): void {
        this.removeCompleted();
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

    private getCompleted(): Animation[] {
        return this.items.filter(animation => animation.completed);
    }

    private removeCompleted(): void {
        this.getCompleted().forEach(animation => this.remove(animation));
    }
}