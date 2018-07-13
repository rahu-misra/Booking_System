const Bcrypt = require('bcrypt')

class bcrypt{
static async   encryptPassword(plainPassword) {
    try {
        const salt=await Bcrypt.genSaltSync(10);
      const hash= await Bcrypt.hashSync(plainPassword,salt)
       return hash;
    } catch (error) {
        console.log(error)
        throw error
    }

}

static async decryptPassword(plainPassword,hash) {
    try {
        
        const check=await Bcrypt.compareSync(plainPassword, hash)
        return check;
    } catch (error) {
console.log(error)
        throw error;
    }
}

}

module.exports = bcrypt;
