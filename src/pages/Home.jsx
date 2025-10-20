import Typography from '@mui/material/Typography';
import Card from '../component/Card'
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // firebase.js ka path


export default function Home() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
      const fetchRestaurants = async () => {
        const querySnapshot = await getDocs(collection(db, "foodItem"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(data);
        setRestaurants(data);
      };
  
      fetchRestaurants();
    }, []);
    return (
        <div className='text'>
            <Typography variant="h1">
                Food Item
            </Typography>
            <div className="grid grid-cols-4 gap-2 items-center">
                {restaurants.map(restaurant => <Card key={restaurant.id} {...restaurant} />)}
            </div>
        </div>
    );
}