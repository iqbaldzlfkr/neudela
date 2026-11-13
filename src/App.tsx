import { useState, useEffect, useMemo } from 'react';
import { version } from '../package.json';
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
// Views: Overview & Foundations
import { Overview } from './views/overview';
import {
  FoundationOverview,
  Colors,
  Typography,
  Spacing,
  GridView,
  IconsView,
} from './views/foundation';

// Views: UI Components
import {
  ComponentsOverview,
  ButtonView,
  ButtonGroupView,
  InputView,
  CardView,
  BadgeView,
  ToggleView,
  CheckboxView,
  RadioView,
  AlertView,
  AvatarView,
  TooltipView,
  ProgressView,
  BreadcrumbView,
  DatePickerView,
  ModalView,
  DropdownView,
  TableView,
  TabBarView,
  TreeView,
  TextAreaView,
  SliderView,
  FileUploadView,
  StepperView,
  AccordionView,
  DividerView,
  ChartView,
  RatingView,
  TimePickerView,
  ToastView,
  DrawerView,
} from './views/components';

// Views: Composition Patterns
import {
  PatternsOverview,
  SidebarPatternView,
  StandaloneSidebarPreview,
  HeaderPatternView,
  StandaloneHeaderPreview,
  FormPatternView,
  StandaloneFormPreview,
  DashboardPatternView,
  StandaloneDashboardPreview,
  AuthPatternView,
  StandaloneAuthPreview,
  DataGridPatternView,
  StandaloneDataGridPreview,
  MapPatternView,
  StandaloneMapPreview,
  CheckoutPatternView,
  StandaloneCheckoutPreview,
  SettingsPatternView,
  StandaloneSettingsPreview,
  EmptyStatePatternView,
  StandaloneEmptyStatePreview,
  NotificationPatternView,
  StandaloneNotificationPreview,
  AiCopilotPatternView,
  StandaloneAiCopilotPreview,
  FileManagerPatternView,
  StandaloneFileManagerPreview,
} from './views/patterns';

import { ToastProvider } from './components/NeuronToast';
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

const STANDALONE_NON_COMP_TABS = new Set([
  'overview',
  'about-neudela',
  'contribute',
  'release-notes',
  'theme-generator',
  'design-getting-started',
  'dev-getting-started',
  'foundation',
  'foundation-overview',
  'colors',
  'grid',
  'icons',
  'spacing',
  'typography',
  'components',
  'components-overview',
  'components-section',
  'pattern',
  'pat-overview',
  'patterns-overview',
  'pat-sidebar',
  'sidebar',
  'pat-header',
  'header',
  'pat-forms',
  'pat-layouts',
  'pat-dashboard',
  'dashboard',
  'layouts',
  'pat-data-grid',
  'data-grid',
  'tables',
  'data-table',
  'pat-auth',
  'auth',
  'authentication',
  'auth-pattern',
  'auth-patterns',
  'pat-maps',
  'maps',
  'map',
  'geospatial',
  'pat-checkout',
  'checkout',
  'payment',
  'payments',
  'checkout-pattern',
  'pat-settings',
  'workspace-settings',
  'rbac',
  'pat-empty-states',
  'empty-states',
  'onboarding',
  'error-pages',
  'pat-notifications',
  'notifications',
  'notification-center',
  'activity-feed',
  'notification-pattern',
  'pat-ai-copilot',
  'ai-copilot',
  'copilot',
  'ai-chat',
  'conversational-ai',
  'ai-workspace',
  'pat-file-manager',
  'file-manager',
  'cloud-drive',
  'dam',
  'asset-manager',
  'file-asset-manager',
  'content',
  'content-tone',
  'illustrations',
  'illus-gallery',
]);

