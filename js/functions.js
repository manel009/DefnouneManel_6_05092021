/** FONCTIONS GLOBALES */

/**
 * Affiche ou cache le bouton selon la position sur la page des qu'on scroll vers le bas de 30px ou plus
 */
function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("top-button").style.display = "block";
    } else {
        document.getElementById("top-button").style.display = "none";
    }
}

/**
 * Renvoi vers le haut de la page (scrollTop à 0).
 */
function backToTheTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}

/** 
 * Cache un element html.
 *
 * @param {*} idElement 
 */
function hideElement(idElement) {
    document.getElementById(idElement).style.display = "none";
}

/** 
 * Verifie si un objet Media est une video ou non.
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

/**
 * Renvoi les données photographers et medias
 * 
 * @returns 
 */
async function getData() {
    return fetch("/js/data.json").then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
}

/**
 * Renvoi les données des photographes
 * 
 * @returns 
 */
async function getDataPhotographers() {
    return fetch("/js/data.json").then(function(response) {
        return response.json();
    }).then(function(data) {
        return data.photographers;
    });


}

/**
 * Renvoi les données des medias
 * 
 * @returns 
 */
async function getDataMedias() {
    return fetch("/js/data.json").then(function(response) {
        return response.json();
    }).then(function(data) {
        return data.media;
    });
}





/** FONCTIONS PAGE ACCUEIL */

/** 
 * Cree le block HTML pour chaque photographe sur l'acceuil.
 * 
 * @param {*} photographer 
 */
function generatePhotographerCard(photographer) {
    let cardDiv = document.createElement('article');
    cardDiv.className = 'photographe-card';
    cardDiv.id = 'photographe-card-' + photographer.id;
    document.getElementById('list-photographers').appendChild(cardDiv);

    // Photo et titre
    let linkPhotoTitle = document.createElement('a');
    linkPhotoTitle.className = "photographe-link";
    linkPhotoTitle.href = "index.html?id=" + photographer.id;
    cardDiv.appendChild(linkPhotoTitle);

    let imgPhotographer = document.createElement('img');
    imgPhotographer.src = "img/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographer.portrait;
    imgPhotographer.className = 'photographe-img';
    imgPhotographer.alt = photographer.altportrait;
    linkPhotoTitle.appendChild(imgPhotographer);

    let namePhotographer = document.createElement('h2');
    namePhotographer.className = "photographe-name";
    namePhotographer.innerText = photographer.name;
    linkPhotoTitle.appendChild(namePhotographer);

    // Informations
    let infoPhotographer = document.createElement('div');
    infoPhotographer.className = 'photographe-informations';
    cardDiv.appendChild(infoPhotographer);

    let location = document.createElement('p');
    location.className = "photographe-city";
    location.innerText = photographer.getLocation();
    infoPhotographer.appendChild(location);

    let citation = document.createElement('p');
    citation.className = "photographe-citation";
    citation.innerText = photographer.tagline;
    infoPhotographer.appendChild(citation);

    let price = document.createElement('p');
    price.className = "photographe-prix";
    price.innerText = photographer.getPrice();
    infoPhotographer.appendChild(price);

    //Tags
    let tagsPhotographer = document.createElement('div');
    tagsPhotographer.className = 'photographe-tags';
    cardDiv.appendChild(tagsPhotographer);

    let tagListePhotographer = document.createElement('ul');
    tagListePhotographer.className = 'photographe-list-tags';
    tagsPhotographer.appendChild(tagListePhotographer);

    photographer.tags.forEach(tag => {
        let tagPhotographer = document.createElement('li');
        tagPhotographer.className = 'photographe-list-tag tag';
        tagListePhotographer.appendChild(tagPhotographer);

        let tagLink = document.createElement('a');
        tagLink.href = "#";
        tagLink.ariaLabel = "Tag";
        tagLink.className = "tag-value";
        tagLink.innerHTML = "# <span>" + tag + "</span>";
        tagLink.setAttribute('onclick', 'filterPhotographersByTag("' + tag + '")');
        tagPhotographer.appendChild(tagLink);

    });

}

/**
 * Filtre les photographes a afficher selon le tag cliqué.
 * 
 * @param {*} tagValue 
 */
function filterPhotographersByTag(tagValue) {
    document.getElementById('list-photographers').innerHTML = "";

    window.dataPhotographers.forEach(photographer => {
        photographer.tags.forEach(tag => {
            if (tag == tagValue) {
                generatePhotographerCard(photographer);
            }

        });
    });
}





/** FONCTIONS PROFIL D'UN PHOTOGRAPHE  */

