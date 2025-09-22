// --- DOM Elements ---
const DOM = {
    header: {
        title: document.getElementById('header-title'),
        balance: document.getElementById('balance-header'),
        subHeaderText: document.getElementById('sub-header-text'),
        totalIncome: document.getElementById('total-income-header'),
    },
    pages: {
        dashboard: document.getElementById('page-dashboard'),
        businessDetails: document.getElementById('page-business-details'),
        market: document.getElementById('page-market'),
        casinoHub: document.getElementById('page-casino-hub'),
        casinoRoulette: document.getElementById('page-casino-roulette'),
        casinoBlackjack: document.getElementById('page-casino-blackjack'),
        casinoSlots: document.getElementById('page-casino-slots'),
        prestige: document.getElementById('page-prestige'),
        bank: document.getElementById('page-bank'),
        profile: document.getElementById('page-profile'),
    },
    dashboard: {
        tapButton: document.getElementById('tap-button'),
        tapPowerDisplay: document.getElementById('tap-power-display'),
        upgradeTapButton: document.getElementById('upgrade-tap-button'),
        businessesContainer: document.getElementById('businesses-container'),
        startTaxiBusinessButton: document.getElementById('start-taxi-business'),
        startRealEstateButton: document.getElementById('start-real-estate-business'),
        startLogisticsButton: document.getElementById('start-logistics-business'),
        startTechStartupButton: document.getElementById('start-tech-startup-business'),
        tapFeedbackContainer: document.getElementById('tap-feedback-container'),
    },
    businessDetails: {
        name: document.getElementById('business-details-name'),
        income: document.getElementById('business-details-income'),
        assetsContainer: document.getElementById('business-details-assets'),
        openAssetStoreBtn: document.getElementById('open-asset-store-btn'),
        backButton: document.getElementById('back-to-dashboard-btn'),
        getIntelButton: document.getElementById('get-intel-btn'),
        boostIndicator: document.getElementById('business-boost-indicator'),
    },
    casinoHub: {
        gameButtons: document.querySelectorAll('.casino-game-btn'),
    },
    casinoRoulette: {
        wheel: document.getElementById('roulette-wheel'),
        history: document.getElementById('roulette-history'),
        betAmountInput: document.getElementById('bet-amount-input'),
        betRedBtn: document.getElementById('bet-red-btn'),
        betGreenBtn: document.getElementById('bet-green-btn'),
        betBlackBtn: document.getElementById('bet-black-btn'),
    },
    casinoBlackjack: {
        dealerScore: document.getElementById('blackjack-dealer-score'),
        dealerHand: document.getElementById('blackjack-dealer-hand'),
        status: document.getElementById('blackjack-status'),
        playerScore: document.getElementById('blackjack-player-score'),
        playerHand: document.getElementById('blackjack-player-hand'),
        bettingControls: document.getElementById('blackjack-betting-controls'),
        gameControls: document.getElementById('blackjack-game-controls'),
        betInput: document.getElementById('blackjack-bet-input'),
        betBtn: document.getElementById('blackjack-bet-btn'),
        hitBtn: document.getElementById('blackjack-hit-btn'),
        standBtn: document.getElementById('blackjack-stand-btn'),
        newHandBtn: document.getElementById('blackjack-new-hand-btn'),
    },
    casinoSlots: {
        reels: [document.getElementById('slot-reel-1'), document.getElementById('slot-reel-2'), document.getElementById('slot-reel-3')],
        betInput: document.getElementById('slots-bet-input'),
        spinBtn: document.getElementById('slots-spin-btn'),
    },
    prestige: {
        currentLp: document.getElementById('prestige-current-lp'),
        currentBonus: document.getElementById('prestige-current-bonus'),
        nextLp: document.getElementById('prestige-next-lp'),
        nextBonus: document.getElementById('prestige-next-bonus'),
        reqNetworth: document.getElementById('req-networth'),
        reqYacht: document.getElementById('req-yacht'),
        buyYachtBtn: document.getElementById('buy-yacht-btn'),
        prestigeBtn: document.getElementById('prestige-btn'),
    },
    bank: {
        savingsBalance: document.getElementById('bank-savings-balance'),
        interestRate: document.getElementById('bank-interest-rate'),
        amountInput: document.getElementById('bank-amount-input'),
        depositBtn: document.getElementById('bank-deposit-btn'),
        withdrawBtn: document.getElementById('bank-withdraw-btn'),
        debtBalance: document.getElementById('bank-debt-balance'),
        creditLimit: document.getElementById('bank-credit-limit'),
        loanAmountInput: document.getElementById('loan-amount-input'),
        repayInput: document.getElementById('loan-repay-input'),
        repayBtn: document.getElementById('loan-repay-btn'),
        takeLoanBtn: document.getElementById('take-loan-btn'),
    },
    profile: {
        netWorth: document.getElementById('profile-net-worth'),
        totalEarnings: document.getElementById('profile-total-earnings'),
        totalTaps: document.getElementById('profile-total-taps'),
        timePlayed: document.getElementById('profile-time-played'),
    },
    nav: {
        main: document.getElementById('main-nav'),
        buttons: document.querySelectorAll('.nav-btn'),
    },
    modals: {
        businessName: document.getElementById('business-name-modal'),
        businessNamePrompt: document.getElementById('business-name-prompt'),
        businessNameInput: document.getElementById('business-name-input'),
        confirmBusinessName: document.getElementById('confirm-business-name'),
        cancelBusinessName: document.getElementById('cancel-business-name'),
        suggestNameButton: document.getElementById('suggest-name-btn'),
        intel: document.getElementById('intel-modal'),
        intelContent: document.getElementById('intel-modal-content'),
        assetStore: document.getElementById('buy-asset-modal'),
        assetStoreList: document.getElementById('asset-store-list'),
        closeAssetStore: document.getElementById('close-asset-modal'),
    },
    toastContainer: document.getElementById('toast-container'),
};

// --- Game Config & State ---
const PRESTIGE_REQUIREMENTS = {
    NET_WORTH: 1_000_000_000,
    YACHT_COST: 500_000_000,
};

const BANK_SETTINGS = {
    SAVINGS_APR: 0.03,
    LOAN_APR: 0.10,
    CREDIT_LIMIT_MULTIPLIER: 0.2, // Can borrow up to 20% of net worth
};

const BUSINESS_TYPES = {
    TAXI: { 
        id: 'TAXI', name: 'Taxi Company', unlockCost: 500, 
        assetTypes: [
            { id: 'SEDAN', name: 'Used Sedan', cost: 1500, incomePerSecond: 0.25, mileagePerSecond: 0.083, maxOdometer: 150000, imageUrl: 'https://placehold.co/100x60/34d399/ffffff?text=Sedan' },
            { id: 'SUV', name: 'Luxury SUV', cost: 8000, incomePerSecond: 1.10, mileagePerSecond: 0.1, maxOdometer: 250000, imageUrl: 'https://placehold.co/100x60/10b981/ffffff?text=SUV' },
            { id: 'EV', name: 'Electric Car', cost: 15000, incomePerSecond: 2.50, mileagePerSecond: 0.05, maxOdometer: 400000, imageUrl: 'https://placehold.co/100x60/059669/ffffff?text=EV' }
        ]
    },
    REAL_ESTATE: { 
        id: 'REAL_ESTATE', name: 'Real Estate Firm', unlockCost: 50000, 
        assetTypes: [
            { id: 'APARTMENT', name: 'Apartment', cost: 75000, incomePerSecond: 5, maintenanceCostPerSecond: 0.5, imageUrl: 'https://placehold.co/100x60/a855f7/ffffff?text=Apt' }
        ]
    },
    LOGISTICS: {
        id: 'LOGISTICS', name: 'Logistics Company', unlockCost: 500000,
        assetTypes: [
            { id: 'VAN', name: 'Delivery Van', cost: 40000, incomePerSecond: 15, mileagePerSecond: 0.2, maxOdometer: 500000, imageUrl: 'https://placehold.co/100x60/fdba74/ffffff?text=Van' },
            { id: 'TRUCK', name: 'Semi-Truck', cost: 120000, incomePerSecond: 40, mileagePerSecond: 0.3, maxOdometer: 1000000, imageUrl: 'https://placehold.co/100x60/f97316/ffffff?text=Truck' }
        ]
    },
    TECH_STARTUP: {
        id: 'TECH_STARTUP', name: 'Tech Startup', unlockCost: 10000000,
        assetTypes: [
            { id: 'SERVER', name: 'Server Rack', cost: 2000000, incomePerSecond: 10, imageUrl: 'https://placehold.co/100x60/0ea5e9/ffffff?text=Server' }
        ]
    }
};

