// On charge la classe Photographer
import { Photographer } from "./class/photographer.js";


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
            printPhotographerPage(dataPhotographers);
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
        function printPhotographerPage(dataPhotographers) {
            for (const [key, dataPhotographer] of Object.entries(dataPhotographers)) {
                if (idPhotographer == dataPhotographer.id) {
                    let photographer = new Photographer(dataPhotographer.id,
                        dataPhotographer.name,
                        dataPhotographer.city,
                        dataPhotographer.country,
                        dataPhotographer.tags,
                        dataPhotographer.tagline,
                        dataPhotographer.price,
                        dataPhotographer.portrait,
                        dataPhotographer.altportait);
                    generatePhotographerProfil(photographer);
                }
            }
        }

        function printPhotographerMedia(idPhotographer) {

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


    }).fail(function() {
        console.log("Charegemnt des données JSON impossible.");
    });
});