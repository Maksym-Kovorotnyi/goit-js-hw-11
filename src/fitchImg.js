import axios from 'axios';
  const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '33210192-5f8af8cda6b7a90f304f69324';
  


export default async function fetchImg (userInput, page) {
    const filter = `?key=${MY_KEY}&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
    try{
        const response = await axios.get(`${BASE_URL}${filter}`);
        const obj = response.data
        return obj
    
        
    } catch(error) {
        console.log(error)
        }
}


