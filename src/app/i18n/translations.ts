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
        education: string;
        contact: string;
    };
    hero: {
        headline: string;
        headlineAccent: string;
        headlineSuffix: string;
        subtext: string;
    };
    offer: {
        trading: { label: string; title: string; description: string; cta: string };
        alturelock: { label: string; title: string; description: string; cta: string };
        journal: { label: string; title: string; description: string; cta: string };
        education: { label: string; title: string; description: string; cta: string };
    };
    contact: {
        label: string;
        title: string;
        text: string;
        cta: string;
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
        exploreProgramme: string;
        dashboardHeading: string;
        usernameLabel: string;
        passwordLabel: string;
        enterButton: string;
        checkingButton: string;
        successMessage: string;
        errorIncorrect: string;
        errorGeneric: string;
    };
    mobile: { cockpit: string; logIn: string; workspace: string };
    entry: {
        headline: string;
        pillars: string;
        text: string;
        explore: string;
        enter: string;
        seeDemo: string;
        note: string;
        functions: { title: string; text: string }[];
        systems: string[];
        live: string;
        connecting: string;
        unavailable: string;
        previewCaption: string;
    };
    loginPage: { title: string; noAccount: string; tryDemo: string; or: string; explore: string; closed: string; requestAccess: string };
    alturelockLogin: {
        tagline: string;
        usernameLabel: string;
        passwordLabel: string;
        signInButton: string;
        signingInButton: string;
        errorDefault: string;
        errorGeneric: string;
        quote: string;
    };
};

