document.addEventListener("DOMContentLoaded", () => {
    // Ano automático no rodapé
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Revela cada bloco de conteúdo suavemente conforme entra na tela
    const blocks = document.querySelectorAll(".block");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    blocks.forEach((block) => revealObserver.observe(block));

    // Marca o link ativo na navegação lateral conforme a seção visível
    const navLinks = document.querySelectorAll(".sidebar__nav a");
    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = "#" + entry.target.id;
                const link = document.querySelector(`.sidebar__nav a[href="${id}"]`);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach((l) => l.classList.remove("is-active"));
                    link.classList.add("is-active");
                }
            });
        },
        { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
});
