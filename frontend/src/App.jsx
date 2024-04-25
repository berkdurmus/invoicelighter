import flameIcon from './assets/flame.svg';
import { InvoiceForm } from './components';
import './styles/App.css';

function App() {
  return (
    <>
      <div>
        <img src={flameIcon} className="logo react" alt="Don't touch it!" />
      </div>
      <h1>Invoice Lighter</h1>
      <InvoiceForm />
    </>
  )
}

export default App