/** Affiche le profil d'un photographe.
 * 
 * @param {*} dataPhotographers 
 */
function printPhotographerPage(photographer) {
    generatePhotographerProfil(photographer);
    generateSelectOrder();
    generateGalerie(photographer);
    generateForm(photographer);

}

/** Cree le block HTML pour le profil d'un photographe.
 * 
 * @param {*} photographer 
 */
function generatePhotographerProfil(photographer) {
    // Informations
    let profilDiv = document.createElement('div');
    profilDiv.className = 'photographer-profil-infos';
    document.getElementById('photographer-profil').appendChild(profilDiv);

    let namePhotographer = document.createElement('h2');
    namePhotographer.className = "photographer-profil-name";
    namePhotographer.innerText = photographer.name;
    profilDiv.appendChild(namePhotographer);

    let location = document.createElement('p');
    location.className = "photographer-profil-city";
    location.innerText = photographer.getLocation();
    profilDiv.appendChild(location);

    let citation = document.createElement('p');
    citation.className = "photographer-profil-citation";
    citation.innerText = photographer.tagline;
    profilDiv.appendChild(citation);

    //Tags
    let tagsPhotographer = document.createElement('div');
    tagsPhotographer.className = 'photographer-profil-tags';
    profilDiv.appendChild(tagsPhotographer);

    let tagListePhotographer = document.createElement('ul');
    tagListePhotographer.className = 'photographer-profil-list-tags';
    tagsPhotographer.appendChild(tagListePhotographer);

    photographer.tags.forEach(tag => {
        let tagPhotographer = document.createElement('li');
        tagPhotographer.className = 'photographer-profil-list-tag tag';
        tagListePhotographer.appendChild(tagPhotographer);

        let tagLink = document.createElement('a');
        tagLink.href = "#";
        tagLink.ariaLabel = "Tag";
        tagLink.innerHTML = "# <span>" + tag + "</span>";
        tagPhotographer.appendChild(tagLink);

    });

    // Contact
    let contactDiv = document.createElement('div');
    contactDiv.className = 'photographer-profil-contact';
    document.getElementById('photographer-profil').appendChild(contactDiv);

    let contactButton = document.createElement('button');
    contactButton.id = "contact-photographer";
    contactButton.ariaLabel = "Contact me";
    contactButton.innerHTML = "Contactez moi";
    contactButton.setAttribute('onclick', 'showForm()');
    contactDiv.appendChild(contactButton);


    // Image
    let imageDiv = document.createElement('div');
    imageDiv.className = 'photographer-profil-image';
    document.getElementById('photographer-profil').appendChild(imageDiv);

    let imgPhotographer = document.createElement('img');
    imgPhotographer.src = "img/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographer.portrait;
    imgPhotographer.className = 'photographer-profil-image-img';
    imgPhotographer.alt = photographer.altportrait;
    imageDiv.appendChild(imgPhotographer);


}




/** FONCTIONS GALERIE PHOTOGRAPHE */

/** 
 * Genere le select pour le tri. 
 */
function generateSelectOrder() {
    // Ajout du select pour le tri
    let divSelect = document.createElement('div');
    divSelect.className = 'select-galerie-order';
    document.getElementById('photographer-galerie').appendChild(divSelect);

    let labelSelect = document.createElement('label');
    labelSelect.htmlFor = 'select-order';
    labelSelect.innerHTML = 'Trier par : ';
    divSelect.appendChild(labelSelect);

    let selectOrder = document.createElement('select');
    selectOrder.className = 'select-order';
    selectOrder.id = 'select-order';
    selectOrder.setAttribute('onchange', 'onSelectChange()');
    divSelect.appendChild(selectOrder);


    // Ajout des options
    let selectOptionOrder = document.createElement('option');
    selectOptionOrder.value = 'title';
    selectOptionOrder.innerHTML = 'Titre';
    selectOrder.appendChild(selectOptionOrder);

    selectOptionOrder = document.createElement('option');
    selectOptionOrder.value = 'date';
    selectOptionOrder.innerHTML = 'Date';
    selectOrder.appendChild(selectOptionOrder);

    selectOptionOrder = document.createElement('option');
    selectOptionOrder.value = 'likes';
    selectOptionOrder.innerHTML = 'Popularité';
    selectOrder.appendChild(selectOptionOrder);
}

/** 
 * Genere la galerie de media d'un photographe.
 * 
 * @param {*} photographe
 * @param {*} dataMedias 
 */
