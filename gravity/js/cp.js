// Constants
const GRAVITY_CONSTANT = 0.5;
const BLACKHOLE_MASS = 1000;
const MAX_GRAVITY_DISTANCE = 1000;

// DOM Elements
const dom = {
    startBtn: document.getElementById('startBtn'),
    codingInterface: document.getElementById('codingInterface'),
    problemTitle: document.getElementById('problemTitle'),
    problemDescription: document.getElementById('problemDescription'),
    codeArea: document.getElementById('codeArea'),
    outputContent: document.getElementById('outputContent'),
    runBtn: document.getElementById('runBtn'),
    resetBtn: document.getElementById('resetBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    languageSelect: document.getElementById('language'),
    difficultySelect: document.getElementById('difficulty'),
    timerContainer: document.getElementById('timerContainer'),
    timerElement: document.getElementById('timer'),
    starsContainer: document.getElementById('stars'),
    gravitationalField: document.getElementById('gravitationalField'),
    blackhole: document.getElementById('blackhole')
};

// Game State
const state = {
    currentChallengeIndex: 0,
    timerInterval: null,
    timeLeft: 0,
    lastTimeUpdate: 0,
    activeParticles: new Set()
};

// Challenges Data
const challenges = {
    html: {
        easy: [                    {
            title: "HTML: Basic Page Structure",
            description: "Create a complete HTML5 page structure with doctype, html, head, and body tags. Include a title in the head and a heading in the body.",
            code: `<!DOCTYPE html>
<html>
<head>
<title>My First Page</title>
</head>
<body>
<!-- Add an h1 heading here with the text "Welcome to My Website" -->

</body>
</html>`
        },
        {
            title: "HTML: Simple Form",
            description: "Create a form with fields for name, email, and a submit button. Use appropriate input types and labels for each field.",
            code: `<form>
<!-- Add form fields here -->

</form>`
        },
        {
            title: "HTML: Image and Link",
            description: "Create a page with an image that links to another website when clicked. Use placeholder image URL.",
            code: `<div>
<!-- Add linked image here -->

</div>`
        },
        {
            title: "HTML: Ordered List",
            description: "Create an ordered list of your top 3 favorite books or movies.",
            code: `<ol>
<!-- Add list items here -->

</ol>`
        },
        {
            title: "HTML: Semantic Elements",
            description: "Use semantic HTML elements (header, nav, main, footer) to structure a basic webpage.",
            code: `<!-- Use semantic elements to structure this page -->
<div>
<div>Website Header</div>
<div>
<div>Navigation Links</div>
<div>Main Content Area</div>
</div>
<div>Footer Information</div>
</div>`
        }],
        medium: [{
            title: "HTML: Table Creation",
            description: "Create a table with 3 columns (Name, Age, Country) and 3 rows of sample data.",
            code: `<table>
<!-- Create table structure with headers and data rows -->

</table>`
        },
        {
            title: "HTML: Video Embed",
            description: "Embed a YouTube video using iframe with responsive dimensions (16:9 aspect ratio).",
            code: `<div class="video-container">
<!-- Embed YouTube video here -->

</div>`
        },
        {
            title: "HTML: Form Validation",
            description: "Create a registration form with required fields, email validation, and password matching.",
            code: `<form id="registration">
<!-- Create form with validation attributes -->

</form>`
        },
        {
            title: "HTML: SVG Graphic",
            description: "Create a simple SVG graphic (circle, rectangle, or polygon) with fill color.",
            code: `<svg width="200" height="200">
<!-- Add SVG elements here -->

</svg>`
        },
        {
            title: "HTML: Meta Tags",
            description: "Add essential meta tags for SEO, viewport settings, and social media sharing.",
            code: `<head>
<title>My Page</title>
<!-- Add meta tags here -->

</head>`
        }],
        hard: [{
            title: "HTML: Accessible Modal",
            description: "Create an accessible modal dialog with proper ARIA attributes and focus management.",
            code: `<button id="openModal">Open Modal</button>

<!-- Create modal structure with ARIA attributes -->
<div>
<div>
<h2>Modal Title</h2>
<p>Modal content goes here</p>
<button>Close</button>
</div>
</div>`
        },
        {
            title: "HTML: Web Component",
            description: "Create a custom HTML element using the template and slot elements.",
            code: `<template id="user-card">
<!-- Define template structure -->

</template>

<!-- Use the custom element -->
<user-card>
<!-- Add slotted content -->
</user-card>`
        },
        {
            title: "HTML: Microdata",
            description: "Mark up a recipe page using schema.org microdata for search engines.",
            code: `<article>
<!-- Add recipe microdata -->
<h1>Chocolate Chip Cookies</h1>
<p>By Chef Baker</p>
<ul>
<li>2 cups flour</li>
<li>1 cup chocolate chips</li>
</ul>
<ol>
<li>Mix ingredients</li>
<li>Bake at 350°F for 10 minutes</li>
</ol>
</article>`
        },
        {
            title: "HTML: Offline Cache",
            description: "Create a basic cache manifest for offline web application.",
            code: `<!DOCTYPE html>
<html manifest="app.manifest">
<head>
<!-- Add cache manifest file -->

</head>
<body>
App content
</body>
</html>`
        },
        {
            title: "HTML: Web Worker",
            description: "Set up a basic web worker to perform calculations in the background.",
            code: `<!-- Create page that uses a web worker -->
<script>
// Initialize web worker

// Handle messages from worker
</script>`
        }]
    },
    css: {
        easy: [{
            title: "CSS: Basic Styling",
            description: "Style a heading with a specific font, color, and center alignment.",
            code: `<h1 class="styled-heading">Hello World</h1>

<style>
/* Add CSS rules here */

</style>`
        },
        {
            title: "CSS: Box Model",
            description: "Create a div with specific width, padding, border, and margin.",
            code: `<div class="box">Content Box</div>

<style>
/* Style the box */

</style>`
        },
        {
            title: "CSS: Background Image",
            description: "Add a background image to a div with proper sizing and positioning.",
            code: `<div class="hero"></div>

<style>
/* Add background image styling */

</style>`
        },
        {
            title: "CSS: Text Styling",
            description: "Style a paragraph with line height, letter spacing, and text shadow.",
            code: `<p class="fancy-text">This is some text to style</p>

<style>
/* Add text styling */

</style>`
        },
        {
            title: "CSS: Basic Layout",
            description: "Create a simple two-column layout using floats or inline-block.",
            code: `<div class="container">
<div class="column">Left</div>
<div class="column">Right</div>
</div>

<style>
/* Create the layout */

</style>`
        }],
        medium: [{
            title: "CSS: Flexbox Layout",
            description: "Create a responsive navigation bar using flexbox.",
            code: `<nav class="navbar">
<a href="#">Home</a>
<a href="#">About</a>
<a href="#">Contact</a>
</nav>

<style>
/* Style the navbar with flexbox */

</style>`
        },
        {
            title: "CSS: Grid Layout",
            description: "Create a photo gallery grid with 3 columns and responsive rows.",
            code: `<div class="gallery">
<div class="photo">1</div>
<div class="photo">2</div>
<div class="photo">3</div>
<div class="photo">4</div>
<div class="photo">5</div>
<div class="photo">6</div>
</div>

<style>
/* Create the grid layout */

</style>`
        },
        {
            title: "CSS: Animations",
            description: "Create a spinning loader animation using CSS keyframes.",
            code: `<div class="loader"></div>

<style>
/* Create the animation */

</style>`
        },
        {
            title: "CSS: Responsive Design",
            description: "Make a layout responsive with media queries for different screen sizes.",
            code: `<div class="responsive-box">Resize me!</div>

<style>
/* Add responsive styles */

</style>`
        },
        {
            title: "CSS: Transforms",
            description: "Create a card that flips on hover using CSS transforms.",
            code: `<div class="flip-card">
<div class="flip-card-inner">
<div class="flip-card-front">Front</div>
<div class="flip-card-back">Back</div>
</div>
</div>

<style>
/* Create the flip effect */

</style>`
        }],
        hard: [{
            title: "CSS: Custom Properties",
            description: "Create a theme switcher using CSS custom properties (variables).",
            code: `<button class="theme-toggle">Toggle Theme</button>
<div class="themeable-box">Content</div>

<style>
/* Implement theme switching with variables */

</style>`
        },
        {
            title: "CSS: Clip-path",
            description: "Create a complex shape using clip-path property.",
            code: `<div class="custom-shape"></div>

<style>
/* Create the custom shape */

</style>`
        },
        {
            title: "CSS: Blend Modes",
            description: "Create an image overlay effect using blend modes.",
            code: `<div class="image-container">
<img src="image.jpg" alt="Sample">
<div class="overlay"></div>
</div>

<style>
/* Create the blend mode effect */

</style>`
        },
        {
            title: "CSS: Scroll Snap",
            description: "Create a horizontal scroll gallery with snap points.",
            code: `<div class="scroll-container">
<div class="scroll-item">1</div>
<div class="scroll-item">2</div>
<div class="scroll-item">3</div>
</div>

<style>
/* Implement scroll snapping */

</style>`
        },
        {
            title: "CSS: Custom Checkbox",
            description: "Style a custom checkbox without using JavaScript.",
            code: `<label class="custom-checkbox">
<input type="checkbox">
<span>Check me</span>
</label>

<style>
/* Style the custom checkbox */

</style>`
        }]
    },
    javascript: {
        easy: [{
            title: "JavaScript: Hello World",
            description: "Write a function that returns the string 'Hello, World!'.",
            code: `function helloWorld() {
// Your code here

}`
        },
        {
            title: "JavaScript: Sum Two Numbers",
            description: "Write a function that takes two numbers as arguments and returns their sum.",
            code: `function sum(a, b) {
// Your code here

}`
        },
        {
            title: "JavaScript: Even or Odd",
            description: "Write a function that takes a number and returns 'Even' if the number is even or 'Odd' if it's odd.",
            code: `function evenOrOdd(num) {
// Your code here

}`
        },
        {
            title: "JavaScript: Array Sum",
            description: "Write a function that calculates the sum of all numbers in an array.",
            code: `function arraySum(arr) {
// Your code here

}`
        },
        {
            title: "JavaScript: String Reversal",
            description: "Write a function that reverses a string (without using the reverse method).",
            code: `function reverseString(str) {
// Your code here

}`
        }],
        medium: [{
            title: "JavaScript: Palindrome Check",
            description: "Write a function that checks if a string is a palindrome (reads the same backward as forward).",
            code: `function isPalindrome(str) {
// Your code here

}`
        },
        {
            title: "JavaScript: FizzBuzz",
            description: "Write a function that prints numbers from 1 to 100, but for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'.",
            code: `function fizzBuzz() {
// Your code here

}`
        },
        {
            title: "JavaScript: Factorial",
            description: "Write a function that calculates the factorial of a number (both iteratively and recursively).",
            code: `function factorial(n) {
// Your code here

}`
        },
        {
            title: "JavaScript: Array Sorting",
            description: "Write a function that sorts an array of numbers in ascending order (without using the sort method).",
            code: `function sortArray(arr) {
// Your code here

}`
        },
        {
            title: "JavaScript: Prime Check",
            description: "Write a function that checks if a number is prime.",
            code: `function isPrime(num) {
// Your code here

}`
        }],
        hard: [{
            title: "JavaScript: Memoization",
            description: "Implement a memoization function that caches results of expensive function calls.",
            code: `function memoize(fn) {
// Your code here

}`
        },
        {
            title: "JavaScript: Promise Queue",
            description: "Implement a promise queue that processes promises sequentially.",
            code: `class PromiseQueue {
constructor() {
// Your code here

}

add(promiseFn) {
// Your code here

}
}`
        },
        {
            title: "JavaScript: Deep Clone",
            description: "Write a function that performs a deep clone of a JavaScript object.",
            code: `function deepClone(obj) {
// Your code here

}`
        },
        {
            title: "JavaScript: Currying",
            description: "Implement a curry function that transforms a function to allow partial application.",
            code: `function curry(fn) {
// Your code here

}`
        },
        {
            title: "JavaScript: Event Emitter",
            description: "Implement a simple event emitter class with on, off, and emit methods.",
            code: `class EventEmitter {
constructor() {
// Your code here

}

on(event, callback) {
// Your code here

}

off(event, callback) {
// Your code here

}

emit(event, ...args) {
// Your code here

}
}`
        }]
    },
    react: {
        easy: [{
            title: "React: Functional Component",
            description: "Create a simple functional component that displays a greeting message.",
            code: `import React from 'react';

function Greeting() {
// Return a JSX element with a greeting message

}`
        },
        {
            title: "React: Props",
            description: "Create a component that accepts a 'name' prop and displays a personalized greeting.",
            code: `import React from 'react';

function Welcome(props) {
// Use the name prop to display a message

}`
        },
        {
            title: "React: State Counter",
            description: "Create a counter component with buttons to increment and decrement the count.",
            code: `import React, { useState } from 'react';

function Counter() {
// Create state and buttons to modify it

}`
        },
        {
            title: "React: List Rendering",
            description: "Create a component that renders a list of items from an array prop.",
            code: `import React from 'react';

function ItemList({ items }) {
// Render the list of items

}`
        },
        {
            title: "React: Conditional Rendering",
            description: "Create a component that shows different content based on a boolean prop.",
            code: `import React from 'react';

function UserGreeting({ isLoggedIn }) {
// Show different content based on isLoggedIn

}`
        }],
        medium: [{
            title: "React: Form Handling",
            description: "Create a controlled form component with validation for a login form.",
            code: `import React, { useState } from 'react';

function LoginForm() {
// Create controlled form with validation

}`
        },
        {
            title: "React: useEffect",
            description: "Create a component that fetches data from an API when it mounts.",
            code: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
// Fetch data when component mounts

}`
        },
        {
            title: "React: Context API",
            description: "Create a theme context and components that consume it.",
            code: `import React, { createContext, useContext } from 'react';

// Create context and provider
const ThemeContext = createContext();

function ThemeProvider({ children }) {
// Provide theme value

}

function ThemedButton() {
// Consume theme context

}`
        },
        {
            title: "React: Custom Hook",
            description: "Create a custom hook for handling form input state.",
            code: `import { useState } from 'react';

function useFormInput(initialValue) {
// Create custom hook logic

}

function MyForm() {
// Use the custom hook

}`
        },
        {
            title: "React: Higher-Order Component",
            description: "Create a HOC that adds loading state to a component.",
            code: `import React from 'react';

function withLoading(Component) {
// Create HOC logic

}

// Usage example
const EnhancedComponent = withLoading(MyComponent);`
        }],
        hard: [{
            title: "React: Redux Reducer",
            description: "Implement a Redux reducer for a todo application.",
            code: `function todosReducer(state = [], action) {
// Handle ADD_TODO, TOGGLE_TODO, DELETE_TODO actions

}`
        },
        {
            title: "React: Performance Optimization",
            description: "Optimize a component to prevent unnecessary re-renders.",
            code: `import React, { useState, memo, useCallback } from 'react';

function ExpensiveComponent({ items, onSelect }) {
// Optimize this component

}`
        },
        {
            title: "React: Error Boundary",
            description: "Create an error boundary component to catch JavaScript errors.",
            code: `import React from 'react';

class ErrorBoundary extends React.Component {
// Implement error boundary methods

}`
        },
        {
            title: "React: Render Props",
            description: "Create a component that uses render props to share functionality.",
            code: `import React from 'react';

class MouseTracker extends React.Component {
// Implement render props pattern

}`
        },
        {
            title: "React: Suspense",
            description: "Implement React Suspense with lazy loading for a component.",
            code: `import React, { Suspense, lazy } from 'react';

// Implement lazy loading with Suspense fallback
const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
// Use Suspense

}`
        }]
    },
    mongodb: {
        easy: [{
            title: "MongoDB: Insert Document",
            description: "Write a MongoDB query to insert a new document into a 'users' collection with name, email, and age fields.",
            code: `// MongoDB query to insert a user
db.users.insertOne({
/* Add document fields */

});`
        },
        {
            title: "MongoDB: Find Documents",
            description: "Write a MongoDB query to find all documents in a 'products' collection where price is greater than 100.",
            code: `// MongoDB query to find expensive products
db.products.find({
/* Add query criteria */

});`
        },
        {
            title: "MongoDB: Update Document",
            description: "Write a MongoDB query to update a user's email address by their _id.",
            code: `// MongoDB query to update user email
db.users.updateOne(
{ /* Filter criteria */ },
{ /* Update operation */ }
);`
        },
        {
            title: "MongoDB: Delete Document",
            description: "Write a MongoDB query to delete a document from a 'posts' collection by its _id.",
            code: `// MongoDB query to delete a post
db.posts.deleteOne({
/* Add filter criteria */

});`
        },
        {
            title: "MongoDB: Count Documents",
            description: "Write a MongoDB query to count the number of active users (status: 'active') in the 'users' collection.",
            code: `// MongoDB query to count active users
db.users.countDocuments({
/* Add query criteria */

});`
        }],
        medium: [{
            title: "MongoDB: Aggregation Pipeline",
            description: "Write a MongoDB aggregation pipeline to calculate the average price of products in each category.",
            code: `// MongoDB aggregation pipeline
db.products.aggregate([
/* Add pipeline stages */

]);`
        },
        {
            title: "MongoDB: Index Creation",
            description: "Write a MongoDB query to create an index on the 'email' field of the 'users' collection to ensure uniqueness.",
            code: `// MongoDB index creation
db.users.createIndex({
/* Add index specification */

});`
        },
        {
            title: "MongoDB: Text Search",
            description: "Write a MongoDB query to perform a text search on a 'articles' collection for documents containing 'JavaScript' or 'Node.js'.",
            code: `// MongoDB text search query
db.articles.find({
/* Add text search criteria */

});`
        },
        {
            title: "MongoDB: Transaction",
            description: "Write a MongoDB transaction that transfers funds between two accounts in the 'accounts' collection.",
            code: `// MongoDB transaction
const session = db.getMongo().startSession();
session.startTransaction();

try {
/* Add transaction operations */

session.commitTransaction();
} catch (error) {
session.abortTransaction();
throw error;
}`
        },
        {
            title: "MongoDB: Geospatial Query",
            description: "Write a MongoDB query to find restaurants within 1 kilometer of a specific location (use 2dsphere index).",
            code: `// MongoDB geospatial query
db.restaurants.find({
/* Add geospatial criteria */

});`
        }],
        hard: [{
            title: "MongoDB: Complex Aggregation",
            description: "Write a MongoDB aggregation pipeline to find the top 5 most purchased products with their total revenue.",
            code: `// Complex aggregation pipeline
db.orders.aggregate([
/* Add pipeline stages */

]);`
        },
        {
            title: "MongoDB: Change Streams",
            description: "Implement a MongoDB change stream to watch for inserts in the 'notifications' collection.",
            code: `// MongoDB change stream
const changeStream = db.notifications.watch([
/* Add pipeline if needed */
]);

changeStream.on('change', (change) => {
/* Handle change event */

});`
        },
        {
            title: "MongoDB: Schema Validation",
            description: "Add schema validation to a 'users' collection to enforce required fields and data types.",
            code: `// MongoDB schema validation
db.runCommand({
collMod: "users",
validator: {
/* Add validation rules */

},
validationLevel: "strict"
});`
        },
        {
            title: "MongoDB: Bulk Operations",
            description: "Write a MongoDB bulk operation to update multiple documents with different values in a single operation.",
            code: `// MongoDB bulk write operation
const bulkOps = [
/* Add bulk operations */

];

db.products.bulkWrite(bulkOps);`
        },
        {
            title: "MongoDB: Atlas Search",
            description: "Write a MongoDB Atlas Search query to perform a fuzzy search on product names with autocomplete functionality.",
            code: `// MongoDB Atlas Search query
db.products.aggregate([
{
$search: {
/* Add search criteria */

}
}
]);`
        }]
    }
};

// Initialize the app
function init() {
    createStars();
    setupEventListeners();
    initGravitySimulation();
}

// Starfield Creation
function createStars() {
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        const zPos = Math.random() * 100;
        
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.5 + (zPos / 100) * 0.5};
            transform: translateZ(${zPos}px);
            --duration: ${5 + Math.random() * 10}s;
        `;
        
        dom.starsContainer.appendChild(star);
    }
}

// Event Listeners
function setupEventListeners() {
    dom.languageSelect.addEventListener('change', handleLanguageChange);
    dom.difficultySelect.addEventListener('change', handleDifficultyChange);
    dom.startBtn.addEventListener('click', startCodingSession);
    dom.runBtn.addEventListener('click', executeCode);
    dom.resetBtn.addEventListener('click', resetCode);
    dom.prevBtn.addEventListener('click', () => switchChallenge(-1));
    dom.nextBtn.addEventListener('click', () => switchChallenge(1));

    const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        dom.codingInterface.classList.remove('active');
        dom.codingInterface.style.display = 'none';
        document.querySelector('.setup-panel').style.display = 'block';
        document.querySelector('.rules-panel').style.display = 'block';
        createGravityWells(); // reapply gravity
        clearInterval(state.timerInterval);
        dom.timerContainer.style.display = 'none';
    });
}


    window.addEventListener('resize', createGravityWells);
}

