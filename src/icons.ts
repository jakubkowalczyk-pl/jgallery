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
    `<span style="width: 4px; height: 4px; display: inline-block; background: #fff; margin: 1px"></span>`,
    { style }
);

export const iconPlay = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [createElement(`<span></span>`, {
        style: {
            border: 'solid',
            borderColor: 'transparent transparent transparent #fff',
            borderWidth: '.4em 0 .4em .7em',
        }
    })]
});

export const iconScreen = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [createElement(`<span></span>`, {
        style: {
            width: '1em',
            height: '.8em',
            border: 'solid #fff',
            borderWidth: '.2em .1em',
            boxSizing: 'border-box',
        }
    })]
});

export const iconEllipsisHorizontal = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [dot(), dot(), dot()]
});

export const iconPause = (style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        justifyContent: 'space-between',
        ...style,
    },
    children: [dot({ width: '.35em', height: '.9em' }), dot({ width: '.35em', height: '.9em' })]
});

export const iconGrid = (style: Partial<CSSStyleDeclaration> =  {}) => {
    return createElement(`<span></span>`, {
        style: {
            ...defaultIconStyle,
            height: 'auto',
            flexWrap: 'wrap',
            ...style,
        },
        children: [
            dot(), dot(), dot(),
            dot(), dot(), dot(),
            dot(), dot(), dot(),
        ]
    });
};
