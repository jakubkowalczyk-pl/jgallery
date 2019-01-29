import {touchSupport} from '../environment';
import createElement from './create-element';

export interface Params {
    content: string;
    style?: Partial<CSSStyleDeclaration>;
}

const withTooltip = touchSupport ?
    <T extends HTMLElement>(element: T, params: Params): T => element :
    <T extends HTMLElement>(element: T, params: Params): T => {
        params = {content: '', style: {}, ...params};

        const tooltip = createElement(`<span class="j-gallery-tooltip">${params.content}</span>`, {
            style: {
                padding: '.3em .6em',
                left: '0',
                bottom: '100%',
                opacity: '.85',
                fontSize: '.85em',
                whiteSpace: 'pre',
                position: 'absolute',
                display: 'none',
                ...params.style,
            },
        });

        element.style.position = 'relative';
        element.appendChild(tooltip);
        element.addEventListener('mouseenter', () => tooltip.style.display = 'block');
        element.addEventListener('mouseleave', () => tooltip.style.display = 'none');

        return element;
    };

export default withTooltip;