function handleLanguageChange() {
    dom.difficultySelect.disabled = !dom.languageSelect.value;
    dom.startBtn.disabled = !dom.languageSelect.value;
}

function handleDifficultyChange() {
    dom.startBtn.disabled = !dom.difficultySelect.value;
}

// Challenge Management
function getChallenge(language, difficulty, index) {
    if (!challenges[language] || !challenges[language][difficulty]) {
        return null;
    }
    return challenges[language][difficulty][index] || null;
}

function startCodingSession() {
    const language = dom.languageSelect.value;
    const difficulty = dom.difficultySelect.value;
    const challenge = getChallenge(language, difficulty, state.currentChallengeIndex);
    
    if (!challenge) {
        console.error('Challenge not found');
        return;
    }
    
    // Set challenge content
    dom.problemTitle.textContent = challenge.title;
    dom.problemDescription.textContent = challenge.description;
    dom.codeArea.value = challenge.code;
    
    // Initialize timer
    initializeTimer(difficulty);
    
    // Start gravity effect
    createGravitationalCollapse(() => {
        dom.codingInterface.classList.add('active');
        createOrbitingCodeParticles();
    });
    updateNavButtons(language, difficulty);

}

function initializeTimer(difficulty) {
    // Set time based on difficulty
    const timeSettings = {
        easy: 5 * 60,
        medium: 10 * 60,
        hard: 15 * 60
    };
    
    state.timeLeft = timeSettings[difficulty] || 5 * 60;
    updateTimerDisplay();
    dom.timerContainer.style.display = 'block';
    startTimer();
}

