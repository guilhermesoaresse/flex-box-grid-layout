document.addEventListener('DOMContentLoaded', () => {
    // --- Utils for Item Management ---
    function setupItemActions() {
        // Toggle Intro Cards for mobile
        document.querySelectorAll('.intro-card').forEach(card => {
            card.onclick = () => {
                card.classList.toggle('active');
            };
        });

        document.querySelectorAll('.add-item').forEach(btn => {
            btn.onclick = () => {
                const targetId = btn.dataset.target;
                const container = document.getElementById(targetId);
                const count = container.children.length + 1;
                const newItem = document.createElement('div');
                newItem.className = 'item';
                newItem.textContent = targetId.includes('flex') ? count : 'New';
                if (targetId.includes('grid')) {
                    const names = ['Header', 'Sidebar', 'Content', 'Footer', 'Ad', 'Post', 'Menu'];
                    newItem.textContent = names[count-1] || 'Extra';
                }
                container.appendChild(newItem);
                // Trigger updates
                if (targetId === 'flex-preview') updateFlex();
                else updateGrid();
            };
        });

        // View Code Toggle for Showcase
        document.querySelectorAll('.view-code-btn').forEach(btn => {
            btn.onclick = () => {
                const targetId = btn.dataset.target;
                const codeBox = document.getElementById(targetId);
                codeBox.classList.toggle('show');
                btn.textContent = codeBox.classList.contains('show') ? 'Fechar Código' : 'Ver Código';
            };
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = () => {
                const targetId = btn.dataset.target;
                const container = document.getElementById(targetId);
                if (container.children.length > 1) {
                    container.removeChild(container.lastElementChild);
                }
                // Trigger updates
                if (targetId === 'flex-preview') updateFlex();
                else updateGrid();
            };
        });
    }

    function generateHTMLCode(containerId) {
        const container = document.getElementById(containerId);
        let itemsHTML = '';
        Array.from(container.children).forEach(child => {
            itemsHTML += `    <div class="item">${child.textContent}</div>\n`;
        });
        return `<div class="container">\n${itemsHTML}</div>`;
    }

    // --- Flexbox Controller ---
    const flexPreview = document.getElementById('flex-preview');
    const flexCode = document.getElementById('flex-code');
    const flexHtmlCode = document.getElementById('flex-html-code');
    const flexControls = document.querySelectorAll('.flex-control');

    function updateFlex() {
        let styles = {};

        flexControls.forEach(control => {
            const prop = control.dataset.prop;
            const value = control.value;
            
            if (prop === 'gap') {
                flexPreview.style[prop] = value + 'px';
                styles[prop] = value + 'px';
            } else {
                flexPreview.style[prop] = value;
                styles[prop] = value;
            }
        });

        // Update CSS Display
        let codeText = '.container {\n';
        for (const [key, value] of Object.entries(styles)) {
            codeText += `    ${key}: ${value};\n`;
        }
        codeText += '}';
        flexCode.textContent = codeText;

        // Update HTML Display
        flexHtmlCode.textContent = generateHTMLCode('flex-preview');
    }

    flexControls.forEach(c => c.addEventListener('input', updateFlex));

    // --- Grid Controller ---
    const gridPreview = document.getElementById('grid-preview');
    const gridCode = document.getElementById('grid-code');
    const gridHtmlCode = document.getElementById('grid-html-code');
    const gridControls = document.querySelectorAll('.grid-control');

    function updateGrid() {
        let styles = {};

        gridControls.forEach(control => {
            const prop = control.dataset.prop;
            const value = control.value;
            
            if (prop === 'gap') {
                gridPreview.style[prop] = value + 'px';
                styles[prop] = value + 'px';
            } else {
                gridPreview.style[prop] = value;
                styles[prop] = value;
            }
        });

        // Update CSS Display
        let codeText = '.container {\n';
        for (const [key, value] of Object.entries(styles)) {
            codeText += `    ${key}: ${value};\n`;
        }
        codeText += '}';
        gridCode.textContent = codeText;

        // Update HTML Display
        gridHtmlCode.textContent = generateHTMLCode('grid-preview');
    }

    gridControls.forEach(c => c.addEventListener('input', updateGrid));

    // Initialize
    setupItemActions();
    updateFlex();
    updateGrid();
});
