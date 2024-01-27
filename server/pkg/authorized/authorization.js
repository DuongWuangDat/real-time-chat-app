const bcrypt = require('bcrypt')

const hashPassword= async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const comparePassword = async (hashPassword, password)=>{
    return await bcrypt.compareSync(password,hashPassword)
}


module.exports= {hashPassword, comparePassword}