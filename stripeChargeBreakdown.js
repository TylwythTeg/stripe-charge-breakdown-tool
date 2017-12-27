/* money.js 0.2, MIT license, http://openexchangerates.github.io/money.js */
(function(g,j){var b=function(a){return new i(a)};b.version="0.1.3";var c=g.fxSetup||{rates:{},base:""};b.rates=c.rates;b.base=c.base;b.settings={from:c.from||b.base,to:c.to||b.base};var h=b.convert=function(a,e){if("object"===typeof a&&a.length){for(var d=0;d<a.length;d++)a[d]=h(a[d],e);return a}e=e||{};if(!e.from)e.from=b.settings.from;if(!e.to)e.to=b.settings.to;var d=e.to,c=e.from,f=b.rates;f[b.base]=1;if(!f[d]||!f[c])throw"fx error";d=c===b.base?f[d]:d===b.base?1/f[c]:f[d]*(1/f[c]);return a*d},i=function(a){"string"===typeof a?(this._v=parseFloat(a.replace(/[^0-9-.]/g,"")),this._fx=a.replace(/([^A-Za-z])/g,"")):this._v=a},c=b.prototype=i.prototype;c.convert=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this._v);return h.apply(b,a)};c.from=function(a){a=b(h(this._v,{from:a,to:b.base}));a._fx=b.base;return a};c.to=function(a){return h(this._v,{from:this._fx?this._fx:b.settings.from,to:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=b;exports.fx=fx}else"function"===typeof define&&define.amd?define([],function(){return b}):(b.noConflict=function(a){return function(){g.fx=a;b.noConflict=j;return b}}(g.fx),g.fx=b)})(this);

