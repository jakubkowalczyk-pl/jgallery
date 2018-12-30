export interface Resolve<T> {
    (value?: T | PromiseLike<T>): void;
}

export interface Reject {
    (reason?: any): void;
}

export interface OnCancel {
    (fn: Function): any;
}

export interface Executor<T> {
    (resolve: Resolve<T>, reject: Reject, onCancel: OnCancel): any;
}

export type CancellablePromise<T> = Promise<T> & { cancel?: () => any };

const cancellablePromise = <T>(executor: Executor<T>): CancellablePromise<T> => {
    const cancelListeners: Array<() => any> = [];
    let cancel: () => any;
    const onCancel = (listener: () => any) => cancelListeners.push(listener);
    const promise: CancellablePromise<T> = new Promise((resolve, reject) => {
        executor(resolve, reject, onCancel);
        cancel = () => {
            resolve();
            cancelListeners.forEach(fn => fn());
        };
    });

    promise.cancel = cancel;

    return promise;
};

export default cancellablePromise;