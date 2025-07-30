const changeToFormData = (object, finalHtml = null) => {
    const formData = new FormData();
    for (const key in object) {
        const value = object[key];
        if(value instanceof File){
            formData.append(key, value);
        }
        else if (typeof value === 'object' && value !== null) {
            // Với object hoặc array thì stringify
            formData.append(key, JSON.stringify(value));
        }
        else if(key == 'content' && finalHtml){
            formData.append(key, finalHtml);
        }
        else {
            formData.append(key, value);
        }
    }
    return formData;
}
export default changeToFormData;