const initialGameState = {
    balance: 0,
    tapPower: 1,
    tapUpgradeCost: 100,
    businesses: [],
    portfolio: {},
    rouletteHistory: [],
    hasYacht: false,
    savingsBalance: 0,
    loan: { principal: 0, remaining: 0 },
    stats: {
        totalEarnings: 0,
        totalTaps: 0,
        timePlayed: 0,
    }
};

let gameState = {
    ...JSON.parse(JSON.stringify(initialGameState)), // Deep copy
    legacyPoints: 0,
    newsHeadlines: [],
    currentPage: 'dashboard',
    currentBusinessView: null,
};

let businessToStart = { type: null }; // Context for the business name modal

let marketData = {
    'GEC': { name: 'Global Energy Co.', price: 150.75, history: [150.75] },
    'TKN': { name: 'Techtron Inc.', price: 320.50, history: [320.50] },
    'FDF': { name: 'Food & Farm', price: 88.20, history: [88.20] },
    'RDR': { name: 'RideRush', price: 215.40, history: [215.40] },
};

let rouletteState = {
    isSpinning: false,
    wheelSequence: [],
};

let blackjackState = {};
let slotState = {
    isSpinning: false,
    reels: [
        ['💎', '💰', '💵', '🔔', '🍒', '💰', '🍒', '🔔', '💵', '🍒'],
        ['💰', '🔔', '💎', '🍒', '💵', '💰', '🍒', '💵', '🔔', '🍒'],
        ['💵', '🍒', '💰', '🔔', '💎', '🍒', '💰', '🔔', '💵', '🍒']
    ],
    payouts: {
        '💎💎💎': 50,
        '💰💰💰': 20,
        '🔔🔔🔔': 10,
        '🍒🍒': 2,
        '🍒': 1,
    }
};

// --- Gemini API Call ---
async function callGemini(prompt, isJson = false) {
    const apiKey = ""; 
    const model = 'gemini-2.5-flash-preview-05-20';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    if (isJson) {
        payload.generationConfig = { responseMimeType: "application/json" };
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            console.error("API Error Response:", await response.text());
            return null;
        }
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
}

// --- All Functions ---

// Helper & UI
function formatCurrency(amount, fractions = 2) { return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: fractions, maximumFractionDigits: fractions }); }
function formatNumber(num) { return num.toLocaleString('en-US'); }

function navigateTo(pageId, context = null) {
    const camelCasePageId = pageId.replace(/-([a-z])/g, g => g[1].toUpperCase());
    
    Object.values(DOM.pages).forEach(p => {
        if(p) p.classList.add('page-hidden');
    });
    
    if(DOM.pages[camelCasePageId]) {
        DOM.pages[camelCasePageId].classList.remove('page-hidden');
    }
    
    gameState.currentPage = pageId;
    gameState.currentBusinessView = (pageId === 'businessDetails' && context?.businessId) ? context.businessId : null;
    
    DOM.nav.buttons.forEach(btn => {
        const btnPage = btn.dataset.page;
        const isCasinoPage = pageId.startsWith('casino-');

        if ((isCasinoPage && btnPage === 'casino-hub') || (btnPage === pageId)) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('text-gray-400');
        }
    });
    
    renderUI();
}

function showToast(message, type = 'info') {
    const color = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    const toast = document.createElement('div');
    toast.className = `toast ${color} text-white font-bold py-2 px-4 rounded-lg shadow-lg mb-2`;
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function showFloatingText(text, event) {
    const rect = DOM.dashboard.tapButton.getBoundingClientRect();
    const el = document.createElement('div');
    el.textContent = text;
    el.className = 'absolute font-bold text-blue-300 text-2xl animate-ping-fade-out pointer-events-none';
    // Position relative to the game container, not the viewport
    el.style.left = `${event.clientX - rect.left}px`;
    el.style.top = `${event.clientY - rect.top}px`;
    DOM.dashboard.tapFeedbackContainer.appendChild(el);
    setTimeout(() => { el.remove(); }, 1000);
}

// Game Logic
function handleTap(event) {
    const prestigeMultiplier = 1 + (gameState.legacyPoints * 0.02);
    const tapValue = gameState.tapPower * prestigeMultiplier;
    gameState.balance += tapValue;
    gameState.stats.totalEarnings += tapValue;
    gameState.stats.totalTaps++;
    updateBalanceDisplay();
    showFloatingText(`+${formatCurrency(tapValue)}`, event);
}

function upgradeTap() {
    if (gameState.balance >= gameState.tapUpgradeCost) {
        gameState.balance -= gameState.tapUpgradeCost;
        gameState.tapPower += 1 + Math.floor(gameState.tapPower * 0.1); // Increase by 1 + 10%
        gameState.tapUpgradeCost *= 1.5;
        renderUI();
    }
}

function startBusiness(businessType) {
    const typeInfo = BUSINESS_TYPES[businessType];
    if (gameState.balance >= typeInfo.unlockCost) {
        businessToStart.type = businessType; // Set context for the modal confirm button
        DOM.modals.businessName.classList.remove('hidden');
        DOM.modals.businessNameInput.value = '';
        DOM.modals.businessNameInput.focus();
        DOM.modals.businessNamePrompt.textContent = `Give your new ${typeInfo.name} a name!`;
    }
}

async function suggestBusinessName() {
    if (!businessToStart.type) return;
    const btn = DOM.modals.suggestNameButton;
    const input = DOM.modals.businessNameInput;
    btn.disabled = true;
    input.value = "Generating...";
    
    const prompt = `Suggest a cool and creative name for a new ${BUSINESS_TYPES[businessToStart.type].name} in a business tycoon game. The name should be short and catchy. Just return the name, nothing else.`;
    const suggestedName = await callGemini(prompt);

    if (suggestedName) {
        input.value = suggestedName.replace(/"/g, '').trim();
    } else {
        input.value = "Apex Ventures"; // Fallback
    }
    btn.disabled = false;
}

async function getBusinessIntel() {
    const business = gameState.businesses.find(b => b.id === gameState.currentBusinessView);
    if (!business) return;

    DOM.modals.intel.classList.remove('hidden');
    DOM.modals.intelContent.innerHTML = '<div class="spinner mx-auto"></div><p class="mt-4 text-gray-300">Analyzing Market Data...</p>';

    const prompt = `Generate a fictional business opportunity for a company named "${business.customName}" which is a ${BUSINESS_TYPES[business.type].name.toLowerCase()} business in a tycoon game. The response must be a JSON object with keys: "title" (string), "description" (string), and "options" (an array of two objects, each with "text" (string), "effect" (one of 'cash_gain', 'cash_loss', 'income_boost'), and "value" (a number)). For income_boost, value should be a multiplier like 1.5 or 2. For cash effects, value should be a monetary amount.`;
    
    const resultText = await callGemini(prompt, true);
    
    if (resultText) {
        try {
            const intel = JSON.parse(resultText);
            DOM.modals.intelContent.innerHTML = `
                <h3 class="text-2xl font-bold text-blue-300 mb-4">${intel.title}</h3>
                <p class="text-gray-300 mb-6">${intel.description}</p>
                <div class="space-y-3" id="intel-options"></div>
                <button id="close-intel-modal" class="mt-6 text-sm text-gray-400 hover:text-white">Close</button>
            `;
            intel.options.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.className = `w-full ${index === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-bold py-2 px-4 rounded-lg`;
                btn.textContent = opt.text;
                btn.onclick = () => applyIntelEffect(opt.effect, opt.value, business.id);
                document.getElementById('intel-options').appendChild(btn);
            });
            document.getElementById('close-intel-modal').onclick = () => DOM.modals.intel.classList.add('hidden');
        } catch (e) {
             DOM.modals.intelContent.innerHTML = `<p class="text-red-400">Could not parse intel data.</p><button id="close-intel-modal" class="mt-4 bg-gray-600 p-2 rounded">Close</button>`;
             document.getElementById('close-intel-modal').onclick = () => DOM.modals.intel.classList.add('hidden');
        }
    } else {
         DOM.modals.intelContent.innerHTML = `<p class="text-red-400">Failed to get intel from the network.</p><button id="close-intel-modal" class="mt-4 bg-gray-600 p-2 rounded">Close</button>`;
         document.getElementById('close-intel-modal').onclick = () => DOM.modals.intel.classList.add('hidden');
    }
}