// Timer Functions
function startTimer() {
    clearInterval(state.timerInterval);
    state.lastTimeUpdate = Date.now();
    state.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - state.lastTimeUpdate) / 1000);
    state.timeLeft = Math.max(0, state.timeLeft - elapsedSeconds);
    state.lastTimeUpdate = now;
    
    updateTimerDisplay();
    
    if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        showOutput("Time's up! The black hole has consumed your time. Try again!", true);
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const newDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (dom.timerElement.textContent !== newDisplay) {
        animateTimerDigits(newDisplay);
    }
}

function animateTimerDigits(newDisplay) {
    const timerDigits = dom.timerElement.querySelectorAll('.timer-digit');
    const newDigits = newDisplay.split('');
    
    if (timerDigits.length === 0) {
        dom.timerElement.innerHTML = '';
        newDigits.forEach(digit => {
            const span = document.createElement('span');
            span.className = 'timer-digit';
            span.textContent = digit;
            dom.timerElement.appendChild(span);
        });
    } else {
        newDigits.forEach((digit, i) => {
            if (timerDigits[i].textContent !== digit) {
                timerDigits[i].classList.add('flip');
                setTimeout(() => {
                    timerDigits[i].textContent = digit;
                    timerDigits[i].classList.remove('flip');
                }, 150);
            }
        });
    }
}

