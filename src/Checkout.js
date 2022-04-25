import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';
import { useEffect, useState } from 'react';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places



const Product = ({ id, name, availableCount, price, orderedQuantity, total , handler}) => {
  const [currentTotal, setCurrentTotal] = useState(0);
  const [quantity, setQuantity] = useState(orderedQuantity || 0);
debugger;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{quantity}</td>   
      <td>${currentTotal.toFixed(2)}</td>
      <td>
        <button className={styles.actionButton} onClick={() => {
          const currentPrice = currentTotal + price; 
          setCurrentTotal(currentPrice);
          setQuantity(quantity+1);
          handler(total+price);
          
        }} disabled={quantity === availableCount}>+</button>
        <button className={styles.actionButton} onClick={() => {
          const currentPrice = currentTotal - price; 
          setCurrentTotal(currentPrice);
          setQuantity(quantity-1);
          handler(total-price);
        }} disabled={quantity === 0}>-</button>
      </td>
    </tr>    
  );
}


const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(()=> {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  },[]);

  const handler = (value) => {
    setTotal(value);
  }

  return (
    <div>
      <header className={styles.header}>        
        <h1>Electro World</h1>        
      </header>
      <main>
        {loading && <LoadingIcon />}      
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {/* Products should be rendered here */}
          {products.map((product, index) => {
            return <Product {...product} total={total} handler={handler}/>
          })}
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: $ {(total > 1000 ? (total*0.1) : 0).toFixed(2)}</p>
        <p>Total: $ {(total > 1000 ? (total - total*0.1) : total).toFixed(2)}</p>       
      </main>
    </div>
  );
};

export default Checkout;