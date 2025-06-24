// Constants and Configuration
const CONFIG = {
  baseUrl: 'http://localhost:5000',
  defaultTimeout: 5000
};

// Utility Functions
class FormUtils {
  static validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, select, textarea');
    inputs.forEach(field => {
      field.disabled = false;
      field.style.pointerEvents = 'auto';
      field.style.opacity = '1';
    });
    return true;
  }

  static async submitForm(formData, endpoint) {
    try {
      const response = await fetch(`${CONFIG.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      return await response.json();
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  }
}

// Navigation Handlers
class NavigationHandler {
  static initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        link.style.textDecoration = 'underline';
      });
      link.addEventListener('mouseout', () => {
        link.style.textDecoration = 'none';
      });
    });
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  NavigationHandler.initializeNavigation();
  console.log('Page initialized successfully');
});

// Export functions for use in other files
window.FormUtils = FormUtils;
window.NavigationHandler = NavigationHandler;
