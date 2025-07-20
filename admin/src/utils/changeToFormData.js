const changeToFormData = (object) => {
    const formData = new FormData();
    for (const key in object) {
        const value = object[key];

        if (key === 'local_image' && value instanceof File) {
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
    for(const [key, value] of formData.entries()){
        // console.log(key, value);
    }
    return formData;
}
export default changeToFormData;