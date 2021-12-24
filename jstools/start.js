
function opennew(){
  nw.Window.open('preprocess.html',function (w){
    w.resizeTo(800, 800);
  });
}

nw.App.on('open', opennew);

opennew();
