import {CancellablePromise} from './cancellable-promise';

export interface Task {
    (): CancellablePromise<any>;
}

export default class Queue {
    private tasks: Task[];
    private currentProcess: CancellablePromise<any>;

    constructor(...tasks: Task[]) {
        this.tasks = [...tasks];
        this.run = this.run.bind(this);
    }

    run() {
        const task = this.tasks.shift();

        if (task) {
            this.currentProcess = task();
            this.currentProcess.then(this.run);
        }
        else {
            this.currentProcess = null;
        }
    }

    cancel() {
        this.tasks.length = 0;
        this.currentProcess && this.currentProcess.cancel && this.currentProcess.cancel();
    }
}