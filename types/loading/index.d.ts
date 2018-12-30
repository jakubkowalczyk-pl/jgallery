import Component from '../component';
export interface Params {
    color: string;
    style?: Partial<CSSStyleDeclaration>;
}
export default class Loading extends Component {
    constructor(params?: Params);
}
