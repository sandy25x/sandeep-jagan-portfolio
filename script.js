document.addEventListener('DOMContentLoaded', function () {
    const skills = document.querySelectorAll('.evaluate');

    // Function to handle filling the skill bars
    const fillSkillBars = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.style.getPropertyValue('--point');
                entry.target.style.setProperty('--point', skillLevel);
                entry.target.classList.add('filled');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(fillSkillBars);
    skills.forEach(skill => observer.observe(skill));
});

// Smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight - 20; // Adjusted for better visibility

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing job titles code
const jobElement = document.querySelector('.job');
const jobs = [
    "{WebDeveloper.}",
    "{FrontendDev.}",
    "{EthicalHacker.}",
    "{CDeveloper.}",
    "{PythonDev.}"
];
let currentJobIndex = 0;

function typeJob(job, index = 0) {
    jobElement.innerText = '';
    const typingSpeed = 60;

    function type() {
        if (index < job.length) {
            jobElement.innerText += job.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(() => {
                deleteJob(job);
            }, 1000);
        }
    }

    type();
}

function deleteJob(job, index = job.length) {
    const deletingSpeed = 100;

    function deleteChar() {
        if (index > 0) {
            jobElement.innerText = job.substring(0, index - 1);
            index--;
            setTimeout(deleteChar, deletingSpeed);
        } else {
            currentJobIndex = (currentJobIndex + 1) % jobs.length;
            setTimeout(() => {
                typeJob(jobs[currentJobIndex]);
            }, 500);
        }
    }

    deleteChar();
}

typeJob(jobs[currentJobIndex]);
