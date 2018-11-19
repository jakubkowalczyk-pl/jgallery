import {GalleryDecorator, Params} from './index';
import {iconScreen} from "../icons";
import AlbumItem from "../album-item";

const withPreviewSizeChanger: GalleryDecorator = (constructor) =>
    class extends constructor {
        private changePreviewSizeIcon: HTMLElement;

        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            this.changePreviewSizeIcon = iconScreen({ color: params.textColor });
            this.changePreviewSizeIcon.addEventListener('click', () => this.changePreviewSize());
            this.appendControlsElements([this.changePreviewSizeIcon]);
        }

        protected async goToItem(...args: any[]) {
            const result = await super.goToItem.call(this, ...args);

            this.changePreviewSizeIcon.style.display = this.preview.hasImage ? 'inline-flex' : 'none';

            return result;
        }

        private changePreviewSize() {
            const { preview } = this;

            switch (preview.size) {
                case 'cover':
                    preview.setSize('auto');
                    break;
                case 'auto':
                    preview.setSize('contain');
                    break;
                default:
                    preview.setSize('cover');
            }
        }
    };

export default withPreviewSizeChanger;