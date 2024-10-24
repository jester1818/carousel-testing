
// NA SELECTEREN ZIJN DE BOVENSTE 2 FOTO'S IN MOBILE FORMAT NIET MEER HETZELFDE FORMAT, 

document.addEventListener("DOMContentLoaded", function() {

// Select necessary elements
const galleryContainer = document.querySelector('.gallery-container');
const fadeDuration = 700;
const paginationControls = document.querySelector('.pagination-controls');
let isZoomedIn = false; // Tracks if an image is zoomed in


// Function to show the correct items, and switch between the pages

// All the images in Array (do in json file / server for real project)
const images = [
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-2.JPG', text : "A frozen lake reflecting the winter sky."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."},
    {src : 'images/Winter-1.JPG', text : "A beautiful winter scene with snow-covered trees."},
    {src : 'images/Winter-3.JPG', text : "Snowfall in the mountains during sunset."}  
];

// Determine the total amount of images and the total amount of sets
// let numberOfImages = images.length;
let imagesPerPage;

// Calculate the amount of items per page
function calculateImagesPerPage() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 992) {
        // Desktop: 4 columns x 2 rows = 8 images per page
        imagesPerPage = 4 * 2;
    } else if (screenWidth >= 600) {
        // Tablet: 3 columns x 3 rows = 9 images per page
        imagesPerPage = 3 * 3;
    } else {
        // Mobile: 2 columns x 3 rows = 3 images per page
        imagesPerPage = 2 * 3;
    }
}

// Pagination state 
let currentPage = 1;
let totalPages = 1;

function displayImages(direction) {
    if (isZoomedIn) return;

    galleryContainer.innerHTML = ''; // Clear existing images

    // Calculate the total pages
    totalPages = Math.ceil(images.length / imagesPerPage);

    // Ensure currentPage is within bounds
    if (currentPage > totalPages) {
    currentPage = totalPages;
    }

    // Calculate the index range
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;

    // get the images for the current page
    const imagesToDisplay = images.slice(startIndex, endIndex);

    // Create image elements and append childs
    imagesToDisplay.forEach(imageObj => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = imageObj.src;
        img.alt = imageObj.text;
        img.loading = 'lazy'; // Enable lazy loading

        // Create a text element but keep it hidden initially
        const textElement = document.createElement('p');
        textElement.classList.add('image-text');
        textElement.textContent = imageObj.text;

        imageItem.appendChild(img);
        imageItem.appendChild(textElement);

        // Add animation class based on direction
        if (direction === 'next') {
        imageItem.classList.add('fade-in-right');
        setTimeout(() => {
            imageItem.classList.remove('fade-in-right');
        }, fadeDuration);
        } else if (direction === 'prev') {
        imageItem.classList.add('fade-in-left');
        setTimeout(() => {
            imageItem.classList.remove('fade-in-left');
        }, fadeDuration);
        } else {
        // Default or initial load
        imageItem.style.opacity = '1'; // Ensure images are visible
        }

        galleryContainer.appendChild(imageItem);
    });

    // After appending new images, attach event listeners
    attachImageClickListeners();

    // Disable & enable buttons
    document.getElementById('prev-button').disabled = currentPage === 1 || isZoomedIn;
    document.getElementById('next-button').disabled = currentPage === totalPages || isZoomedIn;

    generatePaginationDots();
}

// Event listeners for the navigation 
document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayImages('prev');
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayImages('next');
    } 
});


function generatePaginationDots() {
    const dotsContainer = document.getElementById('pagination-dots');
    dotsContainer.innerHTML = ''; // Clear existing dots

    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        if (i === currentPage) {
            dot.classList.add('active');
        }

        // Add click event listener to each dot
        dot.addEventListener('click', () => {
            if (isZoomedIn) return;

            if (i === currentPage) return;

            let direction = '';
            if (i > currentPage) {
                direction = 'next';
            } else if (i < currentPage) {
                direction = 'prev';
            }
                   
            currentPage = i;
            displayImages(direction);
        });

        dotsContainer.appendChild(dot);
    }
}


// Recalculate images per page and display images on window resize
window.addEventListener('resize', () => {
    if (isZoomedIn) return;
    calculateImagesPerPage();
    displayImages();
});

