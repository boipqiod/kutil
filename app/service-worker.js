(()=>{"use strict";var i={178:function(i,t){var s=this&&this.__awaiter||function(i,t,s,n){return new(s||(s=Promise))((function(e,a){function o(i){try{c(n.next(i))}catch(i){a(i)}}function r(i){try{c(n.throw(i))}catch(i){a(i)}}function c(i){var t;i.done?e(i.value):(t=i.value,t instanceof s?t:new s((function(i){i(t)}))).then(o,r)}c((n=n.apply(i,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.FocusManagerSW=void 0;class n{constructor(){this.isRunning=!1,this.isFocus=!0,this.runningTime=1,this.isAuto=!1,this.isPush=!1,this.focusTime=0,this.relaxTime=0,this.startTime=0,this.setClient=(i,t)=>{this.sw=t,this.client=i},this.init=i=>{this.isAuto=i.isAuto,this.isPush=i.isPush,this.focusTime=this.runningTime=i.focusTime,this.relaxTime=i.relaxTime,this.isFocus=!0,this.sendDisplay(this.isFocus,this.runningTime)},this.sendDisplay=(i,t)=>{var s;null===(s=this.client)||void 0===s||s.postMessage({command:"focusmanager",type:"display",payload:{isFocus:i,runningTime:t}})},this.startTimer=()=>s(this,void 0,void 0,(function*(){this.isRunning=!0,this.startTime=Date.now(),this.timer=setInterval((()=>{var i;this.runningTime=this.isFocus?this.focusTime-Math.floor((Date.now()-this.startTime)/1e3):this.relaxTime-Math.floor((Date.now()-this.startTime)/1e3),this.sendDisplay(this.isFocus,this.runningTime),this.runningTime>0||(clearInterval(this.timer),this.isRunning&&(this.isPush&&(null===(i=this.sw)||void 0===i||i.registration.showNotification(this.isFocus?"Focus Time is over!":"Relax Time is over!",{body:this.isFocus?"Relax Time is over! Ready to focus":"Focus Time is over! Enjoy your break",icon:"../public/assets/focusmanager/fm_icon.png"}).then().catch()),this.isFocus=!this.isFocus,this.isRunning=!1))}),100)})),this.endSend=()=>{this.isRunning=!1,clearInterval(this.timer)}}static get instance(){return n.shared||(n.shared=new n),n.shared}}t.FocusManagerSW=n},870:function(i,t,s){var n=this&&this.__awaiter||function(i,t,s,n){return new(s||(s=Promise))((function(e,a){function o(i){try{c(n.next(i))}catch(i){a(i)}}function r(i){try{c(n.throw(i))}catch(i){a(i)}}function c(i){var t;i.done?e(i.value):(t=i.value,t instanceof s?t:new s((function(i){i(t)}))).then(o,r)}c((n=n.apply(i,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const e=s(178),a=self;a.addEventListener("install",(i=>{})),a.addEventListener("activate",(i=>{})),a.addEventListener("message",(i=>n(void 0,void 0,void 0,(function*(){const t=i.data;if("focusmanager"===t.command)if("init"===t.type){const s=t.payload;e.FocusManagerSW.instance.setClient(i.source,a),e.FocusManagerSW.instance.init(s)}else"start"===t.type?e.FocusManagerSW.instance.startTimer().then():"end"===t.type&&e.FocusManagerSW.instance.endSend()})))),a.addEventListener("push",(i=>{const t=i.data.text(),s={body:i.data.text()};i.waitUntil(a.registration.showNotification(t,s))})),a.addEventListener("notificationclick",(i=>{i.notification.close()}))}},t={};(function s(n){var e=t[n];if(void 0!==e)return e.exports;var a=t[n]={exports:{}};return i[n].call(a.exports,a,a.exports,s),a.exports})(870)})();