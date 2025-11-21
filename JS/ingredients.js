// Fetch all ingredients
async function getIngredients() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await response.json();
        displayIngredientsList(data.meals);
    } catch (error) {
        console.error("Error fetching ingredients:", error);
    }
}

// Render ingredients list
function displayIngredientsList(data) {
    let html = "";

    for (let i = 0; i < data.length; i++) {
        let desc = data[i].strDescription
            ? data[i].strDescription.split(" ").slice(0, 15).join(" ")
            : "No description available";

        html += `
            <div class="ingerdientsContent d-flex flex-column justify-content-center align-items-center text-white"
                 onclick="getFoodByIngredient('${data[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="fs-2">${data[i].strIngredient}</h3>
                <p class="text-center">${desc}</p>
            </div>`;
    }

    document.querySelector("#content .row").innerHTML = html;
}

getIngredients();


// Fetch meals for this ingredient
async function getFoodByIngredient(ingredientName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
        const data = await response.json();
        displayMealsFromIngredient(data.meals);
    } catch (error) {
        console.error("Error fetching ingredient meals:", error);
    }
}


// Render meals
function displayMealsFromIngredient(meals) {
    let html = "";

    if (!meals) {
        document.querySelector("#content .row").innerHTML =
            "<h3 class='text-center text-white'>No meals found</h3>";
        return;
    }

    for (let i = 0; i < meals.length; i++) {
        html += `
        <div class="col">
            <div class="image-content position-relative" onclick="mealClicked('${meals[i].idMeal}')">
                <div class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center text-black p-3">
                    <h3>${meals[i].strMeal}</h3>
                </div>
                <img src="${meals[i].strMealThumb}" class="img-fluid">
            </div>
        </div>`;
    }

    document.querySelector("#content .row").innerHTML = html;
}

// Navigate to details page
function mealClicked(idMeal) {
    window.location.href = `foodDetails.html?id=${idMeal}`;
}