document.addEventListener('keydown', function(event) {
if (isZoomedIn) return;
    
    if (event.key === 'ArrowLeft') {
        if (currentPage > 1) {
            currentPage--;
            displayImages('prev');
        }
    } else if (event.key === 'ArrowRight') {
        if (currentPage < totalPages) {
            currentPage++;
            displayImages('next');
        }
    }
});

// Variables to store touch positions
let touchStartX = 0;
let touchEndX = 0;

galleryContainer.addEventListener('touchstart', handleTouchStart, false);
galleryContainer.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}

function handleGesture() {
    const swipeThreshold = 50; // Minimum distance for a swipe

    if (isZoomedIn) return;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left (next page)
        if (currentPage < totalPages) {
            currentPage++;
            displayImages('next');
        }
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right (previous page)
        if (currentPage > 1) {
            currentPage--;
            displayImages('prev');
        }
    }
}

// Initial setup
calculateImagesPerPage();
displayImages();


// Function to reset the gallery to its original state
function resetGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(imageItem => {
        const galleryImg = imageItem.querySelector('img');
        const textElement = imageItem.querySelector('.image-text');
        
        // Fade out the zoomed-in image
        imageItem.classList.add('fade-out');

        // Fade in the full gallery
        setTimeout(() => {
            imageItem.classList.remove('hidden', 'selected', 'fade-out', 'fade-in-left', 'fade-in-right', 'fade-in');
            imageItem.classList.add('fade-in');   
        }, fadeDuration);

        // Cancel all the fade-in animations
        setTimeout(() => {
            imageItem.classList.remove('fade-in');
        }, fadeDuration*2); 
    });

    closeButton.classList.add('fade-out');

    // After fade-out return the grid to normal and fade-in all non-images
    setTimeout(() => { 
        galleryContainer.style.gridTemplateColumns = '';
        galleryContainer.style.maxWidth = '';
        paginationControls.classList.add('fade-in'); 
        closeButton.classList.add('hidden');    
    }, fadeDuration);

    setTimeout(() => {
        paginationControls.classList.remove('fade-in');
        paginationControls.style.opacity = '1';
        closeButton.classList.remove('fade-out');
    }, fadeDuration*2);

    isZoomedIn = false;
  
}

function attachImageClickListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(imageItem => {
        imageItem.addEventListener('click', function() {
            
            // Prevent clicking on a selected image
            if (imageItem.classList.contains('selected')) {
                return; // Exit the function if the image is already selected
            }

            // Set state to zoomed-in
            isZoomedIn = true;

            // Hide all except for the selected one
            galleryItems.forEach(otherItem => {
            const galleryImg = otherItem.querySelector('img');
            const textElement = otherItem.querySelector('.image-text')

            otherItem.classList.add('fade-out');
            paginationControls.classList.add('fade-out');

                if (otherItem !== imageItem) {
                    setTimeout(() => {
                        otherItem.classList.add('hidden');
                    }, fadeDuration); // Match fade duration
                } else {
                    setTimeout(() => {
                        otherItem.classList.add('fade-in')
                        otherItem.classList.add('selected');
                        // galleryImg.style.objectFit = 'contain'; 
                        // galleryImg.style.cursor = 'default';

                    }, fadeDuration); // Match fade duration       
                }
            });

            setTimeout(() => {

            // Change the grid to only show the selected image
            galleryContainer.style.gridTemplateColumns = '1fr'; // Full width
            galleryContainer.style.gridTemplateRows = '1fr';    // Full height

            paginationControls.style.opacity = 0;            
            paginationControls.classList.remove('fade-out');
            imageItem.classList.remove('fade-out');

            // Show the close button
            closeButton.classList.remove('hidden');
            }, fadeDuration);
              
        });
    });
}

// Add event listener to the close button to reset the gallery
const closeButton = document.querySelector('.gallery-close-btn');
closeButton.addEventListener('click', resetGallery);

// Add event listener for the esc button to reset
document.addEventListener('keydown', function(event) {
     if (event.key === 'Escape' || event.key === 'Esc') {
        if (!closeButton.classList.contains('hidden')) {
            resetGallery();
        }
     }
});

});

