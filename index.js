import { isJobApplicationPage, highlightApplyButtons } from './scripts/isJobApplication.js';

// Steps :
// 5. log the application details to the console (Store when storage is implemented)
// 6. Notify the user that the application has been tracked
// 7. Eventually : 
// - Prompt the user to create an account to sync their tracked applications across devices (not implemented yet)
// - provide a dashboard to view all tracked applications (not implemented yet)

function setupContinuousHighlighting() {
    highlightApplyButtons(document);
    
    const observer = new MutationObserver(() => {
        highlightApplyButtons(document);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function checkPage() {
    const isJobOffer = isJobApplicationPage(document);
    if (isJobOffer) {
        setupContinuousHighlighting();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkPage);
} else {
    checkPage();
}