import 'skeleton-elements/css';
import dogNames from 'dog-names';

/**
 * Select the dogs container
 * @type {Element}
 */
const dogContainer = document.querySelector('.dogs');

/**
 * Fetches random dog images from the dog.ceo API and
 * creates a random name for the dog with the dog-names package.
 * @returns {Array} Array with objects containing the dog image and a random dog name
 */
async function createRandomDogs() {
  try {
    const apiResult = await fetch('https://dog.ceo/api/breeds/image/random/5');
    const dogImages = await apiResult.json();
    return dogImages.message.map((dogImage) => ({
      img: dogImage,
      name: dogNames.allRandom(),
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Converts the dog objects into valid HTML containing the image and the name.
 * @param dogs
 * @returns {Array} Array with the correct HTML string for the dog elements.
 */
async function assembleDogs(dogs) {
  return dogs.map(
    (dog) =>
      `
      <div class="dog" style="background-image: url(${dog.img})">
        <div class="info">
          <span class="name">${dog.name}</span>
        </div>
      </div>`
  );
}

/**
 * Converts an array with HTML strings into DOM Nodes and
 * appends these to the dogContainer.
 * @param dogElements
 */
async function insertDogs(dogElements) {
  const parser = new DOMParser();
  const parsed = await dogElements.map(
    (dogElement) =>
      parser
        .parseFromString(dogElement, 'text/html')
        .documentElement.querySelector('body').firstChild
  );
  dogContainer.innerHTML = '';
  await parsed.forEach((el) => dogContainer.append(el));
}

/**
 * Immediately Invoked Function Expression to enable
 * top-level async functionality. Inserts skeletons and
 * executes necessary steps to create the random dog elements.
 */
(async function () {
  if (dogContainer) {
    dogContainer.innerHTML = `
    <div class="skeleton-block dog skeleton-effect-wave" style="height: inherit;"></div>
    <div class="skeleton-block dog skeleton-effect-wave" style="height: inherit;"></div>
    <div class="skeleton-block dog skeleton-effect-wave" style="height: inherit;"></div>
    <div class="skeleton-block dog skeleton-effect-wave" style="height: inherit;"></div>
    `;
    const dogs = await createRandomDogs();
    const dogElements = await assembleDogs(dogs);
    await insertDogs(dogElements);
  }
})();
