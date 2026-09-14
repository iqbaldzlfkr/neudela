'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';
import NeuronCheckbox from './NeuronCheckbox';

export type TreeSize = 'sm' | 'md' | 'lg';
export type TreeVariant = 'default' | 'bordered' | 'subtle';
export type TreeSelectionMode = 'none' | 'single' | 'multi' | 'checkbox';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode | ((node: TreeNode, state: { expanded: boolean; selected: boolean; checked: boolean }) => React.ReactNode);
  children?: TreeNode[];
  disabled?: boolean;
  isLeaf?: boolean;
  badge?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
  data?: any;
}

export interface NeuronTreeProps {
  data: TreeNode[];
  size?: TreeSize;
  variant?: TreeVariant;
  selectionMode?: TreeSelectionMode;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (selectedIds: string[], selectedNodes: TreeNode[]) => void;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (expandedIds: string[]) => void;
  checkedIds?: string[];
  defaultCheckedIds?: string[];
  onCheckedChange?: (checkedIds: string[], checkedNodes: TreeNode[]) => void;
  cascadeCheck?: boolean;
  showLines?: boolean;
  showIcons?: boolean;
  searchQuery?: string;
  expandAll?: boolean;
  emptyText?: React.ReactNode;
  onNodeClick?: (node: TreeNode, e: React.MouseEvent) => void;
  onNodeDoubleClick?: (node: TreeNode, e: React.MouseEvent) => void;
  onNodeExpand?: (node: TreeNode, expanded: boolean) => void;
  renderLabel?: (node: TreeNode, state: { expanded: boolean; selected: boolean; checked: boolean }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────

function getAllIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  function traverse(list: TreeNode[]) {
    for (const node of list) {
      ids.push(node.id);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  }
  traverse(nodes);
  return ids;
}

function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getAllDescendantIds(node: TreeNode): string[] {
  const ids: string[] = [];
  function traverse(n: TreeNode) {
    ids.push(n.id);
    if (n.children) {
      for (const child of n.children) {
        traverse(child);
      }
    }
  }
  traverse(node);
  return ids;
}

function getAncestorsForQuery(nodes: TreeNode[], query: string): Set<string> {
  const q = query.trim().toLowerCase();
  const expandSet = new Set<string>();
  if (!q) return expandSet;

  function traverse(list: TreeNode[], currentPath: string[]): boolean {
    let hasMatch = false;
    for (const node of list) {
      const path = [...currentPath, node.id];
      const labelStr = typeof node.label === 'string' ? node.label.toLowerCase() : '';
      const nodeMatches = labelStr.includes(q);

      let childrenMatch = false;
      if (node.children && node.children.length > 0) {
        childrenMatch = traverse(node.children, path);
      }

      if (nodeMatches || childrenMatch) {
        hasMatch = true;
        // Expand all ancestors
        for (const ancestorId of currentPath) {
          expandSet.add(ancestorId);
        }
      }
    }
    return hasMatch;
  }

  traverse(nodes, []);
  return expandSet;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const NeuronTree: React.FC<NeuronTreeProps> = ({
  data = [],
  size = 'md',
  variant = 'default',
  selectionMode = 'single',
  selectedIds: controlledSelectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  expandedIds: controlledExpandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  checkedIds: controlledCheckedIds,
  defaultCheckedIds = [],
  onCheckedChange,
  cascadeCheck = true,
  showLines = false,
  showIcons = true,
  searchQuery = '',
  expandAll = false,
  emptyText = 'No items found',
  onNodeClick,
  onNodeDoubleClick,
  onNodeExpand,
  renderLabel,
  className = '',
  style,
}) => {
  // Selection state
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(defaultSelectedIds);
  const selectedIds = controlledSelectedIds !== undefined ? controlledSelectedIds : internalSelectedIds;

  // Expanded state
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(() => {
    if (expandAll) return getAllIds(data);
    return defaultExpandedIds;
  });
  const expandedIds = controlledExpandedIds !== undefined ? controlledExpandedIds : internalExpandedIds;

  // Checked state (for checkbox mode)
  const [internalCheckedIds, setInternalCheckedIds] = useState<string[]>(defaultCheckedIds);
  const checkedIds = controlledCheckedIds !== undefined ? controlledCheckedIds : internalCheckedIds;

  // Active item for keyboard navigation
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto expand on expandAll or searchQuery with ref guards to prevent infinite loops
  const prevExpandAllRef = useRef(expandAll);
  const prevSearchQueryRef = useRef(searchQuery);

  useEffect(() => {
    if (expandAll && !prevExpandAllRef.current) {
      const all = getAllIds(data);
      if (controlledExpandedIds === undefined) {
        setInternalExpandedIds(prev => {
          if (prev.length === all.length && prev.every(id => all.includes(id))) return prev;
          return all;
        });
      }
      onExpandedChange?.(all);
    }
    prevExpandAllRef.current = expandAll;
  }, [expandAll, data, controlledExpandedIds, onExpandedChange]);

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed && trimmed !== prevSearchQueryRef.current.trim()) {
      const autoExp = getAncestorsForQuery(data, trimmed);
      if (autoExp.size > 0) {
        const autoArr = Array.from(autoExp);
        if (controlledExpandedIds === undefined) {
          setInternalExpandedIds(prev => {
            const missing = autoArr.filter(id => !prev.includes(id));
            if (missing.length === 0) return prev;
            const merged = [...prev, ...missing];
            onExpandedChange?.(merged);
            return merged;
          });
        } else {
          const missing = autoArr.filter(id => !controlledExpandedIds.includes(id));
          if (missing.length > 0) {
            onExpandedChange?.([...controlledExpandedIds, ...missing]);
          }
        }
      }
    }
    prevSearchQueryRef.current = searchQuery;
  }, [searchQuery, data, controlledExpandedIds, onExpandedChange]);

