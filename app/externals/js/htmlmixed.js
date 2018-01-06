CodeMirror.defineMode("htmlmixed",function(a,b){function i(a,b){var f=b.htmlState.tagName,g=c.token(a,b.htmlState);if("script"==f&&/\btag\b/.test(g)&&">"==a.current()){var h=a.string.slice(Math.max(0,a.pos-100),a.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);h=h?h[1]:"",h&&/[\"\']/.test(h.charAt(0))&&(h=h.slice(1,h.length-1));for(var i=0;i<e.length;++i){var j=e[i];if("string"==typeof j.matches?h==j.matches:j.matches.test(h)){j.mode&&(b.token=k,b.localMode=j.mode,b.localState=j.mode.startState&&j.mode.startState(c.indent(b.htmlState,"")));break}}}else"style"==f&&/\btag\b/.test(g)&&">"==a.current()&&(b.token=l,b.localMode=d,b.localState=d.startState(c.indent(b.htmlState,"")));return g}function j(a,b,c){var f,d=a.current(),e=d.search(b);return e>-1?a.backUp(d.length-e):(f=d.match(/<\/?$/))&&(a.backUp(d.length),a.match(b,!1)||a.match(d[0])),c}function k(a,b){return a.match(/^<\/\s*script\s*>/i,!1)?(b.token=i,b.localState=b.localMode=null,i(a,b)):j(a,/<\/\s*script\s*>/,b.localMode.token(a,b.localState))}function l(a,b){return a.match(/^<\/\s*style\s*>/i,!1)?(b.token=i,b.localState=b.localMode=null,i(a,b)):j(a,/<\/\s*style\s*>/,d.token(a,b.localState))}var c=CodeMirror.getMode(a,{name:"xml",htmlMode:!0}),d=CodeMirror.getMode(a,"css"),e=[],f=b&&b.scriptTypes;if(e.push({matches:/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,mode:CodeMirror.getMode(a,"javascript")}),f)for(var g=0;g<f.length;++g){var h=f[g];e.push({matches:h.matches,mode:h.mode&&CodeMirror.getMode(a,h.mode)})}return e.push({matches:/./,mode:CodeMirror.getMode(a,"text/plain")}),{startState:function(){var a=c.startState();return{token:i,localMode:null,localState:null,htmlState:a}},copyState:function(a){if(a.localState)var b=CodeMirror.copyState(a.localMode,a.localState);return{token:a.token,localMode:a.localMode,localState:b,htmlState:CodeMirror.copyState(c,a.htmlState)}},token:function(a,b){return b.token(a,b)},indent:function(a,b){return!a.localMode||/^\s*<\//.test(b)?c.indent(a.htmlState,b):a.localMode.indent?a.localMode.indent(a.localState,b):CodeMirror.Pass},electricChars:"/{}:",innerMode:function(a){return{state:a.localState||a.htmlState,mode:a.localMode||c}}}},"xml","javascript","css"),CodeMirror.defineMIME("text/html","htmlmixed");