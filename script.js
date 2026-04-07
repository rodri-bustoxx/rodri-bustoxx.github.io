// ---- PESTAÑAS CV ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active-tab'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tab)?.classList.add('active-tab');
    btn.classList.add('active');
  });
});

// ---- MODAL RECTORADO ----
const rectorModal = document.getElementById('rectorModal');
document.getElementById('openRectorModalBtn')?.addEventListener('click', () => rectorModal.classList.add('active'));
document.getElementById('closeModalBtn')?.addEventListener('click', () => rectorModal.classList.remove('active'));

// ---- MODAL CV ----
const cvModal = document.getElementById('cvModal');
document.getElementById('openCvModalBtn')?.addEventListener('click', () => cvModal.classList.add('active'));
document.getElementById('closeCvModalBtn')?.addEventListener('click', () => cvModal.classList.remove('active'));

// ---- CERRAR MODALES AL CLICK EN OVERLAY ----
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = 'auto';
  }
});

// ---- COPYABLE ----
document.querySelectorAll('.copyable').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.getAttribute('data-copy'));
    const toast = document.getElementById('toast-message');
    if (toast) { toast.style.opacity = '1'; setTimeout(() => toast.style.opacity = '0', 2000); }
  });
});

// ========== VISOR PDF SIMPLE CON IFRAME ==========
const pdfModal = document.getElementById('pdfModal');
const pdfIframe = document.getElementById('pdfIframe');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfDownloadLink = document.getElementById('pdfDownloadLink');
const closePdfModalBtn = document.getElementById('closePdfModalBtn');
const closePdfModalBtn2 = document.getElementById('closePdfModalBtn2');

function verPDF(rutaPDF, titulo) {
    if (!pdfModal) return;
    pdfModalTitle.innerHTML = `<i class="fas fa-file-pdf"></i> ${titulo}`;
    pdfIframe.src = rutaPDF;
    pdfDownloadLink.href = rutaPDF;
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function verPDFSpread(rutaPDF, titulo) { verPDF(rutaPDF, titulo); }

function cerrarPdfModal() {
    pdfModal.classList.remove('active');
    setTimeout(() => { pdfIframe.src = ''; }, 300);
    document.body.style.overflow = '';
}


// ====================
// FUNCIÓN COPIAR (para teléfono y email)
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const copyItems = document.querySelectorAll('.contact-item-modern[data-contacto]');
    const toast = document.getElementById('copyToast');
    
    copyItems.forEach(item => {
        const copyBtn = item.querySelector('.contact-copy-modern');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const textoACopiar = item.getAttribute('data-contacto');
                
                if (textoACopiar) {
                    navigator.clipboard.writeText(textoACopiar).then(() => {
                        // Mostrar toast
                        showToast();
                        
                        // Feedback visual en el botón
                        const originalHTML = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copiado!</span>';
                        setTimeout(() => {
                            copyBtn.innerHTML = originalHTML;
                        }, 1500);
                    }).catch(() => {
                        // Fallback
                        fallbackCopy(textoACopiar);
                    });
                }
            });
        }
    });

// ====================
// BOTÓN FLOTANTE - SECCIÓN ACTIVA
// ====================

document.addEventListener('DOMContentLoaded', function() {
    const floatingItems = document.querySelectorAll('.floating-item');
    const sections = document.querySelectorAll('section[id]');
    const floatingNav = document.querySelector('.floating-nav');
    
    // Función para detectar qué sección está visible
    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 120; // Offset para mejor detección
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section.getAttribute('id');
            }
        });
        
        // Remover clase active de todos los items
        floatingItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Agregar clase active al item correspondiente
        if (activeSection) {
            const activeItem = document.querySelector(`.floating-item[href="#${activeSection}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                
                // Opcional: Actualizar el texto del botón principal
                const mainLabel = document.querySelector('.floating-label');
                const activeText = activeItem.querySelector('span').textContent;
                if (mainLabel && activeText !== 'Índice') {
                    // mainLabel.textContent = activeText; // Descomentar si quieres que muestre la sección actual
                }
            }
        }
    }
    
    // Escuchar evento scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // Ejecutar al cargar
    highlightActiveSection();
    
    // Scroll suave al hacer clic
    floatingItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
    
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast();
    }
});


if (closePdfModalBtn) closePdfModalBtn.addEventListener('click', cerrarPdfModal);
if (closePdfModalBtn2) closePdfModalBtn2.addEventListener('click', cerrarPdfModal);
if (pdfModal) pdfModal.addEventListener('click', (e) => { if (e.target === pdfModal) cerrarPdfModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pdfModal?.classList.contains('active')) cerrarPdfModal(); });
document.getElementById('verPdfNotaBtn')?.addEventListener('click', () => window.open('pdfs/nota_rectorado.pdf', '_blank'));
document.getElementById('verPdfCvBtn')?.addEventListener('click', () => window.open('pdfs/cv_completo.pdf', '_blank'));
window.verPDF = verPDF;
window.verPDFSpread = verPDFSpread;

