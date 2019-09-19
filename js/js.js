
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$('#escribe_reseña').on('click', function(event){
  var $comentario=$('#seccion_comentario')
  $comentario.removeClass('hidden')
});

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data){
    var newHtml=''
    console.log(data)

    $(data).find('comment').each(function(){
      newHtml+=`
        <h2>${$(this).find('name').text()}</h2><span id="date">${$(this).find('date').text()}</span>
        <br>
        `
        newHtml+=getStarsSpans($(this).find('stars').text())
        newHtml+=`
        <br>
        <p>${$(this).find('text').text()}</p>
      `
    })
    $('#seccion_reviews').append(newHtml)
  },
  error: function(error){
    console.log(error)
  },
});



/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

$('#btn-publicar').on('click', function(event){
  var $name= $('#nombre')
  var $email=$('#email')
  var $comment=$('#comentario').text()
  console.log($comment)
  var $error=$('#error_comment')
  var flag=false
  var newHtml=''
  if($name.val()==''|| $email.val()=='' || $comment=='')
    $error.removeClass('hidden')
  else{
    $error.addClass('hidden')
    flag=true
  }
  $inputstars=$('input[name=rating]:checked')
  $stars=$inputstars.attr('value')
  console.log($inputstars)
  for(var i=0; i<5 ; i++)
  {
    
  }
  if(flag){
    newHtml+=`
      <h2>${$name.val()}</h2>
      <br>
    `
    newHtml+=getStarsSpans($stars)
    newHtml+=`
      <br>
      <p>${$comment}</p>
    `
  }
  $('#seccion_reviews').append(newHtml)

  $name.val('')
  $email.val('')
  var $commentaux=$('#comentario')
  $commentaux.text('')
})


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').on('click', function(event){
  var $name=$('#nombre')
  var $email=$('#email')
  var $comment=$('#comentario')

  $name.val('')
  $email.val('')
  $comment.text('')
})





/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  if(new_html=='')
    new_html += `
      <p>No stars</p>
    `;

  return new_html;
}
