// Module pour le chargement et la pagination des galleries
import {loadResource} from "./photoloader";
import config from "./config";

let navigationLinks = {}; // contient les url de navigation


/*
    Pour la question 1.1, cela renvoie un objet qui contient plusieurs champs :
    - type
    - count (nb de photos)
    - size taille du champ "photos"
    - links . contient le lien de la prochaine page, le lien de la précédente, le lien de la dernière, et le lien de la première
    - photos, qui contient une liste d'objets photo
 */

/**
 * Charge une collection de photos à l'aide de photoloader
 * @returns {Promise<void>}
 */
export async function load(){
    const url = config.apiPhox + "/photos";
    const galleryData = await loadResource(url);
    // On stocke aussi les liens de navigation dans une variable
    navigationLinks = galleryData.links
    return galleryData;
}

/**
 * Permet de récupérer la collection suivante de photos à partir d'une collection déjà existante
 * @returns {Promise<any>}
 */
export async function next() {
    try {
        if (navigationLinks.next) { // on vérifie si y a déjà quelque chose dans navigationLinks, sinon on load nous même
            const url = config.apiUL + navigationLinks.next.href;
            const galleryData = await loadResource(url);
            navigationLinks = galleryData.links;
            return galleryData;
        }else{ // On est dans le cas où les liens sont pas init (donc galerie pas chargée
            return await load();
        }
    } catch (error) { // donc si navigationLinks pas defined, on load nous même et on display pour gérer l'erreur

    }


}

/**
 * Permet de récupérer la collection précédente de photos à partir d'une collection déjà existante
 * @returns {Promise<any>}
 */
export async function prev() {
    try {
        if (navigationLinks.prev) {
            const url = config.apiUL + navigationLinks.prev.href;
            const galleryData = await loadResource(url);
            navigationLinks = galleryData.links;
            return galleryData;
        }else{
            return await load();
        }
    } catch (error) {

    }
}

/**
 * Permet de récupérer la première collection de photos
 * @returns {Promise<any>}
 */
export async function first() {
    try {
        if (navigationLinks.first) {
            const url = config.apiUL + navigationLinks.first.href;
            const galleryData = await loadResource(url);
            navigationLinks = galleryData.links;
            return galleryData;
        }else{
            return await load();
        }
    } catch (error) {

    }
}

/**
 * Permet de récupérer la dernirèe collection de photos
 * @returns {Promise<any>}
 */
export async function last() {
    try {
        if (navigationLinks.last) {
            const url = config.apiUL + navigationLinks.last.href;
            const galleryData = await loadResource(url);
            navigationLinks = galleryData.links;
            return galleryData;
        }else{
            return await load();
        }
    } catch (error) {

    }
}