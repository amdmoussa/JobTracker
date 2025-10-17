export const jobDetectionConfig = {
    // URL patterns are language-agnostic
    urlPatterns: [
        'linkedin.com/jobs',
        'indeed.com',
        'glassdoor.com',
        'monster.com',
        'ziprecruiter.com',
        'careers.',
        'jobs.',
        '/careers/',
        '/jobs/',
        'greenhouse.io',
        'lever.co',
        'workday.com',
        'myworkdayjobs.com',
        'welcometothejungle.com',
        'stackoverflow.com/jobs',
        'angel.co/jobs',
        'hired.com'
    ],

    // Keywords organized by language
    keywords: {
        en: {
            apply: ['apply now', 'apply for this job', 'submit application', 'easy apply'],
            jobDetails: ['job description', 'responsibilities', 'qualifications', 'requirements', 'about the role'],
            general: ['salary', 'benefits', 'full-time', 'part-time', 'remote', 'hybrid']
        },
        fr: {
            apply: ['postuler', 'candidater', 'envoyer candidature', 'envoyer'],
            jobDetails: ['description du poste', 'responsabilités', 'qualifications', 'exigences', 'à propos du poste'],
            general: ['salaire', 'avantages', 'temps plein', 'temps partiel', 'télétravail', 'cdi', 'cdd', 'hybride', 'stage', 'alternance']
        },
        es: {
            apply: ['aplicar ahora', 'enviar solicitud', 'postularse'],
            jobDetails: ['descripción del trabajo', 'responsabilidades', 'calificaciones', 'requisitos'],
            general: ['salario', 'beneficios', 'tiempo completo', 'medio tiempo', 'remoto']
        },
        de: {
            apply: ['jetzt bewerben', 'bewerbung senden'],
            jobDetails: ['stellenbeschreibung', 'verantwortlichkeiten', 'qualifikationen', 'anforderungen'],
            general: ['gehalt', 'vorteile', 'vollzeit', 'teilzeit', 'remote']
        }
    },

    // Minimum keyword matches required
    minKeywordMatches: 2
};

export function getKeywordsForLanguages(languages = ['en']) {
    const allKeywords = [];

    languages.forEach(lang => {
        if (jobDetectionConfig.keywords[lang]) {
            const langKeywords = jobDetectionConfig.keywords[lang];
            Object.values(langKeywords).forEach(categoryKeywords => {
                allKeywords.push(...categoryKeywords);
            });
        }
    });

    return allKeywords;
}

export function detectPageLanguage(document) {
    const htmlLang = document.documentElement.lang?.toLowerCase().split('-')[0];
    console.log('[JobTracker Config] HTML lang attribute:', htmlLang);

    const supportedLanguages = Object.keys(jobDetectionConfig.keywords);

    if (htmlLang && supportedLanguages.includes(htmlLang)) {
        console.log('[JobTracker Config] Language supported:', htmlLang);
        return htmlLang;
    }

    console.log('[JobTracker Config] Using default language: en');
    return 'en'; // Default to English
}

export function getApplyKeywords(languages = ['en']) {
    const applyKeywords = [];

    languages.forEach(lang => {
        if (jobDetectionConfig.keywords[lang]?.apply) {
            applyKeywords.push(...jobDetectionConfig.keywords[lang].apply);
        }
    });

    return applyKeywords;
}
