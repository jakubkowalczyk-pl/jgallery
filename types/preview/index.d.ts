import AlbumItem from '../album-item';
import Component from '../component';
export declare enum Size {
    contain = "contain",
    cover = "cover",
    auto = "auto"
}
export default class Preview extends Component {
    hasImage: boolean;
    size: Size;
    private item;
    constructor();
    setItem(item: AlbumItem): import("../utils/cancellable-promise").CancellablePromise<{}>;
    setSize(size: Size): void;
}
