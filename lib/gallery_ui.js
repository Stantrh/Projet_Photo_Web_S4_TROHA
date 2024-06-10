import Handlebars from 'handlebars';
import config from "./config.js";
import {getPicture} from "../index";

/**
 * Reçoit le JSON d'une gallerie et l'affiche en html
 * @param galerie
 */
export function display_gallerie(galerie){
    const htmlGallerie = document.querySelector("#galleryTemplate").innerHTML;
    const template = Handlebars.compile(htmlGallerie);

    // Pour que ça s'affiche avec une URL valide
   galerie.photos = galerie.photos.map(photo => {
        photo.photo.thumbnail.href = config.apiUL + photo.photo.thumbnail.href;
        return photo;
    });

    document.querySelector("#gallery").innerHTML = template(galerie);

    // Maintenant on ajoute un listener sur une balise parente aux img
    // Et comme ça, lorsqu'une image sera cliquée on l'affiche dans l'endroit "la_photo" et aussi
    // on ouvre la lightbox
    const containerPhotos = document.querySelector("#containerPhotos");
    containerPhotos.addEventListener('click', (e) => {
        // comme on a mis le listener sur un div qui ensuite contient plusieurs div pour chaque image
        // on vérifie si l'élement sur lequel on a cliqué est bien une balise img et pas un div (entre deux images par ex)
        if(e.target.tagName.toLowerCase() === 'img'){
            const idImg = e.target.dataset.photoid;
            getPicture(idImg);

            // Puis on gère aussi l'ouverture de la lightbox
            openLightbox(e.target.src);
        }

    })
}


/**
 * Appelée en callback lors du click sur une image, permet d'ouvrir la lightbox
 * @param src
 */
export function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = src;
    lightbox.style.display = 'flex'; // en mettant flex, la lightbox apparait
}


/**
 * Appelée en callback lors du click sur la croix de la lightbox, pour la fermer
 */
export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; // en mettant none, elle disparait
}


/**
 * Appelée en callback lors des clicks sur les flèches pour défiler entre les images de la lightbox
 * @param direction
 */
export function navigateLightbox(direction) {
    // On récupère l'image courante qui est dans la balise img de la lightbox
    const imgCourante = document.getElementById('lightboxImg').src;

    // On récupère toutes les images grâce à leur classe
    const images = document.querySelectorAll('.thumbnail img');

    // on récupère l'index de l'image courante
    let indiceImg = Array.from(images).findIndex(img => img.src === imgCourante);

    // Et en fonction de si on appuie sur flêche de droite ou de gauche on ajoute 1
    // et on divise en gardant le reste par la longueur totale au cas où on arrive à la fin de la liste
    if (direction === 'next') {
        indiceImg = (indiceImg + 1) % images.length;
    } else if (direction === 'prev') {
        indiceImg = (indiceImg - 1 + images.length) % images.length;
    }

    // Puis on met la nouvelle images au nouvel index
    document.getElementById('lightboxImg').src = images[indiceImg].src;
}


