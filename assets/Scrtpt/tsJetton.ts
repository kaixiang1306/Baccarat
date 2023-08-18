const { ccclass, property } = cc._decorator;

@ccclass
export default class tsJetton extends cc.Component {
    @property(cc.Label)
    jettonLabel: cc.Label = null;

    @property([cc.SpriteFrame])
    jettonFrame: cc.SpriteFrame[] = [];

    public OnInitJetton(lBetScore: number) {
        // this.jettonLabel.string = String(lBetScore);
        this.jettonLabel.string = this.kFormatter(lBetScore);

        if (lBetScore < 500) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.jettonFrame[0];
        }
        else if (lBetScore > 500 && lBetScore < 1000) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.jettonFrame[1];
        }
        else if (lBetScore > 1000 && lBetScore < 5000) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.jettonFrame[2];
        }
        else if (lBetScore > 5000 && lBetScore < 10000) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.jettonFrame[3];
        }
        else {
            this.node.getComponent(cc.Sprite).spriteFrame = this.jettonFrame[4];
        }
    }

    kFormatter(num) {
        return String(Math.abs(num) > 999 ? Math.sign(num) * parseInt((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num));
    }
}