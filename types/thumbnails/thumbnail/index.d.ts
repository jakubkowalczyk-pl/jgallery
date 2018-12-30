import Component from '../../component';
import AlbumItem from '../../album-item';
export interface ThumbOnClick {
    (item: AlbumItem): void;
}
export interface Params {
    item: AlbumItem;
    textColor: string;
    onClick: ThumbOnClick;
    width: string;
    height: string;
}
export default class Thumbnail extends Component {
    constructor({ item, onClick, textColor, width, height }: Params);
    setSize({ width, height }: {
        width: string;
        height: string;
    }): void;
}
