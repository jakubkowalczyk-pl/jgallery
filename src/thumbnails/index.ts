import createElement from '../utils/create-element/index'
import Component from '../component';
import Animation from '../animation';
import Album from '../album';
import AlbumItem from '../album-item';
import Thumbnail, {ThumbOnClick} from './thumbnail/index';

export interface Params {
    textColor: string;
    thumbnailWidth: string;
    thumbnailHeight: string;
    thumbOnClick: ThumbOnClick
}

export default class Thumbnails extends Component {
    private album: Album;
    private items: Array<Thumbnail>;
    private item: Thumbnail;
    private thumbOnClick: ThumbOnClick;
    private content: HTMLElement;
    private scrollAnimations: Array<Animation>;
    private textColor: string;
    private thumbnailWidth: string;
    private thumbnailHeight: string;

    constructor({ thumbOnClick = () => {}, textColor, thumbnailWidth, thumbnailHeight }: Params) {
        super();
        this.textColor = textColor;
        this.thumbnailWidth = thumbnailWidth;
        this.thumbnailHeight = thumbnailHeight;
        this.scrollAnimations = [];
        this.element = createElement('<div class="j-gallery-thumbnails"></div>', {
            style: {
                display: 'flex',
                overflow: 'auto',
            }
        });
        this.content = createElement('<div class="j-gallery-thumbnails-content"></div>', {
            style: {
                margin: '0 auto',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
            }
        });
        this.element.appendChild(this.content);
        this.thumbOnClick = thumbOnClick;
    }

    setAlbum(album: Album) {
        this.album = album;
        this.items = album.items.map((item: AlbumItem) => new Thumbnail({
            item,
            textColor: this.textColor,
            width: this.thumbnailWidth,
            height: this.thumbnailHeight,
            onClick: item => this.thumbOnClick(item),
        }));
        this.content.innerHTML = '';
        this.items.forEach((item: Thumbnail) => {
            this.content.appendChild(item.getElement());
        });
    }

    setActive(index: number) {
        this.item && this.item.appendStyle({ border: 'none' });
        this.item = this.items[index];
        this.item.appendStyle({ border: `2px solid ${this.textColor}` });
        this.scrollToActiveItem();
    }

    setThumbnailSize({ width, height }: { width: string; height: string }) {
        this.items.forEach(thumbnail => thumbnail.setSize({ width, height }));
    }

    enableWrap() {
        this.content.style.flexWrap = 'wrap';
        this.scrollToActiveItem();
    }

    disableWrap() {
        this.content.style.flexWrap = 'initial';
        this.scrollToActiveItem();
    }

    setContentStyle(style: Partial<CSSStyleDeclaration>) {
        Object.assign(this.content.style, style);
    }

    scrollToActiveItem() {
        const element = this.item.getElement();

        this.scrollAnimations.forEach(animation => animation.cancel());
        this.scrollAnimations = [
            new Animation({
                initialValue: this.element.scrollLeft,
                finalValue: element.offsetLeft + element.clientWidth/2 - this.element.clientWidth/2,
                onChange: value => this.element.scrollLeft = value,
            }),
            new Animation({
                initialValue: this.element.scrollTop,
                finalValue: element.offsetTop + element.clientHeight/2 - this.element.clientHeight/2,
                onChange: value => this.element.scrollTop = value,
            }),
        ];
        this.scrollAnimations.forEach(animation => animation.start());
    }
}