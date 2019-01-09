import AlbumItem from '../album-item';
import Component from '../component';
import Point from '../point';
export declare enum Size {
    contain = "contain",
    cover = "cover",
    auto = "auto"
}
export default class Preview extends Component {
    hasImage: boolean;
    size: Size;
    private item;
    private moveDistance;
    constructor();
    setItem(item: AlbumItem): import("../utils/cancellable-promise").CancellablePromise<{}>;
    setSize(size: Size): void;
    move(move: Point): void;
}
