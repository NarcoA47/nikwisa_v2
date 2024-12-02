const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-[14rem] bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
      {/* Product Content Wrapper */}
      <div className="p-2">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-md overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col mt-4">
          {/* Product Title */}
          <h3 className="text-xs md:text-sm font-medium text-gray-800 truncate">
            {product.title}
          </h3>

          {/* Price and Rating */}
          <div className="flex flex-row justify-between items-center ">
            {/* Product Price */}
            <p className="text-gray-700 font-bold text-sm md:text-lg my-0">
              K{product.price.toFixed(2)}
            </p>

            {/* Product Rating */}
            <div className="w-8 h-8 flex items-center justify-center bg-gray-500 text-yellow-500 font-semibold text-xs rounded-md">
              {product.rating} ★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
