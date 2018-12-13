import {GalleryDecorator} from './index';
import Params from './parameters';
import AlbumItem from "../album-item";
import createElement from "../utils/create-element";

const withNavigationOnPreviewClick: GalleryDecorator = (constructor) =>
    class extends constructor {
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            this.left = createElement(`
                <div class="j-gallery-left" style="left: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
            `);
            this.left.addEventListener('click', () => {
                this.prev();
            });
            this.right = createElement(`
                <div class="j-gallery-right" style="right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;"></div>
            `);
            this.right.addEventListener('click', () => {
                this.next();
            });
            this.previewElement.appendChild(this.left);
            this.previewElement.appendChild(this.right);
        }
    };

export default withNavigationOnPreviewClick;