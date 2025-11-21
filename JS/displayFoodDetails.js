const row = document.querySelector(".row");

// Get meal ID from URL
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

// Fetch meal details
async function loadMealDetails(id) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data)
        if (!data.meals) {
            row.innerHTML = "<p class='text-white'>Meal not found.</p>";
            return;
        }

        displayMealDetails(data.meals[0]);
        
    } catch (error) {
        console.error("Error fetching meal details:", error);
    }
}

// Display meal details in HTML
function displayMealDetails(meal) {
    row.innerHTML = `
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">
            <h2 class="text-white text-center mt-2">${meal.strMeal}</h2>
        </div>

        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>

            <h3><strong>Area:</strong> ${meal.strArea}</h3>
            <h3><strong>Category:</strong> ${meal.strCategory}</h3>

            <h3>Ingredients:</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${[...Array(20).keys()].map(i => {
                    const ing = meal[`strIngredient${i+1}`];
                    const mea = meal[`strMeasure${i+1}`];
                    return ing ? `<li class="alert alert-info m-2 p-1">${mea} ${ing}</li>` : "";
                }).join("")}
            </ul>

            ${meal.strTags ? `
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex flex-wrap">
                ${meal.strTags.split(",").map(tag =>
                    `<li class="alert alert-warning m-2 p-1">${tag}</li>`
                ).join("")}
            </ul>
            ` : ""}

            <a href="${meal.strSource}" target="_blank" class="btn btn-success me-2">Source</a>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">YouTube</a>
        </div>
    `;
}

// Load meal details on page load
if (mealId) {
    loadMealDetails(mealId);
} else {
    row.innerHTML = "<p class='text-white'>No meal ID provided.</p>";
}
