// get ids
 const createContainer = document.getElementById('create-container');
 const newsCategory = document.getElementById('newsCategory');

// lead container
const loadContainer =() =>{
    fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => {
        const category = data.categories

        showCategory(category)
        
    })
}
const showCategory = (categories)=>{
    createContainer.innerHTML = '';
    categories.forEach(cat => {
        createContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 text-xl">${cat.title}</li>
          `  
    });
}

createContainer.addEventListener('click', e=>{
    const allLi = document.querySelectorAll('li')
    allLi.forEach(li => { console.log(li)
    li.classList.remove('border-b-4','border-red-600')
    });
    
    if(e.target.localName === 'li'){
        
        e.target.classList.add('border-b-4','border-red-600')
        const id = (e.target.id)
        newsByCategory(id)
    }
})




// news by categories
const newsByCategory = (categoriesId)=>{
    const url = `https://news-api-fs.vercel.app/api/categories/${categoriesId}`
    fetch (url)
    .then(res => res.json())
    .then(data => displayNewsByCategory(data.articles))
}

const displayNewsByCategory =(articles)=>{
    newsCategory.innerHTML = '';
    articles.forEach(article => {
        
        newsCategory.innerHTML +=`
        <div class="border border-gray-400 rounded-lg">
            <div><img class="" src="${article.image.srcset[5].url}"/></div>
            <div class="p-3">
            <h1 class="text-2xl font-bold">${article.title}</h1>
            <p>${article.time}</p>
        </div>
        </div>
        

        `
    });

}






loadContainer()
newsByCategory('main')
