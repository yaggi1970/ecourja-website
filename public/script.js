document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileMenuBtn && mainNav) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    if (overlay) {
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            if (mobileMenuBtn && mainNav) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                // Close all dropdowns
                const dropdowns = document.querySelectorAll('.dropdown');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Scroll Animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Stats Counter Animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!stat.classList.contains('animate') && stat.getBoundingClientRect().top < window.innerHeight - 100) {
                stat.classList.add('animate');
                let current = 0;
                const increment = target / 50; // Adjust speed here
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };
                updateCounter();
            }
        });
    };

    window.addEventListener('scroll', animateStats);

    // Solar Calculator
    const calculateSolar = () => {
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
        const sunlightHours = parseFloat(document.getElementById('sunlightHours').value) || 0;
        const resultsDiv = document.getElementById('solarResults');
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';

        if (monthlyBill <= 0 || sunlightHours <= 0) {
            alert('Please enter valid values for both fields');
            return;
        }

        // Show loading spinner
        document.getElementById('calculateSolarBtn').appendChild(loadingSpinner);
        resultsDiv.style.opacity = '0';

        // Simulate calculation delay
        setTimeout(() => {
            const annualBill = monthlyBill * 12;
            const solarSavings = annualBill * 0.7;
            const carbonReduction = (annualBill * 0.85) / 12;
            const installationCost = monthlyBill * 24;
            const roi = installationCost / solarSavings;

            // Update results
            document.getElementById('annualSavings').textContent = '₹' + solarSavings.toFixed(2);
            document.getElementById('carbonReduction').textContent = carbonReduction.toFixed(2);
            document.getElementById('roi').textContent = roi.toFixed(1);

            // Show results with animation
            resultsDiv.style.opacity = '1';
            resultsDiv.classList.add('show');

            // Remove loading spinner
            loadingSpinner.remove();
        }, 1000);
    };

    // Wind Calculator
    const calculateWind = () => {
        const windSpeed = parseFloat(document.getElementById('avgWindSpeed').value) || 0;
        const propertySize = parseFloat(document.getElementById('propertySize').value) || 0;
        const resultsDiv = document.getElementById('windResults');
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';

        if (windSpeed <= 0 || propertySize <= 0) {
            alert('Please enter valid values for both fields');
            return;
        }

        // Show loading spinner
        document.getElementById('calculateWindBtn').appendChild(loadingSpinner);
        resultsDiv.style.opacity = '0';

        // Simulate calculation delay
        setTimeout(() => {
            const turbineEfficiency = 0.35;
            const airDensity = 1.225;
            const turbineHeight = 20;
            const rotorDiameter = Math.min(Math.sqrt(propertySize), 10);
            const rotorArea = Math.PI * Math.pow(rotorDiameter / 2, 2);
            const windSpeedMS = windSpeed / 3.6;
            const annualEnergy = (0.5 * airDensity * rotorArea * Math.pow(windSpeedMS, 3) * turbineEfficiency * 8760) / 1000;
            const pricePerKWh = 8;
            const annualSavings = annualEnergy * pricePerKWh;
            const installationCost = 500000 + (100000 * rotorDiameter);
            const paybackPeriod = installationCost / annualSavings;

            // Update results
            document.getElementById('windEnergy').textContent = annualEnergy.toFixed(0);
            document.getElementById('windSavings').textContent = '₹' + annualSavings.toFixed(0);
            document.getElementById('windRoi').textContent = paybackPeriod.toFixed(1);

            // Show results with animation
            resultsDiv.style.opacity = '1';
            resultsDiv.classList.add('show');

            // Remove loading spinner
            loadingSpinner.remove();
        }, 1000);
    };

    // Add event listeners for calculator buttons
    const solarBtn = document.getElementById('calculateSolarBtn');
    const windBtn = document.getElementById('calculateWindBtn');
    if (solarBtn) {
        console.log('Solar calculator button found');
        solarBtn.addEventListener('click', calculateSolar);
    }
    if (windBtn) {
        console.log('Wind calculator button found');
        windBtn.addEventListener('click', calculateWind);
    }

    // Add scroll animations to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    // Add number animations to stats
    document.querySelectorAll('.stat-value').forEach(stat => {
        const value = stat.textContent;
        stat.innerHTML = `<span class="stat-number" data-target="${value}">0</span>`;
    });

    // Mobile menu handling
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.querySelector('.dropdown-content').style.display = 'none';
                    }
                });
                const content = dropdown.querySelector('.dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) {
                    content.style.display = 'none';
                }
            });
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate services on scroll
    const services = document.querySelectorAll('.service');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    services.forEach(service => {
        service.style.opacity = '0';
        service.style.transform = 'translateY(20px)';
        service.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(service);
    });

    // Add active state to navigation links
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                // Reset mobile menu
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                // Reset dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });
});
