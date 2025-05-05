# Atif Zafar - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Frontend Developer specializing in JavaScript, GSAP, and Three.js.

## Features

- Responsive design that works on all screen sizes
- Smooth scrolling navigation
- Animated 3D cube in the hero section using Three.js
- GSAP animations for smooth transitions and effects
- Interactive project cards
- Contact form with validation
- Custom cursor effects
- Scroll progress indicator
- Mobile-friendly navigation menu

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- Three.js for 3D graphics
- GSAP for animations
- Lenis for smooth scrolling

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Open the project in your preferred code editor.

3. Start a local server to view the website. You can use any of these methods:

   - Using Python:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     ```

   - Using Node.js:
     ```bash
     # Install http-server globally
     npm install -g http-server
     
     # Start server
     http-server
     ```

   - Using VS Code's Live Server extension

4. Open your browser and navigate to:
   - If using Python or Node.js: `http://localhost:8000`
   - If using Live Server: The browser should open automatically

## Project Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── cube.js
│   └── animations.js
└── assets/
    └── images/
```

## Customization

1. Update the content in `index.html` with your personal information
2. Modify colors and styles in `css/style.css`
3. Add your project images to the `assets/images` directory
4. Customize animations in `js/animations.js`
5. Modify the 3D cube in `js/cube.js`

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- Lazy loading for images
- Efficient animations using GSAP
- Smooth scrolling with Lenis

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, please reach out through the contact form on the website or email me at tgatifzafar@gmail.com.