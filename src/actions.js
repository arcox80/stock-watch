export const TOGGLE_INFO_MODAL = 'TOGGLE_INFO_MODAL';
export const toggleInfoModal = () => ({
    type: TOGGLE_INFO_MODAL
});

export const FIND_STOCK = 'FIND_STOCK';
export const findStock = (symbol) => ({
    type: FIND_STOCK,
    symbol
});