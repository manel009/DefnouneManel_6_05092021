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
    document.getElementById(idElement).style.display = "none";
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

/** ordonne le tableau de medias selon un criteres
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
}

/** Genere le block html du media dans la galerie 
 * 
 * @param {*} media 
 * @param {*} photographerName 
 */
function generateMedia(media, photographerName) {

    let figureMedia = document.createElement('figure');
    figureMedia.className = "media-card";
    figureMedia.setAttribute("data-title", media.title);
    figureMedia.setAttribute("data-likes", media.likes);
    figureMedia.setAttribute("data-date", media.date);
    document.getElementById('galerie').appendChild(figureMedia);

    if (isVideo(media)) {
        let linkMedia = document.createElement('a');
        linkMedia.href = "img/FishEye_Photos/Sample Photos/" + photographerName + "/" + media.video;
        figureMedia.appendChild(linkMedia);

        let imgMedia = document.createElement('video');
        imgMedia.className = "media-image";
        imgMedia.title = media.title;
        linkMedia.appendChild(imgMedia);

        let sourceMedia = document.createElement('source');
        sourceMedia.src = linkMedia.href;
        sourceMedia.type = "video/mp4";
        imgMedia.appendChild(sourceMedia);

    } else {
        let linkMedia = document.createElement('a');
        linkMedia.href = "img/FishEye_Photos/Sample Photos/" + photographerName + "/" + media.image;
        figureMedia.appendChild(linkMedia);

        let imgMedia = document.createElement('img');
        imgMedia.className = "media-image";
        imgMedia.src = linkMedia.href;
        linkMedia.appendChild(imgMedia);
    }

    let divMediaInfos = document.createElement('div');
    divMediaInfos.className = "media-informations";
    figureMedia.appendChild(divMediaInfos);

    let figcaption = document.createElement('figcaption');
    figcaption.innerText = media.title;
    divMediaInfos.appendChild(figcaption);

    let likesText = document.createElement('p');
    likesText.className = "media-likes";
    likesText.innerHTML = media.likes + '<i class="fas fa-heart"></i>';
    divMediaInfos.appendChild(likesText);

}

/** regenere la galerie de media dans un ordre different selon l'option de tri
 * 
 */
function onSelectChange() {
    // au changement de valeur dans le select
    if (null != document.getElementById('select-order')) {
        var value = document.getElementById('select-order').value;
        let photographeFirstName = window.photographe.getFirstName();
        document.getElementById('galerie').innerHTML = "";
        let divGalerie = document.createElement('div');
        divGalerie.className = 'galerie';
        divGalerie.id = 'galerie';
        document.getElementById('photographer-galerie').appendChild(divGalerie);

        // Tri des medias
        orderMedia(value, window.photographe.medias);

        // Affichge des medias triés 
        window.photographe.medias.forEach(media => {
            generateMedia(media, photographeFirstName);
        });
    }




}

/** Cree le block HTML pour chaque photographe sur l'acceuil
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
        tagLink.innerHTML = "#" + tag;
        tagPhotographer.appendChild(tagLink);

    });

}

/**
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
};

/** Affiche le profil d'un photographe
 * 
 * @param {*} dataPhotographers 
 */
function printPhotographerPage(photographer) {
    generatePhotographerProfil(photographer);
    generateSelectOrder();
    generateGalerie(photographer);
    generateForm(photographer);

}

/** Cree le block HTML pour le profil d'un photographe
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
        tagLink.innerHTML = "#" + tag;
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

/** Genere le select pour le tri
 * 
 */
function generateSelectOrder(photographer) {
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

/** Genere la galerie de media d'un photographe
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
    orderMedia(orderByValue, photographe.medias)

    // Affichge des medias triés 
    photographe.medias.forEach(media => {
        generateMedia(media, photographeFirstName);
    });

    // Affichage de l'encart avec le prix et les likes
    printPhotographerPrice(photographe.totalLikes, photographe.getPrice());
}



/** Affiche la zone avec le prix et les likes du photographe
 * 
 * @param {*} likes 
 * @param {*} price 
 */
function printPhotographerPrice(likes, price) {
    let divPrice = document.createElement('div');
    divPrice.id = 'price-card';
    document.getElementById('photographer-galerie').appendChild(divPrice);

    let likesText = document.createElement('span');
    likesText.innerHTML = likes + '<i class="fas fa-heart"></i>';
    divPrice.appendChild(likesText);

    let spanePrice = document.createElement('span');
    spanePrice.innerHTML = price;
    divPrice.appendChild(spanePrice);


}

/**
 * Ajout le nom du photographe pour le formulaire
 * @param {*} photographe 
 */
function generateForm(photographe) {
    document.getElementById("photographer-form-header-name").innerHTML = photographe.name;
}

/**
 * Ferme le formulaire de contact
 */
function closeForm() {
    document.getElementById("photographer-contact-form-section").style.display =
        "none";
}

/**
 * Affcihe le formulaire de contact
 */
function showForm() {
    document.getElementById("photographer-contact-form-section").style.display =
        "flex";
}