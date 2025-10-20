import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Login from "./Login";

export default function FoodCard({ id, name, rating, reviews, cuisine, price, deliveryTime, offer, image }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const handlePlaceOrder = () => {
    if (isAuthenticated) {
      navigate(`/checkout/${id}`, { state: { name, price } });
    }
  };

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    // Optional: Automatically proceed to checkout after successful login
    // navigate(`/checkout/${id}`, { state: { name, price } });
  };

  return (
    <Card className="rounded-xl overflow-hidden shadow-md relative flex flex-col h-full">

      {/* Image */}
      <CardMedia
        component="img"
        image={image}
        alt={name}
        className="h-[160px] object-cover"
      />

      {/* Content */}
      <CardContent className="p-3 flex-grow flex flex-col">
        {/* Title + Rating */}
        <div className="flex items-center justify-between">
          <Typography variant="subtitle1" className="font-semibold">
            {name}
          </Typography>
          <div className="flex items-center text-sm text-gray-700">
            <StarIcon className="text-orange-500 mr-1" fontSize="small" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews}+)</span>
          </div>
        </div>

        {/* Cuisine */}
        <Typography variant="body2" className="text-gray-500">
          {cuisine}
        </Typography>

        {/* Delivery + Price */}
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-600">{deliveryTime}</span>
          <span className="text-pink-600 font-medium">Free for first order</span>
        </div>

        {/* Pricing */}
        <div className="mt-2 mb-2 text-gray-800 font-semibold">
          Starting from <span className="text-pink-600">{price}</span>
        </div>

        {isAuthenticated ? (
          <Button 
            variant="contained" 
            fullWidth
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        ) : (
          <>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => setLoginOpen(true)}
          >
            Login to Order
          </Button>
          <Login 
            open={loginOpen} 
            onClose={() => setLoginOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
          </>
        )}
      </CardContent>
    </Card>
  );
}