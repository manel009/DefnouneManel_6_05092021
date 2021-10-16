// On charge la classe Photographer et Media
import { Photographer } from "./class/photographer.js";
import { Media } from "./class/media.js";



/** Charge les donnees et affiche la page
 * 
 */
export function loadPage() {
    $.getJSON("../data/data.json", function(dataJson) {
        var data = dataJson;
        var dataPhotographers = data.photographers;
        var dataMedias = data.media;

        // On recupere le parametre dans l'url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idPhotographer = urlParams.get('id');

        // Si un id dans l'url, on affiche la page du photographe sinon la page d'acceuil
        if (idPhotographer > 0) {
            hideElement("nav-categories");
            hideElement("title-photographers-header");
            hideElement("top-button");
            document.getElementById("photographer-profil").style.display = "flex";
            let photographe = findPhotographer(idPhotographer, dataPhotographers, dataMedias);
            window.photographe = photographe;
            printPhotographerPage(photographe);
        } else {

            window.onscroll = function() {
                scrollFunction()
            };
            printHomePage(dataPhotographers);
        }
    });
}

/** Renvoi le photographe avec l'id en param
 * 
 * @param {*} idPhotographer 
 * @param {*} dataPhotographers 
 * @returns 
 */
function findPhotographer(idPhotographer, dataPhotographers, dataMedias) {
    let photographer = "";
    let indice = 0;

    while (photographer == "") {

        if (dataPhotographers[indice].id == idPhotographer) {
            photographer = new Photographer(dataPhotographers[indice].id,
                dataPhotographers[indice].name,
                dataPhotographers[indice].city,
                dataPhotographers[indice].country,
                dataPhotographers[indice].tags,
                dataPhotographers[indice].tagline,
                dataPhotographers[indice].price,
                dataPhotographers[indice].portrait,
                dataPhotographers[indice].altportait);
        }
        indice++;
    }

    // Ajout de ses medias et likes
    let totalLikes = 0;
    for (const [key, dataMedia] of Object.entries(dataMedias)) {

        if (dataMedia.photographerId == idPhotographer) {
            let media = new Media(
                dataMedia.id,
                dataMedia.photographerId,
                dataMedia.title,
                dataMedia.image,
                dataMedia.video,
                dataMedia.tags,
                dataMedia.likes,
                dataMedia.price,
                dataMedia.date);
            photographer.addMedia(media);
            totalLikes += dataMedia.likes;
        }
    }
    photographer.setTotalLikes(totalLikes);

    return photographer;

}

/** Affiche la page d'acceuil
 * 
 * @param {*} dataPhotographers 
 */
function printHomePage(dataPhotographers) {
    // Pour chaque photographe recupere, on cree une entite Photographe qu'on passe a la fonction
    // generatePhotographerCard.
    let photographers = new Array();
    for (const [key, dataPhotographer] of Object.entries(dataPhotographers)) {

        let photographer = new Photographer(dataPhotographer.id,
            dataPhotographer.name,
            dataPhotographer.city,
            dataPhotographer.country,
            dataPhotographer.tags,
            dataPhotographer.tagline,
            dataPhotographer.price,
            dataPhotographer.portrait,
            dataPhotographer.altportait);
        photographers.push(photographer);
        generatePhotographerCard(photographer);
    }
    window.dataPhotographers = photographers;
}