/* decimal.js v7.2.3 https://github.com/MikeMcl/decimal.js/LICENCE */
!function(n){"use strict";function e(n){var e,i,t,r=n.length-1,s="",o=n[0];if(r>0){for(s+=o,e=1;r>e;e++)t=n[e]+"",i=Rn-t.length,i&&(s+=d(i)),s+=t;o=n[e],t=o+"",i=Rn-t.length,i&&(s+=d(i))}else if(0===o)return"0";for(;o%10===0;)o/=10;return s+o}function i(n,e,i){if(n!==~~n||e>n||n>i)throw Error(En+n)}function t(n,e,i,t){var r,s,o,u;for(s=n[0];s>=10;s/=10)--e;return--e<0?(e+=Rn,r=0):(r=Math.ceil((e+1)/Rn),e%=Rn),s=On(10,Rn-e),u=n[r]%s|0,null==t?3>e?(0==e?u=u/100|0:1==e&&(u=u/10|0),o=4>i&&99999==u||i>3&&49999==u||5e4==u||0==u):o=(4>i&&u+1==s||i>3&&u+1==s/2)&&(n[r+1]/s/100|0)==On(10,e-2)-1||(u==s/2||0==u)&&0==(n[r+1]/s/100|0):4>e?(0==e?u=u/1e3|0:1==e?u=u/100|0:2==e&&(u=u/10|0),o=(t||4>i)&&9999==u||!t&&i>3&&4999==u):o=((t||4>i)&&u+1==s||!t&&i>3&&u+1==s/2)&&(n[r+1]/s/1e3|0)==On(10,e-3)-1,o}function r(n,e,i){for(var t,r,s=[0],o=0,u=n.length;u>o;){for(r=s.length;r--;)s[r]*=e;for(s[0]+=wn.indexOf(n.charAt(o++)),t=0;t<s.length;t++)s[t]>i-1&&(void 0===s[t+1]&&(s[t+1]=0),s[t+1]+=s[t]/i|0,s[t]%=i)}return s.reverse()}function s(n,e){var i,t,r=e.d.length;32>r?(i=Math.ceil(r/3),t=Math.pow(4,-i).toString()):(i=16,t="2.3283064365386962890625e-10"),n.precision+=i,e=E(n,1,e.times(t),new n(1));for(var s=i;s--;){var o=e.times(e);e=o.times(o).minus(o).times(8).plus(1)}return n.precision-=i,e}function o(n,e,i,t){var r,s,o,u,c,f,a,h,d,l=n.constructor;n:if(null!=e){if(h=n.d,!h)return n;for(r=1,u=h[0];u>=10;u/=10)r++;if(s=e-r,0>s)s+=Rn,o=e,a=h[d=0],c=a/On(10,r-o-1)%10|0;else if(d=Math.ceil((s+1)/Rn),u=h.length,d>=u){if(!t)break n;for(;u++<=d;)h.push(0);a=c=0,r=1,s%=Rn,o=s-Rn+1}else{for(a=u=h[d],r=1;u>=10;u/=10)r++;s%=Rn,o=s-Rn+r,c=0>o?0:a/On(10,r-o-1)%10|0}if(t=t||0>e||void 0!==h[d+1]||(0>o?a:a%On(10,r-o-1)),f=4>i?(c||t)&&(0==i||i==(n.s<0?3:2)):c>5||5==c&&(4==i||t||6==i&&(s>0?o>0?a/On(10,r-o):0:h[d-1])%10&1||i==(n.s<0?8:7)),1>e||!h[0])return h.length=0,f?(e-=n.e+1,h[0]=On(10,(Rn-e%Rn)%Rn),n.e=-e||0):h[0]=n.e=0,n;if(0==s?(h.length=d,u=1,d--):(h.length=d+1,u=On(10,Rn-s),h[d]=o>0?(a/On(10,r-o)%On(10,o)|0)*u:0),f)for(;;){if(0==d){for(s=1,o=h[0];o>=10;o/=10)s++;for(o=h[0]+=u,u=1;o>=10;o/=10)u++;s!=u&&(n.e++,h[0]==Pn&&(h[0]=1));break}if(h[d]+=u,h[d]!=Pn)break;h[d--]=0,u=1}for(s=h.length;0===h[--s];)h.pop()}return bn&&(n.e>l.maxE?(n.d=null,n.e=NaN):n.e<l.minE&&(n.e=0,n.d=[0])),n}function u(n,i,t){if(!n.isFinite())return v(n);var r,s=n.e,o=e(n.d),u=o.length;return i?(t&&(r=t-u)>0?o=o.charAt(0)+"."+o.slice(1)+d(r):u>1&&(o=o.charAt(0)+"."+o.slice(1)),o=o+(n.e<0?"e":"e+")+n.e):0>s?(o="0."+d(-s-1)+o,t&&(r=t-u)>0&&(o+=d(r))):s>=u?(o+=d(s+1-u),t&&(r=t-s-1)>0&&(o=o+"."+d(r))):((r=s+1)<u&&(o=o.slice(0,r)+"."+o.slice(r)),t&&(r=t-u)>0&&(s+1===u&&(o+="."),o+=d(r))),o}function c(n,e){var i=n[0];for(e*=Rn;i>=10;i/=10)e++;return e}function f(n,e,i){if(e>Un)throw bn=!0,i&&(n.precision=i),Error(Mn);return o(new n(mn),e,1,!0)}function a(n,e,i){if(e>_n)throw Error(Mn);return o(new n(vn),e,i,!0)}function h(n){var e=n.length-1,i=e*Rn+1;if(e=n[e]){for(;e%10==0;e/=10)i--;for(e=n[0];e>=10;e/=10)i++}return i}function d(n){for(var e="";n--;)e+="0";return e}function l(n,e,i,t){var r,s=new n(1),o=Math.ceil(t/Rn+4);for(bn=!1;;){if(i%2&&(s=s.times(e),q(s.d,o)&&(r=!0)),i=qn(i/2),0===i){i=s.d.length-1,r&&0===s.d[i]&&++s.d[i];break}e=e.times(e),q(e.d,o)}return bn=!0,s}function p(n){return 1&n.d[n.d.length-1]}function g(n,e,i){for(var t,r=new n(e[0]),s=0;++s<e.length;){if(t=new n(e[s]),!t.s){r=t;break}r[i](t)&&(r=t)}return r}function w(n,i){var r,s,u,c,f,a,h,d=0,l=0,p=0,g=n.constructor,w=g.rounding,m=g.precision;if(!n.d||!n.d[0]||n.e>17)return new g(n.d?n.d[0]?n.s<0?0:1/0:1:n.s?n.s<0?0:n:NaN);for(null==i?(bn=!1,h=m):h=i,a=new g(.03125);n.e>-2;)n=n.times(a),p+=5;for(s=Math.log(On(2,p))/Math.LN10*2+5|0,h+=s,r=c=f=new g(1),g.precision=h;;){if(c=o(c.times(n),h,1),r=r.times(++l),a=f.plus(Sn(c,r,h,1)),e(a.d).slice(0,h)===e(f.d).slice(0,h)){for(u=p;u--;)f=o(f.times(f),h,1);if(null!=i)return g.precision=m,f;if(!(3>d&&t(f.d,h-s,w,d)))return o(f,g.precision=m,w,bn=!0);g.precision=h+=10,r=c=a=new g(1),l=0,d++}f=a}}function m(n,i){var r,s,u,c,a,h,d,l,p,g,w,v=1,N=10,b=n,x=b.d,E=b.constructor,M=E.rounding,y=E.precision;if(b.s<0||!x||!x[0]||!b.e&&1==x[0]&&1==x.length)return new E(x&&!x[0]?-1/0:1!=b.s?NaN:x?0:b);if(null==i?(bn=!1,p=y):p=i,E.precision=p+=N,r=e(x),s=r.charAt(0),!(Math.abs(c=b.e)<15e14))return l=f(E,p+2,y).times(c+""),b=m(new E(s+"."+r.slice(1)),p-N).plus(l),E.precision=y,null==i?o(b,y,M,bn=!0):b;for(;7>s&&1!=s||1==s&&r.charAt(1)>3;)b=b.times(n),r=e(b.d),s=r.charAt(0),v++;for(c=b.e,s>1?(b=new E("0."+r),c++):b=new E(s+"."+r.slice(1)),g=b,d=a=b=Sn(b.minus(1),b.plus(1),p,1),w=o(b.times(b),p,1),u=3;;){if(a=o(a.times(w),p,1),l=d.plus(Sn(a,new E(u),p,1)),e(l.d).slice(0,p)===e(d.d).slice(0,p)){if(d=d.times(2),0!==c&&(d=d.plus(f(E,p+2,y).times(c+""))),d=Sn(d,new E(v),p,1),null!=i)return E.precision=y,d;if(!t(d.d,p-N,M,h))return o(d,E.precision=y,M,bn=!0);E.precision=p+=N,l=a=b=Sn(g.minus(1),g.plus(1),p,1),w=o(b.times(b),p,1),u=h=1}d=l,u+=2}}function v(n){return String(n.s*n.s/0)}function N(n,e){var i,t,r;for((i=e.indexOf("."))>-1&&(e=e.replace(".","")),(t=e.search(/e/i))>0?(0>i&&(i=t),i+=+e.slice(t+1),e=e.substring(0,t)):0>i&&(i=e.length),t=0;48===e.charCodeAt(t);t++);for(r=e.length;48===e.charCodeAt(r-1);--r);if(e=e.slice(t,r)){if(r-=t,n.e=i=i-t-1,n.d=[],t=(i+1)%Rn,0>i&&(t+=Rn),r>t){for(t&&n.d.push(+e.slice(0,t)),r-=Rn;r>t;)n.d.push(+e.slice(t,t+=Rn));e=e.slice(t),t=Rn-e.length}else t-=r;for(;t--;)e+="0";n.d.push(+e),bn&&(n.e>n.constructor.maxE?(n.d=null,n.e=NaN):n.e<n.constructor.minE&&(n.e=0,n.d=[0]))}else n.e=0,n.d=[0];return n}function b(n,e){var i,t,s,o,u,f,a,h,d;if("Infinity"===e||"NaN"===e)return+e||(n.s=NaN),n.e=NaN,n.d=null,n;if(An.test(e))i=16,e=e.toLowerCase();else if(Fn.test(e))i=2;else{if(!Dn.test(e))throw Error(En+e);i=8}for(o=e.search(/p/i),o>0?(a=+e.slice(o+1),e=e.substring(2,o)):e=e.slice(2),o=e.indexOf("."),u=o>=0,t=n.constructor,u&&(e=e.replace(".",""),f=e.length,o=f-o,s=l(t,new t(i),o,2*o)),h=r(e,i,Pn),d=h.length-1,o=d;0===h[o];--o)h.pop();return 0>o?new t(0*n.s):(n.e=c(h,d),n.d=h,bn=!1,u&&(n=Sn(n,s,4*f)),a&&(n=n.times(Math.abs(a)<54?Math.pow(2,a):Nn.pow(2,a))),bn=!0,n)}function x(n,e){var i,t=e.d.length;if(3>t)return E(n,2,e,e);i=1.4*Math.sqrt(t),i=i>16?16:0|i,e=e.times(Math.pow(5,-i)),e=E(n,2,e,e);for(var r,s=new n(5),o=new n(16),u=new n(20);i--;)r=e.times(e),e=e.times(s.plus(r.times(o.times(r).minus(u))));return e}function E(n,e,i,t,r){var s,o,u,c,f=1,a=n.precision,h=Math.ceil(a/Rn);for(bn=!1,c=i.times(i),u=new n(t);;){if(o=Sn(u.times(c),new n(e++*e++),a,1),u=r?t.plus(o):t.minus(o),t=Sn(o.times(c),new n(e++*e++),a,1),o=u.plus(t),void 0!==o.d[h]){for(s=h;o.d[s]===u.d[s]&&s--;);if(-1==s)break}s=u,u=t,t=o,o=s,f++}return bn=!0,o.d.length=h+1,o}function M(n,e){var i,t=e.s<0,r=a(n,n.precision,1),s=r.times(.5);if(e=e.abs(),e.lte(s))return ln=t?4:1,e;if(i=e.divToInt(r),i.isZero())ln=t?3:2;else{if(e=e.minus(i.times(r)),e.lte(s))return ln=p(i)?t?2:3:t?4:1,e;ln=p(i)?t?1:4:t?3:2}return e.minus(r).abs()}function y(n,e,t,s){var o,c,f,a,h,d,l,p,g,w=n.constructor,m=void 0!==t;if(m?(i(t,1,gn),void 0===s?s=w.rounding:i(s,0,8)):(t=w.precision,s=w.rounding),n.isFinite()){for(l=u(n),f=l.indexOf("."),m?(o=2,16==e?t=4*t-3:8==e&&(t=3*t-2)):o=e,f>=0&&(l=l.replace(".",""),g=new w(1),g.e=l.length-f,g.d=r(u(g),10,o),g.e=g.d.length),p=r(l,10,o),c=h=p.length;0==p[--h];)p.pop();if(p[0]){if(0>f?c--:(n=new w(n),n.d=p,n.e=c,n=Sn(n,g,t,s,0,o),p=n.d,c=n.e,d=hn),f=p[t],a=o/2,d=d||void 0!==p[t+1],d=4>s?(void 0!==f||d)&&(0===s||s===(n.s<0?3:2)):f>a||f===a&&(4===s||d||6===s&&1&p[t-1]||s===(n.s<0?8:7)),p.length=t,d)for(;++p[--t]>o-1;)p[t]=0,t||(++c,p.unshift(1));for(h=p.length;!p[h-1];--h);for(f=0,l="";h>f;f++)l+=wn.charAt(p[f]);if(m){if(h>1)if(16==e||8==e){for(f=16==e?4:3,--h;h%f;h++)l+="0";for(p=r(l,o,e),h=p.length;!p[h-1];--h);for(f=1,l="1.";h>f;f++)l+=wn.charAt(p[f])}else l=l.charAt(0)+"."+l.slice(1);l=l+(0>c?"p":"p+")+c}else if(0>c){for(;++c;)l="0"+l;l="0."+l}else if(++c>h)for(c-=h;c--;)l+="0";else h>c&&(l=l.slice(0,c)+"."+l.slice(c))}else l=m?"0p+0":"0";l=(16==e?"0x":2==e?"0b":8==e?"0o":"")+l}else l=v(n);return n.s<0?"-"+l:l}function q(n,e){return n.length>e?(n.length=e,!0):void 0}function O(n){return new this(n).abs()}function F(n){return new this(n).acos()}function A(n){return new this(n).acosh()}function D(n,e){return new this(n).plus(e)}function Z(n){return new this(n).asin()}function P(n){return new this(n).asinh()}function R(n){return new this(n).atan()}function L(n){return new this(n).atanh()}function U(n,e){n=new this(n),e=new this(e);var i,t=this.precision,r=this.rounding,s=t+4;return n.s&&e.s?n.d||e.d?!e.d||n.isZero()?(i=e.s<0?a(this,t,r):new this(0),i.s=n.s):!n.d||e.isZero()?(i=a(this,s,1).times(.5),i.s=n.s):e.s<0?(this.precision=s,this.rounding=1,i=this.atan(Sn(n,e,s,1)),e=a(this,s,1),this.precision=t,this.rounding=r,i=n.s<0?i.minus(e):i.plus(e)):i=this.atan(Sn(n,e,s,1)):(i=a(this,s,1).times(e.s>0?.25:.75),i.s=n.s):i=new this(NaN),i}function _(n){return new this(n).cbrt()}function k(n){return o(n=new this(n),n.e+1,2)}function S(n){if(!n||"object"!=typeof n)throw Error(xn+"Object expected");var e,i,t,r=["precision",1,gn,"rounding",0,8,"toExpNeg",-pn,0,"toExpPos",0,pn,"maxE",0,pn,"minE",-pn,0,"modulo",0,9];for(e=0;e<r.length;e+=3)if(void 0!==(t=n[i=r[e]])){if(!(qn(t)===t&&t>=r[e+1]&&t<=r[e+2]))throw Error(En+i+": "+t);this[i]=t}if(void 0!==(t=n[i="crypto"])){if(t!==!0&&t!==!1&&0!==t&&1!==t)throw Error(En+i+": "+t);if(t){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw Error(yn);this[i]=!0}else this[i]=!1}return this}function T(n){return new this(n).cos()}function C(n){return new this(n).cosh()}function I(n){function e(n){var i,t,r,s=this;if(!(s instanceof e))return new e(n);if(s.constructor=e,n instanceof e)return s.s=n.s,s.e=n.e,void(s.d=(n=n.d)?n.slice():n);if(r=typeof n,"number"===r){if(0===n)return s.s=0>1/n?-1:1,s.e=0,void(s.d=[0]);if(0>n?(n=-n,s.s=-1):s.s=1,n===~~n&&1e7>n){for(i=0,t=n;t>=10;t/=10)i++;return s.e=i,void(s.d=[n])}return 0*n!==0?(n||(s.s=NaN),s.e=NaN,void(s.d=null)):N(s,n.toString())}if("string"!==r)throw Error(En+n);return 45===n.charCodeAt(0)?(n=n.slice(1),s.s=-1):s.s=1,Zn.test(n)?N(s,n):b(s,n)}var i,t,r;if(e.prototype=kn,e.ROUND_UP=0,e.ROUND_DOWN=1,e.ROUND_CEIL=2,e.ROUND_FLOOR=3,e.ROUND_HALF_UP=4,e.ROUND_HALF_DOWN=5,e.ROUND_HALF_EVEN=6,e.ROUND_HALF_CEIL=7,e.ROUND_HALF_FLOOR=8,e.EUCLID=9,e.config=e.set=S,e.clone=I,e.abs=O,e.acos=F,e.acosh=A,e.add=D,e.asin=Z,e.asinh=P,e.atan=R,e.atanh=L,e.atan2=U,e.cbrt=_,e.ceil=k,e.cos=T,e.cosh=C,e.div=H,e.exp=B,e.floor=V,e.hypot=$,e.ln=j,e.log=W,e.log10=z,e.log2=J,e.max=G,e.min=K,e.mod=Q,e.mul=X,e.pow=Y,e.random=nn,e.round=en,e.sign=tn,e.sin=rn,e.sinh=sn,e.sqrt=on,e.sub=un,e.tan=cn,e.tanh=fn,e.trunc=an,void 0===n&&(n={}),n)for(r=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],i=0;i<r.length;)n.hasOwnProperty(t=r[i++])||(n[t]=this[t]);return e.config(n),e}function H(n,e){return new this(n).div(e)}function B(n){return new this(n).exp()}function V(n){return o(n=new this(n),n.e+1,3)}function $(){var n,e,i=new this(0);for(bn=!1,n=0;n<arguments.length;)if(e=new this(arguments[n++]),e.d)i.d&&(i=i.plus(e.times(e)));else{if(e.s)return bn=!0,new this(1/0);i=e}return bn=!0,i.sqrt()}function j(n){return new this(n).ln()}function W(n,e){return new this(n).log(e)}function J(n){return new this(n).log(2)}function z(n){return new this(n).log(10)}function G(){return g(this,arguments,"lt")}function K(){return g(this,arguments,"gt")}function Q(n,e){return new this(n).mod(e)}function X(n,e){return new this(n).mul(e)}function Y(n,e){return new this(n).pow(e)}function nn(n){var e,t,r,s,o=0,u=new this(1),c=[];if(void 0===n?n=this.precision:i(n,1,gn),r=Math.ceil(n/Rn),this.crypto)if(crypto.getRandomValues)for(e=crypto.getRandomValues(new Uint32Array(r));r>o;)s=e[o],s>=429e7?e[o]=crypto.getRandomValues(new Uint32Array(1))[0]:c[o++]=s%1e7;else{if(!crypto.randomBytes)throw Error(yn);for(e=crypto.randomBytes(r*=4);r>o;)s=e[o]+(e[o+1]<<8)+(e[o+2]<<16)+((127&e[o+3])<<24),s>=214e7?crypto.randomBytes(4).copy(e,o):(c.push(s%1e7),o+=4);o=r/4}else for(;r>o;)c[o++]=1e7*Math.random()|0;for(r=c[--o],n%=Rn,r&&n&&(s=On(10,Rn-n),c[o]=(r/s|0)*s);0===c[o];o--)c.pop();if(0>o)t=0,c=[0];else{for(t=-1;0===c[0];t-=Rn)c.shift();for(r=1,s=c[0];s>=10;s/=10)r++;Rn>r&&(t-=Rn-r)}return u.e=t,u.d=c,u}function en(n){return o(n=new this(n),n.e+1,this.rounding)}function tn(n){return n=new this(n),n.d?n.d[0]?n.s:0*n.s:n.s||NaN}function rn(n){return new this(n).sin()}function sn(n){return new this(n).sinh()}function on(n){return new this(n).sqrt()}function un(n,e){return new this(n).sub(e)}function cn(n){return new this(n).tan()}function fn(n){return new this(n).tanh()}function an(n){return o(n=new this(n),n.e+1,1)}var hn,dn,ln,pn=9e15,gn=1e9,wn="0123456789abcdef",mn="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",vn="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",Nn={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-pn,maxE:pn,crypto:!1},bn=!0,xn="[DecimalError] ",En=xn+"Invalid argument: ",Mn=xn+"Precision limit exceeded",yn=xn+"crypto unavailable",qn=Math.floor,On=Math.pow,Fn=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,An=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Dn=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,Zn=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Pn=1e7,Rn=7,Ln=9007199254740991,Un=mn.length-1,_n=vn.length-1,kn={};kn.absoluteValue=kn.abs=function(){var n=new this.constructor(this);return n.s<0&&(n.s=1),o(n)},kn.ceil=function(){return o(new this.constructor(this),this.e+1,2)},kn.comparedTo=kn.cmp=function(n){var e,i,t,r,s=this,o=s.d,u=(n=new s.constructor(n)).d,c=s.s,f=n.s;if(!o||!u)return c&&f?c!==f?c:o===u?0:!o^0>c?1:-1:NaN;if(!o[0]||!u[0])return o[0]?c:u[0]?-f:0;if(c!==f)return c;if(s.e!==n.e)return s.e>n.e^0>c?1:-1;for(t=o.length,r=u.length,e=0,i=r>t?t:r;i>e;++e)if(o[e]!==u[e])return o[e]>u[e]^0>c?1:-1;return t===r?0:t>r^0>c?1:-1},kn.cosine=kn.cos=function(){var n,e,i=this,t=i.constructor;return i.d?i.d[0]?(n=t.precision,e=t.rounding,t.precision=n+Math.max(i.e,i.sd())+Rn,t.rounding=1,i=s(t,M(t,i)),t.precision=n,t.rounding=e,o(2==ln||3==ln?i.neg():i,n,e,!0)):new t(1):new t(NaN)},kn.cubeRoot=kn.cbrt=function(){var n,i,t,r,s,u,c,f,a,h,d=this,l=d.constructor;if(!d.isFinite()||d.isZero())return new l(d);for(bn=!1,u=d.s*Math.pow(d.s*d,1/3),u&&Math.abs(u)!=1/0?r=new l(u.toString()):(t=e(d.d),n=d.e,(u=(n-t.length+1)%3)&&(t+=1==u||-2==u?"0":"00"),u=Math.pow(t,1/3),n=qn((n+1)/3)-(n%3==(0>n?-1:2)),u==1/0?t="5e"+n:(t=u.toExponential(),t=t.slice(0,t.indexOf("e")+1)+n),r=new l(t),r.s=d.s),c=(n=l.precision)+3;;)if(f=r,a=f.times(f).times(f),h=a.plus(d),r=Sn(h.plus(d).times(f),h.plus(a),c+2,1),e(f.d).slice(0,c)===(t=e(r.d)).slice(0,c)){if(t=t.slice(c-3,c+1),"9999"!=t&&(s||"4999"!=t)){(!+t||!+t.slice(1)&&"5"==t.charAt(0))&&(o(r,n+1,1),i=!r.times(r).times(r).eq(d));break}if(!s&&(o(f,n+1,0),f.times(f).times(f).eq(d))){r=f;break}c+=4,s=1}return bn=!0,o(r,n,l.rounding,i)},kn.decimalPlaces=kn.dp=function(){var n,e=this.d,i=NaN;if(e){if(n=e.length-1,i=(n-qn(this.e/Rn))*Rn,n=e[n])for(;n%10==0;n/=10)i--;0>i&&(i=0)}return i},kn.dividedBy=kn.div=function(n){return Sn(this,new this.constructor(n))},kn.dividedToIntegerBy=kn.divToInt=function(n){var e=this,i=e.constructor;return o(Sn(e,new i(n),0,1,1),i.precision,i.rounding)},kn.equals=kn.eq=function(n){return 0===this.cmp(n)},kn.floor=function(){return o(new this.constructor(this),this.e+1,3)},kn.greaterThan=kn.gt=function(n){return this.cmp(n)>0},kn.greaterThanOrEqualTo=kn.gte=function(n){var e=this.cmp(n);return 1==e||0===e},kn.hyperbolicCosine=kn.cosh=function(){var n,e,i,t,r,s=this,u=s.constructor,c=new u(1);if(!s.isFinite())return new u(s.s?1/0:NaN);if(s.isZero())return c;i=u.precision,t=u.rounding,u.precision=i+Math.max(s.e,s.sd())+4,u.rounding=1,r=s.d.length,32>r?(n=Math.ceil(r/3),e=Math.pow(4,-n).toString()):(n=16,e="2.3283064365386962890625e-10"),s=E(u,1,s.times(e),new u(1),!0);for(var f,a=n,h=new u(8);a--;)f=s.times(s),s=c.minus(f.times(h.minus(f.times(h))));return o(s,u.precision=i,u.rounding=t,!0)},kn.hyperbolicSine=kn.sinh=function(){var n,e,i,t,r=this,s=r.constructor;if(!r.isFinite()||r.isZero())return new s(r);if(e=s.precision,i=s.rounding,s.precision=e+Math.max(r.e,r.sd())+4,s.rounding=1,t=r.d.length,3>t)r=E(s,2,r,r,!0);else{n=1.4*Math.sqrt(t),n=n>16?16:0|n,r=r.times(Math.pow(5,-n)),r=E(s,2,r,r,!0);for(var u,c=new s(5),f=new s(16),a=new s(20);n--;)u=r.times(r),r=r.times(c.plus(u.times(f.times(u).plus(a))))}return s.precision=e,s.rounding=i,o(r,e,i,!0)},kn.hyperbolicTangent=kn.tanh=function(){var n,e,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(n=t.precision,e=t.rounding,t.precision=n+7,t.rounding=1,Sn(i.sinh(),i.cosh(),t.precision=n,t.rounding=e)):new t(i.s)},kn.inverseCosine=kn.acos=function(){var n,e=this,i=e.constructor,t=e.abs().cmp(1),r=i.precision,s=i.rounding;return-1!==t?0===t?e.isNeg()?a(i,r,s):new i(0):new i(NaN):e.isZero()?a(i,r+4,s).times(.5):(i.precision=r+6,i.rounding=1,e=e.asin(),n=a(i,r+4,s).times(.5),i.precision=r,i.rounding=s,n.minus(e))},kn.inverseHyperbolicCosine=kn.acosh=function(){var n,e,i=this,t=i.constructor;return i.lte(1)?new t(i.eq(1)?0:NaN):i.isFinite()?(n=t.precision,e=t.rounding,t.precision=n+Math.max(Math.abs(i.e),i.sd())+4,t.rounding=1,bn=!1,i=i.times(i).minus(1).sqrt().plus(i),bn=!0,t.precision=n,t.rounding=e,i.ln()):new t(i)},kn.inverseHyperbolicSine=kn.asinh=function(){var n,e,i=this,t=i.constructor;return!i.isFinite()||i.isZero()?new t(i):(n=t.precision,e=t.rounding,t.precision=n+2*Math.max(Math.abs(i.e),i.sd())+6,t.rounding=1,bn=!1,i=i.times(i).plus(1).sqrt().plus(i),bn=!0,t.precision=n,t.rounding=e,i.ln())},kn.inverseHyperbolicTangent=kn.atanh=function(){var n,e,i,t,r=this,s=r.constructor;return r.isFinite()?r.e>=0?new s(r.abs().eq(1)?r.s/0:r.isZero()?r:NaN):(n=s.precision,e=s.rounding,t=r.sd(),Math.max(t,n)<2*-r.e-1?o(new s(r),n,e,!0):(s.precision=i=t-r.e,r=Sn(r.plus(1),new s(1).minus(r),i+n,1),s.precision=n+4,s.rounding=1,r=r.ln(),s.precision=n,s.rounding=e,r.times(.5))):new s(NaN)},kn.inverseSine=kn.asin=function(){var n,e,i,t,r=this,s=r.constructor;return r.isZero()?new s(r):(e=r.abs().cmp(1),i=s.precision,t=s.rounding,-1!==e?0===e?(n=a(s,i+4,t).times(.5),n.s=r.s,n):new s(NaN):(s.precision=i+6,s.rounding=1,r=r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(),s.precision=i,s.rounding=t,r.times(2)))},kn.inverseTangent=kn.atan=function(){var n,e,i,t,r,s,u,c,f,h=this,d=h.constructor,l=d.precision,p=d.rounding;if(h.isFinite()){if(h.isZero())return new d(h);if(h.abs().eq(1)&&_n>=l+4)return u=a(d,l+4,p).times(.25),u.s=h.s,u}else{if(!h.s)return new d(NaN);if(_n>=l+4)return u=a(d,l+4,p).times(.5),u.s=h.s,u}for(d.precision=c=l+10,d.rounding=1,i=Math.min(28,c/Rn+2|0),n=i;n;--n)h=h.div(h.times(h).plus(1).sqrt().plus(1));for(bn=!1,e=Math.ceil(c/Rn),t=1,f=h.times(h),u=new d(h),r=h;-1!==n;)if(r=r.times(f),s=u.minus(r.div(t+=2)),r=r.times(f),u=s.plus(r.div(t+=2)),void 0!==u.d[e])for(n=e;u.d[n]===s.d[n]&&n--;);return i&&(u=u.times(2<<i-1)),bn=!0,o(u,d.precision=l,d.rounding=p,!0)},kn.isFinite=function(){return!!this.d},kn.isInteger=kn.isInt=function(){return!!this.d&&qn(this.e/Rn)>this.d.length-2},kn.isNaN=function(){return!this.s},kn.isNegative=kn.isNeg=function(){return this.s<0},kn.isPositive=kn.isPos=function(){return this.s>0},kn.isZero=function(){return!!this.d&&0===this.d[0]},kn.lessThan=kn.lt=function(n){return this.cmp(n)<0},kn.lessThanOrEqualTo=kn.lte=function(n){return this.cmp(n)<1},kn.logarithm=kn.log=function(n){var i,r,s,u,c,a,h,d,l=this,p=l.constructor,g=p.precision,w=p.rounding,v=5;if(null==n)n=new p(10),i=!0;else{if(n=new p(n),r=n.d,n.s<0||!r||!r[0]||n.eq(1))return new p(NaN);i=n.eq(10)}if(r=l.d,l.s<0||!r||!r[0]||l.eq(1))return new p(r&&!r[0]?-1/0:1!=l.s?NaN:r?0:1/0);if(i)if(r.length>1)c=!0;else{for(u=r[0];u%10===0;)u/=10;c=1!==u}if(bn=!1,h=g+v,a=m(l,h),s=i?f(p,h+10):m(n,h),d=Sn(a,s,h,1),t(d.d,u=g,w))do if(h+=10,a=m(l,h),s=i?f(p,h+10):m(n,h),d=Sn(a,s,h,1),!c){+e(d.d).slice(u+1,u+15)+1==1e14&&(d=o(d,g+1,0));break}while(t(d.d,u+=10,w));return bn=!0,o(d,g,w)},kn.minus=kn.sub=function(n){var e,i,t,r,s,u,f,a,h,d,l,p,g=this,w=g.constructor;if(n=new w(n),!g.d||!n.d)return g.s&&n.s?g.d?n.s=-n.s:n=new w(n.d||g.s!==n.s?g:NaN):n=new w(NaN),n;if(g.s!=n.s)return n.s=-n.s,g.plus(n);if(h=g.d,p=n.d,f=w.precision,a=w.rounding,!h[0]||!p[0]){if(p[0])n.s=-n.s;else{if(!h[0])return new w(3===a?-0:0);n=new w(g)}return bn?o(n,f,a):n}if(i=qn(n.e/Rn),d=qn(g.e/Rn),h=h.slice(),s=d-i){for(l=0>s,l?(e=h,s=-s,u=p.length):(e=p,i=d,u=h.length),t=Math.max(Math.ceil(f/Rn),u)+2,s>t&&(s=t,e.length=1),e.reverse(),t=s;t--;)e.push(0);e.reverse()}else{for(t=h.length,u=p.length,l=u>t,l&&(u=t),t=0;u>t;t++)if(h[t]!=p[t]){l=h[t]<p[t];break}s=0}for(l&&(e=h,h=p,p=e,n.s=-n.s),u=h.length,t=p.length-u;t>0;--t)h[u++]=0;for(t=p.length;t>s;){if(h[--t]<p[t]){for(r=t;r&&0===h[--r];)h[r]=Pn-1;--h[r],h[t]+=Pn}h[t]-=p[t]}for(;0===h[--u];)h.pop();for(;0===h[0];h.shift())--i;return h[0]?(n.d=h,n.e=c(h,i),bn?o(n,f,a):n):new w(3===a?-0:0)},kn.modulo=kn.mod=function(n){var e,i=this,t=i.constructor;return n=new t(n),!i.d||!n.s||n.d&&!n.d[0]?new t(NaN):!n.d||i.d&&!i.d[0]?o(new t(i),t.precision,t.rounding):(bn=!1,9==t.modulo?(e=Sn(i,n.abs(),0,3,1),e.s*=n.s):e=Sn(i,n,0,t.modulo,1),e=e.times(n),bn=!0,i.minus(e))},kn.naturalExponential=kn.exp=function(){return w(this)},kn.naturalLogarithm=kn.ln=function(){return m(this)},kn.negated=kn.neg=function(){var n=new this.constructor(this);return n.s=-n.s,o(n)},kn.plus=kn.add=function(n){var e,i,t,r,s,u,f,a,h,d,l=this,p=l.constructor;if(n=new p(n),!l.d||!n.d)return l.s&&n.s?l.d||(n=new p(n.d||l.s===n.s?l:NaN)):n=new p(NaN),n;if(l.s!=n.s)return n.s=-n.s,l.minus(n);if(h=l.d,d=n.d,f=p.precision,a=p.rounding,!h[0]||!d[0])return d[0]||(n=new p(l)),bn?o(n,f,a):n;if(s=qn(l.e/Rn),t=qn(n.e/Rn),h=h.slice(),r=s-t){for(0>r?(i=h,r=-r,u=d.length):(i=d,t=s,u=h.length),s=Math.ceil(f/Rn),u=s>u?s+1:u+1,r>u&&(r=u,i.length=1),i.reverse();r--;)i.push(0);i.reverse()}for(u=h.length,r=d.length,0>u-r&&(r=u,i=d,d=h,h=i),e=0;r;)e=(h[--r]=h[r]+d[r]+e)/Pn|0,h[r]%=Pn;for(e&&(h.unshift(e),++t),u=h.length;0==h[--u];)h.pop();return n.d=h,n.e=c(h,t),bn?o(n,f,a):n},kn.precision=kn.sd=function(n){var e,i=this;if(void 0!==n&&n!==!!n&&1!==n&&0!==n)throw Error(En+n);return i.d?(e=h(i.d),n&&i.e+1>e&&(e=i.e+1)):e=NaN,e},kn.round=function(){var n=this,e=n.constructor;return o(new e(n),n.e+1,e.rounding)},kn.sine=kn.sin=function(){var n,e,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(n=t.precision,e=t.rounding,t.precision=n+Math.max(i.e,i.sd())+Rn,t.rounding=1,i=x(t,M(t,i)),t.precision=n,t.rounding=e,o(ln>2?i.neg():i,n,e,!0)):new t(NaN)},kn.squareRoot=kn.sqrt=function(){var n,i,t,r,s,u,c=this,f=c.d,a=c.e,h=c.s,d=c.constructor;if(1!==h||!f||!f[0])return new d(!h||0>h&&(!f||f[0])?NaN:f?c:1/0);for(bn=!1,h=Math.sqrt(+c),0==h||h==1/0?(i=e(f),(i.length+a)%2==0&&(i+="0"),h=Math.sqrt(i),a=qn((a+1)/2)-(0>a||a%2),h==1/0?i="1e"+a:(i=h.toExponential(),i=i.slice(0,i.indexOf("e")+1)+a),r=new d(i)):r=new d(h.toString()),t=(a=d.precision)+3;;)if(u=r,r=u.plus(Sn(c,u,t+2,1)).times(.5),e(u.d).slice(0,t)===(i=e(r.d)).slice(0,t)){if(i=i.slice(t-3,t+1),"9999"!=i&&(s||"4999"!=i)){(!+i||!+i.slice(1)&&"5"==i.charAt(0))&&(o(r,a+1,1),n=!r.times(r).eq(c));break}if(!s&&(o(u,a+1,0),u.times(u).eq(c))){r=u;break}t+=4,s=1}return bn=!0,o(r,a,d.rounding,n)},kn.tangent=kn.tan=function(){var n,e,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(n=t.precision,e=t.rounding,t.precision=n+10,t.rounding=1,i=i.sin(),i.s=1,i=Sn(i,new t(1).minus(i.times(i)).sqrt(),n+10,0),t.precision=n,t.rounding=e,o(2==ln||4==ln?i.neg():i,n,e,!0)):new t(NaN)},kn.times=kn.mul=function(n){var e,i,t,r,s,u,f,a,h,d=this,l=d.constructor,p=d.d,g=(n=new l(n)).d;if(n.s*=d.s,!(p&&p[0]&&g&&g[0]))return new l(!n.s||p&&!p[0]&&!g||g&&!g[0]&&!p?NaN:p&&g?0*n.s:n.s/0);for(i=qn(d.e/Rn)+qn(n.e/Rn),a=p.length,h=g.length,h>a&&(s=p,p=g,g=s,u=a,a=h,h=u),s=[],u=a+h,t=u;t--;)s.push(0);for(t=h;--t>=0;){for(e=0,r=a+t;r>t;)f=s[r]+g[t]*p[r-t-1]+e,s[r--]=f%Pn|0,e=f/Pn|0;s[r]=(s[r]+e)%Pn|0}for(;!s[--u];)s.pop();return e?++i:s.shift(),n.d=s,n.e=c(s,i),bn?o(n,l.precision,l.rounding):n},kn.toBinary=function(n,e){return y(this,2,n,e)},kn.toDecimalPlaces=kn.toDP=function(n,e){var t=this,r=t.constructor;return t=new r(t),void 0===n?t:(i(n,0,gn),void 0===e?e=r.rounding:i(e,0,8),o(t,n+t.e+1,e))},kn.toExponential=function(n,e){var t,r=this,s=r.constructor;return void 0===n?t=u(r,!0):(i(n,0,gn),void 0===e?e=s.rounding:i(e,0,8),r=o(new s(r),n+1,e),t=u(r,!0,n+1)),r.isNeg()&&!r.isZero()?"-"+t:t},kn.toFixed=function(n,e){var t,r,s=this,c=s.constructor;return void 0===n?t=u(s):(i(n,0,gn),void 0===e?e=c.rounding:i(e,0,8),r=o(new c(s),n+s.e+1,e),t=u(r,!1,n+r.e+1)),s.isNeg()&&!s.isZero()?"-"+t:t},kn.toFraction=function(n){var i,t,r,s,o,u,c,f,a,d,l,p,g=this,w=g.d,m=g.constructor;if(!w)return new m(g);if(a=t=new m(1),r=f=new m(0),i=new m(r),o=i.e=h(w)-g.e-1,u=o%Rn,i.d[0]=On(10,0>u?Rn+u:u),null==n)n=o>0?i:a;else{if(c=new m(n),!c.isInt()||c.lt(a))throw Error(En+c);n=c.gt(i)?o>0?i:a:c}for(bn=!1,c=new m(e(w)),d=m.precision,m.precision=o=w.length*Rn*2;l=Sn(c,i,0,1,1),s=t.plus(l.times(r)),1!=s.cmp(n);)t=r,r=s,s=a,a=f.plus(l.times(s)),f=s,s=i,i=c.minus(l.times(s)),c=s;return s=Sn(n.minus(t),r,0,1,1),f=f.plus(s.times(a)),t=t.plus(s.times(r)),f.s=a.s=g.s,p=Sn(a,r,o,1).minus(g).abs().cmp(Sn(f,t,o,1).minus(g).abs())<1?[a,r]:[f,t],m.precision=d,bn=!0,p},kn.toHexadecimal=kn.toHex=function(n,e){return y(this,16,n,e)},kn.toNearest=function(n,e){var t=this,r=t.constructor;if(t=new r(t),null==n){if(!t.d)return t;n=new r(1),e=r.rounding}else{if(n=new r(n),void 0!==e&&i(e,0,8),!t.d)return n.s?t:n;if(!n.d)return n.s&&(n.s=t.s),n}return n.d[0]?(bn=!1,4>e&&(e=[4,5,7,8][e]),t=Sn(t,n,0,e,1).times(n),bn=!0,o(t)):(n.s=t.s,t=n),t},kn.toNumber=function(){return+this},kn.toOctal=function(n,e){return y(this,8,n,e)},kn.toPower=kn.pow=function(n){var i,r,s,u,c,f,a=this,h=a.constructor,d=+(n=new h(n));if(!(a.d&&n.d&&a.d[0]&&n.d[0]))return new h(On(+a,d));if(a=new h(a),a.eq(1))return a;if(s=h.precision,c=h.rounding,n.eq(1))return o(a,s,c);if(i=qn(n.e/Rn),i>=n.d.length-1&&(r=0>d?-d:d)<=Ln)return u=l(h,a,r,s),n.s<0?new h(1).div(u):o(u,s,c);if(f=a.s,0>f){if(i<n.d.length-1)return new h(NaN);if(0==(1&n.d[i])&&(f=1),0==a.e&&1==a.d[0]&&1==a.d.length)return a.s=f,a}return r=On(+a,d),i=0!=r&&isFinite(r)?new h(r+"").e:qn(d*(Math.log("0."+e(a.d))/Math.LN10+a.e+1)),i>h.maxE+1||i<h.minE-1?new h(i>0?f/0:0):(bn=!1,h.rounding=a.s=1,r=Math.min(12,(i+"").length),u=w(n.times(m(a,s+r)),s),u.d&&(u=o(u,s+5,1),t(u.d,s,c)&&(i=s+10,u=o(w(n.times(m(a,i+r)),i),i+5,1),+e(u.d).slice(s+1,s+15)+1==1e14&&(u=o(u,s+1,0)))),u.s=f,bn=!0,h.rounding=c,o(u,s,c))},kn.toPrecision=function(n,e){var t,r=this,s=r.constructor;return void 0===n?t=u(r,r.e<=s.toExpNeg||r.e>=s.toExpPos):(i(n,1,gn),void 0===e?e=s.rounding:i(e,0,8),r=o(new s(r),n,e),t=u(r,n<=r.e||r.e<=s.toExpNeg,n)),r.isNeg()&&!r.isZero()?"-"+t:t},kn.toSignificantDigits=kn.toSD=function(n,e){var t=this,r=t.constructor;return void 0===n?(n=r.precision,e=r.rounding):(i(n,1,gn),void 0===e?e=r.rounding:i(e,0,8)),o(new r(t),n,e)},kn.toString=function(){var n=this,e=n.constructor,i=u(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()&&!n.isZero()?"-"+i:i},kn.truncated=kn.trunc=function(){return o(new this.constructor(this),this.e+1,1)},kn.valueOf=kn.toJSON=function(){var n=this,e=n.constructor,i=u(n,n.e<=e.toExpNeg||n.e>=e.toExpPos);return n.isNeg()?"-"+i:i};var Sn=function(){function n(n,e,i){var t,r=0,s=n.length;for(n=n.slice();s--;)t=n[s]*e+r,n[s]=t%i|0,r=t/i|0;return r&&n.unshift(r),n}function e(n,e,i,t){var r,s;if(i!=t)s=i>t?1:-1;else for(r=s=0;i>r;r++)if(n[r]!=e[r]){s=n[r]>e[r]?1:-1;break}return s}function i(n,e,i,t){for(var r=0;i--;)n[i]-=r,r=n[i]<e[i]?1:0,n[i]=r*t+n[i]-e[i];for(;!n[0]&&n.length>1;)n.shift()}return function(t,r,s,u,c,f){var a,h,d,l,p,g,w,m,v,N,b,x,E,M,y,q,O,F,A,D,Z=t.constructor,P=t.s==r.s?1:-1,R=t.d,L=r.d;if(!(R&&R[0]&&L&&L[0]))return new Z(t.s&&r.s&&(R?!L||R[0]!=L[0]:L)?R&&0==R[0]||!L?0*P:P/0:NaN);for(f?(p=1,h=t.e-r.e):(f=Pn,p=Rn,h=qn(t.e/p)-qn(r.e/p)),A=L.length,O=R.length,v=new Z(P),N=v.d=[],d=0;L[d]==(R[d]||0);d++);if(L[d]>(R[d]||0)&&h--,null==s?(M=s=Z.precision,u=Z.rounding):M=c?s+(t.e-r.e)+1:s,0>M)N.push(1),g=!0;else{if(M=M/p+2|0,d=0,1==A){for(l=0,L=L[0],M++;(O>d||l)&&M--;d++)y=l*f+(R[d]||0),N[d]=y/L|0,l=y%L|0;g=l||O>d}else{for(l=f/(L[0]+1)|0,l>1&&(L=n(L,l,f),R=n(R,l,f),A=L.length,O=R.length),q=A,b=R.slice(0,A),x=b.length;A>x;)b[x++]=0;D=L.slice(),D.unshift(0),F=L[0],L[1]>=f/2&&++F;do l=0,a=e(L,b,A,x),0>a?(E=b[0],A!=x&&(E=E*f+(b[1]||0)),l=E/F|0,l>1?(l>=f&&(l=f-1),w=n(L,l,f),m=w.length,x=b.length,a=e(w,b,m,x),1==a&&(l--,i(w,m>A?D:L,m,f))):(0==l&&(a=l=1),w=L.slice()),m=w.length,x>m&&w.unshift(0),i(b,w,x,f),-1==a&&(x=b.length,a=e(L,b,A,x),1>a&&(l++,i(b,x>A?D:L,x,f))),x=b.length):0===a&&(l++,b=[0]),N[d++]=l,a&&b[0]?b[x++]=R[q]||0:(b=[R[q]],x=1);while((q++<O||void 0!==b[0])&&M--);g=void 0!==b[0]}N[0]||N.shift()}if(1==p)v.e=h,hn=g;else{for(d=1,l=N[0];l>=10;l/=10)d++;v.e=d+h*p-1,o(v,c?s+v.e+1:s,u,g)}return v}}();Nn=I(Nn),mn=new Nn(mn),vn=new Nn(vn),"function"==typeof define&&define.amd?define(function(){return Nn}):"undefined"!=typeof module&&module.exports?module.exports=Nn["default"]=Nn.Decimal=Nn:(n||(n="undefined"!=typeof self&&self&&self.self==self?self:Function("return this")()),dn=n.Decimal,Nn.noConflict=function(){return n.Decimal=dn,Nn},n.Decimal=Nn)}(this);
/* decimal.js v7.2.3 https://github.com/MikeMcl/decimal.js/LICENCE */

