import createElement from '../utils/create-element/index';
import Component from '../component';

interface Params {
    style?: Partial<CSSStyleDeclaration>;
}

export default class Loading extends Component {
    constructor(params: Params = {}) {
        super();
        params = { style: {}, ...params };
        this.element = createElement(`
            <span style="display: inline-flex">
            </span>
        `, {
            style: params.style,
            children: [
                item({ animationDelay: '-.375s' }),
                item({ animationDelay: '-.250s' }),
                item({ animationDelay: '-.125s' }),
                item(),
                item(),
                item({ animationDelay: '-.125s' }),
                item({ animationDelay: '-.250s' }),
                item({ animationDelay: '-.375s' }),
            ],
        });
    }
}

const item = (style: Partial<CSSStyleDeclaration> = {}) => {
    return createElement(`<span/>`, {
        style: {
            width: '1em',
            height: '1em',
            background: '#fff',
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