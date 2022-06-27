/*Funcion que me permite rellenar los campos de un formulario con datos */
export function fillForm(form, data) {
    const entries = Object.entries(data);
    for(const [key, val] of entries){
        const input = form.elements[key];
        if(input){
            input.value = val;
        }
    }
}