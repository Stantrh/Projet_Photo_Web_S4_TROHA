import {loadPicture, loadResource} from "./lib/photoloader.js";
import {displayCategory, displayPicture,displayComments} from "./lib/ui.js";
import {load, next, prev, last, first} from "./lib/gallery";
import {display_gallerie, closeLightbox, navigateLightbox} from "./lib/gallery_ui";
import config from "./lib/config";

export async function getPicture(id){
    try {
        const data = await loadPicture(id); // On récupère bien les données de photoloader grâce au await, sinon ça lance une exception
        const category = await getCategory(data);
        const comments = await getComments(data);

        displayPicture(data);
        displayCategory(category);
        displayComments(comments);
    }catch (error) {
        console.error('Erreur dans getPicture', error);
        throw error
    }
}

/**
 * A partir d'un json qui représente l'image, retourne l'objet categorie
 * @param image
 * @returns {Promise<void>}
 */
async function getCategory(image){
    // On doit déjà récupérer le lien qui correspond au lien de la catégorie, pour ensuite faire la requête
    const url = config.apiUL + image.links.categorie.href;
    return await loadResource(url);

}

async function getComments(image){
    // On doit déjà récupérer le lien qui correspond au lien de la catégorie, pour ensuite faire la requête
    const url = config.apiUL + image.links.comments.href;
    return await loadResource(url);
}


// Dès que le DOM est chargé, alors on peut attribuer les listeners
document.addEventListener('DOMContentLoaded', () => {
    getPicture(window.location.hash ? window.location.hash.substr(1): 10);


    const afficherGalerieBtn = document.querySelector("#loadGalleryBtn");
    afficherGalerieBtn.addEventListener('click', async function() {
        const gallery = await load();
        display_gallerie(gallery);
    });

    const boutonNavigation = document.querySelector("#navigation");
    boutonNavigation.addEventListener('click', async (e) => {
        // On vérifie qu'on clique bien sur un bouton pour pas que l'évènement essaye de se faire si on clique sur
        // l'espace entre les boutons (donc ça fera un click sur les div mais essayera d'appeler display_gallerie
        // avec une mauvaise galerie
        if(e.target.tagName.toLowerCase() === 'button'){
            // Et on vérifie quel est le bouton appuyé en particulier
            let gallery = {};
            switch (e.target.id){
                case 'firstBtn':
                    gallery = await first();

                    break;
                case 'prevBtn':
                    gallery = await prev();
                    break;
                case 'nextBtn':
                    gallery = await next();
                    break;
                case 'lastBtn':
                    gallery = await last();
                    break;
            }
            display_gallerie(gallery)

        }
    });


    // Partie Lightbox
    // J'ai exporté les fonctions déclarées dans gallery_ui pour pouvoir associer les callback aux listeners

    document.getElementById('closeLightboxBtn').addEventListener('click', closeLightbox);

    document.getElementById('prevLightboxBtn').addEventListener('click', () => {
        navigateLightbox('prev');
    });

    document.getElementById('nextLightboxBtn').addEventListener('click', () => {
        navigateLightbox('next');
    });
});