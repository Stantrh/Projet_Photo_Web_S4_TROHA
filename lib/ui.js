import Handlebars from 'handlebars';

/**
 * Image c'est l'objet json qui représente une image, la template handlebars s'en occupe
 * @param image
 * @returns {Promise<void>}
 */
export function displayPicture(image){
    const htmlTemplate = document.querySelector("#photoTemplate").innerHTML;
    const template = Handlebars.compile(htmlTemplate);

    // On doit modifier l'objet image avant de le passer à la template Handlebars. Car on doit récupérer la liste des commentaires
    document.querySelector("section#la_photo").innerHTML = template(image);
}

/**
 * Prend l'objet json qui représente la catégorie, pour ensuite l'afficher en html
 */
export function displayCategory(category){
    const htmlCategory = document.querySelector('#la_categorie');
    htmlCategory.textContent = `catégorie : ${category.categorie.nom}`;
}

/**
 * Identique à la fonction au dessus, mais pour afficher tous les commentaires.
 * @param comments
 */
export function displayComments(comments){
    const htmlComments = document.querySelector("#les_commentaires");
    htmlComments.innerHTML = '';
    comments.comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = `(${comment.pseudo}) ` + comment.content
        htmlComments.appendChild(li);
    })
}