// Code Execution
function executeCode() {
    const language = dom.languageSelect.value;
    const difficulty = dom.difficultySelect.value;
    const code = dom.codeArea.value;
    const challenge = getChallenge(language, difficulty, state.currentChallengeIndex);
    
    showOutput("Executing code...", false);
    createGravityWave(dom.runBtn);
    
    // Simulate execution with delay
    setTimeout(() => {
        try {
            if (!challenge) throw new Error("Challenge not found");
            if (code === challenge.code) {
                throw new Error("You haven't written any code yet! Complete the challenge by filling in the missing parts.");
            }
            
            const output = generateSuccessOutput(language);
            showOutput(output, false);
            createSuccessEffect();
            
            // Move to next challenge
            setTimeout(() => loadNextChallenge(language, difficulty), 1000);
        } catch (error) {
            showOutput(`Error: ${error.message}`, true);
            createErrorEffect();
        }
    }, 1000);
}

function generateSuccessOutput(language) {
    const successMessages = {
        html: "HTML rendered successfully!\n\nValidation passed: All required elements are present.",
        css: "Styles applied successfully!\n\nVisual inspection passed: Elements are styled as expected.",
        javascript: "JavaScript executed successfully!\n\nTest cases passed: All functionality works as expected.",
        react: "React component rendered successfully!\n\nProps and state management working correctly.",
        mongodb: "MongoDB query executed successfully!\n\nOperation completed with expected results."
    };
    
    return successMessages[language] || "Code executed successfully!";
}

