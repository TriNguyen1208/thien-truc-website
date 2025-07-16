const changeToFormData = (object) => {
    const formData = new FormData();
    for(const key in object){
        if (key === 'local_image' && object[key] instanceof File) {
            formData.append('local_image', object[key]);
        }
        else{
            formData.append(key, object[key]);
        }
    }
    return formData;
}
export default changeToFormData;