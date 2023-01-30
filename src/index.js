import  fetchImg  from './fitchImg';
import onImgMurkup from './murkup';
import Notiflix from 'notiflix';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')
form.addEventListener('submit', onFormSumbited);
let page = 1
function onFormSumbited(e) {
    e.preventDefault();
    const inputValue = form.elements.searchQuery.value;
    if (inputValue.trim() === '') {
        clearMurkup(e)
        Notiflix.Notify.info('If you dont write anything, we wont find anything')
        return
        }
    fetchImg(inputValue, page).then(images => {
        if (images.total === 0) {
            clearMurkup(e)
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again'
            )
            return
        }
        if (inputValue) {
            console.log(images.hits.length)
            clearMurkup(e)
            gallery.insertAdjacentHTML('beforeend', onImgMurkup(images.hits)) 
        }       
loadMoreBtn.addEventListener('click', onLoadMore)
    function onLoadMore(e) {
    page += 1
        fetchImg(inputValue, page).then(images => {
            gallery.insertAdjacentHTML('beforeend', onImgMurkup(images.hits))
             if (images.hits.length < 40) {
            Notiflix.Notify.info('We are sorry, but you have reached the end of search results') 
            return
       }
        }) 
       
}
    })   
}


function clearMurkup(e) {
    gallery.innerHTML = ''
}