import createElement from './utils/create-element/index';

const defaultIconStyle: Partial<CSSStyleDeclaration> = {
    display: 'inline-flex',
    cursor: 'pointer',
    width: '32px',
    height: '24px',
    verticalAlign: 'middle',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'center',
};

const dot = (style: Partial<CSSStyleDeclaration> = {}) => createElement(
    `<span class="j-gallery-dot-icon" style="width: 4px; height: 4px; display: inline-block; margin: 1px"></span>`,
    { style }
);

export const iconPlay = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span class="j-gallery-play-icon"></span>`, {
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

export const iconScreen = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span class="j-gallery-screen-icon"></span>`, {
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

export const iconEllipsisHorizontal = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span class="j-gallery-ellipsis-horizontal-icon"></span>`, {
    style: {
        ...defaultIconStyle,
        ...style,
    },
    children: [dot({background: color}), dot({background: color}), dot({background: color})]
});

export const iconPause = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => createElement(`<span class="j-gallery-pause-icon"></span>`, {
    style: {
        ...defaultIconStyle,
        justifyContent: 'center',
        ...style,
    },
    children: [dot({ width: '.35em', height: '.9em', background: color }), dot({ width: '.35em', height: '.9em', background: color })]
});

export const iconGrid = ({color}:{color:string}, style: Partial<CSSStyleDeclaration> =  {}) => {
    return createElement(`<span class="j-gallery-grid-icon"></span>`, {
        style: {
            ...defaultIconStyle,
            height: 'auto',
            flexWrap: 'wrap',
            padding: '7px',
            ...style,
        },
        children: [
            dot({background: color}), dot({background: color}), dot({background: color}),
            dot({background: color}), dot({background: color}), dot({background: color}),
            dot({background: color}), dot({background: color}), dot({background: color}),
        ]
    });
};
