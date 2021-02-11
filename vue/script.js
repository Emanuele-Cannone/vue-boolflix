

// Allarghiamo poi la ricerca anche alle serie tv.Con la stessa azione di ricerca
// dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
// attenti ad avere alla fine dei valori simili(le serie e i film hanno campi nel JSON di
// risposta diversi, simili ma non sempre identici)



// campione di risposta:
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


var app = new Vue({
    el: '#contenitore',
    data:{
        ricerca: '',
        api: '17afad9915b223d4e647b46ea79354ef',
        tipo: 'movie',
        arrayRisultato: []
    },
    methods: {

        cerca(){
            // fai una chiamata
            axios // RIGA SOTTO - e sostituisci this.tipo / this.api / this.ricerca al valore che vedi nei data
            .get('https://api.themoviedb.org/3/search/' + this.tipo + '?api_key=' + this.api + '&query=' + this.ricerca)
            .then(result => {
                
                // restituisci l'intero array
                this.arrayRisultato = result.data.results;

                // in questo modo vado a mappare per ogni l'elemento 
                this.arrayRisultato = this.arrayRisultato.map(element =>{

                    // l'elemento
                    return{ ...element,

                        // votazione = blablabla
                        votazione: Math.round(element.vote_average / 2)

                    }

                })
               
            })
            
        }


    }


});
