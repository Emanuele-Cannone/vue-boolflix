 var app = new Vue({
    el: '#contenitore',
    data:{
        ricerca: '',
        api: '17afad9915b223d4e647b46ea79354ef',
        tipo: 'all',
        arrayRisultato: [],
        arrayAll: [],
        arrayScelta: [
            {
                tipologia: 'all',
                scelta: 'Home',
                nonSoComeCHiamarlo: true
            },
            {
                tipologia: 'tv',
                scelta: 'Serie Tv',
                nonSoComeCHiamarlo: false
            },
            {
                tipologia: 'movie',
                scelta: 'Film',
                nonSoComeCHiamarlo: false
            },
        ],
        barraRicerca: false
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

                                visualizzaDescrizione: false,

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

                                visualizzaDescrizione: false,

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

                            visualizzaDescrizione: false,
            
                            // votazione = numero arrotondato di numero / 2
                            votazione: Math.round(element.vote_average / 2)
            
                        }
            
                    })
    
                console.log(this.arrayRisultato);
                })
                console.log(this.tipo);
            }



        },

        scelta(element, index){
            
            // per ogni elemento
            this.arrayScelta.forEach(element => {
                
                // se il booleano è vero
                if (element.nonSoComeCHiamarlo == true) {
                    
                    // salvalo nella variabile
                    element.nonSoComeCHiamarlo = this.elementoVisualizzato

                }

            });

            this.tipo = element;

            // cambia il valore del booleano da vero a falso e viceversa
            this.arrayScelta[index].nonSoComeCHiamarlo = !this.arrayScelta[index].nonSoComeCHiamarlo;
        
        },

        visualizzaInput(){

            this.barraRicerca = !this.barraRicerca

        },

        vediDettagli(index){

            this.arrayRisultato[index].visualizzaDescrizione = !this.arrayRisultato[index].visualizzaDescrizione

            // console.log(this.arrayRisultato[index].visualizzaDescrizione);
        },

        vediDettagliAltro(index) {

            this.arrayAll[index].visualizzaDescrizione = !this.arrayAll[index].visualizzaDescrizione

            // console.log(this.arrayAll[index].visualizzaDescrizione);
        },
        

    }


});

