export default function onImgMurkup(obj) {
    return obj.map(image => {
        return `
         <div class="photo-card">
  <a class = 'gallery__link' href = '${image.largeImageURL}'><img class = 'galery__img' src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
    </div>
    </div>
`    
    }).join('');       
}

 
















 