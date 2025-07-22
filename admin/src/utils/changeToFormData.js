const changeToFormData = (object) => {
    const formData = new FormData();
    for (const key in object) {
        const value = object[key];

        if (key === 'local_image' && value instanceof File) {
            formData.append('local_image', value);
        } 
        else if(value instanceof File){
            formData.append(key, value);
        }
        else if (typeof value === 'object' && value !== null) {
            // Với object hoặc array thì stringify
            formData.append(key, JSON.stringify(value));
        } 
        else {
            formData.append(key, value);
        }
    }
    return formData;
}
export default changeToFormData;