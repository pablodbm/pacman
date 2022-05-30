import {Board} from './Board';
import {Directions, Element} from './Element';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const pacManOpenRightImg = new Image();
pacManOpenRightImg.src = './assets/pacmanRight-open.png';

const pacManOpenLeftImg = new Image();
pacManOpenLeftImg.src = './assets/pacmanLeft-open.png';

const pacManOpenBottomImg = new Image();
pacManOpenBottomImg.src = './assets/pacmanBottom-open.png';

const pacManOpenTopImg = new Image();
pacManOpenTopImg.src = './assets/pacmanTop-open.png';

const pacManCloseRightImg = new Image();
pacManCloseRightImg.src = './assets/pacmanRight-close.png';

const pacManCloseBottomImg = new Image();
pacManCloseBottomImg.src = './assets/pacmanBottom-close.png';

const pacManCloseTopImg = new Image();
pacManCloseTopImg.src = './assets/pacmanTop-close.png';

const pacManCloseLeftImg = new Image();
pacManCloseLeftImg.src = './assets/pacmanLeft-close.png';

let points = [
    // [24, 24],
    [24, 48],
    [24, 72],
    [24, 96],
    [24, 116],
    [24, 136],
    // [48, 24],
    // [72, 24],
    // [96, 24],
    // [120, 24],
    // [144, 24],
    // [168, 24],
    // [192, 24],
    // [64, 88],
    // [100, 48],
    // [100, 88],
    // [64, 140],
    // [100, 140],
    // [140, 88],
    // [164, 88],
    // [188, 88],
    // [212, 88],
    // [236, 88],
    // [260, 88],
    // [284, 88],
    // [308, 88],
    // [332, 88],
    // [356, 88],
    // [380, 88],
    // [404, 88],
    // [424, 88],
    // [100, 164],
    // [100, 188],
    // [100, 212],
    // [100, 236],
    // [100, 260],
    // [100, 284],
    // [100, 308],
    // [100, 332],
    // [100, 356],
    // [100, 380],
    // [100, 404],
    // [100, 424],
    // [72, 328],
    // [48, 328],
    // [24, 328],
    // [24, 352],
    // [24, 376],
    // [56, 376],
    // [56, 400],
    // [56, 424],
    // [80, 424],
    // [24, 424],
    // [24, 448],
    // [24, 472],
    // [48, 472],
    // [72, 472],
    // [96, 472],
    // [120, 472],
    // [144, 472],
    // [168, 472],
    // [192, 472],
    // [216, 472],
    // [240, 472],
    // [264, 472],
    // [288, 472],
    // [312, 472],
    // [336, 472],
    // [360, 472],
    // [384, 472],
    // [408, 472],
    // [428, 472],
    // [428, 448],
    // [428, 424],
    // [408, 424],
    // [384, 424],
    // [360, 424],
    // [396, 396],
    // [396, 372],
    // [424, 372],
    // [424, 332],
    // [344, 112],
    // [344, 136],
    // [344, 160],
    // [344, 184],
    // [344, 208],
    // [344, 232],
    // [344, 256],
    // [344, 280],
    // [344, 304],
    // [344, 328],
    // [344, 352],
    // [344, 376],
    // [320, 376],
    // [296, 376],
    // [272, 376],
    // [248, 376],
    // [224, 376],
    // [200, 376],
    // [176, 376],
    // [152, 376],
    // [128, 376],
    // [152, 400],
    // [152, 424],
    // [176, 424],
    // [200, 424],
    // [200, 448],
    // [248, 448],
    // [248, 424],
    // [272, 424],
    // [296, 424],
    // [296, 400],
    // [342, 400],
    // [342, 424],
    // [396, 332],
    // [372, 332],
    // [318, 332],
    // [296, 332],
    // [270, 332],
    // [246, 332],
    // [246, 356],
    // [200, 350],
    // [200, 328],
    // [176, 328],
    // [152, 328],
    // [128, 328],
    // [152, 304],
    // [152, 280],
    // [152, 256],
    // [152, 232],
    // [152, 208],
    // [152, 184],
    // [176, 184],
    // [200, 184],
    // [224, 184],
    // [248, 184],
    // [272, 184],
    // [296, 184],
    // [296, 208],
    // [296, 232],
    // [296, 256],
    // [296, 280],
    // [296, 304],
    // [272, 280],
    // [248, 280],
    // [224, 280],
    // [200, 280],
    // [176, 280],
    // [200, 56],
    // [248, 56],
    // [248, 24],
    // [272, 24],
    // [296, 24],
    // [320, 24],
    // [348, 24],
    // [372, 24],
    // [348, 56],
    // [396, 24],
    // [424, 24],
    // [424, 56],
    // [424, 112],
    // [424, 136],
    // [400, 136],
    // [376, 136],
    // [296, 110],
    // [296, 134],
    // [272, 134],
    // [248, 134],
    // [248, 156],
    // [150, 110],
    // [150, 134],
    // [174, 134],
    // [198, 134],
    // [198, 158],
    // [128, 230],
    // [320, 230],
];
export class Pacman extends Element {
    width = 26;
    height = 26;
    pacmanOpen = true;
    isAnimating = true;
    points = 0;
    pointsCtx: CanvasRenderingContext2D;
    goInterval: NodeJS.Timer | undefined;
    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        pointsCtx: CanvasRenderingContext2D,
    ) {
        super(x, y, ctx, pacManOpenRightImg, 28, 28);
        this.pointsCtx = pointsCtx;
        this.pointsCtx.fillStyle = 'rgba(0,0,0,1)';
    }
    addBg = () => {
        if (this.image.complete) {
            console.log('zaladowano');
            return;
        }

        return new Promise((resolve) => {
            this.image.onload = () => resolve('loaded');
        });
    };
    animatePacMan = async () => {
        if (!this.isAnimating) {
            if (this.direction == Directions.LEFT) {
                this.image = pacManOpenLeftImg;
            } else if (this.direction == Directions.DOWN) {
                this.image = pacManOpenBottomImg;
            } else if (this.direction == Directions.RIGHT) {
                this.image = pacManOpenRightImg;
            } else {
                this.image = pacManOpenTopImg;
            }
            this.removeFromBoard();
            this.addToBoard();
            return;
        }
        this.removeFromBoard();
        this.addToBoard();
        switch (this.direction) {
            case Directions.RIGHT: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseRightImg;
                } else {
                    this.image = pacManOpenRightImg;
                }
                break;
            }
            case Directions.LEFT: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseLeftImg;
                } else {
                    this.image = pacManOpenLeftImg;
                }
                break;
            }
            case Directions.DOWN: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseBottomImg;
                } else {
                    this.image = pacManOpenBottomImg;
                }
                break;
            }
            case Directions.UP: {
                if (this.pacmanOpen) {
                    this.image = pacManCloseTopImg;
                } else {
                    this.image = pacManOpenTopImg;
                }
                break;
            }
        }

        this.pacmanOpen = !this.pacmanOpen;

        await sleep(200);
        requestAnimationFrame(() => this.animatePacMan());
    };

    addToBoard = () => {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    endGame = () => {
        alert('dupa');
        const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
    };
    countPoints = () => {
        let result = document.getElementById('pointsBoard') as HTMLElement;
        result.innerText = this.points.toString();
    };
    go = () => {
        const thisRef = this;
        this.goInterval = setInterval(() => {
            console.log(this.goInterval);
            let canMove = false;
            if (this.x == 8 && this.y >= 216 && this.y <= 222) {
                this.removeFromBoard();
                this.x = 416;
                this.y = 216;
                this.direction = Directions.LEFT;
                this.addToBoard();
            }
            if (this.x == 421 && this.y >= 216 && this.y <= 222) {
                this.removeFromBoard();
                this.x = 10;
                this.y = 216;
                this.direction = Directions.RIGHT;
                this.addToBoard();
            }

            if (!canMove) {
                canMove =
                    thisRef.direction == Directions.UP
                        ? thisRef.move(0, -1, Directions.UP)
                        : thisRef.direction == Directions.LEFT
                        ? thisRef.move(-1, 0, Directions.LEFT)
                        : thisRef.direction == Directions.RIGHT
                        ? thisRef.move(1, 0, Directions.RIGHT)
                        : thisRef.direction == Directions.DOWN
                        ? thisRef.move(0, 1, Directions.DOWN)
                        : false;
            }
            const x = thisRef.x;0
            const y = thisRef.y;
            if (points.length == 0) {
                this.endGame();
            }
            for (let i = 0; i < points.length; i++) {
                for (let j = y; j < y + 28; j++) {
                    for (let k = x; k < x + 28; k++) {
                        if (points[i][1] == j && points[i][0] == k) {
                            thisRef.pointsCtx.beginPath();
                            thisRef.pointsCtx.arc(
                                points[i][0],
                                points[i][1],
                                5,
                                0,
                                Math.PI * 2,
                            );
                            thisRef.pointsCtx.fill();
                            thisRef.pointsCtx.stroke();
                            points.splice(i, 1);
                            thisRef.points += 10;
                            this.countPoints();
                        }
                    }
                }
            }
            if (canMove) {
                if (!thisRef.isAnimating) {
                    thisRef.isAnimating = true;
                    thisRef.animatePacMan();
                }
            } else {
                thisRef.isAnimating = false;
            }
        }, 15);
    };
}
