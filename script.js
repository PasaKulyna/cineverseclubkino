/* SAFE DOM UTILITY HELPERS TO PREVENT NULL POINTER ERRORS */
function getEl(id) {
    return document.getElementById(id);
}

function setTxt(id, val) {
    const el = getEl(id);
    if (el) el.innerText = val;
}

function setHTML(id, val) {
    const el = getEl(id);
    if (el) el.innerHTML = val;
}

function toggleCls(id, cls, force) {
    const el = getEl(id);
    if (el) el.classList.toggle(cls, force);
}

function addCls(id, cls) {
    const el = getEl(id);
    if (el) el.classList.add(cls);
}

function remCls(id, cls) {
    const el = getEl(id);
    if (el) el.classList.remove(cls);
}

/* APP STATE */
const state = {
    currentUser: null, // NOT logged in by default
    usersDatabase: [
        {
            name: "Олексій Коваленко",
            email: "alex@example.com",
            password: "password123",
            genres: ["🎭 Драма", "🎨 Артхаус", "🚀 Sci-Fi"],
            ticket: null,
            hasVoted: false,
            votedOption: null,
            wishlist: [
                { id: 1, title: 'Малхолланд Драйв (2001)', director: 'Девід Лінч • Драма/Трилер', status: 'want' },
                { id: 2, title: 'Леон (1994)', director: 'Люк Бессон • Кримінал', status: 'want' },
                { id: 3, title: 'Той, хто біжить по лезу (1982)', director: 'Рідлі Скотт • Sci-Fi', status: 'want' },
                { id: 4, title: 'Чунцинський експрес (1994)', director: 'Вонг Карвай • Артхаус', status: 'watched', rating: 5 }
            ]
        }
    ],
    selectedSeat: null,
    bookingMovie: { title: '', date: '' },
    votes: {
        'option-1': 58,
        'option-2': 49,
        'option-3': 35
    },
    activeTab: 'home',
    wishlistTab: 'want',
    authMode: 'login' // 'login' or 'register'
};

/* SCHEDULE DATA */
const scheduleMovies = [
    {
        id: 1,
        title: "Париж, Техас (1984)",
        director: "Вім Вендерс",
        genreCategory: "arthouse",
        genreLabel: "Артхаус",
        date: "Субота, 21 Вересня",
        time: "19:00",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
        badge: "4K Реставрація",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        trailerUrl: "https://www.youtube-nocookie.com/embed/9e590FeeGcm?autoplay=1",
        seatsLeft: 6,
        price: 200
    },
    {
        id: 2,
        title: "Кримінальне чтиво (1994)",
        director: "Квентін Тарантіно",
        genreCategory: "cult",
        genreLabel: "Культова класика",
        date: "Неділя, 22 Вересня",
        time: "18:30",
        poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
        badge: "Вініл-сет після перегляду",
        badgeColor: "bg-brand-crimson/20 text-brand-crimson border-brand-crimson/30",
        trailerUrl: "https://www.youtube-nocookie.com/embed/s7EdQ4FqbhY?autoplay=1",
        seatsLeft: 2,
        price: 220
    },
    {
        id: 3,
        title: "Космічна Одіссея 2001 (1968)",
        director: "Стенлі Кубрик",
        genreCategory: "scifi",
        genreLabel: "Sci-Fi & Нуар",
        date: "Субота, 28 Вересня",
        time: "19:00",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        badge: "Обговорення з астрофізиком",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        trailerUrl: "https://www.youtube-nocookie.com/embed/Z2UWOeBcsJI?autoplay=1",
        seatsLeft: 12,
        price: 200
    },
    {
        id: 4,
        title: "Любовний настрій (2000)",
        director: "Вонг Карвай",
        genreCategory: "arthouse",
        genreLabel: "Артхаус",
        date: "Неділя, 29 Вересня",
        time: "19:00",
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600",
        badge: "Чайне частування",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        trailerUrl: "https://www.youtube-nocookie.com/embed/DFu3A3IAnvI?autoplay=1",
        seatsLeft: 8,
        price: 200
    }
];