function applyIntelEffect(effect, value, businessId) {
    const business = gameState.businesses.find(b => b.id === businessId);
    if (!business) return;

    switch(effect) {
        case 'cash_gain':
            gameState.balance += value;
            gameState.stats.totalEarnings += value;
            showToast(`You gained ${formatCurrency(value)}!`, 'success');
            break;
        case 'cash_loss':
            gameState.balance -= value;
            showToast(`You lost ${formatCurrency(value)}.`, 'error');
            break;
        case 'income_boost':
            business.boost = { multiplier: value, timeLeft: 60 }; // 60 second boost
            showToast(`${business.customName} income boosted by ${value}x for 60s!`, 'info');
            break;
    }
    DOM.modals.intel.classList.add('hidden');
    renderUI();
}

function buyAsset(businessId, assetTypeId) {
    const business = gameState.businesses.find(b => b.id === businessId);
    if (!business) return;
    
    const businessTypeInfo = BUSINESS_TYPES[business.type];
    const assetType = businessTypeInfo.assetTypes.find(at => at.id === assetTypeId);

    if (gameState.balance >= assetType.cost) {
        gameState.balance -= assetType.cost;
        business.assets.push({ id: Date.now() + Math.random(), assetTypeId: assetTypeId, odometer: 0 });
        showToast(`Purchased ${assetType.name}!`, 'success');
        openAssetStoreModal(); // Refresh modal
        renderUI();
    } else {
        showToast('Not enough cash!', 'error');
    }
}

function replaceAsset(businessId, assetId) {
    const business = gameState.businesses.find(b => b.id === businessId);
    if (!business) return;
    const assetIndex = business.assets.findIndex(a => a.id === assetId);
    if(assetIndex === -1) return;

    const asset = business.assets[assetIndex];
    const businessTypeInfo = BUSINESS_TYPES[business.type];
    const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
    
    if (gameState.balance >= assetType.cost) {
        gameState.balance -= assetType.cost;
        business.assets[assetIndex].odometer = 0;
        showToast(`${assetType.name} replaced!`, 'info');
        renderUI();
    }
}

// Market
function fluctuateStocks() {
    for (const ticker in marketData) {
        const stock = marketData[ticker];
        const changePercent = (Math.random() - 0.49) * 0.1; // -4.9% to +5.1% change
        const changeAmount = stock.price * changePercent;
        stock.price += changeAmount;
        if (stock.price < 5) stock.price = 5; // Floor price
        
        stock.history.push(stock.price);
        if (stock.history.length > 2) stock.history.shift();
    }
    if (gameState.currentPage === 'market') {
        renderMarket();
    }
}

function buyStock(ticker, amount) {
    if (isNaN(amount) || amount <= 0) return;
    const price = marketData[ticker].price * amount;
    if (gameState.balance >= price) {
        gameState.balance -= price;
        gameState.portfolio[ticker] = (gameState.portfolio[ticker] || 0) + amount;
        showToast(`Bought ${amount} ${ticker} shares`, 'success');
        renderUI();
    }
}

function sellStock(ticker, amount) {
    if (isNaN(amount) || amount <= 0) return;
    const sharesOwned = gameState.portfolio[ticker] || 0;
    const amountToSell = Math.min(sharesOwned, amount);

    if (amountToSell > 0) {
        const price = marketData[ticker].price * amountToSell;
        gameState.balance += price;
        gameState.stats.totalEarnings += price; // Selling stock counts as earnings
        gameState.portfolio[ticker] -= amountToSell;
        if (gameState.portfolio[ticker] <= 0) delete gameState.portfolio[ticker];
        showToast(`Sold ${amountToSell} ${ticker} shares`, 'info');
        renderUI();
    }
}

// Casino: Roulette
function generateRouletteSequence() {
    const sequence = [];
    for (let i = 0; i < 100; i++) {
        const rand = Math.random();
        if (rand < 0.05) sequence.push('green'); // 5% for green
        else if (rand < 0.525) sequence.push('red'); // 47.5% for red
        else sequence.push('black'); // 47.5% for black
    }
    rouletteState.wheelSequence = sequence;
}

function renderRouletteWheel() {
    DOM.casinoRoulette.wheel.innerHTML = '';
    rouletteState.wheelSequence.forEach(color => {
        const tile = document.createElement('div');
        tile.className = `w-24 h-24 flex-shrink-0 ${
            color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-800' : color === 'green' ? 'bg-gradient-to-br from-emerald-500 to-green-700' : 'bg-gradient-to-br from-gray-700 to-gray-900'
        }`;
        DOM.casinoRoulette.wheel.appendChild(tile);
    });
}

function spinRoulette(betColor) {
    const betAmount = parseInt(DOM.casinoRoulette.betAmountInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        showToast("Please enter a valid bet amount.", "error");
        return;
    }
    if (gameState.balance < betAmount) {
        showToast("Not enough cash to place that bet.", "error");
        return;
    }
    if (rouletteState.isSpinning) {
        showToast("A spin is already in progress.", "error");
        return;
    }
    
    gameState.balance -= betAmount;
    rouletteState.isSpinning = true;
    renderUI();

    generateRouletteSequence();
    renderRouletteWheel();

    const targetIndex = rouletteState.wheelSequence.length - 8 + Math.floor(Math.random() * 5);
    const targetElement = DOM.casinoRoulette.wheel.children[targetIndex];
    const wheelWidth = DOM.casinoRoulette.wheel.scrollWidth;
    const targetPosition = targetElement.offsetLeft + targetElement.offsetWidth / 2;
    const containerWidth = DOM.casinoRoulette.wheel.parentElement.offsetWidth;
    const offset = targetPosition - containerWidth / 2;
    
    DOM.casinoRoulette.wheel.style.transform = `translateX(${-offset}px)`;

    setTimeout(() => {
        const winningColor = rouletteState.wheelSequence[targetIndex];
        let winnings = 0;
        let payout = 0;

        if (winningColor === betColor) {
            if (betColor === 'green') {
                payout = 14;
            } else {
                payout = 2;
            }
            winnings = betAmount * payout;
            gameState.balance += winnings;
            gameState.stats.totalEarnings += winnings;
            showToast(`You won ${formatCurrency(winnings)} on ${winningColor}!`, 'success');
        } else {
            showToast(`You lost. The color was ${winningColor}.`, 'error');
        }
        
        gameState.rouletteHistory.unshift(winningColor);
        if(gameState.rouletteHistory.length > 10) gameState.rouletteHistory.pop();

        rouletteState.isSpinning = false;
        renderUI();
    }, 4100);
}