  // Compute checkbox state map (checked, indeterminate, unchecked)
  const checkboxStateMap = useMemo(() => {
    const map = new Map<string, 'checked' | 'indeterminate' | 'unchecked'>();
    const checkedSet = new Set(checkedIds);

    if (!cascadeCheck || selectionMode !== 'checkbox') {
      function traverseFlat(list: TreeNode[]) {
        for (const n of list) {
          map.set(n.id, checkedSet.has(n.id) ? 'checked' : 'unchecked');
          if (n.children) traverseFlat(n.children);
        }
      }
      traverseFlat(data);
      return map;
    }

    // Cascade resolution: bottom-up
    function resolve(node: TreeNode): 'checked' | 'indeterminate' | 'unchecked' {
      if (!node.children || node.children.length === 0) {
        const state = checkedSet.has(node.id) ? 'checked' : 'unchecked';
        map.set(node.id, state);
        return state;
      }

      let allChecked = true;
      let anyCheckedOrIndet = false;

      for (const child of node.children) {
        const childState = resolve(child);
        if (childState !== 'checked') allChecked = false;
        if (childState === 'checked' || childState === 'indeterminate') anyCheckedOrIndet = true;
      }

      let nodeState: 'checked' | 'indeterminate' | 'unchecked';
      if (allChecked) {
        nodeState = 'checked';
      } else if (anyCheckedOrIndet || checkedSet.has(node.id)) {
        nodeState = 'indeterminate';
      } else {
        nodeState = 'unchecked';
      }

      map.set(node.id, nodeState);
      return nodeState;
    }

    for (const rootNode of data) {
      resolve(rootNode);
    }

    return map;
  }, [data, checkedIds, cascadeCheck, selectionMode]);

  // Toggle expanded
  const toggleExpand = useCallback((node: TreeNode, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (node.disabled) return;

    const isExpanded = expandedIds.includes(node.id);
    const next = isExpanded
      ? expandedIds.filter(id => id !== node.id)
      : [...expandedIds, node.id];

    if (controlledExpandedIds === undefined) {
      setInternalExpandedIds(next);
    }
    onExpandedChange?.(next);
    onNodeExpand?.(node, !isExpanded);
  }, [expandedIds, controlledExpandedIds, onExpandedChange, onNodeExpand]);

  // Handle Selection
  const handleSelect = useCallback((node: TreeNode, e: React.MouseEvent) => {
    if (node.disabled) return;
    setFocusedId(node.id);

    if (selectionMode === 'none') {
      onNodeClick?.(node, e);
      return;
    }

    let nextSelected: string[] = [];
    if (selectionMode === 'single') {
      nextSelected = selectedIds.includes(node.id) ? [] : [node.id];
    } else if (selectionMode === 'multi') {
      nextSelected = selectedIds.includes(node.id)
        ? selectedIds.filter(id => id !== node.id)
        : [...selectedIds, node.id];
    } else if (selectionMode === 'checkbox') {
      nextSelected = selectedIds.includes(node.id) ? [] : [node.id];
    }

    if (controlledSelectedIds === undefined) {
      setInternalSelectedIds(nextSelected);
    }

    const selectedNodes = nextSelected.map(id => findNode(data, id)).filter(Boolean) as TreeNode[];
    onSelectionChange?.(nextSelected, selectedNodes);
    onNodeClick?.(node, e);
  }, [selectionMode, selectedIds, controlledSelectedIds, data, onSelectionChange, onNodeClick]);

