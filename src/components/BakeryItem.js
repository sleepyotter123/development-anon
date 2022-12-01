// TODO: create a component that displays a single bakery item
import "../App.css";
import bakeryData from "../assets/bakery-data.json";

export default function BakeryItem(props) {
    const item = props.item;
    const updateCart = props.updateCart;
    const cart = props.cart;

    const handleClick = () => {
        console.log(`clicked ${item.name}`)
        // make a function for update cart
        updateCart(item);
    }

    
    return(
        <div className = "bakeryItem">
            <img src={props.item.image} height="250" width="350"/>
            <p></p>
            <h3> {props.item.name} </h3>
            {props.item.warm && "Warm"} {props.item.cold && "Cold"}
            <p></p>
            {props.item.type}
            <p></p>
            {props.item.price}
            <p></p>
            <button onClick = {handleClick}> Add to Cart </button>
            <p></p>
            
        </div>
    );
}