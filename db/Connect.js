const {default:mongoose}=require('mongoose');

const db='mongodb+srv://rentnestinfo:rentnestinfo@rentnest.gk3ljx5.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db).then(()=>console.log('Database Connected')).catch((err)=>console.log(err));