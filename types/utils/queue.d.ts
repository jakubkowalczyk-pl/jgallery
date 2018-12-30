import { CancellablePromise } from './cancellable-promise';
export interface Task {
    (): CancellablePromise<any>;
}
export default class Queue {
    private tasks;
    private currentProcess;
    constructor(...tasks: Task[]);
    run(): void;
    cancel(): void;
}
