import { createConfirmationPopup, showToast } from './ui.js';

export function trackApplication() {
    const applicationData = {
        url: window.location.href,
        title: document.title,
        date: new Date().toISOString()
    };

    createConfirmationPopup(
        applicationData,
        (confirmedData) => {
            console.log('=== Application Tracked ===');
            console.log('URL:', confirmedData.url);
            console.log('Title:', confirmedData.title);
            console.log('Date:', confirmedData.date);
            console.log('==========================');

            showToast('Application tracked successfully!', 'success');

            return confirmedData;
        },
        () => {
            console.log('Application tracking cancelled');
        }
    );
}