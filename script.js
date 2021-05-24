let urlListaCategorias = 'https://www.themealdb.com/api/json/v1/1/categories.php';
let urlFiltrarCategoria = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
let urlFiltrarNombre = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const selectCategorias = document.getElementById('categorias');
const formulario = document.getElementById("formularioBusqueda");
const buscador = document.getElementById("buscador");

const contenedorComidas = document.getElementById('contenedorComidas');

async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

function recargarListaComidas(comidas){
	contenedorComidas.innerHTML = "";

	comidas.meals.forEach((comida) => {
		const comidaElement = document.createElement("div");
		comidaElement.classList.add("receta");

		//Forma 1
		comidaElement.innerHTML = `
			<h3 class="titleReceta">${comida.strMeal}</h3>
			<img class="imgReceta" src=${comida.strMealThumb}></img>
		`;

		//Forma 2	
		/*
		const comidaName = document.createElement("h1");
		comidaName.innerText = comida.strMeal;
		comidaElement.appendChild(comidaName);
		const comidaImagen = document.createElement("img");
		comidaImagen.src = comida.strMealThumb;
		comidaElement.appendChild(comidaImagen);
		*/

		//Añadir cualquier forma al div
		contenedorComidas.appendChild(comidaElement);

	});
}


function filtrarPorCategoria(){

	var categoria = selectCategorias.value;

	obtenerJSON(urlFiltrarCategoria + categoria).then(json => { 
		console.log(json);
		recargarListaComidas(json);
	});
}


function filtrarPorNombre(palabra){

	obtenerJSON(urlFiltrarNombre + palabra).then(json => { 
		console.log(json);
		recargarListaComidas(json);
	});
}


formulario.addEventListener("submit", (event) => {
	event.preventDefault(); //Previene autorecargar la página
	const palabra = buscador.value;
	if(palabra){
		filtrarPorNombre(palabra);
		palabra.value = "";
	}
});


obtenerJSON(urlListaCategorias).then(json => { 
	
	for(var i=0; i<json.categories.length; i++){

		var valor = json.categories[i].strCategory;
		var opcion = document.createElement('option');
		opcion.appendChild( document.createTextNode(valor) );
		opcion.value = valor;
		selectCategorias.appendChild(opcion);

	}

	filtrarPorCategoria();

});
