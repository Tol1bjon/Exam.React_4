import database from './db.json';

export const saleItems = database.Sale || [];
export const blogItems = database.Blog || [];

export const getSaleItems = async () => saleItems;
export const getBlogItems = async () => blogItems;