function generateGalerie(photographe) {

    let photographeFirstName = photographe.getFirstName();

    let divGalerie = document.createElement('div');
    divGalerie.className = 'galerie';
    divGalerie.id = 'galerie';
    document.getElementById('photographer-galerie').appendChild(divGalerie);

    // Tri des medias
    let orderByValue = document.getElementById('select-order').value;
    let mediasOrdered = orderMedia(orderByValue, photographe.medias)

    for (var i = 0; i < mediasOrdered.length; i++) {
        generateMedia(mediasOrdered[i], photographeFirstName, i);
    }

    // Affichage de l'encart avec le prix et les likes
    printPhotographerPrice(photographe.totalLikes, photographe.getPrice());
}

/** 
 * Genere le block html d'un media dans la galerie. 
 * 
 * @param {*} media 
 * @param {*} photographerName 
 * @param {*} mediaPosition 
 */
function generateMedia(media, photographerName, mediaPosition) {

    let figureMedia = document.createElement('figure');
    figureMedia.className = "media-card";
    figureMedia.setAttribute("data-title", media.title);
    figureMedia.setAttribute("data-likes", media.likes);
    figureMedia.setAttribute("data-date", media.date);
    document.getElementById('galerie').appendChild(figureMedia);

    if (isVideo(media)) {
        let linkMedia = document.createElement('a');
        linkMedia.setAttribute('onclick', 'showSlideshow(' + mediaPosition + ')');
        figureMedia.appendChild(linkMedia);

        let imgMedia = document.createElement('video');
        imgMedia.className = "media-image";
        imgMedia.title = media.title;
        linkMedia.appendChild(imgMedia);

        let sourceMedia = document.createElement('source');
        sourceMedia.src = "img/FishEye_Photos/Sample Photos/" + photographerName + "/" + media.video;
        sourceMedia.type = "video/mp4";
        imgMedia.appendChild(sourceMedia);

        // Ajout dans le slideshow
        let slideFigure = document.createElement('figure');
        slideFigure.className = "slide fade";
        document.getElementById('slideshow-container-content').appendChild(slideFigure);

        let imgMediaSlide = document.createElement('video');
        imgMediaSlide.title = media.title;
        imgMediaSlide.setAttribute("controls", "controls")
        slideFigure.appendChild(imgMediaSlide);

        let sourceMediaSlide = document.createElement('source');
        sourceMediaSlide.src = sourceMedia.src;
        sourceMediaSlide.type = "video/mp4";
        imgMediaSlide.appendChild(sourceMediaSlide);


    } else {
        let linkMedia = document.createElement('a');
        linkMedia.href = "#";
        linkMedia.setAttribute('onclick', 'showSlideshow(' + mediaPosition + ')');
        figureMedia.appendChild(linkMedia);

        let imgMedia = document.createElement('img');
        imgMedia.className = "media-image";
        imgMedia.alt = media.title;
        imgMedia.src = "img/FishEye_Photos/Sample Photos/" + photographerName + "/" + media.image;
        linkMedia.appendChild(imgMedia);

        // Ajout dans le slideshow
        let slideFigure = document.createElement('figure');
        slideFigure.className = "slide fade";
        document.getElementById('slideshow-container-content').appendChild(slideFigure);

        let imgMediaSlide = document.createElement('img');
        imgMediaSlide.alt = media.title;
        imgMediaSlide.src = imgMedia.src;
        slideFigure.appendChild(imgMediaSlide);
    }

    let divMediaInfos = document.createElement('div');
    divMediaInfos.className = "media-informations";
    figureMedia.appendChild(divMediaInfos);

    let figcaption = document.createElement('figcaption');
    figcaption.innerText = media.title;
    divMediaInfos.appendChild(figcaption);

    let likesText = document.createElement('p');
    likesText.className = "media-likes";
    likesText.setAttribute('onclick', 'likeClick("nb-likes-' + media.id + '")');
    likesText.innerHTML = '<span id="nb-likes-' + media.id + '" class="likes" aria-label="nombre de likes">' + media.likes + '</span><i class="fas fa-heart" aria-label="likes"></i>';
    divMediaInfos.appendChild(likesText);

}

/** 
 * Regenere le contenu de la galerie de medias dans un ordre different selon l'option de tri.
 * 
 */
function onSelectChange() {
    // au changement de valeur dans le select
    if (null != document.getElementById('select-order')) {
        var value = document.getElementById('select-order').value;
        let photographeFirstName = window.photographe.getFirstName();
        document.getElementById('galerie').innerHTML = "";
        document.getElementById('slideshow-container-content').innerHTML = "";

        // Tri des medias
        let mediasOrdered = orderMedia(value, window.photographe.medias);

        for (var i = 0; i < mediasOrdered.length; i++) {
            generateMedia(mediasOrdered[i], photographeFirstName, i);
        }
    }
}

