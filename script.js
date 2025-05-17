document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('category-select');
  const recommendations = document.getElementById('recommendations');
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');

  // Hide recommendations container initially (CSS opacity: 0 is fine, but let's be sure)
  recommendations.style.opacity = '0';
  recommendations.style.transform = 'scale(0.95)';
  recommendations.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

  // Utility: simulate async operation (fetch, process, etc.)
  function simulateLoading(duration = 2000) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  // Animate recommendations in
  function showRecommendations() {
    recommendations.style.opacity = '1';
    recommendations.style.transform = 'scale(1)';
  }

  // Animate recommendations out
  function hideRecommendations() {
    recommendations.style.opacity = '0';
    recommendations.style.transform = 'scale(0.95)';
  }

  // Main event handler for dropdown changes
  select.addEventListener('change', async (e) => {
    // Disable UI while loading
    select.disabled = true;

    // Hide old recommendations gracefully
    hideRecommendations();

    // Remove any previous recommendations content & append spinner
    recommendations.innerHTML = '';
    recommendations.appendChild(spinner);

    // Wait a moment to let spinner show up (feel the vibe)
    await simulateLoading(1500);

    // Remove spinner
    spinner.remove();

    // Build recommendations based on selected value
    const category = select.value;
    const recs = getRecommendations(category);

    // Populate recommendations container with new items
    if (recs && recs.length > 0) {
      const title = document.createElement('h2');
      title.textContent = 'Recommended for You';
      recommendations.appendChild(title);

      const list = document.createElement('ul');
      recs.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      recommendations.appendChild(list);
    } else {
      recommendations.textContent = 'No recommendations available. Please select a category.';
      recommendations.style.opacity = '1';
      recommendations.style.transform = 'scale(1)';
    }

    // Animate fade-in + scale-up of recommendations
    requestAnimationFrame(() => showRecommendations());

    // Re-enable UI
    select.disabled = false;
  });

  // Mock recommendations logic
  function getRecommendations(category) {
    // Corporate speak for a tailored, KPI-driven content curation engine
    const database = {
      tech: [
        'Leverage microservices architecture for scalability.',
        'Implement CI/CD pipelines to enhance deployment agility.',
        'Optimize frontend with React Suspense for smoother UX.',
      ],
      health: [
        'Prioritize holistic wellness for sustainable productivity.',
        'Adopt data-driven fitness tracking for optimal outcomes.',
        'Incorporate mindfulness into daily routines to reduce burnout.',
      ],
      finance: [
        'Utilize blockchain for secure transaction transparency.',
        'Deploy AI models for predictive market analysis.',
        'Streamline budget forecasting with real-time analytics.',
      ]
    };
    return database[category] || [];
  }
});
