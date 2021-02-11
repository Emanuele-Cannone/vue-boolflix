// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote(troviamo le icone in FontAwesome).


// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API(le flag non ci sono in FontAwesome).


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
        // }


var app = new Vue({
    el: '#contenitore',
    data:{
        ricerca: '',
        api: '17afad9915b223d4e647b46ea79354ef',
        tipo: 'movie',
        arrayRisultato: [],
        arrotondato: '',
        arrayResto: []
    },
    methods: {

        cerca(){
            // fai una chiamata
            axios // RIGA SOTTO - e sostituisci this.tipo / this.api / this.ricerca al valore che vedi nei data
            .get('https://api.themoviedb.org/3/search/' + this.tipo + '?api_key=' + this.api + '&query=' + this.ricerca)
            .then(result => {
                
                // restituisci l'intero array
                this.arrayRisultato = result.data.results;

                // console.log(this.arrayRisultato); // vedi se non esplode qualcosa

                // per ogni oggetto nell'array risultato
                for (let index = 0; index < this.arrayRisultato.length; index++) {
                    
                    // prendi il numero della votazione, dividilo per 2 e arrotondalo per difetto
                    this.arrayRisultato[index].vote_average = Math.floor(this.arrayRisultato[index].vote_average / 2);

                    // console.log(this.arrayRisultato[index].vote_average);

                    // dammi il resto di 5 per avere il numero di volte per cui devo stampare le stelle vuote
                    this.resto = 5 - this.arrayRisultato[index].vote_average;

                    this.arrayResto.push(this.resto);

                    // console.log(this.arrayResto[index].resto);

                    console.log(this.arrayRisultato[index].vote_average, 'il resto di 5 è ', this.arrayResto[index]);

                }

            })

        }
    }


});
