// src/components/effectIngredientFinder.js

const effectsURL = 'https://raw.githubusercontent.com/jpasholk/skyrim-alchemy/master/src/data/effects.json';
const ingredientsURL = 'https://raw.githubusercontent.com/jpasholk/skyrim-alchemy/master/src/data/ingredients.json';

// Function to load JSON data from a URL
export async function loadJSON(url) {
    const response = await fetch(url);
    return await response.json();
}

// Function to initialize the effect selection dropdown
export async function initializeDropdown() {
    const effectsData = await loadJSON(effectsURL);
    const ingredientsData = await loadJSON(ingredientsURL);

    // Map effects for easy lookup
    const effectsDict = {};
    effectsData.forEach(effect => effectsDict[effect.effect] = effect.value);

    // Display available effects in the dropdown
    const effectSelect = document.getElementById('effectSelect');
    Object.keys(effectsDict).forEach(effect => {
        const option = document.createElement('option');
        option.value = effect;
        option.textContent = effect;
        effectSelect.appendChild(option);
    });

    // Add event listener for dropdown change
    effectSelect.addEventListener('change', function() {
        displayIngredientsForEffect(this.value, ingredientsData);
    });
}

// Function to display ingredients with the selected effect
export function displayIngredientsForEffect(effect, ingredientsData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous results

    if (effect) {
        const matchingIngredients = ingredientsData.filter(ingredient =>
            ingredient.effects.includes(effect)
        );

        if (matchingIngredients.length > 0) {
            const header = document.createElement('h2');
            header.textContent = `Ingredients with effect "${effect}":`;
            resultsDiv.appendChild(header);

            matchingIngredients.forEach(ingredient => {
                const ingredientDiv = document.createElement('div');
                ingredientDiv.classList.add('ingredient');

                ingredientDiv.innerHTML = `
                    <h3>${ingredient.name}</h3>
                    <p><strong>Effects:</strong> ${ingredient.effects.join(', ')}</p>
                    <p><strong>Obtained from:</strong> ${ingredient.obtained}</p>
                    <p><strong>Value:</strong> ${ingredient.value}</p>
                    <p><strong>Weight:</strong> ${ingredient.weight}</p>
                    <p><strong>Plantable:</strong> ${ingredient.plantable ? 'Yes' : 'No'}</p>
                    <p><strong>Fishable:</strong> ${ingredient.fishable ? 'Yes' : 'No'}</p>
                `;
                resultsDiv.appendChild(ingredientDiv);
            });
        } else {
            resultsDiv.innerHTML = `<p>No ingredients found with the effect "${effect}".</p>`;
        }
    }
}