export class Media {

    /**
     * Consturcteur.
     * @param {*} id 
     * @param {*} photographerId 
     * @param {*} title 
     * @param {*} image 
     * @param {*} video 
     * @param {*} tags 
     * @param {*} likes 
     * @param {*} price 
     * @param {*} date 
     */
    constructor(id, photographerId, title, image, video, tags, likes, price, date) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes;
        this.price = price;
        this.date = date;
    }


}