/* VOTING OPTIONS DATA */
const votingCandidates = [
    {
        id: 'option-1',
        title: "Малхолланд Драйв",
        director: "Девід Лінч (2001)",
        desc: "Загадковий нео-нуар про теневий Голлівуд, сни та роздвоєння реальності.",
        tag: "Психологічний трилер"
    },
    {
        id: 'option-2',
        title: "Той, хто біжить по лезу 2049",
        director: "Дені Вільньов (2017)",
        desc: "Візуальний шедевр кінематографії про неонові міські пустища та штучну душу.",
        tag: "Філософський Sci-Fi"
    },
    {
        id: 'option-3',
        title: "Леон: Професіонал",
        director: "Люк Бессон (1994)",
        desc: "Культова історія дружби найманого вбивці та дівчинки у Нью-Йорку 90-х.",
        tag: "Культова драма"
    }
];

/* FAQ DATA */
const faqData = [
    {
        q: "Як забронювати місце на сеанс?",
        a: "Оберіть бажаний фільм в афіші, натисніть «Забронювати місце», оберіть зручний пуф чи диван на інтерактивній карті та підтвердіть замовлення. Квиток з QR-кодом одразу з'явиться у вашому Кабінеті кіномана."
    },
    {
        q: "Що входить у вартість квитка?",
        a: "У вартість входить місце у залі (м'який бег-пуф), перегляд у 4K форматі, участь у післясеансному обговоренні та частування безлімітним крафтовим попкорном."
    },
    {
        q: "Чи можна приносити власні платівки (вініл)?",
        a: "Так! За 30 хвилин до початку показу ми вмикаємо вініловий програвач у холі. Ви можете принести улюблену платівку та поставити її для інших членів клубу."
    },
    {
        q: "Які правила поведінки у залі?",
        a: "Головні правила: повне вимкнення звуку телефонів під час показу, відсутність розмов під час сеансу та повага до будь-якої думки під час обговорення."
    }
];

/* INITIALIZATION ON PAGE LOAD */
window.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    renderSchedule('all');
    renderVotingSection();
    renderFAQ();
    renderSeatsGrid();
    updateUserUI();
});

