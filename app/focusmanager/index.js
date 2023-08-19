(()=>{"use strict";var e={95:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function r(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Controller=void 0;const o=i(205),n=i(789),r=i(520);class a{constructor(){if(this.originFocusTime=0,this.originRelaxTime=0,this.focusTime=0,this.relaxTime=0,this.isFocus=!0,this.startTime=0,this.init=()=>{(0,o.getById)("btn-start").addEventListener("click",this.startAction),(0,o.getById)("btn-end").addEventListener("click",this.end),(0,o.getById)("btn-relax-start").addEventListener("click",this.startRelax),(0,o.getById)("btn-focus-start").addEventListener("click",this.startFocus),(0,o.getById)("btn-info").addEventListener("click",this.showInfo),this.infoEle.addEventListener("click",this.closeInfo)},this.startAction=()=>{r.default.sendMessageToServiceWorker("hello").then((e=>console.log(e))),""===this.focusEle.value||""===this.relaxEle.value||Number(this.focusEle.value)<=0||Number(this.relaxEle.value)<=0?alert("입력 값을 확인해주세요"):this.start()},this.start=()=>{this.originFocusTime=this.focusTime=60*Number(this.focusEle.value),this.originRelaxTime=this.relaxTime=60*Number(this.relaxEle.value),this.updateTimeDisplay(this.focusTime),this.settingEle.classList.add("hide"),this.timerEle.classList.remove("hide"),this.startTime=Date.now(),this.timer=setInterval(this.timerAction,500)},this.end=()=>{this.timerEle.classList.add("hide"),this.settingEle.classList.remove("hide"),clearInterval(this.timer)},this.timerAction=()=>s(this,void 0,void 0,(function*(){const e=(Date.now()-this.startTime)/1e3;this.isFocus?(this.focusTime=this.originFocusTime-e,this.updateTimeDisplay(this.focusTime),this.focusTime<=0&&(yield(new n.Audio).play(n.soundList.bell),clearInterval(this.timer),this.autoEle.checked?this.startRelax():(0,o.getById)("btn-relax-start").classList.remove("hide"))):(this.relaxTime=this.originRelaxTime-e,this.updateTimeDisplay(this.relaxTime),this.relaxTime<=0&&(yield(new n.Audio).play(n.soundList.bell),clearInterval(this.timer),this.autoEle.checked?this.startFocus():(0,o.getById)("btn-focus-start").classList.remove("hide")))})),this.startRelax=()=>{this.startTime=Date.now(),this.isFocus=!1,this.relaxTime=60*Number(this.relaxEle.value),(0,o.getById)("btn-relax-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Relax",this.timer=setInterval(this.timerAction,500)},this.startFocus=()=>{this.startTime=Date.now(),this.isFocus=!0,this.focusTime=60*Number(this.focusEle.value),(0,o.getById)("btn-focus-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Focus",this.timer=setInterval(this.timerAction,500)},this.showInfo=()=>{this.infoEle.classList.remove("hide")},this.closeInfo=()=>{this.infoEle.classList.add("hide")},this.focusEle=(0,o.getById)("f_time"),this.relaxEle=(0,o.getById)("r_time"),this.autoEle=(0,o.getById)("auto"),this.settingEle=(0,o.getById)("setting"),this.timerEle=(0,o.getById)("timer"),this.infoEle=(0,o.getById)("info"),a.shared)return a.shared;a.shared=this}updateTimeDisplay(e){const t=e<=0?0:e,i=Math.floor(t/60),s=Math.floor(t%60);(0,o.getById)("display-timer").textContent=`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`}}t.Controller=a},414:function(e,t,i){var s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function r(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(95),n=i(316),r=i(520);window.onload=()=>s(void 0,void 0,void 0,(function*(){console.log(Notification.permission),"default"===Notification.permission?document.getElementById("subscribeButton").addEventListener("click",(function(){Notification.requestPermission().then((function(e){return s(this,void 0,void 0,(function*(){"granted"===e?(alert("알림 권한을 허용했습니다."),yield r.default.registerServiceWorker()):alert("알림 권한을 거부했습니다.")}))}))})):"granted"===Notification.permission&&(yield r.default.registerServiceWorker()),(new o.Controller).init(),n.Indicator.instance.hideIndicator()}))},789:function(e,t){var i,s=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function r(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.soundList=t.Audio=void 0;class o{constructor(){if(this.baseUrl="/kutil/public/assets/sound",this.audioEle=document.createElement("audio"),o.shared)return o.shared;document.body.append(this.audioEle),this.audioEle.setAttribute("hidden","true"),o.shared=this}play(e){return s(this,void 0,void 0,(function*(){switch(e){case i.click:return void(yield this.click());case i.bell:return void(yield this.bell())}}))}click(){return s(this,void 0,void 0,(function*(){this.audioEle.src=`${this.baseUrl}/click.mp3`,this.audioEle.setAttribute("type","audio/mpeg"),yield this.audioEle.play()}))}bell(){return s(this,void 0,void 0,(function*(){this.audioEle.src=`${this.baseUrl}/bell.mp3`,this.audioEle.setAttribute("type","audio/mpeg"),yield this.audioEle.play()}))}}t.Audio=o,function(e){e[e.click=0]="click",e[e.bell=1]="bell"}(i||(t.soundList=i={}))},316:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Indicator=void 0;class i{static get instance(){return i._instance||(i._instance=new i),i._instance}constructor(){this.setIndicator=()=>{const e=document.createElement("div");e.id="indicator",e.classList.add("indicator"),document.body.appendChild(e)},this.hideIndicator=()=>{var e;null===(e=document.getElementById("indicator"))||void 0===e||e.remove()}}}t.Indicator=i},520:function(e,t){var i=this&&this.__awaiter||function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function r(e){try{c(s.next(e))}catch(e){n(e)}}function a(e){try{c(s.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}c((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});class s{static registerServiceWorker(){return i(this,void 0,void 0,(function*(){"serviceWorker"in navigator?(navigator.serviceWorker.addEventListener("message",(function(e){console.log("메인 스레드에서 받은 메시지:",e.data)})),(yield navigator.serviceWorker.getRegistration("../service-worker.js"))?console.log("Service Worker is already registered."):yield navigator.serviceWorker.register("../service-worker.js")):console.log("Service Worker is not supported by browser."),yield navigator.serviceWorker.ready,setTimeout((()=>i(this,void 0,void 0,(function*(){yield this.showNotification("hello",{body:"hello"})}))),1e4)}))}static sendMessageToServiceWorker(e){return i(this,void 0,void 0,(function*(){navigator.serviceWorker.controller.postMessage({command:"message",payload:e})}))}static pushMessageToServiceWorker(e){return i(this,void 0,void 0,(function*(){}))}static showNotification(e,t){return i(this,void 0,void 0,(function*(){const i=yield navigator.serviceWorker.getRegistration("../service-worker.js");i?yield i.showNotification(e,t):console.log("Service Worker is not registered.")}))}constructor(){}}s.messageChannel=new MessageChannel,t.default=s},205:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getById=void 0,t.getById=e=>document.getElementById(e)}},t={};!function i(s){var o=t[s];if(void 0!==o)return o.exports;var n=t[s]={exports:{}};return e[s].call(n.exports,n,n.exports,i),n.exports}(414)})();