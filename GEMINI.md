# Project: TrowelWebpage

## Project Overview

This project is a personal portfolio website for a plasterer named "미장공 정근수". It is a static website designed to showcase his skills, work portfolio, and contact information. The website is built with pure HTML, CSS, and JavaScript, with no external libraries or frameworks, ensuring it is lightweight and easy to deploy.

The visual design is a modern, dark-themed, single-page layout with smooth scrolling navigation. It includes sections for a hero introduction, the plasterer's strengths, a gallery of project photos, and contact information.

A key feature of this website is the "Rube Calculator," a JavaScript-based widget for calculating the volume of concrete needed for a given area. This tool is also built with vanilla JavaScript and is designed to be easily embeddable in other web pages.

## Building and Running

This is a static website, so there is no build process required.

To run the website, simply open the `index.html` file in a web browser.

## Development Conventions

*   **Styling:** The project uses CSS with a BEM-like naming convention for classes (e.g., `nav__link`, `hero__title`). This helps in maintaining a structured and readable stylesheet.
*   **JavaScript:** The JavaScript code is organized into modules using Immediately Invoked Function Expressions (IIFEs) to encapsulate logic and avoid polluting the global scope. The code is well-commented, explaining the purpose of different functions and features.
*   **HTML:** The HTML is well-structured and uses semantic tags.
*   **Calculator Widget:** The Rube Calculator is designed as a self-contained widget. It can be used as a single file (`rube-calculator-single.html`) or with separate HTML, CSS, and JS files. It supports initialization with URL parameters.

## Key Files

*   `index.html`: The main HTML file for the portfolio website.
*   `styles.css`: The main stylesheet for the portfolio website.
*   `script.js`: The main JavaScript file for the portfolio website, handling animations, smooth scrolling, and other interactive features.
*   `calculator/rube-calculator.js`: The JavaScript file for the Rube Calculator widget.
*   `calculator/rube-calculator.css`: The CSS file for the Rube Calculator widget.
*   `calculator/rube-calculator.html`: The HTML file for the standalone Rube Calculator widget.
*   `calculator/README.md`: Provides detailed instructions on how to use and customize the Rube Calculator widget.
