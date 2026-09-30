/**
 * FATMA REDA - PORTFOLIO INTERACTIVITY
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initActiveNavOnScroll();
  initSkillsFilter();
  initProjectModals();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Dark / Light Theme Toggle with LocalStorage Persistence
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu Toggle & Auto-Close
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  function toggleMenu(isOpen) {
    const currentState = menuToggle.classList.contains('is-active');
    const newState = typeof isOpen === 'boolean' ? isOpen : !currentState;

    menuToggle.classList.toggle('is-active', newState);
    navMenu.classList.toggle('is-open', newState);
    menuToggle.setAttribute('aria-expanded', String(newState));
  }

  menuToggle.addEventListener('click', () => toggleMenu());

  // Close menu when clicking on any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Nav Link on Scroll via IntersectionObserver
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Skills Filter Tabs
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Details Modal (Truthful Academic Documentation)
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  biometric: {
    badge: "Computer Vision & Systems Integration",
    title: "Biometric Attendance System",
    description: "An automated attendance tracking platform conceived and engineered to eliminate the manual overhead and inaccuracies of paper-based roll calls.",
    architecture: [
      "Image Capture & Video Stream: Accesses web/camera video feed in real-time.",
      "Facial Feature Extraction: Employs computer vision algorithms (OpenCV / face recognition) to detect facial boundaries and extract identity encodings.",
      "Database Verification & Logging: Checks encodings against enrolled student records in an SQLite relational database and automatically records time-stamped attendance logs.",
      "Duplicate Prevention: Prevents multiple registrations within the same class session through session timestamp checks."
    ],
    roleLeadership: [
      "Served as Student Team Lead: Coordinated division of responsibilities across vision algorithms, database schema, and interface design.",
      "Led integration testing: Resolved compatibility hurdles between video processing frames and database insertion queries.",
      "Enforced modular code organization with version control practices."
    ],
    techStack: ["Python", "OpenCV", "Face Recognition Libraries", "SQLite", "Relational Database Design"]
  },
  sentiment: {
    badge: "Deep Learning & Natural Language Processing",
    title: "The Neural Sentiment Classifier",
    description: "A deep learning NLP model built to analyze and classify text sentiment, translating unstructured customer review data into clear polarities.",
    architecture: [
      "Data Cleansing & Preprocessing: Lowercasing, punctuation stripping, stopword elimination, and tokenization using NLTK and Python string workflows.",
      "Sequence Padding & Vocabulary Indexing: Translates variable-length text strings into uniform numerical arrays for neural network consumption.",
      "Embedding & Dense Layers: Utilizes an embedding layer to learn word representations followed by hidden dense/recurrent layers and classification output.",
      "Loss & Optimization: Compiled with binary/categorical cross-entropy and evaluated across train, validation, and test splits."
    ],
    roleLeadership: [
      "Built complete end-to-end Python pipeline from raw text ingestion to inference predictions.",
      "Analyzed confusion matrices and loss curves to prevent overfitting.",
      "Documented preprocessing steps clearly for reproducible evaluation."
    ],
    techStack: ["Python", "TensorFlow / Keras", "NLTK", "Pandas", "Scikit-learn", "Matplotlib"]
  },
  sports: {
    badge: "Data Engineering & Analytics Pipeline",
    title: "Sports Data Engineering Project",
    description: "A structured data engineering project designed to ingest, clean, standardize, and store raw athletic statistics into an organized relational schema for efficient analytical queries.",
    architecture: [
      "Data Ingestion & Extraction: Extracted multi-table athletic datasets containing player stats, match events, and team standings.",
      "Data Cleaning & Imputation: Built Python automated scripts using Pandas to normalize column names, cast data types, remove duplicates, and handle missing attributes.",
      "Relational Schema Design: Designed 3rd-normal-form relational tables with clear primary and foreign key constraints.",
      "Analytical SQL Queries: Crafted optimized SQL queries utilizing aggregations, window operations, and multi-table joins to compute key performance indicators."
    ],
    roleLeadership: [
      "Modeled relational database entity-relationship diagrams (ERDs).",
      "Created reproducible transformation scripts handling edge cases in data formats.",
      "Wrote analytical queries to demonstrate practical insights from structured data."
    ],
    techStack: ["Python", "SQL (PostgreSQL / SQLite)", "Pandas", "NumPy", "ETL Principles", "Data Modeling"]
  },
  titanic: {
    badge: "Machine Learning & Predictive Modeling",
    title: "Titanic Machine Learning Project",
    description: "An end-to-end machine learning project analyzing passenger demographic and socio-economic variables to predict survival patterns on the Titanic dataset.",
    architecture: [
      "Exploratory Data Analysis (EDA): Visualized distributions, survival correlations with class, gender, age, and fare using Seaborn and Matplotlib.",
      "Feature Engineering: Extracted honorary titles from passenger names, binned continuous fares, and grouped family sizes.",
      "Missing Data Strategy: Imputed missing ages based on title groupings and filled missing embarked locations using mode frequency.",
      "Model Training & Validation: Trained Scikit-learn classifiers (Logistic Regression, Random Forest), applied k-fold cross-validation, and compared precision, recall, and ROC-AUC metrics."
    ],
    roleLeadership: [
      "Strict avoidance of data leakage by ensuring preprocessing parameters were fitted solely on training splits.",
      "Interpreted feature importance rankings to understand key drivers of predictive accuracy.",
      "Thorough documentation of algorithmic decisions in clean Jupyter notebooks."
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Cross-Validation"]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  if (!modalOverlay || !modalBody || !modalCloseBtn) return;

  function openModal(projectKey) {
    const data = PROJECT_DETAILS[projectKey];
    if (!data) return;

    modalBody.innerHTML = `
      <span class="modal-project-badge">${escapeHtml(data.badge)}</span>
      <h3 class="modal-title" id="modalTitle">${escapeHtml(data.title)}</h3>
      <p class="modal-text">${escapeHtml(data.description)}</p>

      <h4 class="modal-section-title">System Architecture & Pipeline</h4>
      <ul class="modal-list">
        ${data.architecture.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Key Contributions & Learnings</h4>
      <ul class="modal-list">
        ${data.roleLeadership.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="modal-tech-list">
        ${data.techStack.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    `;

    modalOverlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeModal() {
    modalOverlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Client-Side Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(field, isValid) {
    const parent = field.closest('.form-group');
    if (!parent) return;
    if (isValid) {
      parent.classList.remove('has-error');
    } else {
      parent.classList.add('has-error');
    }
  }

  // Real-time input clearing
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      setFieldError(input, true);
      feedback.className = 'form-feedback';
      feedback.textContent = '';
      feedback.style.display = 'none';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setFieldError(nameInput, false);
      isValid = false;
    } else {
      setFieldError(nameInput, true);
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      setFieldError(emailInput, false);
      isValid = false;
    } else {
      setFieldError(emailInput, true);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setFieldError(subjectInput, false);
      isValid = false;
    } else {
      setFieldError(subjectInput, true);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFieldError(messageInput, false);
      isValid = false;
    } else {
      setFieldError(messageInput, true);
    }

    if (!isValid) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill out all required fields correctly before submitting.';
      feedback.style.display = 'block';
      return;
    }

    // Simulate sending state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Message...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you for reaching out! You can also email me directly at fatma.reda7841@gmail.com or connect on LinkedIn and GitHub.';
      feedback.style.display = 'block';

      form.reset();
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   7. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Helper to safely escape HTML */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
