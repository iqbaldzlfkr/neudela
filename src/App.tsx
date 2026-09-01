import { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  Info, 
  Palette, 
  Code, 
  Heart, 
  Layers, 
  Component, 
  LayoutGrid, 
  FileText, 
  Image as ImageIcon, 
  History, 
  Sliders, 
  ChevronDown, 
  Sun, 
  Moon, 
  Search,
  BookOpen
} from 'lucide-react';
import Overview from './views/Overview';
import Colors from './views/Colors';
import Typography from './views/Typography';
import Spacing from './views/Spacing';
import FoundationOverview from './views/FoundationOverview';
import ButtonView from './views/ButtonView';
import ButtonGroupView from './views/ButtonGroupView';
import InputView from './views/InputView';
import CardView from './views/CardView';
import BadgeView from './views/BadgeView';
import ToggleView from './views/ToggleView';
import CheckboxView from './views/CheckboxView';
import RadioView from './views/RadioView';
import AlertView from './views/AlertView';
import AvatarView from './views/AvatarView';
import TooltipView from './views/TooltipView';
import ProgressView from './views/ProgressView';
import BreadcrumbView from './views/BreadcrumbView';
import DatePickerView from './views/DatePickerView';
import ComponentsOverview from './views/ComponentsOverview';
import { useLanguage } from './context/LanguageContext';

// Navigation icon helper
interface SidebarIconProps {
  name: string;
}

function SidebarIcon({ name }: SidebarIconProps) {
  switch (name) {
    case 'home':
      return <Home className="nav-icon" size={20} />;
    case 'about':
      return <Info className="nav-icon" size={20} />;
    case 'design':
      return <Palette className="nav-icon" size={20} />;
    case 'development':
      return <Code className="nav-icon" size={20} />;
    case 'contribute':
      return <Heart className="nav-icon" size={20} />;
    case 'foundation':
      return <Layers className="nav-icon" size={20} />;
    case 'components':
      return <Component className="nav-icon" size={20} />;
    case 'pattern':
      return <LayoutGrid className="nav-icon" size={20} />;
    case 'content':
      return <FileText className="nav-icon" size={20} />;
    case 'illustrations':
      return <ImageIcon className="nav-icon" size={20} />;
    case 'release-notes':
      return <History className="nav-icon" size={20} />;
    case 'theme-generator':
      return <Sliders className="nav-icon" size={20} />;
    default:
      return null;
  }
}

// Menu Hierarchy Structure Types
interface SubMenuItem {
  id: string;
  label: string;
}

interface LinkMenuItem {
  id: string;
  label: string;
  type: 'link';
  icon: string;
}

interface DropdownMenuItem {
  id: string;
  label: string;
  type: 'dropdown';
  icon: string;
  items: SubMenuItem[];
}

type MenuItem = LinkMenuItem | DropdownMenuItem;

// Placeholder component for views that are still in progress
interface PlaceholderViewProps {
  title: string;
  category: string;
}

