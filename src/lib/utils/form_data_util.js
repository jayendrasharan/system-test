export const convertFormDataToJSON = (formData) => {
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    return object;
}