/* Math.round ceil10 round10 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round */
function decimalAdjust(t,e,i){return void 0===i||0==+i?Math[t](e):(e=+e,i=+i,isNaN(e)||"number"!=typeof i||i%1!=0?NaN:0>e?-decimalAdjust(t,-e,i):(e=e.toString().split("e"),e=Math[t](+(e[0]+"e"+(e[1]?+e[1]-i:-i))),+((e=e.toString().split("e"))[0]+"e"+(e[1]?+e[1]+i:i))))}Math.ceil10||(Math.ceil10=function(t,e){return decimalAdjust("ceil",t,e)}),Math.round10||(Math.round10=function(t,e){return decimalAdjust("round",t,e)}),Math.floor10||(Math.floor10=function(t,e){return decimalAdjust("floor",t,e)});
/* Math.round ceil10 round10 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round */

/* -------------------------------------------------------------------------- */
/* load rates from OpenExchange */
function loadRates() {
    // Load exchange rates data via AJAX:
    var request = new XMLHttpRequest();
    var url = "https://openexchangerates.org/api/latest.json?app_id=7882ce077d9e44229e7b68b170ad47f9";
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            /* Check if Money.js is set up already */
            if (typeof fx !== "undefined" && fx.rates) {
                fx.rates = data.rates;
                fx.base = data.base;
            } else {
                // If not, apply to fxSetup global:
                var fxSetup = {
                    rates: data.rates,
                    base: data.base
                }
            }
        }
    };
    request.onerror = function() {
        // There was a connection error of some sort
        alert("Error loading conversion rates");
    };
    request.send();
}
loadRates();