// Casino: Blackjack
function updateBlackjackControls() {
    const hasDeck = !!blackjackState.deck;
    const isGameOver = blackjackState.gameOver;

    DOM.casinoBlackjack.bettingControls.classList.toggle('hidden', hasDeck);
    DOM.casinoBlackjack.gameControls.classList.toggle('hidden', !hasDeck || isGameOver);
    DOM.casinoBlackjack.newHandBtn.classList.toggle('hidden', !isGameOver);
}

function createDeck() {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    hand.forEach(card => {
        score += getCardValue(card);
        if (card.value === 'A') aces++;
    });
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function startBlackjack() {
    const betAmount = Number(DOM.casinoBlackjack.betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) { showToast("Please enter a valid bet amount.", "error"); return; }
    if (gameState.balance < betAmount) { showToast("Not enough cash to place that bet.", "error"); return; }

    gameState.balance -= betAmount;
    
    blackjackState = {
        deck: createDeck(),
        playerHand: [],
        dealerHand: [],
        bet: betAmount,
        gameOver: false,
        status: 'Your Turn',
    };

    // Deal cards
    blackjackState.playerHand.push(blackjackState.deck.pop());
    blackjackState.dealerHand.push(blackjackState.deck.pop());
    blackjackState.playerHand.push(blackjackState.deck.pop());
    blackjackState.dealerHand.push(blackjackState.deck.pop());
    
    if (calculateScore(blackjackState.playerHand) === 21) {
        blackjackState.status = 'Blackjack!';
        endBlackjackHand(true); 
    }
    renderUI();
}

function blackjackHit() {
    if (blackjackState.gameOver) return;
    blackjackState.playerHand.push(blackjackState.deck.pop());
    
    if (calculateScore(blackjackState.playerHand) > 21) {
        blackjackState.status = 'Bust!';
        endBlackjackHand();
    }
    renderUI();
}

function blackjackStand() {
    if (blackjackState.gameOver) return;
    dealerPlay();
}

function dealerPlay() {
    while (calculateScore(blackjackState.dealerHand) < 17) {
        blackjackState.dealerHand.push(blackjackState.deck.pop());
    }
    endBlackjackHand();
}

function endBlackjackHand(isPlayerBlackjack = false) {
    blackjackState.gameOver = true;
    let playerWon = false;
    let isPush = false;
    const playerScore = calculateScore(blackjackState.playerHand);
    const dealerScore = calculateScore(blackjackState.dealerHand);

    if (isPlayerBlackjack) {
        playerWon = true;
        blackjackState.status = "Blackjack!";
    } else if (playerScore > 21) {
        playerWon = false;
        blackjackState.status = "You Bust!";
    } else if (dealerScore > 21) {
        playerWon = true;
        blackjackState.status = "Dealer Busts!";
    } else if (playerScore > dealerScore) {
        playerWon = true;
        blackjackState.status = "You Win!";
    } else if (playerScore === dealerScore) {
         isPush = true;
         blackjackState.status = "Push!";
    } else {
        playerWon = false;
        blackjackState.status = "Dealer Wins!";
    }
    
    if (playerWon) {
        const winnings = isPlayerBlackjack ? blackjackState.bet * 2.5 : blackjackState.bet * 2;
        gameState.balance += winnings;
        gameState.stats.totalEarnings += winnings;
        showToast(`You won ${formatCurrency(winnings)}`, 'success');
    } else if (isPush) {
        gameState.balance += blackjackState.bet;
        showToast('Push! Bet returned.', 'info');
    } else {
         showToast(`You lost ${formatCurrency(blackjackState.bet)}`, 'error');
    }
    
    renderUI();
}

function resetBlackjack() {
    blackjackState = {};
    DOM.casinoBlackjack.status.textContent = 'Place Your Bet';
    renderUI();
}

// Casino: Slots
function startSlots() {
    const betAmount = Number(DOM.casinoSlots.betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        showToast("Please enter a valid bet amount.", "error");
        return;
    }
    if (gameState.balance < betAmount) {
        showToast("Not enough cash to place that bet.", "error");
        return;
    }
    if (slotState.isSpinning) return;

    gameState.balance -= betAmount;
    slotState.isSpinning = true;
    slotState.bet = betAmount;
    renderUI();

    let intervals = [];
    DOM.casinoSlots.reels.forEach((reel, i) => {
        reel.classList.add('spinning');
        intervals[i] = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * slotState.reels[i].length);
            reel.textContent = slotState.reels[i][randomIndex];
        }, 100);
    });

    setTimeout(() => stopReel(0, intervals), 1000);
    setTimeout(() => stopReel(1, intervals), 2000);
    setTimeout(() => stopReel(2, intervals), 3000);
}

function stopReel(index, intervals) {
    clearInterval(intervals[index]);
    DOM.casinoSlots.reels[index].classList.remove('spinning');
    const finalIndex = Math.floor(Math.random() * slotState.reels[index].length);
    DOM.casinoSlots.reels[index].textContent = slotState.reels[index][finalIndex];

    if (index === 2) {
        calculateSlotWinnings();
        slotState.isSpinning = false;
        renderUI();
    }
}

function calculateSlotWinnings() {
    const result = [
        DOM.casinoSlots.reels[0].textContent,
        DOM.casinoSlots.reels[1].textContent,
        DOM.casinoSlots.reels[2].textContent
    ];
    const resultString = result.join('');
    
    let winnings = 0;
    
    if (result[0] === result[1] && result[1] === result[2]) {
        winnings = slotState.payouts[resultString] * slotState.bet || 0;
    } else {
        const cherryCount = result.filter(s => s === '🍒').length;
        if (cherryCount === 2) {
            winnings = slotState.payouts['🍒🍒'] * slotState.bet;
        } else if (cherryCount === 1) {
            winnings = slotState.payouts['🍒'] * slotState.bet;
        }
    }

    if (winnings > 0) {
        gameState.balance += winnings;
        gameState.stats.totalEarnings += winnings;
        showToast(`You won ${formatCurrency(winnings)}!`, 'success');
    } else {
        showToast('You lost. Try again!', 'error');
    }
}

// Bank
function depositSavings(amount) {
    if (amount > 0 && gameState.balance >= amount) {
        gameState.balance -= amount;
        gameState.savingsBalance += amount;
        showToast(`Deposited ${formatCurrency(amount)}`, 'success');
        renderUI();
    }
}

function withdrawSavings(amount) {
     if (amount > 0 && gameState.savingsBalance >= amount) {
        gameState.savingsBalance -= amount;
        gameState.balance += amount;
        showToast(`Withdrew ${formatCurrency(amount)}`, 'info');
        renderUI();
    }
}

function takeLoan(amount) {
    const creditLimit = getNetWorth() * BANK_SETTINGS.CREDIT_LIMIT_MULTIPLIER;
    if (amount > 0 && gameState.loan.principal === 0 && amount <= creditLimit) {
        gameState.balance += amount;
        gameState.loan.principal = amount;
        gameState.loan.remaining = amount * (1 + BANK_SETTINGS.LOAN_APR);
        showToast(`Loan of ${formatCurrency(amount)} received!`, 'success');
        renderUI();
    } else if (amount > creditLimit) {
        showToast(`You can only borrow up to your credit limit of ${formatCurrency(creditLimit)}`, 'error');
    } else if (gameState.loan.principal > 0) {
        showToast(`You must repay your existing loan first.`, 'error');
    }
}


