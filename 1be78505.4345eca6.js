(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{171:function(e,t,r){"use strict";var n={};r.r(n),r.d(n,"getRequestBackend",(function(){return fe})),r.d(n,"isRequestBackendDefault",(function(){return pe})),r.d(n,"setRequestBackend",(function(){return he})),r.d(n,"Api",(function(){return ye})),r.d(n,"RequestMethod",(function(){return w})),r.d(n,"RequestEvent",(function(){return g})),r.d(n,"EventResultType",(function(){return k})),r.d(n,"CacheSource",(function(){return x})),r.d(n,"ResponseType",(function(){return E})),r.d(n,"isRequestError",(function(){return N})),r.d(n,"clearCache",(function(){return Ee})),r.d(n,"setCacheBackend",(function(){return xe})),r.d(n,"LocalStorageCacheBackend",(function(){return be})),r.d(n,"LocaleForageCacheBackend",(function(){return _e})),r.d(n,"AxiosRequestBackend",(function(){return Ce})),r.d(n,"FetchRequestBackend",(function(){return ue})),r.d(n,"CacheMiddleware",(function(){return Pe})),r.d(n,"LoggingMiddleware",(function(){return Be}));var o=r(0),i=r.n(o),u=function(e){var t;return"NetworkError"===e.name||"Network Error"===e.message||"NetworkError"===(null===(t=e.constructor)||void 0===t?void 0:t.name)},a=function(e){if(e.data&&"object"==typeof e.data){var t=e.data;if(t.constructor&&"ArrayBuffer"===t.constructor.name)try{var r=e.data=function(e,t){if("undefined"!=typeof TextDecoder)return new TextDecoder("utf-8").decode(e);var r,n=String.fromCharCode,o={}.toString,i=o.call(window.SharedArrayBuffer),u=o(),a=window.Uint8Array,s=a||Array,c=a?ArrayBuffer:s,l=c.isView||function(e){return e&&"length"in e},f=o.call(c.prototype),p=new(a?Uint16Array:s)(32),h=e;if(!l(h)){if((r=o.call(h))!==f&&r!==i&&r!==u)throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");h=a?new s(h):h||[]}for(var d="",y="",v=0,m=0|h.length,b=m-32|0,w=0,g=0,k=0,x=0,E=0,T=0,_=-1;v<m;){for(w=v<=b?32:m-v|0;T<w;v=v+1|0,T=T+1|0){switch((g=255&h[v])>>4){case 15:if((E=255&h[v=v+1|0])>>6!=2||247<g){v=v-1|0;break}k=(7&g)<<6|63&E,x=5,g=256;case 14:k<<=6,k|=(15&g)<<6|63&(E=255&h[v=v+1|0]),x=E>>6==2?x+4|0:24,g=g+256&768;case 13:case 12:k<<=6,k|=(31&g)<<6|63&(E=255&h[v=v+1|0]),x=x+7|0,v<m&&E>>6==2&&k>>x&&k<1114112?(g=k,0<=(k=k-65536|0)?(_=55296+(k>>10)|0,g=56320+(1023&k)|0,T<31?(p[T]=_,T=T+1|0,_=-1):(E=_,_=g,g=E)):w=w+1|0):(v=v-(g>>=8)-1|0,g=65533),x=0,k=0,w=v<=b?32:m-v|0;default:p[T]=g;continue;case 11:case 10:case 9:case 8:}p[T]=65533}if(y+=n(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8],p[9],p[10],p[11],p[12],p[13],p[14],p[15],p[16],p[17],p[18],p[19],p[20],p[21],p[22],p[23],p[24],p[25],p[26],p[27],p[28],p[29],p[30],p[31]),T<32&&(y=y.slice(0,T-32|0)),v<m){if(p[0]=_,T=~_>>>31,_=-1,y.length<d.length)continue}else-1!==_&&(y+=n(_));d+=y,y=""}return d}(t);e.data=JSON.parse(r)}catch(n){console.warn("Couldn't parse array buffer content to JSON response",n)}}},s=[[200,299],304],c=function(e,t){for(var r=0,n=null!=t?t:s;r<n.length;r++){var o=n[r];if(Array.isArray(o)){var i=o[0],u=o[1];if(e>=i&&e<=u)return!0}else if(!isNaN(o)&&e===o)return!0}return!1},l=Object.assign||function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(r[i]=o[i])}return r},f=function(e,t){var r=e.toString();return r.length>=t?r:"0".repeat(t-r.length)+r},p=function(){if("undefined"!=typeof window)return window.fetch.bind(window)},h=function(){},d=function(e,t){return new Promise((function(r){t>0?setTimeout((function(){r(e)}),t):r(e)}))},y=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},v=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},m=0,b=function(){function e(e,t,r,n,o){this.canceler=null,this.response=void 0,this.error=null,this.cacheInfo={cached:!1,source:null},this.cancelled=!1,this.backend=e,this.id=m++,this.host=t,this.computedConfig=r,l({},this.computedConfig.headers,{"Request-Id":this.id}),this.computedPath=n,this.key=this.generateKey(),this.stats={attempt:0,cached:!1},this.eventHandlers={},this.mocking=o,this.initMiddleware()}return Object.defineProperty(e.prototype,"method",{get:function(){return this.host.method},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"api",{get:function(){return this.host.api},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"baseUrl",{get:function(){return this.host.baseUrl},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"responseType",{get:function(){return this.host.responseType},enumerable:!1,configurable:!0}),e.prototype.initMiddleware=function(){for(var e=this.api.middleware,t=0;t<e.length;t++)for(var r=e[t],n=Object.keys(r),o=0;o<n.length;o++){var i=n[o],u=this.eventHandlers[i]||(this.eventHandlers[i]=[]),a=r[i];a&&u.push(a)}},e.prototype.generateKey=function(){var e=this.computedConfig,t=this.computedPath.trim(),r=[];if(e.query)for(var n=Object.keys(e.query),o=0;o<n.length;o++){var i=n[o];r.push(i+"="+e.query[i])}return r.length>0&&(t+="?"+r.join("&")),t},e.prototype.updateHeaders=function(e){return this.computedConfig.headers=l({},this.computedConfig.headers,e),this},e.prototype.updateQuery=function(e){return this.computedConfig.query=l(this.computedConfig.query||{},e),this},e.prototype.triggerEvent=function(e){return y(this,void 0,void 0,(function(){var t,r,n;return v(this,(function(o){switch(o.label){case 0:if(!(t=this.eventHandlers[e]))return[3,4];r=0,o.label=1;case 1:return r<t.length?[4,(0,t[r])(this)]:[3,4];case 2:if(n=o.sent())return[2,n];o.label=3;case 3:return r++,[3,1];case 4:return[2,void 0]}}))}))},e.prototype.addCanceller=function(e){this.canceler=e},e.prototype.cancel=function(){this.cancelled=!0,this.canceler&&this.canceler()},e}(),w={Post:"post",Get:"get",POST:"post",GET:"get",PUT:"put",DELETE:"delete"},g={BeforeSend:"beforeSend",Success:"success",Error:"error",UnrecoverableError:"unrecoverableError",BEFORE_SEND:"beforeSend",SUCCESS:"success",ERROR:"error",UNRECOVERABLE_ERROR:"unrecoverableError"},k={Respond:"respond",Retry:"retry",RESPOND:"respond",RETRY:"retry"},x={Api:"api",Local:"local",API:"api",LOCAL:"local"},E={Json:"json",Text:"text",ArrayBuffer:"arraybuffer",JSON:"json",TEXT:"text",ARRAY_BUFFER:"arraybuffer"};function T(e,t){"boolean"==typeof t&&(t={forever:t}),this._originalTimeouts=JSON.parse(JSON.stringify(e)),this._timeouts=e,this._options=t||{},this._maxRetryTime=t&&t.maxRetryTime||1/0,this._fn=null,this._errors=[],this._attempts=1,this._operationTimeout=null,this._operationTimeoutCb=null,this._timeout=null,this._operationStart=null,this._timer=null,this._options.forever&&(this._cachedTimeouts=this._timeouts.slice(0))}T.prototype.reset=function(){this._attempts=1,this._timeouts=this._originalTimeouts.slice(0)},T.prototype.stop=function(){this._timeout&&clearTimeout(this._timeout),this._timer&&clearTimeout(this._timer),this._timeouts=[],this._cachedTimeouts=null},T.prototype.retry=function(e){if(this._timeout&&clearTimeout(this._timeout),!e)return!1;var t=(new Date).getTime();if(e&&t-this._operationStart>=this._maxRetryTime)return this._errors.push(e),this._errors.unshift(new Error("RetryOperation timeout occurred")),!1;this._errors.push(e);var r=this._timeouts.shift();if(void 0===r){if(!this._cachedTimeouts)return!1;this._errors.splice(0,this._errors.length-1),r=this._cachedTimeouts.slice(-1)}var n=this;return this._timer=setTimeout((function(){n._attempts++,n._operationTimeoutCb&&(n._timeout=setTimeout((function(){n._operationTimeoutCb(n._attempts)}),n._operationTimeout),n._options.unref&&n._timeout.unref()),n._fn(n._attempts)}),r),this._options.unref&&this._timer.unref(),!0},T.prototype.attempt=function(e,t){this._fn=e,t&&(t.timeout&&(this._operationTimeout=t.timeout),t.cb&&(this._operationTimeoutCb=t.cb));var r=this;this._operationTimeoutCb&&(this._timeout=setTimeout((function(){r._operationTimeoutCb()}),r._operationTimeout)),this._operationStart=(new Date).getTime(),this._fn(this._attempts)},T.prototype.try=function(e){this.attempt(e)},T.prototype.start=function(e){this.attempt(e)},T.prototype.start=T.prototype.try,T.prototype.errors=function(){return this._errors},T.prototype.attempts=function(){return this._attempts},T.prototype.mainError=function(){if(0===this._errors.length)return null;for(var e={},t=null,r=0,n=0;n<this._errors.length;n++){var o=this._errors[n],i=o.message,u=(e[i]||0)+1;e[i]=u,u>=r&&(t=o,r=u)}return t};var _,R,S,C,O=T,q=function(){return(q=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},P=function(e){var t,r=function(e,t){var r=t.randomize?Math.random()+1:1,n=Math.round(r*Math.max(t.minTimeout,1)*Math.pow(t.factor,e));return n=Math.min(n,t.maxTimeout)},n=q({retries:10,factor:2,minTimeout:1e3,maxTimeout:1/0,randomize:!1},e);if(n.minTimeout>n.maxTimeout)throw new Error("minTimeout is greater than maxTimeout");for(var o=[],i=null!==(t=n.retries)&&void 0!==t?t:10,u=0;u<i;u++)o.push(r(u,n));return e&&e.forever&&!o.length&&o.push(r(i,n)),o.sort((function(e,t){return e-t})),o},j=function(e,t){return new Promise((function(r,n){var o=t||{};"randomize"in o||(o.randomize=!0);var i=function(e){var t=P(e);return new O(t,{forever:e&&(e.forever||e.retries===1/0),unref:e&&e.unref,maxRetryTime:e&&e.maxRetryTime})}(o),u=function(e){n(e||new Error("Aborted"))},a=function(e,t){e.bail?u(e):i.retry(e)?o.onRetry&&o.onRetry(e,t):n(i.mainError())};i.attempt((function(t){var n;try{n=e(u,t)}catch(o){return void a(o,t)}Promise.resolve(n).then(r).catch((function(e){a(e,t)}))}))}))},I="misc/unknown-error",A="request/network-error",B="request/invalid-status",U="request/invalid-config",N=function(e){return"isRequestError"in e},M=function(e){var t=e.error,r=e.response,n=e.code;return Object.assign(t,{name:"Error"===t.name?"RequestError":t.name,response:r,code:n,isRequestError:!0})},G=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},J=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},L=function(){function e(){}return e.prototype.convertResponse=function(e,t,r){return G(this,void 0,void 0,(function(){return J(this,(function(e){return[2,t]}))}))},e.prototype.extractResponseFromError=function(e){return G(this,void 0,void 0,(function(){var t;return J(this,(function(r){return"response"in e?[2,(t=e).response?t.response:null]:[2,void 0]}))}))},e.prototype.runRequest=function(e){var t,r,n,o;return G(this,void 0,void 0,(function(){var i,u,a,s,c,l,f,p;return J(this,(function(h){switch(h.label){case 0:if(!(i=null===(t=e.mocking)||void 0===t?void 0:t.handler))throw M({error:new Error("[api-def] Attempted to run mocked request without mocking function"),code:U});if(u={body:e.computedConfig.body,params:null!==(r=e.computedConfig.params)&&void 0!==r?r:{},query:e.computedConfig.query,headers:null!==(n=e.computedConfig.headers)&&void 0!==n?n:{}},a={statusCode:-1,response:void 0,status:function(e){return a.statusCode=e,a},send:function(e){return a.response=e,a}},!(null===(o=e.mocking)||void 0===o?void 0:o.delay))return[3,3];if(s=e.mocking.delay,c=void 0,"number"==typeof s)c=s;else{if(l=s[0],f=s[1],l>f)throw M({error:new Error("[api-def] Min delay cannot be greater than max delay"),code:U});c=function(e,t){var r=Math.ceil(e),n=Math.floor(t);return Math.floor(Math.random()*(n-r+1))+r}(l,f)}return p=d,[4,i(u,a)];case 1:return[4,p.apply(void 0,[h.sent(),c])];case 2:return h.sent(),[3,5];case 3:return[4,i(u,a)];case 4:h.sent(),h.label=5;case 5:if(void 0===a.response)throw M({error:new Error("[api-def] Mocked API did not respond"),code:U});return[2,{headers:{},data:a.response,status:a.statusCode}]}}))}))},e.prototype.makeRequest=function(e){return{canceler:h,promise:this.runRequest(e)}},e.prototype.getErrorInfo=function(e,t){},e}(),D=function(){return(D=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},F=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},W=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},H={},z={},V=new L,K=function(e,t,r){return F(void 0,void 0,void 0,(function(){var n,o,i,u,a,s,c,l,f,p;return W(this,(function(h){switch(h.label){case 0:if(n=e.computeConfig(t),!(o=r?V:fe()))throw new Error("[api-def] Please specify a backend you wish to use, this can be done either with 'setRequestBackend()'");if(i=new b(o,e,n,e.computePath(e.path,t),r),u=i.key,a=z[u])return[2,a];(s=(i.computedConfig||{}).lock)&&((c=H[s])&&c.id!==i.id&&c.cancel(),H[s]=i),h.label=1;case 1:return h.trys.push([1,4,5,6]),[4,z[u]=Q(i)];case 2:return l=h.sent(),[4,i.triggerEvent(g.Success)];case 3:return(f=h.sent())&&f.type===k.Respond&&(i.response=l=f.response),delete z[u],[2,l];case 4:throw p=h.sent(),delete z[u],p;case 5:return s&&delete H[s],[7];case 6:return[2]}}))}))},Q=function(e){return F(void 0,void 0,void 0,(function(){var t,r,n,o,i;return W(this,(function(s){switch(s.label){case 0:return[4,e.triggerEvent(g.BeforeSend)];case 1:return(t=s.sent())&&t.type===k.Respond?[2,e.response=t.response]:(r=(null===(i=e.computedConfig)||void 0===i?void 0:i.retry)||0,n={retries:r,minTimeout:1e3,maxTimeout:5e3,randomize:!0},e.stats.attempt=0,[4,j(o=function(t,r){return F(void 0,void 0,void 0,(function(){var n,i,s,l,f,p,h,d,y;return W(this,(function(v){switch(v.label){case 0:e.stats.attempt++,v.label=1;case 1:return v.trys.push([1,4,,8]),n=e.backend.makeRequest(e),i=n.promise,s=n.canceler,e.addCanceller(s),[4,i];case 2:return l=v.sent(),[4,Y(e,l)];case 3:if(f=v.sent(),!c(f.status,e.computedConfig.acceptableStatus))throw M({error:new Error("[api-def] Invalid response status code '"+f.status+"'"),response:f,code:B});return e.response=f,[2,f];case 4:return p=v.sent(),e.cancelled&&(p.isCancelledRequest=!0),[4,X(e,p)];case 5:return h=v.sent(),e.error=h,e.response=h.response,e.response&&a(e.response),[4,e.triggerEvent(g.Error)];case 6:if((null==(d=v.sent())?void 0:d.type)===k.Respond)return[2,d.response];if(u(h))throw h;return(null==d?void 0:d.type)===k.Retry?[2,o(t,r)]:[4,e.triggerEvent(g.UnrecoverableError)];case 7:return(y=v.sent())&&y.type===k.Respond?[2,y.response]:(t(h),[3,8]);case 8:return[2]}}))}))},n)]);case 2:return[2,s.sent()]}}))}))},Y=function(e,t,r){return F(void 0,void 0,void 0,(function(){var n;return W(this,(function(o){switch(o.label){case 0:return t?[4,e.backend.convertResponse(e,t,r)]:[3,2];case 1:return(n=o.sent())&&a(n),[2,n];case 2:return[2,t]}}))}))},X=function(e,t){return F(void 0,void 0,void 0,(function(){var r,n,o,i,a;return W(this,(function(s){switch(s.label){case 0:return N(t)?(r=t,[3,5]):[3,1];case 1:return[4,e.backend.extractResponseFromError(t)];case 2:return n=s.sent(),o=void 0,void 0===n?[3,4]:[4,Y(e,n,!0)];case 3:o=s.sent(),s.label=4;case 4:i=u(t)?A:I,o&&(c(o.status,e.computedConfig.acceptableStatus)||(i=B)),a=e.backend.getErrorInfo(t,o),r=M(D({error:t,response:o,code:i},a)),s.label=5;case 5:return[2,r]}}))}))},Z=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},$=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},ee=function(){function e(e,t){this.api=e,this.id=t.id,this.method=t.method,this.name=t.name||t.id,this.description=t.description,this.path=t.path,this.config=t.config,this.responseType=t.responseType||E.Json,this.mocking=t.mocking}return e.prototype.submit=function(e){var t,r;return Z(this,void 0,void 0,(function(){var n,o;return $(this,(function(i){if(n=!1,(o=this.api.mocking)&&(null!==(t="function"==typeof o.enabled?o.enabled():o.enabled)&&void 0!==t&&t)){if(!(null===(r=this.mocking)||void 0===r?void 0:r.handler))throw new Error("[api-def] Endpoint for '"+this.path+"' has no mocking");n=!0}return[2,K(this,e,n?this.mocking:null)]}))}))},e.prototype.computePath=function(e,t){var r=e.startsWith("/")?e:"/"+e;if(t.params)for(var n=Object.keys(t.params),o=0;o<n.length;o++){var i=n[o];r=r.replace(":"+i,t.params[i])}if(r.includes(":"))throw new Error("[api-def] Not all path params have been resolved: '"+r+"'");return r},Object.defineProperty(e.prototype,"baseUrl",{get:function(){return this.api.baseUrl},enumerable:!1,configurable:!0}),e.prototype.computeConfig=function(e){for(var t=this.api.getConfig(),r=l({},t,this.config,e),n=0,o=["headers"];n<o.length;n++){var i=o[n];r[i]=l({},t[i],this.config?this.config[i]:void 0,e[i])}return r},e}(),te=function(){function e(e){this.api=e}return e.prototype.queryOf=function(){return this},e.prototype.paramsOf=function(){return this},e.prototype.bodyOf=function(){return this},e.prototype.responseOf=function(){return this},e.prototype.build=function(e){var t=new ee(this.api,e);return this.api.endpoints[t.id]=t,t},e}(),re=(_=function(e,t){return(_=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}_(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),ne=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},oe=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},ie=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return re(t,e),t}(Error),ue=function(){function e(e){this.fetch=p(),void 0!==e&&(this.fetch=e)}return e.prototype.extractResponseFromError=function(e){return ne(this,void 0,void 0,(function(){var t;return oe(this,(function(r){return"response"in e?[2,(t=e).response?t.response:null]:[2,void 0]}))}))},e.prototype.inferResponseType=function(e){var t=e.headers.get("Content-Type");return(null==t?void 0:t.startsWith("json"))?"json":"text"},e.prototype.convertResponse=function(e,t,r){return ne(this,void 0,void 0,(function(){var n,o,i,u;return oe(this,(function(a){switch(a.label){case 0:o=r?this.inferResponseType(t):e.responseType,a.label=1;case 1:return a.trys.push([1,8,,9]),t.__text?[3,3]:(i=t,[4,t.clone().text()]);case 2:i.__text=a.sent(),a.label=3;case 3:return o!==E.Text?[3,4]:(n=t.__text,[3,7]);case 4:return o!==E.ArrayBuffer?[3,6]:[4,t.clone().arrayBuffer()];case 5:return n=a.sent(),[3,7];case 6:o===E.Json&&(n=JSON.parse(t.__text)),a.label=7;case 7:return[3,9];case 8:throw a.sent(),Object.assign(new Error("[api-def] Invalid '"+e.responseType+"' response, got: '"+t.__text+"'"),{response:t});case 9:return u=t.status,[2,{data:n,status:u,headers:t.headers}]}}))}))},e.prototype.makeRequest=function(e){var t;if(!this.fetch)throw new Error("[api-def] No fetch impl was provided to FetchRequestBackend");var r=e.computedConfig,n=e.baseUrl.endsWith("/")?e.baseUrl:e.baseUrl+"/";n+=e.computedPath.startsWith("/")?e.computedPath.substring(1):e.computedPath;var o=new URL(n);if(r.query)for(var i=Object.keys(r.query),u=0;u<i.length;u++){var a=i[u];o.searchParams.append(a,(null===(t=r.query[a])||void 0===t?void 0:t.toString())||"")}var s=AbortController&&new AbortController,c=s?s.signal:void 0,f=!1,p=!1,h=null!==r.body&&"object"==typeof r.body,d=l({"Content-Type":h?"application/json;charset=utf-8":"application/x-www-form-urlencoded"},r.headers),y=Object.keys(d).reduce((function(e,t){var r=d[t];return void 0!==r&&(e[t]=r),e}),{});return{promise:this.fetch(o.href,{method:e.method,body:h?JSON.stringify(r.body):r.body,headers:y,mode:"cors",signal:c}).then((function(e){if(p=!0,!e.ok){var t=new ie("Fetch failed");throw t.response=e,t}if(f)throw new Error("[api-def] Request was aborted");return e})),canceler:c?function(){return!p&&s.abort()}:function(){console.warn("Request aborted"),f=!0}}},e.prototype.getErrorInfo=function(e,t){},e}(),ae=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},se=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},ce=p()?new ue:null,le=!0,fe=function(){return ce},pe=function(){return le},he=function(e){le=!1,ce=e},de=function(){function e(e,t,r){this.responseType=E.Json,this.api=e,this.method=r,this.path=t}return Object.defineProperty(e.prototype,"baseUrl",{get:function(){return this.api.baseUrl},enumerable:!1,configurable:!0}),e.prototype.computeConfig=function(e){var t=this.api.getConfig();return l({},t,e)},e.prototype.computePath=function(e,t){return e.startsWith("/")?e:"/"+e},e}(),ye=function(){function e(e){var t,r=this;this.endpoints={},this.hotRequest=function(e){return function(t,n){return ae(r,void 0,void 0,(function(){return se(this,(function(r){switch(r.label){case 0:return[4,K(new de(this,t,e),n,null)];case 1:return[2,r.sent()]}}))}))}},this.get=this.hotRequest(w.GET),this.post=this.hotRequest(w.POST),this.put=this.hotRequest(w.PUT),this.delete=this.hotRequest(w.DELETE),this.name=e.name,this.baseUrl=e.baseUrl,this.middleware=e.middleware||[],this.endpoints={},this.config=e.config,this.mocking=null!==(t=e.mocking)&&void 0!==t?t:void 0}return e.prototype.endpoint=function(){return new te(this)},e.prototype.getConfig=function(){return("function"==typeof this.config?this.config():this.config)||{}},e}(),ve=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},me=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},be=function(){function e(){}return e.prototype.clear=function(){return ve(this,void 0,void 0,(function(){return me(this,(function(e){return localStorage.clear(),[2]}))}))},e.prototype.getItem=function(e){return ve(this,void 0,void 0,(function(){var t;return me(this,(function(r){return[2,(t=localStorage.getItem(e))?JSON.parse(t):null]}))}))},e.prototype.removeItem=function(e){return ve(this,void 0,void 0,(function(){return me(this,(function(t){return localStorage.removeItem(e),[2]}))}))},e.prototype.setItem=function(e,t){return ve(this,void 0,void 0,(function(){return me(this,(function(r){return localStorage.setItem(e,JSON.stringify(t)),[2]}))}))},e}(),we=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},ge=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},ke=new be,xe=function(e){ke=e},Ee=function(){return ke.clear()},Te=function(e,t,r){return we(void 0,void 0,void 0,(function(){var n;return ge(this,(function(o){switch(o.label){case 0:return n={data:t,expiry:void 0===r||isNaN(r)?null:r},[4,ke.setItem(e,n)];case 1:return o.sent(),[2,t]}}))}))},_e=function(){function e(e){this.store=e.createInstance({name:"requestCache"})}return e.prototype.clear=function(){return this.store.clear()},e.prototype.getItem=function(e){return this.store.getItem(e)},e.prototype.removeItem=function(e){return this.store.removeItem(e)},e.prototype.setItem=function(e,t){return this.store.setItem(e,t)},e}(),Re=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},Se=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},Ce=function(){function e(e){R=e}return e.prototype.extractResponseFromError=function(e){return Re(this,void 0,void 0,(function(){return Se(this,(function(t){return function(e){return"isAxiosError"in e}(e)?[2,e.response?e.response:null]:[2,void 0]}))}))},e.prototype.convertResponse=function(e,t){return Re(this,void 0,void 0,(function(){return Se(this,(function(e){return[2,t]}))}))},e.prototype.makeRequest=function(e){var t=e.computedConfig,r=null;return{promise:R({method:e.method,baseURL:e.baseUrl,url:e.computedPath,data:t.body||{},params:t.query||{},headers:t.headers||{},responseType:e.responseType,cancelToken:new R.CancelToken((function(e){r=e}))}),canceler:function(){return r&&r()}}},e.prototype.getErrorInfo=function(e,t){},e}(),Oe=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{s(n.next(e))}catch(t){i(t)}}function a(e){try{s(n.throw(e))}catch(t){i(t)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}s((n=n.apply(e,t||[])).next())}))},qe=function(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},Pe=function(e){var t;return void 0===e&&(e={}),(t={})[g.Success]=function(t){return Oe(void 0,void 0,void 0,(function(){var r,n,o;return qe(this,(function(i){switch(i.label){case 0:return t.method!==w.Get?[2]:(r=(t.computedConfig||{}).cache,n=!e.predicate||e.predicate(),r&&n?(o="number"==typeof r?r:e.defaultExpiry||9e5,[4,Te(t.key,t.response,o)]):[3,2]);case 1:i.sent(),i.label=2;case 2:return[2]}}))}))},t[g.BeforeSend]=function(t){return Oe(void 0,void 0,void 0,(function(){var r,n,o;return qe(this,(function(i){switch(i.label){case 0:return t.method!==w.Get?[2]:(r=(t.computedConfig||{}).cache,n=!e.predicate||e.predicate(),r&&n&&r?[4,(u=t.key,we(void 0,void 0,void 0,(function(){var e;return ge(this,(function(t){switch(t.label){case 0:return[4,ke.getItem(u)];case 1:return(e=t.sent())?"number"!=typeof e.expiry?[3,3]:Date.now()>=e.expiry?[4,ke.removeItem(u)]:[3,3]:[2,void 0];case 2:return t.sent(),[2,void 0];case 3:return[2,e.data]}}))})))]:[3,2]);case 1:if(o=i.sent())return t.stats.cached={is:!0,by:x.Local},t.cacheInfo.source=x.Local,t.cacheInfo.cached=!0,[2,{type:k.Respond,response:o}];i.label=2;case 2:return!1===r&&(t.updateQuery({_bust:Math.floor(9e3*Math.random())+1e3}),t.updateHeaders({Pragma:"no-cache, no-store, must-revalidate","Cache-Control":"no-cache, no-store, must-revalidate"})),[2]}var u}))}))},t};!function(e){e[e.Info=0]="Info",e[e.Success=1]="Success",e[e.Error=2]="Error",e[e.Warn=3]="Warn"}(C||(C={}));var je=((S={})[C.Error]="#c8646c",S[C.Info]="#85a6c7",S[C.Success]="#a9c490",S[C.Warn]="#d19a66",S),Ie=function(e){if(!e.response)return u(e)?{message:"network issue",error:e}:function(e){return"isCancelledRequest"in e}(e)?{message:"cancelled",error:e}:{message:"client-side error",error:e};var t=e.response,r=t.status,n=t.data,o=null==n?void 0:n.code;return{message:"responded with "+r+(o?" ("+o+")":""),response:e.response}},Ae=function(e,t,r,n,o){if("function"!=typeof n.predicate||n.predicate()){var i,u=e.computedPath,a=je[t],s=(i=new Date,f(i.getHours(),2)+":"+f(i.getMinutes(),2)+":"+f(i.getSeconds(),2)+"."+f(i.getMilliseconds(),3)),c=["%cnetwork %c["+e.api.name+"] "+e.method.toUpperCase()+" "+u+" %c"+r+" %c@ "+s,"color:gray","color:auto","color:"+a,"color:gray"];console.groupCollapsed.apply(console,c),console.log(l({context:e},o||{})),console.groupEnd()}},Be=function(e){var t;return void 0===e&&(e={}),(t={})[g.BeforeSend]=function(t){Ae(t,C.Info,t.stats.attempt>1?"retrying":"sending",e)},t[g.Success]=function(t){var r,n=t.cacheInfo.source;Ae(t,C.Success,"responded with "+(null===(r=t.response)||void 0===r?void 0:r.status)+(n?" (cached by "+n+")":""),e)},t[g.Error]=function(t){if(t.error){var r=Ie(t.error),n=r.error,o=r.message;Ae(t,C.Warn,"error on attempt "+t.stats.attempt+" - "+o,e,{error:n})}},t[g.UnrecoverableError]=function(t){if(t.error){var r=Ie(t.error),n=r.error,o=r.message;Ae(t,C.Error,"failed - "+o,e,{error:n})}},t},Ue=r(173),Ne=Object.assign({React:i.a},i.a,{useAsyncState:Ue.a},n);t.a=Ne}}]);