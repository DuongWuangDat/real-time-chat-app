const corOption = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With,Authorization')
    next()
}
module.exports= {corOption}