var Money = function(amount, currency) {
    var that = this;

    var zeroDecimalCurrencies = [
        "MGA",
        "BIF",
        "PYG",
        "CLP",
        "DJF",
        "RWF",
        "GNF",
        "JPY",
        "VND",
        "VUV",
        "XAF",
        "XOF",
        "XPF",
        "KRW",
        "KMF",
    ];

    this.toString = function() {
        return that.amount + " " + that.currency;
    };

    this.currency = currency;
    var rounding = zeroDecimalCurrencies.includes(currency) ? 0 : -2;
    //I probably don't want to expose this but will do for now
    this.rounding = rounding;
    this.amount = new Decimal(Math.round10(amount, rounding));

    this.convertTo = function(currency) {
        var amount = fx.convert(that.amount, {
            from: that.currency,
            to: currency
        });
        return new Money(amount, currency);
    };

    /* Add basic Decimal.js support */
    function buildMathMethods() {
        var methods = ["plus", "minus", "times"];
        for (var i = 0; i < methods.length; i++) {
            let method = methods[i];
            that[method] = function(money) {
                if (money.hasOwnProperty("amount")) {
                    var amount = that.amount[method](money.amount);
                    return new Money(amount, that.currency);
                } else {
                    var amount = that.amount[method](money);
                    return new Money(amount, that.currency);
                }
            };
        }
    }
    buildMathMethods();
};

