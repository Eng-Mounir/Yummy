let searchName = document.querySelector(".searchName");
let searchLetter = document.querySelector("#searchLetter");

// Search by full meal name
searchName.addEventListener("input", function () {
    getSearchName(searchName.value);
});

// Search by first letter
searchLetter.addEventListener("input", function () {
    let letter = searchLetter.value.trim();

    // Only allow 1 letter A–Z
    if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
        getSearchByLetter(letter);
    } else if (letter.length === 0) {
        document.querySelector("#content .row").innerHTML =
            "<h3 class='text-center text-white'>Please enter a letter</h3>";
    }
});



// API for searching by NAME
async function getSearchName(foodName = "") {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`);
        let data = await response.json();
        displayFood(data.meals);
    } catch (error) {
        console.log(error.message);
    }
}

// API for searching by FIRST LETTER
async function getSearchByLetter(letter = "") {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await response.json();
        displayFood(data.meals);
    } catch (error) {
        console.log(error.message);
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

// Load default meals
getSearchName("a");

// Navigate to food details page the(id)
function mealClicked(idMeal) {
    window.location.href = `foodDetails.html?id=${idMeal}`;
}



