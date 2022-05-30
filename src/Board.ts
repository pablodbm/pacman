const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const points = [
    // [24,24],
    [24,48],[24,72],[24,96],[24,116],[24,136],
    // [48,24],[72,24],[96,24],[120,24],[144,24],[168,24],[192,24],[64,88],[100,48],[100,88],[64,140],[100,140],[140,88],[164,88],
    // [188,88],[212,88],[236,88],[260,88],[284,88],[308,88],[332,88],[356,88],[380,88],[404,88],[424,88],[100,164],[100,188],[100,212],[100,236],
    // [100,260],[100,284],[100,308],[100,332],[100,356],[100,380],[100,404],[100,424],[72,328],[48,328],[24,328],[24,352],[24,376],[56,376],[56,400],
    // [56,424],[80,424],[24,424],[24,448],[24,472],[48,472],[72,472],[96,472],[120,472],[144,472],[168,472],[192,472],[216,472],[240,472],[264,472],
    // [288,472],[312,472],[336,472],[360,472],[384,472],[408,472],[428,472],[428,448],[428,424],[408,424],[384,424],[360,424],[396,396],
    // [396,372],[424,372],[424,332],[344,112],[344,136],[344,160],[344,184],[344,208],[344,232],[344,256],[344,280],[344,304],[344,328],
    // [344,352],[344,376],[320,376],[296,376],[272,376],[248,376],[224,376],[200,376],[176,376],[152,376],[128,376],[152,400],[152,424],[176,424],
    // [200,424],[200,448],[248,448],[248,424],[272,424],[296,424],[296,400],[342,400],[342,424],[396,332],[372,332],[318,332],[296,332],[270,332],
    // [246,332],[246,356],[200,350],[200,328],[176,328],[152,328],[128,328],[152,304],[152,280],[152,256],[152,232],[152,208],[152,184],[176,184],
    // [200,184],[224,184],[248,184],[272,184],[296,184],[296,208],[296,232],[296,256],[296,280],[296,304],[272,280],[248,280],[224,280],[200,280],
    // [176,280],[200,56],[248,56],[248,24],[272,24],[296,24],[320,24],[348,24],[372,24],[348,56],[396,24],[424,24],[424,56],[424,112],[424,136],
    // [400,136],[376,136],[296,110],[296,134],[272,134],[248,134],[248,156],[150,110],[150,134],[174,134],[198,134],[198,158],[128,230],[320,230]
]
export class Board {
    private blockSize: number = 20;
    private bgCanvas: HTMLCanvasElement;
    bgCtx: CanvasRenderingContext2D;
    private points:HTMLCanvasElement
    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pointsCtx: CanvasRenderingContext2D;


    constructor() {
        this.canvas = document.getElementById('board') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.bgCanvas = document.getElementById('bg') as HTMLCanvasElement;
        this.bgCtx = this.bgCanvas.getContext('2d') as CanvasRenderingContext2D;
        this.points = document.getElementById('points') as HTMLCanvasElement;
        this.pointsCtx = this.points.getContext('2d') as CanvasRenderingContext2D;
    }

    createBoard = async () => {
        this.initializeBoardSize();
        await this.addBackGround('board_close.png');
        // await this.createBoard();
    };
    initializeBoardSize = () => {
        this.canvas.height = 496;
        this.canvas.width = 448;
        this.bgCanvas.height = 496;
        this.bgCanvas.width = 448;
        this.points.width = 448;
        this.points.height = 496;
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

    createPoints = async  () => {
        return new Promise((resolve) => {
            this.pointsCtx.fillStyle = "rgba(255,255,224,1)";
            for(let i = 0;i<points.length;i++){
                this.pointsCtx.beginPath()
                this.pointsCtx.arc(points[i][0],points[i][1],5,0,Math.PI*2)
                this.pointsCtx.fill()
                this.pointsCtx.stroke()
            }
            resolve("done")
        });
    };
}
