import {Gallery} from './index';
import {iconScreen} from "../icons";

export default <T extends {new(...args:any[]):Gallery}>(constructor: T) =>
    class extends constructor {
        private changePreviewSizeIcon: HTMLElement;

        constructor(...args: any[]) {
            super(...args);
            this.changePreviewSizeIcon = iconScreen();
            this.changePreviewSizeIcon.addEventListener('click', () => this.changePreviewSize());
            this.appendControlsElements([this.changePreviewSizeIcon]);
        }

        protected async goToItem(...args: any[]) {
            const result = super.goToItem.call(this, ...args);

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