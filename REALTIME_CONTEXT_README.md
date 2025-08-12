# Real-time Context Implementation

This implementation provides real-time data fetching using Firebase Authentication and Firestore.

## Features

### 1. UserContextProvider
- **Real-time authentication state**: Automatically updates when users sign in/out
- **User data**: Provides user information (email, displayName, etc.)
- **Loading state**: Indicates when authentication state is being determined

### 2. DataContextProvider
- **Real-time Firestore data**: Automatically syncs with Firestore collections
- **Products collection**: Real-time updates for products
- **Orders collection**: Real-time updates for orders
- **Error handling**: Provides error states for failed operations

## Usage

### Setting up Context Providers

Your `App.jsx` is already configured with the context providers:

```jsx
<UserContextProvider>
  <DataContextProvider>
    <Router />
  </DataContextProvider>
</UserContextProvider>
```

### Using the Custom Hooks

```jsx
import { useUser, useData } from "../hooks/useContext";

function MyComponent() {
  const { user, loading: userLoading } = useUser();
  const { products, orders, loading: dataLoading, error } = useData();

  // Component logic here
}
```

### User Context Properties

- `user`: Current authenticated user object or null
- `setUser`: Function to manually update user state
- `loading`: Boolean indicating if auth state is loading

### Data Context Properties

- `products`: Array of products from Firestore
- `orders`: Array of orders from Firestore
- `loading`: Boolean indicating if data is loading
- `error`: Error message if any operations fail
- `refreshData`: Function to refresh the data

## Firebase Collections Structure

### Products Collection (`products`)
```javascript
{
  name: "Product Name",
  price: 29.99,
  description: "Product description",
  category: "electronics",
  createdAt: firestore.Timestamp,
  // ... other fields
}
```

### Orders Collection (`orders`)
```javascript
{
  userId: "user-id",
  products: ["product-id-1", "product-id-2"],
  total: 59.98,
  status: "pending",
  createdAt: firestore.Timestamp,
  // ... other fields
}
```

## Benefits

1. **Real-time Updates**: Data automatically updates across all components when Firebase data changes
2. **Optimized Performance**: Uses Firebase's onSnapshot for efficient real-time subscriptions
3. **Error Handling**: Comprehensive error handling for network issues
4. **Loading States**: Proper loading indicators for better UX
5. **Cleanup**: Automatic cleanup of listeners when components unmount

## Example Component

See `src/components/Dashboard.jsx` for a complete example of how to use both contexts.

## Adding More Collections

To add more real-time collections, modify `DataContextProvider.jsx`:

```jsx
const [newCollection, setNewCollection] = useState([]);

const setupNewCollectionListener = () => {
  const query = collection(db, "newCollection");
  return onSnapshot(query, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNewCollection(data);
  });
};
```

## Firebase Security Rules

Make sure your Firestore security rules allow reading the collections:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true; // Adjust based on your needs
    }
    match /orders/{document} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```
