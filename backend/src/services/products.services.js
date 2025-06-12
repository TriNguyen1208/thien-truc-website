import pool from '#@/config/db.js'
const getAll = async () => {
    const product_page = (await pool.query("SELECT * FROM product.product_page")).rows;
    const price_page = (await pool.query("SELECT * FROM product.price_page")).rows;
    const product = (await pool.query(
        `select price.*, info.*, cate.name as category_name
         from product.product_price price, product.product_information info, product.product_category cate
         where price.product_id = info.id and info.category_id = cate.id`
    )).rows

    if(!product_page){
        throw new Error("Can't get product_page");
    }
    if(!price_page){
        throw new Error("Can't get price_page");
    }
    if(!product){
        throw new Error("Can't get product");
    }
    return {
        product_page: product_page,
        price_page: price_page,
        product: product
    };   
}
const getId = async (id) => {
    const product = (await pool.query(
        `select price.*, info.*, cate.name as category_name
         from product.product_price price, product.product_information info, product.product_category cate
         where price.product_id = info.id and info.category_id = cate.id and price.id = $1`, [id]
    )).rows
    if(!product){
        throw new Error("Can't get product");
    }
    return {
        product: product
    }
}
export default {getAll, getId};