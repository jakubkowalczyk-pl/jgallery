import {GalleryDecorator} from './index';
import Params from './parameters';
import AlbumItem from "../album-item";
import Thumbnails from "../thumbnails/index";
import {iconEllipsisHorizontal, iconGrid} from "../icons";
import withTooltip from "../utils/with-tooltip";

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
                thumbnailWidth: params.thumbnailWidth,
                thumbnailHeight: params.thumbnailHeight,
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
                paddingLeft: this.params.thumbnailsPosition === 'right' ? '10px' : '0',
                paddingRight: this.params.thumbnailsPosition === 'left' ? '10px' : '0',
            });
            this.thumbnails.setAlbum(this.album);
            this.toggleThumbnailsIcon = withTooltip(iconEllipsisHorizontal({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipThumbnailsToggle,
            });
            this.toggleThumbnailsIcon.addEventListener('click', () => this.toggleThumbnails());
            this.toggleFullScreenThumbnailsIcon = withTooltip(iconGrid({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-4px)',
                },
                content: params.tooltipSeeAllItems,
            });
            this.toggleFullScreenThumbnailsIcon.addEventListener('click', () => this.toggleFullScreenThumbnails());
            if (this.params.thumbnailsFullScreen) {
                this.appendControlsElements([this.toggleFullScreenThumbnailsIcon]);
            }
            if (this.params.canMinimizeThumbnails) {
                this.appendControlsElements([
                    this.toggleThumbnailsIcon,
                ]);
            }
        }

        protected initialize() {
            super.initialize();
            if (this.params.thumbnailsVisible) {
                this.showThumbnails();
            }
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.element.style.flexDirection = 'row';
                this.thumbnails.setContentStyle({
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                });
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
            this.thumbnails.setThumbnailSize({
                width: this.params.thumbnailWidth,
                height: this.params.thumbnailHeight,
            });
            this.previewElement.style.display = 'flex';
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.thumbnails.setContentStyle({
                    flexDirection: ['left', 'right'].includes(this.params.thumbnailsPosition) ? 'column' : 'row',
                });
                this.thumbnails.getElement().style.flexBasis = 'auto';
            }
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
            this.thumbnails.setThumbnailSize({
                width: this.params.thumbnailWidthOnFullScreen,
                height: this.params.thumbnailHeightOnFullScreen,
            });
            this.previewElement.style.display = 'none';
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.thumbnails.getElement().style.flexBasis = '100%';
                this.thumbnails.setContentStyle({
                    flexDirection: 'row',
                });
            }
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
            switch (this.params.thumbnailsPosition) {
                case 'top':
                case 'left':
                    this.element.insertBefore(
                        this.thumbnails.getElement(),
                        this.element.firstChild,
                    );
                    break;
                default:
                    this.element.appendChild(this.thumbnails.getElement());
            }
            this.thumbnails.scrollToActiveItem();
        }
    };

export type ThumbnailsPosition = 'top' | 'bottom' | 'left' | 'right';

export default withThumbnails;