/* TAB SWITCHING SYSTEM */
function switchTab(tabId) {
    state.activeTab = tabId;
    const tabs = ['home', 'about', 'profile'];
    
    tabs.forEach(id => {
        const isTarget = id === tabId;
        toggleCls(`tab-${id}`, 'hidden', !isTarget);
        
        const navBtn = getEl(`nav-${id}`);
        if (navBtn) {
            if (isTarget) {
                navBtn.classList.add('text-brand-gold', 'bg-white/10');
                navBtn.classList.remove('text-gray-400');
            } else {
                navBtn.classList.remove('text-brand-gold', 'bg-white/10');
                navBtn.classList.add('text-gray-400');
            }
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = getEl('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

/* COUNTDOWN TIMER LOGIC */
function initCountdown() {
    const targetDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000);

    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTxt('timer-days', String(days).padStart(2, '0'));
        setTxt('timer-hours', String(hours).padStart(2, '0'));
        setTxt('timer-minutes', String(minutes).padStart(2, '0'));
        setTxt('timer-seconds', String(seconds).padStart(2, '0'));
    }, 1000);
}

/* SCHEDULE CARDS RENDERER */
function renderSchedule(filterCategory) {
    const container = getEl('schedule-grid');
    if (!container) return;
    container.innerHTML = '';

    const filtered = filterCategory === 'all' 
        ? scheduleMovies 
        : scheduleMovies.filter(m => m.genreCategory === filterCategory);

    filtered.forEach(movie => {
        const card = document.createElement('div');
        card.className = "glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-brand-gold/40 transition duration-300";
        
        card.innerHTML = `
            <div>
                <div class="relative h-48 overflow-hidden">
                    <img src="${movie.poster}" alt="${movie.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-cardBg via-transparent to-transparent"></div>
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${movie.badgeColor}">
                        ${movie.badge}
                    </span>
                    <button onclick="playTrailer('${movie.trailerUrl}')" class="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 text-brand-gold hover:bg-brand-gold hover:text-black flex items-center justify-center transition border border-white/20">
                        <i class="fa-solid fa-play text-xs"></i>
                    </button>
                </div>
                <div class="p-5 space-y-3">
                    <div class="flex items-center justify-between text-xs text-brand-gold font-semibold">
                        <span><i class="fa-regular fa-calendar mr-1.5"></i>${movie.date}</span>
                        <span><i class="fa-regular fa-clock mr-1"></i>${movie.time}</span>
                    </div>
                    <h3 class="text-xl font-bold font-display text-white group-hover:text-brand-gold transition">${movie.title}</h3>
                    <p class="text-xs text-gray-400">Режисер: <span class="text-gray-200">${movie.director}</span></p>
                </div>
            </div>

            <div class="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <div>
                    <span class="text-xs text-gray-400 block">Ціна квитка</span>
                    <span class="text-lg font-bold font-display text-white">${movie.price} грн</span>
                </div>
                <button onclick="openBookingModal('${movie.title}', '${movie.date} • ${movie.time}')" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-black font-semibold text-xs text-white transition flex items-center gap-1.5">
                    <i class="fa-solid fa-chair"></i>Місце
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterSchedule(category) {
    document.querySelectorAll('.schedule-filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-gold', 'text-black');
        btn.classList.add('bg-white/5', 'text-gray-300');
    });
    if (event && event.target) {
        event.target.classList.remove('bg-white/5', 'text-gray-300');
        event.target.classList.add('bg-brand-gold', 'text-black');
    }
    renderSchedule(category);
}

/* VOTING LOGIC */
function renderVotingSection() {
    const container = getEl('voting-options-container');
    if (!container) return;
    container.innerHTML = '';

    const total = Object.values(state.votes).reduce((a, b) => a + b, 0);
    setTxt('total-votes-count', `Всього голосів: ${total}`);

    const userHasVoted = state.currentUser ? state.currentUser.hasVoted : false;

    votingCandidates.forEach(item => {
        const voteCount = state.votes[item.id] || 0;
        const percent = total > 0 ? Math.round((voteCount / total) * 100) : 0;
        const isUserChoice = state.currentUser && state.currentUser.votedOption === item.id;

        const card = document.createElement('div');
        card.className = `p-5 rounded-2xl bg-black/40 border ${isUserChoice ? 'border-brand-gold bg-brand-gold/5' : 'border-white/10'} flex flex-col justify-between space-y-4 relative overflow-hidden`;

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md border border-brand-gold/20 uppercase">${item.tag}</span>
                    <span class="text-xs font-bold text-gray-300">${percent}% (${voteCount})</span>
                </div>
                <h4 class="text-lg font-bold text-white font-display">${item.title}</h4>
                <p class="text-xs text-gray-400 mt-0.5">${item.director}</p>
                <p class="text-xs text-gray-300 mt-2 font-light">${item.desc}</p>
            </div>

            <div class="space-y-3">
                <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-brand-gold to-amber-500 transition-all duration-500" style="width: ${percent}%"></div>
                </div>

                <button onclick="castVote('${item.id}')" ${userHasVoted ? 'disabled' : ''} class="w-full py-2.5 rounded-xl font-bold text-xs ${userHasVoted ? (isUserChoice ? 'bg-brand-gold text-black cursor-default' : 'bg-white/5 text-gray-500 cursor-not-allowed') : 'bg-white/10 hover:bg-brand-gold hover:text-black text-white'} transition">
                    ${userHasVoted ? (isUserChoice ? 'Ваш вибір ✓' : 'Ви вже проголосували') : 'Проголосувати'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function castVote(optionId) {
    if (!state.currentUser) {
        openAuthModal('register');
        showToast('Авторизація', 'Будь ласка, увійдіть або зареєструйтесь для голосування.');
        return;
    }

    if (state.currentUser.hasVoted) {
        showToast('Увага', 'Ви вже проголосували за фільм у цьому тижні!');
        return;
    }

    state.votes[optionId] = (state.votes[optionId] || 0) + 1;
    state.currentUser.hasVoted = true;
    state.currentUser.votedOption = optionId;
    renderVotingSection();
    updateUserUI();
    showToast('Дякуємо!', 'Ваш голос успішно зараховано!');
}

/* HALL & FAQ LOGIC */
function selectHallZone(title, desc) {
    setTxt('zone-title', title);
    setTxt('zone-desc', desc);
}

function renderFAQ() {
    const container = getEl('faq-container');
    if (!container) return;
    container.innerHTML = '';

    faqData.forEach((item, index) => {
        const faqEl = document.createElement('div');
        faqEl.className = "glass-panel rounded-2xl border border-white/5 overflow-hidden transition";
        faqEl.innerHTML = `
            <button onclick="toggleFAQ(${index})" class="w-full p-5 text-left font-semibold text-white flex justify-between items-center text-sm">
                <span>${item.q}</span>
                <i id="faq-icon-${index}" class="fa-solid fa-chevron-down text-brand-gold transition-transform duration-300"></i>
            </button>
            <div id="faq-ans-${index}" class="hidden p-5 pt-0 text-xs text-gray-300 leading-relaxed border-t border-white/5">
                ${item.a}
            </div>
        `;
        container.appendChild(faqEl);
    });
}

function toggleFAQ(index) {
    toggleCls(`faq-ans-${index}`, 'hidden');
    toggleCls(`faq-icon-${index}`, 'rotate-180');
}

/* BOOKING MODAL LOGIC */
function renderSeatsGrid() {
    const container = getEl('seats-grid-container');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 1; i <= 24; i++) {
        const btn = document.createElement('button');
        const isOccupied = i === 3 || i === 8 || i === 15; 
        
        btn.className = `p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center ${
            isOccupied 
                ? 'bg-gray-800/50 border-gray-700 text-gray-600 cursor-not-allowed' 
                : 'bg-white/5 border-white/10 text-white hover:border-brand-gold'
        }`;
        btn.innerHTML = `<i class="fa-solid fa-couch text-sm mb-1"></i>#${i}`;
        
        if (!isOccupied) {
            btn.onclick = () => selectSeat(i, btn);
        }
        container.appendChild(btn);
    }
}

function selectSeat(seatNum, btnEl) {
    document.querySelectorAll('#seats-grid-container button').forEach(b => {
        if (!b.classList.contains('cursor-not-allowed')) {
            b.classList.remove('bg-brand-gold', 'text-black', 'border-brand-gold');
            b.classList.add('bg-white/5', 'text-white');
        }
    });

    state.selectedSeat = seatNum;
    btnEl.classList.remove('bg-white/5', 'text-white');
    btnEl.classList.add('bg-brand-gold', 'text-black', 'border-brand-gold');
    updateBookingTotal();
}

function updateBookingTotal() {
    const popcornInput = getEl('popcorn-checkbox');
    const popcorn = popcornInput ? popcornInput.checked : false;
    const basePrice = 200;
    const total = basePrice + (popcorn ? 80 : 0);
    setTxt('booking-total-price', `${total} грн`);
}

function openBookingModal(title, date) {
    if (!state.currentUser) {
        openAuthModal('register');
        showToast('Авторизація', 'Увійдіть або зареєструйтесь для бронювання квитків!');
        return;
    }

    if (state.currentUser.ticket) {
        showToast('Вже заброньовано', `Ви вже маєте квиток на "${state.currentUser.ticket.movie}".`);
        switchTab('profile');
        return;
    }

    state.bookingMovie = { title, date };
    setTxt('modal-movie-title', title);
    setTxt('modal-movie-date', date);
    remCls('booking-modal', 'hidden');
}

function closeBookingModal() {
    addCls('booking-modal', 'hidden');
}

function confirmSeatBooking() {
    if (!state.selectedSeat) {
        showToast('Оберіть місце', 'Будь ласка, оберіть пуф чи диван на карті залу.');
        return;
    }

    if (!state.currentUser) {
        closeBookingModal();
        openAuthModal('register');
        return;
    }

    if (state.currentUser.ticket) {
        closeBookingModal();
        showToast('Увага', 'Ви вже маєте заброньоване місце!');
        switchTab('profile');
        return;
    }

    // Save ticket to state
    state.currentUser.ticket = {
        movie: state.bookingMovie.title,
        date: state.bookingMovie.date,
        seat: `Ряд ${Math.ceil(state.selectedSeat / 6)}, Місце #${state.selectedSeat}`,
        code: `CV-${Math.floor(1000 + Math.random() * 9000)}-2026`
    };

    closeBookingModal();
    updateUserUI();
    switchTab('profile');
    showToast('Успішно!', 'Ваш квиток успішно заброньовано!');
}

function cancelBooking() {
    if (state.currentUser && state.currentUser.ticket) {
        state.currentUser.ticket = null;
        updateUserUI();
        showToast('Скасовано', 'Бронювання вашого квитка скасовано.');
    }
}

/* AUTH MODAL & LOGIC */
function openAuthModal(mode) {
    state.authMode = mode;
    const isReg = mode === 'register';

    clearAuthErrors();

    setTxt('auth-modal-title', isReg ? "Реєстрація у CineVerse" : "Вхід у CineVerse");
    toggleCls('field-name', 'hidden', !isReg);
    toggleCls('field-genres', 'hidden', !isReg);
    setTxt('auth-submit-btn', isReg ? "Зареєструватися" : "Увійти");
    setTxt('auth-toggle-prompt', isReg ? "Вже є акаунт?" : "Ще не з нами?");
    setTxt('auth-toggle-btn', isReg ? "Увійти" : "Зареєструватися");

    remCls('auth-modal', 'hidden');
}

function closeAuthModal() {
    addCls('auth-modal', 'hidden');
    clearAuthErrors();
}

function toggleAuthMode() {
    openAuthModal(state.authMode === 'login' ? 'register' : 'login');
}

function clearAuthErrors() {
    addCls('auth-error-msg', 'hidden');
    setTxt('auth-error-msg', '');
    addCls('err-name', 'hidden');
    addCls('err-email', 'hidden');
    addCls('err-password', 'hidden');
}

function toggleGenreTag(btn) {
    btn.classList.toggle('bg-brand-gold');
    btn.classList.toggle('text-black');
    btn.classList.toggle('bg-white/5');
    btn.classList.toggle('text-gray-300');
}

function handleAuthSubmit(e) {
    e.preventDefault();
    clearAuthErrors();

    const emailInput = getEl('input-email');
    const passInput = getEl('input-password');
    const nameInput = getEl('input-name');

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passInput ? passInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Email validation
    if (!email || !emailRegex.test(email)) {
        remCls('err-email', 'hidden');
        isValid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
        remCls('err-password', 'hidden');
        isValid = false;
    }

    if (state.authMode === 'register') {
        // Name validation
        const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]{3,}$/;
        if (!name || !nameRegex.test(name) || name.split(' ').filter(Boolean).length < 1) {
            remCls('err-name', 'hidden');
            isValid = false;
        }

        if (!isValid) return;

        // Check if email exists
        const existingUser = state.usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            setTxt('auth-error-msg', 'Користувач з такою поштою вже існує! Увійдіть.');
            remCls('auth-error-msg', 'hidden');
            return;
        }

        // Register fresh user
        const newUser = {
            name: name,
            email: email,
            password: password,
            genres: ["🎭 Драма", "🎨 Артхаус"],
            ticket: null,
            hasVoted: false,
            votedOption: null,
            wishlist: [
                { id: Date.now(), title: 'Париж, Техас (1984)', director: 'Вім Вендерс • Драма', status: 'want' }
            ]
        };

        state.usersDatabase.push(newUser);
        state.currentUser = newUser;

        closeAuthModal();
        updateUserUI();
        renderVotingSection();
        showToast('Вітаємо!', `Новий акаунт створено. Раді бачити вас, ${newUser.name}!`);

    } else {
        // LOGIN MODE
        if (!isValid) return;

        const user = state.usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!user) {
            setTxt('auth-error-msg', 'Невірна електронна пошта або пароль!');
            remCls('auth-error-msg', 'hidden');
            return;
        }

        state.currentUser = user;
        closeAuthModal();
        updateUserUI();
        renderVotingSection();
        showToast('Успішний вхід!', `З поверненням, ${user.name}!`);
    }
}

