import AlbumItem from '../album-item';
import Component from '../component';
export declare type Size = 'contain' | 'cover' | 'auto';
export default class Preview extends Component {
    hasImage: boolean;
    size: Size;
    private item;
    constructor();
    setItem(item: AlbumItem): import("../utils/cancellable-promise").CancellablePromise<{}>;
    setSize(size: Size): void;
}