function loadNextChallenge(language, difficulty) {
    const nextChallenge = getChallenge(language, difficulty, state.currentChallengeIndex + 1);
    
    if (nextChallenge) {
        state.currentChallengeIndex++;
        dom.problemTitle.textContent = nextChallenge.title;
        dom.problemDescription.textContent = nextChallenge.description;
        dom.codeArea.value = nextChallenge.code;
        resetOutput();
    } else {
        showOutput("Congratulations! You've completed all challenges for this level!", false);
        clearInterval(state.timerInterval);
    }
}

function resetCode() {
    const language = dom.languageSelect.value;
    const difficulty = dom.difficultySelect.value;
    const challenge = getChallenge(language, difficulty, state.currentChallengeIndex);
    
    if (challenge) {
        dom.codeArea.value = challenge.code;
        resetOutput();
        createResetEffect();
    }
}

function showOutput(message, isError) {
    dom.outputContent.textContent = message;
    dom.outputContent.className = isError ? "output-content error" : "output-content";
}

function resetOutput() {
    showOutput("Output will appear here...", false);
}

// Gravity Effects
function createGravitationalCollapse(callback) {
    const panels = [
        document.querySelector('.setup-panel'),
        document.querySelector('.rules-panel')
    ].filter(panel => panel);
    
    let completed = 0;
    
    panels.forEach(panel => {
        animatePanelCollapse(panel, () => {
            completed++;
            if (completed === panels.length && callback) {
                callback();
            }
        });
    });
}

