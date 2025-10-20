import { useLocation, useParams } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const { name, price } = location.state || {};

  return (
    <Container className="py-8">
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => window.history.back()}
        className="mb-4"
      >
        Back to Menu
      </Button>
      
      <Box className="bg-white p-6 rounded-lg shadow-md">
        <Typography variant="h4" className="mb-6 font-bold text-gray-800">
          Checkout
        </Typography>
        
        <div className="space-y-4">
          <Typography variant="h6">Order Summary</Typography>
          
          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex justify-between items-center py-2">
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex justify-between items-center font-semibold text-lg">
              <Typography>Total</Typography>
              <Typography>{price}</Typography>
            </div>
          </div>
          
          <Button 
            variant="contained" 
            fullWidth 
            className="mt-6 bg-pink-600 hover:bg-pink-700 py-3"
            onClick={() => alert('Order placed successfully!')}
          >
            Confirm Order
          </Button>
        </div>
      </Box>
    </Container>
  );
}
