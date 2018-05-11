import createElement from './utils/create-element/index';

const defaultIconStyle: Partial<CSSStyleDeclaration> = {
    display: 'inline-flex',
    cursor: 'pointer',
    width: '1em',
    height: '1em',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'center',
};

const dot = (style: Partial<CSSStyleDeclaration> = {}) => createElement(
    `<span style="width: 1em; height: 1em; display: inline-block; background: #fff; margin: 1px"></span>`,
    { style }
);

export const iconEllipsisHorizontal = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' })]
});

export const iconGrid = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        height: 'auto',
        flexWrap: 'wrap',
        ...style,
    },
    children: [
        dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }),
        dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }),
        dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }), dot({ fontSize: '.2em' }),
    ]
});
