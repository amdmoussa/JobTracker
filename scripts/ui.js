function loadStyles() {
    if (document.getElementById('jobtracker-styles')) {
        return;
    }

    fetch(chrome.runtime.getURL('ui/popup.css'))
        .then(response => response.text())
        .then(css => {
            const style = document.createElement('style');
            style.id = 'jobtracker-styles';
            style.textContent = css;
            document.head.appendChild(style);
        });
}

async function loadTemplate() {
    const response = await fetch(chrome.runtime.getURL('ui/popup.html'));
    return await response.text();
}

export async function createConfirmationPopup(applicationData, onConfirm, onCancel) {
    if (document.getElementById('jobtracker-popup')) {
        return;
    }

    loadStyles();

    const html = await loadTemplate();
    const container = document.createElement('div');
    container.innerHTML = html;
    const popup = container.firstElementChild;

    const logo = popup.querySelector('.jobtracker-logo');
    if (logo) {
        logo.src = chrome.runtime.getURL('images/logo.png');
    }

    document.body.appendChild(popup);

    const titleInput = document.getElementById('jobtracker-title-input');
    const urlInput = document.getElementById('jobtracker-url-input');
    const dateInput = document.getElementById('jobtracker-date-input');

    titleInput.value = applicationData.title;
    urlInput.value = applicationData.url;
    
    const date = new Date(applicationData.date);
    dateInput.value = date.toLocaleDateString('en-DE', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit' 
    });
    dateInput.setAttribute('readonly', 'true');

    const confirmBtn = document.getElementById('jobtracker-confirm');
    const cancelBtn = document.getElementById('jobtracker-cancel');

    confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const updatedData = {
            title: titleInput.value,
            url: urlInput.value,
            date: applicationData.date
        };
        popup.remove();
        onConfirm(updatedData);
    });

    cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove();
        if (onCancel) onCancel();
    });

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            popup.remove();
            if (onCancel) onCancel();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

export function showToast(message, type = 'success') {
    loadStyles();

    const toast = document.createElement('div');
    toast.className = `jobtracker-toast ${type === 'error' ? 'error' : ''}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}