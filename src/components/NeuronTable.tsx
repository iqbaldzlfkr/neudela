import React, { useState, useMemo, useId, useRef, useCallback, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { NeuronCheckbox } from './NeuronCheckbox';

export interface NeuronTableColumn<T = any> {
  /** Unique key identifying the column field in data records */
  key: string;
  /** Header label displayed at the top of the column */
  label: React.ReactNode;
  /** Whether the column can be clicked to sort */
  sortable?: boolean;
  /** Fixed or percentage width for this column */
  width?: string | number;
  /** Minimum width for this column */
  minWidth?: string | number;
  /** Text and content alignment inside the column cells */
  align?: 'left' | 'center' | 'right';
  /** Make column sticky to left or right when table scrolls horizontally */
  sticky?: 'left' | 'right';
  /** Custom render function for the cell content */
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface NeuronTablePaginationConfig {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showTotal?: boolean;
}

export interface NeuronTableProps<T = any> {
  /** Column definitions */
  columns: NeuronTableColumn<T>[];
  /** Array of data records */
  data: T[];
  /** Unique key accessor for records. Defaults to 'id', 'key', or array index */
  rowKey?: string | ((record: T, index: number) => string | number);
  /** Size scale of the table row height and padding */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant: default (clean lines), striped (zebra), or bordered (full grid) */
  variant?: 'default' | 'striped' | 'bordered';
  /** Enable hover highlight on table rows */
  hoverable?: boolean;
  /** Enable row selection checkboxes */
  selectable?: boolean;
  /** Controlled array of selected row keys */
  selectedRowKeys?: (string | number)[];
  /** Callback fired when row selection changes */
  onSelectChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;
  /** Controlled active sort column key */
  sortColumn?: string;
  /** Controlled active sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback fired when a column header sort is clicked */
  onSort?: (columnKey: string, direction: 'asc' | 'desc' | null) => void;
  /** Display loading state with skeleton shimmer rows */
  loading?: boolean;
  /** Custom content displayed when no records match or data is empty */
  emptyText?: React.ReactNode;

  // Toolbar Features
  /** Show top toolbar containing filter, sort, and search */
  showToolbar?: boolean;
  /** Show search input on top right */
  showSearch?: boolean;
  /** Controlled search query string */
  searchQuery?: string;
  /** Callback fired when search input value changes */
  onSearchChange?: (query: string) => void;
  /** Search input placeholder text */
  searchPlaceholder?: string;
  /** Show filter button on top left */
  showFilter?: boolean;
  /** Whether the filter button is active/toggled */
  filterActive?: boolean;
  /** Label for filter button */
  filterLabel?: string;
  /** Callback fired when filter button is clicked */
  onFilterClick?: () => void;
  /** Show Sort By button on top left */
  showSort?: boolean;
  /** Label for Sort By button */
  sortLabel?: string;
  /** Callback fired when Sort By button is clicked */
  onSortClick?: () => void;
  /** Additional custom actions rendered on the right side of the toolbar */
  toolbarActions?: React.ReactNode;

  // Sticky behavior
  /** Make table header sticky on vertical scroll */
  stickyHeader?: boolean;

  // Pagination Features
  /** Enable pagination. Can be boolean true for auto-pagination or a config object */
  pagination?: boolean | NeuronTablePaginationConfig;

  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export default function NeuronTable<T extends Record<string, any>>({
  columns,
  data = [],
  rowKey = 'id',
  size = 'md',
  variant = 'default',
  hoverable = true,
  selectable = false,
  selectedRowKeys: controlledSelectedKeys,
  onSelectChange,
  sortColumn: controlledSortColumn,
  sortDirection: controlledSortDirection,
  onSort,
  loading = false,
  emptyText,
  showToolbar = false,
  showSearch = true,
  searchQuery: controlledSearchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  showFilter = false,
  filterActive = false,
  filterLabel = 'Filter',
  onFilterClick,
  showSort = false,
  sortLabel = 'Sort By',
  onSortClick,
  toolbarActions,
  stickyHeader = false,
  pagination = false,
  className = '',
  style,
}: NeuronTableProps<T>) {
  const tableId = useId();

  // Internal search state (uncontrolled fallback)
  const [internalSearch, setInternalSearch] = useState('');
  const activeSearch = controlledSearchQuery !== undefined ? controlledSearchQuery : internalSearch;

  // Internal sort state (uncontrolled fallback)
  const [internalSortCol, setInternalSortCol] = useState<string | null>(null);
  const [internalSortDir, setInternalSortDir] = useState<'asc' | 'desc' | null>(null);
  const activeSortCol = controlledSortColumn !== undefined ? controlledSortColumn : internalSortCol;
  const activeSortDir = controlledSortDirection !== undefined ? controlledSortDirection : internalSortDir;

  // Internal selection state (uncontrolled fallback)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>([]);
  const activeSelectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;

  // Internal pagination state (uncontrolled fallback)
  const paginationObj = typeof pagination === 'object' ? pagination : {};
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(paginationObj.pageSize || 10);

  const currentPage = paginationObj.currentPage !== undefined ? paginationObj.currentPage : internalCurrentPage;
  const pageSize = paginationObj.pageSize !== undefined ? paginationObj.pageSize : internalPageSize;
  const pageSizeOptions = paginationObj.pageSizeOptions || [10, 25, 50, 100];

  // Helper to extract unique row key
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    if (record && record[rowKey] !== undefined) {
      return record[rowKey];
    }
    if (record && record.key !== undefined) {
      return record.key;
    }
    return index;
  };

  // 1. Search Filter Logic (if activeSearch provided)
  const filteredData = useMemo(() => {
    if (!activeSearch.trim()) return data;
    const query = activeSearch.toLowerCase().trim();
    return data.filter(record => {
      return Object.values(record).some(val => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'object') return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, activeSearch]);

  // 2. Sort Logic (if activeSortCol and activeSortDir provided)
  const sortedData = useMemo(() => {
    if (!activeSortCol || !activeSortDir) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[activeSortCol];
      const bVal = b[activeSortCol];

      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      // Numeric comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return activeSortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // String comparison
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return activeSortDir === 'asc' ? -1 : 1;
      if (aStr > bStr) return activeSortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, activeSortCol, activeSortDir]);

  // 3. Pagination Logic
  const totalItems = paginationObj.totalItems !== undefined ? paginationObj.totalItems : sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    // If totalItems was externally controlled with server-side pagination, return full sortedData
    if (paginationObj.totalItems !== undefined && paginationObj.onPageChange) {
      return sortedData;
    }
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, pagination, currentPage, pageSize, paginationObj.totalItems, paginationObj.onPageChange]);

  // Handlers
  const handleSortClick = (colKey: string) => {
    let nextDir: 'asc' | 'desc' | null = 'asc';
    if (activeSortCol === colKey) {
      if (activeSortDir === 'asc') nextDir = 'desc';
      else if (activeSortDir === 'desc') nextDir = null;
      else nextDir = 'asc';
    }

    if (onSort) {
      onSort(colKey, nextDir);
    } else {
      setInternalSortCol(nextDir ? colKey : null);
      setInternalSortDir(nextDir);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
      if (pagination) setInternalCurrentPage(1);
    }
  };

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange('');
    } else {
      setInternalSearch('');
      if (pagination) setInternalCurrentPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    if (paginationObj.onPageChange) {
      paginationObj.onPageChange(newPage);
    } else {
      setInternalCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    if (paginationObj.onPageSizeChange) {
      paginationObj.onPageSizeChange(newSize);
    } else {
      setInternalPageSize(newSize);
      setInternalCurrentPage(1);
    }
  };

  // Selection handlers
  const currentPageKeys = useMemo(() => {
    return paginatedData.map((rec, i) => getRowKey(rec, i));
  }, [paginatedData]);

  const isAllSelected = currentPageKeys.length > 0 && currentPageKeys.every(k => activeSelectedKeys.includes(k));
  const isPartiallySelected = currentPageKeys.some(k => activeSelectedKeys.includes(k)) && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    let updatedKeys: (string | number)[];
    if (checked) {
      // Add all current page keys that are not already selected
      const set = new Set([...activeSelectedKeys, ...currentPageKeys]);
      updatedKeys = Array.from(set);
    } else {
      // Remove all current page keys
      updatedKeys = activeSelectedKeys.filter(k => !currentPageKeys.includes(k));
    }

    if (onSelectChange) {
      const selectedRows = data.filter((rec, i) => updatedKeys.includes(getRowKey(rec, i)));
      onSelectChange(updatedKeys, selectedRows);
    } else {
      setInternalSelectedKeys(updatedKeys);
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    let updatedKeys: (string | number)[];
    if (checked) {
      updatedKeys = [...activeSelectedKeys, key];
    } else {
      updatedKeys = activeSelectedKeys.filter(k => k !== key);
    }

    if (onSelectChange) {
      const selectedRows = data.filter((rec, i) => updatedKeys.includes(getRowKey(rec, i)));
      onSelectChange(updatedKeys, selectedRows);
    } else {
      setInternalSelectedKeys(updatedKeys);
    }
  };

  // Generate pagination page numbers with smart ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  // Horizontal scroll tracking for sticky column shadows
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const hasOverflow = scrollWidth > clientWidth + 2;
    const atLeft = scrollLeft <= 2;
    const atRight = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2;

    setCanScrollLeft(hasOverflow && !atLeft);
    setCanScrollRight(hasOverflow && !atRight);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [checkScroll, columns, data, paginatedData, loading]);

  return (
    <div 
      className={`neuron-table-container neuron-table-container--${size} ${className}`}
      style={style}
    >
      {/* ── Optional Top Toolbar ── */}
      {showToolbar && (
        <div className="neuron-table-toolbar">
          <div className="neuron-table-toolbar__left">
            {showFilter && (
              <button
                type="button"
                className={`neuron-table-btn neuron-table-btn--filter ${filterActive ? 'is-active' : ''}`}
                onClick={onFilterClick}
                aria-pressed={filterActive}
              >
                <Filter size={15} className="neuron-table-btn__icon" />
                <span>{filterLabel}</span>
              </button>
            )}

            {showSort && (
              <button
                type="button"
                className="neuron-table-btn neuron-table-btn--sort"
                onClick={onSortClick}
              >
                <ArrowUpDown size={15} className="neuron-table-btn__icon" />
                <span>{sortLabel}</span>
              </button>
            )}
          </div>

          <div className="neuron-table-toolbar__right">
            {showSearch && (
              <div className="neuron-table-search">
                <Search size={16} className="neuron-table-search__icon" />
                <input
                  type="text"
                  className="neuron-table-search__input"
                  placeholder={searchPlaceholder}
                  value={activeSearch}
                  onChange={handleSearchChange}
                  aria-label="Search records in table"
                />
                {activeSearch && (
                  <button
                    type="button"
                    className="neuron-table-search__clear"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
            {toolbarActions}
          </div>
        </div>
      )}

      {/* ── Table Scroll Wrapper ── */}
      <div 
        ref={wrapperRef}
        className={`neuron-table-wrapper ${canScrollRight ? 'neuron-table-wrapper--has-scroll-right' : ''} ${canScrollLeft ? 'neuron-table-wrapper--has-scroll-left' : ''}`}
        onScroll={checkScroll}
      >
        <table 
          className={`neuron-table neuron-table--${size} neuron-table--${variant} ${hoverable ? 'neuron-table--hoverable' : ''}`}
          role="table"
        >
          <thead className={`neuron-table__head ${stickyHeader ? 'neuron-table__head--sticky' : ''}`}>
            <tr>
              {/* Checkbox Select All Column */}
              {selectable && (
                <th className="neuron-table__th neuron-table__th--checkbox" style={{ width: 44 }}>
                  <div className="neuron-table__checkbox-wrap">
                    <NeuronCheckbox
                      checked={isAllSelected}
                      indeterminate={isPartiallySelected}
                      onChange={handleSelectAll}
                      size={size === 'sm' ? 'sm' : 'md'}
                      aria-label="Select all rows"
                    />
                  </div>
                </th>
              )}

              {/* Data Columns */}
              {columns.map(col => {
                const isSorted = activeSortCol === col.key;
                const isStickyRight = col.sticky === 'right';
                const isStickyLeft = col.sticky === 'left';
                const isStickyRightShadow = isStickyRight && canScrollRight;
                const isStickyLeftShadow = isStickyLeft && canScrollLeft;
                const alignClass = col.align ? `neuron-table--align-${col.align}` : 'neuron-table--align-left';

                return (
                  <th
                    key={col.key}
                    className={`neuron-table__th ${alignClass} ${col.sortable ? 'neuron-table__th--sortable' : ''} ${isStickyRight ? 'neuron-table__col--sticky-right' : ''} ${isStickyLeft ? 'neuron-table__col--sticky-left' : ''} ${isStickyRightShadow || isStickyLeftShadow ? 'neuron-table__col--sticky-shadow' : ''}`}
                    style={{
                      width: col.width,
                      minWidth: col.minWidth,
                      cursor: col.sortable ? 'pointer' : 'default',
                    }}
                    onClick={col.sortable ? () => handleSortClick(col.key) : undefined}
                    aria-sort={isSorted ? (activeSortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    <div className="neuron-table__th-inner">
                      <span className="neuron-table__th-label">{col.label}</span>
                      {col.sortable && (
                        <span className={`neuron-table__sort-icon ${isSorted ? 'is-active' : ''}`}>
                          {isSorted && activeSortDir === 'asc' ? (
                            <ChevronUp size={14} />
                          ) : isSorted && activeSortDir === 'desc' ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ArrowUpDown size={13} className="neuron-table__sort-neutral" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="neuron-table__body">
            {/* Loading Skeleton Rows */}
            {loading ? (
              Array.from({ length: pageSize || 5 }).map((_, rIdx) => (
                <tr key={`skeleton-${rIdx}`} className="neuron-table__tr neuron-table__tr--skeleton">
                  {selectable && (
                    <td className="neuron-table__td neuron-table__td--checkbox">
                      <div className="neuron-table__skeleton-box" style={{ width: 16, height: 16 }} />
                    </td>
                  )}
                  {columns.map((col, cIdx) => (
                    <td 
                      key={`skeleton-td-${cIdx}`} 
                      className={`neuron-table__td ${col.sticky === 'right' ? 'neuron-table__col--sticky-right' : ''} ${col.sticky === 'right' && canScrollRight ? 'neuron-table__col--sticky-shadow' : ''}`}
                    >
                      <div 
                        className="neuron-table__skeleton-bar" 
                        style={{ 
                          width: cIdx === 0 ? '40%' : cIdx === columns.length - 1 ? '50%' : '75%' 
                        }} 
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              /* Empty State */
              <tr className="neuron-table__tr neuron-table__tr--empty">
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className="neuron-table__td neuron-table__td--empty"
                >
                  <div className="neuron-table-empty">
                    <div className="neuron-table-empty__icon">
                      <FileSpreadsheet size={32} />
                    </div>
                    <div className="neuron-table-empty__title">
                      {emptyText || 'No records found'}
                    </div>
                    {activeSearch && (
                      <div className="neuron-table-empty__subtitle">
                        No entries match your search "{activeSearch}". Try adjusting your keywords.
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              /* Actual Data Rows */
              paginatedData.map((record, rIndex) => {
                const key = getRowKey(record, rIndex);
                const isSelected = activeSelectedKeys.includes(key);

                return (
                  <tr
                    key={String(key)}
                    className={`neuron-table__tr ${isSelected ? 'neuron-table__tr--selected' : ''}`}
                  >
                    {/* Row Checkbox */}
                    {selectable && (
                      <td className="neuron-table__td neuron-table__td--checkbox">
                        <div className="neuron-table__checkbox-wrap">
                          <NeuronCheckbox
                            checked={isSelected}
                            onChange={(checked) => handleSelectRow(key, checked)}
                            size={size === 'sm' ? 'sm' : 'md'}
                            aria-label={`Select row ${rIndex + 1}`}
                          />
                        </div>
                      </td>
                    )}

                    {/* Row Cells */}
                    {columns.map(col => {
                      const value = record[col.key];
                      const isStickyRight = col.sticky === 'right';
                      const isStickyLeft = col.sticky === 'left';
                      const isStickyRightShadow = isStickyRight && canScrollRight;
                      const isStickyLeftShadow = isStickyLeft && canScrollLeft;
                      const alignClass = col.align ? `neuron-table--align-${col.align}` : 'neuron-table--align-left';

                      return (
                        <td
                          key={col.key}
                          className={`neuron-table__td ${alignClass} ${isStickyRight ? 'neuron-table__col--sticky-right' : ''} ${isStickyLeft ? 'neuron-table__col--sticky-left' : ''} ${isStickyRightShadow || isStickyLeftShadow ? 'neuron-table__col--sticky-shadow' : ''}`}
                          style={{
                            width: col.width,
                            minWidth: col.minWidth,
                          }}
                        >
                          {col.render ? col.render(value, record, rIndex) : value !== undefined && value !== null ? String(value) : '—'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Pagination Bar ── */}
      {pagination && !loading && totalItems > 0 && (
        <div className="neuron-table-pagination">
          {/* Left: Rows Per Page Selector */}
          <div className="neuron-table-pagination__rows-per-page">
            <label htmlFor={`${tableId}-rows-select`} className="neuron-table-pagination__label">
              Rows per page
            </label>
            <div className="neuron-table-select-wrap">
              <select
                id={`${tableId}-rows-select`}
                className="neuron-table-select"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="neuron-table-select__chevron" />
            </div>
          </div>

          {/* Center: Numeric Page Buttons */}
          <div className="neuron-table-pagination__pages" role="navigation" aria-label="Table pagination">
            {pageNumbers.map((page, idx) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${idx}`} className="neuron-table-page-btn neuron-table-page-btn--ellipsis">
                    …
                  </span>
                );
              }
              const pNum = page as number;
              const isActive = pNum === currentPage;

              return (
                <button
                  key={`page-${pNum}`}
                  type="button"
                  className={`neuron-table-page-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handlePageChange(pNum)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pNum}
                </button>
              );
            })}
          </div>

          {/* Right: Previous and Next Action Buttons */}
          <div className="neuron-table-pagination__actions">
            <button
              type="button"
              className="neuron-table-nav-btn neuron-table-nav-btn--prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              type="button"
              className="neuron-table-nav-btn neuron-table-nav-btn--next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
