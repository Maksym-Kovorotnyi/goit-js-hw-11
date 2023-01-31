import  fetchImg  from './fitchImg';
import onImgMurkup from './murkup';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')
form.addEventListener('submit', onFormSumbited);
loadMoreBtn.classList.add('is-hiden')
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
            clearMurkup(e)
            gallery.insertAdjacentHTML('beforeend', onImgMurkup(images.hits)) 
            
            const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
            })
            loadMoreBtn.classList.remove('is-hiden')
        }       
loadMoreBtn.addEventListener('click', onLoadMore)
    function onLoadMore(e) {
    page += 1
        fetchImg(inputValue, page).then(images => {
            gallery.insertAdjacentHTML('beforeend', onImgMurkup(images.hits))
             if (images.hits.length < 40) {
                 Notiflix.Notify.info('We are sorry, but you have reached the end of search results') 
                 loadMoreBtn.classList.add('is-hiden')
            return
       }
        }) 
       
}
    })   
}


function clearMurkup(e) {
    gallery.innerHTML = ''
}