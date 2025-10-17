console.log('Hello from JobTracker extension!');

import { isJobApplicationPage } from './scripts/isJobApplication.js';

// Steps :
// 1. Check if the current web page is a job application page (scripts/isJobApplication.js)
// 2. If it is, extract relevant job details (e.g., job title, company name, application date)
// 3. highlight the "apply" button on the page
// 4. If the user clicks the "apply" button, prompt the user to track the application
// 5. log the application details to the console (Store when storage is implemented)
// 6. Notify the user that the application has been tracked
// 7. Eventually : 
// - Prompt the user to create an account to sync their tracked applications across devices (not implemented yet)
// - provide a dashboard to view all tracked applications (not implemented yet)

const isJobOffer = isJobApplicationPage(document);

console.log('Is this a job application page?', isJobOffer);