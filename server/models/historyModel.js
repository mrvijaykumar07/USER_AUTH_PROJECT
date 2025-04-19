import Mongoose from 'mongoose'

const historySchema=Mongoose.Schema({
    a:Number,
    b:Number,
    result:Number
})

 const history =Mongoose.model('history',historySchema)
export default history;