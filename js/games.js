const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 768;

const background = new Image();
background.src = "./pics/Barcelona-Street-map.png";

const sagrada = new Image();
sagrada.src = "./pics/SagradaFamilia-192.png";

const parcguell = new Image();
parcguell.src = "./pics/parcGuell-192.png";

const palaumusica = new Image();
palaumusica.src = "./pics/palaumusica-192.png";

const maxy = new Image();
maxy.src = "./pics/Max-head-round-96.png";

const montjuic = new Image();
montjuic.src = "./pics/montjuic-192.png";

const jerry = new Image();
jerry.src = "./pics/Jerry-head-round-96.png";





// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
};




function copyImageToCanvas(){
    
    ctx.drawImage(maxy, 490, 638);

    ctx.drawImage(parcguell, 10,10)

    ctx.drawImage(sagrada, 800, 10)

    ctx.drawImage(palaumusica, 800, 450)

    ctx.drawImage(montjuic, 10, 450  )
           

}



setTimeout(() => { copyImageToCanvas(); }, 300);