var Customer = function(cardCountry) {
    var europeanCustomers = [
        "AD",
        "AT",
        "BE",
        "BG",
        "HR",
        "CY",
        "CZ",
        "DK",
        "EE",
        "FO",
        "FI",
        "FR",
        "DE",
        "GI",
        "GR",
        "GL",
        "GG",
        "VA",
        "HU",
        "IS",
        "IE",
        "IM",
        "IL",
        "IT",
        "JE",
        "LV",
        "LI",
        "LT",
        "LU",
        "MT",
        "MC",
        "ME",
        "NL",
        "NO",
        "PL",
        "RO",
        "PM",
        "SM",
        "RS",
        "SK",
        "SI",
        "ES",
        "SJ",
        "SE",
        "CH",
        "TR",
        "GB",
        "MK",
        "PT",
    ];
    this.country = cardCountry;
    this.european = europeanCustomers.includes(cardCountry);
}

var Account = function(country, currency) {
    var that = this;
    this.country = country;
    this.currency = currency;
    this.pricing = countries[country].pricing;

    this.hasDomesticPricingFor = function(customer) {
        return ((that.country === customer.country) || (that.pricing.european && customer.european));
    };

    this.pricingFor = function(customer) {
        if (that.hasDomesticPricingFor(customer)) {
            return that.pricing.domestic;
        } else {
            return that.pricing.international;
        }
    };
}

