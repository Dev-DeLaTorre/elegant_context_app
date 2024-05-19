import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import ContextProviderComponent from './store/shopping-cart-context.jsx';


function App() {

  return (
    <>
    <ContextProviderComponent>
      <Header />
      <Shop />
    </ContextProviderComponent>
    </>
  );
}

export default App;
