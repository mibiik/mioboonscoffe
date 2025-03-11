import axios from 'axios';

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'Ek_6iCJ0y2c7EkV-RtBWEQwnZVIGJE3yj2RB0RfLQQk';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

// Function to fetch image from Unsplash
async function fetchImageFromUnsplash(query) {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: `${query} food photography`,
        client_id: UNSPLASH_ACCESS_KEY,
        per_page: 1,
        orientation: 'square',
        content_filter: 'high'
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

// Function to download and save image
async function downloadAndSaveImage(imageUrl, category, itemName) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const fileName = `${category}-${itemName.toLowerCase().replace(/ /g, '-')}.jpg`;
    const filePath = `src/assets/menu/${category}/${fileName}`;
    
    // Save the image file
    // Note: In a real implementation, you'd use fs.writeFile here
    // For now, we'll just return the URL
    return imageUrl;
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
}

// Function to process menu items and fetch images
export async function updateMenuImages(menuItems) {
  for (const category in menuItems) {
    for (const item of menuItems[category]) {
      if (!item.image || item.image.includes('placeholder')) {
        const searchQuery = `${item.name} food`;
        const imageUrl = await fetchImageFromUnsplash(searchQuery);
        
        if (imageUrl) {
          const savedImagePath = await downloadAndSaveImage(imageUrl, category, item.name);
          if (savedImagePath) {
            item.image = savedImagePath;
          }
        }
      }
    }
  }
  return menuItems;
}