    var myPageView = myPageView || function(){
        pv = {
            all: function(id){
                var elem = document.getElementById(id);
                var h3Node = createElem("h3");
                if(!navigator.cookieEnabled){
                  h3Node.textContent = "cookieを有効にしてください。";
                  elem.appendChild(h3Node);
                  return;
                }
                var aNode = createElem("a");
                aNode.href = "#";
                var divNodeLink = createElem("div");
                divNodeLink.appendChild(aNode);
                var divNodeOffLink = createElem("div");
                divNodeOffLink.style.color = "#cccccc";
                Display([elem, h3Node, divNodeLink, divNodeOffLink]); 
            }
        };  // end of pv
        var vars ={
            domein: location.hostname,
            on_msg: "自分のページビューを追跡に変更する。",
            off_msg: "自分のページビューを追跡しないに変更する。"
        };     
        function createElem(tag){
            return document.createElement(tag); 
        }
        function trackOff(elems){
            elems[1].textContent = "この"+vars.domein+"はページビューを追跡していません。"; 
            elems[2].firstChild.onclick = function(){setCookie(2000, elems);return false;};
            elems[2].firstChild.textContent = vars.on_msg;
            elems[3].textContent = vars.off_msg;
            return [].concat(elems);           
        }
        function trackOn(elems){
            elems[1].textContent = "この"+vars.domein+"はページビューを追跡しています。"; 
            elems[2].firstChild.onclick = function(){setCookie(2030, elems);return false;};
            elems[2].firstChild.textContent = vars.off_msg;
            elems[3].textContent = vars.on_msg;
            return [elems[0], elems[1], elems[3], elems[2]];              
        }
        function Display(elems){
            e = (document.cookie.match("_ns=2"))?trackOff(elems):trackOn(elems);
            if (e) {
                var elem = e.shift();
                e.forEach(function(n){elem.appendChild(n);});
            }                 
        }
        function setCookie(year, elems){
            document.cookie="_ns=2;expires=Sun, 09 Aug " + year + " 11:53:58 GMT;domain=." + vars.domein + ";path=/;";
            Display(elems);               
        }
        return pv;
    }();
    myPageView.all("myPageView");