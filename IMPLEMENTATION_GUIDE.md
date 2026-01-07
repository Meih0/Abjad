# Implementation Guide for Code Enhancements

This guide provides step-by-step instructions for implementing all the enhancements in your Home Twin application.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Add Toast Notifications

1. **Import ToastContainer in your root component:**

```javascript
// In your main App.js or Layout.js
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/ToastContainer';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <YourAppContent />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
```

2. **Use toasts in your components:**

```javascript
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      await someAction();
      toast.success('Action completed successfully!');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
}
```

### Step 2: Wrap App with Error Boundary

```javascript
// In your root index.js or main entry point
import ErrorBoundary from '@/components/ErrorBoundary';

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
```

### Step 3: Replace Loading States

```javascript
// Before
if (isLoading) return <div>Loading...</div>;

// After
import { SkeletonGrid } from '@/components/LoadingSkeleton';
if (isLoading) return <SkeletonGrid count={6} columns={3} />;
```

---

## 📋 Complete Implementation Checklist

### Phase 1: Core Infrastructure (Week 1)

- [ ] **Set up Error Boundary**
  - Wrap entire app in ErrorBoundary component
  - Test error scenarios
  - Verify error reporting in development

- [ ] **Implement Toast System**
  - Add ToastContainer to root component
  - Replace alert() calls with toast notifications
  - Add success toasts for all mutations
  - Add error toasts for all failures

- [ ] **Replace Constants**
  - Import constants from `utils/constants.js`
  - Remove hardcoded strings and configs
  - Update all icon mappings
  - Update all color mappings

- [ ] **Add Helper Functions**
  - Import helpers from `utils/helpers.js`
  - Replace inline date formatting with `formatDate()`
  - Use `parseApiError()` for all error handling
  - Use `storage` wrapper for localStorage

### Phase 2: Component Improvements (Week 2)

- [ ] **Add Loading States**
  ```javascript
  // For grids/lists
  if (isLoading) return <SkeletonGrid count={6} />;

  // For cards
  if (isLoading) return <SkeletonList count={3} />;

  // For floor plan
  if (isLoading) return <SkeletonFloorPlan />;
  ```

- [ ] **Add Empty States**
  ```javascript
  if (data.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No assets yet"
        description="Get started by adding your first asset"
        actionLabel="Add Asset"
        onAction={() => setShowForm(true)}
      />
    );
  }
  ```

- [ ] **Add Error States**
  ```javascript
  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
        title="Failed to load data"
        showDetails={process.env.NODE_ENV === 'development'}
      />
    );
  }
  ```

### Phase 3: Form Validation (Week 2)

- [ ] **Assets Page**
  ```javascript
  import { validateAsset } from '@/utils/validation';

  const handleSubmit = () => {
    const errors = validateAsset(formData);
    if (Object.keys(errors).length > 0) {
      // Show errors
      return;
    }
    // Submit form
  };
  ```

- [ ] **Tasks Page**
  ```javascript
  import { validateTask } from '@/utils/validation';
  const errors = validateTask(taskData);
  ```

- [ ] **Marketplace Page**
  ```javascript
  import { validateServiceProvider } from '@/utils/validation';
  const errors = validateServiceProvider(providerData);
  ```

### Phase 4: Accessibility (Week 3)

- [ ] **Add ARIA Labels**
  ```javascript
  <button aria-label="Close dialog">
    <X className="h-4 w-4" />
  </button>

  <input
    aria-label="Search assets"
    aria-describedby="search-help"
  />
  ```

- [ ] **Add Keyboard Navigation**
  ```javascript
  <div
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && handleClick()}
  >
    Click me
  </div>
  ```

- [ ] **Add Focus Management**
  ```javascript
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  ```

- [ ] **Add Role Attributes**
  ```javascript
  <nav role="navigation">
  <main role="main">
  <header role="banner">
  ```

### Phase 5: Performance Optimization (Week 3-4)

- [ ] **Add React.memo to Components**
  ```javascript
  const AssetCard = React.memo(({ asset, onClick }) => {
    return <Card>...</Card>;
  });

  AssetCard.displayName = 'AssetCard';
  ```

- [ ] **Add useMemo for Calculations**
  ```javascript
  const filteredAssets = useMemo(() => {
    return assets.filter(a => a.name.includes(searchQuery));
  }, [assets, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: assets.length,
      active: assets.filter(a => a.status === 'active').length
    };
  }, [assets]);
  ```

- [ ] **Add useCallback for Functions**
  ```javascript
  const handleClick = useCallback((id) => {
    doSomething(id);
  }, []);
  ```

- [ ] **Add useDebounce for Search**
  ```javascript
  import { useDebounce } from '@/hooks/useDebounce';

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Only runs after 300ms of no typing
    performSearch(debouncedSearch);
  }, [debouncedSearch]);
  ```

### Phase 6: PropTypes (Week 4)

