(()=>{"use strict";var e={95:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function a(e){try{c(i.next(e))}catch(e){o(e)}}function s(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((i=i.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,i&&(r=2&s[0]?i.return:s[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,s[1])).done)return r;switch(i=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,i=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){a.label=s[1];break}if(6===s[0]&&a.label<r[1]){a.label=r[1],r=s;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(s);break}r[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],i=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.Controller=void 0;var o=n(205),a=n(789),s=function(){function e(){var t=this;if(this.originFocusTime=0,this.originRelaxTime=0,this.focusTime=0,this.relaxTime=0,this.isFocus=!0,this.startTime=0,this.init=function(){(0,o.getById)("btn-start").addEventListener("click",t.startAction),(0,o.getById)("btn-end").addEventListener("click",t.end),(0,o.getById)("btn-relax-start").addEventListener("click",t.startRelax),(0,o.getById)("btn-focus-start").addEventListener("click",t.startFocus),(0,o.getById)("btn-info").addEventListener("click",t.showInfo),t.infoEle.addEventListener("click",t.closeInfo)},this.startAction=function(){""===t.focusEle.value||""===t.relaxEle.value||Number(t.focusEle.value)<=0||Number(t.relaxEle.value)<=0?alert("입력 값을 확인해주세요"):t.start()},this.start=function(){t.originFocusTime=t.focusTime=60*Number(t.focusEle.value),t.originRelaxTime=t.relaxTime=60*Number(t.relaxEle.value),t.updateTimeDisplay(t.focusTime),t.settingEle.classList.add("hide"),t.timerEle.classList.remove("hide"),t.startTime=Date.now(),t.timer=setInterval(t.timerAction,500)},this.end=function(){t.timerEle.classList.add("hide"),t.settingEle.classList.remove("hide"),clearInterval(t.timer)},this.timerAction=function(){return i(t,void 0,void 0,(function(){var e,t,n;return r(this,(function(i){switch(i.label){case 0:return e=(Date.now()-this.startTime)/1e3,null===(n=null===(t=navigator.serviceWorker)||void 0===t?void 0:t.controller)||void 0===n||n.postMessage({command:"1223"}),this.isFocus?(this.focusTime=this.originFocusTime-e,this.updateTimeDisplay(this.focusTime),this.focusTime<=0?[4,(new a.Audio).play(a.soundList.bell)]:[3,2]):[3,3];case 1:i.sent(),clearInterval(this.timer),this.autoEle.checked?this.startRelax():(0,o.getById)("btn-relax-start").classList.remove("hide"),i.label=2;case 2:return[3,5];case 3:return this.relaxTime=this.originRelaxTime-e,this.updateTimeDisplay(this.relaxTime),this.relaxTime<=0?[4,(new a.Audio).play(a.soundList.bell)]:[3,5];case 4:i.sent(),clearInterval(this.timer),this.autoEle.checked?this.startFocus():(0,o.getById)("btn-focus-start").classList.remove("hide"),i.label=5;case 5:return[2]}}))}))},this.startRelax=function(){t.startTime=Date.now(),t.isFocus=!1,t.relaxTime=60*Number(t.relaxEle.value),(0,o.getById)("btn-relax-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Relax",t.timer=setInterval(t.timerAction,500)},this.startFocus=function(){t.startTime=Date.now(),t.isFocus=!0,t.focusTime=60*Number(t.focusEle.value),(0,o.getById)("btn-focus-start").classList.add("hide"),(0,o.getById)("display-message").textContent="Focus",t.timer=setInterval(t.timerAction,500)},this.showInfo=function(){t.infoEle.classList.remove("hide")},this.closeInfo=function(){t.infoEle.classList.add("hide")},this.focusEle=(0,o.getById)("f_time"),this.relaxEle=(0,o.getById)("r_time"),this.autoEle=(0,o.getById)("auto"),this.settingEle=(0,o.getById)("setting"),this.timerEle=(0,o.getById)("timer"),this.infoEle=(0,o.getById)("info"),e.shared)return e.shared;e.shared=this}return e.prototype.updateTimeDisplay=function(e){var t=e<=0?0:e,n=Math.floor(t/60),i=Math.floor(t%60);(0,o.getById)("display-timer").textContent="".concat(String(n).padStart(2,"0"),":").concat(String(i).padStart(2,"0"))},e}();t.Controller=s},414:function(e,t,n){var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function a(e){try{c(i.next(e))}catch(e){o(e)}}function s(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((i=i.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,i&&(r=2&s[0]?i.return:s[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,s[1])).done)return r;switch(i=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,i=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){a.label=s[1];break}if(6===s[0]&&a.label<r[1]){a.label=r[1],r=s;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(s);break}r[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],i=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(95),a=n(316);window.onload=function(){return i(void 0,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:if("serviceWorker"in navigator&&navigator.serviceWorker.register("../serviceWorker.js").then((function(){})),a.Indicator.instance.setIndicator(),!("wakeLock"in navigator))return[3,4];null,e.label=1;case 1:return e.trys.push([1,3,,4]),[4,navigator.wakeLock.request("screen")];case 2:return e.sent().addEventListener("release",(function(){})),[3,4];case 3:return e.sent(),[3,4];case 4:return window.resizeTo(375,667),(new o.Controller).init(),[2]}}))}))}},789:function(e,t){var n=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(r,o){function a(e){try{c(i.next(e))}catch(e){o(e)}}function s(e){try{c(i.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((i=i.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,i&&(r=2&s[0]?i.return:s[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,s[1])).done)return r;switch(i=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,i=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){a.label=s[1];break}if(6===s[0]&&a.label<r[1]){a.label=r[1],r=s;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(s);break}r[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],i=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.soundList=t.Audio=void 0;var r,o=function(){function e(){if(this.baseUrl="/kutil/public/assets/sound",this.audioEle=document.createElement("audio"),e.shared)return e.shared;document.body.append(this.audioEle),this.audioEle.setAttribute("hidden","true"),e.shared=this}return e.prototype.play=function(e){return n(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:switch(e){case r.click:return[3,1];case r.bell:return[3,3]}return[3,5];case 1:return[4,this.click()];case 2:case 4:return t.sent(),[2];case 3:return[4,this.bell()];case 5:return[2]}}))}))},e.prototype.click=function(){return n(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return this.audioEle.src="".concat(this.baseUrl,"/click.mp3"),this.audioEle.setAttribute("type","audio/mpeg"),[4,this.audioEle.play()];case 1:return e.sent(),[2]}}))}))},e.prototype.bell=function(){return n(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return this.audioEle.src="".concat(this.baseUrl,"/bell.mp3"),this.audioEle.setAttribute("type","audio/mpeg"),[4,this.audioEle.play()];case 1:return e.sent(),[2]}}))}))},e}();t.Audio=o,function(e){e[e.click=0]="click",e[e.bell=1]="bell"}(r||(t.soundList=r={}))},316:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Indicator=void 0;var n=function(){function e(){this.setIndicator=function(){var e=document.createElement("div");e.id="indicator",e.classList.add("indicator"),document.body.appendChild(e)},this.hideIndicator=function(){var e;null===(e=document.getElementById("indicator"))||void 0===e||e.remove()}}return Object.defineProperty(e,"instance",{get:function(){return e._instance||(e._instance=new e),e._instance},enumerable:!1,configurable:!0}),e}();t.Indicator=n},205:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getById=void 0;t.getById=function(e){return document.getElementById(e)}}},t={};(function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports})(414)})();