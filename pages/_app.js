import Header from '../components/Header'
import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cartbox from '../components/Cartbox';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loggedin, setLoggedin] = useState(false);
  const [key, setKey] = useState(0);

  const addToCart = (name, title, slug, qty, cost, color, size, img) => {
    let cartItems = [];
    let id = Math.floor(Math.random() * 1000 * Date.now());
    qty = parseInt(qty);
    cost = parseInt(cost);
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

    setKey(Math.random());

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

  const removeItem = (index) => {
    let items = JSON.parse(localStorage.getItem('cartItems'));
    const filteredItems = JSON.parse(localStorage.getItem('cartItems')).filter((item) => item.id !== parseInt(items[index].id));
    localStorage.setItem('cartItems', JSON.stringify(filteredItems));
    setKey(Math.random());
    toggleCart();
  }

  const toggleCart = () => {
    console.log("Clicked");
    let cartBox = document.getElementById('cartBox');
    if (cartBox.style.display == "block") {
      cartBox.style.display = "none"
    }
    else {
      cartBox.style.display = "block"
    }

  }

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST1}/api/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }).then((res) => {
        return res.json()
      }).then((data) => {
        if (data.id) {
          setUser(data);
          setLoggedin(true);
        }
        else {
          setUser({});
          setLoggedin(false);
        }
      }).catch((err) => {
        console.log("Connection Failed");
      })
    }
    else {
      setUser({});
      setLoggedin(false);
    }
  }, [router.query])
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
    {loggedin ? <Cartbox toggleCart={toggleCart} key={key} removeItem={removeItem} /> : ""}
    <Header addToCart={addToCart} user={user} loggedin={loggedin} toggleCart={toggleCart} />
    <Component {...pageProps} addToCart={addToCart} user={user} loggedin={loggedin} />
  </>
}

export default MyApp
