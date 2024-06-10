import config from "./config";

/*
La fonction reçoit un identifiant d'image et retourne une
promesse qui se résout en un objet javascript contenant la description de la photo. Les
erreurs sont traitées dans cette fonction
 */
export async function loadPicture(idPicture) {
    try {
        const rp = await fetch(config.apiPhox + '/photos/' + idPicture); // On tente de récupérer le res de la requête
        if(!rp.ok){
            throw new Error(`Erreur: ${rp.status}, ${rp.statusText}`); // On met les deux au cas où
        }
        const rpFormattee = await rp.json(); // On met un await car json() est une fonction
        rpFormattee.photo.url.href = `${config.apiUL}${rpFormattee.photo.url.href}`; // l'url commence qu'à /www/canals5, fallait donc avoir le début donc je modifie l'objet
        return rpFormattee;
    }catch(error){
        console.error('Erreur dans loadPicture', error);
        throw error;
    }
}

export async function loadResource(uri){
    try{
        const rp = await fetch(uri);
        if(!rp.ok){
            throw new Error(`Erreur: ${rp.status}, ${rp.statusText}`);
        }
        return await rp.json();
    }catch(error){
        console.error('Erreur dans loadResource', error);
        throw error;
    }
}