function logoutUser() {
    state.currentUser = null;
    updateUserUI();
    renderVotingSection();
    showToast('Вихід', 'Ви успішно вийшли з акаунту.');
}

function updateUserUI() {
    const loggedIn = !!state.currentUser;
    toggleCls('profile-logged-out', 'hidden', loggedIn);
    toggleCls('profile-logged-in', 'hidden', !loggedIn);

    if (loggedIn) {
        setTxt('profile-user-name', state.currentUser.name);
        setTxt('profile-user-email', state.currentUser.email);
        setTxt('user-avatar-badge', state.currentUser.name.substring(0, 2).toUpperCase());

        setTxt('stat-screenings', state.currentUser.ticket ? '1' : '0');
        setTxt('stat-votes', state.currentUser.hasVoted ? '1' : '0');

        // Header status
        setHTML('header-user-status', `
            <button onclick="switchTab('profile')" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold">
                <i class="fa-solid fa-user-check text-brand-gold"></i> ${state.currentUser.name.split(' ')[0]}
            </button>
            <button onclick="logoutUser()" class="p-2 text-gray-400 hover:text-brand-crimson text-sm" title="Вийти">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        `);

        if (state.currentUser.ticket) {
            addCls('ticket-empty-state', 'hidden');
            remCls('ticket-pass-card', 'hidden');

            setTxt('pass-movie-title', state.currentUser.ticket.movie);
            setTxt('pass-movie-date', state.currentUser.ticket.date);
            setTxt('pass-movie-seat', state.currentUser.ticket.seat);
            setTxt('pass-code-text', state.currentUser.ticket.code);
            generateQRCode(state.currentUser.ticket.code);

            remCls('badge-ticket-count', 'hidden');
            remCls('mobile-ticket-badge', 'hidden');
        } else {
            remCls('ticket-empty-state', 'hidden');
            addCls('ticket-pass-card', 'hidden');

            addCls('badge-ticket-count', 'hidden');
            addCls('mobile-ticket-badge', 'hidden');
        }
        
        renderWishlist();
    } else {
        setHTML('header-user-status', `
            <button onclick="openAuthModal('login')" class="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition">
                Увійти
            </button>
            <button onclick="openAuthModal('register')" class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-gold to-amber-600 text-black hover:brightness-110 shadow-lg shadow-brand-gold/20 transition transform hover:-translate-y-0.5">
                <i class="fa-solid fa-user-plus mr-1.5"></i>Приєднатися
            </button>
        `);
        addCls('badge-ticket-count', 'hidden');
        addCls('mobile-ticket-badge', 'hidden');
    }
}

