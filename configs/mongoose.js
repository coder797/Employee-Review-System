const mongoose = require('mongoose');
let db = null;
const dbConnect = async () => {
    try{

        await mongoose.connect('mongodb+srv://rishabh997:krishna@cluster0.elso0f3.mongodb.net/employeeSystem?retryWrites=true&w=majority',
            { useNewUrlParser: true,
                useUnifiedTopology: true
            });
        db = mongoose.connection;
    }
    catch (err) {
        (db) && await db.close();

        console.log('Error at dbConnect ::', err)
        throw err;
    }
}

dbConnect().then(res => console.log('Printing at callee ::', res)).catch(err => console.log('Err at Call ::', err));


module.exports = db;