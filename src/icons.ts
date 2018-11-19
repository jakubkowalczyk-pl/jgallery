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
    `<span style="width: 4px; height: 4px; display: inline-block; margin: 1px"></span>`,
    { style }
);

export const iconPlay = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [createElement(`<span></span>`, {
        style: {
            border: 'solid',
            borderColor: `transparent transparent transparent ${color}`,
            borderWidth: '.4em 0 .4em .7em',
        }
    })]
});

export const iconScreen = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [createElement(`<span></span>`, {
        style: {
            width: '1em',
            height: '.8em',
            border: `solid ${color}`,
            borderWidth: '.2em .1em',
            boxSizing: 'border-box',
        }
    })]
});

export const iconEllipsisHorizontal = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [dot({background: color}), dot({background: color}), dot({background: color})]
});

export const iconPause = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span></span>`, {
    style: {
        ...defaultIconStyle,
        justifyContent: 'space-between',
        ...style,
    },
    children: [dot({ width: '.35em', height: '.9em', background: color }), dot({ width: '.35em', height: '.9em', background: color })]
});

export const iconGrid = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => {
    return createElement(`<span></span>`, {
        style: {
            ...defaultIconStyle,
            height: 'auto',
            flexWrap: 'wrap',
            ...style,
        },
        children: [
            dot({background: color}), dot({background: color}), dot({background: color}),
            dot({background: color}), dot({background: color}), dot({background: color}),
            dot({background: color}), dot({background: color}), dot({background: color}),
        ]
    });
};