/* QR CODE GENERATOR */
function generateQRCode(text) {
    const qrcodeContainer = getEl('qrcode');
    if (!qrcodeContainer) return;
    qrcodeContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrcodeContainer, {
            text: text,
            width: 110,
            height: 110,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}

/* WISHLIST LOGIC */
function switchWishlistTab(tab) {
    state.wishlistTab = tab;
    const wantBtn = getEl('wish-tab-want');
    const watchedBtn = getEl('wish-tab-watched');

    if (wantBtn && watchedBtn) {
        if (tab === 'want') {
            wantBtn.className = 'pb-3 text-brand-gold border-b-2 border-brand-gold font-bold';
            watchedBtn.className = 'pb-3 text-gray-400 hover:text-white';
        } else {
            watchedBtn.className = 'pb-3 text-brand-gold border-b-2 border-brand-gold font-bold';
            wantBtn.className = 'pb-3 text-gray-400 hover:text-white';
        }
    }
    renderWishlist();
}

function renderWishlist() {
    if (!state.currentUser) return;

    const container = getEl('wishlist-items-container');
    if (!container) return;
    container.innerHTML = '';

    const userWishlist = state.currentUser.wishlist || [];
    const items = userWishlist.filter(i => i.status === state.wishlistTab);
    
    setTxt('count-wishlist', userWishlist.filter(i => i.status === 'want').length);
    setTxt('count-watched', userWishlist.filter(i => i.status === 'watched').length);

    if (items.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-500 py-4 text-center">Список порожній</p>`;
        return;
    }

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = "p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs";
        
        el.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fa-solid ${item.status === 'want' ? 'fa-film text-gray-400' : 'fa-circle-check text-emerald-400'} text-base"></i>
                <div>
                    <span class="font-bold text-white block">${item.title}</span>
                    <span class="text-[10px] text-gray-400">${item.director}</span>
                </div>
            </div>

            <div class="flex items-center gap-2">
                ${item.status === 'want' ? `
                    <button onclick="markAsWatched(${item.id})" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-500 hover:text-white text-gray-300 text-[10px] transition">
                        Переглянуто
                    </button>
                ` : `
                    <span class="text-brand-gold"><i class="fa-solid fa-star"></i> 5/5</span>
                `}
                <button onclick="removeWishlistItem(${item.id})" class="text-gray-500 hover:text-brand-crimson p-1">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(el);
    });
}