function repayLoan(amount) {
    if (amount > 0 && gameState.balance >= amount && gameState.loan.remaining > 0) {
        const payment = Math.min(amount, gameState.loan.remaining);
        gameState.balance -= payment;
        gameState.loan.remaining -= payment;
        showToast(`Repaid ${formatCurrency(payment)} of your loan.`, 'info');
        if (gameState.loan.remaining <= 0) {
            gameState.loan = { principal: 0, remaining: 0 };
             showToast(`Loan fully repaid!`, 'success');
        }
        renderUI();
    }
}

// Prestige
function getNetWorth() {
    let assetValue = 0;
    gameState.businesses.forEach(biz => {
        const businessTypeInfo = BUSINESS_TYPES[biz.type];
        biz.assets.forEach(asset => {
            const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
            assetValue += assetType.cost;
        });
    });
    let stockValue = 0;
    for (const ticker in gameState.portfolio) {
        stockValue += (gameState.portfolio[ticker] || 0) * (marketData[ticker].price || 0);
    }
    return gameState.balance + gameState.savingsBalance + assetValue + stockValue - gameState.loan.remaining;
}

function buyYacht() {
    if (gameState.balance >= PRESTIGE_REQUIREMENTS.YACHT_COST && !gameState.hasYacht) {
        gameState.balance -= PRESTIGE_REQUIREMENTS.YACHT_COST;
        gameState.hasYacht = true;
        showToast("Luxury Yacht purchased! You're ready to retire in style.", "success");
        renderUI();
    }
}

function prestige() {
    const netWorth = getNetWorth();
    if (netWorth >= PRESTIGE_REQUIREMENTS.NET_WORTH && gameState.hasYacht) {
        const legacyPointsEarned = 1; // Simplified for now
        gameState.legacyPoints += legacyPointsEarned;
        
        // Reset game state but keep prestige-related stats
        const prestigeData = {
            legacyPoints: gameState.legacyPoints,
            stats: gameState.stats, // Carry over stats
        };
        const newGameState = {
            ...JSON.parse(JSON.stringify(initialGameState)),
            ...prestigeData,
        };
        newGameState.stats.totalEarnings = gameState.stats.totalEarnings; // Keep total earnings
        gameState = newGameState;

        showToast(`Prestiged! You earned ${legacyPointsEarned} Legacy Point(s).`, "success");
        navigateTo('dashboard');
    } else {
        showToast("You have not met all prestige requirements.", "error");
    }
}

// --- UI Rendering ---
function updateBalanceDisplay() {
    DOM.header.balance.textContent = formatCurrency(gameState.balance);
}

function renderUI() {
    updateBalanceDisplay();
    
    const pageRenderers = {
        dashboard: renderDashboard,
        businessDetails: renderBusinessDetails,
        market: renderMarket,
        "casino-hub": () => { DOM.header.title.textContent = 'Casino'; DOM.header.subHeaderText.innerHTML = `High Risk, High Reward`; },
        "casino-roulette": renderCasinoRoulette,
        "casino-blackjack": renderBlackjack,
        "casino-slots": renderSlots,
        prestige: renderPrestige,
        bank: renderBank,
        profile: renderProfile,
    };
    const pageId = gameState.currentPage;

    if(pageRenderers[pageId]) {
        pageRenderers[pageId]();
    }
}

function renderDashboard() {
    DOM.header.title.textContent = 'Dashboard';
    let totalIncomePerHour = 0;
    let totalMaintenancePerHour = 0;
    const prestigeMultiplier = 1 + (gameState.legacyPoints * 0.02);


    gameState.businesses.forEach(biz => {
        const businessTypeInfo = BUSINESS_TYPES[biz.type];
        const multiplier = biz.boost ? biz.boost.multiplier : 1;
        biz.assets.forEach(asset => {
            const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
            switch(biz.type) {
                case 'TAXI':
                case 'LOGISTICS':
                     if (asset.odometer < assetType.maxOdometer) {
                         totalIncomePerHour += assetType.incomePerSecond * 3600 * multiplier;
                    }
                    break;
                default:
                    totalIncomePerHour += (assetType.incomePerSecond || 0) * 3600 * multiplier;
                    totalMaintenancePerHour += (assetType.maintenanceCostPerSecond || 0) * 3600;
            }
        });
    });
    
    const netIncome = (totalIncomePerHour * prestigeMultiplier) - totalMaintenancePerHour;
    const netIncomeColor = netIncome >= 0 ? 'text-green-500' : 'text-red-500';
    DOM.header.subHeaderText.innerHTML = `Net Income: <span id="total-income-header" class="${netIncomeColor}">${formatCurrency(netIncome)}/hr</span>`;

    DOM.dashboard.tapPowerDisplay.textContent = `${formatCurrency(gameState.tapPower * prestigeMultiplier)}/tap`;
    DOM.dashboard.upgradeTapButton.textContent = `Upgrade Tap (${formatCurrency(gameState.tapUpgradeCost)})`;
    DOM.dashboard.upgradeTapButton.disabled = gameState.balance < gameState.tapUpgradeCost;
    DOM.dashboard.upgradeTapButton.classList.toggle('opacity-50', gameState.balance < gameState.tapUpgradeCost);
    
    // Manage start business buttons
    Object.values(BUSINESS_TYPES).forEach(type => {
        const btnId = `start-${type.id.toLowerCase().replace('_', '-')}-business`;
        const btn = document.getElementById(btnId);
        if (!btn) return;
        
        const hasBusiness = gameState.businesses.some(b => b.type === type.id);
        btn.disabled = gameState.balance < type.unlockCost || hasBusiness;
        btn.classList.toggle('opacity-50', gameState.balance < type.unlockCost || hasBusiness);
        
        if(hasBusiness) {
            btn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${type.name} Founded`;
        } else {
             // This is a bit fragile, might be better to rebuild the button's inner HTML
            const textNode = Array.from(btn.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
            if (textNode) {
                textNode.textContent = ` Start ${type.name} (${formatCurrency(type.unlockCost, 0)})`;
            }
        }
    });

    DOM.dashboard.businessesContainer.innerHTML = '';
    if (gameState.businesses.length === 0) {
         DOM.dashboard.businessesContainer.innerHTML = `<div class="text-center text-gray-400 py-10">You have no businesses. Start one below!</div>`;
    } else {
        gameState.businesses.forEach(biz => {
            const businessTypeInfo = BUSINESS_TYPES[biz.type];
            const multiplier = biz.boost ? biz.boost.multiplier : 1;
            let income = 0;
            let maintenance = 0;
            biz.assets.forEach(asset => {
                const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
                switch(biz.type) {
                    case 'TAXI':
                    case 'LOGISTICS':
                        if (asset.odometer < assetType.maxOdometer) {
                            income += assetType.incomePerSecond * 3600 * multiplier;
                        }
                        break;
                    default:
                          income += (assetType.incomePerSecond || 0) * 3600 * multiplier;
                          maintenance += (assetType.maintenanceCostPerSecond || 0) * 3600;
                }
            });

            const net = (income * prestigeMultiplier) - maintenance;
            const netColor = net >= 0 ? 'text-green-400' : 'text-red-400';

            const card = document.createElement('div');
            card.className = 'bg-gray-700/50 p-4 rounded-xl shadow-lg hover:bg-gray-700 transition duration-200 cursor-pointer';
            card.onclick = () => navigateTo('businessDetails', { businessId: biz.id });
            card.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-bold text-yellow-300">${biz.customName}</h3>
                        <p class="text-sm text-gray-300">${biz.assets.length} Asset(s)</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold ${netColor}">${formatCurrency(net)}/hr ${biz.boost ? '<span class="text-blue-400 animate-pulse">(BOOST!)</span>' : ''}</p>
                        <svg class="w-6 h-6 text-gray-400 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </div>
            `;
            DOM.dashboard.businessesContainer.appendChild(card);
        });
    }
}

