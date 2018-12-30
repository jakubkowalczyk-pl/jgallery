import Component from '../component';
import Album from '../album';
import { ThumbOnClick } from './thumbnail/index';
export interface Params {
    textColor: string;
    thumbnailWidth: string;
    thumbnailHeight: string;
    thumbOnClick: ThumbOnClick;
}
export default class Thumbnails extends Component {
    private album;
    private items;
    private item;
    private thumbOnClick;
    private content;
    private scrollAnimations;
    private textColor;
    private thumbnailWidth;
    private thumbnailHeight;
    constructor({ thumbOnClick, textColor, thumbnailWidth, thumbnailHeight }: Params);
    setAlbum(album: Album): void;
    setActive(index: number): void;
    setThumbnailSize({ width, height }: {
        width: string;
        height: string;
    }): void;
    enableWrap(): void;
    disableWrap(): void;
    setContentStyle(style: Partial<CSSStyleDeclaration>): void;
    scrollToActiveItem(): void;
}
