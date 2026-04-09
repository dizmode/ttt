// Handle contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show confirmation (replace with actual email backend later)
    alert(`Thank you, ${name}!\n\nWe received your message and will get back to you at ${email} soon.`);
    
    // Clear form
    this.reset();
});