var Platform = function(country, currency, feePercent) {
    var that = this;
    this.country = country;
    this.currency = currency;
    this.feePercent = new Decimal(feePercent);
    this.feeMultiplier = this.feePercent.times(0.01);
    this.pricing = countries[country].pricing;

    this.hasDomesticPricingFor = function(customer) {
        return ((that.country === customer.country) || (that.pricing.european && customer.european));
    };
};

var Charge = (function() {
    var that = this;

    function connectCharge(type) {
        return type !== "Standard";
    }

    function getPricing() {
        /* SCTs use pricing of connected account like normal */
        /* However, domestic vs.international logical choice depends on Platform */
        if (this.type === "SCT") {
            if (this.platform.hasDomesticPricingFor(this.customer)) {
                return this.account.pricing.domestic;
            } else {
                return this.account.pricing.international;
            }
        } else {
            console.log(this);
            return this.account.pricingFor(this.customer);
        }
    }

    function settleFunds() {
        if (this.presentment.currency !== this.account.currency) {
            this.settlement = this.presentment.convertTo(this.account.currency);
            this.fxFee = this.settlement.times(this.account.pricing.fxMultiplier);
        } else {
            this.settlement = this.presentment;
            this.fxFee = new Money(0, this.settlement.currency);
        }
        this.final = this.settlement.minus(this.fxFee);
        this.stripeFee = new stripeFee(this);
        //this.GST = new GST(this.stripeFee.settlement, this.account);
        //this.VAT = new VAT(this.stripeFee.settlement, this.account);
    }

    function initializeCharge(options) {
        this.options = options;
        this.customer = new Customer(options.customer.country, options.customer.currency);
        this.account = new Account(options.account.country, options.account.currency);

        if (connectCharge(this.type)) {
            this.platform = new Platform(options.platform.country, options.platform.currency, options.platform.percentFee);
        }
        this.pricing = getPricing.call(this, options.type);
        this.presentment = new Money(options.amount, options.currency);
        this.settlement = this.presentment.convertTo(options.account.currency);
    }

    this.Direct = function(options) {
        this.type = "Direct";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.amountAfterStripeFee = this.final.minus(this.stripeFee.final);
        this.platform.applicationFee = new ApplicationFee(this.platform, this, this.type);
        this.connectedPortion = this.amountAfterStripeFee.minus(this.platform.applicationFee.settlement);
    };

    this.Destination = function(options) {
        this.type = "Destination";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.platform.applicationFee = new ApplicationFee(this.platform, this, this.type);
        this.connectedPortion = this.final.minus(this.platform.applicationFee.settlement);
    };

    this.SCT = function(options) {
        this.type = "SCT";
        initializeCharge.call(this, options);
        settleFunds.call(this);
        /* What happens left is up to user. Transfer() methods for some reason? */
    };

    this.Standard = function(options) {
        this.type = "Standard";
        initializeCharge.call(this, options);
        settleFunds.call(this);

        this.finalAfterStripeFee = this.final.minus(this.stripeFee.final);
    };

    return this;
})();