function PlaceholderView({ title, category }: PlaceholderViewProps) {
  const { t } = useLanguage();

  const getCategoryLabel = () => {
    switch (category) {
      case 'design': return t.placeholder.categories.design;
      case 'development': return t.placeholder.categories.development;
      case 'foundation': return t.placeholder.categories.foundation;
      case 'components-section': return t.placeholder.categories.componentsSection;
      case 'pattern': return t.placeholder.categories.pattern;
      case 'content': return t.placeholder.categories.content;
      case 'illustrations': return t.placeholder.categories.illustrations;
      default: return category || t.placeholder.categories.system;
    }
  };

  const subtitleFormatted = t.placeholder.subtitle.replace('{category}', getCategoryLabel());

  return (
    <div className="placeholder-view" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitleFormatted}</p>
      </div>
      <div className="section-card" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-8)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: 'var(--space-6)' }}>
          <BookOpen size={32} />
        </div>
        <h2 style={{ fontSize: 'var(--fs-text-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>
          {t.placeholder.title}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto var(--space-6)', fontSize: 'var(--fs-text-md)', lineHeight: '1.6' }}>
          {t.placeholder.desc}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { language, setLanguage, t } = useLanguage();

  // Dynamically constructed menu structure based on active language translations
  const MENU_STRUCTURE: MenuItem[] = useMemo(() => [
    {
      id: 'overview',
      label: t.nav.overview,
      type: 'link',
      icon: 'home',
    },
    {
      id: 'design',
      label: t.nav.design,
      type: 'dropdown',
      icon: 'design',
      items: [
        { id: 'design-getting-started', label: t.nav.designGettingStarted },
      ],
    },
    {
      id: 'development',
      label: t.nav.development,
      type: 'dropdown',
      icon: 'development',
      items: [
        { id: 'dev-getting-started', label: t.nav.devGettingStarted },
      ],
    },
    {
      id: 'contribute',
      label: t.nav.contribute,
      type: 'link',
      icon: 'contribute',
    },
    {
      id: 'foundation',
      label: t.nav.foundation,
      type: 'dropdown',
      icon: 'foundation',
      items: [
        { id: 'foundation-overview', label: t.nav.foundationOverview },
        { id: 'colors', label: t.nav.colors },
        { id: 'grid', label: t.nav.grid },
        { id: 'icons', label: t.nav.icons },
        { id: 'spacing', label: t.nav.spacing },
        { id: 'typography', label: t.nav.typography },
      ],
    },
    {
      id: 'components-section',
      label: t.nav.componentsSection,
      type: 'dropdown',
      icon: 'components',
      items: [
        { id: 'components-overview', label: t.nav.componentsOverview },
        { id: 'comp-alert', label: t.nav.compAlert },
        { id: 'comp-avatar', label: t.nav.compAvatar },
        { id: 'comp-badge', label: t.nav.compBadge },
        { id: 'comp-breadcrumb', label: t.nav.compBreadcrumb },
        { id: 'comp-button', label: t.nav.compButton },
        { id: 'comp-button-group', label: t.nav.compButtonGroup },
        { id: 'comp-card', label: t.nav.compCard },
        { id: 'comp-checkbox', label: t.nav.compCheckbox },
        { id: 'comp-datepicker', label: t.nav.compDatePicker },
        { id: 'comp-input', label: t.nav.compInput },
        { id: 'comp-progress', label: t.nav.compProgress },
        { id: 'comp-radio', label: t.nav.compRadio },
        { id: 'comp-toggle', label: t.nav.compToggle },
        { id: 'comp-tooltip', label: t.nav.compTooltip },
      ],
    },
    {
      id: 'pattern',
      label: t.nav.pattern,
      type: 'dropdown',
      icon: 'pattern',
      items: [
        { id: 'pat-forms', label: t.nav.patForms },
        { id: 'pat-layouts', label: t.nav.patLayouts },
      ],
    },
    {
      id: 'content',
      label: t.nav.content,
      type: 'dropdown',
      icon: 'content',
      items: [
        { id: 'content-tone', label: t.nav.contentTone },
      ],
    },
    {
      id: 'illustrations',
      label: t.nav.illustrations,
      type: 'dropdown',
      icon: 'illustrations',
      items: [
        { id: 'illus-gallery', label: t.nav.illusGallery },
      ],
    },
    {
      id: 'release-notes',
      label: t.nav.releaseNotes,
      type: 'link',
      icon: 'release-notes',
    },
    {
      id: 'theme-generator',
      label: t.nav.themeGenerator,
      type: 'link',
      icon: 'theme-generator',
    },
  ], [t]);

  // Track expanded state for dropdown menus
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    design: false,
    development: false,
    foundation: false,
    'components-section': false,
    pattern: false,
    content: false,
    illustrations: false,
  });

  // Apply dark mode theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // Auto-expand sidebar sections when activeTab updates
  useEffect(() => {
    for (const item of MENU_STRUCTURE) {
      if (item.type === 'dropdown') {
        const hasActiveChild = item.items.some(child => child.id === activeTab);
        if (hasActiveChild) {
          setExpandedSections(prev => ({
            ...prev,
            [item.id]: true
          }));
        }
      }
    }
  }, [activeTab, MENU_STRUCTURE]);

  // Scroll to top of window and content area when activeTab changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [activeTab]);

  // Toggle expanded state of a section
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Determine if a section should be shown as expanded
  const isSectionExpanded = (sectionId: string) => {
    if (searchQuery) return true; // Force expanded during search for visibility
    return !!expandedSections[sectionId];
  };

  // Search filtering logic
  const getFilteredMenu = (): MenuItem[] => {
    if (!searchQuery) return MENU_STRUCTURE;
    
    return MENU_STRUCTURE.map(item => {
      if (item.type === 'link') {
        const matches = item.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matches ? item : null;
      } else {
        // Dropdown type
        const matchesParent = item.label.toLowerCase().includes(searchQuery.toLowerCase());
        const filteredChildren = (item as DropdownMenuItem).items.filter(child =>
          child.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (matchesParent) {
          return item; // If parent matches, show it with all children
        } else if (filteredChildren.length > 0) {
          return { ...item, items: filteredChildren }; // Only show matching children
        }
        return null;
      }
    }).filter(Boolean) as MenuItem[];
  };

  const filteredMenu = getFilteredMenu();

  // Helper to find parent label of active tab for placeholder views
  const getParentCategory = (tabId: string): string => {
    for (const item of MENU_STRUCTURE) {
      if (item.type === 'dropdown' && (item as DropdownMenuItem).items.some(child => child.id === tabId)) {
        return item.id;
      }
    }
    return '';
  };

  // Find active label for view title
  const getActiveTabLabel = (tabId: string): string => {
    for (const item of MENU_STRUCTURE) {
      if (item.id === tabId) return item.label;
      if (item.type === 'dropdown') {
        const child = (item as DropdownMenuItem).items.find(c => c.id === tabId);
        if (child) return child.label;
      }
    }
    return tabId;
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
      case 'about-neudela':
        return <Overview setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'foundation-overview':
        return <FoundationOverview setActiveTab={setActiveTab} />;
      case 'components':
      case 'components-overview':
      case 'components-section':
        return <ComponentsOverview setActiveTab={setActiveTab} />;
      case 'colors':
        return <Colors setActiveTab={setActiveTab} />;
      case 'typography':
        return <Typography setActiveTab={setActiveTab} />;
      case 'spacing':
        return <Spacing setActiveTab={setActiveTab} />;
      case 'comp-button':
        return <ButtonView setActiveTab={setActiveTab} />;
      case 'comp-button-group':
        return <ButtonGroupView setActiveTab={setActiveTab} />;
      case 'comp-input':
        return <InputView setActiveTab={setActiveTab} />;
      case 'comp-card':
        return <CardView setActiveTab={setActiveTab} />;
      case 'comp-badge':
        return <BadgeView setActiveTab={setActiveTab} />;
      case 'comp-breadcrumb':
        return <BreadcrumbView setActiveTab={setActiveTab} />;
      case 'comp-toggle':
        return <ToggleView setActiveTab={setActiveTab} />;
      case 'comp-checkbox':
        return <CheckboxView setActiveTab={setActiveTab} />;
      case 'comp-datepicker':
        return <DatePickerView setActiveTab={setActiveTab} />;
      case 'comp-radio':
        return <RadioView setActiveTab={setActiveTab} />;
      case 'comp-alert':
        return <AlertView setActiveTab={setActiveTab} />;
      case 'comp-avatar':
        return <AvatarView setActiveTab={setActiveTab} />;
      case 'comp-tooltip':
        return <TooltipView setActiveTab={setActiveTab} />;
      case 'comp-progress':
        return <ProgressView setActiveTab={setActiveTab} />;
      default:
        return (
          <PlaceholderView 
            title={getActiveTabLabel(activeTab)} 
            category={getParentCategory(activeTab)} 
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">N</div>
          <span className="brand-name">NEUDELA</span>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            className="search-input"
            placeholder={t.nav.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dynamic Navigation System */}
        <nav className="sidebar-nav">
          <ul className="nav-links">
            {filteredMenu.map(item => {
              if (item.type === 'link') {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="nav-item">
                    <a
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <SidebarIcon name={item.icon} />
                      <span className="nav-link-text">{item.label}</span>
                    </a>
                  </li>
                );
              } else {
                // Dropdown category
                const isExpanded = isSectionExpanded(item.id);
                // Check if any child item is active
                const hasActiveChild = item.items.some(child => child.id === activeTab);
                
                return (
                  <li key={item.id} className={`nav-item-dropdown-group ${isExpanded ? 'expanded' : ''}`}>
                    <a
                      className={`nav-link-dropdown-trigger ${hasActiveChild ? 'has-active-child' : ''}`}
                      onClick={() => toggleSection(item.id)}
                    >
                      <span className="nav-link-trigger-left">
                        <SidebarIcon name={item.icon} />
                        <span className="nav-link-text">{item.label}</span>
                      </span>
                      <ChevronDown 
                        className={`chevron-icon ${isExpanded ? 'rotated' : ''}`} 
                        size={16}
                      />
                    </a>
                    
                    {/* Collapsible Submenu list */}
                    <ul className={`submenu-links ${isExpanded ? 'visible' : 'collapsed'}`}>
                      {item.items.map(child => {
                        const isChildActive = activeTab === child.id;
                        return (
                          <li key={child.id}>
                            <a
                              className={`submenu-link ${isChildActive ? 'active' : ''}`}
                              onClick={() => setActiveTab(child.id)}
                            >
                              {child.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
            })}
            
            {filteredMenu.length === 0 && (
              <p style={{ fontSize: 'var(--fs-text-xs)', color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
                {t.nav.noResults}
              </p>
            )}
          </ul>
        </nav>

        {/* Sidebar Footer - Language & Dark mode controls with identical button sizes */}
        <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="version-label" style={{ fontSize: '11px' }}>
            v1.0.0
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {/* Language Toggle Button - Identical size (32x32) to Theme Toggle Button */}
            <button
              className="theme-toggle-btn"
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              title={language === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
              aria-label="Toggle language"
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                fontSize: '11px',
                fontWeight: 'var(--font-weight-bold)',
                boxSizing: 'border-box'
              }}
            >
              {language.toUpperCase()}
            </button>

            {/* Theme Toggle Button (32x32) */}
            <button 
              className="theme-toggle-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                boxSizing: 'border-box'
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="main-content">
        {renderActiveView()}
      </main>
    </div>
  );
}