export const translations: Record<Language, Dictionary> = {
    // English is the source of record for this site's copy and tone (confident,
    // direct, no corporate padding). Left untouched here; the other languages
    // are adapted to read the same way natively, not translated word-for-word.
    en: {
        nav: { home: "HOME", alturelock: "ALTURELOCK", education: "EDUCATION", contact: "CONTACT" },
        hero: {
            headline: "We trade crypto. With",
            headlineAccent: "rules",
            headlineSuffix: ", not feelings.",
            subtext: "A Dubai-based trading company building proprietary strategies, trading tools, and structured education for the crypto markets.",
        },
        offer: {
            trading: {
                label: "Proprietary Trading",
                title: "Proprietary Trading",
                description: "A Dubai-based desk. Our own capital. Our own strategies. A structured approach to crypto markets and risk management.",
                cta: "Performance on request →",
            },
            alturelock: {
                label: "Trading Rules System",
                title: "AltureLock",
                description: "A structured workflow to prepare, execute, manage and review your trades.",
                cta: "Explore AltureLock",
            },
            journal: {
                label: "Free",
                title: "Trading Journal",
                description: "Record your trades, track your performance and review your trading decisions.",
                cta: "Open Trading Journal",
            },
            education: {
                label: "Education",
                title: "Alture Education",
                description: "Structured trading education focused on market analysis, strategy development, execution, and risk management.",
                cta: "Explore Education →",
            },
        },
        contact: { label: "Contact", title: "Talk to the desk.", text: "For AltureLock access, education, or performance on request, write to us directly. We reply personally.", cta: "Write to us →", email: "Email", location: "Location" },
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
            exploreProgramme: "Explore the programme",
            dashboardHeading: "Access your dashboard",
            usernameLabel: "Username",
            passwordLabel: "Password",
            enterButton: "Enter",
            checkingButton: "Checking...",
            successMessage: "You're in. There's nothing here yet, but you'll be the first to know when it opens.",
            errorIncorrect: "Incorrect username or password.",
            errorGeneric: "Something went wrong. Please try again.",
        },
        mobile: { cockpit: "Cockpit", logIn: "Log in", workspace: "Workspace" },
        entry: {
            headline: "Your copilot for consistent trading.",
            pillars: "Trading Rules. Risk Management. Trading Journal.",
            text: "AltureLock helps you structure your process, manage your risk and review your performance, one trade at a time.",
            explore: "Explore AltureLock",
            enter: "Enter your workspace",
            seeDemo: "See the demo",
            note: "No account needed to explore. It runs on a simulated account.",
            functions: [
                { title: "Trading Rules", text: "Plan the trade on the chart and confirm you are ready before you commit." },
                { title: "Risk Management", text: "Know your size, your risk and your reward before the trade is open." },
                { title: "Trading Journal", text: "Every finished trade is reviewed and recorded, so your results teach you something." },
            ],
            systems: ["Markets", "News", "Calendar", "Chart", "Journal"],
            live: "Bybit, live",
            connecting: "Connecting to the market…",
            unavailable: "Market data unavailable",
            previewCaption: "The cockpit on a phone, with a simulated account",
        },
        loginPage: { title: "Log in", noAccount: "No account?", tryDemo: "Try the demo", or: "or", explore: "explore AltureLock", closed: "Access is not open yet.", requestAccess: "Request access" },
        alturelockLogin: {
            tagline: "Your Co-Pilot",
            usernameLabel: "Username",
            passwordLabel: "Password",
            signInButton: "Sign In",
            signingInButton: "Signing In...",
            errorDefault: "Incorrect username or password.",
            errorGeneric: "Something went wrong. Please try again.",
            quote: "Ten years of experience does not stop a broken rule. Under pressure, everyone is human, not a machine. This is not about being a beginner or being profitable. It is about staying disciplined when it matters most.",
        },
    },
    fr: {
        nav: { home: "ACCUEIL", alturelock: "ALTURELOCK", education: "FORMATION", contact: "CONTACT" },
        hero: {
            // "On" reads more confident and modern here than the stiffer "Nous tradons".
            headline: "On trade la crypto. Avec des",
            headlineAccent: "règles",
            headlineSuffix: ", pas d'émotions.",
            subtext: "Une société de trading basée à Dubaï, qui développe ses propres stratégies, des outils de trading et une formation structurée pour les marchés crypto.",
        },
        offer: {
            trading: {
                label: "Trading Propriétaire",
                title: "Trading Propriétaire",
                description: "Un desk basé à Dubaï. Nos capitaux. Nos stratégies. Une approche structurée des marchés crypto et de la gestion du risque.",
                cta: "Performance sur demande →",
            },
            alturelock: {
                label: "Système de règles de trading",
                title: "AltureLock",
                description: "Un parcours structuré pour préparer, exécuter, gérer et analyser vos trades.",
                cta: "Découvrir AltureLock",
            },
            journal: {
                label: "Gratuit",
                title: "Journal de trading",
                description: "Enregistrez vos trades, suivez vos performances et revoyez vos décisions de trading.",
                cta: "Ouvrir le journal",
            },
            education: {
                label: "Formation",
                title: "Alture Education",
                description: "Une formation au trading structurée : analyse de marché, construction de stratégie, exécution et gestion du risque.",
                cta: "Découvrir la formation →",
            },
        },
        contact: { label: "Contact", title: "Parlons-en.", text: "Pour un accès à AltureLock, la formation ou nos performances sur demande, écrivez-nous directement. Nous répondons personnellement.", cta: "Nous écrire →", email: "Email", location: "Adresse" },
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
            exploreProgramme: "Découvrir le programme",
            dashboardHeading: "Accédez à votre espace",
            usernameLabel: "Nom d'utilisateur",
            passwordLabel: "Mot de passe",
            enterButton: "Entrer",
            checkingButton: "Vérification...",
            successMessage: "Vous y êtes. Il n'y a rien ici pour l'instant, mais vous serez la première informée à l'ouverture.",
            errorIncorrect: "Nom d'utilisateur ou mot de passe incorrect.",
            errorGeneric: "Une erreur est survenue. Merci de réessayer.",
        },
        mobile: { cockpit: "Cockpit", logIn: "Connexion", workspace: "Mon espace" },
        entry: {
            headline: "Votre copilote pour trader avec constance.",
            pillars: "Règles de trading. Gestion du risque. Journal de trading.",
            text: "AltureLock vous aide à structurer votre méthode, à maîtriser votre risque et à analyser vos résultats, un trade après l'autre.",
            explore: "Découvrir AltureLock",
            enter: "Accéder à votre espace",
            seeDemo: "Voir la démo",
            note: "Aucun compte requis pour découvrir. La démo tourne sur un compte simulé.",
            functions: [
                { title: "Règles de trading", text: "Préparez le trade sur le graphique et vérifiez que vous êtes prêt avant de vous engager." },
                { title: "Gestion du risque", text: "Connaissez votre taille, votre risque et votre gain potentiel avant d'ouvrir la position." },
                { title: "Journal de trading", text: "Chaque trade clôturé est analysé et consigné, pour que vos résultats vous apprennent quelque chose." },
            ],
            systems: ["Marchés", "Actualités", "Calendrier", "Graphique", "Journal"],
            live: "Bybit, en direct",
            connecting: "Connexion au marché…",
            unavailable: "Données de marché indisponibles",
            previewCaption: "Le cockpit sur téléphone, avec un compte simulé",
        },
        loginPage: { title: "Connexion", noAccount: "Pas de compte ?", tryDemo: "Essayer la démo", or: "ou", explore: "découvrir AltureLock", closed: "L'accès n'est pas encore ouvert.", requestAccess: "Demander un accès" },
        alturelockLogin: {
            tagline: "Votre Co-Pilote",
            usernameLabel: "Nom d'utilisateur",
            passwordLabel: "Mot de passe",
            signInButton: "Se Connecter",
            signingInButton: "Connexion...",
            errorDefault: "Nom d'utilisateur ou mot de passe incorrect.",
            errorGeneric: "Une erreur est survenue. Merci de réessayer.",
            quote: "Dix ans d'expérience n'empêchent pas d'enfreindre une règle. Sous pression, on reste humain, pas une machine. Il ne s'agit pas d'être débutant, ni d'être rentable. Il s'agit de rester discipliné quand cela compte le plus.",
        },
    },
    it: {
        nav: { home: "HOME", alturelock: "ALTURELOCK", education: "FORMAZIONE", contact: "CONTATTI" },
        hero: {
            headline: "Facciamo trading di crypto. Con",
            headlineAccent: "regole, non emozioni.",
            headlineSuffix: "",
            subtext: "Una società di trading con sede a Dubai che sviluppa strategie proprietarie, strumenti di trading e formazione strutturata per i mercati crypto.",
        },
        offer: {
            trading: {
                label: "Trading Proprietario",
                title: "Trading Proprietario",
                description: "Un desk con sede a Dubai. Il nostro capitale. Le nostre strategie. Un approccio strutturato ai mercati crypto e alla gestione del rischio.",
                cta: "Performance su richiesta →",
            },
            alturelock: {
                label: "Sistema di regole di trading",
                title: "AltureLock",
                description: "Un percorso strutturato per preparare, eseguire, gestire e rivedere le tue operazioni.",
                cta: "Scopri AltureLock",
            },
            journal: {
                label: "Gratis",
                title: "Diario di trading",
                description: "Registra le tue operazioni, monitora le performance e rivedi le tue decisioni di trading.",
                cta: "Apri il diario",
            },
            education: {
                label: "Formazione",
                title: "Alture Education",
                description: "Formazione al trading strutturata: analisi di mercato, sviluppo della strategia, esecuzione e gestione del rischio.",
                cta: "Scopri la formazione →",
            },
        },
        contact: { label: "Contatti", title: "Parliamone.", text: "Per l'accesso ad AltureLock, la formazione o le performance su richiesta, scrivici direttamente. Rispondiamo di persona.", cta: "Scrivici →", email: "Email", location: "Sede" },
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
            subtext: "Una community privata per donne che imparano il trading crypto con metodo, non a caso. Mentorship, regole e accesso reale, direttamente da chi il trading lo vive ogni giorno.",
            requestAccess: "Richiedi l'accesso",
            exploreProgramme: "Scopri il programma",
            dashboardHeading: "Accedi alla tua area riservata",
            usernameLabel: "Nome utente",
            passwordLabel: "Password",
            enterButton: "Entra",
            checkingButton: "Verifica in corso...",
            successMessage: "Sei dentro. Per ora non c'è ancora nulla, ma sarai la prima a saperlo quando aprirà.",
            errorIncorrect: "Nome utente o password errati.",
            errorGeneric: "Qualcosa è andato storto. Riprova.",
        },
        mobile: { cockpit: "Cockpit", logIn: "Accedi", workspace: "Il mio spazio" },
        entry: {
            headline: "Il tuo copilota per fare trading con costanza.",
            pillars: "Regole di trading. Gestione del rischio. Diario di trading.",
            text: "AltureLock ti aiuta a dare struttura al tuo metodo, a gestire il rischio e a rivedere i risultati, un trade alla volta.",
            explore: "Scopri AltureLock",
            enter: "Entra nel tuo spazio",
            seeDemo: "Guarda la demo",
            note: "Per esplorare non serve un account. La demo usa un conto simulato.",
            functions: [
                { title: "Regole di trading", text: "Pianifica il trade sul grafico e verifica di essere pronto prima di impegnarti." },
                { title: "Gestione del rischio", text: "Conosci dimensione, rischio e rendimento potenziale prima di aprire la posizione." },
                { title: "Diario di trading", text: "Ogni trade chiuso viene rivisto e registrato, così i tuoi risultati ti insegnano qualcosa." },
            ],
            systems: ["Mercati", "Notizie", "Calendario", "Grafico", "Diario"],
            live: "Bybit, in tempo reale",
            connecting: "Connessione al mercato…",
            unavailable: "Dati di mercato non disponibili",
            previewCaption: "Il cockpit su telefono, con un conto simulato",
        },
        loginPage: { title: "Accesso", noAccount: "Non hai un account?", tryDemo: "Prova la demo", or: "oppure", explore: "scopri AltureLock", closed: "L'accesso non è ancora aperto.", requestAccess: "Richiedi l'accesso" },
        alturelockLogin: {
            tagline: "Il tuo Co-Pilota",
            usernameLabel: "Nome utente",
            passwordLabel: "Password",
            signInButton: "Accedi",
            signingInButton: "Accesso in corso...",
            errorDefault: "Nome utente o password errati.",
            errorGeneric: "Qualcosa è andato storto. Riprova.",
            quote: "Dieci anni di esperienza non impediscono di infrangere una regola. Sotto pressione, si resta umani, non macchine. Non si tratta di essere principianti o di essere già in profitto. Si tratta di restare disciplinati quando conta di più.",
        },
    },
    ru: {
        nav: { home: "ГЛАВНАЯ", alturelock: "ALTURELOCK", education: "ОБУЧЕНИЕ", contact: "КОНТАКТЫ" },
        hero: {
            headline: "Мы торгуем крипту. По",
            headlineAccent: "правилам, а не на эмоциях.",
            headlineSuffix: "",
            subtext: "Трейдинговая компания из Дубая: собственные стратегии, инструменты для трейдинга и системное обучение для крипторынка.",
        },
        offer: {
            trading: {
                label: "Проприетарный трейдинг",
                title: "Проприетарный Трейдинг",
                description: "Деск в Дубае. Собственный капитал. Собственные стратегии. Системный подход к крипторынку и управлению рисками.",
                cta: "Показатели по запросу →",
            },
            alturelock: {
                label: "Система торговых правил",
                title: "AltureLock",
                description: "Структурированный процесс: подготовка, вход, сопровождение и разбор каждой сделки.",
                cta: "Познакомиться с AltureLock",
            },
            journal: {
                label: "Бесплатно",
                title: "Дневник трейдера",
                description: "Записывайте сделки, отслеживайте результаты и разбирайте свои торговые решения.",
                cta: "Открыть дневник",
            },
            education: {
                label: "Обучение",
                title: "Alture Education",
                description: "Системное обучение трейдингу: анализ рынка, разработка стратегии, исполнение и управление рисками.",
                cta: "Подробнее об обучении →",
            },
        },
        contact: { label: "Контакты", title: "Свяжитесь с нами.", text: "Напишите нам напрямую по поводу доступа к AltureLock, обучения или показателей по запросу. Отвечаем лично.", cta: "Написать нам →", email: "Email", location: "Локация" },
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
            exploreProgramme: "Смотреть программу",
            dashboardHeading: "Доступ в личный кабинет",
            usernameLabel: "Имя пользователя",
            passwordLabel: "Пароль",
            enterButton: "Войти",
            checkingButton: "Проверка...",
            successMessage: "Вы внутри. Пока здесь ничего нет, но вы узнаете первой, когда всё откроется.",
            errorIncorrect: "Неверное имя пользователя или пароль.",
            errorGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
        },
        mobile: { cockpit: "Кокпит", logIn: "Войти", workspace: "Кабинет" },
        entry: {
            headline: "Ваш второй пилот для стабильной торговли.",
            pillars: "Торговые правила. Управление риском. Дневник сделок.",
            text: "AltureLock помогает выстроить процесс, держать риск под контролем и разбирать результаты, сделка за сделкой.",
            explore: "Познакомиться с AltureLock",
            enter: "Войти в кабинет",
            seeDemo: "Посмотреть демо",
            note: "Чтобы посмотреть, аккаунт не нужен. Демо работает на учебном счёте.",
            functions: [
                { title: "Торговые правила", text: "Спланируйте сделку на графике и убедитесь, что готовы, прежде чем входить." },
                { title: "Управление риском", text: "Знайте объём, риск и потенциальную прибыль до открытия позиции." },
                { title: "Дневник сделок", text: "Каждая закрытая сделка разбирается и записывается, чтобы результаты чему-то учили." },
            ],
            systems: ["Рынки", "Новости", "Календарь", "График", "Дневник"],
            live: "Bybit, онлайн",
            connecting: "Подключение к рынку…",
            unavailable: "Рыночные данные недоступны",
            previewCaption: "Кокпит на телефоне, учебный счёт",
        },
        loginPage: { title: "Вход", noAccount: "Нет аккаунта?", tryDemo: "Попробовать демо", or: "или", explore: "познакомиться с AltureLock", closed: "Доступ пока не открыт.", requestAccess: "Запросить доступ" },
        alturelockLogin: {
            tagline: "Ваш Второй Пилот",
            usernameLabel: "Имя пользователя",
            passwordLabel: "Пароль",
            signInButton: "Войти",
            signingInButton: "Вход...",
            errorDefault: "Неверное имя пользователя или пароль.",
            errorGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
            quote: "Десять лет опыта не защищают от нарушения правил. Под давлением каждый остаётся человеком, а не машиной. Дело не в том, новичок ты или уже прибыльный трейдер. Дело в дисциплине, особенно когда это важнее всего.",
        },
    },
};
