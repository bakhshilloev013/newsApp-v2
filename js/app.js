"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // db2af74ec48d4d89a23173a4328f04eb
    const form = document.forms['form'],
          country = form.elements['country'],
          input = form.elements['input'],
          wrapper = document.querySelector(".main__block"); 

    if (localStorage.getItem("country")) {
        country.value = localStorage.getItem("country");
    };

    setResponse();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        setResponse();
    });

    function setResponse() {
        getResponse()
        .then(req => req.json())
        .then(req => renderPosts(req));
    }

    country.addEventListener("change", (e) => {
        localStorage.setItem("country", country.value);
    })

    function getResponse() {
        if (input.value) {
            return fetch(
                `https://newsapi.org/v2/everything?q=${input.value}&apiKey=db2af74ec48d4d89a23173a4328f04eb`,
                {
                    "Content-type": "application/json"
                }
            )
        } else {
            return fetch(
                `https://newsapi.org/v2/top-headlines?country=${country.value}&apiKey=db2af74ec48d4d89a23173a4328f04eb`,
                {
                    "Content-type": "application/json"
                }
            );
        }
    }

    function renderPosts(data) {
        const {articles} = data;
        wrapper.innerHTML = "";
        articles.forEach(obj => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card__main">
                    <div class="card__title">${obj.title}</div>
                    <div class="card__descr">${obj.description || ""}</div>
                </div>
                <div class="card__more">
                    <a href="${obj.url}">More</a>
                </div>
            `;
            card.style.cssText = `
                background: url(${obj.urlToImage}) center center/cover no-repeat;
            `;
            wrapper.append(card);
        })  
    }; 

}); //! End


