# ReadMe Instructions
- README.md: The repository must include a README.md file that contains:
A brief description of the application and its features.
Instructions on how to install dependencies and run the project locally.
- Reflection: A short section in your README.md or in a separate REFLECTION.md file detailing:
The most challenging part of the project for you.
A brief explanation of a design decision you made (e.g., why you structured a hook a certain way, how you decided to manage a piece of state).


# About the project
- Accesses the MealDB api (https://www.themealdb.com/) to grab recipes for the user to browse and favorite.  This project allows for pulling based on region, food category, or just searching for food name.

## Dependencies
### Tailwindcss
- https://tailwindcss.com/
- instructions for installation with vite found at: https://tailwindcss.com/docs/installation/using-vite

### Heroicons
- https://heroicons.com/
- to install, run `npm install @heroicons/react` in the main folder

### Toastify
- https://www.npmjs.com/package/react-toastify
- to install, run `npm install --save react-toastify` in the main folder

#ReadMe Answers
## Most Challenging part
- The planning.  Planning everything out, creating a figma design to help process my thoughts or ideas.  The amount of pages/components/items I felt like I was juggling at the start when I was mentally mapping the project out was slightly overwhelming, but became easier as I jotted down notes and got a clearer picture of how everything should intertwine/layer together to create a functional and somewhat appealing (the design is definitely not professional by any means) app.  Refactoring several times to turn component-functions into their own components or react custom hooks. As an example, I realized that category, region, and letter list could all use the same component to display, and I just needed the component to determine what kind of api it needed to run.  Hence, we have ResultList which takes in "region", "category" and "letter" through props, while grabbing their useParam for the api through params.

## Design choice
  - I wanted to originally use a dynamic search bar, but realized that was bad on the api calls, even with a custom usedebounce hook.  I ended up creating the search bar to function as a more general-use component, allowing for it to display or hide it's search button, listen for enter key input, and act either dynamic or wait for submit.  This allowed me to make it non-dynamic for api-call searching, but allow dynamic searching on already-gathered data from the api, such as from category or region.  While I feel, generally, you want to keep same search functionality across an app, I wanted to test out implementing both in a single component.  Maybe I could, in the future, expand this component into my own search component for multiple projects, allowing for more design, more options and behaviors.


## side note
- resizing in dev tools seemed to cause issues with the site breaking, but resizing using the browser works fine
