class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = '.btn_primary';
        this.cartIcon = '.shopping_cart_link';
    }

    async addFirstProductToCart() {
        await this.page.click(this.addToCartButton);
    }

    async openCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = ProductsPage;