import createElement from '../utils/create-element/index';
import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";
import ProgressBar from "../progress-bar";
import {iconPause, iconPlay} from "../icons";

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
            this.playSlideShowIcon = iconPlay();
            this.playSlideShowIcon.addEventListener('click', () => this.playSlideShow());
            this.pauseSlideShowIcon = iconPause();
            this.pauseSlideShowIcon.addEventListener('click', () => this.pauseSlideShow());
            this.progressBar = new ProgressBar({
                duration: 4000,
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
            [this.left, this.right].forEach(element => element.addEventListener('click', () => this.stopSlideShow()));
            this.slideShowIcons = createElement('<span/>', {
                children: [this.playSlideShowIcon]
            });
            this.appendControlsElements([
                this.slideShowIcons,
                this.progressBar.getElement(),
            ]);
            this.progressBar.getElement().style.padding = '0';
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

        protected async goToAlbum(value: number) {
            this.stopSlideShow();
            return super.goToAlbum(value);
        }

        protected stopSlideShow() {
            this.pauseSlideShow();
            this.progressBar.reset();
        }
    };

export default withSlideShow;