var ApplicationFee = function(platform, charge, type) {

    /* what is specified at the time of charge creation */
    this.presentment = charge.presentment.times(platform.feeMultiplier);

    /* No fx fee here because we're just converting a value */
    this.settlement = this.presentment.convertTo(charge.settlement.currency);

    /*  if destination, need to deduct stripe fee. If Direct, just set as settlement. */
    if (type === "Destination") {
        this.afterStripeFee = this.settlement.minus(charge.stripeFee.final);
    } else {
        this.afterStripeFee = this.settlement;
    }

    this.final = this.afterStripeFee.convertTo(platform.currency);

    if (platform.currency !== charge.settlement.currency) {
        this.fxFee = this.final.times(platform.pricing.fxMultiplier);
        this.finalAfterFxFee = this.final.minus(this.fxFee);
    } else {
        this.fxFee = new Money(0, platform.currency);
        this.finalAfterFxFee = this.final.minus(this.fxFee);
    }
};

var Pricing = function(pricing, country) {
    var that = this;
    /* Accounts where Domestic means European */
    var europeanAccounts = [
        "AT",
        "BE",
        "DE",
        "DK",
        "FI",
        "FR",
        "IE",
        "LU",
        "NL",
        "ES",
        "SE",
        "GB",
        "IT",
        "PT",
    ];

    var transactionalFee = function(pricing) {
        var fees = pricing.split(" + ");
        var fee = Object.create(Pricing);
        fee.percent = new Decimal(fees[0]);
        fee.percentMultiplier = fee.percent.times(0.01);
        fee.fixed = new Money(fees[1], that.currency);
        return fee;
    };

    this.currency = pricing.currency;
    this.fxPercent = new Decimal(pricing.fxPercent);
    this.fxMultiplier = this.fxPercent.times(0.01);
    this.domestic = new transactionalFee(pricing.domestic);
    this.international = new transactionalFee(pricing.international);
    this.european = europeanAccounts.includes(country);
};

var Country = function(countryCode, pricing) {
    this.code = countryCode;
    this.pricing = new Pricing(pricing, countryCode);
};

