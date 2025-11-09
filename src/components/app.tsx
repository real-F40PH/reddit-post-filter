import Counter from './counter'
import { PostBlockerProvider } from '../context/postBlocker'
import Overlay from './overlay'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <PostBlockerProvider>
        <Overlay />
        <Counter />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            className: '',
            duration: 3000,
            removeDelay: 1000,
            style: {
              background: 'green',
              color: 'white',
              zIndex: '9999',
              padding: '4px 6px',
              borderRadius: '6px'
            }
          }}
        />
      </PostBlockerProvider>
    </div>
  )
}

export default App
