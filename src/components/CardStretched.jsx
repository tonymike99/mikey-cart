import { useCart } from "../hooks/context/index";

function CardStretched({ productData }) {
  const { name, oldPrice, price, discountPercent, quantity, image } =
    productData;
  const { cartProducts, setCartProducts } = useCart();

  const handlerRemoveFromCart = (id) => {
    // Remove product from cart
    setCartProducts(cartProducts.filter((product) => product._id !== id));
  };

  const handlerIncreaseQuantity = (id) => {
    // Find the product in cart whose quantity is to be increased
    setCartProducts(
      cartProducts.map((product) =>
        product._id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handlerDecreaseQuantity = (id) => {
    // Find the product in cart whose quantity is to be increased
    setCartProducts(
      cartProducts.filter((product) => {
        if (product._id === id) {
          if (product.quantity === 1) return false;
          product.quantity--;
        }
        return true;
      })
    );
  };

  return (
    <div className="card card-horizontal card-stretched">
      <div className="card-left-content">
        <img className="image-responsive" src={image} alt={name} />
      </div>
      <div className="card-right-content">
        <div className="card-body">
          <h4 className="text-bold text-muted">{name}</h4>
          <h3 className="text-bold">₹ {price}</h3>
          <small>
            <span className="text-strikethrough">₹ {oldPrice}</span>{" "}
            <span className="text-bold">{discountPercent}% off</span>
          </small>
          <p>
            Quantity:{" "}
            <button
              className="btn round btn-secondary btn-floating"
              onClick={() => handlerDecreaseQuantity(productData._id)}
            >
              <i className="fas fa-minus" />
            </button>{" "}
            {quantity}{" "}
            <button
              className="btn round btn-primary btn-floating"
              onClick={() => handlerIncreaseQuantity(productData._id)}
            >
              <i className="fas fa-plus" />
            </button>
          </p>
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary-outline btn-width-100">
            Save to wishlist
          </button>
          <button
            className="btn btn-danger btn-width-100"
            onClick={() => handlerRemoveFromCart(productData._id)}
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
}

export { CardStretched };