function renderBusinessDetails() {
    const business = gameState.businesses.find(b => b.id === gameState.currentBusinessView);
    if (!business) { navigateTo('dashboard'); return; }

    const businessTypeInfo = BUSINESS_TYPES[business.type];
    const prestigeMultiplier = 1 + (gameState.legacyPoints * 0.02);
    const multiplier = (business.boost ? business.boost.multiplier : 1);
    
    let totalIncome = 0;
    let totalMaintenance = 0;

    business.assets.forEach(asset => {
        const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
        switch(business.type) {
            case 'TAXI':
            case 'LOGISTICS':
                if (asset.odometer < assetType.maxOdometer) {
                    totalIncome += assetType.incomePerSecond * 3600 * multiplier;
                }
                break;
            default:
                totalIncome += (assetType.incomePerSecond || 0) * 3600 * multiplier;
                totalMaintenance += (assetType.maintenanceCostPerSecond || 0) * 3600;
        }
    });
    
    const netIncome = (totalIncome * prestigeMultiplier) - totalMaintenance;

    DOM.businessDetails.name.textContent = business.customName;
    DOM.businessDetails.income.textContent = formatCurrency(netIncome);
    DOM.businessDetails.boostIndicator.textContent = business.boost ? `(BOOST! ${business.boost.timeLeft}s)` : '';

    DOM.businessDetails.assetsContainer.innerHTML = '';
    
    if (business.assets.length === 0) {
        DOM.businessDetails.assetsContainer.innerHTML = `<div class="text-center text-gray-400 py-10">No assets yet. Buy one below to start earning!</div>`;
    } else {
        business.assets.forEach((asset, index) => {
            const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
            const assetCard = document.createElement('div');
            assetCard.className = `bg-gray-900 p-3 rounded-lg flex items-center justify-between`;
            
            let assetHtml = '';
            switch(business.type) {
                 case 'TAXI':
                 case 'LOGISTICS':
                    const isBroken = asset.odometer >= assetType.maxOdometer;
                    const odometerPercentage = Math.min(100, (asset.odometer / assetType.maxOdometer) * 100);
                    assetCard.classList.toggle('opacity-60', isBroken);
                    assetHtml = `
                        <img src="${assetType.imageUrl}" alt="${assetType.name}" class="w-16 h-12 object-cover rounded-md bg-gray-700 mr-3">
                        <div class="flex-grow">
                            <p class="font-semibold">${assetType.name} #${index + 1}</p>
                            <div class="w-full bg-gray-600 rounded-full h-2.5 mt-1">
                                <div class="progress-bar-inner ${isBroken ? 'bg-red-600' : 'bg-yellow-400'} h-2.5 rounded-full" style="width: ${odometerPercentage}%"></div>
                            </div>
                            <p class="text-xs text-gray-400 mt-1">${formatNumber(Math.floor(asset.odometer))} / ${formatNumber(assetType.maxOdometer)} km</p>
                        </div>
                        <div class="text-right ml-3 w-28">
                        ${isBroken ? `
                            <button onclick="replaceAsset(${business.id}, ${asset.id})" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 text-sm rounded-lg transition duration-200 ${gameState.balance < assetType.cost ? 'opacity-50' : ''}" ${gameState.balance < assetType.cost ? 'disabled' : ''}>
                                Replace<br>(${formatCurrency(assetType.cost, 0)})
                            </button>
                        ` : `<p class="font-bold text-green-400">+${formatCurrency(assetType.incomePerSecond*3600*multiplier*prestigeMultiplier)}/hr</p>`}
                        </div>
                    `;
                    break;
                default:
                    assetHtml = `
                        <img src="${assetType.imageUrl}" alt="${assetType.name}" class="w-16 h-12 object-cover rounded-md bg-gray-700 mr-3">
                        <div class="flex-grow">
                            <p class="font-semibold">${assetType.name} #${index + 1}</p>
                            <p class="text-sm text-green-400">Income: ${formatCurrency(assetType.incomePerSecond * 3600 * multiplier * prestigeMultiplier)}/hr</p>
                            ${assetType.maintenanceCostPerSecond ? `<p class="text-sm text-red-400">Maint: ${formatCurrency(assetType.maintenanceCostPerSecond * 3600)}/hr</p>` : ''}
                        </div>
                        <div class="text-right ml-3 w-28">
                            <p class="font-bold text-yellow-400">Net<br>${formatCurrency((assetType.incomePerSecond * multiplier * prestigeMultiplier - (assetType.maintenanceCostPerSecond || 0)) * 3600)}/hr</p>
                        </div>
                    `;
                    break;
            }
            assetCard.innerHTML = assetHtml;
            DOM.businessDetails.assetsContainer.appendChild(assetCard);
        });
    }
}

