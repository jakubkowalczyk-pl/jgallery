import Component from './component';
export interface Params {
    duration: number;
    onEnd: () => any;
    color: string;
    style?: Partial<CSSStyleDeclaration>;
}
export default class ProgressBar extends Component {
    private value;
    private animation;
    private duration;
    private onEnd;
    constructor({ duration, onEnd, color, style }: Params);
    start(): void;
    pause(): void;
    reset(): void;
    setValue(value: number): void;
}
