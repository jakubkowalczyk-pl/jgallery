import createElement from '../utils/create-element/index';
import {GalleryDecorator} from './index';
import Params from './parameters';
import AlbumItem from "../album-item";
import ProgressBar from "../progress-bar";
import {iconPause, iconPlay} from "../icons";
import withTooltip from "../utils/with-tooltip";

const withSlideShow: GalleryDecorator = (constructor) =>
    class extends constructor {
        private slideShowIcons: HTMLElement;
        private playSlideShowIcon: HTMLElement;
        private pauseSlideShowIcon: HTMLElement;
        private slideShowRunning: boolean;
        private progressBar: ProgressBar;

        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            this.slideShowRunning = false;
            this.playSlideShowIcon = withTooltip(iconPlay({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipSlideShowStart,
            });
            this.playSlideShowIcon.addEventListener('click', () => this.playSlideShow());
            this.pauseSlideShowIcon = withTooltip(iconPause({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipSlideShowPause,
            });
            this.pauseSlideShowIcon.addEventListener('click', () => this.pauseSlideShow());
            this.progressBar = new ProgressBar({
                duration: params.slideShowInterval,
                color: params.textColor,
                onEnd: async () => {
                    this.progressBar.pause();
                    this.progressBar.setValue(0);
                    await this.next();
                    this.progressBar.reset();
                    if (this.slideShowRunning) {
                        this.progressBar.start();
                    }
                },
                style: {
                    position: 'absolute',
                    top: '2px',
                    left: '0',
                    right: '0',
                },
            });
            this.preview.onClick(() => this.stopSlideShow());
            this.slideShowIcons = createElement('<span class="j-gallery-slide-show-icon"/>', {
                children: [this.playSlideShowIcon]
            });
            this.appendControlsElements([
                this.slideShowIcons,
                this.progressBar.getElement(),
            ]);
            this.progressBar.getElement().style.margin = '0';
        }

        protected initialize() {
            super.initialize();
            if (this.params.slideShowAutoStart) {
                this.playSlideShow();
            }
        }

        private playSlideShow() {
            if (!this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.pauseSlideShowIcon, this.playSlideShowIcon);
                this.progressBar.start();
                this.slideShowRunning = true;
            }
        }

        private pauseSlideShow() {
            if (this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.playSlideShowIcon, this.pauseSlideShowIcon);
                this.progressBar.pause();
                this.slideShowRunning = false;
            }
        }

        protected async goToAlbum(arg: any, ...args: any[]) {
            this.stopSlideShow();
            return super.goToAlbum(arg, ...args);
        }

        protected stopSlideShow() {
            this.pauseSlideShow();
            this.progressBar.reset();
        }
    };

export default withSlideShow;