function markAsWatched(id) {
    if (!state.currentUser) return;
    const item = state.currentUser.wishlist.find(i => i.id === id);
    if (item) {
        item.status = 'watched';
        renderWishlist();
        showToast('Переглянуто!', `Фільм "${item.title}" перенесено до переглянутих.`);
    }
}

function removeWishlistItem(id) {
    if (!state.currentUser) return;
    state.currentUser.wishlist = state.currentUser.wishlist.filter(i => i.id !== id);
    renderWishlist();
}

function openAddWishlistModal() {
    if (!state.currentUser) {
        openAuthModal('register');
        return;
    }
    remCls('wishlist-modal', 'hidden');
}

function closeWishlistModal() {
    addCls('wishlist-modal', 'hidden');
}

function saveWishlistItem() {
    const titleInput = getEl('input-wish-title');
    const directorInput = getEl('input-wish-director');

    const title = titleInput ? titleInput.value.trim() : '';
    const director = (directorInput && directorInput.value.trim()) || 'Класика';

    if (!title) return;

    state.currentUser.wishlist.push({
        id: Date.now(),
        title,
        director,
        status: 'want'
    });

    closeWishlistModal();
    renderWishlist();
    showToast('Додано!', 'Фільм додано до списку.');
}

/* TRAILER MODAL */
function playTrailer(url) {
    const iframe = getEl('trailer-iframe');
    if (iframe) iframe.src = url;
    remCls('trailer-modal', 'hidden');
}

function closeTrailerModal() {
    const iframe = getEl('trailer-iframe');
    if (iframe) iframe.src = '';
    addCls('trailer-modal', 'hidden');
}

/* TOAST NOTIFICATION HELPERS */
function showToast(title, message) {
    const toast = getEl('toast-notification');
    if (!toast) return;

    setTxt('toast-title', title);
    setTxt('toast-message', message);

    toast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3500);
}