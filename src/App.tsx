import './App.css'
import Header from './components/Header'
import QuoteForm from './components/QuoteForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className='w-full h-screen flex flex-col justify-between bg-gray-900 relative'>
      <Header />
      <QuoteForm />
      <Footer />
    </div>
  )
}

export default App
