
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