function cardBuilder(obj) {
  resultsContainer.innerHTML += `
        <div  class="card">
        <img src="${obj.imgurl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${obj.restaurant_name}</h5>
          <p class="card-text">Resturant Rating ${obj.rating}</p>
          <button onclick="redierct(${obj.id})" class="btn btn-primary meals resBtn">Go to resturant</button>
        </div>
        </div>
    `;
}
