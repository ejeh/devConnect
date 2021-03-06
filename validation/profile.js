const validator = require('validator');
const isEmpty = require ('../validation/is-empty');

module.exports =  function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle: '';
    data.skills = !isEmpty(data.skills) ? data.skills: '';
    data.status = !isEmpty(data.status) ? data.status: '';

    if(!validator.isLength(data.handle, {min: 2, max:40 })) {
        errors.handle = 'Handle is betwwen 2 to 40 characters';
    }
    if(validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle field is required';
    }
    if(validator.isEmpty(data.skills)) {
        errors.skills = 'skills field is required';
    }
    if(validator.isEmpty(data.status)) {
        errors.status= 'Status field is required';
    }
    if(!isEmpty(data.website)) {
        if(!validator.isURL(data.website)){
            errors.website = "Not a valid URL"
        }
    }
    if(!isEmpty(data.youtube)) {
        if(!validator.isURL(data.youtube)){
            errors.youtube = "Not a valid URL"
        }
    }
    if(!isEmpty(data.facebook)) {
        if(!validator.isURL(data.facebook)){
            errors.facebook = "Not a valid URL"
        }
    }
    if(!isEmpty(data.linkedin)) {
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = "Not a valid URL"
        }
    }
    if(!isEmpty(data.instagram)) {
        if(!validator.isURL(data.instagram)){
            errors.instagram = "Not a valid URL"
        }
    }




    return {
        errors,
        isValid: isEmpty(errors)
    };
};
