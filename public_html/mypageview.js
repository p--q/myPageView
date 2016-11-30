    var myPageView = myPageView || function(){
        pv = {
            buttuns:{
                setCookie: function(year){
                    document.cookie="_ns=2;expires=Sun, 09 Aug " + year + " 11:53:58 GMT;domain=." + vars.domein + ";path=/;";
                }
            },
            all: function(){
                if(!navigator.cookieEnabled){
                  vars.h3Node.textContent = "cookieを有効にしてください。";
                  vars.elem.appendChild(vars.h3Node);
                  return;
                }
                vars.aNode.href = "#";
                vars.divNode.style.color = "#cccccc";
                if(document.cookie.match("_ns=2")){
                    vars.h3Node.textContent = "この"+vars.domein+"はページビューを追跡していません。"; 
                    vars.aNode.onclick = function(){myPageView.buttuns.setCookie(2000);return false;}
                    vars.aNode.textContent = vars.on_msg;
                    vars.divNode.textContent = vars.off_msg;
                    vars.childelems = [vars.h3Node, vars.aNode, vars.divNode];
                } else {
                    vars.h3Node.textContent = "この"+vars.domein+"はページビューを追跡しています。"; 
                    vars.aNode.onclick = function(){myPageView.buttuns.setCookie(2030);return false;}
                    vars.aNode.textContent = vars.off_msg;
                    vars.divNode.textContent = vars.on_msg;
                    vars.childelems = [vars.h3Node, vars.divNode, vars.aNode];                    
                }
                if (vars.childelems) {
                    vars.childelems.forEach(function(n){vars.elem.appendChild(n);})
                }
            }
        }  // end of pv
        var vars ={
            elem: document.getElementById("myPageView"),
            h3Node: document.createElement('h3'),
            domein: location.hostname,
            aNode: document.createElement("a"),
            on_msg: "自分のページビューを追跡に変更する。",
            off_msg: "自分のページビューを追跡しないに変更する。",
            divNode: document.createElement('div'),
            childelems: []
        }
        return pv;
    }();
    myPageView.all();