- [ ] **Add PropTypes to All Components**
  ```javascript
  import PropTypes from 'prop-types';

  AssetCard.propTypes = {
    asset: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      asset_type: PropTypes.string.isRequired,
      status: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    rooms: PropTypes.array,
  };

  AssetCard.defaultProps = {
    rooms: [],
  };
  ```

---

## 🔄 Component Update Pattern

Follow this pattern for updating each component:

```javascript
// 1. Add imports
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import { CONSTANTS } from '@/utils/constants';
import { parseApiError, formatDate } from '@/utils/helpers';
import { validateForm } from '@/utils/validation';

// 2. Add PropTypes
MyComponent.propTypes = {
  // Define all props
};

// 3. Add toast hook
const { toast } = useToast();

// 4. Improve data fetching
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData,
  onError: (error) => {
    toast.error(parseApiError(error));
  },
});

// 5. Add memoization
const filteredData = useMemo(() => {
  return data.filter(/* ... */);
}, [data, dependency]);

const handleAction = useCallback(() => {
  // ...
}, [dependency]);

// 6. Improve loading states
if (isLoading) return <SkeletonGrid />;
if (error) return <ErrorState error={error} onRetry={refetch} />;
if (data.length === 0) return <EmptyState />;

// 7. Add accessibility
return (
  <div role="main" aria-label="Main content">
    <button
      aria-label="Descriptive label"
      onClick={handleAction}
    >
      ...
    </button>
  </div>
);
```

---

## 📱 Responsive Design Pattern

```javascript
import { useBreakpoint } from '@/hooks/useMediaQuery';

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className={`grid gap-4 ${
      isMobile ? 'grid-cols-1' :
      isTablet ? 'grid-cols-2' :
      'grid-cols-3'
    }`}>
      {/* Content */}
    </div>
  );
}
```

---

## 🎨 Animation Pattern

```javascript
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '@/utils/constants';

function AnimatedComponent() {
  return (
    <motion.div
      {...ANIMATION_VARIANTS.fadeIn}
      transition={{ delay: 0.1 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

---

## 🔍 Search Implementation Pattern

```javascript
import { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

function SearchableList({ items }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedSearch) return items;

    return items.filter(item =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [items, debouncedSearch]);

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search items"
      />
      {filteredItems.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </>
  );
}
```

---

## 💾 LocalStorage Pattern

```javascript
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyComponent() {
  const [preferences, setPreferences] = useLocalStorage('preferences', {
    theme: 'light',
    notifications: true,
  });

  return (
    <button onClick={() => setPreferences({
      ...preferences,
      theme: preferences.theme === 'light' ? 'dark' : 'light'
    })}>
      Toggle Theme
    </button>
  );
}
```

---

## ⚠️ Error Handling Pattern

```javascript
import { parseApiError } from '@/utils/helpers';
import { ERROR_MESSAGES } from '@/utils/constants';

const handleAction = async () => {
  try {
    setIsLoading(true);
    await performAction();
    toast.success(SUCCESS_MESSAGES.ACTION_SUCCESS);
  } catch (error) {
    const message = parseApiError(error);
    toast.error(message);

    // Log error for debugging
    console.error('Action failed:', {
      error,
      message,
      timestamp: new Date().toISOString()
    });
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🎯 Priority Order

### Must Do First (Critical)
1. Error Boundary implementation
2. Toast notification system
3. Replace all hardcoded constants
4. Add loading skeletons

### Should Do Soon (Important)
1. Form validation
2. Error handling improvements
3. Accessibility (ARIA labels)
4. PropTypes addition

### Nice to Have (Enhancement)
1. Performance optimization (memo, useMemo)
2. Advanced animations
3. Keyboard shortcuts
4. Offline support

---

## 🧪 Testing Checklist

After each update, test:

- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Empty states display correctly
- [ ] Toast notifications appear and dismiss
- [ ] Forms validate correctly
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Mobile responsiveness
- [ ] Performance (no unnecessary re-renders)

---

## 📚 Reference Files

- **Constants:** `utils/constants.js`
- **Helpers:** `utils/helpers.js`
- **Validation:** `utils/validation.js`
- **Hooks:** `hooks/` directory
- **Components:** `Components/` directory
- **Example:** `Pages/Assets.enhanced.example.js`

---

## 🆘 Troubleshooting

### Toast notifications not showing
- Ensure ToastContainer is rendered in root component
- Check that useToast hook is called inside component
- Verify toasts state is being updated

### PropTypes warnings
- Install: `npm install prop-types`
- Import: `import PropTypes from 'prop-types'`
- Define after component, not inside

### Performance issues
- Use React DevTools Profiler
- Add React.memo to expensive components
- Use useMemo for expensive calculations
- Use useCallback for event handlers

### Accessibility issues
- Run Lighthouse audit
- Use browser accessibility inspector
- Test with keyboard only
- Test with screen reader

---

## 📞 Need Help?

1. Check `ENHANCEMENTS.md` for detailed documentation
2. Review `Assets.enhanced.example.js` for complete example
3. Consult individual utility files for usage examples
4. Use browser DevTools for debugging

---

**Last Updated:** 2026-01-07
**Version:** 1.0.0
