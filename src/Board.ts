const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export class Board {
    private blockSize: number = 20;
    private bgCanvas: HTMLCanvasElement;
    bgCtx: CanvasRenderingContext2D;

    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById('board') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.bgCanvas = document.getElementById('bg') as HTMLCanvasElement;
        this.bgCtx = this.bgCanvas.getContext('2d') as CanvasRenderingContext2D;
    }

    createBoard = async () => {
        this.initializeBoardSize();
        await this.addBackGround('board_close.png');
    };
    initializeBoardSize = () => {
        this.canvas.height = 496;
        this.canvas.width = 448;
        this.bgCanvas.height = 496;
        this.bgCanvas.width = 448;
    };
    addBackGround = (fileName: string) => {
        return new Promise((resolve) => {
            const backGroundClose = new Image();
            backGroundClose.src = './assets/' + fileName;
            backGroundClose.onload = () => {
                this.bgCtx.drawImage(backGroundClose, 0, 0);
                resolve('loaded');
            };
        });
    };
}
