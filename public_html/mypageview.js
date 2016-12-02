    // myPageView_Bloggerモジュール
    var myPageView_Blogger = myPageView_Blogger || function(){
        var pv = { // グローバルスコープに出すオブジェクト。グローバルスコープから呼び出すときはmyPageViewになる。
            all: function(id){ // ここから開始する。引数にページビュー設定に置換する要素のidを入れる。
                var elem = document.getElementById(id);  // idの要素を取得。
                var h3Node = createElem("h3");  // 現在の状態を表示するh3タグの要素を作成。
                if(!navigator.cookieEnabled){  // cookieが有効でない場合。
                  h3Node.textContent = "cookieを有効にしてください。";  // h3タグの要素のテキストに代入。
                  elem.appendChild(h3Node);  // idの要素の子要素に追加して表示させる。
                  return;  // スクリプト終わり。
                }
                h3Node.style.paddingBottom = "20px";  // h3タグの要素の下部に20px空ける。
                var aNode = createElem("a");  // aタグの要素を作成。
                aNode.href = "#";  // aタグの要素のhrefを設定。
                var divNodeLink = createElem("div");  // aNodeの親要素となるdivタグの要素を作成。
                divNodeLink.appendChild(aNode);  // aNodeをdivNodeLinkの要素の子要素にする。
                var divNodeOffLink = createElem("div");  // aタグ要素ない方のdivタグの要素を作成。
                divNodeOffLink.style.color = "#cccccc";  // divNodeOffLinkの色を設定。
                display([elem, h3Node, divNodeLink, divNodeOffLink]); // 子要素以外を配列で渡す。
            }
        };  // end of pv
        var vars ={ // モジュール内の"グローバル"変数。
            domein: location.hostname,  // ブログのドメイン。
            on_msg: "自分のページビューを追跡に変更する\uff61",  // 2行目に表示させるメッセージ。
            off_msg: "自分のページビューを追跡しないに変更する\uff61"  // 3行目に表示させるメッセージ。
        };     
        function createElem(tag){  // tagの要素を作成して返す。
            return document.createElement(tag); 
        }
        function trackOff(elems){  // ページビューを追跡していないときの表示を作成。
            elems[1].textContent = "この"+vars.domein+"はページビューを追跡していません\uff61"; 
            elems[2].firstChild.onclick = function(){setCookie(2000, elems);return false;};  // aタグのプロパティを設定。
            elems[2].firstChild.textContent = vars.on_msg;
            elems[3].textContent = vars.off_msg;  // aタグがない方のプロパティを設定。
            return [].concat(elems);  // 配列は参照渡しなのでコピーを返す。          
        }
        function trackOn(elems){  // ページビューを追跡しているときの表示を作成。
            elems[1].textContent = "この"+vars.domein+"はページビューを追跡しています\uff61"; 
            elems[2].firstChild.onclick = function(){setCookie(2030, elems);return false;};  // aタグのプロパティを設定。
            elems[2].firstChild.textContent = vars.off_msg;
            elems[3].textContent = vars.on_msg;  // aタグがない方のプロパティを設定。
            return [elems[0], elems[1], elems[3], elems[2]];  // aタグがある方の要素を最後に表示させるように配列の順を入れ替えて返す。    
        }
        function display(elems){  // 要素の配列を引き数にしてidの要素の子要素に追加して表示させる。
            var e = (document.cookie.match("_ns=2"))?trackOff(elems):trackOn(elems);  // _ns=2のcookieがあると追跡していない、ないと追跡している。
            if (e) {
                e.push(chTLD());  // comとjpを入れ替えるaタグが入ったdiv要素を追加。
                var elem = e.shift();  // 要素の配列からidの要素を切り出す。
                elem.textContent = null;  // 子要素をすべて削除する。
                e.forEach(function(n){elem.appendChild(n);});  // idの要素以外の要素を順番にidの要素の子要素に追加して表示させる。
            }                 
        }
        function setCookie(year, elems){  // aタグの要素がクリックされた時に起動する関数。
            document.cookie="_ns=2;expires=Sun, 09 Aug " + year + " 11:53:58 GMT;domain=." + vars.domein + ";path=/;";  // cookieの有効期限を過去にするとcookieが消える。
            display(elems);  // 表示の更新。
        } 
        function chTLD(){  // comとjpを入れ替えるaタグが入ったdiv要素を返す。
            var domein = vars.domein;  // ドメイン。
            var flg = /.com$/i.test(domein);  // TLDがcomかの判定。
            domein = (flg)?domein.replace(".com",".jp"):domein.replace(".jp",".com");  // ドメインのcomとjpを入れ替える。
            var url = document.URL;  // このページのURL。
            var aNode = createElem("a");  // aタグの要素を作成。
            aNode.href = (flg)?url.replace(".com",".jp"):url.replace(".jp",".com/ncr");  // このページのURLのcomとjpを入れ替えてhrefに設定。
            aNode.textContent = domein + "も設定する\uff61";
            var divNodeLink = createElem("div");  // aNodeの親要素となるdivタグの要素を作成。
            divNodeLink.appendChild(aNode);  // aNodeをdivNodeLinkの要素の子要素にする。
            divNodeLink.style.paddingTop = "20px";
            return divNodeLink;
        }
        return pv;  // グローバルスコープにpvを返す。
    }();
    myPageView_Blogger.all("myPageView");  // これでmyPageViewモジュールを起動する。引き数はページビュー設定を表示させる要素のid。