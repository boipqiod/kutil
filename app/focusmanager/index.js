(()=>{"use strict";var t={95:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{c(s.next(t))}catch(t){n(t)}}function a(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Controller=void 0;const o=i(205),n=i(789),r=i(520);class a{constructor(){if(this.originFocusTime=0,this.originRelaxTime=0,this.focusTime=0,this.relaxTime=0,this.isFocus=!0,this.startTime=0,this.init=()=>{(0,o.getById)("btn-start").addEventListener("click",this.startAction),(0,o.getById)("btn-end").addEventListener("click",this.end),(0,o.getById)("btn-relax-start").addEventListener("click",this.startRelax),(0,o.getById)("btn-focus-start").addEventListener("click",this.startFocus),(0,o.getById)("btn-info").addEventListener("click",this.showInfo),this.infoEle.addEventListener("click",this.closeInfo)},this.startAction=()=>{r.default.sendMessageToServiceWorker("hello").then((t=>console.log(t))),""===this.focusEle.value||""===this.relaxEle.value||Number(this.focusEle.value)<=0||Number(this.relaxEle.value)<=0?alert("입력 값을 확인해주세요"):this.start()},this.start=()=>{this.originFocusTime=this.focusTime=60*Number(this.focusEle.value),this.originRelaxTime=this.relaxTime=60*Number(this.relaxEle.value),this.updateTimeDisplay(this.focusTime),this.settingEle.classList.add("hide"),this.timerEle.classList.remove("hide"),this.startTime=Date.now(),this.timer=setInterval(this.timerAction,500)},this.end=()=>{this.timerEle.classList.add("hide"),this.settingEle.classList.remove("hide"),clearInterval(this.timer)},this.timerAction=()=>s(this,void 0,void 0,(function*(){const t=(Date.now()-this.startTime)/1e3;this.isFocus?(this.focusTime=this.originFocusTime-t,this.updateTimeDisplay(this.focusTime),this.focusTime<=0&&(yield(new n.Audio).play(n.soundList.bell),clearInterval(this.timer),this.autoEle.checked?this.startRelax():(0,o.getById)("btn-relax-start").classList.remove("hide"))):(this.relaxTime=this.originRelaxTime-t,this.updateTimeDisplay(this.relaxTime),this.relaxTime<=0&&(yield(new n.Audio).play(n.soundList.bell),clearInterval(this.timer),this.autoEle.checked?this.startFocus():(0,o.getById)("btn-focus-start").classList.remove("hide")))})),this.startRelax=()=>{this.startTime=Date.now(),this.isFocus=!1,this.relaxTime=60*Number(this.relaxEle.value),(0,o.getById)("btn-relax-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Relax",this.timer=setInterval(this.timerAction,500)},this.startFocus=()=>{this.startTime=Date.now(),this.isFocus=!0,this.focusTime=60*Number(this.focusEle.value),(0,o.getById)("btn-focus-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Focus",this.timer=setInterval(this.timerAction,500)},this.showInfo=()=>{this.infoEle.classList.remove("hide")},this.closeInfo=()=>{this.infoEle.classList.add("hide")},this.focusEle=(0,o.getById)("f_time"),this.relaxEle=(0,o.getById)("r_time"),this.autoEle=(0,o.getById)("auto"),this.settingEle=(0,o.getById)("setting"),this.timerEle=(0,o.getById)("timer"),this.infoEle=(0,o.getById)("info"),a.shared)return a.shared;a.shared=this}updateTimeDisplay(t){const e=t<=0?0:t,i=Math.floor(e/60),s=Math.floor(e%60);(0,o.getById)("display-timer").textContent=`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`}}e.Controller=a},414:function(t,e,i){var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{c(s.next(t))}catch(t){n(t)}}function a(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const o=i(95),n=i(316),r=i(520);window.onload=()=>s(void 0,void 0,void 0,(function*(){n.Indicator.instance.setIndicator();const t=yield Notification.requestPermission();console.log("notification",t),yield r.default.registerServiceWorker(),(new o.Controller).init(),n.Indicator.instance.hideIndicator()}))},789:function(t,e){var i,s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{c(s.next(t))}catch(t){n(t)}}function a(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.soundList=e.Audio=void 0;class o{constructor(){if(this.baseUrl="/kutil/public/assets/sound",this.audioEle=document.createElement("audio"),o.shared)return o.shared;document.body.append(this.audioEle),this.audioEle.setAttribute("hidden","true"),o.shared=this}play(t){return s(this,void 0,void 0,(function*(){switch(t){case i.click:return void(yield this.click());case i.bell:return void(yield this.bell())}}))}click(){return s(this,void 0,void 0,(function*(){this.audioEle.src=`${this.baseUrl}/click.mp3`,this.audioEle.setAttribute("type","audio/mpeg"),yield this.audioEle.play()}))}bell(){return s(this,void 0,void 0,(function*(){this.audioEle.src=`${this.baseUrl}/bell.mp3`,this.audioEle.setAttribute("type","audio/mpeg"),yield this.audioEle.play()}))}}e.Audio=o,function(t){t[t.click=0]="click",t[t.bell=1]="bell"}(i||(e.soundList=i={}))},316:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Indicator=void 0;class i{static get instance(){return i._instance||(i._instance=new i),i._instance}constructor(){this.setIndicator=()=>{const t=document.createElement("div");t.id="indicator",t.classList.add("indicator"),document.body.appendChild(t)},this.hideIndicator=()=>{var t;null===(t=document.getElementById("indicator"))||void 0===t||t.remove()}}}e.Indicator=i},520:function(t,e){var i=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function r(t){try{c(s.next(t))}catch(t){n(t)}}function a(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});class s{static registerServiceWorker(){return i(this,void 0,void 0,(function*(){yield navigator.serviceWorker.ready,"serviceWorker"in navigator?(navigator.serviceWorker.addEventListener("message",(function(t){console.log("메인 스레드에서 받은 메시지:",t.data)})),(yield navigator.serviceWorker.getRegistration("../service-worker.js"))?console.log("Service Worker is already registered."):yield navigator.serviceWorker.register("../service-worker.js")):console.log("Service Worker is not supported by browser."),yield this.showNotification("hello",{body:"hello"})}))}static sendMessageToServiceWorker(t){return i(this,void 0,void 0,(function*(){navigator.serviceWorker.controller.postMessage({command:"message",payload:t})}))}static pushMessageToServiceWorker(t){return i(this,void 0,void 0,(function*(){}))}static showNotification(t,e){return i(this,void 0,void 0,(function*(){const i=yield navigator.serviceWorker.getRegistration("../service-worker.js");i?yield i.showNotification(t,e):console.log("Service Worker is not registered.")}))}constructor(){}}s.messageChannel=new MessageChannel,e.default=s},205:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getById=void 0,e.getById=t=>document.getElementById(t)}},e={};!function i(s){var o=e[s];if(void 0!==o)return o.exports;var n=e[s]={exports:{}};return t[s].call(n.exports,n,n.exports,i),n.exports}(414)})();