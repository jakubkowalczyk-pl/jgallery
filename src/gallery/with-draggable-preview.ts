import {GalleryDecorator} from './index';
import Params from './parameters';
import DragListener from '../drag-listener';
import AlbumItem from "../album-item";

const withDraggablePreview: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            (new DragListener({
                element: this.previewElement,
                onMove: ({ move }) => this.preview.move(move),
            })).activate();
        }
    };

export default withDraggablePreview;