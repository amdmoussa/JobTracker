import { trackApplication } from './trackApplication.js';

import { jobDetectionConfig, getKeywordsForLanguages, getApplyKeywords, detectPageLanguage } from '../config/jobDetectionConfig.js';
import { uiConfig } from '../config/uiConfig.js';

function hightlightElement(element) {
    const color = uiConfig.highlightColor;
    const style = uiConfig.highlightStyle;

    element.style.border = `${style.borderWidth} ${style.borderStyle} ${color}`;
    element.style.boxShadow = `0 0 ${style.boxShadowBlur} ${style.boxShadowSpread} ${color}`;
    element.style.outline = `${style.outlineWidth} solid ${color}`;
    element.style.outlineOffset = style.outlineOffset;
}

function attachTrackingListener(button) {
    if (button.dataset.trackingAttached === 'true') {
        return;
    }

    button.addEventListener('click', (event) => {
        trackApplication();
        // to prevent navigation uncomment below line
        // event.preventDefault();
    }, { once: false }); // Set to true if you only want to track once per button

    button.dataset.trackingAttached = 'true';
}

export function highlightApplyButtons(document) {
    const pageLanguage = detectPageLanguage(document);
    const applyKeywords = getApplyKeywords([pageLanguage, 'en']);

    const applyButtons = document.querySelectorAll('button, a, input[type="submit"], div[role="button"], [class*="button"]');

    const matchingApplyButtons = Array.from(applyButtons).filter(btn => {
        const text = btn.textContent.toLowerCase();
        const href = btn.getAttribute('href')?.toLowerCase() || '';
        return applyKeywords.some(keyword => text.includes(keyword) || href.includes(keyword));
    });

    matchingApplyButtons.forEach(btn => {
        hightlightElement(btn);
        attachTrackingListener(btn);
    });
}

export function isJobApplicationPage(document) {
    const url = window.location.href.toLowerCase();

    if (jobDetectionConfig.urlPatterns.some(site => url.includes(site))) {
        return true;
    }

    const pageLanguage = detectPageLanguage(document);
    const keywords = getKeywordsForLanguages([pageLanguage, 'en']);
    const applyKeywords = getApplyKeywords([pageLanguage, 'en']);

    const bodyText = document.body.innerText.toLowerCase();
    const keywordMatches = keywords.filter(keyword => bodyText.includes(keyword)).length;

    const applyButtons = document.querySelectorAll('button, a, input[type="submit"], div[role="button"], span[role="button"], [class*="apply"], [class*="button"]');

    const matchingApplyButtons = Array.from(applyButtons).filter(btn => {
        const text = btn.textContent.toLowerCase();
        const href = btn.getAttribute('href')?.toLowerCase() || '';
        return applyKeywords.some(keyword => text.includes(keyword) || href.includes(keyword));
    });

    const hasApplyButton = matchingApplyButtons.length > 0;
    const isJobPage = keywordMatches >= jobDetectionConfig.minKeywordMatches && hasApplyButton;

    return isJobPage;
}