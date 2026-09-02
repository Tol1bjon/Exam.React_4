import database from './db.json';

export const cards = database.cards;

export const getCards = async () => cards;
