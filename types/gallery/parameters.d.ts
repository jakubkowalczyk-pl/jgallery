import Album from '../album';
import AlbumItem from '../album-item';
import { Size } from '../preview';
import { ThumbnailsPosition } from "./with-thumbnails";
import { GalleryDecorator } from './index';
export default interface Params {
    autoStartAtAlbum?: number;
    autoStartAtItem?: number;
    backgroundColor?: string;
    browserHistory?: boolean;
    canMinimizeThumbnails?: boolean;
    canChangePreviewSize?: boolean;
    decorators?: GalleryDecorator[];
    itemOnHide?: (p: {
        album: Album;
        item: AlbumItem;
    }) => any;
    itemOnLoad?: (p: {
        album: Album;
        item: AlbumItem;
    }) => any;
    itemOnShow?: (p: {
        album: Album;
        item: AlbumItem;
    }) => any;
    navigationOnPreviewClick?: boolean;
    onChange?: (p: {
        album: Album;
        item: AlbumItem;
        prevItem: AlbumItem;
    }) => any;
    previewDraggable?: boolean;
    previewSize?: Size;
    slideShow?: boolean;
    slideShowAutoStart?: boolean;
    slideShowInterval?: number;
    textColor?: string;
    thumbnailHeight?: string;
    thumbnailHeightOnFullScreen?: string;
    thumbnailWidth?: string;
    thumbnailWidthOnFullScreen?: string;
    thumbnails?: boolean;
    thumbnailsFullScreen?: boolean;
    thumbnailsPosition?: ThumbnailsPosition;
    thumbnailsVisible?: boolean;
    tooltipChangeSize?: string;
    tooltipSeeAllItems?: string;
    tooltipSeeOtherAlbums?: string;
    tooltipSlideShowPause?: string;
    tooltipSlideShowStart?: string;
    tooltipThumbnailsToggle?: string;
    transitionAnimateSliceHeight?: boolean;
    transitionAnimateSliceWidth?: boolean;
    transitionDetails?: number;
    transitionDuration?: number;
    transitionOpacity?: boolean;
    transitionOriginX?: number;
    transitionOriginY?: number;
    transitionXAxis?: boolean;
    transitionYAxis?: boolean;
    transitionEasingFunction?: (time: number) => number;
}
