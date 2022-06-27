import mockData from "./mockData.js";
import {fillForm} from "./domHelper.js";
import {ProductForm} from "./Form.js";

export const Products = (() => {
    let products = mockData;
    let domSection = document.querySelector('.products');
    let currentProduct = '';
    domSection.addEventListener("click", handleClick);

    function handleClick(evt) {
        evt.stopPropagation()
        let target = evt.target
        if (target.tagName !== "BUTTON") return
        if (target.classList.contains('btn--edit')) {
            toggleFormEditing(target)
        } else {
            deleteProduct(target)
        }
    }

    function _searchProductById(productId) {
        let toReturn = products.find((product) => product.id == productId)
        return toReturn;
    }

    function seeData() {
        console.log(products);
    }

    function toggleFormEditing(elementClicked) {
        let productDom = elementClicked.parentElement.parentElement
        let productDomId = productDom.id;
        currentProduct = _searchProductById(productDomId)
        ProductForm.toggleStatus();
        fillForm(ProductForm.getForm(), currentProduct);
    }

    function modifyProduct(formData) {
        let index = products.indexOf(currentProduct);
        currentProduct = Object.assign({}, currentProduct, formData)
        products[index] = currentProduct;
        currentProduct = "";
        ProductForm.toggleStatus();
        renderAll();
    }

    function deleteProduct(elementClicked) {
        let productDom = elementClicked.parentElement.parentElement
        let productDomId = productDom.id;
        products = products.filter(product => product.id != productDomId);
        productDom.remove();
        ProductForm.resetForm();
        seeData();
    }

    function addProduct(product) {
        products.push(product)
        renderProduct(product);
    }

    function createProduct(formData) {
        let finalData = Object.assign({}, {
            id: Date.now().toString(),
            img: 'https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png',
        }, formData);
        addProduct(finalData)
    }

    function renderProduct(product) {
        let productDiv = document.createElement('div');
        productDiv.setAttribute('class', 'product')
        productDiv.setAttribute('id', `${product.id}`)
        productDiv.innerHTML = createProductDom(product)
        domSection.append(productDiv);
    }

    function renderAll() {
        domSection.innerHTML = "";
        products.forEach(product => {
            let productDiv = document.createElement('div');
            productDiv.setAttribute('class', 'product')
            productDiv.setAttribute('id', `${product.id}`)
            productDiv.innerHTML = createProductDom(product)
            domSection.append(productDiv);
        })
    }

    function createProductDom(product) {
        return `
                <img class="product__img" src=${product.img} alt="product image">
                <div class="product__info">
                    <h2 class="product__title">${product.name}</h2>
                    <p class="product__price">$${product.value}</p>
                </div>
                <div class="product__btns">
                    <button class="btn btn--edit">Edit</button>
                    <button class="btn btn--delete">Delete</button>
                </div>`;
    }

    return {
        renderAll,
        createProduct,
        modifyProduct,
        seeData
    }
})();