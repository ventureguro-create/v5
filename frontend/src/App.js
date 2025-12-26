import { useEffect, useState, useRef, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ==================== LANGUAGE CONTEXT ====================
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  // English only - no language switching
  const [language] = useState('en');

  const toggleLanguage = () => {
    // Disabled - English only
  };

  const setLanguage = () => {
    // Disabled - English only
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ==================== TRANSLATIONS ====================
const translations = {
  ru: {
    // Navigation
    nav: {
      home: "Главная",
      about: "О нас",
      platform: "Платформа",
      roadmap: "Дорожная карта",
      evolution: "Эволюция",
      team: "Команда",
      partners: "Партнёры",
      faq: "FAQ",
      launch: "Запустить платформу"
    },
    // Hero Section
    hero: {
      badge: "Сейчас в Beta v1.1",
      titleLine1: "Будущее",
      titleLine2: "Крипто Аналитики",
      subtitle: "Откройте для себя комплексную платформу, объединяющую социальное взаимодействие, аналитику данных и доступ к крипто-проектам, NFT и многому другому.",
      cta: "Изучить платформу",
      buyNft: "Купить NFT",
      stats: {
        activeUsers: "Активных пользователей",
        tradingVolume: "Объём торгов",
        nftCollection: "NFT Коллекция"
      },
      portfolio: "Портфель",
      volume24h: "Объём 24ч"
    },
    // About Section
    about: {
      badge: "О платформе",
      title: "Инновационная экосистема крипто-аналитики",
      subtitle: "FOMO — это передовая платформа, объединяющая искусственный интеллект, блокчейн-технологии и глубокую аналитику данных для предоставления беспрецедентных инсайтов в мире криптовалют."
    },
    // Platform Section
    platformOverview: {
      badge: "Обзор платформы",
      title: "Мощные инструменты для успешной торговли",
      subtitle: "Комплексное решение для анализа и принятия решений",
      vsLastMonth: "за последний месяц",
      trackedTokens: "отслеживаемых токенов",
      detectedToday: "обнаружено сегодня"
    },
    // Projects Section
    projects: {
      badge: "Наши проекты",
      title: "Инновационные решения",
      subtitle: "Откройте для себя наши передовые проекты в области криптоаналитики",
      learnMore: "Подробнее",
      viewAll: "Смотреть все"
    },
    // Evolution Section
    evolution: {
      badge: "Эволюция",
      title: "Развивайтесь вместе с нами",
      subtitle: "Повышайте свой статус в экосистеме FOMO и открывайте новые возможности",
      levels: "Уровни",
      badges: "Значки",
      nextLevel: "Следующий уровень:",
      howToEarn: "Как заработать:",
      clickToFlip: "Нажмите, чтобы перевернуть",
      clickToSeeConditions: "Нажмите, чтобы увидеть условия",
      earn: "Заработать",
      fomoScore: "FOMO Score",
      xpRequired: "Требуется XP"
    },
    // Team Section  
    team: {
      badge: "Наша команда",
      title: "Команда экспертов",
      subtitle: "Познакомьтесь с профессионалами, создающими будущее криптоаналитики",
      mainTeam: "Основная команда",
      teamMembers: "Члены команды"
    },
    // Partners Section
    partners: {
      badge: "Партнёры",
      title: "Наши партнёры и сотрудники",
      subtitle: "Работаем с ведущими компаниями в индустрии",
      tabs: {
        partners: "Партнёры",
        media: "Медиа",
        portfolio: "Портфолио"
      },
      search: "Поиск партнёров...",
      noResults: "Партнёры не найдены"
    },
    // Roadmap Section
    roadmap: {
      badge: "Дорожная карта",
      title: "Наш путь к успеху",
      subtitle: "Следите за нашим развитием и ключевыми этапами проекта",
      completed: "Завершено",
      inProgress: "В процессе",
      planned: "Запланировано"
    },
    // Community Section
    community: {
      badge: "Сообщество",
      title: "Присоединяйтесь к сообществу",
      subtitle: "Станьте частью глобальной крипто-революции",
      joinCommunity: "Присоединиться",
      emailPlaceholder: "Введите ваш email",
      subscribe: "Подписаться"
    },
    // FAQ Section
    faq: {
      badge: "Часто задаваемые вопросы",
      title: "Ответы на ваши вопросы",
      subtitle: "Найдите ответы на самые популярные вопросы о платформе"
    },
    // Footer
    footer: {
      description: "Передовая платформа крипто-аналитики с AI-алгоритмами",
      quickLinks: "Быстрые ссылки",
      community: "Сообщество",
      support: "Поддержка",
      legal: "Правовая информация",
      allRightsReserved: "Все права защищены",
      madeWith: "Сделано с",
      by: "командой",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      contactUs: "Связаться с нами"
    },
    // Buy NFT Modal
    buyNft: {
      title: "Стань частью",
      highlight: "#FOMO",
      subtitle: "Купите NFT из нашей коллекции и станьте важной частью проекта FOMO, объединяющего всё сообщество",
      specialOffer: "Наше специальное предложение для вас:",
      discount: "Покупка 3 NFT - скидка 10%",
      quantity: "Количество [1-3]",
      maxInfo: "Один адрес может купить максимум 3 NFT",
      price: "Цена [USDC]",
      discountApplied: "Скидка 10% применена!",
      approve: "Подтвердить",
      approving: "Подтверждение...",
      buy: "Купить NFT",
      processing: "Обработка...",
      connectWallet: "Подключите кошелёк для завершения покупки"
    },
    // Common
    common: {
      readMore: "Читать далее",
      learnMore: "Узнать больше",
      getStarted: "Начать",
      close: "Закрыть",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
      add: "Добавить",
      loading: "Загрузка...",
      page: "Страница",
      of: "из",
      search: "Поиск...",
      noData: "Нет данных",
      error: "Ошибка",
      downloadWhitepaper: "Скачать Whitepaper"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      platform: "Platform",
      roadmap: "Roadmap",
      evolution: "Evolution",
      team: "Team",
      partners: "Partners",
      faq: "FAQ",
      launch: "Launch Platform"
    },
    // Hero Section
    hero: {
      badge: "Now in Beta v1.1",
      titleLine1: "The Future of",
      titleLine2: "Crypto Analytics",
      subtitle: "Discover a comprehensive platform combining social engagement, data analytics, and seamless access to crypto projects, NFTs, and more.",
      cta: "Explore Platform",
      buyNft: "Buy NFT",
      stats: {
        activeUsers: "Active Users",
        tradingVolume: "Trading Volume",
        nftCollection: "NFT Collection"
      },
      portfolio: "Portfolio",
      volume24h: "Volume 24h"
    },
    // About Section
    about: {
      badge: "About Platform",
      title: "Innovative Crypto Analytics Ecosystem",
      subtitle: "FOMO is an advanced platform combining artificial intelligence, blockchain technology, and deep data analytics to provide unprecedented insights into the world of cryptocurrencies."
    },
    // Platform Section
    platformOverview: {
      badge: "Platform Overview",
      title: "Powerful Tools for Successful Trading",
      subtitle: "Comprehensive solution for analysis and decision making",
      vsLastMonth: "vs last month",
      trackedTokens: "tracked tokens",
      detectedToday: "detected today"
    },
    // Projects Section
    projects: {
      badge: "Our Projects",
      title: "Innovative Solutions",
      subtitle: "Discover our cutting-edge projects in crypto analytics",
      learnMore: "Learn More",
      viewAll: "View All"
    },
    // Evolution Section
    evolution: {
      badge: "Evolution",
      title: "Evolve With Us",
      subtitle: "Level up your status in the FOMO ecosystem and unlock new opportunities",
      levels: "Levels",
      badges: "Badges",
      nextLevel: "Next Level:",
      howToEarn: "How to earn:",
      clickToFlip: "Click to flip",
      clickToSeeConditions: "Click to see conditions",
      earn: "Earn",
      fomoScore: "FOMO Score",
      xpRequired: "XP Required"
    },
    // Team Section
    team: {
      badge: "Our Team",
      title: "Expert Team",
      subtitle: "Meet the professionals creating the future of crypto analytics",
      mainTeam: "Main Team",
      teamMembers: "Team Members"
    },
    // Partners Section
    partners: {
      badge: "Partners",
      title: "Our Partners and Collaborators",
      subtitle: "Working with industry-leading companies",
      tabs: {
        partners: "Partners",
        media: "Media",
        portfolio: "Portfolio"
      },
      search: "Search partners...",
      noResults: "No partners found"
    },
    // Roadmap Section
    roadmap: {
      badge: "Roadmap",
      title: "Our Path to Success",
      subtitle: "Follow our development and key milestones",
      completed: "Completed",
      inProgress: "In Progress",
      planned: "Planned"
    },
    // Community Section
    community: {
      badge: "Community",
      title: "Join Our Community",
      subtitle: "Become part of the global crypto revolution",
      joinCommunity: "Join Community",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe"
    },
    // FAQ Section
    faq: {
      badge: "Frequently Asked Questions",
      title: "Answers to Your Questions",
      subtitle: "Find answers to the most popular questions about the platform"
    },
    // Footer
    footer: {
      description: "Advanced crypto analytics platform with AI algorithms",
      quickLinks: "Quick Links",
      community: "Community",
      support: "Support",
      legal: "Legal",
      allRightsReserved: "All rights reserved",
      madeWith: "Made with",
      by: "by team",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      contactUs: "Contact Us"
    },
    // Buy NFT Modal
    buyNft: {
      title: "Become part of",
      highlight: "#FOMO",
      subtitle: "Buy a piece of our NFT collection to become an important part of FOMO project, uniting the entire community",
      specialOffer: "Our special offer for you:",
      discount: "Buying 3 NFT - 10% discount",
      quantity: "Quantity [1-3]",
      maxInfo: "One address can buy a maximum of 3 NFTs",
      price: "Price [USDC]",
      discountApplied: "10% discount applied!",
      approve: "Approve",
      approving: "Approving...",
      buy: "Buy NFT",
      processing: "Processing...",
      connectWallet: "Connect your wallet to complete the purchase"
    },
    // Common
    common: {
      readMore: "Read More",
      learnMore: "Learn More",
      getStarted: "Get Started",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      loading: "Loading...",
      page: "Page",
      of: "of",
      search: "Search...",
      noData: "No data",
      error: "Error",
      downloadWhitepaper: "Download Whitepaper"
    }
  }
};

// Helper hook to get translations
const useTranslation = () => {
  const { language } = useLanguage();
  return (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
};

// ==================== LANGUAGE CONFIGURATION ====================
// Default language - можно потом добавить переключатель
const DEFAULT_LANG = 'ru'; // 'ru' or 'en'

// Helper function to get field value based on current language (UPDATED to use context when available)
const getLangFieldWithContext = (obj, fieldName, lang) => {
  if (!obj) return '';
  // Try language-specific field first
  const langField = obj[`${fieldName}_${lang}`];
  if (langField) return langField;
  
  // Fallback to opposite language
  const fallbackLang = lang === 'ru' ? 'en' : 'ru';
  const fallbackField = obj[`${fieldName}_${fallbackLang}`];
  if (fallbackField) return fallbackField;
  
  // Last resort - return old field if exists
  return obj[fieldName] || '';
};

// Wrapper component that uses language context
const LangField = ({ obj, field }) => {
  const { language } = useLanguage();
  return getLangFieldWithContext(obj, field, language);
};

// For backward compatibility
const getLangField = getLangFieldWithContext;

// ==================== PROJECT DRAWER COMPONENT (Centered Carousel) ====================
const ProjectDrawer = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyle = (index, total) => {
    // Circular carousel effect - cards rotate around center
    const diff = index - currentIndex;
    const absIndex = ((diff % total) + total) % total;
    
    // Cards are arranged in a circle, but only show 3-5 at a time
    const maxVisible = Math.min(5, total);
    const angleStep = 15; // degrees between cards
    const baseSpread = isHovered ? 120 : 80; // horizontal spread
    
    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 0.85;
    let opacity = 0.7;
    let zIndex = 0;
    
    if (absIndex === 0) {
      // Front center card
      translateX = 0;
      translateZ = 0;
      rotateY = 0;
      scale = 1;
      opacity = 1;
      zIndex = 100;
    } else if (absIndex === 1) {
      // First right card
      translateX = baseSpread;
      translateZ = -100;
      rotateY = -angleStep;
      scale = 0.9;
      opacity = 0.85;
      zIndex = 90;
    } else if (absIndex === total - 1) {
      // First left card
      translateX = -baseSpread;
      translateZ = -100;
      rotateY = angleStep;
      scale = 0.9;
      opacity = 0.85;
      zIndex = 90;
    } else if (absIndex === 2) {
      // Second right card
      translateX = baseSpread * 1.5;
      translateZ = -200;
      rotateY = -angleStep * 1.5;
      scale = 0.8;
      opacity = 0.6;
      zIndex = 80;
    } else if (absIndex === total - 2) {
      // Second left card
      translateX = -baseSpread * 1.5;
      translateZ = -200;
      rotateY = angleStep * 1.5;
      scale = 0.8;
      opacity = 0.6;
      zIndex = 80;
    } else {
      // Hidden cards
      translateX = absIndex < total / 2 ? baseSpread * 2 : -baseSpread * 2;
      translateZ = -300;
      rotateY = absIndex < total / 2 ? -angleStep * 2 : angleStep * 2;
      scale = 0.7;
      opacity = 0;
      zIndex = 0;
    }
    
    return {
      transform: `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="drawer-empty">
        <p className="text-gray-500">Проекты скоро появятся</p>
      </div>
    );
  }

  return (
    <div 
      className="drawer-container-carousel" 
      data-testid="project-drawer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="drawer-carousel-stack">
        {cards.map((card, index) => (
          <a
            key={card.id || index}
            href={card.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-card-carousel"
            style={getCardStyle(index, cards.length)}
            onClick={(e) => {
              if (index !== currentIndex) {
                e.preventDefault();
                setCurrentIndex(index);
              }
            }}
            data-testid={`drawer-card-${index}`}
          >
            <div className="drawer-card-image-wrapper">
              {card.image_url ? (
                <img 
                  src={card.image_url.startsWith('/') ? `${BACKEND_URL}${card.image_url}` : card.image_url} 
                  alt={getLangField(card, 'title') || getLangField(card, 'name') || ''}
                  loading="lazy"
                />
              ) : (
                <div className="drawer-card-icon-fallback">
                  <span className="text-5xl">{card.icon || '📦'}</span>
                </div>
              )}
            </div>
            <div className="drawer-card-overlay-carousel">
              <div className="drawer-card-content-carousel">
                <span className="drawer-card-number-carousel">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="drawer-card-title-carousel">{getLangField(card, 'title') || getLangField(card, 'name') || ''}</h3>
                {card.count && <p className="drawer-card-count">{card.count} {getLangField(card, 'label') || ''}</p>}
                {index === currentIndex && (
                  <svg className="drawer-card-arrow-carousel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="drawer-controls">
        <button 
          onClick={prevCard} 
          className="drawer-nav-button drawer-nav-prev"
          aria-label="Previous card"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextCard} 
          className="drawer-nav-button drawer-nav-next"
          aria-label="Next card"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <p className="drawer-hint-carousel">Кликните на карточку для перехода • Стрелки для навигации</p>
      
      <div className="drawer-indicators">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`drawer-indicator ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== UNIFIED ADMIN PANEL ====================
const UnifiedAdminPanel = ({ isOpen, onClose, cards, team, platformSettings, roadmapData, partnersData, footerSettings, faqData, communitySettings, onCardsUpdate, onTeamUpdate, onPlatformUpdate, onRoadmapUpdate, onPartnersUpdate, onFooterUpdate, onFAQUpdate, onCommunityUpdate, onLogout, isFullPage = false }) => {
  const [activeTab, setActiveTab] = useState('projects');
  
  if (!isOpen) return null;

  // Full page mode - no overlay, embedded in page
  if (isFullPage) {
    return (
      <div className="admin-panel-fullpage" data-testid="unified-admin-panel">
        <div className="admin-tabs-horizontal">
          {[
            { id: 'analytics', icon: '📊', label: 'Analytics' },
            { id: 'projects', icon: '📦', label: 'Projects' },
            { id: 'team', icon: '👥', label: 'Team' },
            { id: 'platform', icon: '⚙️', label: 'Platform' },
            { id: 'roadmap', icon: '🗺️', label: 'Roadmap' },
            { id: 'partners', icon: '🤝', label: 'Partners' },
            { id: 'footer', icon: '📄', label: 'Footer' },
            { id: 'faq', icon: '❓', label: 'FAQ' },
            { id: 'community', icon: '🌐', label: 'Community' },
            { id: 'evolution', icon: '🚀', label: 'Evolution' },
            { id: 'hero', icon: '🎯', label: 'Hero/NFT' }
          ].map(tab => (
            <button 
              key={tab.id}
              className={`admin-tab-fullpage ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="admin-content-fullpage">
          {activeTab === 'analytics' && <AnalyticsAdminContent />}
          {activeTab === 'projects' && <ProjectsAdminContent cards={cards} onCardsUpdate={onCardsUpdate} />}
          {activeTab === 'team' && <TeamAdminContent team={team} onTeamUpdate={onTeamUpdate} />}
          {activeTab === 'platform' && <PlatformAdminContent platformSettings={platformSettings} onPlatformUpdate={onPlatformUpdate} />}
          {activeTab === 'roadmap' && <RoadmapAdminContent roadmapData={roadmapData} onRoadmapUpdate={onRoadmapUpdate} />}
          {activeTab === 'partners' && <PartnersAdminContent partnersData={partnersData} onPartnersUpdate={onPartnersUpdate} />}
          {activeTab === 'footer' && <FooterAdminContent footerSettings={footerSettings} onFooterUpdate={onFooterUpdate} />}
          {activeTab === 'faq' && <FAQAdminContent faqData={faqData} onFAQUpdate={onFAQUpdate} />}
          {activeTab === 'community' && <CommunityAdminContent communitySettings={communitySettings} onCommunityUpdate={onCommunityUpdate} />}
          {activeTab === 'evolution' && <EvolutionAdminContent onUpdate={() => {}} />}
          {activeTab === 'hero' && <HeroAdminContent />}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel admin-panel-unified" onClick={e => e.stopPropagation()} data-testid="unified-admin-panel">
        <div className="admin-header">
          <div className="admin-header-left">
            <h2>
              <img 
                src="/logo.svg" 
                alt="FOMO" 
                style={{ height: '24px', width: 'auto', verticalAlign: 'middle', marginRight: '8px' }}
              />
              Admin Panel
            </h2>
            <div className="admin-tabs">
              <button 
                className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                📦 Projects
              </button>
              <button 
                className={`admin-tab ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                👥 Team
              </button>
              <button 
                className={`admin-tab ${activeTab === 'platform' ? 'active' : ''}`}
                onClick={() => setActiveTab('platform')}
              >
                📊 Platform
              </button>
              <button 
                className={`admin-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
                onClick={() => setActiveTab('roadmap')}
              >
                🗺️ Roadmap
              </button>
              <button 
                className={`admin-tab ${activeTab === 'partners' ? 'active' : ''}`}
                onClick={() => setActiveTab('partners')}
              >
                🤝 Partners
              </button>
              <button 
                className={`admin-tab ${activeTab === 'footer' ? 'active' : ''}`}
                onClick={() => setActiveTab('footer')}
              >
                📄 Футер
              </button>
              <button 
                className={`admin-tab ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                ❓ FAQ
              </button>
              <button 
                className={`admin-tab ${activeTab === 'community' ? 'active' : ''}`}
                onClick={() => setActiveTab('community')}
              >
                🌐 Community
              </button>
              <button 
                className={`admin-tab ${activeTab === 'evolution' ? 'active' : ''}`}
                onClick={() => setActiveTab('evolution')}
              >
                Evolution
              </button>
              <button 
                className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
                onClick={() => setActiveTab('hero')}
              >
                Hero/NFT
              </button>
            </div>
          </div>
          <button onClick={onClose} className="admin-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {activeTab === 'projects' && (
          <ProjectsAdminContent 
            cards={cards} 
            onCardsUpdate={onCardsUpdate}
          />
        )}

        {activeTab === 'team' && (
          <TeamAdminContent 
            team={team} 
            onTeamUpdate={onTeamUpdate}
          />
        )}

        {activeTab === 'platform' && (
          <PlatformAdminContent 
            platformSettings={platformSettings}
            onPlatformUpdate={onPlatformUpdate}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapAdminContent 
            roadmapData={roadmapData}
            onRoadmapUpdate={onRoadmapUpdate}
          />
        )}

        {activeTab === 'partners' && (
          <PartnersAdminContent 
            partnersData={partnersData}
            onPartnersUpdate={onPartnersUpdate}
          />
        )}

        {activeTab === 'footer' && (
          <FooterAdminContent 
            footerSettings={footerSettings}
            onFooterUpdate={onFooterUpdate}
          />
        )}

        {activeTab === 'faq' && (
          <FAQAdminContent 
            faqData={faqData}
            onFAQUpdate={onFAQUpdate}
          />
        )}

        {activeTab === 'community' && (
          <CommunityAdminContent 
            communitySettings={communitySettings}
            onCommunityUpdate={onCommunityUpdate}
          />
        )}

        {activeTab === 'evolution' && (
          <EvolutionAdminContent onUpdate={() => {}} />
        )}
      </div>
    </div>
  );
};

// ==================== ANALYTICS ADMIN CONTENT ====================
const AnalyticsAdminContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  const fetchStats = async (days) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/analytics/stats?period=${days}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
  }, [period]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}м ${secs}с`;
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #10b981',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
        <p style={{ marginTop: '16px', color: '#6b7280' }}>Загрузка статистики...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="analytics-admin-content" style={{ padding: '24px' }}>
      {/* Period Selector */}
      <div style={{
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0
        }}>
          📊 Аналитика сайта
        </h2>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          {[7, 30, 90].map(days => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                border: period === days ? '2px solid #10b981' : '2px solid #e5e7eb',
                background: period === days ? '#ecfdf5' : 'white',
                color: period === days ? '#059669' : '#6b7280',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {days} дней
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats - First Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #10b981',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
              Перегляди сторінки
            </div>
            <div style={{ color: '#10b981', fontSize: '36px', fontWeight: '700', marginBottom: '4px' }}>
              {stats.page_views}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>
              {stats.unique_sessions} унікальних сесій
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #a855f7',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖱️</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
              Кліки по кнопках
            </div>
            <div style={{ color: '#a855f7', fontSize: '36px', fontWeight: '700', marginBottom: '4px' }}>
              {stats.button_clicks}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>
              Всього інтерактивних дій
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #22c55e',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📈</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
              Конверсія
            </div>
            <div style={{ color: '#22c55e', fontSize: '36px', fontWeight: '700', marginBottom: '4px' }}>
              {stats.conversion_rate}%
            </div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>
              {stats.conversions} реєстрацій
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #f59e0b',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏱️</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>
              Середній час на сайті
            </div>
            <div style={{ color: '#f59e0b', fontSize: '36px', fontWeight: '700', marginBottom: '4px' }}>
              {formatDuration(stats.avg_session_duration)}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>
              На одну сесію
            </div>
          </div>
        </div>
      </div>

      {/* Visitors & Devices */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ color: '#06b6d4', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            Повторні vs Нові відвідувачі
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              background: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #10b981'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>Нові відвідувачі</div>
              <div style={{ color: '#10b981', fontSize: '28px', fontWeight: '700' }}>{stats.new_visitors}</div>
              <div style={{ color: '#10b981', fontSize: '14px' }}>{stats.new_visitors_percent}%</div>
            </div>
            <div style={{
              background: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #ec4899'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>Повторні відвідувачі</div>
              <div style={{ color: '#ec4899', fontSize: '28px', fontWeight: '700' }}>{stats.returning_visitors}</div>
              <div style={{ color: '#ec4899', fontSize: '14px' }}>{stats.returning_visitors_percent}%</div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ color: '#06b6d4', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            Типи пристроїв
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              background: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #06b6d4'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>Desktop</div>
              <div style={{ color: '#06b6d4', fontSize: '28px', fontWeight: '700' }}>{stats.desktop_visitors}</div>
              <div style={{ color: '#06b6d4', fontSize: '14px' }}>{stats.desktop_percent}%</div>
            </div>
            <div style={{
              background: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #06b6d4'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>Mobile</div>
              <div style={{ color: '#06b6d4', fontSize: '28px', fontWeight: '700' }}>{stats.mobile_visitors}</div>
              <div style={{ color: '#06b6d4', fontSize: '14px' }}>{stats.mobile_percent}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Geography */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ color: '#06b6d4', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            Країни
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.top_countries.slice(0, 5).map((country, idx) => (
              <div key={idx} style={{
                background: '#1e293b',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #10b981',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#e2e8f0', fontSize: '14px' }}>{country.name}</span>
                <span style={{ color: '#10b981', fontSize: '16px', fontWeight: '700' }}>{country.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '24px',
          borderRadius: '16px',
          border: '2px solid #3b82f6'
        }}>
          <h3 style={{ color: '#ec4899', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
            Міста
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.top_cities.slice(0, 5).map((city, idx) => (
              <div key={idx} style={{
                background: '#1e293b',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #ec4899',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#e2e8f0', fontSize: '14px' }}>{city.name}</span>
                <span style={{ color: '#ec4899', fontSize: '16px', fontWeight: '700' }}>{city.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '24px',
        borderRadius: '16px',
        border: '2px solid #3b82f6',
        marginBottom: '32px'
      }}>
        <h3 style={{ color: '#06b6d4', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
          Категорії джерел трафіку
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #10b981'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔗</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>Direct</div>
            <div style={{ color: '#10b981', fontSize: '32px', fontWeight: '700' }}>{stats.direct_traffic}</div>
            <div style={{ color: '#10b981', fontSize: '14px' }}>{stats.direct_percent}% трафіку</div>
          </div>

          <div style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #f59e0b'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌐</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>Referral</div>
            <div style={{ color: '#f59e0b', fontSize: '32px', fontWeight: '700' }}>{stats.referral_traffic}</div>
            <div style={{ color: '#f59e0b', fontSize: '14px' }}>{stats.referral_percent}% трафіку</div>
          </div>

          <div style={{
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #22c55e'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔍</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>Search</div>
            <div style={{ color: '#22c55e', fontSize: '32px', fontWeight: '700' }}>{stats.search_traffic}</div>
            <div style={{ color: '#22c55e', fontSize: '14px' }}>{stats.search_percent}% трафіку</div>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
            📊 Детальні джерела
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.detailed_sources.map((source, idx) => (
              <div key={idx} style={{
                background: '#1e293b',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '500' }}>{source.source}</span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ color: '#f59e0b', fontSize: '16px', fontWeight: '700' }}>{source.count}</span>
                    <span style={{ color: '#f59e0b', fontSize: '12px' }}>({source.percent}%)</span>
                  </div>
                </div>
                <div style={{
                  height: '6px',
                  background: '#334155',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${source.percent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Data Button */}
      <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={async () => {
            if (window.confirm('Вы уверены, что хотите очистить все данные аналитики?')) {
              try {
                await axios.delete(`${API}/analytics/clear`);
                fetchStats(period);
                alert('Данные успешно очищены');
              } catch (error) {
                alert('Ошибка при очистке данных');
              }
            }
          }}
          style={{
            padding: '12px 24px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🗑️ Очистить все данные
        </button>
      </div>
    </div>
  );
};

// Projects Admin Content Component
const ProjectsAdminContent = ({ cards, onCardsUpdate }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ 
    title_en: '', 
    link: '', 
    image_url: '', 
    order: 0 
  });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ 
      title_en: '', 
      link: '', 
      image_url: '', 
      order: cards.length 
    });
    setEditingCard(null);
    setError('');
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ 
      title_en: card.title_en || card.title_ru || '', 
      link: card.link, 
      image_url: card.image_url, 
      order: card.order 
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload PNG, JPEG, or WebP image');
      return;
    }

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image_url: response.data.url }));
      setError('');
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use English title for both ru and en fields for backend compatibility
    if (!formData.title_en || !formData.link || !formData.image_url) {
      setError('All fields are required');
      return;
    }
    
    const submitData = {
      ...formData,
      title_ru: formData.title_en // Copy EN to RU for backend compatibility
    };

    try {
      if (editingCard) {
        await axios.put(`${API}/drawer-cards/${editingCard.id}`, submitData);
      } else {
        await axios.post(`${API}/drawer-cards`, formData);
      }
      onCardsUpdate();
      resetForm();
      setError('');
    } catch (err) {
      setError('Failed to save card');
      console.error(err);
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;
    try {
      await axios.delete(`${API}/drawer-cards/${cardId}`);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to delete card');
      console.error(err);
    }
  };

  const moveCard = async (cardId, direction) => {
    const index = cards.findIndex(c => c.id === cardId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const newOrders = cards.map((card, i) => {
      if (i === index) return { id: card.id, order: newIndex };
      if (i === newIndex) return { id: card.id, order: index };
      return { id: card.id, order: i };
    });

    try {
      await axios.post(`${API}/drawer-cards/reorder`, newOrders);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to reorder');
      console.error(err);
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-info">
        <strong>📐 Recommended image size:</strong> 1200x800px (3:2 ratio)<br/>
        <strong>📁 Format:</strong> PNG or WebP for best quality
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Project Title</label>
          <input
            type="text"
            value={formData.title_en}
            onChange={e => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
            placeholder="Example: CryptoVault Platform"
            required
          />
        </div>
        <div className="form-group">
          <label>URL Link</label>
          <input
            type="url"
            value={formData.link}
            onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageUpload}
              id="image-upload"
              disabled={isUploading}
            />
            <label htmlFor="image-upload" className="upload-btn">
              {isUploading ? '⏳ Uploading...' : '📤 Choose Image'}
            </label>
            <p className="text-xs text-gray-500 mt-1">or enter image URL:</p>
            <input
              type="text"
              value={formData.image_url}
              onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://images.unsplash.com/photo-..."
              className="mt-2"
            />
            {formData.image_url && (
              <div className="image-preview">
                <img src={formData.image_url.startsWith('/') ? `${BACKEND_URL}${formData.image_url}` : formData.image_url} alt="Preview" />
              </div>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isUploading}>
            {editingCard ? '✅ Update Card' : '➕ Add Card'}
          </button>
          {editingCard && (
            <button type="button" onClick={resetForm} className="btn-secondary">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-cards-list">
        <h3>Existing Cards ({cards.length})</h3>
        {cards.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No cards yet. Add your first one!</p>
        ) : (
          cards.map((card, index) => (
            <div key={card.id} className="admin-card-item">
              <div className="card-preview">
                <img src={card.image_url.startsWith('/') ? `${BACKEND_URL}${card.image_url}` : card.image_url} alt={getLangField(card, 'title')} />
              </div>
              <div className="card-info">
                <strong>{card.title_en || card.title_ru || 'N/A'}</strong>
                <span className="card-link">{card.link}</span>
              </div>
              <div className="card-actions">
                <button onClick={() => moveCard(card.id, 'up')} disabled={index === 0} title="Move Up">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => moveCard(card.id, 'down')} disabled={index === cards.length - 1} title="Move Down">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button onClick={() => handleEdit(card)} title="Edit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(card.id)} className="btn-danger" title="Delete">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Team Admin Content Component
const TeamAdminContent = ({ team, onTeamUpdate }) => {
  const [editingMember, setEditingMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name_en: '',
    position_en: '',
    bio_en: '',
    image_url: '',
    social_links: { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
    displayed_socials: [],
    member_type: 'main',
    order: 0
  });
  const [error, setError] = useState('');

  const availableSocials = [
    { key: 'twitter', label: 'Twitter', icon: '𝕏' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
    { key: 'telegram', label: 'Telegram', icon: '✈️' },
    { key: 'instagram', label: 'Instagram', icon: '📷' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵' },
    { key: 'website', label: 'Website', icon: '🌐' },
  ];

  const resetForm = () => {
    setFormData({
      name_en: '',
      position_en: '',
      bio_en: '',
      image_url: '',
      social_links: { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
      displayed_socials: [],
      member_type: 'main',
      order: team.length
    });
    setEditingMember(null);
    setError('');
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name_en: member.name_en || member.name_ru || '',
      position_en: member.position_en || member.position_ru || '',
      bio_en: member.bio_en || member.bio_ru || '',
      image_url: member.image_url,
      social_links: member.social_links || { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
      displayed_socials: member.displayed_socials || [],
      member_type: member.member_type || 'main',
      order: member.order
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image_url: response.data.url }));
      setError('');
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const toggleDisplayedSocial = (socialKey) => {
    setFormData(prev => {
      const newDisplayed = [...prev.displayed_socials];
      const index = newDisplayed.indexOf(socialKey);
      
      if (index > -1) {
        newDisplayed.splice(index, 1);
      } else {
        if (newDisplayed.length < 4) {
          newDisplayed.push(socialKey);
        } else {
          setError('Maximum 4 social links allowed');
          setTimeout(() => setError(''), 3000);
          return prev;
        }
      }
      
      return { ...prev, displayed_socials: newDisplayed };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name_en || !formData.position_en || !formData.bio_en || !formData.image_url) {
      setError('All fields are required');
      return;
    }
    
    // Copy EN to RU for backend compatibility
    const submitData = {
      ...formData,
      name_ru: formData.name_en,
      position_ru: formData.position_en,
      bio_ru: formData.bio_en
    };

    try {
      if (editingMember) {
        await axios.put(`${API}/team-members/${editingMember.id}`, submitData);
      } else {
        await axios.post(`${API}/team-members`, submitData);
      }
      onTeamUpdate();
      resetForm();
    } catch (err) {
      setError('Failed to save team member');
    }
  };

  const handleDelete = async (memberId) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await axios.delete(`${API}/team-members/${memberId}`);
      onTeamUpdate();
    } catch (err) {
      setError('Failed to delete team member');
    }
  };

  const moveMember = async (memberId, direction) => {
    const index = team.findIndex(m => m.id === memberId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= team.length) return;

    const newOrders = team.map((member, i) => {
      if (i === index) return { id: member.id, order: newIndex };
      if (i === newIndex) return { id: member.id, order: index };
      return { id: member.id, order: i };
    });

    try {
      await axios.post(`${API}/team-members/reorder`, newOrders);
      onTeamUpdate();
    } catch (err) {
      setError('Failed to reorder');
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-info">
        <strong>📐 Recommended image size:</strong> 400x400px (square)<br/>
        <strong>📁 Format:</strong> PNG or WebP for best quality<br/>
        <strong>👥 Socials:</strong> Select up to 4 social links to display
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={formData.name_en}
            onChange={e => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
            placeholder="Alex Johnson"
            required
          />
        </div>

        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            value={formData.position_en}
            onChange={e => setFormData(prev => ({ ...prev, position_en: e.target.value }))}
            placeholder="Founder & CEO"
            required
          />
        </div>

        <div className="form-group">
          <label>Biography *</label>
          <textarea
            value={formData.bio_en}
            onChange={e => setFormData(prev => ({ ...prev, bio_en: e.target.value }))}
            placeholder="Tell about the team member..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Member Type</label>
          <select
            value={formData.member_type}
            onChange={e => setFormData(prev => ({ ...prev, member_type: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '12px',
              background: 'white'
            }}
          >
            <option value="main">Main Team (large cards with bio)</option>
            <option value="team_member">Team Members (small cards)</option>
          </select>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
            💡 Main - displayed in slider with full info. Team Members - compact cards in grid.
          </p>
        </div>

        <div className="form-group">
          <label>Изображение *</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageUpload}
              id="team-image-upload"
              disabled={isUploading}
            />
            <label htmlFor="team-image-upload" className="upload-btn">
              {isUploading ? '⏳ Загрузка...' : '📤 Выбрать изображение'}
            </label>
            <p className="text-xs text-gray-500 mt-1">или введите URL изображения:</p>
            <input
              type="text"
              value={formData.image_url}
              onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://images.unsplash.com/photo-..."
              className="mt-2"
            />
            {formData.image_url && (
              <div className="image-preview">
                <img src={formData.image_url.startsWith('/') ? `${BACKEND_URL}${formData.image_url}` : formData.image_url} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Социальные сети (выберите до 4 для отображения)</label>
          <div className="socials-grid">
            {availableSocials.map((social) => (
              <div key={social.key} className="social-input-group">
                <div className="social-checkbox">
                  <input
                    type="checkbox"
                    id={`display-${social.key}`}
                    checked={formData.displayed_socials.includes(social.key)}
                    onChange={() => toggleDisplayedSocial(social.key)}
                    disabled={!formData.displayed_socials.includes(social.key) && formData.displayed_socials.length >= 4}
                  />
                  <label htmlFor={`display-${social.key}`}>
                    <span className="social-icon">{social.icon}</span>
                    {social.label}
                  </label>
                </div>
                <input
                  type="url"
                  value={formData.social_links[social.key] || ''}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    social_links: { ...prev.social_links, [social.key]: e.target.value }
                  }))}
                  placeholder={`https://${social.key}.com/username`}
                  className="social-url-input"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ✓ Checked = will be displayed on card (max. 4)
          </p>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isUploading}>
            {editingMember ? '✅ Update' : '➕ Add Team Member'}
          </button>
          {editingMember && (
            <button type="button" onClick={resetForm} className="btn-secondary">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-cards-list">
        <h3>Team ({team.length})</h3>
        {team.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No team members yet</p>
        ) : (
          team.map((member, index) => (
            <div key={member.id} className="admin-card-item">
              <div className="card-preview">
                <img src={member.image_url?.startsWith('/') ? `${BACKEND_URL}${member.image_url}` : member.image_url} alt={getLangField(member, 'name')} />
              </div>
              <div className="card-info">
                <strong>{member.name_en || member.name_ru || 'N/A'}</strong>
                <span className="card-position">{member.position_en || member.position_ru || 'N/A'}</span>
                <span className="card-socials-count">
                  {member.displayed_socials?.length || 0} socials
                </span>
              </div>
              <div className="card-actions">
                <button onClick={() => moveMember(member.id, 'up')} disabled={index === 0}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => moveMember(member.id, 'down')} disabled={index === team.length - 1}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <button onClick={() => handleEdit(member)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(member.id)} className="btn-danger">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ==================== PLATFORM ADMIN CONTENT ====================
const PlatformAdminContent = ({ platformSettings, onPlatformUpdate }) => {
  const [settings, setSettings] = useState(platformSettings || {});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  // English only - no language switching needed
  const activeLang = 'en';

  useEffect(() => {
    if (platformSettings) {
      setSettings(platformSettings);
    }
  }, [platformSettings]);

  const handleStatChange = (statKey, field, value) => {
    setSettings(prev => ({
      ...prev,
      [statKey]: { ...prev[statKey], [field]: value }
    }));
  };

  const handleModuleChange = (index, field, value) => {
    setSettings(prev => {
      const newModules = [...(prev.service_modules || [])];
      newModules[index] = { ...newModules[index], [field]: value };
      return { ...prev, service_modules: newModules };
    });
  };

  const handleServiceChange = (index, field, value) => {
    setSettings(prev => {
      const newServices = [...(prev.services_list || [])];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, services_list: newServices };
    });
  };

  const handleBottomStatChange = (index, field, value) => {
    setSettings(prev => {
      const newStats = [...(prev.bottom_stats || [])];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, bottom_stats: newStats };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/platform-settings`, settings);
      setMessage('✅ Настройки сохранены!');
      onPlatformUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Ошибка сохранения');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const statCards = [
    { key: 'community', emoji: '👥', title: 'Community Members' },
    { key: 'visits', emoji: '📊', title: 'Monthly Visits' },
    { key: 'projects', emoji: '📈', title: 'Tracked Projects' },
    { key: 'alerts', emoji: '🚨', title: 'Red Flag Alerts' },
  ];

  const moduleColors = ['emerald', 'blue', 'purple', 'orange', 'pink', 'cyan', 'green', 'violet'];

  // English only

  return (
    <div className="admin-content platform-admin">
      {message && <div className="admin-message">{message}</div>}
      
      {/* Section Texts - English Only */}
      <div className="platform-section">
        <h3>📝 Section Texts</h3>
        <div className="form-group">
          <label>Badge</label>
          <input
            type="text"
            value={settings.section_badge_en || settings.section_badge || ''}
            onChange={e => setSettings(prev => ({ ...prev, section_badge_en: e.target.value, section_badge_ru: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={settings.section_title_en || settings.section_title || ''}
            onChange={e => setSettings(prev => ({ ...prev, section_title_en: e.target.value, section_title_ru: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={settings.section_intro_en || settings.section_intro || ''}
            onChange={e => setSettings(prev => ({ ...prev, section_intro_en: e.target.value, section_intro_ru: e.target.value }))}
            rows={3}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="platform-section">
        <h3>📊 Statistics Cards</h3>
        <div className="stats-admin-grid">
          {statCards.map(({ key, emoji, title }) => (
            <div key={key} className="stat-admin-card">
              <span className="stat-admin-emoji">{emoji}</span>
              <div className="stat-admin-fields">
                <input
                  type="text"
                  placeholder="Value (45,658)"
                  value={settings[key]?.value || ''}
                  onChange={e => handleStatChange(key, 'value', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={settings[key]?.label_en || settings[key]?.label || ''}
                  onChange={e => { handleStatChange(key, 'label_en', e.target.value); handleStatChange(key, 'label_ru', e.target.value); }}
                />
                <input
                  type="text"
                  placeholder="Change (+12%)"
                  value={settings[key]?.change || ''}
                  onChange={e => handleStatChange(key, 'change', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modules */}
      <div className="platform-section">
        <h3>🧩 Service Modules</h3>
        <div className="modules-admin-grid">
          {(settings.service_modules || []).map((module, index) => (
            <div key={index} className="module-admin-card">
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  Icon Type
                </label>
                <select
                  value={module.icon || 'dashboard'}
                  onChange={e => handleModuleChange(index, 'icon', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="dashboard">📊 Dashboard</option>
                  <option value="otc">💱 OTC Market</option>
                  <option value="p2p">🔄 P2P Exchange</option>
                  <option value="predictions">🎯 Predictions</option>
                  <option value="parsing">🔍 Parsing</option>
                  <option value="sentiment">📈 Sentiment</option>
                  <option value="earlyland">🚀 EarlyLand</option>
                  <option value="nft">🖼️ NFT Strategy</option>
                </select>
              </div>
              <input
                type="text"
                value={module.name_en || module.name || ''}
                onChange={e => { handleModuleChange(index, 'name_en', e.target.value); handleModuleChange(index, 'name_ru', e.target.value); }}
                placeholder="Name"
              />
              <input
                type="text"
                value={module.count || ''}
                onChange={e => handleModuleChange(index, 'count', e.target.value)}
                placeholder="Value"
              />
              <input
                type="text"
                value={module.label_en || module.label || ''}
                onChange={e => { handleModuleChange(index, 'label_en', e.target.value); handleModuleChange(index, 'label_ru', e.target.value); }}
                placeholder="Description"
              />
              <select
                value={module.color || 'emerald'}
                onChange={e => handleModuleChange(index, 'color', e.target.value)}
              >
                {moduleColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Services List (Left Column) */}
      <div className="platform-section">
        <h3>📋 Services List</h3>
        <div className="services-admin-list">
          {(settings.services_list || []).map((service, index) => (
            <div key={index} className="service-admin-item">
              <span className="service-admin-num">{service.num}</span>
              <div className="service-admin-fields">
                <input
                  type="text"
                  value={service.title_en || service.title || ''}
                  onChange={e => { handleServiceChange(index, 'title_en', e.target.value); handleServiceChange(index, 'title_ru', e.target.value); }}
                  placeholder="Title"
                />
                <textarea
                  value={service.description_en || service.description || ''}
                  onChange={e => { handleServiceChange(index, 'description_en', e.target.value); handleServiceChange(index, 'description_ru', e.target.value); }}
                  placeholder="Description"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="platform-section">
        <h3>📈 Bottom Statistics</h3>
        <div className="bottom-stats-admin">
          {(settings.bottom_stats || []).map((stat, index) => (
            <div key={index} className="bottom-stat-admin">
              <input
                type="text"
                value={stat.value || ''}
                onChange={e => handleBottomStatChange(index, 'value', e.target.value)}
                placeholder="Value (70%)"
                className="bottom-stat-value-input"
              />
              <input
                type="text"
                value={stat.label_en || stat.label || ''}
                onChange={e => { handleBottomStatChange(index, 'label_en', e.target.value); handleBottomStatChange(index, 'label_ru', e.target.value); }}
                placeholder="Label"
              />
              <input
                type="text"
                value={stat.description_en || stat.description || ''}
                onChange={e => { handleBottomStatChange(index, 'description_en', e.target.value); handleBottomStatChange(index, 'description_ru', e.target.value); }}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="platform-save">
        <button onClick={handleSave} className="btn-primary btn-large" disabled={saving}>
          {saving ? '💾 Saving...' : '💾 Save All Settings'}
        </button>
      </div>
    </div>
  );
};

// ==================== ROADMAP ADMIN CONTENT ====================
const RoadmapAdminContent = ({ roadmapData, onRoadmapUpdate }) => {
  const [settings, setSettings] = useState({
    section_badge_en: 'Our Progress',
    section_title_en: 'Project Roadmap',
    section_subtitle_en: 'Track our development progress in real-time',
    tasks: []
  });
  const [newTask, setNewTask] = useState({ 
    name_en: '', 
    status: 'progress', 
    category: 'Development' 
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (roadmapData) {
      setSettings({
        section_badge_en: roadmapData.section_badge_en || 'Our Progress',
        section_title_en: roadmapData.section_title_en || 'Project Roadmap',
        section_subtitle_en: roadmapData.section_subtitle_en || 'Track our development progress in real-time',
        tasks: roadmapData.tasks || []
      });
    }
  }, [roadmapData]);

  const categories = ['Development', 'Team', 'Marketing', 'NFT', 'Business', 'Community', 'Research'];

  const completedCount = settings.tasks.filter(t => t.status === 'done').length;
  const progressCount = settings.tasks.filter(t => t.status === 'progress').length;
  const totalCount = settings.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/roadmap`, {
        section_badge_ru: settings.section_badge_ru,
        section_badge_en: settings.section_badge_en,
        section_title_ru: settings.section_title_ru,
        section_title_en: settings.section_title_en,
        section_subtitle_ru: settings.section_subtitle_ru,
        section_subtitle_en: settings.section_subtitle_en
      });
      setMessage('✅ Настройки сохранены!');
      onRoadmapUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.name_ru.trim() || !newTask.name_en.trim()) {
      setMessage('❌ Заполните название задачи на обоих языках');
      return;
    }
    
    try {
      await axios.post(`${API}/roadmap/tasks`, newTask);
      setNewTask({ name_ru: '', name_en: '', status: 'progress', category: 'Development' });
      setMessage('✅ Задача добавлена!');
      onRoadmapUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Ошибка добавления');
    }
  };

  const handleUpdateTask = async (taskId, field, value) => {
    try {
      await axios.put(`${API}/roadmap/tasks/${taskId}`, { [field]: value });
      onRoadmapUpdate();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Удалить эту задачу?')) return;
    
    try {
      await axios.delete(`${API}/roadmap/tasks/${taskId}`);
      setMessage('✅ Задача удалена');
      onRoadmapUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Ошибка удаления');
    }
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'done' ? 'progress' : 'done';
    await handleUpdateTask(taskId, 'status', newStatus);
  };

  return (
    <div className="admin-content roadmap-admin">
      {message && <div className="admin-message">{message}</div>}
      
      {/* Progress Overview */}
      <div className="roadmap-progress-overview">
        <div className="progress-bar-admin">
          <div className="progress-fill-admin" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="progress-stats-admin">
          <span className="progress-percent">{progressPercent}%</span>
          <span className="progress-detail">
            <span className="stat-done">✅ {completedCount} завершено</span>
            <span className="stat-progress">🔄 {progressCount} в процессе</span>
            <span className="stat-total">📋 {totalCount} всего</span>
          </span>
        </div>
      </div>

      {/* Section Settings */}
      <div className="roadmap-section">
        <h3>📝 Настройки секции</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Бейдж</label>
            <input
              type="text"
              value={settings.section_badge}
              onChange={e => setSettings(prev => ({ ...prev, section_badge: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              value={settings.section_title}
              onChange={e => setSettings(prev => ({ ...prev, section_title: e.target.value }))}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Подзаголовок</label>
          <input
            type="text"
            value={settings.section_subtitle}
            onChange={e => setSettings(prev => ({ ...prev, section_subtitle: e.target.value }))}
          />
        </div>
        <button onClick={handleSaveSettings} className="btn-secondary" disabled={saving}>
          {saving ? '💾 Сохранение...' : '💾 Сохранить настройки'}
        </button>
      </div>

      {/* Add New Task */}
      <div className="roadmap-section">
        <h3>➕ Добавить задачу</h3>
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Название задачи..."
            value={newTask.name}
            onChange={e => setNewTask(prev => ({ ...prev, name: e.target.value }))}
            className="task-name-input"
          />
          <select
            value={newTask.category}
            onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={newTask.status}
            onChange={e => setNewTask(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="progress">🔄 In Progress</option>
            <option value="done">✅ Completed</option>
          </select>
          <button onClick={handleAddTask} className="btn-primary">
            ➕ Добавить
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="roadmap-section">
        <h3>📋 Задачи ({totalCount})</h3>
        <div className="tasks-admin-list">
          {settings.tasks.sort((a, b) => (a.order || 0) - (b.order || 0)).map((task) => (
            <div key={task.id} className={`task-admin-item ${task.status}`}>
              <button 
                className={`task-status-toggle ${task.status}`}
                onClick={() => handleToggleStatus(task.id, task.status)}
                title={task.status === 'done' ? 'Отметить как в процессе' : 'Отметить как завершено'}
              >
                {task.status === 'done' ? '✅' : '🔄'}
              </button>
              <div className="task-admin-info">
                <input
                  type="text"
                  value={task.name}
                  onChange={e => handleUpdateTask(task.id, 'name', e.target.value)}
                  className="task-name-edit"
                />
                <select
                  value={task.category}
                  onChange={e => handleUpdateTask(task.id, 'category', e.target.value)}
                  className="task-category-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={() => handleDeleteTask(task.id)}
                className="task-delete-btn"
                title="Удалить задачу"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== PARTNERS ADMIN CONTENT ====================
const PartnersAdminContent = ({ partnersData, onPartnersUpdate }) => {
  const [partners, setPartners] = useState([]);
  const [activeCategory, setActiveCategory] = useState('partners');
  const [newPartner, setNewPartner] = useState({
    name_en: '',
    description_en: '',
    image_url: '',
    link: '',
    category: 'partners'
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (partnersData) {
      setPartners(partnersData);
    }
  }, [partnersData]);

  const categories = [
    { key: 'partners', label: '🤝 Partners', count: partners.filter(p => p.category === 'partners').length },
    { key: 'media', label: '📰 Media Partners', count: partners.filter(p => p.category === 'media').length },
    { key: 'portfolio', label: '💼 Portfolio', count: partners.filter(p => p.category === 'portfolio').length },
  ];

  const filteredPartners = partners.filter(p => p.category === activeCategory);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formData);
      setNewPartner(prev => ({ ...prev, image_url: response.data.url }));
      setMessage('✅ Image uploaded');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage('❌ Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleAddPartner = async () => {
    if (!newPartner.name_en.trim() || !newPartner.link.trim()) {
      setMessage('❌ Fill in name and link');
      return;
    }

    try {
      await axios.post(`${API}/partners`, {
        ...newPartner,
        name_ru: newPartner.name_en,
        description_ru: newPartner.description_en,
        category: activeCategory
      });
      setNewPartner({ 
        name_en: '', 
        description_en: '', 
        image_url: '', 
        link: '', 
        category: activeCategory 
      });
      setMessage('✅ Партнёр добавлен!');
      onPartnersUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Add error');
    }
  };

  const handleUpdatePartner = async (partnerId, field, value) => {
    try {
      await axios.put(`${API}/partners/${partnerId}`, { [field]: value });
      onPartnersUpdate();
    } catch (err) {
      console.error('Error updating partner:', err);
    }
  };

  const handleDeletePartner = async (partnerId) => {
    if (!window.confirm('Delete this partner?')) return;

    try {
      await axios.delete(`${API}/partners/${partnerId}`);
      setMessage('✅ Partner deleted');
      onPartnersUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Delete error');
    }
  };

  return (
    <div className="admin-content partners-admin">
      {message && <div className="admin-message">{message}</div>}

      {/* Category Tabs */}
      <div className="partners-category-tabs">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`category-tab ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label} <span className="tab-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Add New Partner */}
      <div className="partners-section">
        <h3>➕ Add Partner</h3>
        <div className="partner-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={newPartner.name_en}
              onChange={e => setNewPartner(prev => ({ ...prev, name_en: e.target.value }))}
              placeholder="CoinGecko"
            />
          </div>
          <div className="form-group">
            <label>Link *</label>
            <input
              type="text"
              value={newPartner.link}
              onChange={e => setNewPartner(prev => ({ ...prev, link: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newPartner.description_en}
              onChange={e => setNewPartner(prev => ({ ...prev, description_en: e.target.value }))}
              placeholder="Short partner description..."
              rows={2}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Logo (PNG/SVG, 200×200px, transparent background)</label>
              <div className="image-upload-row">
                <input
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {newPartner.image_url && (
                  <div className="mini-preview">
                    <img src={newPartner.image_url} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <div className="form-group form-actions">
              <button onClick={handleAddPartner} className="btn-primary" disabled={uploading}>
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="partners-section">
        <h3>📋 {categories.find(c => c.key === activeCategory)?.label} ({filteredPartners.length})</h3>
        <div className="partners-admin-grid">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="partner-admin-card">
              <div className="partner-logo-wrap">
                {partner.image_url ? (
                  <img src={partner.image_url} alt={getLangField(partner, 'name')} className="partner-logo" />
                ) : (
                  <div className="partner-logo-placeholder">
                    {getLangField(partner, 'name').charAt(0)}
                  </div>
                )}
              </div>
              <div className="partner-admin-info">
                <label style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>Name</label>
                <input
                  type="text"
                  value={partner.name_en || partner.name_ru || ''}
                  onChange={e => { handleUpdatePartner(partner.id, 'name_en', e.target.value); handleUpdatePartner(partner.id, 'name_ru', e.target.value); }}
                  className="partner-name-input"
                  style={{marginBottom: '8px'}}
                />
                <label style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>Description</label>
                <textarea
                  value={partner.description_en || partner.description_ru || ''}
                  onChange={e => { handleUpdatePartner(partner.id, 'description_en', e.target.value); handleUpdatePartner(partner.id, 'description_ru', e.target.value); }}
                  className="partner-desc-input"
                  rows={2}
                  style={{marginBottom: '8px'}}
                />
                <label style={{fontSize: '11px', color: '#6b7280', marginBottom: '4px'}}>🔗 Link</label>
                <input
                  type="text"
                  value={partner.link}
                  onChange={e => handleUpdatePartner(partner.id, 'link', e.target.value)}
                  className="partner-link-input"
                  placeholder="https://..."
                />
              </div>
              <button
                onClick={() => handleDeletePartner(partner.id)}
                className="partner-delete-btn"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== LOGIN MODAL ====================


// ==================== FOOTER ADMIN CONTENT ====================
const FooterAdminContent = ({ footerSettings, onFooterUpdate }) => {
  const [settings, setSettings] = useState({
    company_name: 'FOMO',
    company_description: 'Leading cryptocurrency analytics platform',
    company_address: '4 World Trade Center\n150 Greenwich St Floor 45\nNew York, NY 10007',
    company_phone: '(646) 845-0036',
    company_email: 'info@fomo.io',
    social_media: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'youtube', url: 'https://youtube.com' }
    ],
    navigation_sections: [
      {
        title: 'COMPANY',
        links: [
          { name: 'About', url: '#about', order: 1 },
          { name: 'Team', url: '#team', order: 2 }
        ],
        order: 1
      },
      {
        title: 'PLATFORM',
        links: [
          { name: 'Projects', url: '#projects', order: 1 },
          { name: 'Roadmap', url: '#roadmap', order: 2 },
          { name: 'Partners', url: '#partners', order: 3 }
        ],
        order: 2
      },
      {
        title: 'OTHER',
        links: [
          { name: 'Documentation', url: '#', order: 1 },
          { name: 'Support', url: '#', order: 2 }
        ],
        order: 3
      }
    ],
    cta_button_text: 'Launch Platform →',
    cta_button_url: '#',
    regulatory_disclosures_url: '#',
    privacy_notice_url: '#',
    security_url: '#',
    copyright_text: 'Copyright © 2025 FOMO. All rights reserved.',
    legal_disclaimer: 'Products and services are offered by FOMO as a crypto analytics platform.',
    made_by_text: 'Made by Emergent',
    made_by_url: 'https://emergent.sh'
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (footerSettings) {
      setSettings({
        company_name: footerSettings.company_name || 'FOMO',
        company_description: footerSettings.company_description || '',
        company_address: footerSettings.company_address || '',
        company_phone: footerSettings.company_phone || '',
        company_email: footerSettings.company_email || '',
        social_media: footerSettings.social_media || [],
        navigation_sections: footerSettings.navigation_sections || [],
        cta_button_text: footerSettings.cta_button_text || 'Launch Platform →',
        cta_button_url: footerSettings.cta_button_url || '#',
        whitepaper_url: footerSettings.whitepaper_url || '',
        regulatory_disclosures_url: footerSettings.regulatory_disclosures_url || '#',
        privacy_notice_url: footerSettings.privacy_notice_url || '#',
        security_url: footerSettings.security_url || '#',
        copyright_text: footerSettings.copyright_text || '',
        legal_disclaimer: footerSettings.legal_disclaimer || '',
        made_by_text: footerSettings.made_by_text || '',
        made_by_url: footerSettings.made_by_url || ''
      });
    }
  }, [footerSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/footer-settings`, settings);
      setMessage('✅ Footer settings saved!');
      onFooterUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Save error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (index, field, value) => {
    setSettings(prev => {
      const newSocial = [...prev.social_media];
      newSocial[index] = { ...newSocial[index], [field]: value };
      return { ...prev, social_media: newSocial };
    });
  };

  const addSocial = () => {
    setSettings(prev => ({
      ...prev,
      social_media: [...prev.social_media, { platform: '', url: '' }]
    }));
  };

  const removeSocial = (index) => {
    setSettings(prev => ({
      ...prev,
      social_media: prev.social_media.filter((_, i) => i !== index)
    }));
  };


  // Navigation Sections Management
  const handleSectionChange = (sectionIndex, field, value) => {
    setSettings(prev => {
      const newSections = [...prev.navigation_sections];
      newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
      return { ...prev, navigation_sections: newSections };
    });
  };

  const handleLinkChange = (sectionIndex, linkIndex, field, value) => {
    setSettings(prev => {
      const newSections = [...prev.navigation_sections];
      const newLinks = [...newSections[sectionIndex].links];
      newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
      newSections[sectionIndex] = { ...newSections[sectionIndex], links: newLinks };
      return { ...prev, navigation_sections: newSections };
    });
  };

  const addSection = () => {
    setSettings(prev => ({
      ...prev,
      navigation_sections: [
        ...prev.navigation_sections,
        { title: 'NEW SECTION', links: [], order: prev.navigation_sections.length + 1 }
      ]
    }));
  };

  const removeSection = (index) => {
    setSettings(prev => ({
      ...prev,
      navigation_sections: prev.navigation_sections.filter((_, i) => i !== index)
    }));
  };

  const addLink = (sectionIndex) => {
    setSettings(prev => {
      const newSections = [...prev.navigation_sections];
      const section = newSections[sectionIndex];
      newSections[sectionIndex] = {
        ...section,
        links: [...section.links, { name: 'New Link', url: '#', order: section.links.length + 1 }]
      };
      return { ...prev, navigation_sections: newSections };
    });
  };

  const removeLink = (sectionIndex, linkIndex) => {
    setSettings(prev => {
      const newSections = [...prev.navigation_sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        links: newSections[sectionIndex].links.filter((_, i) => i !== linkIndex)
      };
      return { ...prev, navigation_sections: newSections };
    });
  };


  const socialPlatforms = ['github', 'linkedin', 'youtube', 'twitter', 'telegram', 'facebook', 'instagram'];

  return (
    <div className="admin-content footer-admin">
      {message && <div className="admin-message">{message}</div>}
      
      {/* Company Information */}
      <div className="footer-admin-section">
        <h3>🏢 Company Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={settings.company_name}
              onChange={e => setSettings(prev => ({ ...prev, company_name: e.target.value }))}
              placeholder="FOMO"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={settings.company_email}
              onChange={e => setSettings(prev => ({ ...prev, company_email: e.target.value }))}
              placeholder="info@fomo.io"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={settings.company_description}
            onChange={e => setSettings(prev => ({ ...prev, company_description: e.target.value }))}
            placeholder="Short company description"
            rows={2}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Address (use \n for new line)</label>
            <textarea
              value={settings.company_address}
              onChange={e => setSettings(prev => ({ ...prev, company_address: e.target.value }))}
              placeholder="4 World Trade Center\n150 Greenwich St Floor 45\nNew York, NY 10007"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={settings.company_phone}
              onChange={e => setSettings(prev => ({ ...prev, company_phone: e.target.value }))}
              placeholder="(646) 845-0036"
            />
          </div>
        </div>
      </div>

      {/* Whitepaper Link */}
      <div className="footer-admin-section">
        <h3>📄 Whitepaper Link</h3>
        <div className="form-group">
          <label>Whitepaper URL</label>
          <input
            type="url"
            value={settings.whitepaper_url}
            onChange={e => setSettings(prev => ({ ...prev, whitepaper_url: e.target.value }))}
            placeholder="https://docs.fomo.io/whitepaper.pdf"
          />
        </div>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
          💡 This link will be displayed in the "About" section as "Whitepaper" button
        </p>
      </div>

      {/* CTA Button */}
      <div className="footer-admin-section">
        <h3>🚀 Call to Action Button (GET STARTED)</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Button Text</label>
            <input
              type="text"
              value={settings.cta_button_text}
              onChange={e => setSettings(prev => ({ ...prev, cta_button_text: e.target.value }))}
              placeholder="Launch Platform →"
            />
          </div>
          <div className="form-group">
            <label>Button URL</label>
            <input
              type="url"
              value={settings.cta_button_url}
              onChange={e => setSettings(prev => ({ ...prev, cta_button_url: e.target.value }))}
              placeholder="https://app.fomo.io or #"
            />
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
          💡 This button will be used to navigate to the main website/app
        </p>
      </div>

      {/* Social Media */}
      <div className="footer-admin-section">
        <h3>📱 Social Media</h3>
        <div className="social-media-list">
          {settings.social_media.map((social, index) => (
            <div key={index} className="social-media-item">
              <select
                value={social.platform}
                onChange={e => handleSocialChange(index, 'platform', e.target.value)}
                className="social-platform-select"
              >
                <option value="">Выберите платформу</option>
                {socialPlatforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
              <input
                type="url"
                value={social.url}
                onChange={e => handleSocialChange(index, 'url', e.target.value)}
                placeholder="https://..."
                className="social-url-input"
              />
              <button 
                onClick={() => removeSocial(index)}
                className="btn-danger-small"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <button onClick={addSocial} className="btn-secondary">
          ➕ Добавить социальную сеть
        </button>
      </div>


      {/* Navigation Sections */}
      <div className="footer-admin-section">
        <h3>🗂️ Навигационные секции (COMPANY, PLATFORM, OTHER)</h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
          Управляйте секциями навигации в футере. Каждая секция содержит заголовок и список ссылок.
        </p>
        
        {settings.navigation_sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ 
            background: 'rgba(255,255,255,0.3)', 
            padding: '16px', 
            borderRadius: '12px', 
            marginBottom: '16px',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                value={section.title}
                onChange={e => handleSectionChange(sectionIndex, 'title', e.target.value)}
                placeholder="Название секции (напр. COMPANY)"
                style={{ 
                  flex: 1, 
                  padding: '8px 12px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px'
                }}
              />
              <button 
                onClick={() => removeSection(sectionIndex)}
                className="btn-danger-small"
                title="Удалить секцию"
              >
                🗑️ Удалить секцию
              </button>
            </div>

            {/* Links in Section */}
            <div style={{ marginLeft: '12px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: '#6b7280' }}>
                Ссылки:
              </p>
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={link.name}
                    onChange={e => handleLinkChange(sectionIndex, linkIndex, 'name', e.target.value)}
                    placeholder="Название"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '13px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={e => handleLinkChange(sectionIndex, linkIndex, 'url', e.target.value)}
                    placeholder="URL"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '13px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}
                  />
                  <button
                    onClick={() => removeLink(sectionIndex, linkIndex)}
                    className="btn-danger-small"
                    title="Удалить ссылку"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addLink(sectionIndex)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                ➕ Добавить ссылку
              </button>
            </div>
          </div>
        ))}

        <button onClick={addSection} className="btn-secondary">
          ➕ Добавить секцию
        </button>
      </div>


      {/* Legal Links */}
      <div className="footer-admin-section">
        <h3>⚖️ Юридические ссылки</h3>
        <div className="form-group">
          <label>Regulatory Disclosures URL</label>
          <input
            type="url"
            value={settings.regulatory_disclosures_url}
            onChange={e => setSettings(prev => ({ ...prev, regulatory_disclosures_url: e.target.value }))}
            placeholder="https://..."
          />
        </div>
        <div className="form-group">
          <label>Privacy Notice URL</label>
          <input
            type="url"
            value={settings.privacy_notice_url}
            onChange={e => setSettings(prev => ({ ...prev, privacy_notice_url: e.target.value }))}
            placeholder="https://..."
          />
        </div>
        <div className="form-group">
          <label>Security URL</label>
          <input
            type="url"
            value={settings.security_url}
            onChange={e => setSettings(prev => ({ ...prev, security_url: e.target.value }))}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="footer-admin-section">
        <h3>©️ Copyright и дисклеймер</h3>
        <div className="form-group">
          <label>Copyright текст</label>
          <input
            type="text"
            value={settings.copyright_text}
            onChange={e => setSettings(prev => ({ ...prev, copyright_text: e.target.value }))}
            placeholder="Copyright © 2025 FOMO. All rights reserved."
          />
        </div>
        <div className="form-group">
          <label>Юридический дисклеймер</label>
          <textarea
            value={settings.legal_disclaimer}
            onChange={e => setSettings(prev => ({ ...prev, legal_disclaimer: e.target.value }))}
            placeholder="Юридический текст..."
            rows={3}
          />
        </div>
      </div>

      {/* Attribution */}
      <div className="footer-admin-section">
        <h3>🏷️ Атрибуция "Made by"</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Текст</label>
            <input
              type="text"
              value={settings.made_by_text}
              onChange={e => setSettings(prev => ({ ...prev, made_by_text: e.target.value }))}
              placeholder="Made by Emergent"
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              type="url"
              value={settings.made_by_url}
              onChange={e => setSettings(prev => ({ ...prev, made_by_url: e.target.value }))}
              placeholder="https://emergent.sh"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="footer-admin-save">
        <button onClick={handleSave} className="btn-primary btn-large" disabled={saving}>
          {saving ? '💾 Сохранение...' : '💾 Сохранить все настройки'}
        </button>
      </div>
    </div>
  );
};




// ==================== FAQ ADMIN CONTENT ====================
const FAQAdminContent = ({ faqData, onFAQUpdate }) => {
  const [faqs, setFaqs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (faqData) {
      setFaqs(faqData);
    }
  }, [faqData]);

  const handleFAQChange = (index, field, value) => {
    setFaqs(prev => {
      const newFaqs = [...prev];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return newFaqs;
    });
  };

  const addFAQ = () => {
    setFaqs(prev => [
      ...prev,
      { 
        question: 'New question', 
        answer: 'Answer to the question',
        order: prev.length 
      }
    ]);
  };

  const removeFAQ = async (index) => {
    const faq = faqs[index];
    if (faq.id) {
      try {
        await axios.delete(`${API}/faq/${faq.id}`);
        setMessage('✅ FAQ deleted');
        setTimeout(() => setMessage(''), 2000);
      } catch (err) {
        setMessage('❌ Delete error');
        console.error(err);
      }
    }
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update or create each FAQ
      for (const faq of faqs) {
        if (faq.id) {
          // Update existing
          await axios.put(`${API}/faq/${faq.id}`, {
            question: faq.question,
            answer: faq.answer,
            order: faq.order
          });
        } else {
          // Create new
          await axios.post(`${API}/faq`, {
            question: faq.question,
            answer: faq.answer,
            order: faq.order || faqs.indexOf(faq)
          });
        }
      }
      setMessage('✅ FAQ saved!');
      onFAQUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Save error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-content faq-admin">
      {message && <div className="admin-message">{message}</div>}
      
      <div className="faq-admin-header">
        <h3>❓ Frequently Asked Questions (FAQ)</h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
          Manage frequently asked questions. 6 questions recommended for optimal display.
        </p>
      </div>

      <div className="faq-admin-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-admin-item">
            <div className="faq-admin-header-row">
              <span className="faq-number">#{index + 1}</span>
              <button 
                onClick={() => removeFAQ(index)}
                className="btn-danger-small"
                title="Delete"
              >
                🗑️
              </button>
            </div>
            
            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                value={faq.question || ''}
                onChange={e => handleFAQChange(index, 'question', e.target.value)}
                placeholder="Enter question"
              />
            </div>
            
            <div className="form-group">
              <label>Answer</label>
              <textarea
                value={faq.answer || ''}
                onChange={e => handleFAQChange(index, 'answer', e.target.value)}
                placeholder="Enter answer"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <button onClick={addFAQ} className="btn-secondary" style={{ marginTop: '16px' }}>
        ➕ Add Question
      </button>

      <div className="faq-admin-save">
        <button onClick={handleSave} className="btn-primary btn-large" disabled={saving}>
          {saving ? '💾 Saving...' : '💾 Save All FAQ'}
        </button>
      </div>
    </div>
  );
};

// ==================== HERO ADMIN CONTENT ====================
const HeroAdminContent = () => {
  const [settings, setSettings] = useState({
    badge: 'Now in Beta v1.1',
    title_line1: 'The Future of',
    title_line2: 'Crypto Analytics',
    subtitle: 'Discover a comprehensive platform combining social engagement, data analytics, and seamless access to crypto projects, NFTs, and more.',
    stats: [
      { value: '10K+', label_en: 'Active Users', label_ru: 'Активных пользователей' },
      { value: '$50M+', label_en: 'Trading Volume', label_ru: 'Объём торгов' },
      { value: '666', label_en: 'NFT Collection', label_ru: 'NFT Коллекция' },
    ],
    nft_settings: {
      price_per_box: 150,
      discount_threshold: 3,
      discount_percent: 10,
      total_supply: 666,
      max_per_wallet: 100
    }
  });
  const [heroButtons, setHeroButtons] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsRes, buttonsRes] = await Promise.all([
          axios.get(`${API}/hero-settings`),
          axios.get(`${API}/hero-buttons`)
        ]);
        
        if (settingsRes.data) {
          setSettings(prev => ({
            ...prev,
            badge: settingsRes.data.badge || prev.badge,
            title_line1: settingsRes.data.title_line1 || prev.title_line1,
            title_line2: settingsRes.data.title_line2 || prev.title_line2,
            subtitle: settingsRes.data.subtitle || prev.subtitle,
            stats: settingsRes.data.stats || prev.stats,
            nft_settings: settingsRes.data.nft_settings || prev.nft_settings
          }));
        }
        
        if (buttonsRes.data) {
          setHeroButtons(buttonsRes.data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleStatChange = (index, field, value) => {
    setSettings(prev => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleNftChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      nft_settings: { ...prev.nft_settings, [field]: value }
    }));
  };
  
  const handleHeroButtonChange = (index, field, value) => {
    setHeroButtons(prev => {
      const newButtons = [...prev];
      newButtons[index] = { ...newButtons[index], [field]: value };
      return newButtons;
    });
  };
  
  const addHeroButton = () => {
    if (heroButtons.length >= 3) {
      setMessage('⚠️ Maximum 3 buttons allowed');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    setHeroButtons(prev => [
      ...prev,
      { label: 'New Button', url: 'https://example.com', style: 'secondary', order: prev.length, is_active: true }
    ]);
  };
  
  const removeHeroButton = async (index) => {
    const button = heroButtons[index];
    if (button.id) {
      try {
        await axios.delete(`${API}/hero-buttons/${button.id}`);
        setMessage('✅ Button deleted');
        setTimeout(() => setMessage(''), 2000);
      } catch (err) {
        setMessage('❌ Delete error');
        console.error(err);
      }
    }
    setHeroButtons(prev => prev.filter((_, i) => i !== index));
  };

  const addStat = () => {
    setSettings(prev => ({
      ...prev,
      stats: [...prev.stats, { value: '', label_en: '' }]
    }));
  };

  const removeStat = (index) => {
    setSettings(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save hero settings
      await axios.put(`${API}/hero-settings`, settings);
      
      // Save or create hero buttons
      for (const button of heroButtons) {
        if (button.id) {
          await axios.put(`${API}/hero-buttons/${button.id}`, {
            label: button.label,
            url: button.url,
            style: button.style,
            order: button.order,
            is_active: button.is_active
          });
        } else {
          await axios.post(`${API}/hero-buttons`, {
            label: button.label,
            url: button.url,
            style: button.style,
            order: button.order || heroButtons.indexOf(button),
            is_active: button.is_active !== false
          });
        }
      }
      
      setMessage('✅ Settings saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Save error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-content" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="admin-content" style={{ padding: '24px' }}>
      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: message.includes('error') ? '#fef2f2' : '#ecfdf5',
          color: message.includes('error') ? '#dc2626' : '#059669',
          fontWeight: '500'
        }}>{message}</div>
      )}

      {/* Hero Text Content Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          📝 Hero Section Text Content
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
          Configure the badge, title, and description text displayed in the hero section
        </p>
        
        {/* Badge */}
        <div style={{ marginBottom: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Badge Text (version label)
          </label>
          <input
            type="text"
            value={settings.badge}
            onChange={(e) => setSettings(prev => ({ ...prev, badge: e.target.value }))}
            placeholder="Now in Beta v1.1"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Title Line 1 */}
        <div style={{ marginBottom: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Title Line 1
          </label>
          <input
            type="text"
            value={settings.title_line1}
            onChange={(e) => setSettings(prev => ({ ...prev, title_line1: e.target.value }))}
            placeholder="The Future of"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Title Line 2 (highlighted) */}
        <div style={{ marginBottom: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Title Line 2 (highlighted text)
          </label>
          <input
            type="text"
            value={settings.title_line2}
            onChange={(e) => setSettings(prev => ({ ...prev, title_line2: e.target.value }))}
            placeholder="Crypto Analytics"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Subtitle/Description */}
        <div style={{ marginBottom: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            Subtitle / Description
          </label>
          <textarea
            value={settings.subtitle}
            onChange={(e) => setSettings(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Discover a comprehensive platform..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Hero CTA Buttons Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          🔘 Hero Call-to-Action Buttons
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
          Configure the main CTA buttons in Hero section. <strong>Maximum 3 buttons</strong> (2 recommended for optimal design).
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {heroButtons.map((button, index) => (
            <div key={index} style={{
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Button #{index + 1}</span>
                <button
                  onClick={() => removeHeroButton(index)}
                  style={{
                    padding: '6px 12px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={button.label || ''}
                    onChange={e => handleHeroButtonChange(index, 'label', e.target.value)}
                    placeholder="Explore Platform"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    URL (use # for anchor links or full URL)
                  </label>
                  <input
                    type="text"
                    value={button.url || ''}
                    onChange={e => handleHeroButtonChange(index, 'url', e.target.value)}
                    placeholder="https://example.com or #section"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    Button Style
                  </label>
                  <select
                    value={button.style || 'secondary'}
                    onChange={e => handleHeroButtonChange(index, 'style', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="primary">Primary (Dark)</option>
                    <option value="secondary">Secondary (White)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addHeroButton}
          disabled={heroButtons.length >= 3}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: heroButtons.length >= 3 ? '#e5e7eb' : '#f3f4f6',
            border: '1px dashed #d1d5db',
            borderRadius: '8px',
            cursor: heroButtons.length >= 3 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            color: heroButtons.length >= 3 ? '#9ca3af' : '#6b7280',
            opacity: heroButtons.length >= 3 ? 0.5 : 1
          }}
        >
          ➕ Add Button {heroButtons.length >= 3 ? '(Max 3)' : ''}
        </button>
      </div>

      {/* Stats Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          📊 Hero Section Statistics
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Configure the stats displayed below the Hero section header (10K+, $50M+, 666)
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {settings.stats.map((stat, index) => (
            <div key={index} style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr auto',
              gap: '12px',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '12px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                placeholder="10K+"
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              />
              <input
                type="text"
                value={stat.label_en || stat.label_ru || ''}
                onChange={(e) => handleStatChange(index, 'label_en', e.target.value)}
                placeholder="Description"
                style={{
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={() => removeStat(index)}
                style={{
                  padding: '8px 12px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        
        <button
          onClick={addStat}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            background: '#f3f4f6',
            border: '1px dashed #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#6b7280'
          }}
        >
          + Add Stat
        </button>
      </div>

      {/* NFT Settings Section */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          🎨 NFT Box Settings
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          Manage price, discounts and NFT box purchase limits
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '12px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
              Price per box (USDC)
            </label>
            <input
              type="number"
              value={settings.nft_settings.price_per_box}
              onChange={(e) => handleNftChange('price_per_box', parseFloat(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
              Discount threshold (qty)
            </label>
            <input
              type="number"
              value={settings.nft_settings.discount_threshold}
              onChange={(e) => handleNftChange('discount_threshold', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
              Discount percent (%)
            </label>
            <input
              type="number"
              value={settings.nft_settings.discount_percent}
              onChange={(e) => handleNftChange('discount_percent', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
              Total NFT boxes
            </label>
            <input
              type="number"
              value={settings.nft_settings.total_supply}
              onChange={(e) => handleNftChange('total_supply', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
              Max per wallet
            </label>
            <input
              type="number"
              value={settings.nft_settings.max_per_wallet}
              onChange={(e) => handleNftChange('max_per_wallet', parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: '14px 28px',
          background: saving ? '#9ca3af' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        {saving ? 'Saving...' : '💾 Save Settings'}
      </button>
    </div>
  );
};

// ==================== COMMUNITY ADMIN CONTENT ====================
const CommunityAdminContent = ({ communitySettings, onCommunityUpdate }) => {
  const [settings, setSettings] = useState({
    title_en: 'Join the Community',
    description_en: 'Connect with web3 founders, developers and crypto enthusiasts from around the world.',
    description_en: 'Connect with web3 founders, developers, and crypto enthusiasts from around the world.',
    socials: [
      { platform: 'twitter', url: 'https://twitter.com', enabled: true },
      { platform: 'telegram', url: 'https://t.me', enabled: true },
      { platform: 'discord', url: 'https://discord.com', enabled: true }
    ],
    subscribe_enabled: true,
    subscribe_title_ru: 'Будь в курсе',
    subscribe_title_en: 'Stay Updated'
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLang, setActiveLang] = useState('ru');

  useEffect(() => {
    if (communitySettings) {
      setSettings({
        title_ru: communitySettings.title_ru || communitySettings.title || 'Присоединяйся к сообществу',
        title_en: communitySettings.title_en || communitySettings.title || 'Join the Community',
        description_ru: communitySettings.description_ru || communitySettings.description || '',
        description_en: communitySettings.description_en || communitySettings.description || '',
        socials: communitySettings.socials || [],
        subscribe_enabled: communitySettings.subscribe_enabled ?? true,
        subscribe_title_ru: communitySettings.subscribe_title_ru || communitySettings.subscribe_title || 'Будь в курсе',
        subscribe_title_en: communitySettings.subscribe_title_en || communitySettings.subscribe_title || 'Stay Updated'
      });
    }
  }, [communitySettings]);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index, field, value) => {
    setSettings(prev => {
      const newSocials = [...prev.socials];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return { ...prev, socials: newSocials };
    });
  };

  const addSocial = () => {
    setSettings(prev => ({
      ...prev,
      socials: [...prev.socials, { platform: 'github', url: 'https://github.com', enabled: true }]
    }));
  };

  const removeSocial = (index) => {
    setSettings(prev => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/community-settings`, {
        title_ru: settings.title_en,
        title_en: settings.title_en,
        description_ru: settings.description_en,
        description_en: settings.description_en,
        socials: settings.socials,
        subscribe_enabled: settings.subscribe_enabled,
        subscribe_title_ru: settings.subscribe_title_en,
        subscribe_title_en: settings.subscribe_title_en
      });
      setMessage('✅ Community settings saved!');
      onCommunityUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Save error');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const platformOptions = ['twitter', 'telegram', 'discord', 'github', 'youtube', 'instagram', 'linkedin', 'medium'];

  return (
    <div className="admin-content community-admin">
      {message && <div className="admin-message">{message}</div>}
      
      <div className="community-admin-header">
        <h3>🌐 "Join the Community" Block Settings</h3>
        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
          Manage title, description and social links for the Community block.
        </p>
      </div>

      <div className="admin-section">
        <h4>📝 Main Information</h4>
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={settings.title_en || ''}
            onChange={e => handleChange('title_en', e.target.value)}
            placeholder="Join the Community"
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={settings.description_en || ''}
            onChange={e => handleChange('description_en', e.target.value)}
            placeholder="Community block description"
            rows={3}
          />
        </div>
      </div>

      <div className="admin-section">
        <h4>📱 Social Networks</h4>
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
          Add links to your social networks. Enabled socials will be displayed as buttons.
        </p>
        
        <div className="socials-admin-list">
          {settings.socials.map((social, index) => (
            <div key={index} className="social-admin-item" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <select
                value={social.platform}
                onChange={e => handleSocialChange(index, 'platform', e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  width: '140px'
                }}
              >
                {platformOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                value={social.url}
                onChange={e => handleSocialChange(index, 'url', e.target.value)}
                placeholder="https://..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px'
                }}
              />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={social.enabled}
                  onChange={e => handleSocialChange(index, 'enabled', e.target.checked)}
                />
                <span style={{ fontSize: '13px', color: '#6b7280' }}>On</span>
              </label>
              
              <button
                onClick={() => removeSocial(index)}
                className="btn-danger-small"
                title="Delete"
                style={{
                  padding: '6px 10px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        
        <button onClick={addSocial} className="btn-secondary" style={{ marginTop: '12px' }}>
          ➕ Add Social
        </button>
      </div>

      <div className="admin-section">
        <h4>✉️ Subscribe Block</h4>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.subscribe_enabled}
              onChange={e => handleChange('subscribe_enabled', e.target.checked)}
            />
            <span>Show subscribe block</span>
          </label>
        </div>
        
        {settings.subscribe_enabled && (
          <div className="form-group">
            <label>Subscribe Block Title</label>
            <input
              type="text"
              value={settings.subscribe_title_en || ''}
              onChange={e => handleChange('subscribe_title_en', e.target.value)}
              placeholder="Stay Updated"
            />
          </div>
        )}
      </div>

      <div className="community-admin-save" style={{ marginTop: '24px' }}>
        <button onClick={handleSave} className="btn-primary btn-large" disabled={saving}>
          {saving ? '💾 Saving...' : '💾 Save Community Settings'}
        </button>
      </div>
    </div>
  );
};


// ==================== EVOLUTION ADMIN CONTENT ====================

// ==================== EXTENDED ANIMATION LIBRARY ====================
const ANIMATION_TYPES_LEVELS = [
  { value: 'stellar', label: '⭐ Stellar (Star)', color: '#64748b', description: 'Rotating star' },
  { value: 'cosmic', label: '🚀 Cosmic (Rocket)', color: '#3b82f6', description: 'Flying rocket' },
  { value: 'galactic', label: '🌀 Galactic (Orbits)', color: '#a855f7', description: 'Orbital rings' },
  { value: 'celestial', label: '☀️ Celestial (Sun)', color: '#f59e0b', description: 'Radiant sun' },
  { value: 'astral', label: '🪐 Astral (Planet)', color: '#ec4899', description: 'Planet with rings' },
  { value: 'universal', label: '👑 Universal (Crown)', color: '#10b981', description: 'Cosmic crown' },
  { value: 'pulse', label: '💫 Pulse', color: '#06b6d4', description: 'Pulsing circle' },
  { value: 'nebula', label: '🌌 Nebula', color: '#8b5cf6', description: 'Cosmic nebula' },
  { value: 'supernova', label: '💥 Supernova', color: '#ef4444', description: 'Supernova explosion' },
  { value: 'blackhole', label: '⚫ Black Hole', color: '#1e293b', description: 'Rotating black hole' },
  { value: 'aurora', label: '🌈 Aurora', color: '#22c55e', description: 'Northern lights' },
  { value: 'meteor', label: '☄️ Meteor', color: '#f97316', description: 'Falling meteor' },
  { value: 'constellation', label: '✨ Constellation', color: '#a3e635', description: 'Twinkling constellation' },
  { value: 'vortex', label: '🌊 Vortex', color: '#0ea5e9', description: 'Energy vortex' },
  { value: 'crystal', label: '💎 Crystal', color: '#e879f9', description: 'Glowing crystal' }
];

const ANIMATION_TYPES_BADGES = [
  { value: 'pioneer', label: '🛡️ Pioneer (Shield)', color: '#3b82f6', description: 'Pioneer shield' },
  { value: 'onboarding', label: '📍 Onboarding (Marker)', color: '#f59e0b', description: 'Achievement marker' },
  { value: 'reviewer', label: '🔍 Reviewer (Magnifier)', color: '#a855f7', description: 'Expert magnifier' },
  { value: 'predictor', label: '🎯 Predictor (Target)', color: '#ef4444', description: 'Precise target' },
  { value: 'streak', label: '🔥 Streak (Fire)', color: '#f97316', description: 'Blazing fire' },
  { value: 'maker', label: '💠 Maker (Ромб)', color: '#10b981', description: 'Вращающийся ромб' },
  { value: 'p2p', label: '🔗 P2P (Связь)', color: '#6366f1', description: 'Связанные точки' },
  { value: 'community', label: '⭐ Community (Звезда)', color: '#ec4899', description: 'Звезда сообщества' },
  { value: 'singularity', label: '⚛️ Singularity (Атом)', color: '#14b8a6', description: 'Атомная модель' },
  { value: 'trophy', label: '🏆 Trophy (Кубок)', color: '#fbbf24', description: 'Золотой кубок' },
  { value: 'medal', label: '🥇 Medal (Медаль)', color: '#f59e0b', description: 'Золотая медаль' },
  { value: 'crown', label: '👑 Crown (Корона)', color: '#eab308', description: 'Королевская корона' },
  { value: 'diamond', label: '💎 Diamond (Алмаз)', color: '#06b6d4', description: 'Сверкающий алмаз' },
  { value: 'lightning', label: '⚡ Lightning (Молния)', color: '#facc15', description: 'Электрическая молния' },
  { value: 'rocket', label: '🚀 Rocket (Ракета)', color: '#f43f5e', description: 'Взлетающая ракета' },
  { value: 'heart', label: '❤️ Heart (Сердце)', color: '#ec4899', description: 'Пульсирующее сердце' },
  { value: 'gem', label: '💠 Gem (Камень)', color: '#8b5cf6', description: 'Драгоценный камень' }
];

const ANIMATION_SPEEDS = [
  { value: 'slow', label: '🐢 Медленная', multiplier: 2 },
  { value: 'normal', label: '⚡ Нормальная', multiplier: 1 },
  { value: 'fast', label: '🚀 Быстрая', multiplier: 0.5 }
];

const ANIMATION_INTENSITIES = [
  { value: 'subtle', label: '🌙 Мягкая', scale: 0.7 },
  { value: 'normal', label: '☀️ Нормальная', scale: 1 },
  { value: 'intense', label: '🔥 Интенсивная', scale: 1.3 }
];

const EvolutionAdminContent = ({ onUpdate }) => {
  const [activeSubTab, setActiveSubTab] = useState('levels');
  const [levels, setLevels] = useState([]);
  const [badges, setBadges] = useState([]);
  const [editingLevel, setEditingLevel] = useState(null);
  const [editingBadge, setEditingBadge] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [levelsRes, badgesRes] = await Promise.all([
        axios.get(`${API}/evolution-levels`),
        axios.get(`${API}/evolution-badges`)
      ]);
      setLevels(levelsRes.data);
      setBadges(badgesRes.data);
    } catch (err) {
      console.error('Error fetching evolution data:', err);
    }
  };

  // LEVELS CRUD
  const saveLevel = async (level) => {
    setSaving(true);
    try {
      if (level.id) {
        await axios.put(`${API}/evolution-levels/${level.id}`, level);
      } else {
        await axios.post(`${API}/evolution-levels`, level);
      }
      setMessage('✅ Уровень сохранён!');
      setEditingLevel(null);
      fetchData();
      if (onUpdate) onUpdate();
    } catch (err) {
      setMessage('❌ Ошибка сохранения');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteLevel = async (id) => {
    if (!window.confirm('Удалить этот уровень?')) return;
    try {
      await axios.delete(`${API}/evolution-levels/${id}`);
      setMessage('✅ Уровень удалён');
      fetchData();
      if (onUpdate) onUpdate();
    } catch (err) {
      setMessage('❌ Ошибка удаления');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  // BADGES CRUD
  const saveBadge = async (badge) => {
    setSaving(true);
    try {
      if (badge.id) {
        await axios.put(`${API}/evolution-badges/${badge.id}`, badge);
      } else {
        await axios.post(`${API}/evolution-badges`, badge);
      }
      setMessage('✅ Бейдж сохранён!');
      setEditingBadge(null);
      fetchData();
      if (onUpdate) onUpdate();
    } catch (err) {
      setMessage('❌ Ошибка сохранения');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteBadge = async (id) => {
    if (!window.confirm('Удалить этот бейдж?')) return;
    try {
      await axios.delete(`${API}/evolution-badges/${id}`);
      setMessage('✅ Бейдж удалён');
      fetchData();
      if (onUpdate) onUpdate();
    } catch (err) {
      setMessage('❌ Ошибка удаления');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const LevelForm = ({ level, onSave, onCancel }) => {
    const [form, setForm] = useState(level || {
      rank_ru: '', rank_en: '', fomo_score_min: 0, fomo_score_max: 100, 
      next_level_ru: '', next_level_en: '', description_ru: '', description_en: '',
      animation_type: 'stellar', gradient_from: '#64748b', gradient_to: '#475569', order: levels.length
    });

    return (
      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>{level?.id ? 'Редактировать уровень' : 'Новый уровень'}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label>🇷🇺 Название уровня (RU)</label>
            <input type="text" value={form.rank_ru || ''} onChange={e => setForm({...form, rank_ru: e.target.value})} placeholder="Звёздное Пробуждение" />
          </div>
          <div className="form-group">
            <label>🇬🇧 Название уровня (EN)</label>
            <input type="text" value={form.rank_en || ''} onChange={e => setForm({...form, rank_en: e.target.value})} placeholder="Stellar Awakening" />
          </div>
          <div className="form-group">
            <label>🇷🇺 Следующий уровень (RU)</label>
            <input type="text" value={form.next_level_ru || ''} onChange={e => setForm({...form, next_level_ru: e.target.value})} placeholder="Космический Исследователь (200)" />
          </div>
          <div className="form-group">
            <label>🇬🇧 Следующий уровень (EN)</label>
            <input type="text" value={form.next_level_en || ''} onChange={e => setForm({...form, next_level_en: e.target.value})} placeholder="Cosmic Explorer (200)" />
          </div>
          <div className="form-group">
            <label>FOMO Score Min</label>
            <input type="number" value={form.fomo_score_min} onChange={e => setForm({...form, fomo_score_min: parseInt(e.target.value) || 0})} />
          </div>
          <div className="form-group">
            <label>FOMO Score Max</label>
            <input type="number" value={form.fomo_score_max} onChange={e => setForm({...form, fomo_score_max: parseInt(e.target.value) || 0})} />
          </div>
          <div className="form-group">
            <label>🇷🇺 Описание (RU)</label>
            <textarea value={form.description_ru || ''} onChange={e => setForm({...form, description_ru: e.target.value})} rows={2} placeholder="Описание уровня на русском..." />
          </div>
          <div className="form-group">
            <label>🇬🇧 Описание (EN)</label>
            <textarea value={form.description_en || ''} onChange={e => setForm({...form, description_en: e.target.value})} rows={2} placeholder="Level description in English..." />
          </div>
          <div className="form-group">
            <label>Анимация</label>
            <select value={form.animation_type} onChange={e => setForm({...form, animation_type: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%' }}>
              {ANIMATION_TYPES_LEVELS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Порядок</label>
            <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} />
          </div>
          <div className="form-group">
            <label>Цвет градиента (от)</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={form.gradient_from} onChange={e => setForm({...form, gradient_from: e.target.value})} style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px' }} />
              <input type="text" value={form.gradient_from} onChange={e => setForm({...form, gradient_from: e.target.value})} style={{ flex: 1 }} />
            </div>
          </div>
          <div className="form-group">
            <label>Цвет градиента (до)</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={form.gradient_to} onChange={e => setForm({...form, gradient_to: e.target.value})} style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px' }} />
              <input type="text" value={form.gradient_to} onChange={e => setForm({...form, gradient_to: e.target.value})} style={{ flex: 1 }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button onClick={() => onSave(form)} className="btn-primary" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
          <button onClick={onCancel} className="btn-secondary">Отмена</button>
        </div>
      </div>
    );
  };

  const BadgeForm = ({ badge, onSave, onCancel }) => {
    const [form, setForm] = useState(badge || {
      name_ru: '', name_en: '', xp_requirement: 1000, 
      condition_ru: '', condition_en: '', description_ru: '', description_en: '',
      animation_type: 'pioneer', gradient_from: '#3b82f6', gradient_to: '#06b6d4', order: badges.length
    });

    return (
      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>{badge?.id ? 'Редактировать бейдж' : 'Новый бейдж'}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label>🇷🇺 Название бейджа (RU)</label>
            <input type="text" value={form.name_ru || ''} onChange={e => setForm({...form, name_ru: e.target.value})} placeholder="XP Пионер" />
          </div>
          <div className="form-group">
            <label>🇬🇧 Название бейджа (EN)</label>
            <input type="text" value={form.name_en || ''} onChange={e => setForm({...form, name_en: e.target.value})} placeholder="XP Pioneer" />
          </div>
          <div className="form-group">
            <label>Требуемые XP</label>
            <input type="number" value={form.xp_requirement} onChange={e => setForm({...form, xp_requirement: parseInt(e.target.value) || 0})} />
          </div>
          <div className="form-group">
            <label>Порядок</label>
            <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} />
          </div>
          <div className="form-group">
            <label>🇷🇺 Условие получения (RU)</label>
            <textarea value={form.condition_ru || ''} onChange={e => setForm({...form, condition_ru: e.target.value})} rows={2} placeholder="Условие получения бейджа на русском..." />
          </div>
          <div className="form-group">
            <label>🇬🇧 Условие получения (EN)</label>
            <textarea value={form.condition_en || ''} onChange={e => setForm({...form, condition_en: e.target.value})} rows={2} placeholder="Badge condition in English..." />
          </div>
          <div className="form-group">
            <label>🇷🇺 Описание (RU)</label>
            <textarea value={form.description_ru || ''} onChange={e => setForm({...form, description_ru: e.target.value})} rows={2} placeholder="Описание бейджа на русском..." />
          </div>
          <div className="form-group">
            <label>🇬🇧 Описание (EN)</label>
            <textarea value={form.description_en || ''} onChange={e => setForm({...form, description_en: e.target.value})} rows={2} placeholder="Badge description in English..." />
          </div>
          <div className="form-group">
            <label>Анимация</label>
            <select value={form.animation_type} onChange={e => setForm({...form, animation_type: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%' }}>
              {ANIMATION_TYPES_BADGES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Цвет градиента (от)</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={form.gradient_from} onChange={e => setForm({...form, gradient_from: e.target.value})} style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px' }} />
              <input type="text" value={form.gradient_from} onChange={e => setForm({...form, gradient_from: e.target.value})} style={{ flex: 1 }} />
            </div>
          </div>
          <div className="form-group">
            <label>Цвет градиента (до)</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input type="color" value={form.gradient_to} onChange={e => setForm({...form, gradient_to: e.target.value})} style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px' }} />
              <input type="text" value={form.gradient_to} onChange={e => setForm({...form, gradient_to: e.target.value})} style={{ flex: 1 }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button onClick={() => onSave(form)} className="btn-primary" disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
          <button onClick={onCancel} className="btn-secondary">Отмена</button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-content evolution-admin">
      {message && <div className="admin-message">{message}</div>}
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>🚀 User Evolution</h3>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Управление уровнями FOMO Score и бейджами</p>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveSubTab('levels')} style={{
          padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
          background: activeSubTab === 'levels' ? '#10b981' : '#e5e7eb',
          color: activeSubTab === 'levels' ? 'white' : '#374151', fontWeight: '600'
        }}>📊 FOMO Levels ({levels.length})</button>
        <button onClick={() => setActiveSubTab('badges')} style={{
          padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
          background: activeSubTab === 'badges' ? '#10b981' : '#e5e7eb',
          color: activeSubTab === 'badges' ? 'white' : '#374151', fontWeight: '600'
        }}>🏆 Badges ({badges.length})</button>
      </div>

      {/* Levels Tab */}
      {activeSubTab === 'levels' && (
        <div>
          {editingLevel !== null ? (
            <LevelForm level={editingLevel === 'new' ? null : editingLevel} onSave={saveLevel} onCancel={() => setEditingLevel(null)} />
          ) : (
            <button onClick={() => setEditingLevel('new')} className="btn-primary" style={{ marginBottom: '20px' }}>
              ➕ Добавить уровень
            </button>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {levels.map((level) => (
              <div key={level.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${level.gradient_from}, ${level.gradient_to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
                  {level.order + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1f2937' }}>{level.rank_ru || level.rank || 'Без названия'}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>FOMO: {level.fomo_score_min}–{level.fomo_score_max} | Анимация: {level.animation_type}</p>
                </div>
                <button onClick={() => setEditingLevel(level)} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✏️ Изменить</button>
                <button onClick={() => deleteLevel(level.id)} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeSubTab === 'badges' && (
        <div>
          {editingBadge !== null ? (
            <BadgeForm badge={editingBadge === 'new' ? null : editingBadge} onSave={saveBadge} onCancel={() => setEditingBadge(null)} />
          ) : (
            <button onClick={() => setEditingBadge('new')} className="btn-primary" style={{ marginBottom: '20px' }}>
              ➕ Добавить бейдж
            </button>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {badges.map((badge) => (
              <div key={badge.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${badge.gradient_from}, ${badge.gradient_to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
                  🏆
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1f2937' }}>{badge.name_ru || badge.name || 'Без названия'}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>XP: {badge.xp_requirement?.toLocaleString()} | Анимация: {badge.animation_type}</p>
                </div>
                <button onClick={() => setEditingBadge(badge)} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✏️ Изменить</button>
                <button onClick={() => deleteBadge(badge.id)} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem('admin_token', response.data.token);
        onLoginSuccess();
        onClose();
        setPassword('');
      }
    } catch (err) {
      setError('Invalid password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <div className="login-header">
          <h2>🔐 Вход в админ-панель</h2>
          <button onClick={onClose} className="admin-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Пароль администратора</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              autoFocus
              disabled={loading}
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Проверка...' : '🔓 Войти'}
          </button>

          <div className="login-info">
            <p className="text-sm text-gray-500">
              💡 По умолчанию пароль: <code>admin123</code><br/>
              Измените его в настройках сервера (.env файл)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==================== ADMIN PANEL ====================
const AdminPanel = ({ isOpen, onClose, cards, onCardsUpdate }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', link: '', image_url: '', order: 0 });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ title: '', link: '', image_url: '', order: cards.length });
    setEditingCard(null);
    setError('');
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({ title: card.title, link: card.link, image_url: card.image_url, order: card.order });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload PNG, JPEG, or WebP image');
      return;
    }

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image_url: response.data.url }));
      setError('');
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link || !formData.image_url) {
      setError('All fields are required');
      return;
    }

    try {
      if (editingCard) {
        await axios.put(`${API}/drawer-cards/${editingCard.id}`, formData);
      } else {
        await axios.post(`${API}/drawer-cards`, formData);
      }
      onCardsUpdate();
      resetForm();
      setError('');
    } catch (err) {
      setError('Failed to save card');
      console.error(err);
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('Delete this card?')) return;
    try {
      await axios.delete(`${API}/drawer-cards/${cardId}`);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to delete card');
      console.error(err);
    }
  };

  const moveCard = async (cardId, direction) => {
    const index = cards.findIndex(c => c.id === cardId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const newOrders = cards.map((card, i) => {
      if (i === index) return { id: card.id, order: newIndex };
      if (i === newIndex) return { id: card.id, order: index };
      return { id: card.id, order: i };
    });

    try {
      await axios.post(`${API}/drawer-cards/reorder`, newOrders);
      onCardsUpdate();
    } catch (err) {
      setError('Failed to reorder');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={e => e.stopPropagation()} data-testid="admin-panel">
        <div className="admin-header">
          <h2>Drawer Cards Admin</h2>
          <button onClick={onClose} className="admin-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format Info */}
        <div className="admin-info">
          <strong>📐 Рекомендуемый размер изображения:</strong> 1200x800px (соотношение 3:2)<br/>
          <strong>📁 Формат:</strong> PNG или WebP для лучшего качества
        </div>

        {error && <div className="admin-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Название проекта</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Например: CryptoVault Platform"
              required
            />
          </div>
          <div className="form-group">
            <label>URL ссылка</label>
            <input
              type="url"
              value={formData.link}
              onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Изображение</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                id="image-upload"
                disabled={isUploading}
              />
              <label htmlFor="image-upload" className="upload-btn">
                {isUploading ? '⏳ Загрузка...' : '📤 Выбрать изображение'}
              </label>
              <p className="text-xs text-gray-500 mt-1">или введите URL изображения:</p>
              <input
                type="text"
                value={formData.image_url}
                onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://images.unsplash.com/photo-..."
                className="mt-2"
              />
              {formData.image_url && (
                <div className="image-preview">
                  <img src={formData.image_url.startsWith('/') ? `${BACKEND_URL}${formData.image_url}` : formData.image_url} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isUploading}>
              {editingCard ? '✅ Обновить карточку' : '➕ Добавить карточку'}
            </button>
            {editingCard && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                ❌ Отмена
              </button>
            )}
          </div>
        </form>

        {/* Cards List */}
        <div className="admin-cards-list">
          <h3>Существующие карточки ({cards.length})</h3>
          {cards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Пока нет карточек. Добавьте первую!</p>
          ) : (
            cards.map((card, index) => (
              <div key={card.id} className="admin-card-item">
                <div className="card-preview">
                  <img src={card.image_url.startsWith('/') ? `${BACKEND_URL}${card.image_url}` : card.image_url} alt={card.title} />
                </div>
                <div className="card-info">
                  <strong>{card.title}</strong>
                  <span className="card-link">{card.link}</span>
                </div>
                <div className="card-actions">
                  <button onClick={() => moveCard(card.id, 'up')} disabled={index === 0} title="Переместить вверх">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveCard(card.id, 'down')} disabled={index === cards.length - 1} title="Переместить вниз">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button onClick={() => handleEdit(card)} title="Редактировать">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(card.id)} className="btn-danger" title="Удалить">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== TEAM ADMIN PANEL ====================
const TeamAdminPanel = ({ isOpen, onClose, team, onTeamUpdate }) => {
  const [editingMember, setEditingMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name_ru: '',
    name_en: '',
    position_ru: '',
    position_en: '',
    bio_ru: '',
    bio_en: '',
    image_url: '',
    social_links: { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
    displayed_socials: [],
    member_type: 'main',
    order: 0
  });
  const [error, setError] = useState('');

  const availableSocials = [
    { key: 'twitter', label: 'Twitter', icon: '𝕏' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
    { key: 'telegram', label: 'Telegram', icon: '✈️' },
    { key: 'instagram', label: 'Instagram', icon: '📷' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵' },
    { key: 'website', label: 'Website', icon: '🌐' },
  ];

  const resetForm = () => {
    setFormData({
      name_ru: '',
      name_en: '',
      position_ru: '',
      position_en: '',
      bio_ru: '',
      bio_en: '',
      image_url: '',
      social_links: { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
      displayed_socials: [],
      member_type: 'main',
      order: team.length
    });
    setEditingMember(null);
    setError('');
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name_ru: member.name_ru || '',
      name_en: member.name_en || '',
      position_ru: member.position_ru || '',
      position_en: member.position_en || '',
      bio_ru: member.bio_ru || '',
      bio_en: member.bio_en || '',
      image_url: member.image_url,
      social_links: member.social_links || { twitter: '', linkedin: '', telegram: '', instagram: '', tiktok: '', website: '' },
      displayed_socials: member.displayed_socials || [],
      member_type: member.member_type || 'main',
      order: member.order
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload PNG, JPEG, or WebP image');
      return;
    }

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const response = await axios.post(`${API}/upload-image`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image_url: response.data.url }));
      setError('');
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleDisplayedSocial = (socialKey) => {
    setFormData(prev => {
      const newDisplayed = [...prev.displayed_socials];
      const index = newDisplayed.indexOf(socialKey);
      
      if (index > -1) {
        newDisplayed.splice(index, 1);
      } else {
        if (newDisplayed.length < 4) {
          newDisplayed.push(socialKey);
        } else {
          setError('Можно выбрать максимум 4 соцсети');
          setTimeout(() => setError(''), 3000);
          return prev;
        }
      }
      
      return { ...prev, displayed_socials: newDisplayed };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name_ru || !formData.name_en || !formData.position_ru || !formData.position_en || 
        !formData.bio_ru || !formData.bio_en || !formData.image_url) {
      setError('Все основные поля обязательны (RU и EN)');
      return;
    }

    try {
      if (editingMember) {
        await axios.put(`${API}/team-members/${editingMember.id}`, formData);
      } else {
        await axios.post(`${API}/team-members`, formData);
      }
      onTeamUpdate();
      resetForm();
      setError('');
    } catch (err) {
      setError('Failed to save team member');
      console.error(err);
    }
  };

  const handleDelete = async (memberId) => {
    if (!window.confirm('Удалить этого члена команды?')) return;
    try {
      await axios.delete(`${API}/team-members/${memberId}`);
      onTeamUpdate();
    } catch (err) {
      setError('Failed to delete team member');
      console.error(err);
    }
  };

  const moveMember = async (memberId, direction) => {
    const index = team.findIndex(m => m.id === memberId);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= team.length) return;

    const newOrders = team.map((member, i) => {
      if (i === index) return { id: member.id, order: newIndex };
      if (i === newIndex) return { id: member.id, order: index };
      return { id: member.id, order: i };
    });

    try {
      await axios.post(`${API}/team-members/reorder`, newOrders);
      onTeamUpdate();
    } catch (err) {
      setError('Failed to reorder');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel admin-panel-wide" onClick={e => e.stopPropagation()} data-testid="team-admin-panel">
        <div className="admin-header">
          <h2>👥 Управление командой</h2>
          <button onClick={onClose} className="admin-close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="admin-info">
          <strong>📐 Рекомендуемый размер изображения:</strong> 400x400px (квадрат)<br/>
          <strong>📁 Формат:</strong> PNG или WebP для лучшего качества<br/>
          <strong>👥 Соцсети:</strong> Выберите до 4 соцсетей для отображения
        </div>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>🇷🇺 Имя (Русский) *</label>
              <input
                type="text"
                value={formData.name_ru}
                onChange={e => setFormData(prev => ({ ...prev, name_ru: e.target.value }))}
                placeholder="Алекс Джонсон"
                required
              />
            </div>
            <div className="form-group">
              <label>🇬🇧 Имя (English) *</label>
              <input
                type="text"
                value={formData.name_en}
                onChange={e => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                placeholder="Alex Johnson"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>🇷🇺 Должность (Русский) *</label>
              <input
                type="text"
                value={formData.position_ru}
                onChange={e => setFormData(prev => ({ ...prev, position_ru: e.target.value }))}
                placeholder="Основатель и CEO"
                required
              />
            </div>
            <div className="form-group">
              <label>🇬🇧 Должность (English) *</label>
              <input
                type="text"
                value={formData.position_en}
                onChange={e => setFormData(prev => ({ ...prev, position_en: e.target.value }))}
                placeholder="Founder & CEO"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>🇷🇺 Биография (Русский) *</label>
            <textarea
              value={formData.bio_ru}
              onChange={e => setFormData(prev => ({ ...prev, bio_ru: e.target.value }))}
              placeholder="Расскажите о члене команды на русском..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label>🇬🇧 Биография (English) *</label>
            <textarea
              value={formData.bio_en}
              onChange={e => setFormData(prev => ({ ...prev, bio_en: e.target.value }))}
              placeholder="Tell about the team member in English..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label>Изображение *</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                id="team-image-upload"
                disabled={isUploading}
              />
              <label htmlFor="team-image-upload" className="upload-btn">
                {isUploading ? '⏳ Загрузка...' : '📤 Выбрать изображение'}
              </label>
              <p className="text-xs text-gray-500 mt-1">или введите URL изображения:</p>
              <input
                type="text"
                value={formData.image_url}
                onChange={e => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://images.unsplash.com/photo-..."
                className="mt-2"
              />
              {formData.image_url && (
                <div className="image-preview">
                  <img src={formData.image_url.startsWith('/') ? `${BACKEND_URL}${formData.image_url}` : formData.image_url} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Социальные сети (выберите до 4 для отображения)</label>
            <div className="socials-grid">
              {availableSocials.map((social) => (
                <div key={social.key} className="social-input-group">
                  <div className="social-checkbox">
                    <input
                      type="checkbox"
                      id={`display-${social.key}`}
                      checked={formData.displayed_socials.includes(social.key)}
                      onChange={() => toggleDisplayedSocial(social.key)}
                      disabled={!formData.displayed_socials.includes(social.key) && formData.displayed_socials.length >= 4}
                    />
                    <label htmlFor={`display-${social.key}`}>
                      <span className="social-icon">{social.icon}</span>
                      {social.label}
                    </label>
                  </div>
                  <input
                    type="url"
                    value={formData.social_links[social.key] || ''}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      social_links: { ...prev.social_links, [social.key]: e.target.value }
                    }))}
                    placeholder={`https://${social.key}.com/username`}
                    className="social-url-input"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ✓ Отмечено = будет отображаться на карточке (макс. 4)
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isUploading}>
              {editingMember ? '✅ Обновить' : '➕ Добавить члена команды'}
            </button>
            {editingMember && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                ❌ Отмена
              </button>
            )}
          </div>
        </form>

        <div className="admin-cards-list">
          <h3>Команда ({team.length})</h3>
          {team.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Пока нет членов команды</p>
          ) : (
            team.map((member, index) => (
              <div key={member.id} className="admin-card-item">
                <div className="card-preview">
                  <img src={member.image_url.startsWith('/') ? `${BACKEND_URL}${member.image_url}` : member.image_url} alt={getLangField(member, 'name')} />
                </div>
                <div className="card-info">
                  <strong>🇷🇺 {member.name_ru || 'N/A'}</strong>
                  <strong>🇬🇧 {member.name_en || 'N/A'}</strong>
                  <span className="card-position">🇷🇺 {member.position_ru || 'N/A'} | 🇬🇧 {member.position_en || 'N/A'}</span>
                  <span className="card-socials-count">
                    {member.displayed_socials?.length || 0} соцсетей
                  </span>
                </div>
                <div className="card-actions">
                  <button onClick={() => moveMember(member.id, 'up')} disabled={index === 0}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveMember(member.id, 'down')} disabled={index === team.length - 1}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button onClick={() => handleEdit(member)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="btn-danger">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Animated Icon Components
const AnimatedIcon = ({ type, className = "" }) => {
  const icons = {
    diamond: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-path" d="M12 2L2 9L12 22L22 9L12 2Z" />
        <path className="icon-shine" d="M12 2L7 9H17L12 2Z" opacity="0.5" />
      </svg>
    ),
    clock: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle className="icon-circle" cx="12" cy="12" r="10" />
        <path className="icon-hand" d="M12 6V12L16 14" />
      </svg>
    ),
    lightning: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-bolt" d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>
    ),
    shield: (
      <svg className={`animated-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path className="icon-shield" d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
        <path className="icon-check" d="M9 12L11 14L15 10" />
      </svg>
    ),
  };
  return icons[type] || null;
};

// Navigation Component - без кнопок админки (админка на отдельной странице /admin)
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [actionButtons, setActionButtons] = useState({
    crypto: { label: 'Crypto', url: '#crypto' },
    core: { label: 'Core', url: '#core' },
    utility: { label: 'Utility', url: '#utility' }
  });
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch navigation items from API
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await axios.get(`${API}/navigation-items`);
        const items = response.data.map(item => ({
          key: item.key,
          label: language === 'ru' ? item.label_ru : item.label_en,
          href: item.href
        }));
        setNavItems(items);
      } catch (error) {
        console.error('Error fetching navigation items:', error);
        // Fallback to default items
        setNavItems([
          { key: 'about', label: t('nav.about'), href: '#about' },
          { key: 'projects', label: t('nav.platform'), href: '#projects' },
          { key: 'roadmap', label: t('nav.roadmap'), href: '#roadmap' },
          { key: 'team', label: t('nav.team'), href: '#team' },
          { key: 'partners', label: t('nav.partners'), href: '#partners' }
        ]);
      }
    };
    fetchNavItems();
  }, [language, t]);

  // Fetch action buttons from hero settings
  useEffect(() => {
    const fetchActionButtons = async () => {
      try {
        const response = await axios.get(`${API}/hero-settings`);
        if (response.data?.action_buttons) {
          setActionButtons(response.data.action_buttons);
        }
      } catch (error) {
        console.error('Error fetching action buttons:', error);
      }
    };
    fetchActionButtons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav data-testid="main-navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 z-10" data-testid="logo-link">
            <img 
              src="/logo.svg" 
              alt="FOMO Logo" 
              className="h-10 w-auto"
              style={{ maxHeight: '40px' }}
            />
          </a>

          {/* Center Navigation - Glass Effect */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="nav-glass-container">
              {navItems.map((item) => (
                <a 
                  key={item.key} 
                  href={item.href} 
                  className="nav-glass-link"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            {/* Separated Action Buttons */}
            <div className="action-buttons-group">
              <a href={actionButtons.crypto?.url || '#crypto'} target={actionButtons.crypto?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="action-btn action-btn-outline">{actionButtons.crypto?.label || 'Crypto'}</a>
              <a href={actionButtons.core?.url || '#core'} target={actionButtons.core?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="action-btn action-btn-outline">{actionButtons.core?.label || 'Core'}</a>
              <a href={actionButtons.utility?.url || '#utility'} target={actionButtons.utility?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="action-btn action-btn-outline">{actionButtons.utility?.label || 'Utility'}</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700 p-2 z-10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-btn">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl p-4" data-testid="mobile-menu">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="block text-gray-700 font-medium py-2">{item.label}</a>
            ))}
            
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <a href={actionButtons.crypto?.url || '#crypto'} target={actionButtons.crypto?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex-1 text-center py-2 px-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-emerald-500 transition-all">{actionButtons.crypto?.label || 'Crypto'}</a>
              <a href={actionButtons.core?.url || '#core'} target={actionButtons.core?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex-1 text-center py-2 px-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-emerald-500 transition-all">{actionButtons.core?.label || 'Core'}</a>
              <a href={actionButtons.utility?.url || '#utility'} target={actionButtons.utility?.url?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex-1 text-center py-2 px-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-emerald-500 transition-all">{actionButtons.utility?.label || 'Utility'}</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Interactive Chart Component
const InteractiveChart = () => {
  const [data, setData] = useState([40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setData(prev => prev.map(v => Math.max(20, Math.min(100, v + (Math.random() - 0.5) * 15))));
    }, 2000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="text-gray-900 font-semibold text-lg">Market Overview</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAnimating(!isAnimating)} 
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${isAnimating ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}
          >
            {isAnimating ? 'Live' : 'Paused'}
          </button>
        </div>
      </div>
      <div className="chart-area">
        {data.map((h, i) => (
          <div 
            key={i} 
            className="chart-bar-container"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className={`chart-bar ${hoveredIndex === i ? 'hovered' : ''}`}
              style={{ height: `${h}%` }}
            />
            {hoveredIndex === i && (
              <div className="chart-tooltip">
                ${(h * 1000).toFixed(0)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chart-stats">
        <div className="stat-box">
          <span className="text-gray-500 text-xs">BTC</span>
          <span className="text-gray-900 font-bold">$87,514</span>
          <span className="stat-change positive">+2.4%</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-500 text-xs">ETH</span>
          <span className="text-gray-900 font-bold">$2,961</span>
          <span className="stat-change positive">+1.8%</span>
        </div>
        <div className="stat-box">
          <span className="text-gray-500 text-xs">SOL</span>
          <span className="text-gray-900 font-bold">$123.91</span>
          <span className="stat-change negative">-0.5%</span>
        </div>
      </div>
    </div>
  );
};

// ==================== BUY NFT MODAL ====================
// Hero Section
const HeroSection = ({ heroSettings }) => {
  const [heroButtons, setHeroButtons] = useState([]);
  const t = useTranslation();
  const { language } = useLanguage();
  
  // Fetch hero buttons from API
  useEffect(() => {
    const fetchHeroButtons = async () => {
      try {
        const response = await axios.get(`${API}/hero-buttons`);
        setHeroButtons(response.data);
      } catch (error) {
        console.error('Error fetching hero buttons:', error);
        // Fallback to default buttons
        setHeroButtons([
          { id: '1', label: 'Explore Platform', url: 'https://example.com/explore', style: 'primary' },
          { id: '2', label: 'Buy NFT', url: 'https://example.com/nft', style: 'secondary' }
        ]);
      }
    };
    fetchHeroButtons();
  }, []);
  
  // Get stats from settings or use defaults
  const stats = heroSettings?.stats || [
    { value: '10K+', label_ru: 'Активных пользователей', label_en: 'Active Users' },
    { value: '$50M+', label_ru: 'Объём торгов', label_en: 'Trading Volume' },
    { value: '666', label_ru: 'NFT Коллекция', label_en: 'NFT Collection' },
  ];
  
  // Get text content from heroSettings or fallback to translations
  const badge = heroSettings?.badge || t('hero.badge');
  const titleLine1 = heroSettings?.title_line1 || t('hero.titleLine1');
  const titleLine2 = heroSettings?.title_line2 || t('hero.titleLine2');
  const subtitle = heroSettings?.subtitle || t('hero.subtitle');
  
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden" data-testid="hero-section">
      <div className="hero-background">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {badge}
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" data-testid="hero-title">
              {titleLine1}
              <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">{titleLine2}</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {heroButtons.map((button) => {
                const label = button.label;
                const isPrimary = button.style === 'primary';
                
                return (
                  <a 
                    key={button.id}
                    href={button.url}
                    target={button.url.startsWith('http') ? '_blank' : '_self'}
                    rel={button.url.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={isPrimary 
                      ? "group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2"
                      : "px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all inline-flex items-center gap-2"
                    }
                  >
                    {label}
                    {isPrimary && (
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div>
                    <span className="block text-3xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-gray-500 text-sm">{language === 'ru' ? stat.label_ru : stat.label_en}</span>
                  </div>
                  {i < stats.length - 1 && <div className="w-px h-12 bg-gray-200 ml-4"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <InteractiveChart />
            <div className="floating-card top-card">
              <div className="card-icon positive">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div><span className="text-gray-500 text-xs">{t('hero.portfolio')}</span><span className="block text-gray-900 font-bold">+24.5%</span></div>
            </div>
            <div className="floating-card bottom-card">
              <div className="card-icon purple">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div><span className="text-gray-500 text-xs">{t('hero.volume24h')}</span><span className="block text-gray-900 font-bold">$101B</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = ({ whitepaperUrl }) => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      badge: 'About Us',
      title: 'What is',
      titleHighlight: 'FOMO',
      subtitle: 'A cutting-edge platform reshaping how users interact with the crypto world',
      description: 'FOMO is a cutting-edge platform built to reshape the way users interact with the cryptoworld. Our goal is to create a single, comprehensive ecosystem that combines',
      socialEngagement: 'social engagement',
      dataAnalytics: 'data analytics',
      seamlessAccess: 'seamless access',
      descriptionEnd: 'to crypto projects, NFTs, funds, and more.',
      features: [
        { icon: 'diamond', title: 'Community-Driven', description: 'Every user influences the project through voting and social engagement.', color: 'emerald' },
        { icon: 'clock', title: '24/7 Support', description: 'Our support never stops. We are here offering guidance every step.', color: 'teal' },
        { icon: 'lightning', title: 'Fast & Efficient', description: 'Launch your project quickly with FOMO tools and support.', color: 'cyan' },
        { icon: 'shield', title: 'Secure & Reliable', description: 'All transactions via secure smart contracts for max protection.', color: 'violet' },
      ]
    },
    ru: {
      badge: 'About Us',
      title: 'What is',
      titleHighlight: 'FOMO',
      subtitle: 'A cutting-edge platform reshaping how users interact with the crypto world',
      description: 'FOMO is a cutting-edge platform built to reshape the way users interact with the cryptoworld. Our goal is to create a single, comprehensive ecosystem that combines',
      socialEngagement: 'social engagement',
      dataAnalytics: 'data analytics',
      seamlessAccess: 'seamless access',
      descriptionEnd: 'to crypto projects, NFTs, funds, and more.',
      features: [
        { icon: 'diamond', title: 'Community-Driven', description: 'Every user influences the project through voting and social engagement.', color: 'emerald' },
        { icon: 'clock', title: '24/7 Support', description: 'Our support never stops. We are here offering guidance every step.', color: 'teal' },
        { icon: 'lightning', title: 'Fast & Efficient', description: 'Launch your project quickly with FOMO tools and support.', color: 'cyan' },
        { icon: 'shield', title: 'Secure & Reliable', description: 'All transactions via secure smart contracts for max protection.', color: 'violet' },
      ]
    }
  };

  const t = content[language];
  
  return (
    <section id="about" className="py-16 bg-white" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">{t.badge}</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t.title} <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{t.titleHighlight}</span>?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t.description} <strong className="text-gray-900">{t.socialEngagement}</strong>, 
              <strong className="text-gray-900"> {t.dataAnalytics}</strong>, and <strong className="text-gray-900">{t.seamlessAccess}</strong> {t.descriptionEnd}
            </p>
            <a 
              href={whitepaperUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="whitepaper-link inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="whitepaper-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2">
                  <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1.5s" repeatCount="1" fill="freeze" />
                </rect>
                <path d="M8 6h8M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <animate attributeName="opacity" values="0;1" dur="0.8s" begin="0.5s" fill="freeze" />
                </path>
                <circle cx="16" cy="18" r="3" fill="#10b981">
                  <animate attributeName="r" values="0;3" dur="0.3s" begin="1s" fill="freeze" />
                </circle>
                <path d="M15 18l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <animate attributeName="opacity" values="0;1" dur="0.2s" begin="1.2s" fill="freeze" />
                </path>
              </svg>
              <span>Whitepaper</span>
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {t.features.map((feature, index) => (
              <div key={index} className="feature-card-animated" data-testid={`feature-card-${index}`}>
                <div className={`feature-icon-animated ${feature.color}`}>
                  <AnimatedIcon type={feature.icon} />
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== PLATFORM OVERVIEW SECTION ====================
const PlatformOverview = ({ platformSettings }) => {
  const { language } = useLanguage();
  const langSuffix = `_${language}`;
  
  // Default values if no settings from API
  const defaults = {
    community: { value: '45,658', label_ru: 'Участников сообщества', label_en: 'Community Members', change: '+12%', trend: [30, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92] },
    visits: { value: '1.2M', label_ru: 'Посещений в месяц', label_en: 'Monthly Visits', change: '+18%', trend: [40, 55, 48, 62, 58, 75, 68, 82, 78, 95, 88, 98] },
    projects: { value: '16,670', label_ru: 'Отслеживаемых проектов', label_en: 'Tracked Projects', change: '+8%', trend: [50, 45, 55, 50, 60, 55, 65, 60, 70, 65, 75, 80] },
    alerts: { value: '892', label_ru: 'Красных флагов', label_en: 'Red Flag Alerts', change: '-15%', trend: [80, 75, 70, 72, 65, 68, 60, 62, 55, 58, 50, 45] },
    service_modules: [
      { icon: '📊', name_ru: 'Дашборд', name_en: 'Dashboard', count: '2,847', label_ru: 'активных', label_en: 'active', color: 'emerald' },
      { icon: '💱', name_ru: 'OTC Маркет', name_en: 'OTC Market', count: '$50M+', label_ru: 'объём', label_en: 'volume', color: 'blue' },
      { icon: '🔄', name_ru: 'P2P Обмен', name_en: 'P2P Exchange', count: '1,245', label_ru: 'сделок/день', label_en: 'trades/day', color: 'purple' },
      { icon: '🎯', name_ru: 'Прогнозы', name_en: 'Predictions', count: '78%', label_ru: 'точность', label_en: 'accuracy', color: 'orange' },
      { icon: '🔍', name_ru: 'Парсинг', name_en: 'Parsing', count: '16K+', label_ru: 'токенов', label_en: 'tokens', color: 'pink' },
      { icon: '📈', name_ru: 'Сентимент', name_en: 'Sentiment', count: '24/7', label_ru: 'мониторинг', label_en: 'monitoring', color: 'cyan' },
      { icon: '🚀', name_ru: 'EarlyLand', name_en: 'EarlyLand', count: '340+', label_ru: 'проектов', label_en: 'projects', color: 'green' },
      { icon: '🖼️', name_ru: 'NFT Стратегия', name_en: 'NFT Strategy', count: '89', label_ru: 'коллекций', label_en: 'collections', color: 'violet' },
    ],
    services_list: [
      { num: '01', title_ru: 'OTC & P2P РЫНКИ', title_en: 'OTC & P2P MARKETS', description_ru: 'Безопасная внебиржевая торговля и P2P-обмен криптоактивами с защитой эскроу.', description_en: 'Secure over-the-counter trading and peer-to-peer exchange with escrow protection.' },
      { num: '02', title_ru: 'РАННИЙ ДОСТУП', title_en: 'EARLY LAND ACCESS', description_ru: 'Получите ранний доступ к перспективным проектам и airdrop-ам.', description_en: 'Get early access to promising projects and airdrops.' },
      { num: '03', title_ru: 'АНАЛИТИКА', title_en: 'ANALYTICS', description_ru: 'Продвинутый парсинг, анализ настроений и обнаружение красных флагов.', description_en: 'Advanced parsing, sentiment analysis, and red flag detection.' },
    ],
    bottom_stats: [
      { value: '70%', label_ru: 'АВТОМАТИЗАЦИЯ', label_en: 'AUTOMATED', description_ru: 'AI-инсайты', description_en: 'AI insights' },
      { value: '24/7', label_ru: 'ОХВАТ', label_en: 'COVERAGE', description_ru: 'Мониторинг', description_en: 'Monitoring' },
      { value: '$50M+', label_ru: 'ОБЪЁМ', label_en: 'VOLUME', description_ru: 'На рынках', description_en: 'Markets' },
    ],
    section_badge_ru: 'ВНУТРИ ПЛАТФОРМЫ',
    section_badge_en: 'INSIDE THE PLATFORM',
    section_title_ru: 'Командный центр для вашего крипто-путешествия',
    section_title_en: 'A command center for your crypto journey',
    section_intro_ru: 'Следите за каждым движением рынка, отслеживайте проекты, управляйте портфелем и получайте доступ к эксклюзивным возможностям.',
    section_intro_en: 'See every market move, track projects, manage your portfolio, and access exclusive opportunities in one place.'
  };

  // Merge settings with defaults
  const settings = platformSettings || defaults;
  
  // Helper to get language-specific value
  const getLang = (obj, key) => {
    if (!obj) return '';
    return obj[`${key}${langSuffix}`] || obj[`${key}_ru`] || obj[key] || '';
  };
  
  const platformStats = {
    community: settings.community || defaults.community,
    visits: settings.visits || defaults.visits,
    projects: settings.projects || defaults.projects,
    alerts: settings.alerts || defaults.alerts
  };
  const serviceModules = settings.service_modules || defaults.service_modules;
  const services = settings.services_list || defaults.services_list;
  const bottomStats = settings.bottom_stats || defaults.bottom_stats;

  // SVG Icons for Service Modules
  const ServiceIcons = {
    dashboard: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <rect x="4" y="4" width="16" height="12" rx="2" fill={color} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="4" y="20" width="16" height="24" rx="2" fill={color} opacity="0.6" />
        <rect x="24" y="4" width="20" height="18" rx="2" fill={color} opacity="0.5" />
        <rect x="24" y="26" width="20" height="18" rx="2" fill={color} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <path d="M8 32L12 28L16 30" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M8 32L12 28L16 30;M8 30L12 26L16 32;M8 32L12 28L16 30" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    otc: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="16" cy="24" r="10" fill={color} opacity="0.3" />
        <circle cx="32" cy="24" r="10" fill={color} opacity="0.3" />
        <path d="M14 20L14 28M18 24L10 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <text x="30" y="28" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle">¥</text>
        <path d="M22 18L26 18M22 30L26 30" stroke={color} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </path>
        <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite" />
      </svg>
    ),
    p2p: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="12" cy="24" r="8" fill={color} opacity="0.4" />
        <circle cx="36" cy="24" r="8" fill={color} opacity="0.4" />
        <path d="M20 20L28 20M20 24L28 24M20 28L28 28" stroke={color} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="12" cy="24" r="4" fill={color}>
          <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="36" cy="24" r="4" fill={color}>
          <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    predictions: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="24" cy="24" r="6" fill={color} opacity="0.6" />
        <circle cx="24" cy="24" r="2" fill={color}>
          <animate attributeName="r" values="2;3;2" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <path d="M24 6V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M24 36V42" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M6 24H12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M36 24H42" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    parsing: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="3" fill="none" opacity="0.6">
          <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M30 30L42 42" stroke={color} strokeWidth="4" strokeLinecap="round">
          <animate attributeName="stroke-width" values="4;5;4" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M14 20H26M20 14V26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    sentiment: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <path d="M4 36L12 24L20 28L28 16L36 22L44 12" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="d" values="M4 36L12 24L20 28L28 16L36 22L44 12;M4 32L12 28L20 20L28 24L36 16L44 18;M4 36L12 24L20 28L28 16L36 22L44 12" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="44" cy="12" r="4" fill={color}>
          <animate attributeName="cy" values="12;18;12" dur="3s" repeatCount="indefinite" />
        </circle>
        <path d="M4 40L44 40" stroke={color} strokeWidth="2" opacity="0.3" />
      </svg>
    ),
    earlyland: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <ellipse cx="24" cy="40" rx="12" ry="4" fill={color} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="0.8s" repeatCount="indefinite" />
        </ellipse>
        <path d="M24 8L30 24H18L24 8Z" fill={color} opacity="0.8">
          <animate attributeName="d" values="M24 8L30 24H18L24 8Z;M24 4L32 26H16L24 4Z;M24 8L30 24H18L24 8Z" dur="1s" repeatCount="indefinite" />
        </path>
        <rect x="18" y="24" width="12" height="14" rx="2" fill={color} />
        <path d="M16 38L12 44H20L16 38Z" fill="#f97316" />
        <path d="M32 38L36 44H28L32 38Z" fill="#f97316" />
        <circle cx="24" cy="18" r="3" fill="#fff" opacity="0.8" />
      </svg>
    ),
    nft: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
        <rect x="10" y="10" width="28" height="28" rx="2" fill={color} opacity="0.2" />
        <path d="M16 26L22 20L28 24L34 18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M16 26L22 20L28 24L34 18;M16 22L22 28L28 20L34 26;M16 26L22 20L28 24L34 18" dur="4s" repeatCount="indefinite" />
        </path>
        <circle cx="34" cy="18" r="3" fill={color}>
          <animate attributeName="cy" values="18;26;18" dur="4s" repeatCount="indefinite" />
        </circle>
        <rect x="14" y="30" width="20" height="4" rx="1" fill={color} opacity="0.4" />
      </svg>
    ),
    analytics: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <rect x="8" y="28" width="6" height="14" rx="1" fill={color} opacity="0.6">
          <animate attributeName="height" values="14;18;14" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="18" y="20" width="6" height="22" rx="1" fill={color} opacity="0.7">
          <animate attributeName="height" values="22;26;22" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <rect x="28" y="12" width="6" height="30" rx="1" fill={color} opacity="0.8" />
        <rect x="38" y="18" width="6" height="24" rx="1" fill={color} opacity="0.7">
          <animate attributeName="height" values="24;28;24" dur="2s" repeatCount="indefinite" />
        </rect>
      </svg>
    ),
    wallet: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <rect x="6" y="12" width="36" height="26" rx="3" fill={color} opacity="0.2" />
        <rect x="6" y="12" width="36" height="26" rx="3" stroke={color} strokeWidth="2" fill="none" />
        <rect x="32" y="20" width="10" height="10" rx="2" fill={color} opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </rect>
        <circle cx="37" cy="25" r="2" fill="#fff" opacity="0.8" />
        <path d="M12 18H28" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    trading: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <path d="M8 30L16 20L24 26L32 14L40 22" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="d" values="M8 30L16 20L24 26L32 14L40 22;M8 28L16 24L24 18L32 26L40 16;M8 30L16 20L24 26L32 14L40 22" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M32 14L40 22L32 22L32 14Z" fill={color} opacity="0.6" />
        <circle cx="40" cy="22" r="3" fill={color}>
          <animate attributeName="cy" values="22;16;22" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    staking: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="24" cy="24" r="10" fill={color} opacity="0.2">
          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M24 14V24L30 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="24" r="3" fill={color} />
      </svg>
    ),
    security: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <path d="M24 6L8 14V24C8 32 16 40 24 42C32 40 40 32 40 24V14L24 6Z" fill={color} opacity="0.2" />
        <path d="M24 6L8 14V24C8 32 16 40 24 42C32 40 40 32 40 24V14L24 6Z" stroke={color} strokeWidth="2" fill="none" />
        <path d="M18 24L22 28L30 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    defi: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="14" cy="24" r="8" fill={color} opacity="0.3" />
        <circle cx="34" cy="24" r="8" fill={color} opacity="0.3" />
        <circle cx="24" cy="14" r="8" fill={color} opacity="0.3" />
        <path d="M20 18L14 22M28 18L34 22M24 22V28" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="14" cy="24" r="4" fill={color} />
        <circle cx="34" cy="24" r="4" fill={color} />
        <circle cx="24" cy="14" r="4" fill={color} />
      </svg>
    ),
    community: ({ color = 'currentColor' }) => (
      <svg viewBox="0 0 48 48" fill="none" className="service-svg-icon">
        <circle cx="24" cy="18" r="6" fill={color} opacity="0.6" />
        <circle cx="12" cy="30" r="5" fill={color} opacity="0.4" />
        <circle cx="36" cy="30" r="5" fill={color} opacity="0.4" />
        <path d="M24 24C24 24 18 28 12 35M24 24C24 24 30 28 36 35" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    )
  };

  // Map module names to icons
  const getServiceIcon = (iconType) => {
    // Use icon field directly if provided
    if (iconType && ServiceIcons[iconType]) {
      return ServiceIcons[iconType];
    }
    // Fallback to name-based detection for backward compatibility
    const name = (iconType || '').toLowerCase();
    if (name.includes('дашборд') || name.includes('dashboard')) return ServiceIcons.dashboard;
    if (name.includes('otc') || name.includes('маркет')) return ServiceIcons.otc;
    if (name.includes('p2p') || name.includes('обмен')) return ServiceIcons.p2p;
    if (name.includes('прогноз') || name.includes('prediction')) return ServiceIcons.predictions;
    if (name.includes('парсинг') || name.includes('parsing')) return ServiceIcons.parsing;
    if (name.includes('сентимент') || name.includes('sentiment')) return ServiceIcons.sentiment;
    if (name.includes('early') || name.includes('land')) return ServiceIcons.earlyland;
    if (name.includes('nft') || name.includes('стратегия')) return ServiceIcons.nft;
    return ServiceIcons.dashboard; // default
  };

  const MiniChart = ({ data, color = '#10b981' }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <svg viewBox="0 0 100 40" className="mini-chart-svg">
          <line x1="0" y1="20" x2="100" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    }
    
    return (
      <svg viewBox="0 0 100 40" className="mini-chart-svg">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 ${40 - data[0] * 0.4} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 100} ${40 - d * 0.4}`).join(' ')} L 100 40 L 0 40 Z`}
          fill={`url(#gradient-${color})`}
        />
        <path
          d={`M 0 ${40 - data[0] * 0.4} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 100} ${40 - d * 0.4}`).join(' ')}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <section id="platform" className="py-20 bg-gradient-to-b from-gray-50 to-white" data-testid="platform-overview">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two Column Layout */}
        <div className="platform-layout">
          
          {/* LEFT COLUMN - Description */}
          <div className="platform-description">
            <span className="platform-badge">{settings[`section_badge${langSuffix}`] || defaults[`section_badge${langSuffix}`]}</span>
            <h2 className="platform-title">
              {settings[`section_title${langSuffix}`] || defaults[`section_title${langSuffix}`]}
            </h2>
            <p className="platform-intro">
              {settings[`section_intro${langSuffix}`] || defaults[`section_intro${langSuffix}`]}
            </p>

            {/* Numbered Services List */}
            <div className="services-list">
              {services.map((service, i) => (
                <div key={i} className="service-item">
                  <span className="service-num">{service.num}</span>
                  <div className="service-content">
                    <h3 className="service-title">{service[`title${langSuffix}`] || service.title_ru || service.title}</h3>
                    <p className="service-desc">{service[`description${langSuffix}`] || service.description_ru || service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Dashboard Analytics */}
          <div className="platform-dashboard">
            {/* Practice/Platform Info Header */}
            <div className="dashboard-header">
              <div className="dashboard-brand">
                <img 
                  src="/logo.svg" 
                  alt="FOMO" 
                  className="h-12 w-auto"
                  style={{ maxHeight: '48px' }}
                />
              </div>
              <div className="dashboard-meta">
                <span className="meta-item">👥 {settings.community?.value || '45.6K'}</span>
                <span className="meta-item">📊 {settings.visits?.value || '25'}</span>
              </div>
            </div>

            {/* Navigation Sidebar Mini */}
            <div className="dashboard-nav-mini">
              <button 
                className="nav-mini-item active"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </button>
              <button 
                className="nav-mini-item"
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                OTC
              </button>
              <button 
                className="nav-mini-item"
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Arena
              </button>
              <button 
                className="nav-mini-item"
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Influence
              </button>
              <button 
                className="nav-mini-item"
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                EarlyLand
              </button>
            </div>

            {/* Stats Cards Grid */}
            <div className="stats-cards-grid">
              {/* Community Card */}
              <div className="stat-card">
                <span className="stat-label">{platformStats.community[`label${langSuffix}`] || platformStats.community.label_ru || platformStats.community.label}</span>
                <div className="stat-value-row">
                  <span className="stat-value">{platformStats.community.value}</span>
                  <span className="stat-change positive">{platformStats.community.change}</span>
                </div>
                <div className="stat-chart">
                  <MiniChart data={platformStats.community.trend} color="#10b981" />
                </div>
                <span className="stat-period">{language === 'ru' ? 'за месяц' : 'vs last month'}</span>
              </div>

              {/* Visits Card */}
              <div className="stat-card">
                <span className="stat-label">{platformStats.visits[`label${langSuffix}`] || platformStats.visits.label_ru || platformStats.visits.label}</span>
                <div className="stat-value-row">
                  <span className="stat-value">{platformStats.visits.value}</span>
                  <span className="stat-change positive">{platformStats.visits.change}</span>
                </div>
                <div className="stat-chart">
                  <MiniChart data={platformStats.visits.trend} color="#3b82f6" />
                </div>
                <span className="stat-period">{language === 'ru' ? 'за месяц' : 'vs last month'}</span>
              </div>

              {/* Projects Card */}
              <div className="stat-card">
                <span className="stat-label">{platformStats.projects[`label${langSuffix}`] || platformStats.projects.label_ru || platformStats.projects.label}</span>
                <div className="stat-value-row">
                  <span className="stat-value">{platformStats.projects.value}</span>
                  <span className="stat-change positive">{platformStats.projects.change}</span>
                </div>
                <div className="stat-chart">
                  <MiniChart data={platformStats.projects.trend} color="#8b5cf6" />
                </div>
                <span className="stat-period">{language === 'ru' ? 'токенов' : 'tracked tokens'}</span>
              </div>

              {/* Red Flags Card */}
              <div className="stat-card">
                <span className="stat-label">{platformStats.alerts[`label${langSuffix}`] || platformStats.alerts.label_ru || platformStats.alerts.label}</span>
                <div className="stat-value-row">
                  <span className="stat-value">{platformStats.alerts.value}</span>
                  <span className="stat-change negative">{platformStats.alerts.change}</span>
                </div>
                <div className="stat-chart">
                  <MiniChart data={platformStats.alerts.trend} color="#ef4444" />
                </div>
                <span className="stat-period">{language === 'ru' ? 'обнаружено' : 'detected'}</span>
              </div>
            </div>

            {/* Service Modules Grid */}
            <div className="modules-section">
              <span className="modules-title">{language === 'ru' ? 'Наши сервисы' : 'Our Services'}</span>
              <div className="modules-grid">
                {serviceModules.map((module, i) => {
                  const IconComponent = getServiceIcon(module.icon || module.name_ru || module.name || module.name_en);
                  const moduleColor = {
                    emerald: '#10b981',
                    blue: '#3b82f6',
                    purple: '#8b5cf6',
                    orange: '#f97316',
                    pink: '#ec4899',
                    cyan: '#06b6d4',
                    green: '#22c55e',
                    violet: '#7c3aed'
                  }[module.color] || '#10b981';
                  
                  return (
                    <div key={i} className={`module-card module-${module.color}`}>
                      <div className="module-icon-svg">
                        <IconComponent color={moduleColor} />
                      </div>
                      <div className="module-info">
                        <span className="module-name">{module[`name${langSuffix}`] || module.name_ru || module.name}</span>
                        <span className="module-count">{module.count}</span>
                        <span className="module-label">{module[`label${langSuffix}`] || module.label_ru || module.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="bottom-stats">
              {bottomStats.map((stat, index) => (
                <div key={index} className="bottom-stat">
                  <span className="bottom-stat-value">{stat.value}</span>
                  <span className="bottom-stat-label">{stat[`label${langSuffix}`] || stat.label_ru || stat.label}</span>
                  <span className="bottom-stat-desc">{stat[`description${langSuffix}`] || stat.description_ru || stat.description}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// My Products Section (NEW) - FOMO Ecosystem
const MyProductsSection = ({ cards }) => {
  const { language } = useLanguage();
  
  const content = {
    ru: {
      badge: 'Наша экосистема',
      title1: 'Экосистема',
      title2: 'FOMO',
      subtitle: 'Комплексная платформа для работы с криптовалютами',
      description: 'Мы создаем единую платформу, объединяющую OTC-рынок, P2P-биржу, NFT-маркетплейс, аналитику крипторынка и onchain анализ. Все инструменты для успешной работы в одном месте.'
    },
    en: {
      badge: 'Our Ecosystem',
      title1: 'FOMO',
      title2: 'Ecosystem',
      subtitle: 'Comprehensive platform for cryptocurrency operations',
      description: 'We are building a unified platform combining OTC market, P2P exchange, NFT marketplace, crypto analytics and onchain analysis. All tools for successful work in one place.'
    }
  };
  
  const t = content[language] || content.ru;
  
  return (
    <section id="projects" className="py-16 bg-gray-50" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-gray-600 text-sm font-medium mb-4 shadow-sm">{t.badge}</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.title1} <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{t.title2}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-3">
            {t.subtitle}
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="mt-10">
          <ProjectDrawer cards={cards} />
        </div>
      </div>
    </section>
  );
};

// Simplified Roadmap
const RoadmapSection = ({ roadmapData }) => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      badge: 'Our Progress',
      title: 'Project Roadmap',
      subtitle: 'Track our development progress in real-time',
      completed: 'Completed',
      inProgress: 'In Progress',
      completeLabel: 'Complete',
      all: 'All',
      done: 'Done',
      progress: 'Progress'
    },
    ru: {
      badge: 'Наш прогресс',
      title: 'Дорожная карта проекта',
      subtitle: 'Отслеживайте прогресс разработки в реальном времени',
      completed: 'Завершено',
      inProgress: 'В процессе',
      completeLabel: 'Завершено',
      all: 'Все',
      done: 'Готово',
      progress: 'В процессе'
    }
  };

  const t = content[language];
  
  const defaultTasks = [
    { id: '1', name: 'Platform Architecture', status: 'done', category: 'Development' },
    { id: '2', name: 'Core Team Formation', status: 'done', category: 'Team' },
    { id: '3', name: 'Alpha Version Launch', status: 'done', category: 'Development' },
    { id: '4', name: 'Community Building', status: 'done', category: 'Marketing' },
    { id: '5', name: 'Beta Version v1.0', status: 'done', category: 'Development' },
    { id: '6', name: 'NFT Box 666 Mint', status: 'done', category: 'NFT' },
    { id: '7', name: 'Wallet Integration', status: 'done', category: 'Development' },
    { id: '8', name: 'Analytics Dashboard', status: 'done', category: 'Development' },
    { id: '9', name: 'Beta Version v1.1', status: 'progress', category: 'Development' },
    { id: '10', name: 'OTC Marketplace', status: 'progress', category: 'Development' },
    { id: '11', name: 'Mobile App Development', status: 'progress', category: 'Development' },
    { id: '12', name: 'Partnership Programs', status: 'progress', category: 'Business' },
  ];

  const tasks = roadmapData?.tasks?.length > 0 
    ? roadmapData.tasks.sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultTasks;
    
  const sectionBadge = roadmapData?.section_badge || t.badge;
  const sectionTitle = roadmapData?.section_title || t.title;
  const sectionSubtitle = roadmapData?.section_subtitle || t.subtitle;

  const [filter, setFilter] = useState('all');
  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const statusConfig = {
    done: { label: t.completed, color: 'bg-emerald-500', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50' },
    progress: { label: t.inProgress, color: 'bg-amber-500', textColor: 'text-amber-600', bgLight: 'bg-amber-50' },
  };

  const stats = {
    done: tasks.filter(task => task.status === 'done').length,
    progress: tasks.filter(task => task.status === 'progress').length,
  };
  
  const progressPercent = tasks.length > 0 ? Math.round((stats.done / tasks.length) * 100) : 0;

  return (
    <section id="roadmap" className="py-16 bg-white" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">{sectionBadge}</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {sectionTitle.split(' ').map((word, i) => 
              i === sectionTitle.split(' ').length - 1 
                ? <span key={i} className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{word}</span>
                : <span key={i}>{word} </span>
            )}
          </h2>
          <p className="text-xl text-gray-600">{sectionSubtitle}</p>
        </div>

        <div className="roadmap-progress-bar mb-8">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          <span className="progress-label">{progressPercent}% {t.completeLabel}</span>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[{ key: 'all', label: 'All Tasks' }, { key: 'done', label: `Completed (${stats.done})` }, { key: 'progress', label: `In Progress (${stats.progress})` }].map((f) => (
            <button 
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="roadmap-tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`roadmap-task-card ${task.status}`}>
              <div className="task-status-dot">
                <span className={`dot ${statusConfig[task.status]?.color || 'bg-gray-400'}`}></span>
              </div>
              <div className="task-content">
                <span className={`task-category ${statusConfig[task.status]?.bgLight || 'bg-gray-50'} ${statusConfig[task.status]?.textColor || 'text-gray-600'}`}>{task.category}</span>
                <h4 className="task-name">{getLangField(task, 'name')}</h4>
              </div>
              <span className={`task-status-badge ${statusConfig[task.status]?.bgLight || 'bg-gray-50'} ${statusConfig[task.status]?.textColor || 'text-gray-600'}`}>
                {statusConfig[task.status]?.label || task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Evolution Section - с анимированными SVG иконками и flip-карточками
const EvolutionSection = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('levels');
  const [flippedBadges, setFlippedBadges] = useState(new Set());
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [levels, setLevels] = useState([]);
  const [badges, setBadges] = useState([]);

  const content = {
    en: {
      badge: 'NFT Journey',
      title: 'User',
      titleHighlight: 'Evolution',
      subtitle: 'Progress through levels and unlock exclusive benefits'
    },
    ru: {
      badge: 'NFT Путешествие',
      title: 'Эволюция',
      titleHighlight: 'Пользователя',
      subtitle: 'Проходите уровни и открывайте эксклюзивные преимущества'
    }
  };

  const t = content[language];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [levelsRes, badgesRes] = await Promise.all([
          axios.get(`${API}/evolution-levels`),
          axios.get(`${API}/evolution-badges`)
        ]);
        setLevels(levelsRes.data);
        setBadges(badgesRes.data);
      } catch (err) {
        console.error('Error fetching evolution data:', err);
      }
    };
    fetchData();
  }, []);

  // SVG Icons for Levels - based on animation_type
  const LevelIcons = {
    stellar: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.2">
          <animate attributeName="r" values="28;30;28" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M32 8L38 24H54L41 34L47 50L32 40L17 50L23 34L10 24H26L32 8Z" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    cosmic: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <ellipse cx="32" cy="48" rx="16" ry="4" fill="currentColor" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1s" repeatCount="indefinite" />
        </ellipse>
        <path d="M32 10L38 28H28L32 10Z" fill="currentColor">
          <animate attributeName="d" values="M32 10L38 28H28L32 10Z;M32 8L40 30H26L32 8Z;M32 10L38 28H28L32 10Z" dur="0.5s" repeatCount="indefinite" />
        </path>
        <rect x="26" y="28" width="12" height="16" rx="2" fill="currentColor" />
        <path d="M24 44L20 52H26L24 44Z" fill="#f97316" />
        <path d="M40 44L44 52H38L40 44Z" fill="#f97316" />
        <circle cx="32" cy="22" r="4" fill="#fff" opacity="0.8" />
      </svg>
    ),
    galactic: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="32" cy="32" r="6" fill="currentColor" />
        <circle cx="32" cy="8" r="4" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    celestial: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="20" fill="currentColor">
          <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="32" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" /></line>
        <line x1="32" y1="32" x2="4" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.7s" repeatCount="indefinite" /></line>
        <line x1="32" y1="32" x2="32" y2="4" stroke="currentColor" strokeWidth="2" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.9s" repeatCount="indefinite" /></line>
        <line x1="32" y1="32" x2="32" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.1s" repeatCount="indefinite" /></line>
      </svg>
    ),
    astral: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.2">
          <animate attributeName="r" values="22;26;22" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="32" cy="32" rx="22" ry="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="32" cy="32" r="10" fill="currentColor" />
        <circle cx="32" cy="32" r="4" fill="#fff" opacity="0.8" />
        <circle cx="52" cy="32" r="3" fill="#fff">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    universal: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.15">
          <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M32 12L36 22H46L38 28L42 38L32 32L22 38L26 28L18 22H28L32 12Z" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="15s" repeatCount="indefinite" />
        </path>
        <path d="M24 8L32 4L40 8L32 6L24 8Z" fill="#fbbf24" />
        <path d="M22 10L32 6L42 10" stroke="#fbbf24" strokeWidth="2" fill="none" />
      </svg>
    ),
    pulse: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="8" fill="currentColor" />
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6">
          <animate attributeName="r" values="16;24;16" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3">
          <animate attributeName="r" values="24;30;24" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    nebula: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <ellipse cx="32" cy="32" rx="28" ry="16" fill="currentColor" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="32" cy="32" rx="20" ry="10" fill="currentColor" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="60 32 32" to="420 32 32" dur="15s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="32" cy="32" r="8" fill="currentColor">
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="28" r="2" fill="#fff" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" /></circle>
        <circle cx="44" cy="36" r="2" fill="#fff" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.3s" repeatCount="indefinite" /></circle>
      </svg>
    ),
    supernova: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="12" fill="currentColor">
          <animate attributeName="r" values="12;16;12" dur="0.8s" repeatCount="indefinite" />
        </circle>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line key={i} x1="32" y1="32" x2={32 + 24 * Math.cos(angle * Math.PI / 180)} y2={32 + 24 * Math.sin(angle * Math.PI / 180)} stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
          </line>
        ))}
      </svg>
    ),
    blackhole: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="10" fill="#0f172a" />
        <ellipse cx="32" cy="32" rx="24" ry="8" stroke="currentColor" strokeWidth="3" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15">
          <animate attributeName="r" values="28;26;28" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    aurora: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M8 40Q20 20 32 35Q44 50 56 30" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8">
          <animate attributeName="d" values="M8 40Q20 20 32 35Q44 50 56 30;M8 35Q20 50 32 30Q44 20 56 40;M8 40Q20 20 32 35Q44 50 56 30" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M8 45Q20 30 32 40Q44 55 56 35" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.5">
          <animate attributeName="d" values="M8 45Q20 30 32 40Q44 55 56 35;M8 40Q20 55 32 35Q44 25 56 45;M8 45Q20 30 32 40Q44 55 56 35" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M8 50Q20 40 32 45Q44 60 56 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3">
          <animate attributeName="d" values="M8 50Q20 40 32 45Q44 60 56 40;M8 45Q20 60 32 40Q44 30 56 50;M8 50Q20 40 32 45Q44 60 56 40" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    meteor: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="44" cy="20" r="8" fill="currentColor">
          <animate attributeName="cx" values="44;20;44" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20;44;20" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M44 20L56 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M44 20L60 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="48" cy="16" r="2" fill="#fff" opacity="0.6" />
      </svg>
    ),
    constellation: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="16" cy="20" r="3" fill="currentColor"><animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" /></circle>
        <circle cx="32" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" /></circle>
        <circle cx="48" cy="24" r="3" fill="currentColor"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" /></circle>
        <circle cx="40" cy="40" r="3" fill="currentColor"><animate attributeName="opacity" values="1;0.5;1" dur="1.3s" repeatCount="indefinite" /></circle>
        <circle cx="24" cy="48" r="3" fill="currentColor"><animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" /></circle>
        <line x1="16" y1="20" x2="32" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="32" y1="12" x2="48" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="48" y1="24" x2="40" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="40" x2="24" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="24" y1="48" x2="16" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    vortex: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 32Q32 16 48 16Q56 16 56 32Q56 48 40 48Q32 48 32 32" stroke="currentColor" strokeWidth="3" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M32 32Q32 22 42 22Q48 22 48 32Q48 42 38 42Q32 42 32 32" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="-360 32 32" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="32" r="4" fill="currentColor" />
      </svg>
    ),
    crystal: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 8L48 24L48 40L32 56L16 40L16 24L32 8Z" fill="currentColor" opacity="0.3" />
        <path d="M32 8L48 24L32 32L16 24L32 8Z" fill="currentColor" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M32 32L48 24L48 40L32 56L32 32Z" fill="currentColor" opacity="0.4" />
        <path d="M32 32L32 56L16 40L16 24L32 32Z" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></circle>
      </svg>
    )
  };

  // SVG Icons for Badges
  const BadgeIcons = {
    pioneer: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 4L40 16H52L44 28L48 44L32 36L16 44L20 28L12 16H24L32 4Z" fill="currentColor">
          <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="26" r="8" fill="#fff" opacity="0.3" />
        <path d="M26 52H38V58H26V52Z" fill="currentColor" />
        <path d="M22 58H42V62H22V58Z" fill="currentColor" opacity="0.7" />
      </svg>
    ),
    onboarding: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="26" r="18" fill="currentColor" opacity="0.2">
          <animate attributeName="r" values="18;20;18" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <path d="M32 8C20 8 14 18 14 26C14 34 20 44 32 56C44 44 50 34 50 26C50 18 44 8 32 8Z" fill="currentColor" />
        <circle cx="32" cy="26" r="8" fill="#fff" />
        <circle cx="32" cy="26" r="4" fill="currentColor" />
      </svg>
    ),
    reviewer: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="28" cy="28" r="8" fill="currentColor" opacity="0.3">
          <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
        </circle>
        <line x1="40" y1="40" x2="54" y2="54" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
    predictor: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="32" cy="32" r="4" fill="currentColor">
          <animate attributeName="r" values="4;6;4" dur="0.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    streak: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 4C32 4 24 20 24 32C24 44 28 56 32 60C36 56 40 44 40 32C40 20 32 4 32 4Z" fill="currentColor">
          <animate attributeName="d" values="M32 4C32 4 24 20 24 32C24 44 28 56 32 60C36 56 40 44 40 32C40 20 32 4 32 4Z;M32 2C32 2 22 18 22 32C22 46 27 58 32 62C37 58 42 46 42 32C42 18 32 2 32 2Z;M32 4C32 4 24 20 24 32C24 44 28 56 32 60C36 56 40 44 40 32C40 20 32 4 32 4Z" dur="0.8s" repeatCount="indefinite" />
        </path>
        <ellipse cx="32" cy="28" rx="6" ry="8" fill="#fbbf24" opacity="0.6" />
        <ellipse cx="32" cy="24" rx="3" ry="4" fill="#fff" opacity="0.4" />
      </svg>
    ),
    maker: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 8L58 32L32 56L6 32L32 8Z" fill="currentColor" opacity="0.2" />
        <path d="M32 16L50 32L32 48L14 32L32 16Z" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="32" r="8" fill="#fff" opacity="0.5" />
        <path d="M28 30L32 26L36 30L32 34L28 30Z" fill="currentColor" />
      </svg>
    ),
    p2p: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="20" cy="32" r="12" fill="currentColor" />
        <circle cx="44" cy="32" r="12" fill="currentColor" />
        <path d="M28 32H36" stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 8;8 0;0 8" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="20" cy="32" r="4" fill="#fff" opacity="0.5" />
        <circle cx="44" cy="32" r="4" fill="#fff" opacity="0.5" />
      </svg>
    ),
    community: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 8L38 20H50L40 28L44 40L32 32L20 40L24 28L14 20H26L32 8Z" fill="currentColor">
          <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" additive="sum" />
        </path>
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.5" />
        <path d="M24 48H40V52H24V48Z" fill="currentColor" opacity="0.6" />
        <path d="M20 52H44V56H20V52Z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    singularity: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1">
          <animate attributeName="r" values="24;28;24" dur="3s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(60 32 32)">
          <animateTransform attributeName="transform" type="rotate" from="60 32 32" to="420 32 32" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(120 32 32)">
          <animateTransform attributeName="transform" type="rotate" from="120 32 32" to="480 32 32" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="32" cy="32" r="6" fill="currentColor" />
      </svg>
    ),
    trophy: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M20 12H44V28C44 36 38 44 32 44C26 44 20 36 20 28V12Z" fill="currentColor">
          <animate attributeName="opacity" values="1;0.85;1" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M20 16H12V24C12 28 16 32 20 32V16Z" fill="currentColor" opacity="0.7" />
        <path d="M44 16H52V24C52 28 48 32 44 32V16Z" fill="currentColor" opacity="0.7" />
        <rect x="28" y="44" width="8" height="8" fill="currentColor" />
        <rect x="24" y="52" width="16" height="4" fill="currentColor" />
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.3" />
      </svg>
    ),
    medal: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M24 4H40L36 20H28L24 4Z" fill="currentColor" opacity="0.6" />
        <circle cx="32" cy="36" r="18" fill="currentColor">
          <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="36" r="12" stroke="#fff" strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M32 28L34 32H38L35 35L36 40L32 37L28 40L29 35L26 32H30L32 28Z" fill="#fff" opacity="0.5" />
      </svg>
    ),
    crown: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M8 44L16 20L28 32L32 16L36 32L48 20L56 44H8Z" fill="currentColor">
          <animate attributeName="d" values="M8 44L16 20L28 32L32 16L36 32L48 20L56 44H8Z;M8 42L16 18L28 30L32 14L36 30L48 18L56 42H8Z;M8 44L16 20L28 32L32 16L36 32L48 20L56 44H8Z" dur="2s" repeatCount="indefinite" />
        </path>
        <rect x="8" y="44" width="48" height="8" fill="currentColor" opacity="0.8" />
        <circle cx="16" cy="20" r="4" fill="#fff" opacity="0.5" />
        <circle cx="32" cy="16" r="4" fill="#fff" opacity="0.5" />
        <circle cx="48" cy="20" r="4" fill="#fff" opacity="0.5" />
      </svg>
    ),
    diamond: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 8L56 28L32 56L8 28L32 8Z" fill="currentColor" opacity="0.3" />
        <path d="M32 8L56 28L32 36L8 28L32 8Z" fill="currentColor" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M32 36L56 28L32 56L8 28L32 36Z" fill="currentColor" opacity="0.5" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="#fff" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.4"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="1s" repeatCount="indefinite" /></circle>
      </svg>
    ),
    lightning: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M36 4L16 32H28L24 60L48 28H36L40 4H36Z" fill="currentColor">
          <animate attributeName="opacity" values="1;0.7;1" dur="0.5s" repeatCount="indefinite" />
        </path>
        <path d="M36 4L32 20H40L36 4Z" fill="#fff" opacity="0.4" />
      </svg>
    ),
    rocket: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <ellipse cx="32" cy="56" rx="12" ry="4" fill="currentColor" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        <path d="M32 8C26 16 24 28 24 36L32 44L40 36C40 28 38 16 32 8Z" fill="currentColor">
          <animate attributeName="d" values="M32 8C26 16 24 28 24 36L32 44L40 36C40 28 38 16 32 8Z;M32 6C26 14 24 26 24 34L32 42L40 34C40 26 38 14 32 6Z;M32 8C26 16 24 28 24 36L32 44L40 36C40 28 38 16 32 8Z" dur="0.8s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="24" r="4" fill="#fff" opacity="0.5" />
        <path d="M24 36L18 40L22 44" fill="currentColor" opacity="0.7" />
        <path d="M40 36L46 40L42 44" fill="currentColor" opacity="0.7" />
        <path d="M28 44L32 56L36 44" fill="#f97316" opacity="0.8"><animate attributeName="opacity" values="0.8;0.4;0.8" dur="0.3s" repeatCount="indefinite" /></path>
      </svg>
    ),
    heart: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M32 56L12 36C4 28 4 16 14 12C20 10 26 12 32 20C38 12 44 10 50 12C60 16 60 28 52 36L32 56Z" fill="currentColor">
          <animate attributeName="d" values="M32 56L12 36C4 28 4 16 14 12C20 10 26 12 32 20C38 12 44 10 50 12C60 16 60 28 52 36L32 56Z;M32 54L14 36C6 28 6 18 15 14C21 12 26 14 32 22C38 14 43 12 49 14C58 18 58 28 50 36L32 54Z;M32 56L12 36C4 28 4 16 14 12C20 10 26 12 32 20C38 12 44 10 50 12C60 16 60 28 52 36L32 56Z" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="22" cy="24" r="4" fill="#fff" opacity="0.3" />
      </svg>
    ),
    gem: () => (
      <svg viewBox="0 0 64 64" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M16 20L32 8L48 20L32 56L16 20Z" fill="currentColor" opacity="0.4" />
        <path d="M16 20L32 8L48 20H16Z" fill="currentColor" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M16 20L32 32L48 20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M32 32V56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="32" cy="18" r="4" fill="#fff" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></circle>
      </svg>
    )
  };

  const getIconComponent = (type, isLevel = true) => {
    const icons = isLevel ? LevelIcons : BadgeIcons;
    return icons[type] || icons[isLevel ? 'stellar' : 'pioneer'];
  };

  const toggleBadgeFlip = (badgeId) => {
    setFlippedBadges(prev => {
      const newSet = new Set(prev);
      if (newSet.has(badgeId)) newSet.delete(badgeId);
      else newSet.add(badgeId);
      return newSet;
    });
  };

  const calculateProgress = (level) => {
    const max = level.fomo_score_max || 1000;
    return Math.min(100, ((level.fomo_score_max - level.fomo_score_min) / max) * 100 + 15);
  };

  return (
    <section id="evolution" data-testid="evolution-section" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '100px 0',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '10px 24px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '50px', color: '#10b981', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
            {t.badge}
          </span>
          <h2 style={{ fontSize: '52px', fontWeight: '800', color: 'white', margin: '0 0 16px 0', lineHeight: '1.1' }}>
            {t.title} <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.titleHighlight}</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', margin: 0 }}>{t.subtitle}</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '50px' }}>
          {['levels', 'badges'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 36px',
              background: activeTab === tab ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
              border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50px', color: activeTab === tab ? 'white' : '#94a3b8',
              fontSize: '16px', fontWeight: '600', cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 4px 24px rgba(16, 185, 129, 0.35)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ width: '24px', height: '24px' }}>
                {tab === 'levels' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 6h2v12h-2V9zm4 4h2v8h-2v-8z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 8H21L16 12L18 19L12 15L6 19L8 12L3 8H9L12 2Z"/></svg>
                )}
              </span>
              {tab === 'levels' ? 'FOMO Score Levels' : 'Badges'}
            </button>
          ))}
        </div>

        {/* Levels Content */}
        {activeTab === 'levels' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {levels.map((level, idx) => {
              const IconComponent = getIconComponent(level.animation_type, true);
              const gradient = `linear-gradient(135deg, ${level.gradient_from}, ${level.gradient_to})`;
              const glowColor = `${level.gradient_from}66`;
              return (
                <div key={level.id || idx} 
                  onMouseEnter={() => setHoveredLevel(idx)} 
                  onMouseLeave={() => setHoveredLevel(null)}
                  style={{
                    background: hoveredLevel === idx ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid', borderColor: hoveredLevel === idx ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.08)',
                    borderRadius: '24px', padding: '28px', cursor: 'pointer',
                    transform: hoveredLevel === idx ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredLevel === idx ? `0 20px 50px ${glowColor}` : 'none',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '20px', padding: '12px', background: gradient, boxShadow: `0 8px 24px ${glowColor}`, color: 'white' }}>
                      <IconComponent />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: '0 0 6px 0' }}>{getLangField(level, 'rank')}</h3>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 12px', borderRadius: '20px' }}>
                        FOMO: {level.fomo_score_min}–{level.fomo_score_max}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                    <div style={{ height: '100%', width: `${calculateProgress(level)}%`, background: gradient, borderRadius: '10px', transition: 'width 1s ease' }} />
                  </div>
                  <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 20px 0' }}>{getLangField(level, 'description')}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Next:</span>
                    <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>{getLangField(level, 'next_level')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Badges Content */}
        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {badges.map((badge) => {
              const IconComponent = getIconComponent(badge.animation_type, false);
              const gradient = `linear-gradient(135deg, ${badge.gradient_from}, ${badge.gradient_to})`;
              const glowColor = `${badge.gradient_from}80`;
              return (
                <div key={badge.id}
                  onClick={() => toggleBadgeFlip(badge.id)}
                  style={{ perspective: '1000px', height: '280px', cursor: 'pointer' }}>
                  <div style={{
                    position: 'relative', width: '100%', height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: flippedBadges.has(badge.id) ? 'rotateY(180deg)' : 'rotateY(0)',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    {/* Front Side */}
                    <div style={{
                      position: 'absolute', width: '100%', height: '100%',
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <div style={{ width: '100px', height: '100px', borderRadius: '24px', padding: '16px', background: gradient, boxShadow: `0 12px 40px ${glowColor}`, marginBottom: '24px', color: 'white' }}>
                        <IconComponent />
                      </div>
                      <h4 style={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: '0 0 8px 0', textAlign: 'center' }}>{getLangField(badge, 'name')}</h4>
                      <span style={{ fontSize: '14px', fontWeight: '600', padding: '6px 16px', borderRadius: '20px', background: gradient, color: 'white' }}>
                        Earn {badge.xp_requirement?.toLocaleString()} XP
                      </span>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '16px', textAlign: 'center' }}>Click to see conditions</p>
                    </div>
                    
                    {/* Back Side */}
                    <div style={{
                      position: 'absolute', width: '100%', height: '100%',
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: gradient, borderRadius: '24px', padding: '32px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'center'
                    }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: '0 0 16px 0' }}>How to earn:</h4>
                      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', margin: '0 0 20px 0' }}>{getLangField(badge, 'condition')}</p>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>"{getLangField(badge, 'description')}"</p>
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: 'auto', textAlign: 'center' }}>Click to flip back</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const scrollContainerRef = useRef(null);
  const { language } = useLanguage();
  const t = useTranslation();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API}/team-members`);
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []);

  const toggleFlip = (memberId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Split team into main and team members
  const mainTeam = team.filter(m => m.member_type === 'main');
  const teamMembers = team.filter(m => m.member_type === 'team_member');

  if (team.length === 0) {
    return (
      <section id="team" className="py-16 bg-white" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">{t('team.badge')}</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('team.title')}</h2>
            <p className="text-xl text-gray-600">{t('team.subtitle')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 bg-white overflow-hidden" data-testid="team-section">
      {/* Main Team */}
      {mainTeam.length > 0 && (
        <>
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-4">{t('team.badge')}</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t('team.title')}</h2>
              <p className="text-xl text-gray-600">{t('team.subtitle')}</p>
            </div>
          </div>

          <div className="team-slider-container">
            <button 
              onClick={() => scroll('left')} 
              className="team-nav-button team-nav-left"
              aria-label="Scroll left"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="team-slider-scroll" ref={scrollContainerRef}>
              <div className="team-slider-track">
                {mainTeam.map((member) => (
              <div 
                key={member.id}
                className={`team-card ${flippedCards.has(member.id) ? 'flipped' : ''}`}
                onClick={() => toggleFlip(member.id)}
                data-testid={`team-card-${member.id}`}
              >
                <div className="team-card-inner">
                  {/* Front Side */}
                  <div className="team-card-front">
                    <div className="team-card-image">
                      {member.image_url ? (
                        <img 
                          src={member.image_url.startsWith('/') ? `${BACKEND_URL}${member.image_url}` : member.image_url}
                          alt={getLangFieldWithContext(member, 'name', language)}
                        />
                      ) : (
                        <div className="team-avatar-placeholder">
                          <span>{(getLangFieldWithContext(member, 'name', language) || 'U').charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="team-card-info">
                      <h3 className="team-member-name">{getLangFieldWithContext(member, 'name', language)}</h3>
                      <p className="team-member-position">{getLangFieldWithContext(member, 'position', language)}</p>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="team-card-back">
                    <div className="team-card-back-content">
                      <h3 className="team-member-name-back">{getLangFieldWithContext(member, 'name', language)}</h3>
                      <p className="team-member-position-back">{getLangFieldWithContext(member, 'position', language)}</p>
                      <div className="team-member-bio">
                        {getLangFieldWithContext(member, 'bio', language)}
                      </div>
                      {member.social_links && member.displayed_socials && member.displayed_socials.length > 0 && (
                        <div className="team-social-links">
                          {member.displayed_socials.slice(0, 4).map((social) => {
                            const link = member.social_links[social];
                            if (!link) return null;
                            
                            const socialIcons = {
                              twitter: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                              ),
                              linkedin: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              ),
                              telegram: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                </svg>
                              ),
                              instagram: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              ),
                              tiktok: (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                              ),
                              website: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                              ),
                            };
                            
                            return (
                              <a 
                                key={social}
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="team-social-link"
                                title={social}
                              >
                                {socialIcons[social]}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="team-nav-button team-nav-right"
          aria-label="Scroll right"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      </>
      )}

      {/* Team Members Section */}
      {teamMembers.length > 0 && (
        <div className="team-members-section">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="team-members-title">{t('team.teamMembers')}</h3>
            <div className="team-members-grid">
              {teamMembers.map((member) => {
                const initials = getLangFieldWithContext(member, 'name', language)
                  .split(' ')
                  .map(n => n.charAt(0))
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div key={member.id} className="team-member-card">
                    <div className="team-member-avatar">
                      {member.image_url ? (
                        <img src={member.image_url} alt={getLangFieldWithContext(member, 'name', language)} />
                      ) : (
                        <span className="team-member-initials">{initials}</span>
                      )}
                    </div>
                    <h4 className="team-member-name">{getLangFieldWithContext(member, 'name', language)}</h4>
                    <p className="team-member-position">{getLangFieldWithContext(member, 'position', language)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==================== PARTNERS SECTION ====================
const PartnersSection = ({ partnersData }) => {
  const [activeCategory, setActiveCategory] = useState('partners');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8; // 2 ряда по 4 карточки
  const { language } = useLanguage();
  const t = useTranslation();

  const partners = partnersData || [];

  const categories = [
    { key: 'partners', label: t('partners.tabs.partners') },
    { key: 'media', label: t('partners.tabs.media') },
    { key: 'portfolio', label: t('partners.tabs.portfolio') },
  ];

  const filteredPartners = partners
    .filter(p => p.category === activeCategory)
    .filter(p => 
      searchQuery === '' || 
      getLangFieldWithContext(p, 'name', language).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLangFieldWithContext(p, 'description', language).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Pagination logic
  const totalPages = Math.ceil(filteredPartners.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPartners = filteredPartners.slice(startIndex, endIndex);

  const categoryCount = (cat) => partners.filter(p => p.category === cat).length;
  const totalCount = partners.length;

  // Reset to page 1 when category or search changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Marquee text
  const marqueeText = "Ecosystem · Partners · Media · Portfolio · Integrations · Network · ";

  return (
    <section id="partners" className="partners-section-dark" data-testid="partners-section">
      {/* Marquee Header */}
      <div className="partners-marquee-wrapper">
        <div className="partners-marquee">
          <div className="marquee-track">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="marquee-text">{marqueeText}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="partners-content">
        {/* Category Tabs */}
        <div className="partners-tabs-row">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`partner-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.label}
              <span className="tab-count-badge">{categoryCount(cat.key)}</span>
            </button>
          ))}
        </div>

        {/* Full Width Search */}
        <div className="partners-search-full">
          <svg className="search-icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t('partners.search')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input-full"
          />
        </div>

        {/* Partners Grid */}
        <div className="partners-grid-new">
          {paginatedPartners.length === 0 ? (
            <div className="no-partners-msg">
              <p>{t('partners.noResults')}</p>
            </div>
          ) : (
            paginatedPartners.map((partner) => (
              <a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card-new"
              >
                <div className="partner-card-content">
                  <div className="partner-logo-wrapper">
                    <div className="partner-logo-box">
                      {partner.image_url ? (
                        <img src={partner.image_url} alt={getLangFieldWithContext(partner, 'name', language)} className="partner-logo-img" />
                      ) : (
                        <span className="partner-initial">{getLangFieldWithContext(partner, 'name', language).charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div className="partner-info-wrapper">
                    <div className="partner-title-row">
                      <h3 className="partner-name-new">{getLangFieldWithContext(partner, 'name', language)}</h3>
                      <svg className="partner-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                    <p className="partner-desc-new">{getLangFieldWithContext(partner, 'description', language)}</p>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredPartners.length > ITEMS_PER_PAGE && (
          <div className="partners-pagination">
            <button 
              className="pagination-arrow"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button 
              className="pagination-arrow"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const CommunitySection = ({ communitySettings }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const settings = communitySettings || {
    title_ru: "Присоединяйся к сообществу",
    title_en: "Join the Community",
    description_ru: "Общайтесь с web3 основателями, разработчиками и крипто-энтузиастами со всего мира.",
    description_en: "Connect with web3 founders, developers, and crypto enthusiasts from around the world.",
    socials: [
      { platform: "twitter", url: "https://twitter.com", enabled: true },
      { platform: "telegram", url: "https://t.me", enabled: true },
      { platform: "discord", url: "https://discord.com", enabled: true }
    ],
    subscribe_enabled: true,
    subscribe_title_ru: "Будь в курсе",
    subscribe_title_en: "Stay Updated"
  };

  // Get title with fallback for old/new data structure
  const title = settings.title_ru || settings.title || "Join the Community";
  const description = settings.description_ru || settings.description || "";
  const subscribeTitle = settings.subscribe_title_ru || settings.subscribe_title || "Stay Updated";

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Add actual subscribe logic
    setMessage('✅ Thanks for subscribing!');
    setEmail('');
    setTimeout(() => setMessage(''), 3000);
  };

  const socialIcons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    telegram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    discord: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  };

  // Split title into parts - handle both old "title" and new "title_ru/title_en" structure
  const titleParts = title.split('Community') || title.split('сообществу');
  const titleBefore = titleParts[0] || 'Join the ';
  const communityWord = title.includes('Community') ? 'Community' : 'сообществу';

  const enabledSocials = (settings.socials || []).filter(s => s.enabled);

  return (
    <section 
      className="community-section" 
      data-testid="community-section"
      style={{
        background: 'white',
        padding: '80px 0'
      }}
    >
      <div 
        className="community-container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 40px',
          textAlign: 'center'
        }}
      >
        <h2 
          className="community-title"
          style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}
        >
          {titleBefore}
          <span 
            className="community-highlight"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {communityWord}
          </span>
        </h2>
        <p 
          className="community-description"
          style={{
            fontSize: '20px',
            color: '#6b7280',
            margin: '0 0 48px 0',
            lineHeight: '1.6'
          }}
        >
          {description}
        </p>

        {/* Social Media Buttons */}
        {enabledSocials.length > 0 && (
          <div 
            className="community-socials" 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '16px', 
              marginBottom: '48px', 
              flexWrap: 'wrap' 
            }}
          >
            {enabledSocials.map((social, idx) => {
              const colors = {
                twitter: { bg: '#1d4ed8', hover: '#1e40af' },
                telegram: { bg: '#0088cc', hover: '#006699' },
                discord: { bg: '#5865f2', hover: '#4752c4' },
                github: { bg: '#24292e', hover: '#1b1f23' }
              };
              const color = colors[social.platform] || { bg: '#6b7280', hover: '#4b5563' };
              
              return (
                <a 
                  key={idx}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`community-social-btn ${social.platform}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    background: color.bg,
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {socialIcons[social.platform] || null}
                  {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                </a>
              );
            })}
          </div>
        )}

        {/* Subscribe Card */}
        {settings.subscribe_enabled && (
          <div 
            className="community-subscribe-card"
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <h3 
              className="community-subscribe-title"
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 24px 0'
              }}
            >
              {subscribeTitle}
            </h3>
            <form 
              onSubmit={handleSubscribe} 
              className="community-subscribe-form"
              style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '500px',
                margin: '0 auto'
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="community-email-input"
                style={{
                  flex: '1',
                  padding: '14px 20px',
                  fontSize: '16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '50px',
                  outline: 'none'
                }}
                required
              />
              <button 
                type="submit" 
                className="community-subscribe-btn"
                style={{
                  padding: '14px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              >
                Subscribe
              </button>
            </form>
            {message && (
              <p 
                className="community-message"
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  color: '#10b981',
                  fontWeight: '500'
                }}
              >
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};



// ==================== FAQ SECTION ====================
const FAQSection = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = faqData || [];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (faqs.length === 0) return null;

  return (
    <section className="faq-section" data-testid="faq-section" style={{ background: 'white', padding: '120px 0 100px' }}>
      <div className="faq-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <h2 className="faq-title" style={{ fontSize: '96px', fontWeight: '700', textAlign: 'center', color: '#047857', margin: '0 0 80px 0', letterSpacing: '-0.03em', lineHeight: '1' }}>FAQ</h2>
        <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={faq.id || index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              style={{
                background: openIndex === index ? '#a7f3d0' : '#d1fae5',
                borderRadius: '24px',
                padding: '32px 36px',
                cursor: 'pointer',
                border: openIndex === index ? '2px solid #047857' : '2px solid transparent',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="faq-question-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                <h3 className="faq-question" style={{ fontSize: '20px', fontWeight: '600', color: '#047857', margin: '0', lineHeight: '1.4', flex: '1' }}>{faq.question}</h3>
                <span className="faq-icon" style={{ fontSize: '32px', fontWeight: '300', color: '#047857', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1' }}>{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid rgba(4, 120, 87, 0.2)', fontSize: '16px', lineHeight: '1.7', color: '#065f46' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = ({ footerSettings }) => {
  const { language } = useLanguage();
  const settings = footerSettings || {};
  
  // Translations for footer
  const translations = {
    en: {
      getStarted: "GET STARTED",
      launchPlatform: "Launch Platform",
      company: "COMPANY",
      about: "About",
      team: "Team",
      platform: "PLATFORM",
      projects: "Projects",
      roadmap: "Roadmap",
      partners: "Partners",
      other: "OTHER",
      documentation: "Documentation",
      support: "Support",
      address: "ADDRESS",
      allRightsReserved: "All rights reserved.",
      regulatoryDisclosures: "Regulatory Disclosures",
      privacyNotice: "Privacy Notice",
      security: "Security"
    },
    ru: {
      getStarted: "НАЧАТЬ",
      launchPlatform: "Запустить платформу",
      company: "КОМПАНИЯ",
      about: "О нас",
      team: "Команда",
      platform: "ПЛАТФОРМА",
      projects: "Проекты",
      roadmap: "Дорожная карта",
      partners: "Партнёры",
      other: "ДРУГОЕ",
      documentation: "Документация",
      support: "Поддержка",
      address: "АДРЕС",
      allRightsReserved: "Все права защищены.",
      regulatoryDisclosures: "Нормативные раскрытия",
      privacyNotice: "Политика конфиденциальности",
      security: "Безопасность"
    }
  };

  const t = translations[language];
  
  // Use navigation sections from settings or defaults with translations
  const navSections = settings.navigation_sections || [
    {
      title: t.company,
      links: [
        { name: t.about, url: "#about" },
        { name: t.team, url: "#team" }
      ]
    },
    {
      title: t.platform,
      links: [
        { name: t.projects, url: "#projects" },
        { name: t.roadmap, url: "#roadmap" },
        { name: t.partners, url: "#partners" }
      ]
    },
    {
      title: t.other,
      links: [
        { name: t.documentation, url: "#" },
        { name: t.support, url: "#" }
      ]
    }
  ];

  // Social media icons map
  const socialIcons = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    telegram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  };

  return (
    <footer className="footer-clearstreet" data-testid="footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* GET STARTED Section */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t.getStarted}</h3>
            <a 
              href={settings.cta_button_url || '#'} 
              className="footer-login-btn"
              target={settings.cta_button_url && settings.cta_button_url !== '#' ? '_blank' : '_self'}
              rel={settings.cta_button_url && settings.cta_button_url !== '#' ? 'noopener noreferrer' : undefined}
            >
              {settings.cta_button_text || t.launchPlatform + ' →'}
            </a>
          </div>

          {/* Navigation Sections from Settings */}
          {navSections.map((section, idx) => (
            <div key={idx} className="footer-column">
              <h3 className="footer-column-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="footer-link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ADDRESS Section */}
          <div className="footer-column">
            <h3 className="footer-column-title">{t.address}</h3>
            <address className="footer-address">
              <p>{settings.company_name || 'FOMO'}</p>
              {settings.company_address ? (
                settings.company_address.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))
              ) : (
                <>
                  <p>4 World Trade Center</p>
                  <p>150 Greenwich St Floor 45</p>
                  <p>New York, NY 10007</p>
                </>
              )}
              <p className="footer-phone">{settings.company_phone || '(000) 000-0000'}</p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          {/* Social Media Icons */}
          <div className="footer-social">
            {(settings.social_media || []).map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label={social.platform}
              >
                {socialIcons[social.platform.toLowerCase()] || (
                  <span className="w-5 h-5 flex items-center justify-center">
                    {social.platform.charAt(0).toUpperCase()}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="footer-legal-links">
            <a href={settings.regulatory_disclosures_url || '#'} className="footer-legal-link">
              {t.regulatoryDisclosures}
            </a>
            <a href={settings.privacy_notice_url || '#'} className="footer-legal-link">
              {t.privacyNotice}
            </a>
            <a href={settings.security_url || '#'} className="footer-legal-link">
              {t.security}
            </a>
          </div>

          {/* Made By */}
          {settings.made_by_text && (
            <div className="footer-made-by">
              {settings.made_by_url ? (
                <a href={settings.made_by_url} target="_blank" rel="noopener noreferrer">
                  {settings.made_by_text}
                </a>
              ) : (
                <span>{settings.made_by_text}</span>
              )}
            </div>
          )}
        </div>

        {/* Copyright and Disclaimer */}
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            {settings.copyright_text || `© 2025 FOMO. ${t.allRightsReserved}`}
          </p>
          {settings.legal_disclaimer && (
            <p className="footer-disclaimer">{settings.legal_disclaimer}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

// Main App Component
// ==================== ADMIN PAGE COMPONENT ====================
const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data states for admin panel
  const [cards, setCards] = useState([]);
  const [team, setTeam] = useState([]);
  const [platformSettings, setPlatformSettings] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [partnersData, setPartnersData] = useState([]);
  const [footerSettings, setFooterSettings] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [communitySettings, setCommunitySettings] = useState(null);

  // Fetch functions
  const fetchAllData = async () => {
    try {
      const [cardsRes, teamRes, platformRes, roadmapRes, partnersRes, footerRes, faqRes, communityRes] = await Promise.all([
        axios.get(`${API}/drawer-cards`),
        axios.get(`${API}/team-members`),
        axios.get(`${API}/platform-settings`),
        axios.get(`${API}/roadmap`),
        axios.get(`${API}/partners`),
        axios.get(`${API}/footer-settings`),
        axios.get(`${API}/faq`),
        axios.get(`${API}/community-settings`)
      ]);
      setCards(cardsRes.data);
      setTeam(teamRes.data);
      setPlatformSettings(platformRes.data);
      setRoadmapData(roadmapRes.data);
      setPartnersData(partnersRes.data);
      setFooterSettings(footerRes.data);
      setFaqData(faqRes.data);
      setCommunitySettings(communityRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchAllData();
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.token);
        setIsAuthenticated(true);
        fetchAllData();
      }
    } catch (err) {
      setError('Invalid password');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#6b7280' }}>Загрузка...</p>
        </div>
      </div>
    );
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '28px',
              color: 'white',
              fontWeight: 'bold'
            }}>F</div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
              FOMO Admin
            </h1>
            <p style={{ color: '#6b7280', margin: 0 }}>Enter password to login</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: loginLoading ? 'not-allowed' : 'pointer',
                opacity: loginLoading ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loginLoading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <a href="/" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>
              ← Back to Main Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Admin Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>F</div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>FOMO Admin Panel</h1>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Website content management</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/" target="_blank" style={{
            padding: '10px 20px',
            background: '#f3f4f6',
            color: '#374151',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            👁️ Open Site
          </a>
          <button onClick={handleLogout} style={{
            padding: '10px 20px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Admin Content */}
      <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
        <UnifiedAdminPanel 
          isOpen={true} 
          onClose={() => {}} 
          cards={cards} 
          team={team}
          platformSettings={platformSettings}
          roadmapData={roadmapData}
          partnersData={partnersData}
          footerSettings={footerSettings}
          faqData={faqData}
          communitySettings={communitySettings}
          onCardsUpdate={() => axios.get(`${API}/drawer-cards`).then(r => setCards(r.data))}
          onTeamUpdate={() => axios.get(`${API}/team-members`).then(r => setTeam(r.data))}
          onPlatformUpdate={() => axios.get(`${API}/platform-settings`).then(r => setPlatformSettings(r.data))}
          onRoadmapUpdate={() => axios.get(`${API}/roadmap`).then(r => setRoadmapData(r.data))}
          onPartnersUpdate={() => axios.get(`${API}/partners`).then(r => setPartnersData(r.data))}
          onFooterUpdate={() => axios.get(`${API}/footer-settings`).then(r => setFooterSettings(r.data))}
          onFAQUpdate={() => axios.get(`${API}/faq`).then(r => setFaqData(r.data))}
          onCommunityUpdate={() => axios.get(`${API}/community-settings`).then(r => setCommunitySettings(r.data))}
          onLogout={handleLogout}
          isFullPage={true}
        />
      </div>
    </div>
  );
};


// ==================== MAIN SITE COMPONENT ====================
const MainSite = () => {
  const [cards, setCards] = useState([]);
  const [team, setTeam] = useState([]);
  const [platformSettings, setPlatformSettings] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [partnersData, setPartnersData] = useState([]);
  const [footerSettings, setFooterSettings] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [communitySettings, setCommunitySettings] = useState(null);
  const [heroSettings, setHeroSettings] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [cardsRes, teamRes, platformRes, roadmapRes, partnersRes, footerRes, faqRes, communityRes, heroRes] = await Promise.all([
          axios.get(`${API}/drawer-cards`),
          axios.get(`${API}/team-members`),
          axios.get(`${API}/platform-settings`),
          axios.get(`${API}/roadmap`),
          axios.get(`${API}/partners`),
          axios.get(`${API}/footer-settings`),
          axios.get(`${API}/faq`),
          axios.get(`${API}/community-settings`),
          axios.get(`${API}/hero-settings`)
        ]);
        setCards(cardsRes.data);
        setTeam(teamRes.data);
        setPlatformSettings(platformRes.data);
        setRoadmapData(roadmapRes.data);
        setPartnersData(partnersRes.data);
        setFooterSettings(footerRes.data);
        setFaqData(faqRes.data);
        setCommunitySettings(communityRes.data);
        setHeroSettings(heroRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="App bg-white">
      <Navigation />
      <HeroSection heroSettings={heroSettings} />
      <AboutSection whitepaperUrl={footerSettings?.whitepaper_url} />
      <PlatformOverview platformSettings={platformSettings} />
      <MyProductsSection cards={platformSettings?.service_modules || cards} />
      <RoadmapSection roadmapData={roadmapData} />
      <EvolutionSection />
      <TeamSection />
      <PartnersSection partnersData={partnersData} />
      <CommunitySection communitySettings={communitySettings} />
      <FAQSection faqData={faqData} />
      <Footer footerSettings={footerSettings} />
    </div>
  );
};


// ==================== APP WITH ROUTER ====================
function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