/** 
 * Reordonne le tableau de medias selon un criteres (titre, date ou likes).
 * 
 * @param {*} orderBy 
 * @param {*} medias 
 */
function orderMedia(orderBy, medias) {
    switch (orderBy) {
        case 'title':
            medias.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'date':
            medias.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case 'likes':
            medias.sort((a, b) => {
                return b.likes - a.likes;
            });
            break;
    }

    return medias;
}

/** Affiche la zone avec le prix et les likes du photographe.
 * 
 * @param {*} likes 
 * @param {*} price 
 */
function printPhotographerPrice(likes, price) {
    let divPrice = document.createElement('div');
    divPrice.id = 'price-card';
    document.getElementById('photographer-galerie').appendChild(divPrice);

    let likesText = document.createElement('span');
    likesText.innerHTML = '<span id="photographer-total-likes" class="likes"> ' + likes + '</span><i class="fas fa-heart"></i>';
    divPrice.appendChild(likesText);

    let spanePrice = document.createElement('span');
    spanePrice.innerHTML = price;
    divPrice.appendChild(spanePrice);

}

/**
 * Ajoute un like au media liké et incremente le nombre total de likes du photographe.
 * 
 * @param {*} elementId 
 */
function likeClick(elementId) {
    let element = document.getElementById(elementId);
    let nbLikes = parseInt(element.innerText) + 1;
    element.innerText = nbLikes;

    let totalLikes = parseInt(document.getElementById('photographer-total-likes').innerText) + 1;
    document.getElementById('photographer-total-likes').innerText = totalLikes;
}





/** FONCTIONS FORMULAIRE DE CONTACT */

/**
 * Ajout le nom du photographe pour le formulaire
 * @param {*} photographe 
 */
function generateForm(photographe) {
    document.getElementById("photographer-form-header-name").innerHTML = photographe.name;
}

/**
 * Ferme le formulaire de contact.
 */
function closeForm() {
    document.getElementById("photographer-contact-form-section").style.display =
        "none";
}

/**
 * Affcihe le formulaire de contact.
 */
function showForm() {
    document.getElementById("photographer-contact-form-section").style.display =
        "flex";
}

/**
 * Affiche les valeurs saisient dans le formulaire dans la console.
 */
function validate() {
    console.log("name : " + document.getElementById("photographer-contact-form-lastname").value);
    console.log(document.getElementById("photographer-contact-form-email").value);
    console.log(document.getElementById("photographer-contact-form-message").value);

}





/** FONCTIONS SLIDESHOW */

/**
 * Ferme les slides.
 */
function closeSlideshow() {
    document.getElementById("photographer-galerie-slideshow").style.display =
        "none";
}

/**
 * Affiches le slideshow sur la slide du media cliqué.
 * 
 * @param {*} mediaPosition 
 */
function showSlideshow(mediaPosition) {
    document.getElementById("photographer-galerie-slideshow").style.display =
        "block";
    showSlides(mediaPosition);
}

/**
 * Affiche la slide precedente ou suivante selon la valeur de n.
 * 
 * @param {*} n 
 */
function plusSlides(n) {
    showSlides((slideIndex += n));
}

/**
 * Affiche la slide à la position n et cache toutes les autres.
 * 
 * @param {*} n 
 */
function showSlides(n) {
    var slides = document.getElementsByClassName("slide");
    // On masque toutes les slides
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // si on etait a la derniere slide et qu'on souhaite afficher la suivante, on repart a la premiere slide
    if (n > slides.length - 1) {
        slideIndex = 0;
    }
    // si on etait a la premiere slide et qu'on souhaite affichier la precedente, on affiche la derniere
    else if (n < 0) {
        slideIndex = slides.length - 1;
    }
    // Sinon on affiche la slide a la position demandée
    else {
        slideIndex = n;
    }
    slides[slideIndex].style.display = "flex";

}

// Lorsqu'on appui sur une touche du clavier
window.addEventListener("keydown", event => {
    // si la touche appuyée est la fleche de gauche et que le slideshow est affiche, 
    // on declenche le clique sur le bouton precedent pour afficher la slide precedente.
    if (event.key === "ArrowLeft" && document.getElementById("photographer-galerie-slideshow").style.display != "none") {
        document.getElementById("prev").click();
    }
    // sinon si la touche appuyée est la fleche de droite et que le slideshow est affiche, 
    // on declenche le clique sur le bouton next pour afficher la slide suivante.
    else if (event.key === "ArrowRight" && document.getElementById("photographer-galerie-slideshow").style.display != "none") {
        document.getElementById("next").click();
    }
});