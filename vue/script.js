// Allarghiamo poi la ricerca anche alle serie tv.Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili(le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)



// campione di risposta FILM:
    // data.results:
        // {
        //     "adult": false,
        //     "backdrop_path": null,
        //     "genre_ids": [],
        //     "id": 391889,
        //     "original_language": "en",
        //     "original_title": "Bella ciao",
        //     "overview": "A documentary film about the violent riots during the 2001 G8 meeting in Genoa.",
        //     "popularity": 9.09,
        //     "poster_path": null,
        //     "release_date": "2002-04-08",
        //     "title": "Bella ciao",
        //     "video": false,
        //     "vote_average": 5.5,
        //     "vote_count": 1
        // aggiunto nel map "votazione" : 3
        // }


// campione di risposta SERIE-TV:
    // {
    //     "backdrop_path": "/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg",
    //     "first_air_date": "2017-05-02",
    //     "genre_ids": [
    //           80,
    //           18
    //          ],
    //      "id": 71446,
    //      "name": "Money Heist",
    //      "origin_country": [
    //          "ES"
    //         ],
    //     "original_language": "es",
    //     "original_name": "La casa de papel",
    //     "overview": "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion - memorizing every step, every detail, every probability - culminate in eleven days locked up in the National Coinage and Stamp Factory of Spain, surrounded by police forces and with dozens of hostages in their power, to find out whether their suicide wager will lead to everything or nothing.",
    //     "popularity": 217.541,
    //     "poster_path": "/MoEKaPFHABtA1xKoOteirGaHl1.jpg",
    //     "vote_average": 8.3,
    //     "vote_count": 12143
    // }


var app = new Vue({
    el: '#contenitore',
    data:{
        ricerca: '',
        api: '17afad9915b223d4e647b46ea79354ef',
        tipo: 'all',
        arrayRisultato: [],
        arrayAll: []
    },
    methods: {


        cerca(){


            if (this.tipo == 'all') {
                
                axios
                    // con questa chiamata cerco i film
                    .get('https://api.themoviedb.org/3/search/movie?api_key=' + this.api + '&query=' + this.ricerca)
                
                    
                    .then(result => {

                        // restituisci l'intero array
                        this.arrayRisultato = result.data.results;

                        // grazie dave <3

                        // in questo modo vado a mappare per ogni l'elemento 
                        this.arrayRisultato = this.arrayRisultato.map(element => {

                            // l'elemento
                            return {
                                ...element,

                                // votazione = numero arrotondato di numero / 2
                                votazione: Math.round(element.vote_average / 2)

                            }

                        })

                        console.log(this.arrayRisultato);
                    });
                    



                axios
                    // con questa chiamata cerco le serie tv
                    .get('https://api.themoviedb.org/3/search/tv?api_key=' + this.api + '&query=' + this.ricerca)
                
                    .then(result => {

                        // restituisci l'intero array
                        this.arrayAll = result.data.results;

                        // grazie dave <3

                        // in questo modo vado a mappare per ogni l'elemento 
                        this.arrayAll = this.arrayAll.map(element => {

                            // l'elemento
                            return {
                                ...element,

                                // votazione = numero arrotondato di numero / 2
                                votazione: Math.round(element.vote_average / 2)

                            }

                        })

                        console.log(this.arrayAll);
                    })


            } else {

                // fai una chiamata
                axios // RIGA SOTTO - e sostituisci this.tipo / this.api / this.ricerca al valore che vedi nei data
                .get('https://api.themoviedb.org/3/search/' + this.tipo + '?api_key=' + this.api + '&query=' + this.ricerca)
    
    
    
                // DOPO NELLA CHIAMATA PRENDI TUTTE LE PAGINE  
                    // HAI IL VALORE PAGINE TOTALI ALLA FINE DELLA CHIAMATA
                .then(result => {
                    
                    // restituisci l'intero array
                    this.arrayRisultato = result.data.results;
    
                    // grazie dave <3
    
                    // in questo modo vado a mappare per ogni l'elemento 
                    this.arrayRisultato = this.arrayRisultato.map(element => {
            
                        // l'elemento
                        return {
                            ...element,
            
                            // votazione = numero arrotondato di numero / 2
                            votazione: Math.round(element.vote_average / 2)
            
                        }
            
                    })
    
                console.log(this.arrayRisultato);
                })
                console.log(this.tipo);
            }



        }


    }


});



// tv?api_key=17afad9915b223d4e647b46ea79354ef&query=casa
// movie?api_key=17afad9915b223d4e647b46ea79354ef&query=Casa de los Babys