const loadingIcon = document.querySelector(".loading");

// API for searching by FIRST LETTER (a)
async function getFirstByLetter() {
    loadingIcon.classList.remove("d-none");
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`);
        let data = await response.json();
      displayFood(data.meals);
      
    } catch (error) {
        console.log(error.message);
    } finally {
        loadingIcon.classList.add("d-none");
    }
}

// Render meals
function displayFood(data) {
    let html = "";

    if (!data) {
        document.querySelector("#content .row").innerHTML =
            "<h3 class='text-center text-white'>No results found</h3>";
        return;
    }

    for (let i = 0; i < data.length; i++) {
        html += `
        <div class="col">
            <div class="image-content position-relative" onclick="mealClicked('${data[i].idMeal}')">
            
                <div
                    class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center text-black p-3">
                    <h3>${data[i].strMeal}</h3>
                </div>

                <img src="${data[i].strMealThumb}" class="img-fluid">
            </div>
        </div>`;
        
    }

    document.querySelector("#content .row").innerHTML = html;
}



getFirstByLetter();


// Navigate to food details page the(id)
function mealClicked(idMeal) {
    window.location.href = `foodDetails.html?id=${idMeal}`;
}

