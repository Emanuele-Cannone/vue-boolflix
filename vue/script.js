// Milestone 1:
// Creare un layout base con una searchbar(una input e un button) in cui possiamo
// scrivere completamente o parzialmente il nome di un film.Possiamo, cliccando il
// bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

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
        arrayRisultato: [],
        ricerca: '',
        api: '17afad9915b223d4e647b46ea79354ef',
        tipo: 'movie'
    },
    methods: {


        cerca(){
            console.log(this.ricerca);


            axios
            .get('https://api.themoviedb.org/3/search/' + this.tipo + '?api_key=' + this.api + '&query=' + this.ricerca)
            .then(result => {
    
                this.arrayRisultato = result.data.results;
                console.log(this.arrayRisultato);
            })
        }




    }
});
