import AlbumItem from '../album-item';
import Component from '../component';
export declare enum Size {
    CONTAIN = "CONTAIN",
    COVER = "COVER",
    AUTO = "AUTO"
}
export default class Preview extends Component {
    hasImage: boolean;
    size: Size;
    private item;
    constructor();
    setItem(item: AlbumItem): import("../utils/cancellable-promise").CancellablePromise<{}>;
    setSize(size: Size): void;
}