function renderMarket() {
    DOM.header.title.textContent = 'Stock Market';
    let portfolioValue = 0;
    for (const ticker in gameState.portfolio) {
        portfolioValue += (gameState.portfolio[ticker] || 0) * (marketData[ticker].price || 0);
    }
    DOM.header.subHeaderText.innerHTML = `Portfolio Value: <span class="text-green-500">${formatCurrency(portfolioValue)}</span>`;

    DOM.pages.market.innerHTML = '';
    for (const ticker in marketData) {
        const stock = marketData[ticker];
        const prevPrice = stock.history.length > 1 ? stock.history[0] : stock.price;
        const change = stock.price - prevPrice;
        const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
        const changeSign = change >= 0 ? '▲' : '▼';
        
        const sharesOwned = gameState.portfolio[ticker] || 0;
        const sellButtonsDisabled = sharesOwned < 1;

        const card = document.createElement('div');
        card.className = 'bg-gray-700/50 p-4 rounded-xl shadow-lg';
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold text-yellow-300">${ticker}</h3>
                    <p class="text-sm text-gray-300">${stock.name}</p>
                    <p class="text-xs text-gray-400">Owned: ${formatNumber(sharesOwned)}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-2xl">${formatCurrency(stock.price)}</p>
                    <p class="${changeColor}">${changeSign} ${formatCurrency(Math.abs(change))}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 mt-4">
                 <input type="number" id="stock-amount-${ticker}" class="bg-gray-800 text-white rounded-md px-2 py-1 w-20 text-center" value="1" min="1">
                 <button onclick="buyStock('${ticker}', document.getElementById('stock-amount-${ticker}').valueAsNumber)" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition text-sm">Buy</button>
                 <button onclick="sellStock('${ticker}', document.getElementById('stock-amount-${ticker}').valueAsNumber)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition text-sm ${sellButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${sellButtonsDisabled ? 'disabled' : ''}>Sell</button>
                 <button onclick="sellStock('${ticker}', ${sharesOwned})" class="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-1 px-3 rounded transition text-sm ${sellButtonsDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${sellButtonsDisabled ? 'disabled' : ''}>Sell All</button>
            </div>
        `;
        DOM.pages.market.appendChild(card);
    }
}

function openAssetStoreModal() {
    const business = gameState.businesses.find(b => b.id === gameState.currentBusinessView);
    if (!business) return;
    const businessTypeInfo = BUSINESS_TYPES[business.type];

    DOM.modals.assetStoreList.innerHTML = '';
    businessTypeInfo.assetTypes.forEach(assetType => {
        const canAfford = gameState.balance >= assetType.cost;
        const item = document.createElement('div');
        item.className = 'bg-gray-800 p-3 rounded-lg flex gap-4 items-center';
        let detailsHtml = '';
        
        switch(business.type) {
            case 'TAXI':
            case 'LOGISTICS':
                 detailsHtml = `<p class="text-sm text-green-400">Income: ${formatCurrency(assetType.incomePerSecond * 3600)}/hr</p>
                             <p class="text-xs text-gray-400">Durability: ${formatNumber(assetType.maxOdometer)} km</p>`;
                break;
            default:
                 detailsHtml = `<p class="text-sm text-green-400">Income: ${formatCurrency(assetType.incomePerSecond * 3600)}/hr</p>
                              ${assetType.maintenanceCostPerSecond ? `<p class="text-sm text-red-400">Maint: ${formatCurrency(assetType.maintenanceCostPerSecond * 3600)}/hr</p>` : ''}`;
                break;
        }

        item.innerHTML = `
            <img src="${assetType.imageUrl}" alt="${assetType.name}" class="w-24 h-16 object-cover rounded-md bg-gray-700">
            <div class="flex-grow">
                <h4 class="font-bold text-lg">${assetType.name}</h4>
                ${detailsHtml}
            </div>
            <button onclick="buyAsset(${business.id}, '${assetType.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${!canAfford ? 'opacity-50 cursor-not-allowed' : ''}" ${!canAfford ? 'disabled' : ''}>
                ${formatCurrency(assetType.cost)}
            </button>
        `;
        DOM.modals.assetStoreList.appendChild(item);
    });
    DOM.modals.assetStore.classList.remove('hidden');
}

function renderCasinoRoulette() {
     DOM.header.title.textContent = 'Roulette';
     DOM.header.subHeaderText.innerHTML = `High Risk, High Reward`;
    
    // Render history
    DOM.casinoRoulette.history.innerHTML = '';
    gameState.rouletteHistory.forEach(color => {
        const tile = document.createElement('div');
        const colorClass = color === 'red' ? 'bg-red-600 border-red-400' : color === 'green' ? 'bg-green-600 border-green-400' : 'bg-gray-600 border-gray-400';
        tile.className = `w-6 h-6 rounded-full ${colorClass} border-2 shadow-inner`;
        DOM.casinoRoulette.history.appendChild(tile);
    });
    
    // Disable buttons during spin
    document.querySelectorAll('#page-casino-roulette .bet-btn').forEach(btn => {
        btn.disabled = rouletteState.isSpinning;
        btn.classList.toggle('opacity-50', rouletteState.isSpinning);
    });
}

function renderBlackjack() {
    DOM.header.title.textContent = 'Blackjack';
    DOM.header.subHeaderText.innerHTML = `Beat the Dealer`;

    updateBlackjackControls();

    if (!blackjackState.deck) {
        DOM.casinoBlackjack.dealerHand.innerHTML = '';
        DOM.casinoBlackjack.playerHand.innerHTML = '';
        DOM.casinoBlackjack.dealerScore.textContent = '0';
        DOM.casinoBlackjack.playerScore.textContent = '0';
        return;
    }

    DOM.casinoBlackjack.status.textContent = blackjackState.status;

    // Render Hands
    const createCardElement = (card, isHidden = false) => {
        if (isHidden) {
            return `<div class="playing-card card-back"></div>`;
        }
        const colorClass = ['♥', '♦'].includes(card.suit) ? 'card-red' : 'card-black';
        return `<div class="playing-card ${colorClass}"><span>${card.value}${card.suit}</span><span class="self-end rotate-180">${card.value}${card.suit}</span></div>`;
    };

    DOM.casinoBlackjack.dealerHand.innerHTML = blackjackState.dealerHand.map((card, i) => createCardElement(card, i === 0 && !blackjackState.gameOver)).join('');
    DOM.casinoBlackjack.playerHand.innerHTML = blackjackState.playerHand.map(card => createCardElement(card)).join('');

    // Render Scores
    DOM.casinoBlackjack.playerScore.textContent = calculateScore(blackjackState.playerHand);
    DOM.casinoBlackjack.dealerScore.textContent = blackjackState.gameOver ? calculateScore(blackjackState.dealerHand) : (blackjackState.dealerHand[1] ? getCardValue(blackjackState.dealerHand[1]) : 0);
}

function renderSlots() {
    DOM.header.title.textContent = 'Slots';
    DOM.header.subHeaderText.innerHTML = `High Risk, High Reward`;
    DOM.casinoSlots.spinBtn.disabled = slotState.isSpinning;
    DOM.casinoSlots.spinBtn.classList.toggle('opacity-50', slotState.isSpinning);
}

function renderPrestige() {
    DOM.header.title.textContent = 'Prestige';
    DOM.header.subHeaderText.innerHTML = `Endgame`;

    const netWorth = getNetWorth();
    const incomeBonus = gameState.legacyPoints * 2;
    const canPrestige = netWorth >= PRESTIGE_REQUIREMENTS.NET_WORTH && gameState.hasYacht;

    DOM.prestige.currentLp.textContent = formatNumber(gameState.legacyPoints);
    DOM.prestige.currentBonus.textContent = `+${incomeBonus}%`;
    
    const nextLp = 1; // simplified
    DOM.prestige.nextLp.textContent = `+${nextLp} LP`;
    DOM.prestige.nextBonus.textContent = `+${incomeBonus + (nextLp * 2)}%`;
    
    // Requirements
    const netWorthMet = netWorth >= PRESTIGE_REQUIREMENTS.NET_WORTH;
    DOM.prestige.reqNetworth.children[1].textContent = `${formatCurrency(netWorth, 0)} / ${formatCurrency(PRESTIGE_REQUIREMENTS.NET_WORTH, 0)}`;
    DOM.prestige.reqNetworth.children[1].className = `font-semibold ${netWorthMet ? 'text-green-400' : 'text-red-400'}`;
    
    DOM.prestige.reqYacht.children[1].textContent = gameState.hasYacht ? 'Yes' : 'No';
    DOM.prestige.reqYacht.children[1].className = `font-semibold ${gameState.hasYacht ? 'text-green-400' : 'text-red-400'}`;

    // Buttons
    DOM.prestige.buyYachtBtn.disabled = gameState.hasYacht || gameState.balance < PRESTIGE_REQUIREMENTS.YACHT_COST;
    DOM.prestige.buyYachtBtn.classList.toggle('opacity-50', DOM.prestige.buyYachtBtn.disabled);
    if(gameState.hasYacht) DOM.prestige.buyYachtBtn.textContent = "Yacht Purchased";

    DOM.prestige.prestigeBtn.disabled = !canPrestige;
    DOM.prestige.prestigeBtn.classList.toggle('opacity-50', !canPrestige);
}

function renderBank() {
    DOM.header.title.textContent = 'Bank';
    DOM.header.subHeaderText.innerHTML = `Manage Your Capital`;
    
    const creditLimit = getNetWorth() * BANK_SETTINGS.CREDIT_LIMIT_MULTIPLIER;

    DOM.bank.savingsBalance.textContent = formatCurrency(gameState.savingsBalance);
    DOM.bank.debtBalance.textContent = formatCurrency(gameState.loan.remaining);
    DOM.bank.creditLimit.textContent = formatCurrency(creditLimit, 0);

    DOM.bank.takeLoanBtn.disabled = gameState.loan.principal > 0;
    DOM.bank.takeLoanBtn.classList.toggle('opacity-50', DOM.bank.takeLoanBtn.disabled);
}

function renderProfile() {
    DOM.header.title.textContent = 'Profile';
    DOM.header.subHeaderText.innerHTML = `Career Statistics`;
    
    DOM.profile.netWorth.textContent = formatCurrency(getNetWorth(), 0);
    DOM.profile.totalEarnings.textContent = formatCurrency(gameState.stats.totalEarnings, 0);
    DOM.profile.totalTaps.textContent = formatNumber(gameState.stats.totalTaps);

    const time = gameState.stats.timePlayed;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    DOM.profile.timePlayed.textContent = `${hours}h ${minutes}m ${seconds}s`;
}

// --- Game Loop & Save/Load ---
function gameLoop() {
    let totalIncomePerSecond = 0;
    let totalMaintenancePerSecond = 0;
    const prestigeMultiplier = 1 + (gameState.legacyPoints * 0.02);

    gameState.businesses.forEach(business => {
        const businessTypeInfo = BUSINESS_TYPES[business.type];
        let incomeMultiplier = (business.boost && business.boost.timeLeft > 0) ? business.boost.multiplier : 1;
        
        if (business.boost && business.boost.timeLeft > 0) {
            business.boost.timeLeft--;
        } else if (business.boost) {
            business.boost = null;
        }

        business.assets.forEach(asset => {
            const assetType = businessTypeInfo.assetTypes.find(at => at.id === asset.assetTypeId);
            
            switch (business.type) {
                case 'TAXI':
                case 'LOGISTICS':
                    if (asset.odometer < assetType.maxOdometer) {
                        asset.odometer += assetType.mileagePerSecond;
                        totalIncomePerSecond += assetType.incomePerSecond * incomeMultiplier;
                    } else {
                        asset.odometer = assetType.maxOdometer;
                    }
                    break;
                default:
                    totalIncomePerSecond += (assetType.incomePerSecond || 0) * incomeMultiplier;
                    totalMaintenancePerSecond += (assetType.maintenanceCostPerSecond || 0);
                    break;
            }
        });
    });
    
    // Bank interest (savings and debt)
    const savingsInterestPerSecond = gameState.savingsBalance * (BANK_SETTINGS.SAVINGS_APR / 31536000); // per second
    gameState.savingsBalance += savingsInterestPerSecond;
    
    const loanInterestPerSecond = gameState.loan.principal * (BANK_SETTINGS.LOAN_APR / 31536000);
    gameState.loan.remaining += loanInterestPerSecond;

    const incomeThisTick = (totalIncomePerSecond * prestigeMultiplier);
    gameState.balance += incomeThisTick - totalMaintenancePerSecond;
    gameState.stats.totalEarnings += Math.max(0, incomeThisTick - totalMaintenancePerSecond); // only count positive income
    gameState.stats.timePlayed++;

    if (gameState.balance < 0) gameState.balance = 0;
    
    // More efficient UI updates
    if (['dashboard', 'businessDetails', 'bank', 'prestige', 'profile'].includes(gameState.currentPage)) {
         renderUI(); 
    } else {
        updateBalanceDisplay(); 
    }
}

function saveGame() { 
    try {
        localStorage.setItem('tycoonClickerSave_v12', JSON.stringify(gameState));
    } catch (e) {
        console.error("Failed to save game:", e);
    }
}
function loadGame() {
    const savedGame = localStorage.getItem('tycoonClickerSave_v12');
    if (savedGame) {
        try {
            const loaded = JSON.parse(savedGame);
             // A safe way to load, ensuring new properties aren't missing from saved state
             const tempState = JSON.parse(JSON.stringify(initialGameState));
             const mergedStats = { ...tempState.stats, ...loaded.stats };
             gameState = { ...tempState, ...loaded, stats: mergedStats };
        } catch(e) {
            console.error("Failed to load saved game:", e);
            gameState = JSON.parse(JSON.stringify(initialGameState)); // Start fresh on load error
        }
    }
}

// --- Initialization ---
function init() {
    // Navigation
    DOM.nav.buttons.forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.page)));
    DOM.businessDetails.backButton.addEventListener('click', () => navigateTo('dashboard'));

    // Modals
    DOM.businessDetails.openAssetStoreBtn.addEventListener('click', openAssetStoreModal);
    DOM.modals.closeAssetStore.addEventListener('click', () => DOM.modals.assetStore.classList.add('hidden'));
    
    // Business Name Modal (cleaner logic)
    DOM.modals.confirmBusinessName.addEventListener('click', () => {
        if (!businessToStart.type) return;
        const typeInfo = BUSINESS_TYPES[businessToStart.type];
        const businessName = DOM.modals.businessNameInput.value.trim() || `My ${typeInfo.name}`;
        gameState.balance -= typeInfo.unlockCost;
        gameState.businesses.push({ id: Date.now(), type: businessToStart.type, customName: businessName, assets: [], boost: null });
        DOM.modals.businessName.classList.add('hidden');
        businessToStart.type = null; // Reset context
        renderUI();
    });
    DOM.modals.cancelBusinessName.addEventListener('click', () => {
        DOM.modals.businessName.classList.add('hidden');
        businessToStart.type = null; // Reset context
    });
    if (DOM.modals.suggestNameButton) {
        DOM.modals.suggestNameButton.addEventListener('click', suggestBusinessName);
    }


    // Dashboard
    DOM.dashboard.tapButton.addEventListener('click', handleTap);
    DOM.dashboard.upgradeTapButton.addEventListener('click', upgradeTap);
    DOM.dashboard.startTaxiBusinessButton.addEventListener('click', () => startBusiness('TAXI'));
    DOM.dashboard.startRealEstateButton.addEventListener('click', () => startBusiness('REAL_ESTATE'));
    DOM.dashboard.startLogisticsButton.addEventListener('click', () => startBusiness('LOGISTICS'));
    DOM.dashboard.startTechStartupButton.addEventListener('click', () => startBusiness('TECH_STARTUP'));
    DOM.businessDetails.getIntelButton.addEventListener('click', getBusinessIntel);
    
    // Casino listeners
    document.querySelectorAll('.casino-game-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.page)));
    document.querySelectorAll('.casino-back-btn').forEach(btn => btn.addEventListener('click', () => navigateTo('casino-hub')));
    DOM.casinoRoulette.betRedBtn.addEventListener('click', () => spinRoulette('red'));
    DOM.casinoRoulette.betGreenBtn.addEventListener('click', () => spinRoulette('green'));
    DOM.casinoRoulette.betBlackBtn.addEventListener('click', () => spinRoulette('black'));
    DOM.casinoBlackjack.betBtn.addEventListener('click', startBlackjack);
    DOM.casinoBlackjack.hitBtn.addEventListener('click', blackjackHit);
    DOM.casinoBlackjack.standBtn.addEventListener('click', blackjackStand);
    DOM.casinoBlackjack.newHandBtn.addEventListener('click', resetBlackjack);
    DOM.casinoSlots.spinBtn.addEventListener('click', startSlots);

     // Prestige listeners
    DOM.prestige.buyYachtBtn.addEventListener('click', buyYacht);
    DOM.prestige.prestigeBtn.addEventListener('click', prestige);

    // Bank listeners
    DOM.bank.depositBtn.addEventListener('click', () => depositSavings(Number(DOM.bank.amountInput.value)));
    DOM.bank.withdrawBtn.addEventListener('click', () => withdrawSavings(Number(DOM.bank.amountInput.value)));
    DOM.bank.takeLoanBtn.addEventListener('click', () => takeLoan(Number(DOM.bank.loanAmountInput.value)));
    DOM.bank.repayBtn.addEventListener('click', () => repayLoan(Number(DOM.bank.repayInput.value)));

    loadGame();
    generateRouletteSequence();
    renderRouletteWheel();
    navigateTo(gameState.currentPage || 'dashboard');
    
    setInterval(fluctuateStocks, 2000); // Update stock prices every 2 seconds
    setInterval(gameLoop, 1000);
    setInterval(saveGame, 5000);
}

// --- Start the game ---
document.addEventListener('DOMContentLoaded', init);
