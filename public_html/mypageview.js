var domein=location.hostname;
var domein_TLD_nashi=domein.slice(0,domein.lastIndexOf(".")+1);
//if(document.referrer.match("http://"+domein_TLD_nashi)){
 if(navigator.cookieEnabled){
   if(document.cookie.match("_ns=2")){
      document.write("<h3"+">この"+domein+"はページビューを追跡していません。</h3"+"><br/>");
      document.write("<a href=\'javascript:document.cookie=\"_ns=2;expires=Sun, 09 Aug 2000 11:53:58 GMT;domain=."+domein+";path=/;\";location.reload();\'>自分のページビューを追跡に変更する</a><br/>");
      document.write("<span style=\'color: #cccccc;\'>自分のページビューを追跡しないに変更する。</span><br/>");
   }else{
      document.write("<h3"+">この"+domein+"はページビューを追跡しています</h3"+"><br/>");
      document.write("<span style=\'color: #cccccc;\'>自分のページビューを追跡に変更する</span><br/>");
      document.write("<a href=\'javascript:document.cookie=\"_ns=2;expires=Sun, 09 Aug 2030 11:53:58 GMT;domain=."+domein+";path=/;\";location.reload();\'>自分のページビューを追跡しないに変更する。</a><br/>");
   }
   if(domein.match(/.com$/)){
      document.write("<a href=\'"+document.URL.replace(".com",".jp")+"\'>"+domein_TLD_nashi+"jpも設定する</a>");
   }else{
      document.write("<a href=\'"+document.URL.replace(".jp",".com/ncr")+"\'>"+domein_TLD_nashi+"comも設定する</a>");
   }
 }else{
   document.write("cookieが使用できません。");
 }
//}else{
// location.href="http://"+domein;
//}


