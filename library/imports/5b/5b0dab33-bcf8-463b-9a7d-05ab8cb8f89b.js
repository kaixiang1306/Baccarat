"use strict";
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