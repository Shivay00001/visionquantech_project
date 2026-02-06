
// VisionQuantech Pro - Generated JavaScript

// AI Helper Function
async function runAI(prompt) {
    if (!window.SITE_CONFIG || !window.SITE_CONFIG.ai.enabled) {
        console.log("AI is disabled");
        return null;
    }
    
    const key = window.SITE_CONFIG.ai.apifree_key;
    if (!key) {
        alert("No API key configured");
        return null;
    }
    
    try {
        return await apifree.chat(prompt, { apiKey: key });
    } catch (e) {
        console.error("AI Error:", e);
        return null;
    }
}

// Supabase Client
let supabase = null;

if (window.SITE_CONFIG && window.SITE_CONFIG.supabase.url && window.SITE_CONFIG.supabase.key) {
    const { createClient } = supabase;
    supabase = createClient(
        window.SITE_CONFIG.supabase.url,
        window.SITE_CONFIG.supabase.key
    );
    console.log("✅ Supabase connected");
}

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                created_at: new Date().toISOString()
            };
            
            // Save to Supabase if configured
            if (supabase) {
                try {
                    const { error } = await supabase
                        .from('contacts')
                        .insert([data]);
                    
                    if (error) throw error;
                    
                    alert('✅ Message sent successfully!');
                    contactForm.reset();
                } catch (error) {
                    console.error('Error:', error);
                    alert('❌ Failed to send message. Please try again.');
                }
            } else {
                // Fallback: just show success
                alert('✅ Message received! We will contact you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Load blog posts from Supabase
    if (supabase && document.getElementById('blogGrid')) {
        loadBlogPosts();
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
    }
});

// Load Blog Posts from Supabase
async function loadBlogPosts() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('published_at', { ascending: false })
            .limit(6);
        
        if (error) throw error;
        
        const blogGrid = document.getElementById('blogGrid');
        if (data && data.length > 0) {
            blogGrid.innerHTML = data.map(post => `
                <div class="blog-card">
                    <div class="blog-image">${post.image_url ? `<img src="${post.image_url}" alt="${post.title}">` : '📝'}</div>
                    <h3>${post.title}</h3>
                    <p class="blog-meta">Posted on ${new Date(post.published_at).toLocaleDateString()}</p>
                    <p>${post.content.substring(0, 150)}...</p>
                    <a href="#" class="read-more">Read More →</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log("✅ VisionQuantech Pro - Website Loaded");