var countries = {
    "US": new Country("US", {
        domestic: "2.9 + 0.30",
        international: "3.9 + 0.30",
        fxPercent: 1,
        currency: "USD"
    }),
    AU: new Country("AU", {
        domestic: "1.75 + 0.30",
        international: "2.9 + 0.30",
        fxPercent: 2,
        currency: "AUD"
    }),
    AT: new Country("AT", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    BE: new Country("BE", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    BR: new Country("BR", {
        domestic: "3.99 + 0.50",
        international: "3.99 + 0.50",
        fxPercent: 2,
        currency: "BRL"
    }),
    CA: new Country("CA", {
        domestic: "2.9 + 0.30",
        international: "3.5 + 0.30",
        fxPercent: 2,
        currency: "CAD"
    }),
    DK: new Country("DK", {
        domestic: "1.4 + 1.80",
        international: "2.9 + 1.80",
        fxPercent: 2,
        currency: "DKK"
    }),
    FI: new Country("FI", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    FR: new Country("FR", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    DE: new Country("DE", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    HK: new Country("HK", {
        domestic: "3.4 + 2.35",
        international: "3.4 + 2.35",
        fxPercent: 2,
        currency: "HKD"
    }),
    IE: new Country("IE", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    JP: new Country("JP", {
        domestic: "3.6 + 0",
        international: "3.6 + 0",
        fxPercent: 2,
        currency: "JPY"
    }),
    LU: new Country("LU", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    NL: new Country("NL", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    NZ: new Country("NZ", {
        domestic: "2.9 + 0.3",
        international: "2.9 + 0.3",
        fxPercent: 2,
        currency: "NZD"
    }),
    NO: new Country("NO", {
        domestic: "2.4 + 2",
        international: "2.9 + 2",
        fxPercent: 2,
        currency: "NOK"
    }),
    MX: new Country("MX", {
        domestic: "3.6 + 3",
        international: "3.6 + 3",
        fxPercent: 2,
        currency: "MXN"
    }),
    SG: new Country("SG", {
        domestic: "3.4 + 0.5",
        international: "3.4 + 0.5",
        fxPercent: 2,
        currency: "SGD"
    }),
    ES: new Country("ES", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    SE: new Country("SE", {
        domestic: "1.4 + 1.8",
        international: "2.9 + 1.8",
        fxPercent: 2,
        currency: "SEK"
    }),
    CH: new Country("CH", {
        domestic: "2.9 + 0.30",
        international: "2.9 + 0.30",
        fxPercent: 2,
        currency: "CHF"
    }),
    GB: new Country("GB", {
        domestic: "1.4 + 0.20",
        international: "2.9 + 0.20",
        fxPercent: 2,
        currency: "GBP"
    }),
    IT: new Country("IT", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
    PT: new Country("PT", {
        domestic: "1.4 + 0.25",
        international: "2.9 + 0.25",
        fxPercent: 2,
        currency: "EUR"
    }),
};

var GST = function(stripeFee, account) {
    var stripePortionMultiplier = new Decimal(10).dividedBy(11);
    if (account.country === "AU") {
        // handling money math and rounding ourselves...
        var stripePortion = stripeFee.settlement.amount.times(stripePortionMultiplier);
        var roundedStripe = new Decimal(Math.round10(stripePortion, stripeFee.settlement.rounding));
        var flooredStripe = new Decimal(Math.floor10(stripePortion, stripeFee.settlement.rounding));

        var flooredTax = new Decimal(Math.floor10(flooredStripe.dividedBy(10), stripeFee.settlement.rounding));
        var roundedTax = new Decimal(Math.round10(roundedStripe.dividedBy(10), stripeFee.settlement.rounding));

        console.log("Rounded Stripe: " + roundedStripe);
        console.log("Floored Stripe: " + flooredStripe);
        console.log("Rounded Tax: " + roundedTax);
        console.log("Floored Tax: " + flooredTax);

        if (roundedTax === flooredTax) {
            return {
                stripePortion: new Money(roundedStripe, stripeFee.settlement.currency),
                GSTPortion: new Money(roundedTax, stripeFee.settlement.currency)
            }
        } else {
            var x = new Money(flooredStripe, stripeFee.settlement.currency);
            var stripePortion = x;
            var GSTPortion = new Money(flooredTax, stripeFee.settlement.currency);
            /* side effect, altering stripe fee obj */
            if ((stripePortion.plus(GSTPortion).amount < stripeFee.settlement.amount) && (roundedStripe.toString() !== flooredStripe.toString())) {
                console.log("was less");
                stripeFee.settlement = stripePortion.plus(GSTPortion);
            }
            return {
                stripePortion: x,
                GSTPortion: stripeFee.settlement.minus(x)
            }
        }

    } else /* No GST applicable */ {
        return {
            stripePortion: stripeFee.settlement,
            GSTPortion: new Money(0, stripeFee.settlement.currency)
        }
    }
};

console.log(GST);

var VAT = function(settledStripeFee, account) {
    var VAT_RATE = new Decimal(0.23);
    if (account.country === "IE") {
        return settledStripeFee.times(VAT_RATE);
    } else /* no Vat required */ {
        return new Money(0, settledStripeFee.currency);
    }
};
var stripeFee = function(charge) {
    this.pricing = charge.pricing;
    this.settledFixedFee = charge.pricing.fixed.convertTo(charge.settlement.currency);
    this.settlement = charge.final
        .times(charge.pricing.percentMultiplier)
        .plus(this.settledFixedFee);

    var gst = new GST(this, charge.account);
    var vat = new VAT(this.settlement, charge.account);
    this.vat = vat;

    if (charge.account.country === "AU" || charge.account.country != "IE") {
        this.final = this.settlement;
        this.GSTPortion = gst.GSTPortion;
    } else {
        this.final = this.settlement.plus(vat);
    }

};



var logger = function(direct) {
    /* charge method? */
    var logString = "Charge:";
    logString += "\n - Presentment: " + direct.presentment +
        "\n - Settlement: " + direct.settlement +
        "\n - Conversion Fee: " + direct.fxFee +
        "\n - Final: " + direct.final +
        "\n - Pricing: " + direct.pricing.percent + "% + " + direct.pricing.fixed +
        "\n - Stripe Fee: " + direct.stripeFee.settlement + " (" +
        direct.pricing.percent + "% + " + direct.stripeFee.settledFixedFee + " of " + direct.final + ")";

    /* GST */
    if (direct.account.country === "AU") {
        logString += "\n - GST: " + direct.stripeFee.GSTPortion + " of the " + direct.stripeFee.settlement + " Stripe Fee is included as GST";
    }

    /* GST */
    if (direct.account.country === "IE") {
        logString += "\n - VAT: " + direct.stripeFee.vat + " is added as VAT to Stripe Fee of " + direct.stripeFee.settlement + ", for a total fee of: " + direct.stripeFee.final;
    }

    if (direct.type !== "Standard") {
        logString += "\n\nPlatform:" +
            "\n - Country: " + direct.platform.country +
            "\n - Default Currency: " + direct.platform.currency;
            if (direct.type !== "SCT") {
            logString += "\n - Platform Fee: " + direct.platform.applicationFee.presentment + " (" +
            direct.platform.applicationFee.settlement + ")";
    }
    }

    logString += "\n\nConnected Account:" +
        "\n - Country: " + direct.account.country +
        "\n - Default Currency: " + direct.account.currency;

    logString += "\n\nCustomer:" +
        "\n - Country: " + direct.customer.country;

    logString += "\n\nSettle The Charge:" +
        "\n1. " + direct.presentment + " Charge created on Connected Account";
    if (direct.presentment.currency !== direct.settlement.currency) {
        logString += "\n1a. " + direct.presentment + " converted to " + direct.settlement +
            "\n1b. After " + direct.account.pricing.fxPercent + "% conversion fee, " + direct.final + " left over";
    }


    if (direct.type === "Direct") {
        logString += "\n\nSplit Funds (Direct Charge):" +
            "\n1. Stripe Fee of " + direct.stripeFee.final + " is taken, leaving " + direct.amountAfterStripeFee +
            "\n2. Application Fee of " + direct.platform.applicationFee.settlement + " is sent to platform, leaving " + direct.connectedPortion + " for Connected Account";

        if (direct.settlement.currency !== direct.platform.currency) {
            logString += "\n2a. " + direct.platform.applicationFee.settlement + " converted to " + direct.platform.applicationFee.final +
                "\n2b. After " + direct.platform.pricing.fxPercent + "% conversion fee, " + direct.platform.applicationFee.finalAfterFxFee + " left for Platform";
        }
    } /* destination */
    else if (direct.type === "Destination") {
        logString += "\n\nSplit Finds (Destination Charge):" +
            "\n1. " + direct.connectedPortion + " is sent to Connected Account, leaving " + direct.platform.applicationFee.settlement + " for Platform" +
            "\n2. Stripe Fee of " + direct.stripeFee.final + " is taken from Platform, leaving " + direct.platform.applicationFee.afterStripeFee + " for Platform";

        if (direct.settlement.currency !== direct.platform.currency) {
            logString += "\n2a. " + direct.platform.applicationFee.afterStripeFee + " converted to " + direct.platform.applicationFee.final +
                "\n2b. After " + direct.platform.pricing.fxPercent + "% conversion fee, " + direct.platform.applicationFee.finalAfterFxFee + " left for Platform";
        }
    } else if (direct.type === "Destination") {
        logString += "\n\nSplit Finds (Destination Charge):" +
            "\n1. " + direct.connectedPortion + " is sent to Connected Account, leaving " + direct.platform.applicationFee.settlement + " for Platform" +
            "\n2. Stripe Fee of " + direct.stripeFee.final + " is taken from Platform, leaving " + direct.platform.applicationFee.afterStripeFee + " for Platform";

        if (direct.settlement.currency !== direct.platform.currency) {
            logString += "\n2a. " + direct.platform.applicationFee.afterStripeFee + " converted to " + direct.platform.applicationFee.final +
                "\n2b. After " + direct.platform.pricing.fxPercent + "% conversion fee, " + direct.platform.applicationFee.finalAfterFxFee + " left for Platform";
        }
    } else if (direct.type === "Standard") {
        logString += "\n\nStandard Charge:" +
            "\n1. Stripe Fee of " + direct.stripeFee.final + " is taken, leaving " + direct.final.minus(direct.stripeFee.final);
    } else /* SCT */ {
        logString += "\n\nSCT Charge:" +
            "\n1. Stripe Fee of " + direct.stripeFee.final + " is taken, leaving " + direct.final.minus(direct.stripeFee.final);
    }


    this.toString = function() {
        return logString;
    };


};

function getInputElements() {
    return {
        customerCard: document.getElementById("customer-card"),
        connectedCountry: document.getElementById("connected-country"),
        connectedCurrency: document.getElementById("connected-currency"),
        platformCountry: document.getElementById("platform-country"),
        platformCurrency: document.getElementById("platform-currency"),
        platformFee: document.getElementById("platform-fee"),
        chargeAmount: document.getElementById("charge-amount"),
        chargeCurrency: document.getElementById("charge-currency"),
        calculateButton: document.getElementById("calculateButton"),
        directButton: document.getElementById("direct_button"),
        outcome: document.getElementById("outcome"),
    };
}

window.onload = function() {
    var elements = getInputElements();

    console.log(elements);

    var platformElement = getPlatformElement();
    var radioFormElement = getChargeRadioForm();
    var radios = document.getElementsByName("flow");

    function getPlatformElement() {
        return document.getElementsByClassName("platform-form")[0];
    }

    function getChargeRadioForm() {
        return document.getElementsByClassName("flow-form")[0];
    }

    function getChargeType() {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value
            };
        }
    }


    radioFormElement.addEventListener("click", function(event) {
        if (event.target.type === "radio") {
            if (event.target.value === "Standard") {
                platformElement.classList.remove("visible");
            } else {
                platformElement.classList.add("visible");
            }
        }
    });



    function chargeFromInput() {
        var a = elements.customerCard.value;
        var b = elements.connectedCountry.value;
        var c = elements.connectedCurrency.value;
        var d = elements.platformCountry.value;
        var e = elements.platformCurrency.value;
        var f = elements.platformFee.value;
        var g = elements.chargeAmount.value;
        var h = elements.chargeCurrency.value;


        var flow = getChargeType();
        console.log(flow);
        var myCharge = new Charge[flow]({
            amount: g,
            currency: h,
            customer: {
                country: a,
            },
            account: {
                country: b,
                currency: c
            },
            platform: {
                country: d,
                currency: e,
                percentFee: f
            }
        });

        console.log(myCharge);

        log = new logger(myCharge);

        return log;
    }

    // Calculate button callback
    elements.calculateButton.addEventListener('click', function() {
        var y = new chargeFromInput();
        elements.outcome.value = y;
        elements.outcome.style.display = "block";
    });

};
