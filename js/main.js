import * as app from "./app.js";

$(document).ready(function() {
    app.loadPage();

    // ------ Bouton back to top ----------- //
    window.onscroll = function() {
        scrollFunction()
    };
});