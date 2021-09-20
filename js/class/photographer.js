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
    constructor(id,name,city,country,tags,tagline,price,portrait, altportrait){
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.altportrait = altportrait;
  
    }
  
    /**
     * Renvoi la location du photographe
     * @returns location
     */
    getLocation(){
        return this.city + "," +this.country;
    }

    getPrice(){
        return this.price +"€/jour"
    }
  }