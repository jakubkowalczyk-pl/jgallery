import { EasingFunction } from './animation';
import Canvas from './canvas/index';
export interface Params {
    backgroundColor?: string;
    reverse?: boolean;
    duration?: number;
    details?: number;
    originX?: number;
    originY?: number;
    xAxis?: boolean;
    yAxis?: boolean;
    easingFunction?: EasingFunction;
    opacity?: boolean;
    animateSliceWidth?: boolean;
    animateSliceHeight?: boolean;
}
declare const transitionEffect: (canvas: Canvas, params?: Params) => import("./utils/cancellable-promise").CancellablePromise<{}>;
export default transitionEffect;
