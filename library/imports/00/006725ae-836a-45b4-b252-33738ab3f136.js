"use strict";
cc._RF.push(module, '00672Wug2pFtLJSM3OKs/E2', 'longhuMgr');
// Scrtpt/longhuMgr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsJetton_1 = require("./tsJetton");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var longhuMgr = /** @class */ (function (_super) {
    __extends(longhuMgr, _super);
    function longhuMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelGameTime = null; //定时器节点
        _this.nodeOtehrPlayer = null; //其他玩家
        _this.pfJetton = null;
        _this.stopGamespine = null;
        _this.nodeWaitStatus = null;
        _this.JettonNode = null;
        _this.arrChipItem = []; //下注籌碼節點
        _this.arrBetArea = []; //下注區域
        _this.arrMoneyLabel = [];
        _this.arrUserMoneyLabel = [];
        _this.finishLabel = null;
        _this.BETTIME = 0;
        _this.SelectMoney = 0;
        _this.TotalMoney = 0;
        _this.curcbJettonIndex = null;
        _this.curpfJetton = null;
        _this.isStopBet = false;
        return _this;
    }
    longhuMgr.prototype.onLoad = function () {
        cc.view.resizeWithBrowserSize(true);
    };
    //開始遊戲
    longhuMgr.prototype.OnGameStartAction = function () {
        var _this = this;
        this.labelGameTime.string = '';
        this.BETTIME = 30;
        this.schedule(function () {
            _this.labelGameTime.string = String(_this.BETTIME);
            _this.BETTIME--;
            if (_this.BETTIME < 0) {
                _this.OnBetFinish();
            }
        }, 1, this.BETTIME, 0);
    };
    //停止下注
    longhuMgr.prototype.OnBetFinish = function () {
        var _this = this;
        this.isStopBet = true;
        this.stopGamespine.active = true;
        this.labelGameTime.string = '';
        var pSkton = this.stopGamespine.getComponent(sp.Skeleton);
        pSkton.loop = false;
        pSkton.animation = 'animation';
        pSkton.setCompleteListener(function () {
            _this.stopGamespine.active = false;
            _this.FinishLabel();
        });
    };
    longhuMgr.prototype.FinishLabel = function () {
        var _this = this;
        var whowin = Math.floor(Math.random() * 3);
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
        }
        else {
            this.finishLabel.string += "你輸 " + this.TotalMoney;
        }
        this.finishLabel.node.active = true;
        this.scheduleOnce(function () { _this.goEnd(); }, 7);
    };
    longhuMgr.prototype.goEnd = function () {
        var _this = this;
        this.nodeWaitStatus.active = true;
        this.scheduleOnce(function () {
            _this.isStopBet = false;
            _this.TotalMoney = 0;
            _this.curcbJettonIndex = null;
            _this.curpfJetton = null;
            _this.finishLabel.node.active = false;
            _this.nodeWaitStatus.active = false;
            _this.JettonNode.removeAllChildren();
            for (var i = 0; i < _this.arrBetArea.length; i++) {
                _this.arrMoneyLabel[i].string = '0';
                _this.arrUserMoneyLabel[i].string = '我 0';
            }
        }, 3);
    };
    //籌碼
    longhuMgr.prototype.OnButtonJetton = function (sender, cbJettonIndex) {
        // console.log(cbJettonIndex)
        for (var i = 0; i < this.arrChipItem.length; i++) {
            var nodeSelect = this.arrChipItem[i].getChildByName("Select");
            if (nodeSelect) {
                if (i == cbJettonIndex)
                    nodeSelect.active = true;
                else
                    nodeSelect.active = false;
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
    };
    longhuMgr.prototype.OnClickJetton = function (sender, cbJettonIndex) {
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
    };
    //下注動畫
    longhuMgr.prototype.PlaceJettonAction = function (wChairID, lBetScore, cbBetArea) {
        var jsBetArea = this.arrBetArea[cbBetArea];
        var wNodeTargetMaxX = jsBetArea.getPosition().x + 100;
        var wNodeTargetMaxY = jsBetArea.getPosition().y + 80;
        var wNodeTargetMinX = jsBetArea.getPosition().x - 100;
        var wNodeTargetMinY = jsBetArea.getPosition().y - 80;
        var posX = this.getRandomInt(wNodeTargetMinX, wNodeTargetMaxX);
        var posY = this.getRandomInt(wNodeTargetMinY, wNodeTargetMaxY);
        var TargetVec2 = cc.v2(posX, posY);
        this.arrMoneyLabel[cbBetArea].string = Number(this.arrMoneyLabel[cbBetArea].string) + lBetScore;
        //玩家下注
        this.OnFramePlaceJetton(wChairID, cbBetArea, lBetScore, TargetVec2);
    };
    longhuMgr.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    //下注
    longhuMgr.prototype.OnFramePlaceJetton = function (wChairID, cbAreaID, lBetScore, NodeSpaceVec2) {
        if (this.curpfJetton == null) {
            var pfJetton = cc.instantiate(this.pfJetton);
            pfJetton.setParent(this.JettonNode);
            pfJetton.setPosition(this.nodeOtehrPlayer.getPosition());
            var Jetton = pfJetton.getComponent(tsJetton_1.default);
            Jetton.OnInitJetton(lBetScore);
            this.curpfJetton = pfJetton;
            cc.tween(pfJetton)
                .to(0, { scale: 1.5 })
                .to(0.5, { position: NodeSpaceVec2, scale: 1.2 })
                .to(0.5, { scale: 1.0 })
                .start();
        }
        else {
            var Jetton = this.curpfJetton.getComponent(tsJetton_1.default);
            Jetton.OnInitJetton(this.TotalMoney);
        }
    };
    longhuMgr.prototype.onClickBtnback = function () {
        window.ManagerHelp_SetWaitLockLayer(window.WAIT_OPENED);
        cc.director.loadScene('Lobby');
    };
    __decorate([
        property(cc.Label)
    ], longhuMgr.prototype, "labelGameTime", void 0);
    __decorate([
        property(cc.Node)
    ], longhuMgr.prototype, "nodeOtehrPlayer", void 0);
    __decorate([
        property(cc.Prefab)
    ], longhuMgr.prototype, "pfJetton", void 0);
    __decorate([
        property(cc.Node)
    ], longhuMgr.prototype, "stopGamespine", void 0);
    __decorate([
        property(cc.Node)
    ], longhuMgr.prototype, "nodeWaitStatus", void 0);
    __decorate([
        property(cc.Node)
    ], longhuMgr.prototype, "JettonNode", void 0);
    __decorate([
        property([cc.Node])
    ], longhuMgr.prototype, "arrChipItem", void 0);
    __decorate([
        property([cc.Node])
    ], longhuMgr.prototype, "arrBetArea", void 0);
    __decorate([
        property([cc.Label])
    ], longhuMgr.prototype, "arrMoneyLabel", void 0);
    __decorate([
        property([cc.Label])
    ], longhuMgr.prototype, "arrUserMoneyLabel", void 0);
    __decorate([
        property(cc.Label)
    ], longhuMgr.prototype, "finishLabel", void 0);
    longhuMgr = __decorate([
        ccclass
    ], longhuMgr);
    return longhuMgr;
}(cc.Component));
exports.default = longhuMgr;

cc._RF.pop();