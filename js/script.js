$(document).ready(
  function() {

    // Creo l'evento al click del bottone
    $('#search').on('click',
      function() {
        // Creo la variabile della ricerca utente
        var userInput = $('#searchBar').val();

        // Resetto la lista se eventualmente ci sono già risultati
        reset();

        // Se la barra di ricerca ha un valore avvio la chiamata ajax
        if (userInput !== '') {
          // Invoco la funzione per la chiamata ajax e gli passo le variabili per la richiesta
          ajaxCall(userInput);
        } else {  // Altrimenti do un messaggio di errore
          var message = 'Non hai inserito nessuna parola';
          printMessage(message);
        }
      }
    );

    // Creo l'evento alla pressione del tasto invio
    $('#searchBar').keypress(
      function(event) {
        if (event.which === 13) {
          // Creo la variabile della ricerca utente
          var userInput = $('#searchBar').val();

          // Resetto la lista se eventualmente ci sono già risultati
          reset();

          // Se la barra di ricerca ha un valore avvio la chiamata ajax
          if (userInput !== '') {
            // Invoco la funzione per la chiamata ajax e gli passo le variabili per la richiesta
            ajaxCall(userInput);
          } else {  // Altrimenti do un messaggio di errore
            var message = 'Non hai inserito nessuna parola';
            printMessage(message);
          }
        }
      }
    );
  }
);
