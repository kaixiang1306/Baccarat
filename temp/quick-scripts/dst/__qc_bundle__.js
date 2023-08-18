
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scrtpt/longhuMgr');
require('./assets/Scrtpt/tsJetton');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scrtpt/longhuMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3J0cHQvbG9uZ2h1TWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUU1QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTBPQztRQXhPRyxtQkFBYSxHQUFhLElBQUksQ0FBQyxDQUFBLE9BQU87UUFHdEMscUJBQWUsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBR3RDLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsaUJBQVcsR0FBYyxFQUFFLENBQUMsQ0FBUSxRQUFRO1FBRzVDLGdCQUFVLEdBQWMsRUFBRSxDQUFDLENBQVMsTUFBTTtRQUcxQyxtQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUcvQix1QkFBaUIsR0FBZSxFQUFFLENBQUM7UUFHbkMsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFckIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixzQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFFaEMsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsZUFBUyxHQUFZLEtBQUssQ0FBQzs7SUFpTXZDLENBQUM7SUEvTGEsMEJBQU0sR0FBaEI7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO0lBQ0UscUNBQWlCLEdBQXpCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFF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a0RBQ1U7SUFoQ1osU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTBPN0I7SUFBRCxnQkFBQztDQTFPRCxBQTBPQyxDQTFPc0MsRUFBRSxDQUFDLFNBQVMsR0EwT2xEO2tCQTFPb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0c0pldHRvbiBmcm9tIFwiLi90c0pldHRvblwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbG9uZ2h1TWdyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiZWxHYW1lVGltZTogY2MuTGFiZWwgPSBudWxsOy8v5a6a5pe25Zmo6IqC54K5XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub2RlT3RlaHJQbGF5ZXI6IGNjLk5vZGUgPSBudWxsOy8v5YW25LuW546p5a62XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHBmSmV0dG9uOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RvcEdhbWVzcGluZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub2RlV2FpdFN0YXR1czogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBKZXR0b25Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgYXJyQ2hpcEl0ZW06IGNjLk5vZGVbXSA9IFtdOyAgICAgICAgLy/kuIvms6jnsYznorznr4Dpu55cblxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgYXJyQmV0QXJlYTogY2MuTm9kZVtdID0gW107ICAgICAgICAgLy/kuIvms6jljYDln59cblxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxuICAgIGFyck1vbmV5TGFiZWw6IGNjLkxhYmVsW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxuICAgIGFyclVzZXJNb25leUxhYmVsOiBjYy5MYWJlbFtdID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZmluaXNoTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgQkVUVElNRTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIFNlbGVjdE1vbmV5OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgVG90YWxNb25leTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGN1cmNiSmV0dG9uSW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICBwcml2YXRlIGN1cnBmSmV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNTdG9wQmV0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBjYy52aWV3LnJlc2l6ZVdpdGhCcm93c2VyU2l6ZSh0cnVlKTtcbiAgICB9XG5cbiAgICAvL+mWi+Wni+mBiuaIslxuICAgIHByaXZhdGUgT25HYW1lU3RhcnRBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubGFiZWxHYW1lVGltZS5zdHJpbmcgPSAnJztcbiAgICAgICAgdGhpcy5CRVRUSU1FID0gMzA7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYWJlbEdhbWVUaW1lLnN0cmluZyA9IFN0cmluZyh0aGlzLkJFVFRJTUUpO1xuICAgICAgICAgICAgdGhpcy5CRVRUSU1FLS07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLkJFVFRJTUUgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PbkJldEZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxLCB0aGlzLkJFVFRJTUUsIDApO1xuICAgIH1cblxuICAgIC8v5YGc5q2i5LiL5rOoXG4gICAgcHJpdmF0ZSBPbkJldEZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BCZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0b3BHYW1lc3BpbmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYWJlbEdhbWVUaW1lLnN0cmluZyA9ICcnO1xuXG4gICAgICAgIGxldCBwU2t0b24gPSB0aGlzLnN0b3BHYW1lc3BpbmUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgcFNrdG9uLmxvb3AgPSBmYWxzZTtcbiAgICAgICAgcFNrdG9uLmFuaW1hdGlvbiA9ICdhbmltYXRpb24nO1xuXG4gICAgICAgIHBTa3Rvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEdhbWVzcGluZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuRmluaXNoTGFiZWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgRmluaXNoTGFiZWwoKSB7XG4gICAgICAgIGxldCB3aG93aW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTtcbiAgICAgICAgc3dpdGNoICh3aG93aW4pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaExhYmVsLnN0cmluZyA9IFwi6ZaS5YudIFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoTGFiZWwuc3RyaW5nID0gXCLlkozli50gXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hMYWJlbC5zdHJpbmcgPSBcIuiOiuWLnSBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdob3dpbiA9PSB0aGlzLmN1cmNiSmV0dG9uSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoTGFiZWwuc3RyaW5nICs9IFwi5L2g6LSPIFwiICsgdGhpcy5Ub3RhbE1vbmV5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maW5pc2hMYWJlbC5zdHJpbmcgKz0gXCLkvaDovLggXCIgKyB0aGlzLlRvdGFsTW9uZXk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5pc2hMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4geyB0aGlzLmdvRW5kKCkgfSwgNyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnb0VuZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlV2FpdFN0YXR1cy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wQmV0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLlRvdGFsTW9uZXkgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJjYkpldHRvbkluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY3VycGZKZXR0b24gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5maW5pc2hMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLm5vZGVXYWl0U3RhdHVzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5KZXR0b25Ob2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyQmV0QXJlYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyTW9uZXlMYWJlbFtpXS5zdHJpbmcgPSAnMCc7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnJVc2VyTW9uZXlMYWJlbFtpXS5zdHJpbmcgPSAn5oiRIDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMpO1xuICAgIH1cblxuICAgIC8v57GM56K8XG4gICAgcHVibGljIE9uQnV0dG9uSmV0dG9uKHNlbmRlcjogRXZlbnQsIGNiSmV0dG9uSW5kZXg6IGFueSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjYkpldHRvbkluZGV4KVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJDaGlwSXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGVTZWxlY3QgPSB0aGlzLmFyckNoaXBJdGVtW2ldLmdldENoaWxkQnlOYW1lKFwiU2VsZWN0XCIpO1xuXG4gICAgICAgICAgICBpZiAobm9kZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChpID09IGNiSmV0dG9uSW5kZXgpIG5vZGVTZWxlY3QuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlIG5vZGVTZWxlY3QuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KGNiSmV0dG9uSW5kZXgpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5TZWxlY3RNb25leSA9IDEwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuU2VsZWN0TW9uZXkgPSA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLlNlbGVjdE1vbmV5ID0gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMuU2VsZWN0TW9uZXkgPSA1MDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5TZWxlY3RNb25leSA9IDEwMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgdGhpcy5TZWxlY3RNb25leSA9IDUwMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgdGhpcy5TZWxlY3RNb25leSA9IDEwMDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIHRoaXMuU2VsZWN0TW9uZXkgPSA1MDAwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLlNlbGVjdE1vbmV5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgT25DbGlja0pldHRvbihzZW5kZXI6IEV2ZW50LCBjYkpldHRvbkluZGV4OiBhbnkpIHtcbiAgICAgICAgLy8gbGV0IGN1ck1vbmV5ID0gdGhpcy5nZXRSYW5kb21JbnQoMCwgNTAwKTtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wQmV0ID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJjYkpldHRvbkluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cmNiSmV0dG9uSW5kZXggPSBjYkpldHRvbkluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuT25HYW1lU3RhcnRBY3Rpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuU2VsZWN0TW9uZXkgPiAwICYmIHRoaXMuY3VyY2JKZXR0b25JbmRleCA9PSBjYkpldHRvbkluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5Ub3RhbE1vbmV5ICs9IHRoaXMuU2VsZWN0TW9uZXk7XG4gICAgICAgICAgICAgICAgdGhpcy5QbGFjZUpldHRvbkFjdGlvbigwLCB0aGlzLlNlbGVjdE1vbmV5LCBjYkpldHRvbkluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyclVzZXJNb25leUxhYmVsW2NiSmV0dG9uSW5kZXhdLnN0cmluZyA9ICfmiJEgJyArIChOdW1iZXIodGhpcy5hcnJVc2VyTW9uZXlMYWJlbFtjYkpldHRvbkluZGV4XS5zdHJpbmcucmVwbGFjZSgvW14wLTldL2lnLCAnJykpICsgdGhpcy5TZWxlY3RNb25leSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5LiL5rOo5YuV55WrXG4gICAgcHVibGljIFBsYWNlSmV0dG9uQWN0aW9uKHdDaGFpcklELCBsQmV0U2NvcmUsIGNiQmV0QXJlYSkge1xuICAgICAgICBsZXQganNCZXRBcmVhID0gdGhpcy5hcnJCZXRBcmVhW2NiQmV0QXJlYV07XG5cbiAgICAgICAgbGV0IHdOb2RlVGFyZ2V0TWF4WCA9IGpzQmV0QXJlYS5nZXRQb3NpdGlvbigpLnggKyAxMDA7XG4gICAgICAgIGxldCB3Tm9kZVRhcmdldE1heFkgPSBqc0JldEFyZWEuZ2V0UG9zaXRpb24oKS55ICsgODA7XG5cbiAgICAgICAgbGV0IHdOb2RlVGFyZ2V0TWluWCA9IGpzQmV0QXJlYS5nZXRQb3NpdGlvbigpLnggLSAxMDA7XG4gICAgICAgIGxldCB3Tm9kZVRhcmdldE1pblkgPSBqc0JldEFyZWEuZ2V0UG9zaXRpb24oKS55IC0gODA7XG5cbiAgICAgICAgbGV0IHBvc1ggPSB0aGlzLmdldFJhbmRvbUludCh3Tm9kZVRhcmdldE1pblgsIHdOb2RlVGFyZ2V0TWF4WCk7XG4gICAgICAgIGxldCBwb3NZID0gdGhpcy5nZXRSYW5kb21JbnQod05vZGVUYXJnZXRNaW5ZLCB3Tm9kZVRhcmdldE1heFkpO1xuICAgICAgICBsZXQgVGFyZ2V0VmVjMiA9IGNjLnYyKHBvc1gsIHBvc1kpO1xuXG4gICAgICAgIHRoaXMuYXJyTW9uZXlMYWJlbFtjYkJldEFyZWFdLnN0cmluZyA9IE51bWJlcih0aGlzLmFyck1vbmV5TGFiZWxbY2JCZXRBcmVhXS5zdHJpbmcpICsgbEJldFNjb3JlO1xuXG4gICAgICAgIC8v546p5a625LiL5rOoXG4gICAgICAgIHRoaXMuT25GcmFtZVBsYWNlSmV0dG9uKHdDaGFpcklELCBjYkJldEFyZWEsIGxCZXRTY29yZSwgVGFyZ2V0VmVjMik7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0UmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICAgICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgIH1cblxuICAgIC8v5LiL5rOoXG4gICAgcHJpdmF0ZSBPbkZyYW1lUGxhY2VKZXR0b24od0NoYWlySUQsIGNiQXJlYUlELCBsQmV0U2NvcmUsIE5vZGVTcGFjZVZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycGZKZXR0b24gPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHBmSmV0dG9uID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZkpldHRvbik7XG4gICAgICAgICAgICBwZkpldHRvbi5zZXRQYXJlbnQodGhpcy5KZXR0b25Ob2RlKTtcbiAgICAgICAgICAgIHBmSmV0dG9uLnNldFBvc2l0aW9uKHRoaXMubm9kZU90ZWhyUGxheWVyLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgICAgICBsZXQgSmV0dG9uID0gcGZKZXR0b24uZ2V0Q29tcG9uZW50KHRzSmV0dG9uKTtcbiAgICAgICAgICAgIEpldHRvbi5PbkluaXRKZXR0b24obEJldFNjb3JlKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJwZkpldHRvbiA9IHBmSmV0dG9uO1xuXG4gICAgICAgICAgICBjYy50d2VlbihwZkpldHRvbilcbiAgICAgICAgICAgICAgICAudG8oMCwgeyBzY2FsZTogMS41IH0pXG4gICAgICAgICAgICAgICAgLnRvKDAuNSwgeyBwb3NpdGlvbjogTm9kZVNwYWNlVmVjMiwgc2NhbGU6IDEuMiB9KVxuICAgICAgICAgICAgICAgIC50bygwLjUsIHsgc2NhbGU6IDEuMCB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IEpldHRvbiA9IHRoaXMuY3VycGZKZXR0b24uZ2V0Q29tcG9uZW50KHRzSmV0dG9uKTtcbiAgICAgICAgICAgIEpldHRvbi5PbkluaXRKZXR0b24odGhpcy5Ub3RhbE1vbmV5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrQnRuYmFjaygpOiB2b2lkIHtcbiAgICAgICAgKDxhbnk+d2luZG93KS5NYW5hZ2VySGVscF9TZXRXYWl0TG9ja0xheWVyKCg8YW55PndpbmRvdykuV0FJVF9PUEVORUQpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ0xvYmJ5Jyk7XG4gICAgfVxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scrtpt/tsJetton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b0daszvPhGO5p9BauMuPib', 'tsJetton');
// Scrtpt/tsJetton.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var tsJetton = /** @class */ (function (_super) {
    __extends(tsJetton, _super);
    function tsJetton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jettonLabel = null;
        _this.jettonFrame = [];
        return _this;
    }
    tsJetton.prototype.OnInitJetton = function (lBetScore) {
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
    };
    tsJetton.prototype.kFormatter = function (num) {
        return String(Math.abs(num) > 999 ? Math.sign(num) * parseInt((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num));
    };
    __decorate([
        property(cc.Label)
    ], tsJetton.prototype, "jettonLabel", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], tsJetton.prototype, "jettonFrame", void 0);
    tsJetton = __decorate([
        ccclass
    ], tsJetton);
    return tsJetton;
}(cc.Component));
exports.default = tsJetton;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3J0cHQvdHNKZXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUErQkM7UUE3QkcsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBcUIsRUFBRSxDQUFDOztJQTBCdkMsQ0FBQztJQXhCVSwrQkFBWSxHQUFuQixVQUFvQixTQUFpQjtRQUNqQywrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRCxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO2FBQ0ksSUFBSSxTQUFTLEdBQUcsR0FBRyxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO2FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO2FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLFNBQVMsR0FBRyxLQUFLLEVBQUU7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO2FBQ0k7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLEdBQUc7UUFDVixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0ksQ0FBQztJQTVCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lEQUNRO0lBTGxCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErQjVCO0lBQUQsZUFBQztDQS9CRCxBQStCQyxDQS9CcUMsRUFBRSxDQUFDLFNBQVMsR0ErQmpEO2tCQS9Cb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0c0pldHRvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGpldHRvbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBqZXR0b25GcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHVibGljIE9uSW5pdEpldHRvbihsQmV0U2NvcmU6IG51bWJlcikge1xuICAgICAgICAvLyB0aGlzLmpldHRvbkxhYmVsLnN0cmluZyA9IFN0cmluZyhsQmV0U2NvcmUpO1xuICAgICAgICB0aGlzLmpldHRvbkxhYmVsLnN0cmluZyA9IHRoaXMua0Zvcm1hdHRlcihsQmV0U2NvcmUpO1xuXG4gICAgICAgIGlmIChsQmV0U2NvcmUgPCA1MDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuamV0dG9uRnJhbWVbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobEJldFNjb3JlID4gNTAwICYmIGxCZXRTY29yZSA8IDEwMDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuamV0dG9uRnJhbWVbMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobEJldFNjb3JlID4gMTAwMCAmJiBsQmV0U2NvcmUgPCA1MDAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmpldHRvbkZyYW1lWzJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxCZXRTY29yZSA+IDUwMDAgJiYgbEJldFNjb3JlIDwgMTAwMDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuamV0dG9uRnJhbWVbM107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmpldHRvbkZyYW1lWzRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAga0Zvcm1hdHRlcihudW0pIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhNYXRoLmFicyhudW0pID4gOTk5ID8gTWF0aC5zaWduKG51bSkgKiBwYXJzZUludCgoTWF0aC5hYnMobnVtKSAvIDEwMDApLnRvRml4ZWQoMSkpICsgJ2snIDogTWF0aC5zaWduKG51bSkgKiBNYXRoLmFicyhudW0pKTtcbiAgICB9XG59Il19
//------QC-SOURCE-SPLIT------
