const Joi = require('joi');

// const validator = (schema) => (payload) => 
//     schema.validate(payload, { abortEarly: false });


const dataSchema = Joi.object({
  
    name: Joi.string().required(),
    email: Joi.string().email().required(),
   
})

const userValidation = async (req,res, next) =>{
    const payload = {
        name: req.body.name,
        email: req.body.email,
    }

    const { error } = dataSchema.validate(payload);

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }else{
        next();
    }
}

// exports.validateSignup = validator(dataSchema); 

module.exports = userValidation;