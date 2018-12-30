import createElement from '../utils/create-element/index';
import Component from '../component';

export interface Params {
    color: string;
    style?: Partial<CSSStyleDeclaration>;
}

export default class Loading extends Component {
    constructor(params: Params = { color: '#fff' }) {
        super();
        params = { style: {}, ...params };

        const { color } = params;

        this.element = createElement(`
            <span class="j-gallery-loading" style="display: inline-flex">
            </span>
        `, {
            style: params.style,
            children: [
                item({ animationDelay: '-.375s', background: color }),
                item({ animationDelay: '-.250s', background: color }),
                item({ animationDelay: '-.125s', background: color }),
                item({ background: color }),
                item({ background: color }),
                item({ animationDelay: '-.125s', background: color }),
                item({ animationDelay: '-.250s', background: color }),
                item({ animationDelay: '-.375s', background: color }),
            ],
        });
    }
}

const item = (style: Partial<CSSStyleDeclaration> = {}) => {
    return createElement(`<span/>`, {
        style: {
            width: '1em',
            height: '1em',
            animation: 'jGalleryLoading .5s linear infinite alternate',
            display: 'inline-block',
            ...style,
        },
    });
};

const style = document.createElement('style');

style.innerHTML = `
    @keyframes jGalleryLoading {
        0% {
            transform: scaleX(0);
            opacity: 1;
        }

        100% {
            transform: scaleX(1);
            opacity: 1;
        }
    }
`;
if (typeof document !== 'undefined') {
    document.querySelector('head').appendChild(style);
}