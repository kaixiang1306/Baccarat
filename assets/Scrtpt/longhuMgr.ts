import tsJetton from "./tsJetton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class longhuMgr extends cc.Component {
    @property(cc.Label)
    labelGameTime: cc.Label = null;//定时器节点

    @property(cc.Node)
    nodeOtehrPlayer: cc.Node = null;//其他玩家

    @property(cc.Prefab)
    pfJetton: cc.Prefab = null;

    @property(cc.Node)
    stopGamespine: cc.Node = null;

    @property(cc.Node)
    nodeWaitStatus: cc.Node = null;

    @property(cc.Node)
    JettonNode: cc.Node = null;

    @property([cc.Node])
    arrChipItem: cc.Node[] = [];        //下注籌碼節點

    @property([cc.Node])
    arrBetArea: cc.Node[] = [];         //下注區域

    @property([cc.Label])
    arrMoneyLabel: cc.Label[] = [];

    @property([cc.Label])
    arrUserMoneyLabel: cc.Label[] = [];

    @property(cc.Label)
    finishLabel: cc.Label = null;

    private BETTIME: number = 0;
    private SelectMoney: number = 0;
    private TotalMoney: number = 0;
    private curcbJettonIndex: number = null;

    private curpfJetton: cc.Node = null;

    private isStopBet: boolean = false;

    protected onLoad(): void {
        cc.view.resizeWithBrowserSize(true);
    }

    //開始遊戲
    private OnGameStartAction() {
        this.labelGameTime.string = '';
        this.BETTIME = 30;
        this.schedule(() => {
            this.labelGameTime.string = String(this.BETTIME);
            this.BETTIME--;

            if (this.BETTIME < 0) {
                this.OnBetFinish();
            }
        }, 1, this.BETTIME, 0);
    }

    //停止下注
    private OnBetFinish() {
        this.isStopBet = true;
        this.stopGamespine.active = true;
        this.labelGameTime.string = '';

        let pSkton = this.stopGamespine.getComponent(sp.Skeleton);
        pSkton.loop = false;
        pSkton.animation = 'animation';

        pSkton.setCompleteListener(() => {
            this.stopGamespine.active = false;
            this.FinishLabel();
        });
    }

    FinishLabel() {
        let whowin = Math.floor(Math.random() * 3);
        switch (whowin) {
            case 0:
                this.finishLabel.string = "閒勝 ";
                break;
            case 1:
                this.finishLabel.string = "和勝 ";
                break;
            case 2:
                this.finishLabel.string = "莊勝 ";
                break;
            default:
                break;
        }
        if (whowin == this.curcbJettonIndex) {
            this.finishLabel.string += "你贏 " + this.TotalMoney;
        } else {
            this.finishLabel.string += "你輸 " + this.TotalMoney;
        }
        this.finishLabel.node.active = true;

        this.scheduleOnce(() => { this.goEnd() }, 7);
    }

    private goEnd() {
        this.nodeWaitStatus.active = true;

        this.scheduleOnce(() => {
            this.isStopBet = false;
            this.TotalMoney = 0;
            this.curcbJettonIndex = null;
            this.curpfJetton = null;
            this.finishLabel.node.active = false;

            this.nodeWaitStatus.active = false;
            this.JettonNode.removeAllChildren();
            for (let i = 0; i < this.arrBetArea.length; i++) {
                this.arrMoneyLabel[i].string = '0';
                this.arrUserMoneyLabel[i].string = '我 0'
            }
        }, 3);
    }

    //籌碼
    public OnButtonJetton(sender: Event, cbJettonIndex: any) {
        // console.log(cbJettonIndex)

        for (let i = 0; i < this.arrChipItem.length; i++) {
            let nodeSelect = this.arrChipItem[i].getChildByName("Select");

            if (nodeSelect) {
                if (i == cbJettonIndex) nodeSelect.active = true;
                else nodeSelect.active = false;
            }
        }

        switch (parseInt(cbJettonIndex)) {
            case 0:
                this.SelectMoney = 10;
                break;
            case 1:
                this.SelectMoney = 50;
                break;
            case 2:
                this.SelectMoney = 100;
                break;
            case 3:
                this.SelectMoney = 500;
                break;
            case 4:
                this.SelectMoney = 1000;
                break;
            case 5:
                this.SelectMoney = 5000;
                break;
            case 6:
                this.SelectMoney = 10000;
                break;
            case 7:
                this.SelectMoney = 50000;
                break;
            default:
                break;
        }

        console.log(this.SelectMoney);
    }

    public OnClickJetton(sender: Event, cbJettonIndex: any) {
        // let curMoney = this.getRandomInt(0, 500);
        if (this.isStopBet == false) {
            if (this.curcbJettonIndex == null) {
                this.curcbJettonIndex = cbJettonIndex;
                this.OnGameStartAction();
            }

            if (this.SelectMoney > 0 && this.curcbJettonIndex == cbJettonIndex) {
                this.TotalMoney += this.SelectMoney;
                this.PlaceJettonAction(0, this.SelectMoney, cbJettonIndex);
                this.arrUserMoneyLabel[cbJettonIndex].string = '我 ' + (Number(this.arrUserMoneyLabel[cbJettonIndex].string.replace(/[^0-9]/ig, '')) + this.SelectMoney).toString();
            }
        }
    }

    //下注動畫
    public PlaceJettonAction(wChairID, lBetScore, cbBetArea) {
        let jsBetArea = this.arrBetArea[cbBetArea];

        let wNodeTargetMaxX = jsBetArea.getPosition().x + 100;
        let wNodeTargetMaxY = jsBetArea.getPosition().y + 80;

        let wNodeTargetMinX = jsBetArea.getPosition().x - 100;
        let wNodeTargetMinY = jsBetArea.getPosition().y - 80;

        let posX = this.getRandomInt(wNodeTargetMinX, wNodeTargetMaxX);
        let posY = this.getRandomInt(wNodeTargetMinY, wNodeTargetMaxY);
        let TargetVec2 = cc.v2(posX, posY);

        this.arrMoneyLabel[cbBetArea].string = Number(this.arrMoneyLabel[cbBetArea].string) + lBetScore;

        //玩家下注
        this.OnFramePlaceJetton(wChairID, cbBetArea, lBetScore, TargetVec2);
    }
    private getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //下注
    private OnFramePlaceJetton(wChairID, cbAreaID, lBetScore, NodeSpaceVec2) {
        if (this.curpfJetton == null) {
            let pfJetton = cc.instantiate(this.pfJetton);
            pfJetton.setParent(this.JettonNode);
            pfJetton.setPosition(this.nodeOtehrPlayer.getPosition());

            let Jetton = pfJetton.getComponent(tsJetton);
            Jetton.OnInitJetton(lBetScore);

            this.curpfJetton = pfJetton;

            cc.tween(pfJetton)
                .to(0, { scale: 1.5 })
                .to(0.5, { position: NodeSpaceVec2, scale: 1.2 })
                .to(0.5, { scale: 1.0 })
                .start();
        } else {
            let Jetton = this.curpfJetton.getComponent(tsJetton);
            Jetton.OnInitJetton(this.TotalMoney);
        }
    }

    public onClickBtnback(): void {
        (<any>window).ManagerHelp_SetWaitLockLayer((<any>window).WAIT_OPENED);
        cc.director.loadScene('Lobby');
    }
}