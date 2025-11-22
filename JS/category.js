
// // Display all categories
//         async function getCategories() {
//             try {
//                 let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
//                 let data = await response.json();
//                 diplayCategories(data.categories);
//             } catch (error) {
//                 console.log("Error fetching categories:", error.message);
//             }
//         }

//         function diplayCategories(array) {
//             document.getElementById("backBtn").style.display = "none"; // hide back button
//             let categoriesBox = "";
//             for (let i = 0; i < array.length; i++) {
//                 categoriesBox += `
//                     <div class="col">
//                         <div class="image-content position-relative" onclick="categoryClicked('${array[i].strCategory}')">
//                             <div class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0
//                                 d-flex flex-column justify-content-center align-items-center text-black p-3">
//                                 <h3>${array[i].strCategory}</h3>
//                                 <p>${array[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}...</p>
//                             </div>
//                             <img src="${array[i].strCategoryThumb}" class="img-fluid">
//                         </div>
//                     </div>
//                 `;
//             }
//             document.querySelector(".row").innerHTML = categoriesBox;
//         }

//         // When a category is clicked
//         async function categoryClicked(nameOfCategory) {
//             try {
//                 let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameOfCategory}`);
//                 let data = await response.json();
//                 displayMeals(data.meals);
//             } catch (error) {
//                 console.log("Error fetching meals:", error);
//             }
//         }

//         // Display meals in the same row
//         function displayMeals(meals) {
//             document.getElementById("backBtn").style.display = "block"; // show back button
//             let mealsBox = "";
//             for (let i = 0; i < meals.length; i++) {
//                 mealsBox += `
//                     <div class="col">
//                         <div class="image-content position-relative" onclick="mealClicked('${meals[i].idMeal}')">
//                             <div class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0
//                                 d-flex flex-column justify-content-center align-items-center text-black p-3">
//                                 <h3>${meals[i].strMeal}</h3>
//                             </div>
//                             <img src="${meals[i].strMealThumb}" class="img-fluid">
//                         </div>
//                     </div>
//                 `;
//             }
//             document.querySelector(".row").innerHTML = mealsBox;
//         }

//         // Navigate to foodDetails.html
//         function mealClicked(idMeal) {
//             window.location.href = `foodDetails.html?id=${idMeal}`;
//         }

//         // Back to categories
//         function backToCategories() {
//             getCategories();
//         }

//         // Load categories on page load
//         getCategories();
const categoryRow = document.querySelector(".row");
const backBtn = document.getElementById("backBtn");
 const loadingIcon = document.querySelector(".loading");
// Display all categories
async function getCategories() {
    backBtn.style.display = "none";
    loadingIcon.classList.remove("d-none");

    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        displayCategories(data.categories);

    } catch (error) {
        console.error("Error fetching categories:", error);
    }
    finally {
        loadingIcon.classList.add("d-none");
    }
}

function displayCategories(categories) {
    categoryRow.innerHTML = categories
        .map(
            cat => `
        <div class="col">
            <div class="image-content position-relative" onclick="categoryClicked('${cat.strCategory}')">
                <div class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0 
                    d-flex flex-column justify-content-center align-items-center text-black p-3">
                    <h3>${cat.strCategory}</h3>
                    <p>${cat.strCategoryDescription.split(" ").slice(0, 15).join(" ")}...</p>
                </div>
                <img src="${cat.strCategoryThumb}" class="img-fluid">
            </div>
        </div>
    `
        )
        .join("");
}

// When category clicked
 async function categoryClicked(nameOfCategory) {
    loadingIcon.classList.remove("d-none");

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameOfCategory}`
        );
        const data = await response.json();
        displayMeals(data.meals);

    } catch (error) {
        console.error("Error fetching meals:", error);
    }
    finally {
        loadingIcon.classList.add("d-none");
    }
}

function displayMeals(meals) {
    backBtn.style.display = "block";

    categoryRow.innerHTML = meals
        .map(
            meal => `
        <div class="col">
            <div class="image-content position-relative" onclick="mealClicked('${meal.idMeal}')">
                <div class="layer bg-light opacity-75 position-absolute top-0 start-0 end-0 bottom-0 
                    d-flex flex-column justify-content-center align-items-center text-black p-3">
                    <h3>${meal.strMeal}</h3>
                </div>
                <img src="${meal.strMealThumb}" class="img-fluid">
            </div>
        </div>
    `
        )
        .join("");
}

// Load categories on page load
getCategories();

// Navigate to food details page
function mealClicked(idMeal) {
    window.location.href = `foodDetails.html?id=${idMeal}`;
}

// Back to categories
function backToCategories() {
    getCategories();
}
window.categoryClicked = categoryClicked;
window.mealClicked = mealClicked;
window.backToCategories = backToCategories;
