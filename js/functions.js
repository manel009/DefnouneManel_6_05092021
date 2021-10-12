// ------ Bouton back to top ----------- //

window.onscroll = function() { scrollFunction() };


/**
 * Affiche ou cache le bouton selon la position sur la page
 */
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("top-button").style.display = "block";
    } else {
        document.getElementById("top-button").style.display = "none";
    }
}

/**
 * Renvoi vers le haut de la page
 */
function backToTheTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/** cache un element html
 * 
 * @param {*} idElement 
 */
function hideElement(idElement) {
    document.getElementById(idElement).style.visibility = "hidden";
}

/** Check si le fichier est une video ou non
 * 
 * @param {*} media 
 * @returns 
 */
function isVideo(media) {
    if (media.video === undefined) {
        return false;
    }
    return true;
}