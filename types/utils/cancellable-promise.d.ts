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
export declare type CancellablePromise<T> = Promise<T> & {
    cancel?: () => any;
};
declare const cancellablePromise: <T>(executor: Executor<T>) => CancellablePromise<T>;
export default cancellablePromise;
