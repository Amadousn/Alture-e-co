export type Language = "en" | "fr" | "it" | "ru";

export const LANGUAGES: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "it", label: "IT" },
    { code: "ru", label: "RU" },
];

export const DEFAULT_LANGUAGE: Language = "en";

type Dictionary = {
    nav: {
        home: string;
        alturelock: string;
        contact: string;
    };
    hero: {
        headline: string;
        headlineAccent: string;
        headlineSuffix: string;
        subtext: string;
    };
    offer: {
        sectionTitlePlain: string;
        sectionTitleAccent: string;
        service1: { title: string; description: string; bullets: [string, string] };
        service2: { title: string; description: string; bullets: [string, string, string] };
        service3: { title: string; description: string; bullets: [string, string, string, string]; cta: string };
    };
    contact: {
        email: string;
        location: string;
    };
    footer: {
        explore: string;
        legal: string;
        contact: string;
        home: string;
        alturelock: string;
        contactLink: string;
        education: string;
        privacyPolicy: string;
        termsOfService: string;
        disclaimer: string;
        rightsReserved: string;
    };
    education: {
        badge: string;
        headlineLine1: string;
        headlinePrefix: string;
        headlineAccent: string;
        subtext: string;
        requestAccess: string;
        dashboardHeading: string;
        usernameLabel: string;
        passwordLabel: string;
        enterButton: string;
        checkingButton: string;
        successMessage: string;
        errorIncorrect: string;
        errorGeneric: string;
    };
};

