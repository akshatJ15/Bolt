const express=require('express');
const app=express();
const dotenv = require('dotenv');
const cors=require('cors');
dotenv.config();
const connectDb=require('./db/db');
const userRoutes=require('./routes/user.routes');
const cookieParser=require('cookie-parser');
const captainRoutes=require('./routes/captain.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

connectDb();


app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});