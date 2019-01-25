var TEST_WORKER_URL = '/js/test-worker.js'

/**
 * This function will check existance of crypto or msCrypto
 * inside web workers
 * 
 * @param {Modernizr} M 
 */
function addWorkerscryptoTest(M) {
  M.addAsyncTest(function() {
    console.log('asynctest')
    var prerequisites = !!(M.webworkers);

    // Early exit
    if (!prerequisites) {
      return M.addTest('workerscrypto', false);
    }

    try {
      var worker = new Worker(TEST_WORKER_URL),
        timeout;

      // Just in case...
      worker.onerror = fail;
      worker.onmessage = function(msg) {
        if (msg.data === 'ok') {                
            M.addTest('workerscrypto', true);
            cleanup()
        } else {
            fail()
        }
      }
      worker.postMessage('test')

      timeout = setTimeout(fail, 5000);    
    } catch (e) {
      console.error(e)
      fail();
    }

    function fail() {
      M.addTest('workerscrypto', false);
      cleanup();
    }

    function cleanup() {
      if (worker) {
        worker.terminate();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  });
}

/**
 * You need to patch minified code here after change modernizr features.
 * Just add `addWorkerscryptoTest(Modernizr)` to the minified code, between addTest function calls
 * 
 * #TODO: Make custom modernizr build with `addWorkerscryptoTest` function inside
 */

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-cookies-filereader-flexbox-getrandomvalues-indexeddb-inlinesvg-localstorage-svgasimg-webworkers-addtest-setclasses !*/
 !function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var l in _)if(_.hasOwnProperty(l)){if(e=[],n=_[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function i(e){var n=T.className,t=Modernizr._config.classPrefix||"";if(k&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),k?T.className.baseVal=n:T.className=n)}function s(e,n){if("object"==typeof e)for(var t in e)b(e,t)&&s(t,e[t]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;n="function"==typeof n?n():n,1==r.length?Modernizr[r[0]]=n:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=n),i([(n&&0!=n?"":"no-")+r.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):k?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function u(e,n){return!!~(""+e).indexOf(n)}function f(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?f(o,t||n):o);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function v(){var e=n.body;return e||(e=a(k?"svg":"body"),e.fake=!0),e}function m(e,t,r,o){var i,s,l,u,f="modernizr",d=a("div"),c=v();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:f+(r+1),d.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+f,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=f,c.fake&&(c.style.background="",c.style.overflow="hidden",u=T.style.overflow,T.style.overflow="hidden",T.appendChild(c)),s=t(d,e),c.fake?(c.parentNode.removeChild(c),T.style.overflow=u,T.offsetHeight):d.parentNode.removeChild(d),!!s}function g(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(n[o])+":"+r+")");return i=i.join(" or "),m("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==p(e,null,"position")})}return t}function h(e,n,o,i){function s(){d&&(delete j.style,delete j.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var f=g(e,o);if(!r(f,"undefined"))return f}for(var d,c,p,v,m,h=["modernizr","tspan","samp"];!j.style&&h.length;)d=!0,j.modElem=a(h.shift()),j.style=j.modElem.style;for(p=e.length,c=0;p>c;c++)if(v=e[c],m=j.style[v],u(v,"-")&&(v=l(v)),j.style[v]!==t){if(i||r(o,"undefined"))return s(),"pfx"==n?v:!0;try{j.style[v]=o}catch(y){}if(j.style[v]!=m)return s(),"pfx"==n?v:!0}return s(),!1}function y(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+z.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,i):(a=(e+" "+R.join(s+" ")+s).split(" "),d(a,n,t))}function w(e,n){var t=e.deleteDatabase(n);t.onsuccess=function(){s("indexeddb.deletedatabase",!0)},t.onerror=function(){s("indexeddb.deletedatabase",!1)}}function x(e,n,r){return y(e,t,t,n,r)}var C=[],_=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){_.push({name:e,fn:n,options:t})},addAsyncTest:function(e){_.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr,Modernizr.addTest("cookies",function(){try{n.cookie="cookietest=1";var e=-1!=n.cookie.indexOf("cookietest=");return n.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(t){return!1}}),Modernizr.addTest("filereader",!!(e.File&&e.FileList&&e.FileReader)),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(n){return!1}}),Modernizr.addTest("webworkers","Worker"in e);var b,T=n.documentElement,k="svg"===T.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;b=r(e,"undefined")||r(e.call,"undefined")?function(e,n){return n in e&&r(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),S._l={},S.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},S._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,r;for(e=0;e<t.length;e++)(r=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){S.addTest=s}),Modernizr.addTest("svgasimg",n.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")),addWorkerscryptoTest(Modernizr),Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var P="Moz O ms Webkit",z=S._config.usePrefixes?P.split(" "):[];S._cssomPrefixes=z;var E=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+n}return!1};S.atRule=E;var R=S._config.usePrefixes?P.toLowerCase().split(" "):[];S._domPrefixes=R;var L={elem:a("modernizr")};Modernizr._q.push(function(){delete L.elem});var j={style:L.elem.style};Modernizr._q.unshift(function(){delete j.style}),S.testAllProps=y;var A=S.prefixed=function(e,n,t){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=l(e)),n?y(e,n,t):y(e,"pfx"))};Modernizr.addAsyncTest(function(){var n;try{n=A("indexedDB",e)}catch(t){}if(n){var r="modernizr-"+Math.random(),o=n.open(r);o.onerror=function(){o.error&&"InvalidStateError"===o.error.name?s("indexeddb",!1):(s("indexeddb",!0),w(n,r))},o.onsuccess=function(){s("indexeddb",!0),w(n,r)}}else s("indexeddb",!1)});var N,O=A("crypto",e);if(O&&"getRandomValues"in O&&"Uint32Array"in e){var U=new Uint32Array(10),V=O.getRandomValues(U);N=V&&r(V[0],"number")}Modernizr.addTest("getrandomvalues",!!N),S.testAllProps=x,Modernizr.addTest("flexbox",x("flexBasis","1px",!0)),o(),i(C),delete S.addTest,delete S.addAsyncTest;for(var I=0;I<Modernizr._q.length;I++)Modernizr._q[I]();e.Modernizr=Modernizr}(window,document);

// Do not remove when updating! Not from modernizr, added manually
document.documentElement.className += ' javascript'
