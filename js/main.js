import {Products} from "./Product.js";
import {ProductForm} from "./Form.js";

window.addEventListener('DOMContentLoaded', () => {
    ProductForm.setUp();
    Products.renderAll();
})