export const translations: Record<Language, Dictionary> = {
    // English is the source of record for this site's copy and tone (confident,
    // direct, no corporate padding). Left untouched here; the other languages
    // are adapted to read the same way natively, not translated word-for-word.
    en: {
        nav: { home: "HOME", alturelock: "ALTURELOCK", contact: "CONTACT" },
        hero: {
            headline: "We trade crypto. With",
            headlineAccent: "rules",
            headlineSuffix: ", not feelings.",
            subtext: "A discreet proprietary desk in Dubai. Every trade passes through the same system before it's placed.",
        },
        offer: {
            sectionTitlePlain: "Core",
            sectionTitleAccent: "Disciplines",
            service1: {
                title: "Proprietary Trading",
                description: "Crypto trading executed from our Dubai desk, using in-house strategies and risk-controlled execution.",
                bullets: ["Institutional-grade execution, based in Dubai", "Performance available on request"],
            },
            service2: {
                title: "AI Market Data & News",
                description: "Real-time market intelligence, including news, momentum shifts, and volatility signals, surfaced through our data feed.",
                bullets: ["Live market news & data feed", "Momentum and volatility tracking", "Signals to inform, not replace, judgment"],
            },
            service3: {
                title: "Trading Rules System",
                description: "Software built into the trade itself, enforced at the account level. Every order passes through it before execution. One loss triggers a session lock.",
                bullets: [
                    "Pre-trade checklist, hard drawdown stop, strategy confirmation",
                    "Session lock after one loss, configurable",
                    "Connected directly to your broker",
                    "Secured with IP-restricted API keys",
                ],
                cta: "Explore AltureLock →",
            },
        },
        contact: { email: "Email", location: "Location" },
        footer: {
            explore: "Explore",
            legal: "Legal",
            contact: "Contact",
            home: "Home",
            alturelock: "AltureLock",
            contactLink: "Contact",
            education: "Private",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service",
            disclaimer: "Disclaimer",
            rightsReserved: "All rights reserved.",
        },
        education: {
            badge: "Ladies Only",
            headlineLine1: "Trade with discipline.",
            headlinePrefix: "Learn from",
            headlineAccent: "ladies who already do",
            subtext: "A private circle for ladies learning to trade crypto with structure, not guesswork. Mentorship, rules, and real access, built by someone who's in the room.",
            requestAccess: "Request Access",
            dashboardHeading: "Access your dashboard",
            usernameLabel: "Username",
            passwordLabel: "Password",
            enterButton: "Enter",
            checkingButton: "Checking...",
            successMessage: "You're in. There's nothing here yet, but you'll be the first to know when it opens.",
            errorIncorrect: "Incorrect username or password.",
            errorGeneric: "Something went wrong. Please try again.",
        },
    },
    fr: {
        nav: { home: "ACCUEIL", alturelock: "ALTURELOCK", contact: "CONTACT" },
        hero: {
            // "On" reads more confident and modern here than the stiffer "Nous tradons".
            headline: "On trade la crypto. Avec des",
            headlineAccent: "règles",
            headlineSuffix: ", pas d'émotions.",
            subtext: "Un desk propriétaire discret à Dubaï. Chaque trade suit le même processus avant d'être exécuté.",
        },
        offer: {
            sectionTitlePlain: "Disciplines",
            sectionTitleAccent: "Fondamentales",
            service1: {
                title: "Trading Propriétaire",
                description: "Trading de crypto exécuté depuis notre desk à Dubaï, avec des stratégies internes et une gestion du risque stricte.",
                bullets: ["Exécution de niveau institutionnel, basée à Dubaï", "Performance disponible sur demande"],
            },
            service2: {
                title: "Données de Marché & Actualités IA",
                description: "Intelligence de marché en temps réel : actualités, changements de momentum et signaux de volatilité, réunis dans un seul flux.",
                bullets: ["Actualités et données de marché en direct", "Suivi du momentum et de la volatilité", "Des signaux pour éclairer votre jugement, jamais pour le remplacer"],
            },
            service3: {
                title: "Système de Règles de Trading",
                description: "Un logiciel intégré directement à la prise de position, appliqué au niveau du compte. Chaque ordre passe par ce système avant exécution. Une seule perte suffit à déclencher un verrouillage de session.",
                bullets: [
                    "Checklist avant chaque trade, stop de drawdown strict, confirmation de la stratégie",
                    "Verrouillage de session après une perte, configurable",
                    "Connecté directement à votre broker",
                    "Sécurisé par des clés API restreintes par IP",
                ],
                cta: "Découvrir AltureLock →",
            },
        },
        contact: { email: "Email", location: "Adresse" },
        footer: {
            explore: "Explorer",
            legal: "Légal",
            contact: "Contact",
            home: "Accueil",
            alturelock: "AltureLock",
            contactLink: "Contact",
            education: "Privé",
            privacyPolicy: "Politique de Confidentialité",
            termsOfService: "Conditions d'Utilisation",
            disclaimer: "Avertissement",
            rightsReserved: "Tous droits réservés.",
        },
        education: {
            badge: "Réservé aux Femmes",
            headlineLine1: "Tradez avec discipline.",
            headlinePrefix: "Apprenez auprès de",
            headlineAccent: "femmes qui le font déjà",
            subtext: "Un cercle privé pour les femmes qui apprennent à trader la crypto avec méthode, pas au hasard. Mentorat, règles et un accès réel, construit par quelqu'un qui est sur le terrain.",
            requestAccess: "Demander l'Accès",
            dashboardHeading: "Accédez à votre espace",
            usernameLabel: "Nom d'utilisateur",
            passwordLabel: "Mot de passe",
            enterButton: "Entrer",
            checkingButton: "Vérification...",
            successMessage: "Vous y êtes. Il n'y a rien ici pour l'instant, mais vous serez la première informée à l'ouverture.",
            errorIncorrect: "Nom d'utilisateur ou mot de passe incorrect.",
            errorGeneric: "Une erreur est survenue. Merci de réessayer.",
        },
    },
    it: {
        nav: { home: "HOME", alturelock: "ALTURELOCK", contact: "CONTATTI" },
        hero: {
            headline: "Facciamo trading di crypto. Con",
            headlineAccent: "regole, non emozioni.",
            headlineSuffix: "",
            subtext: "Un desk proprietario riservato a Dubai. Ogni operazione passa attraverso lo stesso sistema prima di essere eseguita.",
        },
        offer: {
            sectionTitlePlain: "Discipline",
            sectionTitleAccent: "Fondamentali",
            service1: {
                title: "Trading Proprietario",
                description: "Trading di crypto eseguito dal nostro desk a Dubai, con strategie interne ed esecuzione a rischio controllato.",
                bullets: ["Esecuzione di livello istituzionale, con sede a Dubai", "Performance disponibili su richiesta"],
            },
            service2: {
                title: "Dati di Mercato IA & Notizie",
                description: "Intelligence di mercato in tempo reale: notizie, variazioni di momentum e segnali di volatilità.",
                bullets: ["Notizie e dati di mercato in diretta", "Monitoraggio di momentum e volatilità", "Segnali per informare, non sostituire, il giudizio"],
            },
            service3: {
                title: "Sistema di Regole di Trading",
                description: "Un software integrato direttamente nell'operazione, applicato a livello di account. Ogni ordine vi passa attraverso prima dell'esecuzione. Una perdita attiva un blocco di sessione.",
                bullets: [
                    "Checklist pre-trade, stop di drawdown rigido, conferma della strategia",
                    "Blocco di sessione dopo una perdita, configurabile",
                    "Connesso direttamente al tuo broker",
                    "Protetto con chiavi API con restrizione IP",
                ],
                cta: "Scopri AltureLock →",
            },
        },
        contact: { email: "Email", location: "Sede" },
        footer: {
            explore: "Esplora",
            legal: "Legale",
            contact: "Contatti",
            home: "Home",
            alturelock: "AltureLock",
            contactLink: "Contatti",
            education: "Privato",
            privacyPolicy: "Informativa sulla Privacy",
            termsOfService: "Termini di Servizio",
            disclaimer: "Disclaimer",
            rightsReserved: "Tutti i diritti riservati.",
        },
        education: {
            badge: "Riservato alle Donne",
            headlineLine1: "Fai trading con disciplina.",
            headlinePrefix: "Impara da",
            headlineAccent: "donne che lo fanno già",
            subtext: "Un circolo privato per donne che imparano a fare trading di crypto con metodo, non a caso. Mentorship, regole, e accesso reale, costruito da chi è già nella stanza dei bottoni.",
            requestAccess: "Richiedi l'accesso",
            dashboardHeading: "Accedi alla tua area riservata",
            usernameLabel: "Nome utente",
            passwordLabel: "Password",
            enterButton: "Entra",
            checkingButton: "Verifica in corso...",
            successMessage: "Sei dentro. Per ora non c'è ancora nulla, ma sarai la prima a saperlo quando aprirà.",
            errorIncorrect: "Nome utente o password errati.",
            errorGeneric: "Qualcosa è andato storto. Riprova.",
        },
    },
    ru: {
        nav: { home: "ГЛАВНАЯ", alturelock: "ALTURELOCK", contact: "КОНТАКТЫ" },
        hero: {
            headline: "Мы торгуем крипту. По",
            headlineAccent: "правилам, а не на эмоциях.",
            headlineSuffix: "",
            subtext: "Закрытый проприетарный деск в Дубае. Каждая сделка проходит через одну и ту же систему перед исполнением.",
        },
        offer: {
            sectionTitlePlain: "Основные",
            sectionTitleAccent: "Принципы",
            service1: {
                title: "Проприетарный Трейдинг",
                description: "Торговля криптовалютой с нашего деска в Дубае, с собственными стратегиями и контролируемым риском исполнения.",
                bullets: ["Исполнение институционального уровня, база в Дубае", "Показатели доступны по запросу"],
            },
            service2: {
                title: "Рыночные Данные ИИ и Новости",
                description: "Рыночная аналитика в реальном времени: новости, изменения импульса и сигналы волатильности.",
                bullets: ["Живые новости и рыночные данные", "Отслеживание импульса и волатильности", "Сигналы для информирования, а не замены суждения"],
            },
            service3: {
                title: "Система Торговых Правил",
                description: "Программное обеспечение, встроенное прямо в сделку, применяется на уровне аккаунта. Каждый ордер проходит через неё перед исполнением. Убыток запускает блокировку сессии.",
                bullets: [
                    "Чек-лист перед сделкой, жёсткий стоп по просадке, подтверждение стратегии",
                    "Блокировка сессии после убытка, настраивается",
                    "Подключено напрямую к вашему брокеру",
                    "Защищено API-ключами с ограничением по IP",
                ],
                cta: "Изучить AltureLock →",
            },
        },
        contact: { email: "Email", location: "Локация" },
        footer: {
            explore: "Обзор",
            legal: "Юридическая информация",
            contact: "Контакты",
            home: "Главная",
            alturelock: "AltureLock",
            contactLink: "Контакты",
            education: "Приватный доступ",
            privacyPolicy: "Политика Конфиденциальности",
            termsOfService: "Условия Использования",
            disclaimer: "Отказ от Ответственности",
            rightsReserved: "Все права защищены.",
        },
        education: {
            badge: "Только для женщин",
            headlineLine1: "Торгуйте с дисциплиной.",
            headlinePrefix: "Учитесь",
            headlineAccent: "у женщин, которые уже это делают",
            subtext: "Закрытое сообщество для женщин, которые учатся трейдингу криптовалют системно, а не наугад. Менторство, правила и реальный доступ от той, кто сама в деле.",
            requestAccess: "Запросить доступ",
            dashboardHeading: "Доступ в личный кабинет",
            usernameLabel: "Имя пользователя",
            passwordLabel: "Пароль",
            enterButton: "Войти",
            checkingButton: "Проверка...",
            successMessage: "Вы внутри. Пока здесь ничего нет, но вы узнаете первой, когда всё откроется.",
            errorIncorrect: "Неверное имя пользователя или пароль.",
            errorGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
        },
    },
};
