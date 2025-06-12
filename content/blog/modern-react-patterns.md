---
title: "Modern React Patterns and Best Practices"
date: "2024-01-29"
description: "Explore advanced React patterns, hooks, and best practices for building maintainable and performant applications."
tags: ["React", "Hooks", "Patterns", "Performance", "Best Practices"]
---

# Modern React Patterns and Best Practices

React has evolved significantly since its introduction, and with it, the patterns and practices we use to build applications. In this post, we'll explore modern React patterns that can help you write more maintainable, performant, and scalable code.

## Custom Hooks: Reusable Logic

Custom hooks are one of the most powerful features in modern React, allowing you to extract and reuse stateful logic:

```typescript
// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
}
```

## Compound Components Pattern

This pattern allows you to create flexible, reusable components that work together:

```typescript
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  const { activeTab, setActiveTab } = context;
  
  return (
    <button
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: React.ReactNode }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  const { activeTab } = context;
  
  return activeTab === id ? <div className="tab-panel">{children}</div> : null;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.List>
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
        <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

## Error Boundaries with Hooks

Modern error handling in React applications:

```typescript
function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  
  const captureError = useCallback((error: Error) => {
    setError(error);
  }, []);
  
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  
  return { captureError, resetError };
}

class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ComponentType<{ error: Error; resetError: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  resetError = () => {
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback;
      return <Fallback error={this.state.error} resetError={this.resetError} />;
    }
    
    return this.props.children;
  }
}
```

## Performance Optimization Patterns

### Memoization with useMemo and useCallback

```typescript
function ExpensiveComponent({ items, filter }: { items: Item[]; filter: string }) {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  // Memoize event handlers
  const handleItemClick = useCallback((id: string) => {
    // Handle click logic
    console.log('Clicked item:', id);
  }, []);
  
  return (
    <div>
      {filteredItems.map(item => (
        <ItemComponent 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// Memoize the component itself
const ItemComponent = memo(({ item, onClick }: { 
  item: Item; 
  onClick: (id: string) => void; 
}) => {
  return (
    <div onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  );
});
```

### Virtual Scrolling for Large Lists

```typescript
function useVirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
  };
}
```

## State Management Patterns

### Reducer Pattern for Complex State

```typescript
interface State {
  loading: boolean;
  data: any[];
  error: string | null;
  filters: {
    search: string;
    category: string;
  };
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: { key: keyof State['filters']; value: string } }
  | { type: 'RESET_FILTERS' };

function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value }
      };
    case 'RESET_FILTERS':
      return { ...state, filters: { search: '', category: '' } };
    default:
      return state;
  }
}

function useDataManager() {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    data: [],
    error: null,
    filters: { search: '', category: '' }
  });
  
  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.getData();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);
  
  return { state, dispatch, fetchData };
}
```

## Conclusion

Modern React development is about more than just writing components. By leveraging these patterns and practices, you can build applications that are:

- **Maintainable**: Clear separation of concerns and reusable logic
- **Performant**: Optimized rendering and efficient state management
- **Scalable**: Patterns that grow with your application
- **Robust**: Proper error handling and type safety

Remember, patterns are tools to solve specific problems. Choose the right pattern for your use case, and don't over-engineer simple solutions. 