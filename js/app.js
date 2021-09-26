// On charge la classe Photographer
import { Photographer } from "./class/photographer.js";
import { Media } from "./class/media.js";


$(document).ready(function() {
    $.getJSON("../data/data.json", function(dataJson) {
        var data = dataJson;

        // On recupere les donnees des photographes dans le JSON
        var dataPhotographers = data.photographers;
        var dataMedias = data.media;

        // On recupere le parametre dans l'url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idPhotographer = urlParams.get('id')

        // Si un id dans l'url, on affiche la page du photographe sinon la page d'acceuil
        if (idPhotographer > 0) {
            hideElement("nav-categories");
            hideElement("title-photographers-header");
            let photographe = findPhotographer(idPhotographer, dataPhotographers);
            printPhotographerPage(photographe);
            printPhotographerMedia(photographe, dataMedias);
        } else {
            printHomePage(dataPhotographers);
        }


        /** Affiche la page d'acceuil
         * 
         * @param {*} dataPhotographers 
         */
        function printHomePage(dataPhotographers) {
            // Pour chaque photographe recupere, on cree une entite Photographe qu'on passe a la fonction
            // generatePhotographerCard.
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
                generatePhotographerCard(photographer);
            }
        }

        /** Affiche le profil d'un photographe
         * 
         * @param {*} dataPhotographers 
         */
        function printPhotographerPage(photographer) {
            generatePhotographerProfil(photographer);

        }

        /** Affiche la partie galerie d'un photographe
         * 
         * @param {*} idPhotographer 
         * @param {*} dataMedias 
         */
        function printPhotographerMedia(idPhotographer, photographerFirstName, dataMedias) {
            generateSelectOrder();
            generateGalerie(idPhotographer, photographerFirstName, dataMedias)
        }

        /** Cree le block HTML pour chaque photographe
         * 
         * @param {*} photographer 
         */
        function generatePhotographerCard(photographer) {
            let cardDiv = document.createElement('article');
            cardDiv.className = 'photographe-card';
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
                tagLink.innerHTML = "#" + tag;
                tagPhotographer.appendChild(tagLink);

            });

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
            contactDiv.appendChild(contactButton);


            // Image
            let imageDiv = document.createElement('div');
            imageDiv.className = 'photographer-profil-image';
            document.getElementById('photographer-profil').appendChild(imageDiv);

            let imgPhotographer = document.createElement('img');
            imgPhotographer.src = "img/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographer.portrait;
            imgPhotographer.className = 'photographe-img';
            imgPhotographer.alt = photographer.altportrait;
            imageDiv.appendChild(imgPhotographer);


        }

        /** Genere le select pour le tri
         * 
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
        function generateGalerie(photographe, dataMedias) {

            let photographeFirstName = getFirstName(photographe.name);

            let divGalerie = document.createElement('div');
            divGalerie.className = 'galerie';
            divGalerie.id = 'galerie';
            document.getElementById('photographer-galerie').appendChild(divGalerie);

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
                    generateMedia(media, photographeFirstName);
                    totalLikes += dataMedia.likes;
                }
            }

            printPhotographerPrice(totalLikes, photographe.getPrice());
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

        /** Renvoi le photographe avec l'id en param
         * 
         * @param {*} idPhotographer 
         * @param {*} dataPhotographers 
         * @returns 
         */
        function findPhotographer(idPhotographer, dataPhotographers) {
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

            return photographer;

        }

        /** Renvoi le prenom d'un nom complet
         * 
         * @param {*} fullname 
         * @returns 
         */
        function getFirstName(fullname) {
            return fullname.split(" ")[0];
        }

        function hideElement(idElement) {
            document.getElementById(idElement).style.visibility = "hidden";
        }


    }).fail(function() {
        console.log("Charegemnt des données JSON impossible.");
    });
});