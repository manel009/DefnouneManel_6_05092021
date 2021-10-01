export class Photographer {

    /**
     * Consturcteur.
     * @param {*} id 
     * @param {*} name 
     * @param {*} city 
     * @param {*} country 
     * @param {*} tags 
     * @param {*} tagline 
     * @param {*} price 
     * @param {*} portrait 
     * @param {*} altportrait 
     */
    constructor(id, name, city, country, tags, tagline, price, portrait, altportrait) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.altportrait = altportrait;
        this.medias = [];
        this.totalLikes = 0;
    }

    /**
     * Renvoi la location du photographe
     * @returns location
     */
    getLocation() {
        return this.city + "," + this.country;
    }

    /** renvoi le prix au format d'affichage
     * 
     * @returns 
     */
    getPrice() {
        return this.price + "€/jour"
    }

    /** Renvi le prenom
     * 
     * @returns 
     */
    getFirstName() {
        return this.name.split(" ")[0];
    }

    /**
     * 
     * @param {*} media 
     */
    addMedia(media) {

        this.medias.push(media);
    }

    /**
     * 
     * @param {*} totalLikes 
     */
    setTotalLikes(totalLikes) {
        this.totalLikes = totalLikes;
    }

}