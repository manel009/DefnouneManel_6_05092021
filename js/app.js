// On charge le fichier JSON
//import * as data from "../data/data.json"asserts { type: "json" };

// On charge la classe Photographer
import { Photographer } from "./class/photographer.js";


$(document).ready(function() {
    $.getJSON("../data/data.json", function(dataJson) {
        var data = dataJson;

        // On recupere les donnees des photographes dans le JSON
        var dataPhotographers = data.photographers;

        // Pour chaque photographe recupere, on cree une entite Photographe qu'on passe a la fonction
        // generatePhotographerCard.
        for (const [key, dataPhotographer] of Object.entries(dataPhotographers)) {

            var photographer = new Photographer(dataPhotographer.id,
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




        /** Cree le block HTML pour chaque photographe
         * 
         * @param {*} photographer 
         */
        function generatePhotographerCard(photographer) {
            var cardDiv = document.createElement('article');
            cardDiv.className = 'photographe-card';
            document.getElementById('list-photographers').appendChild(cardDiv);

            // Photo et titre
            var linkPhotoTitle = document.createElement('a');
            linkPhotoTitle.className = "photographe-link";
            linkPhotoTitle.href = "pageDuPhotographe.html?id=" + photographer.id;
            cardDiv.appendChild(linkPhotoTitle);

            var imgPhotographer = document.createElement('img');
            imgPhotographer.src = "img/FishEye_Photos/Sample Photos/Photographers ID Photos/" + photographer.portrait;
            imgPhotographer.className = 'photographe-img';
            imgPhotographer.alt = photographer.altportrait;
            linkPhotoTitle.appendChild(imgPhotographer);

            var namePhotographer = document.createElement('h2');
            namePhotographer.className = "photographe-name";
            namePhotographer.innerText = photographer.name;
            linkPhotoTitle.appendChild(namePhotographer);

            // Informations
            var infoPhotographer = document.createElement('div');
            infoPhotographer.className = 'photographe-informations';
            cardDiv.appendChild(infoPhotographer);

            var location = document.createElement('p');
            location.className = "photographe-city";
            location.innerText = photographer.getLocation();
            infoPhotographer.appendChild(location);

            var citation = document.createElement('p');
            citation.className = "photographe-citation";
            citation.innerText = photographer.tagline;
            infoPhotographer.appendChild(citation);

            var price = document.createElement('p');
            price.className = "photographe-prix";
            price.innerText = photographer.getPrice();
            infoPhotographer.appendChild(price);

            //Tags
            var tagsPhotographer = document.createElement('div');
            tagsPhotographer.className = 'photographe-tags';
            cardDiv.appendChild(tagsPhotographer);

            var tagListePhotographer = document.createElement('ul');
            tagListePhotographer.className = 'photographe-list-tags';
            tagsPhotographer.appendChild(tagListePhotographer);

            photographer.tags.forEach(tag => {
                var tagPhotographer = document.createElement('li');
                tagPhotographer.className = 'photographe-list-tag tag';
                tagListePhotographer.appendChild(tagPhotographer);

                var tagLink = document.createElement('a');
                tagLink.href = "#";
                tagLink.ariaLabel = "Tag";
                tagLink.innerHTML = "#" + tag;
                tagPhotographer.appendChild(tagLink);

            });

        }
    }).fail(function() {
        console.log("An error has occurred.");
    });
});