  // Handle Checkbox Toggle
  const handleCheckboxToggle = useCallback((node: TreeNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled || selectionMode !== 'checkbox') return;

    const currentState = checkboxStateMap.get(node.id) ?? 'unchecked';
    const shouldCheck = currentState !== 'checked';

    let nextCheckedSet = new Set(checkedIds);

    if (cascadeCheck) {
      const descendants = getAllDescendantIds(node);
      if (shouldCheck) {
        descendants.forEach(id => nextCheckedSet.add(id));
      } else {
        descendants.forEach(id => nextCheckedSet.delete(id));
      }
    } else {
      if (shouldCheck) {
        nextCheckedSet.add(node.id);
      } else {
        nextCheckedSet.delete(node.id);
      }
    }

    const nextChecked = Array.from(nextCheckedSet);
    if (controlledCheckedIds === undefined) {
      setInternalCheckedIds(nextChecked);
    }

    const checkedNodes = nextChecked.map(id => findNode(data, id)).filter(Boolean) as TreeNode[];
    onCheckedChange?.(nextChecked, checkedNodes);
  }, [selectionMode, checkboxStateMap, checkedIds, cascadeCheck, controlledCheckedIds, data, onCheckedChange]);

  // Keyboard navigation
  const visibleNodes = useMemo(() => {
    const list: TreeNode[] = [];
    function collect(nodes: TreeNode[]) {
      for (const node of nodes) {
        list.push(node);
        if (node.children && expandedIds.includes(node.id)) {
          collect(node.children);
        }
      }
    }
    collect(data);
    return list;
  }, [data, expandedIds]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (visibleNodes.length === 0) return;

    const currentIndex = focusedId ? visibleNodes.findIndex(n => n.id === focusedId) : -1;
    const currentNode = currentIndex >= 0 ? visibleNodes[currentIndex] : visibleNodes[0];

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % visibleNodes.length;
        setFocusedId(visibleNodes[nextIndex].id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? visibleNodes.length - 1 : currentIndex - 1;
        setFocusedId(visibleNodes[prevIndex].id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (currentNode.children && currentNode.children.length > 0) {
          if (!expandedIds.includes(currentNode.id)) {
            toggleExpand(currentNode);
          } else if (currentIndex < visibleNodes.length - 1) {
            setFocusedId(visibleNodes[currentIndex + 1].id);
          }
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (currentNode.children && expandedIds.includes(currentNode.id)) {
          toggleExpand(currentNode);
        } else {
          for (const node of visibleNodes) {
            if (node.children?.some(c => c.id === currentNode.id)) {
              setFocusedId(node.id);
              break;
            }
          }
        }
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (selectionMode === 'checkbox') {
          handleCheckboxToggle(currentNode, e as any);
        } else {
          handleSelect(currentNode, e as any);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        setFocusedId(visibleNodes[0].id);
        break;
      }
      case 'End': {
        e.preventDefault();
        setFocusedId(visibleNodes[visibleNodes.length - 1].id);
        break;
      }
    }
  };

  // Highlighting helper
  const renderHighlightedLabel = (label: React.ReactNode) => {
    if (typeof label !== 'string' || !searchQuery.trim()) return label;
    const query = searchQuery.trim();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = label.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="neuron-tree__highlight">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Recursive Node Renderer
  const renderTreeNode = (
    node: TreeNode,
    level = 0,
    isLastChild = false,
    ancestorIsLastList: boolean[] = []
  ) => {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isLeaf = node.isLeaf ?? !hasChildren;
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = selectedIds.includes(node.id);
    const checkState = checkboxStateMap.get(node.id) ?? 'unchecked';
    const isFocused = focusedId === node.id;

    // Node icon
    let nodeIcon: React.ReactNode = null;
    if (showIcons) {
      if (typeof node.icon === 'function') {
        nodeIcon = node.icon(node, { expanded: isExpanded, selected: isSelected, checked: checkState === 'checked' });
      } else if (node.icon) {
        nodeIcon = node.icon;
      } else {
        if (!isLeaf) {
          nodeIcon = isExpanded ? (
            <FolderOpen size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="neuron-tree__default-folder-icon" />
          ) : (
            <Folder size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="neuron-tree__default-folder-icon" />
          );
        } else {
          nodeIcon = <FileText size={size === 'sm' ? 13 : size === 'lg' ? 17 : 15} className="neuron-tree__default-file-icon" />;
        }
      }
    }

    // Build indent units for depth level
    const indentUnits: React.ReactNode[] = [];
    if (level > 0) {
      // 1. Ancestor pass-through columns (from depth 0 to level - 2)
      for (let i = 0; i < level - 1; i++) {
        const isAncestorLast = ancestorIsLastList[i];
        indentUnits.push(
          <span
            key={`anc-${i}`}
            className={`neuron-tree__indent-unit ${showLines && !isAncestorLast ? 'neuron-tree__indent-unit--line' : ''}`}
            aria-hidden="true"
          />
        );
      }

      // 2. Immediate connector column to this node (level - 1)
      indentUnits.push(
        <span
          key="connector"
          className={`neuron-tree__indent-unit ${
            showLines
              ? `neuron-tree__indent-unit--connector ${isLastChild ? 'is-last' : ''}`
              : ''
          }`}
          aria-hidden="true"
        />
      );
    }

    const nextAncestorIsLastList = [...ancestorIsLastList, isLastChild];

    return (
      <div
        key={node.id}
        className={`neuron-tree__node-wrapper ${isLastChild ? 'neuron-tree__node-wrapper--last' : ''}`}
        role="none"
      >
        <div
          id={`neuron-tree-node-${node.id}`}
          role="treeitem"
          aria-expanded={!isLeaf ? isExpanded : undefined}
          aria-selected={isSelected}
          aria-checked={selectionMode === 'checkbox' ? (checkState === 'checked' ? true : checkState === 'indeterminate' ? 'mixed' : false) : undefined}
          aria-disabled={node.disabled}
          tabIndex={isFocused || (!focusedId && level === 0) ? 0 : -1}
          className={`neuron-tree__node ${isSelected ? 'is-selected' : ''} ${node.disabled ? 'is-disabled' : ''} ${isFocused ? 'is-focused' : ''}`}
          onClick={(e) => handleSelect(node, e)}
          onDoubleClick={(e) => {
            if (!isLeaf) toggleExpand(node, e);
            onNodeDoubleClick?.(node, e);
          }}
        >
          {/* Indent Guide Columns */}
          {indentUnits.length > 0 && (
            <span className="neuron-tree__indent" aria-hidden="true">
              {indentUnits}
            </span>
          )}

          {/* Expand / Collapse Chevron Toggle */}
          {!isLeaf ? (
            <span className="neuron-tree__chevron-wrap">
              <button
                type="button"
                className={`neuron-tree__chevron ${isExpanded ? 'is-expanded' : ''}`}
                onClick={(e) => toggleExpand(node, e)}
                tabIndex={-1}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                <ChevronRight size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} strokeWidth={2.5} />
              </button>
              {showLines && isExpanded && (
                <span className="neuron-tree__parent-line" aria-hidden="true" />
              )}
            </span>
          ) : (
            <span className="neuron-tree__chevron-spacer">
              {showLines && <span className="neuron-tree__leaf-line" aria-hidden="true" />}
            </span>
          )}

          {/* Checkbox */}
          {selectionMode === 'checkbox' && (
            <span
              className="neuron-tree__checkbox-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              <NeuronCheckbox
                checked={checkState === 'checked'}
                indeterminate={checkState === 'indeterminate'}
                disabled={node.disabled}
                size={size === 'lg' ? 'md' : 'sm'}
                variant="brand"
                shape="rounded-sm"
                tabIndex={-1}
                aria-label={typeof node.label === 'string' ? node.label : `Item ${node.id}`}
                onChange={() => {}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxToggle(node, e);
                }}
              />
            </span>
          )}

          {/* Node Icon */}
          {showIcons && nodeIcon && (
            <span className="neuron-tree__icon">
              {nodeIcon}
            </span>
          )}

          {/* Label */}
          <span className="neuron-tree__label">
            {renderLabel
              ? renderLabel(node, { expanded: isExpanded, selected: isSelected, checked: checkState === 'checked' })
              : renderHighlightedLabel(node.label)}
          </span>

          {/* Badge */}
          {node.badge && (
            <span className="neuron-tree__badge">
              {node.badge}
            </span>
          )}

          {/* Extra metadata */}
          {node.extra && (
            <span className="neuron-tree__extra">
              {node.extra}
            </span>
          )}

          {/* Hover actions */}
          {node.actions && (
            <div
              className="neuron-tree__actions"
              onClick={(e) => e.stopPropagation()}
            >
              {node.actions}
            </div>
          )}
        </div>

        {/* Children */}
        {!isLeaf && isExpanded && node.children && node.children.length > 0 && (
          <div className="neuron-tree__children" role="group">
            {node.children.map((child, idx) =>
              renderTreeNode(
                child,
                level + 1,
                idx === (node.children?.length ?? 0) - 1,
                nextAncestorIsLastList
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="tree"
      aria-label="Tree view"
      className={`neuron-tree neuron-tree--${size} neuron-tree--${variant} ${showLines ? 'neuron-tree--show-lines' : ''} ${className}`}
      style={style}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {data.length === 0 ? (
        <div className="neuron-tree__empty">{emptyText}</div>
      ) : (
        data.map((rootNode, idx) =>
          renderTreeNode(rootNode, 0, idx === data.length - 1, [])
        )
      )}
    </div>
  );
};

export default NeuronTree;
