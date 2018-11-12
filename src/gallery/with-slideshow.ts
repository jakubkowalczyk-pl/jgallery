import createElement from '../utils/create-element/index';
import {GalleryDecorator, Params} from './index';
import AlbumItem from "../album-item";
import ProgressBar from "../progress-bar";
import {iconPause, iconPlay} from "../icons";

const withSlideShow: GalleryDecorator = (constructor) =>
    class extends constructor {
        private slideShowIcons: HTMLElement;
        private playSlideshowIcon: HTMLElement;
        private pauseSlideshowIcon: HTMLElement;
        private slideShowRunning: boolean;
        private progressBar: ProgressBar;
        
        constructor(albums: AlbumItem[], params: Params) {
            super(albums, params);
            this.slideShowRunning = false;
            this.playSlideshowIcon = iconPlay();
            this.playSlideshowIcon.addEventListener('click', () => this.playSlideshow());
            this.pauseSlideshowIcon = iconPause();
            this.pauseSlideshowIcon.addEventListener('click', () => this.pauseSlideshow());
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
            [this.left, this.right].forEach(element => element.addEventListener('click', () => this.stopSlideshow()));
            this.slideShowIcons = createElement('<span/>', {
                children: [this.playSlideshowIcon]
            });
            this.appendControlsElements([
                this.slideShowIcons,
                this.progressBar.getElement(),
            ]);
            this.progressBar.getElement().style.padding = '0';
        }

        private playSlideshow() {
            if (!this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.pauseSlideshowIcon, this.playSlideshowIcon);
                this.progressBar.start();
                this.slideShowRunning = true;
            }
        }

        private pauseSlideshow() {
            if (this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.playSlideshowIcon, this.pauseSlideshowIcon);
                this.progressBar.pause();
                this.slideShowRunning = false;
            }
        }

        protected async goToAlbum(value: number) {
            this.stopSlideshow();
            return super.goToAlbum(value);
        }

        protected stopSlideshow() {
            this.pauseSlideshow();
            this.progressBar.reset();
        }
    };

export default withSlideShow;