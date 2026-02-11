/**
 * Formation IA Responsable - JavaScript
 * Interactions et fonctionnalités du site
 */

(function() {
    'use strict';

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    const header = document.querySelector('.site-header');
    const progressBar = document.getElementById('progressBar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const analyseResponseButton = document.getElementById("analyseResponseButton")
    const analyseAnwsers = document.querySelector('.analysis-grid');
    // ==========================================================================
    // Progress Bar
    // ==========================================================================
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    function toggleMobileMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Toggle hamburger animation
        const hamburger = mobileMenuToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.style.backgroundColor = isExpanded ? '' : 'transparent';
        }
    }

    function closeMobileMenu() {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
    }

    // ==========================================================================
    // Back to Top Button
    // ==========================================================================
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ==========================================================================
    // Active Navigation Link
    // ==========================================================================
    function updateActiveNavLink() {
        const scrollY = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================
    function handleAnchorClick(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        }
    }

    // ==========================================================================
    // Header Scroll Effect
    // ==========================================================================
    let lastScrollY = 0;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    }

    // ==========================================================================
    // Intersection Observer for Animations
    // ==========================================================================
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animatableElements = document.querySelectorAll(
            '.content-block, .sommaire-card, .feature-card, .stat-card, ' +
            '.step-card, .model-card, .technique-card, .timeline-item'
        );

        animatableElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    // ==========================================================================
    // Keyboard Navigation
    // ==========================================================================
    function handleKeyboardNav(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileMenuToggle.focus();
        }
    }

    // ==========================================================================
    // Table of Contents Generation (for accessibility)
    // ==========================================================================
    function generateTableOfContents() {
        const toc = document.getElementById('toc');
        if (!toc) return;

        const headings = document.querySelectorAll('main h2, main h3');
        const tocList = document.createElement('ul');

        headings.forEach((heading, index) => {
            // Ensure heading has an ID
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        toc.appendChild(tocList);
    }

    // ==========================================================================
    // Print Functionality
    // ==========================================================================
    function setupPrintButton() {
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }

    // ==========================================================================
    // Copy Link to Section
    // ==========================================================================
    function setupCopyLinks() {
        const headings = document.querySelectorAll('h2[id], h3[id]');

        headings.forEach(heading => {
            heading.style.cursor = 'pointer';
            heading.title = 'Cliquez pour copier le lien vers cette section';

            heading.addEventListener('click', async () => {
                const url = window.location.origin + window.location.pathname + '#' + heading.id;

                try {
                    await navigator.clipboard.writeText(url);
                    showNotification('Lien copié !');
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('Lien copié !');
                }
            });
        });
    }

    // ==========================================================================
    // Notification Toast
    // ==========================================================================
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification-toast');
        if (existing) {
            existing.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #2d6a4f;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease forwards;
        `;

        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }

        .animate-ready {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-menu a.active {
            color: #2d6a4f;
            background-color: rgba(45, 106, 79, 0.1);
        }

        .site-header.scrolled {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);

    // ==========================================================================
    // Throttle Function
    // ==========================================================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================================================
    // Event Listeners
    // ==========================================================================
    function initEventListeners() {
        // Scroll events (throttled)
        const throttledScroll = throttle(() => {
            updateProgressBar();
            toggleBackToTop();
            updateActiveNavLink();
            handleHeaderScroll();
        }, 100);

        window.addEventListener('scroll', throttledScroll);

        // Mobile menu
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Back to top
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        // Anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleAnchorClick);
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        // Handle resize
        window.addEventListener('resize', throttle(() => {
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }, 200));

        analyseResponseButton.addEventListener('click', (e)=>{
            console.log("J'affiches les réponses !")
            console.log(analyseAnwsers)
            analyseAnwsers.classList.add('active');
        })
    }

    // ==========================================================================
    // Interactive Decision Trees (Gamification)
    // ==========================================================================
    function initDecisionTrees() {
        const trees = document.querySelectorAll('.decision-tree-interactive');

        trees.forEach(tree => {
            const treeId = tree.id;
            const buttons = tree.querySelectorAll('.decision-btn');
            const resetBtn = tree.querySelector('.reset-btn');
            const progressSteps = tree.querySelectorAll('.progress-step');

            buttons.forEach(button => {
                button.addEventListener('click', () => handleDecisionClick(button, tree, progressSteps));
            });

            if (resetBtn) {
                resetBtn.addEventListener('click', () => resetDecisionTree(tree, progressSteps));
            }
        });
    }

    function handleDecisionClick(button, tree, progressSteps) {
        const node = button.closest('.decision-node-interactive');
        const nextTarget = button.dataset.next;
        const answer = button.dataset.answer;

        // Mark button as selected
        const allButtons = node.querySelectorAll('.decision-btn');
        allButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        // Disable buttons in current node
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'default';
        });

        // Check if it's a result or next step
        if (nextTarget.startsWith('result-')) {
            // Show result
            const resultElement = tree.querySelector('#' + nextTarget);
            if (resultElement) {
                resultElement.classList.remove('hidden');

                // Add confetti effect for positive result
                if (resultElement.querySelector('.result-card.positive')) {
                    createConfetti(resultElement);
                }
            }

            // Mark current step as completed
            const currentStep = parseInt(node.dataset.step);
            updateProgressSteps(progressSteps, currentStep, true);

            // Show reset button
            const resetBtn = tree.querySelector('.reset-btn');
            if (resetBtn) {
                resetBtn.classList.remove('hidden');
            }

            // Mark node as completed
            node.classList.remove('active');
            node.classList.add('completed-no-opacity');

        } else {
            // Go to next step
            const currentStep = parseInt(node.dataset.step);
            const nextStep = parseInt(nextTarget);

            // Update progress
            updateProgressSteps(progressSteps, currentStep, false);

            // Mark current node as completed
            node.classList.add('completed');
            node.classList.remove('active');

            // Show next node with animation
            setTimeout(() => {
                const nextNode = tree.querySelector(`[data-step="${nextStep}"]`);
                if (nextNode) {
                    nextNode.classList.remove('hidden');
                    nextNode.classList.add('active');

                    // Update progress step
                    progressSteps.forEach(step => {
                        if (parseInt(step.dataset.step) === nextStep) {
                            step.classList.add('active');
                        }
                    });

                    // Scroll to next node
                    nextNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        }
    }

    function updateProgressSteps(progressSteps, step, isFinal) {
        progressSteps.forEach(progressStep => {
            const stepNum = parseInt(progressStep.dataset.step);
            if (stepNum < step) {
                progressStep.classList.add('completed');
                progressStep.classList.remove('active');
            } else if (stepNum === step) {
                if (isFinal) {
                    progressStep.classList.add('completed');
                }
                progressStep.classList.remove('active');
            }
        });
    }

    function resetDecisionTree(tree, progressSteps) {
        // Reset all nodes
        const nodes = tree.querySelectorAll('.decision-node-interactive');
        nodes.forEach((node, index) => {
            node.classList.remove('completed', 'active', 'hidden', "completed-no-opacity");
            if (index === 0) {
                node.classList.add('active');
            } else {
                node.classList.add('hidden');
            }

            // Reset buttons
            const buttons = node.querySelectorAll('.decision-btn');
            buttons.forEach(btn => {
                btn.classList.remove('selected');
                btn.disabled = false;
                btn.style.cursor = 'pointer';
            });
        });

        // Reset results
        const results = tree.querySelectorAll('.decision-result');
        results.forEach(result => result.classList.add('hidden'));

        // Reset progress
        progressSteps.forEach((step, index) => {
            step.classList.remove('completed', 'active');
            if (index === 0) {
                step.classList.add('active');
            }
        });

        // Hide reset button
        const resetBtn = tree.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.classList.add('hidden');
        }

        // Scroll to top of tree
        tree.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function createConfetti(container) {
        const colors = ['#2d6a4f', '#40916c', '#74c69d', '#52b788', '#95d5b2'];
        const confettiCount = 30;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: 50%;
                opacity: 0;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
            `;
            container.style.position = 'relative';
            container.style.overflow = 'hidden';
            container.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    // Add confetti animation keyframes
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) rotate(720deg);
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ==========================================================================
    // Initialize
    // ==========================================================================
    function init() {
        // Initial state
        updateProgressBar();
        toggleBackToTop();
        updateActiveNavLink();

        // Setup features
        initEventListeners();
        setupIntersectionObserver();
        generateTableOfContents();
        setupPrintButton();
        setupCopyLinks();
        initDecisionTrees();

        // Log initialization
        console.log('Formation IA Responsable - Site initialisé');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
