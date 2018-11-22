import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";
import Thumbnails from "../thumbnails/index";
import {iconEllipsisHorizontal, iconGrid} from "../icons";

const withThumbnails: GalleryDecorator = (constructor) =>
    class extends constructor {
        protected thumbnails: Thumbnails;
        private toggleThumbnailsIcon: HTMLElement;
        private toggleFullScreenThumbnailsIcon: HTMLElement;
        private thumbnailsVisible: boolean;
        private fullScreenThumbnails: boolean;
        private stopSlideShow: Function | undefined;

        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);

            this.thumbnailsVisible = true;
            this.thumbnails = new Thumbnails({
                textColor: params.textColor,
                thumbOnClick: item => {
                    if (this.stopSlideShow) {
                        this.stopSlideShow();
                    }
                    if (this.fullScreenThumbnails) {
                        this.disableFullScreenThumbnails();
                    }
                    this.goToItem(item);
                }
            });
            this.thumbnails.appendStyle({
                position: 'relative',
                zIndex: '1',
            });
            this.thumbnails.setAlbum(this.album);
            this.toggleThumbnailsIcon = iconEllipsisHorizontal({ color: params.textColor });
            this.toggleThumbnailsIcon.addEventListener('click', () => this.toggleThumbnails());
            this.toggleFullScreenThumbnailsIcon = iconGrid({ color: params.textColor });
            this.toggleFullScreenThumbnailsIcon.addEventListener('click', () => this.toggleFullScreenThumbnails());
            this.appendControlsElements([this.toggleFullScreenThumbnailsIcon]);
            if (this.params.canMinimalizeThumbnails) {
                this.appendControlsElements([
                    this.toggleThumbnailsIcon,
                ]);
            }
            if (this.params.thumbnailsVisible) {
                this.element.appendChild(this.thumbnails.getElement());
            }
        }

        protected async goToItem(item: AlbumItem) {
            this.thumbnails.setActive(this.album.items.indexOf(item));

            return super.goToItem(item);
        }

        protected async goToAlbum(value: number, ...args: any[]) {
            this.thumbnails.setAlbum(this.albums[value]);

            return super.goToAlbum(value, ...args);
        }

        private disableFullScreenThumbnails() {
            this.fullScreenThumbnails = false;
            this.thumbnails.disableWrap();
        }

        private toggleFullScreenThumbnails() {
            this.fullScreenThumbnails ? this.disableFullScreenThumbnails() : this.enableFullScreenThumbnails();
        }

        protected enableFullScreenThumbnails() {
            if (this.stopSlideShow) {
                this.stopSlideShow();
            }
            this.fullScreenThumbnails = true;
            this.showThumbnails();
            this.thumbnails.enableWrap();
        }

        private hideThumbnails() {
            this.thumbnailsVisible = false;
            this.element.removeChild(this.thumbnails.getElement());
            this.disableFullScreenThumbnails();
        }

        private toggleThumbnails() {
            this.thumbnailsVisible ? this.hideThumbnails() : this.showThumbnails();
        }

        private showThumbnails() {
            this.thumbnailsVisible = true;
            this.element.appendChild(this.thumbnails.getElement());
            this.thumbnails.scrollToActiveItem();
        }
    };

export default withThumbnails;