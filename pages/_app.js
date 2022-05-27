import Header from '../components/Header'
import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const addToCart = (name, title, slug, qty, cost, color, size, img) => {
    let cartItems = [];
    let id = Math.floor(Math.random() * 1000 * Date.now());
    let total = cost * qty;
    let prod = { id, name, title, slug, qty, cost, color, size, total, img };
    if (localStorage.getItem('cartItems') == null) {
      cartItems.push(prod);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    else {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
      cartItems.push(prod);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    toast.success('Your Product is added to cart', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  return <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Header addToCart={addToCart} />
    <Component {...pageProps} addToCart={addToCart} />
  </>
}

export default MyApp
