//promise -> pending -> fullfilled -> rejected
const catagoriContainer = document.getElementById("catagori-container");

const newsContainer = document.getElementById("news-container");

const bookmarkContainer = document.getElementById("bookmark-Container")


let bookmarks = [];




const loadCategories = () => {
    fetch("https://news-api-fs.vercel.app/api/categories ")//promise
        .then(res => res.json()) //promise
        .then(data => {
            // console.log(data.categories);
            const categories = data.categories;
            // console.log(categories);
            showCategory(categories);

        })


        .catch(err => {
            console.log(err)
        })


};

const showCategory = (categories) => {
    categories.forEach(cat => {
        catagoriContainer.innerHTML += `
                 <li id="${cat.id}" class="hover:border-b-4 border-red-600   hover:border-red-600">${cat.title}</li>
                `


    })
    catagoriContainer.addEventListener('click', (e) => {

        const allLi = document.querySelectorAll("li");
        allLi.forEach(li => {
            li.classList.remove("border-b-4")
        })

        if (e.target.localName === "li") {
            // console.log(e.target.id)
            e.target.classList.add("border-b-4",);
            loadNewsByCategory(e.target.id)
        }
    })



}

const loadNewsByCategory = (catagoriId) => {
    // console.log(catagoriId)
    fetch(`https://news-api-fs.vercel.app/api/categories/${catagoriId}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.articles)

            showNowsCatagoriy(data.articles)
        })
        .catch(err => {
            console.log(err)
        })


}

const showNowsCatagoriy = (articels) => {
    // console.log(articels)
    newsContainer.innerHTML = "";
    articels.forEach(articel => {

        newsContainer.innerHTML += `
            <div  class="border border-gray-200 rounded-lg  ">

            <div><img  src="${articel.image.srcset[5].url}" alt=""></div>

            <div id="${articel.id}" class="p-2">
               <h1 class="font-bold">${articel.title}</h1>
                <p class="text-sm">${articel.time}</p>
                <button class="btn">Bookmark</button>
            </div>

                
                
               
            </div>
                
            
            
            `
    })
}

newsContainer.addEventListener("click", (e) => {
    // console.log(e.target)

    if (e.target.innerText === "Bookmark") {
        // console.log("bookmark clicked")

        handleBookmark(e);


    }
})


const handleBookmark = (e) => {
    const title = e.target.parentNode.children[0].innerText;

    const id = e.target.parentNode.id


    bookmarks.push({
        title: title,
        id: id,
    })

    // console.log(bookmark)

    showBookmarks(bookmarks);


}

const showBookmarks = (bookmarks) => {
    console.log(bookmarks)
   bookmarkContainer.innerHTML = ""

    //    console.log(bookmarks)
    bookmarks.forEach(bookmark => {
       bookmarkContainer.innerHTML += `
        
            <div class="border-border-gray-200 rounded-lg p-2 mb-2">
               <h1>${bookmark.title}</h1>
               <button onclick="handleDeleteBooksmarks('${bookmark.id}')" class="btn btn-xs">Delete</button>
            </div>

        `;
    })


}


const handleDeleteBooksmarks = (bookmarkId) => {
   const filterBookmarks= bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
   bookmarks = filterBookmarks
   showBookmarks(bookmarks)
}

loadCategories();


loadNewsByCategory("main")




















// const loadCategoriesAysns = async () => {
//     try {
//         const res = await fetch("https://news-api-fs.vercel.app/api/categories");
//         const data = await res.json();
//         console.log(data);

//     }
//     catch (error) {
//         console.log(error);
//     }



// }


// loadCategoriesAysns()