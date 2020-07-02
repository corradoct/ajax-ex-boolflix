//  ********************  FUNZIONI  ***************************  //

// Funzione che effettua una chiamata ajax ad un API e stampa i risultati tramite l'invocazione di un'altra Funzione
// Argomenti
//          ==>
//              userInput: indica la query da ricercare ( valore inserito dall'utente )
// Non ha nessun return
function ajaxCall(userInput) {
  // Creo le variabili per la chiamata ajax
  var apiRequest = 'https://api.themoviedb.org/3/search/multi';
  var apiKey = '0e5a6d3ef990d9d6758cc872b21ab676';
  var language = 'it-IT';

  $.ajax(
    {
      url: apiRequest,
      method: 'GET',
      data: {
        api_key: apiKey,
        language: language,
        query: userInput
      },
      success: function(dataResponse) {
        var results = dataResponse.results;
        if (results.length > 0) {
          printList(results);
        } else {
          var message = 'La tua ricerca non ha prodotto risultati';
          printMessage(message);
        }
      },
      error: function(request, state, errors) {
        var message = 'Si è verificato un problema con la connessione al database';
        printMessage(message);
      }
    }
  );
}

// Funzione che stampa n volte i singoli risultati contenuti in un array passato come argomento
// Argomenti
//          ==>
//             results: indica l'array contenente tutti i risultati
// Non ha nessun return
function printList(results) {
  for (var i = 0; i < results.length; i++) {
    var singleMovie = results[i];
    var genre = singleMovie.media_type;
    if (genre !== 'person') {
      var source = $("#movies-template").html();
      var template = Handlebars.compile(source);
      var title = '';
      var originalTitle = '';
      if (genre === 'movie') {
        title = singleMovie.title;
        originalTitle = singleMovie.original_title;
      } else if (genre === 'tv') {
        title = singleMovie.name;
        originalTitle = singleMovie.original_name;
      }
      var context = {
        title: title,
        originalTitle: originalTitle,
        language: flags(singleMovie.original_language),
        vote: voteStar(singleMovie.vote_average)
      }
      var html = template(context);
      $('.moviesList').append(html);
    }
  }
}

// Funzione che stampa gli eventuali messaggi di errore
// Non ritorna nulla
function printMessage(message) {
  var source = $("#message-template").html();
  var template = Handlebars.compile(source);
  var message = {message};
  var html = template(message);
  $('.messageWrapper').append(html);
}

// Funzione che serve a resettare la lista dei film e i messaggi di errore
// Non ritorna nulla
function reset() {
  $('.messageWrapper').html('');
  $('.moviesList').html('');
}

// Funzione che prende un numero come argomento genera un numero di stelle che va da 1 a 5
// Argomenti
//          ==>
//             vote: indica il numero da convertire a stelle
// Ritorna le stelle generate in  un tag i recuperato da Font Awesome
function voteStar(vote) {
  var newVote = Math.round(Math.round(vote / 2));
  var stars = '';
  for (var i = 1; i <= 5; i++) {
    if (i <= newVote) {
      stars+= '<i class="fas fa-star"></i>';
    } else {
      stars+= '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// Funzione che prende la lingua come argomento e genera la corrispettiva bandiera
// Argomenti
//          ==>
//             language: indica la stringa della lingua a cui associare la bandiera (Es. "it" => bandiera italia)
// Ritorna l'immagine della bandiera in un tag img e se non è presenta la bandiera ritorna la stessa stringa passata
function flags(language) {
  var flag = language;
  switch (language) {
    case "it":
      flag = '<img src= "img/it.png" alt= "Italy Flag">';
      break;
    case "en":
      flag = '<img src= "img/gb.png" alt= "England Flag">';
      break;
    case "es":
      flag = '<img src= "img/es.png" alt= "Espana Flag">';
      break;
    case "fr":
      flag = '<img src= "img/fr.png" alt= "France Flag">';
      break;
    case "de":
      flag = '<img src= "img/de.png" alt= "Germany Flag">';
      break;
    case "us":
      flag = '<img src= "img/us.png" alt= "American Flag">';
      break;
    default: flag;
  }
  return flag;
}