function animatePanelCollapse(panel, callback) {
    const eventHorizon = document.createElement('div');
    const panelRect = panel.getBoundingClientRect();
    const startX = panelRect.left + panelRect.width / 2;
    const startY = panelRect.top + panelRect.height / 2;
    
    eventHorizon.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, var(--event-horizon), var(--blackhole));
        transform-origin: center;
        z-index: 1000;
        left: ${startX}px;
        top: ${startY}px;
        width: 0;
        height: 0;
        opacity: 0;
    `;
    
    document.body.appendChild(eventHorizon);
    
    const duration = 800;
    const startTime = performance.now();
    
    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 0.5) {
            const scale = progress * 2;
            eventHorizon.style.width = `${panelRect.width * scale}px`;
            eventHorizon.style.height = `${panelRect.height * scale}px`;
            eventHorizon.style.left = `${startX - (panelRect.width * scale) / 2}px`;
            eventHorizon.style.top = `${startY - (panelRect.height * scale) / 2}px`;
            eventHorizon.style.opacity = scale;
            
            panel.style.transform = `scale(${1 - scale}) translateZ(0)`;
            panel.style.opacity = 1 - scale;
        } else {
            const moveProgress = (progress - 0.5) * 2;
            const scale = 1 - moveProgress;
            
            eventHorizon.style.width = `${panelRect.width * scale}px`;
            eventHorizon.style.height = `${panelRect.height * scale}px`;
            
            if (Math.random() > 0.7) {
                createParticle(
                    startX + (Math.random() - 0.5) * panelRect.width * scale,
                    startY + (Math.random() - 0.5) * panelRect.height * scale
                );
            }
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            eventHorizon.remove();
            panel.style.display = 'none';
            if (callback) callback();
        }
    }
    
    requestAnimationFrame(animate);
}

// Particle Effects
function createParticle(x, y, options = {}) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = options.size || Math.random() * 5 + 2;
    const color = options.color || `hsl(${Math.random() * 360}, 80%, 60%)`;
    const mass = options.mass || size * 0.1;
    
    particle.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background-color: ${color};
        opacity: ${options.opacity || 0.8};
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particle);
    state.activeParticles.add(particle);
    
    let posX = x;
    let posY = y;
    let velocityX = options.velocityX || (Math.random() - 0.5) * 2;
    let velocityY = options.velocityY || (Math.random() - 0.5) * 2;
    let opacity = options.opacity || 0.8;
    
    function animate() {
        const blackholeRect = dom.blackhole.getBoundingClientRect();
        const blackholeX = blackholeRect.left + blackholeRect.width / 2;
        const blackholeY = blackholeRect.top + blackholeRect.height / 2;
        
        const dx = blackholeX - posX;
        const dy = blackholeY - posY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 10) {
            const force = (BLACKHOLE_MASS * mass * GRAVITY_CONSTANT) / (distance * distance);
            const angle = Math.atan2(dy, dx);
            
            velocityX += Math.cos(angle) * force * 0.1;
            velocityY += Math.sin(angle) * force * 0.1;
        }
        
        posX += velocityX;
        posY += velocityY;
        opacity -= 0.005;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.transform = `rotate(${posX * 0.1}deg) scale(${1 + (velocityX * velocityX + velocityY * velocityY) * 0.1})`;
        
        if (opacity > 0 && distance < MAX_GRAVITY_DISTANCE * 2) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
            state.activeParticles.delete(particle);
        }
    }
    
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, Math.random() * 500);
}

// Gravity Simulation
function initGravitySimulation() {
    let lastMouseMove = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseMove > 16) { // ~60fps
            dom.gravitationalField.style.background = `
                radial-gradient(
                    ellipse at ${e.clientX}px ${e.clientY}px, 
                    rgba(108, 92, 231, 0.2) 0%, 
                    rgba(15, 14, 23, 0.8) 70%
                )`;
            
            applyGravityToElements(e.clientX, e.clientY);
            lastMouseMove = now;
            
            if (Math.random() > 0.97) {
                createParticle(e.clientX, e.clientY);
            }
        }
    });
    
    createGravityWells();
    setInterval(() => applyBlackholeGravity(), 100);
    setInterval(cleanupParticles, 5000);
}

function createGravityWells() {
    document.querySelectorAll('.gravity-well').forEach(well => well.remove());
    
    document.querySelectorAll('.gravity-affected').forEach(el => {
        const rect = el.getBoundingClientRect();
        const well = document.createElement('div');
        well.className = 'gravity-well';
        
        well.style.cssText = `
            position: absolute;
            width: ${rect.width * 1.5}px;
            height: ${rect.height * 1.5}px;
            left: ${rect.left - (rect.width * 0.25) + window.scrollX}px;
            top: ${rect.top - (rect.height * 0.25) + window.scrollY}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(108, 92, 231, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
            transform: translateZ(-50px);
        `;
        
        document.body.appendChild(well);
        el.dataset.gravityWell = well;
    });
}

function applyBlackholeGravity() {
    const blackholeRect = dom.blackhole.getBoundingClientRect();
    const blackholeX = blackholeRect.left + blackholeRect.width / 2;
    const blackholeY = blackholeRect.top + blackholeRect.height / 2;
    
    document.querySelectorAll('.gravity-affected').forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const dx = blackholeX - elX;
        const dy = blackholeY - elY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MAX_GRAVITY_DISTANCE) {
            const force = (BLACKHOLE_MASS * GRAVITY_CONSTANT) / (distance * distance);
            const angle = Math.atan2(dy, dx);
            
            const pullX = Math.cos(angle) * force * 2;
            const pullY = Math.sin(angle) * force * 2;
            const scale = 1 - (force * 0.1);
            
            el.style.transform = `translate(${pullX}px, ${pullY}px) scale(${scale})`;
            
            if (el.dataset.gravityWell) {
                const well = el.dataset.gravityWell;
                well.style.transform = `translate(${pullX}px, ${pullY}px) translateZ(-50px)`;
            }
        } else {
            el.style.transform = '';
            
            if (el.dataset.gravityWell) {
                const well = el.dataset.gravityWell;
                well.style.transform = 'translateZ(-50px)';
            }
        }
    });
}

function applyGravityToElements(mouseX, mouseY) {
    const GRAVITY_STRENGTH = 0.1;
    const MAX_DISTANCE = 300;
    
    document.querySelectorAll('.gravity-affected').forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const dx = mouseX - elX;
        const dy = mouseY - elY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MAX_DISTANCE) {
            const force = GRAVITY_STRENGTH / (distance * 0.1);
            const angle = Math.atan2(dy, dx);
            
            const pullX = Math.cos(angle) * force;
            const pullY = Math.sin(angle) * force;
            const scale = 1 + (force * 0.05);
            
            el.style.transform = `translate(${pullX}px, ${pullY}px) scale(${scale}) translateZ(10px)`;
            
            if (el.dataset.gravityWell) {
                const well = el.dataset.gravityWell;
                well.style.left = `${rect.left - (rect.width * 0.25) + pullX}px`;
                well.style.top = `${rect.top - (rect.height * 0.25) + pullY}px`;
                well.style.transform = `translateZ(${-50 + force * 10}px)`;
            }
        } else if (!el.style.transform.includes('translateZ')) {
            el.style.transform += ' translateZ(0)';
        }
    });
}

function cleanupParticles() {
    state.activeParticles.forEach(particle => {
        if (parseFloat(particle.style.opacity) < 0.1) {
            particle.remove();
            state.activeParticles.delete(particle);
        }
    });
}
function switchChallenge(direction) {
    const lang = dom.languageSelect.value;
    const level = dom.difficultySelect.value;
    const total = challenges[lang][level].length;
    const newIndex = state.currentChallengeIndex + direction;

    if (newIndex >= 0 && newIndex < total) {
        state.currentChallengeIndex = newIndex;
        const challenge = getChallenge(lang, level, newIndex);
        dom.problemTitle.textContent = challenge.title;
        dom.problemDescription.textContent = challenge.description;
        dom.codeArea.value = challenge.code;
        resetOutput();
        updateNavButtons(lang, level);
    }
}

function updateNavButtons(lang, level) {
    const total = challenges[lang][level].length;
    dom.prevBtn.disabled = state.currentChallengeIndex === 0;
    dom.nextBtn.disabled = state.currentChallengeIndex === total - 1;
}

// Initialize the app
init();

