import AlbumItem from '../album-item';
import Component from '../component';
export declare enum Size {
    contain = "contain",
    cover = "cover",
    auto = "auto"
}
export interface Params {
    onSwipeLeft?: Function;
    onSwipeRight?: Function;
    leftOnClick?: Function;
    rightOnClick?: Function;
    canDrag?: boolean;
}
export default class Preview extends Component {
    hasImage: boolean;
    size: Size;
    private item;
    private moveDistance;
    private dragListener;
    private swipeListener;
    private canDrag;
    private content;
    private left;
    private right;
    private title;
    constructor(params?: Params);
    setItem(item: AlbumItem): import("../utils/cancellable-promise").CancellablePromise<{}>;
    setSize(size: Size): void;
    onClick(fn: Function): void;
    private manageDraggingMode;
    private activateDragging;
    private deactivateDragging;
    private move;
    private activateClickableArea;
    private deactivateClickableArea;
}
