/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_PAYMENT_METHOD_CANCEL,
	WOOCOMMERCE_PAYMENT_METHOD_CLOSE,
	WOOCOMMERCE_PAYMENT_METHOD_EDIT_FIELD,
	WOOCOMMERCE_PAYMENT_METHOD_OPEN,
} from '../../../action-types';

export const openPaymentMethodForEdit = ( siteId, id ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_OPEN, siteId, payload: { id } };
};

export const closeEditingPaymentMethod = ( siteId ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_CLOSE, siteId };
};

export const cancelEditingPaymentMethod = ( siteId ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_CANCEL, siteId };
};

export const changePaymentMethodField = ( siteId, field, value ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_EDIT_FIELD, siteId, payload: { field, value } };
};
