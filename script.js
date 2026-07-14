(function(){
  'use strict';

  /* ── INITIALIZE LUCIDE ICONS ── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ── FLOATING PARTICLES ── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 15 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      if (Math.random() > 0.5) {
        p.style.background = 'var(--accent-secondary)';
        p.style.boxShadow = '0 0 8px rgba(163, 113, 247, 0.4)';
      } else {
        p.style.background = 'var(--accent-primary)';
        p.style.boxShadow = '0 0 8px rgba(88, 166, 255, 0.4)';
      }
      particleContainer.appendChild(p);
    }
  }


  /* ── PARALLAX MOUSE MOVE ON HERO ── */
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'translate(0, 0)';
      heroContent.style.transition = 'transform 0.5s ease';
      setTimeout(() => { heroContent.style.transition = ''; }, 500);
    });
  }

  /* ── MAGNETIC HOVER ON BUTTONS ── */
  const magneticEls = document.querySelectorAll('.btn, .hero-socials a, .footer-socials a');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { el.style.transition = ''; }, 300);
    });
  });

  /* ── TYPING EFFECT ── */
  const typedEl=document.getElementById('typed-text');
  const roles=['Systems Engineer','Computer Science Engineer','AI/ML Engineer','Flutter Developer'];
  let roleIdx=0,charIdx=0,isDeleting=false;
  function typeLoop(){
    const current=roles[roleIdx];
    typedEl.textContent=isDeleting?current.substring(0,charIdx--):current.substring(0,charIdx++);
    let delay=isDeleting?40:80;
    if(!isDeleting&&charIdx===current.length+1){delay=2000;isDeleting=true;charIdx=current.length}
    else if(isDeleting&&charIdx<0){isDeleting=false;roleIdx=(roleIdx+1)%roles.length;delay=500}
    setTimeout(typeLoop,delay);
  }
  if (typedEl) {
    typeLoop();
  }

  /* ── STATS COUNTER COUNT UP ── */
  const statNumbers = document.querySelectorAll('.stat-number');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1200; // ms
        const increment = target / (duration / 16); // ~60fps
        
        const updateCount = () => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
          } else {
            el.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCount);
          }
        };
        requestAnimationFrame(updateCount);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(num => countObs.observe(num));

  /* ── SCROLL PROGRESS ── */
  const progressBar=document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll',()=>{
      const h=document.documentElement;
      const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
      progressBar.style.width=pct+'%';
      if(pct<30){
        progressBar.style.background='linear-gradient(90deg, #9C2A2A, #0F4C5C)';
      } else if(pct<60){
        progressBar.style.background='linear-gradient(90deg, #0F4C5C, #9C2A2A)';
      } else {
        progressBar.style.background='linear-gradient(90deg, #9C2A2A, #0F4C5C, #9C2A2A)';
      }
    },{passive:true});
  }

  /* ── NAVBAR SCROLL EFFECT ── */
  const navbar=document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll',()=>{
      if(window.scrollY>20){
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    },{passive:true});
  }

  /* ── NAV TOGGLE ── */
  const navToggle=document.getElementById('nav-toggle');
  const navMenu=document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click',()=>{
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link=>{
      link.addEventListener('click',()=>{
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV ── */
  const sections=document.querySelectorAll('section[id]');
  const navLinks=document.querySelectorAll('.nav-link');
  function updateNav(){
    const scrollY=window.scrollY+100;
    sections.forEach(s=>{
      const top=s.offsetTop-s.offsetHeight*0.2;
      const bottom=top+s.offsetHeight;
      const id=s.getAttribute('id');
      if(scrollY>=top&&scrollY<bottom){
        navLinks.forEach(l=>l.classList.remove('active'));
        const active=document.querySelector(`.nav-link[href="#${id}"]`);
        if(active)active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll',updateNav,{passive:true});

  /* ── SCROLL ANIMATIONS & REVEALS ── */
  // Add fade-in dynamically to list/card elements
  const cards = document.querySelectorAll('.glass-card, .skill-card, .project-card, .timeline-item, .stat-card, .repo-card, .about-text, .contact-info, .contact-form');
  cards.forEach(c => c.classList.add('fade-in'));

  // Stagger observer for child elements in grids
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        const children = parent.querySelectorAll('.fade-in');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.08}s`;
          child.classList.add('visible');
        });
      } else {
        const parent = entry.target;
        const children = parent.querySelectorAll('.fade-in');
        children.forEach((child) => {
          child.style.transitionDelay = '0s';
          child.classList.remove('visible');
        });
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  // Observe grid containers for staggered child load
  document.querySelectorAll('.skills-grid, .projects-grid, .timeline, .about-stats, .github-grid, .about-content, .contact-content').forEach(grid => {
    staggerObserver.observe(grid);
  });

  // Individual observer for section headings (so they pop up with bounce)
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      } else {
        e.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  
  document.querySelectorAll('.section-title').forEach(h => headingObserver.observe(h));

  /* ── SKILL BARS (both directions) ── */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-width') + '%';
      } else {
        e.target.style.width = '0%';
      }
    });
  }, { threshold: 0.2 });
  skillFills.forEach(f => skillObs.observe(f));

  /* ── PROJECT FILTERS ── */
  const filterBtns=document.querySelectorAll('.filter-btn');
  const projectCards=document.querySelectorAll('.project-card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter=btn.getAttribute('data-filter');
      projectCards.forEach(card=>{
        if(filter==='all'||card.getAttribute('data-category')===filter){
          card.style.display='flex';
          card.style.animation='fadeUp 0.4s forwards';
        } else {
          card.style.display='none';
        }
      });
    });
  });

  /* ── GITHUB REPOS ── */
  const githubGrid=document.getElementById('github-repos');
  if (githubGrid) {
    fetch('https://api.github.com/users/anjana-h-manoj/repos?sort=updated&per_page=15')
      .then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})
      .then(repos=>{
        const allowedRepos = ['bellovista', 'prolost', 'oceani'];
        const filteredRepos = repos
          .filter(r => allowedRepos.includes(r.name.toLowerCase()))
          .slice(0, 6);
          
        if(!filteredRepos.length){githubGrid.innerHTML='<p style="text-align:center;color:var(--text-secondary);grid-column:1/-1">No public repositories found.</p>';return}
        githubGrid.innerHTML=filteredRepos.map(r=>`
          <a href="${r.html_url}" target="_blank" rel="noopener" class="repo-card glass-card">
            <h3><i data-lucide="folder"></i> ${r.name}</h3>
            <p>${r.description||'No description available.'}</p>
            <div class="repo-meta">
              ${r.language?`<span><i data-lucide="code-2"></i> ${r.language}</span>`:''}
              <span><i data-lucide="star"></i> ${r.stargazers_count}</span>
              <span><i data-lucide="git-fork"></i> ${r.forks_count}</span>
            </div>
          </a>
        `).join('');
        // Re-run Lucide parser to process dynamically injected icons
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      })
      .catch(()=>{
        githubGrid.innerHTML='<p style="text-align:center;color:var(--text-secondary);grid-column:1/-1">Unable to load repositories.</p>';
      });
  }



})();
