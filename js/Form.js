import {Products} from "./Product.js"

export const ProductForm = (() => {
    let element = document.querySelector('.form');
    let formData = undefined;
    let status = 'adding';

    function resetForm(){
       element.reset();
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        let data = new FormData(evt.target);
        formData = Object.fromEntries(data)
        resetForm()
        onFormSubmit()
    }

    function onFormSubmit() {
        if (status === 'adding') {
            Products.createProduct(formData);
        } else {
            Products.modifyProduct(formData);
        }
        Products.seeData();
    }

    function setUp() {
        element.addEventListener("submit", handleSubmit)
    }

    function getForm() {
        return element
    }

    function toggleStatus() {
        status = status === 'adding' ? 'modifying' : 'adding';
    }

    return {
        setUp,
        getForm,
        toggleStatus,
        resetForm
    }
})()