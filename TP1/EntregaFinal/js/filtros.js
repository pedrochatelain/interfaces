
function setNegativo(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
            imageDataConFiltro.data[index + 0] = 255 - imageDataConFiltro.data[index + 0];
            imageDataConFiltro.data[index + 1] = 255 - imageDataConFiltro.data[index + 1];
            imageDataConFiltro.data[index + 2] = 255 - imageDataConFiltro.data[index + 2];
        }
    }
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);
}

function setBrillo(canvas, elasticCanvas) {
    let ctxElasticCanvas = elasticCanvas.getContext("2d");
    let imageData = ctxElasticCanvas.getImageData(0, 0, elasticCanvas.width, elasticCanvas.height);
    let imageDataConFiltro = imageData;
    for (let j = 0; j < elasticCanvas.height; j++) {
        for (let i = 0; i < elasticCanvas.width; i++) {
            let index = (i + elasticCanvas.width * j) * 4;
            // convertir pixel rgb a hsl
            let r = imageDataConFiltro.data[index + 0];
            let g = imageDataConFiltro.data[index + 1];
            let b = imageDataConFiltro.data[index + 2]

            let hsl = RGBToHSL(r,g,b);

            hsl.l = hsl.l+10;

            let rgb = HSLToRGB(hsl.h, hsl.s, hsl.l);

            imageDataConFiltro.data[index + 0] = rgb.r;
            imageDataConFiltro.data[index + 1] = rgb.g;
            imageDataConFiltro.data[index + 2] = rgb.b;
        }
    }
    ctxElasticCanvas.putImageData(imageDataConFiltro, 0, 0);
    isImageBig(elasticCanvas, canvas) ? drawScaledImage(elasticCanvas, canvas) : drawImage(elasticCanvas, canvas);

}