function getTabFromHash(hashStr: string): string | null {
  const raw = hashStr.replace(/^#\/?/, '').trim().toLowerCase();
  if (!raw || raw === 'home' || raw === 'overview' || raw === 'beranda') return 'overview';
  if (raw.startsWith('preview-sidebar-') || raw.startsWith('sidebar-live-')) return raw;
  if (raw.startsWith('preview-header-') || raw.startsWith('header-live-')) return raw;
  if (
    raw.startsWith('preview-form-') ||
    raw.startsWith('form-live-') ||
    raw.startsWith('forms-live-') ||
    raw.startsWith('standalone-form-') ||
    raw.startsWith('form-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-dashboard-') ||
    raw.startsWith('dashboard-live-') ||
    raw.startsWith('standalone-dashboard-') ||
    raw.startsWith('dashboard-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-auth-') ||
    raw.startsWith('auth-live-') ||
    raw.startsWith('standalone-auth-') ||
    raw.startsWith('auth-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-data-grid-') ||
    raw.startsWith('data-grid-live-') ||
    raw.startsWith('standalone-data-grid-') ||
    raw.startsWith('data-grid-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-map-') ||
    raw.startsWith('map-live-') ||
    raw.startsWith('standalone-map-') ||
    raw.startsWith('map-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-checkout-') ||
    raw.startsWith('checkout-live-') ||
    raw.startsWith('standalone-checkout-') ||
    raw.startsWith('checkout-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-settings-') ||
    raw.startsWith('settings-live-') ||
    raw.startsWith('standalone-settings-') ||
    raw.startsWith('settings-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-empty-state-') ||
    raw.startsWith('empty-state-live-') ||
    raw.startsWith('standalone-empty-state-') ||
    raw.startsWith('empty-state-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-notification-') ||
    raw.startsWith('notification-live-') ||
    raw.startsWith('standalone-notification-') ||
    raw.startsWith('notification-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-ai-copilot-') ||
    raw.startsWith('ai-copilot-live-') ||
    raw.startsWith('standalone-ai-copilot-') ||
    raw.startsWith('ai-copilot-standalone-')
  ) {
    return raw;
  }
  if (
    raw.startsWith('preview-file-manager-') ||
    raw.startsWith('file-manager-live-') ||
    raw.startsWith('standalone-file-manager-') ||
    raw.startsWith('file-manager-standalone-')
  ) {
    return raw;
  }
  if (raw === 'pattern' || raw === 'patterns' || raw === 'patterns-overview' || raw === 'pat-overview') return 'pat-overview';
  if (raw === 'sidebar' || raw === 'pat-sidebar' || raw === 'sidebar-pattern') return 'pat-sidebar';
  if (raw === 'header' || raw === 'pat-header' || raw === 'header-pattern' || raw === 'header-navigation') return 'pat-header';
  if (raw === 'forms' || raw === 'pat-forms' || raw === 'form-pattern' || raw === 'form-patterns') return 'pat-forms';
  if (raw === 'layouts' || raw === 'pat-layouts' || raw === 'dashboard' || raw === 'pat-dashboard' || raw === 'dashboard-pattern' || raw === 'dashboard-layouts') return 'pat-layouts';
  if (raw === 'data-grid' || raw === 'pat-data-grid' || raw === 'tables' || raw === 'data-table' || raw === 'data-management') return 'pat-data-grid';
  if (raw === 'auth' || raw === 'pat-auth' || raw === 'authentication' || raw === 'auth-pattern' || raw === 'auth-patterns') return 'pat-auth';
  if (raw === 'maps' || raw === 'map' || raw === 'pat-maps' || raw === 'geospatial') return 'pat-maps';
  if (raw === 'checkout' || raw === 'pat-checkout' || raw === 'payments' || raw === 'payment' || raw === 'checkout-pattern') return 'pat-checkout';
  if (raw === 'settings' || raw === 'pat-settings' || raw === 'workspace-settings' || raw === 'rbac') return 'pat-settings';
  if (
    raw === 'empty-states' ||
    raw === 'pat-empty-states' ||
    raw === 'onboarding' ||
    raw === 'error-pages' ||
    raw === 'empty-state' ||
    raw === 'empty-state-pattern'
  ) {
    return 'pat-empty-states';
  }
  if (
    raw === 'notifications' ||
    raw === 'pat-notifications' ||
    raw === 'notification-center' ||
    raw === 'activity-feed' ||
    raw === 'notification-pattern'
  ) {
    return 'pat-notifications';
  }
  if (
    raw === 'ai-copilot' ||
    raw === 'pat-ai-copilot' ||
    raw === 'copilot' ||
    raw === 'ai-chat' ||
    raw === 'conversational-ai' ||
    raw === 'ai-workspace'
  ) {
    return 'pat-ai-copilot';
  }
  if (
    raw === 'file-manager' ||
    raw === 'pat-file-manager' ||
    raw === 'cloud-drive' ||
    raw === 'dam' ||
    raw === 'asset-manager' ||
    raw === 'file-asset-manager'
  ) {
    return 'pat-file-manager';
  }
  if (raw === 'rating' || raw === 'comp-rating') return 'comp-rating';
  if (raw === 'slider' || raw === 'comp-slider') return 'comp-slider';
  if (raw === 'tabbar' || raw === 'tab-bar' || raw === 'comp-tabbar' || raw === 'comp-tab-bar') return 'comp-tab-bar';
  if (raw === 'fileupload' || raw === 'file-upload' || raw === 'comp-fileupload' || raw === 'comp-file-upload') return 'comp-file-upload';
  if (raw === 'stepper' || raw === 'comp-stepper') return 'comp-stepper';
  if (raw === 'accordion' || raw === 'comp-accordion') return 'comp-accordion';
  if (raw === 'divider' || raw === 'comp-divider') return 'comp-divider';
  if (raw === 'drawer' || raw === 'comp-drawer') return 'comp-drawer';
  if (raw === 'chart' || raw === 'comp-chart') return 'comp-chart';
  if (raw === 'timepicker' || raw === 'time-picker' || raw === 'comp-timepicker' || raw === 'comp-time-picker') return 'comp-time-picker';
  if (raw === 'toast' || raw === 'comp-toast') return 'comp-toast';
  if (
    raw === 'components-overview' ||
    raw === 'comp-components-overview' ||
    raw === 'components' ||
    raw === 'components-section'
  ) {
    return 'components-overview';
  }
  if (raw.startsWith('icons')) return 'icons';
  if (raw.startsWith('colors')) return 'colors';
  if (raw.startsWith('spacing')) return 'spacing';
  if (raw.startsWith('grid')) return 'grid';
  if (raw.startsWith('typography')) return 'typography';
  if (STANDALONE_NON_COMP_TABS.has(raw)) return raw;
  if (raw.startsWith('comp-')) return raw;
  return `comp-${raw}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => getTabFromHash(window.location.hash) || 'overview');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('neudela_theme') === 'dark' ||
      window.location.search.includes('theme=dark') ||
      window.location.hash.includes('theme=dark');
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const { language, setLanguage, t } = useLanguage();

  // Sync hash changes from browser URL
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash(window.location.hash);
      if (tab) setActiveTab(tab);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activeTab changes (Home/Overview stays clean at root without hash)
  useEffect(() => {
    if (activeTab === 'overview') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      const targetHash = activeTab.replace(/^comp-/, '');
      if (window.location.hash.replace(/^#\/?/, '') !== targetHash) {
        window.location.hash = targetHash;
      }
    }
  }, [activeTab]);

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
        { id: 'comp-accordion', label: t.nav.compAccordion || 'Accordion' },
        { id: 'comp-alert', label: t.nav.compAlert },
        { id: 'comp-avatar', label: t.nav.compAvatar },
        { id: 'comp-badge', label: t.nav.compBadge },
        { id: 'comp-breadcrumb', label: t.nav.compBreadcrumb },
        { id: 'comp-button', label: t.nav.compButton },
        { id: 'comp-button-group', label: t.nav.compButtonGroup },
        { id: 'comp-card', label: t.nav.compCard },
        { id: 'comp-chart', label: t.nav.compChart || 'Chart' },
        { id: 'comp-checkbox', label: t.nav.compCheckbox },
        { id: 'comp-datepicker', label: t.nav.compDatePicker },
        { id: 'comp-divider', label: t.nav.compDivider || 'Divider' },
        { id: 'comp-drawer', label: t.nav.compDrawer || 'Drawer' },
        { id: 'comp-dropdown', label: t.nav.compDropdown || t.nav.compSelect },
        { id: 'comp-file-upload', label: t.nav.compFileUpload || 'File Upload' },
        { id: 'comp-input', label: t.nav.compInput },
        { id: 'comp-modal', label: t.nav.compModal },
        { id: 'comp-progress', label: t.nav.compProgress },
        { id: 'comp-radio', label: t.nav.compRadio },
        { id: 'comp-rating', label: t.nav.compRating || 'Rating' },
        { id: 'comp-slider', label: t.nav.compSlider || 'Slider' },
        { id: 'comp-stepper', label: t.nav.compStepper || 'Stepper' },
        { id: 'comp-table', label: t.nav.compTable },
        { id: 'comp-tab-bar', label: t.nav.compTabBar || 'Tab Bar' },
        { id: 'comp-textarea', label: t.nav.compTextArea || 'Text Area' },
        { id: 'comp-time-picker', label: t.nav.compTimePicker || 'Time Picker' },
        { id: 'comp-toast', label: t.nav.compToast || 'Toast' },
        { id: 'comp-toggle', label: t.nav.compToggle },
        { id: 'comp-tooltip', label: t.nav.compTooltip },
        { id: 'comp-tree', label: t.nav.compTree || 'Tree View' },
      ],
    },
    {
      id: 'pattern',
      label: t.nav.pattern,
      type: 'dropdown',
      icon: 'pattern',
      items: [
        { id: 'pat-overview', label: (t.nav as any).patternsOverview || 'Overview' },
        { id: 'pat-sidebar', label: (t.nav as any).patSidebar || 'Sidebar' },
        { id: 'pat-header', label: (t.nav as any).patHeader || 'Header Navigation' },
        { id: 'pat-forms', label: t.nav.patForms },
        { id: 'pat-layouts', label: t.nav.patLayouts },
        { id: 'pat-data-grid', label: (t.nav as any).patDataGrid || 'Data Grid & Table' },
        { id: 'pat-auth', label: (t.nav as any).patAuth || 'Authentication & Identity' },
        { id: 'pat-maps', label: (t.nav as any).patMaps || 'Maps & Geospatial' },
        { id: 'pat-checkout', label: (t.nav as any).patCheckout || 'Checkout & Payments' },
        { id: 'pat-settings', label: (t.nav as any).patSettings || 'Workspace Settings & RBAC' },
        { id: 'pat-empty-states', label: (t.nav as any).patEmptyState || 'Empty States & Error Pages' },
        { id: 'pat-notifications', label: (t.nav as any).patNotifications || 'Notifications & Activity Center' },
        { id: 'pat-ai-copilot', label: (t.nav as any).patAiCopilot || 'AI Copilot & Workspace' },
        { id: 'pat-file-manager', label: (t.nav as any).patFileManager || 'File & Asset Manager' },
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

  // Apply dark mode theme class to body and data-theme to root
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('neudela_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('neudela_theme', 'light');
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
      case 'comp-components-overview':
      case 'components-section':
        return <ComponentsOverview setActiveTab={setActiveTab} />;
      case 'colors':
        return <Colors setActiveTab={setActiveTab} />;
      case 'grid':
        return <GridView setActiveTab={setActiveTab} />;
      case 'icons':
        return <IconsView setActiveTab={setActiveTab} />;
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
      case 'comp-chart':
      case 'chart':
        return <ChartView setActiveTab={setActiveTab} />;
      case 'comp-divider':
      case 'divider':
        return <DividerView setActiveTab={setActiveTab} />;
      case 'comp-drawer':
      case 'drawer':
        return <DrawerView setActiveTab={setActiveTab} />;
      case 'comp-file-upload':
      case 'comp-fileupload':
        return <FileUploadView setActiveTab={setActiveTab} />;
      case 'comp-stepper':
        return <StepperView setActiveTab={setActiveTab} />;
      case 'comp-accordion':
      case 'accordion':
        return <AccordionView setActiveTab={setActiveTab} />;
      case 'comp-radio':
        return <RadioView setActiveTab={setActiveTab} />;
      case 'comp-rating':
      case 'rating':
        return <RatingView setActiveTab={setActiveTab} />;
      case 'comp-slider':
        return <SliderView setActiveTab={setActiveTab} />;
      case 'comp-alert':
        return <AlertView setActiveTab={setActiveTab} />;
      case 'comp-avatar':
        return <AvatarView setActiveTab={setActiveTab} />;
      case 'comp-tooltip':
        return <TooltipView setActiveTab={setActiveTab} />;
      case 'comp-modal':
        return <ModalView setActiveTab={setActiveTab} />;
      case 'comp-dropdown':
      case 'comp-select':
        return <DropdownView setActiveTab={setActiveTab} />;
      case 'comp-progress':
        return <ProgressView setActiveTab={setActiveTab} />;
      case 'comp-table':
        return <TableView setActiveTab={setActiveTab} />;
      case 'comp-tab-bar':
      case 'comp-tabbar':
        return <TabBarView setActiveTab={setActiveTab} />;
      case 'comp-textarea':
        return <TextAreaView setActiveTab={setActiveTab} />;
      case 'comp-time-picker':
      case 'comp-timepicker':
      case 'time-picker':
      case 'timepicker':
        return <TimePickerView setActiveTab={setActiveTab} />;
      case 'comp-toast':
      case 'toast':
        return <ToastView setActiveTab={setActiveTab} />;
      case 'comp-tree':
        return <TreeView setActiveTab={setActiveTab} />;
      case 'pattern':
      case 'pat-overview':
      case 'patterns-overview':
        return <PatternsOverview setActiveTab={setActiveTab} />;
      case 'pat-sidebar':
      case 'sidebar':
      case 'sidebar-pattern':
        return <SidebarPatternView setActiveTab={setActiveTab} />;
      case 'pat-header':
      case 'header':
      case 'header-pattern':
      case 'header-navigation':
        return <HeaderPatternView setActiveTab={setActiveTab} />;
      case 'pat-forms':
      case 'forms':
      case 'form-pattern':
      case 'form-patterns':
        return <FormPatternView setActiveTab={setActiveTab} />;
      case 'pat-layouts':
      case 'pat-dashboard':
      case 'dashboard':
      case 'layouts':
      case 'dashboard-pattern':
      case 'dashboard-layouts':
        return <DashboardPatternView setActiveTab={setActiveTab} />;
      case 'pat-auth':
      case 'auth':
      case 'authentication':
      case 'auth-pattern':
      case 'auth-patterns':
        return <AuthPatternView setActiveTab={setActiveTab} />;
      case 'pat-data-grid':
      case 'data-grid':
      case 'tables':
      case 'data-table':
      case 'data-management':
        return <DataGridPatternView setActiveTab={setActiveTab} />;
      case 'pat-maps':
      case 'maps':
      case 'map':
      case 'geospatial':
        return <MapPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-checkout':
      case 'checkout':
      case 'payments':
      case 'payment':
      case 'checkout-pattern':
        return <CheckoutPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-settings':
      case 'settings':
      case 'workspace-settings':
      case 'rbac':
        return <SettingsPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-empty-states':
      case 'empty-states':
      case 'onboarding':
      case 'error-pages':
      case 'empty-state':
      case 'empty-state-pattern':
        return <EmptyStatePatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-notifications':
      case 'notifications':
      case 'notification-center':
      case 'activity-feed':
      case 'notification-pattern':
        return <NotificationPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-ai-copilot':
      case 'ai-copilot':
      case 'copilot':
      case 'ai-chat':
      case 'conversational-ai':
      case 'ai-workspace':
        return <AiCopilotPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      case 'pat-file-manager':
      case 'file-manager':
      case 'cloud-drive':
      case 'dam':
      case 'asset-manager':
      case 'file-asset-manager':
        return <FileManagerPatternView setActiveTab={setActiveTab} isDarkMode={isDarkMode} />;
      default:
        return (
          <PlaceholderView 
            title={getActiveTabLabel(activeTab)} 
            category={getParentCategory(activeTab)} 
          />
        );
    }
  };

  // Fullscreen Standalone App Preview Mode (New Tab)
  if (activeTab.startsWith('preview-sidebar-') || activeTab.startsWith('sidebar-live-')) {
    const variantId = activeTab.replace(/^(preview-sidebar-|sidebar-live-)/, '');
    return (
      <ToastProvider>
        <StandaloneSidebarPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-sidebar';
            setActiveTab('pat-sidebar');
          }}
        />
      </ToastProvider>
    );
  }

  if (activeTab.startsWith('preview-header-') || activeTab.startsWith('header-live-')) {
    const variantId = activeTab.replace(/^(preview-header-|header-live-)/, '');
    return (
      <ToastProvider>
        <StandaloneHeaderPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-header';
            setActiveTab('pat-header');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-form-') ||
    activeTab.startsWith('form-live-') ||
    activeTab.startsWith('forms-live-') ||
    activeTab.startsWith('standalone-form-') ||
    activeTab.startsWith('form-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-form-|form-live-|forms-live-|standalone-form-|form-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneFormPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-forms';
            setActiveTab('pat-forms');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-dashboard-') ||
    activeTab.startsWith('dashboard-live-') ||
    activeTab.startsWith('standalone-dashboard-') ||
    activeTab.startsWith('dashboard-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-dashboard-|dashboard-live-|standalone-dashboard-|dashboard-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneDashboardPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-layouts';
            setActiveTab('pat-layouts');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-auth-') ||
    activeTab.startsWith('auth-live-') ||
    activeTab.startsWith('standalone-auth-') ||
    activeTab.startsWith('auth-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-auth-|auth-live-|standalone-auth-|auth-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneAuthPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-auth';
            setActiveTab('pat-auth');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-data-grid-') ||
    activeTab.startsWith('data-grid-live-') ||
    activeTab.startsWith('standalone-data-grid-') ||
    activeTab.startsWith('data-grid-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-data-grid-|data-grid-live-|standalone-data-grid-|data-grid-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneDataGridPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-data-grid';
            setActiveTab('pat-data-grid');
          }}
        />
      </ToastProvider>
    );
  }

  if (activeTab.startsWith('preview-map-') || activeTab.startsWith('map-live-')) {
    const variantId = activeTab.replace(/^(preview-map-|map-live-)/, '');
    return (
      <ToastProvider>
        <StandaloneMapPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-maps';
            setActiveTab('pat-maps');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-checkout-') ||
    activeTab.startsWith('checkout-live-') ||
    activeTab.startsWith('standalone-checkout-') ||
    activeTab.startsWith('checkout-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-checkout-|checkout-live-|standalone-checkout-|checkout-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneCheckoutPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-checkout';
            setActiveTab('pat-checkout');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-settings-') ||
    activeTab.startsWith('settings-live-') ||
    activeTab.startsWith('standalone-settings-') ||
    activeTab.startsWith('settings-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-settings-|settings-live-|standalone-settings-|settings-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneSettingsPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-settings';
            setActiveTab('pat-settings');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-empty-state-') ||
    activeTab.startsWith('empty-state-live-') ||
    activeTab.startsWith('standalone-empty-state-') ||
    activeTab.startsWith('empty-state-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-empty-state-|empty-state-live-|standalone-empty-state-|empty-state-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneEmptyStatePreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-empty-states';
            setActiveTab('pat-empty-states');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-notification-') ||
    activeTab.startsWith('notification-live-') ||
    activeTab.startsWith('standalone-notification-') ||
    activeTab.startsWith('notification-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-notification-|notification-live-|standalone-notification-|notification-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneNotificationPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-notifications';
            setActiveTab('pat-notifications');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-ai-copilot-') ||
    activeTab.startsWith('ai-copilot-live-') ||
    activeTab.startsWith('standalone-ai-copilot-') ||
    activeTab.startsWith('ai-copilot-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-ai-copilot-|ai-copilot-live-|standalone-ai-copilot-|ai-copilot-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneAiCopilotPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-ai-copilot';
            setActiveTab('pat-ai-copilot');
          }}
        />
      </ToastProvider>
    );
  }

  if (
    activeTab.startsWith('preview-file-manager-') ||
    activeTab.startsWith('file-manager-live-') ||
    activeTab.startsWith('standalone-file-manager-') ||
    activeTab.startsWith('file-manager-standalone-')
  ) {
    const variantId = activeTab.replace(/^(preview-file-manager-|file-manager-live-|standalone-file-manager-|file-manager-standalone-)/, '');
    return (
      <ToastProvider>
        <StandaloneFileManagerPreview
          variantId={variantId}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onBackToDocs={() => {
            window.location.hash = '#pat-file-manager';
            setActiveTab('pat-file-manager');
          }}
        />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div
          className="sidebar-header"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('overview')}
          title="Neudela Home"
        >
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
            v{version}
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
    </ToastProvider>
  );
}
