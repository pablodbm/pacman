import {Board} from './Board';
import {Element} from './Element';

const pointImage = new Image();
pointImage.src = './assets/point.png';

export class Point extends Element {
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        super(x, y, ctx, pointImage, 28, 28);
    }
}
