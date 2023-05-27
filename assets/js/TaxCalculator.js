class TaxCalculator {
    /**
     * Calculates taxes based on the provided amount, description, and tax rules.
     *
     * @param {number} amount - The amount to calculate taxes for.
     * @param {string} description - The description of the tax calculation.
     * @param {object} taxRules - The tax rules to apply for the calculation.
     * @returns {object} The calculated taxes.
     * @property {number} basic_user_fee - The calculated basic user fee.
     * @property {number} seller_special_fee - The calculated seller special fee.
     * @property {number} association_cost - The calculated association cost.
     * @property {number} storage_fee - The storage fee.
     * @property {number} total - The total amount including taxes.
     */
    static calculateTaxes(amount, description, taxRules) {
        let basicUserFee = amount * taxRules.basic_user_fee;
        let sellerSpecialFee = 0;
        let associationCost = 0;

        for (const rule of taxRules.association_costs) {
            if (amount <= rule.amount || rule.amount === null) {
                associationCost = rule.cost;
                break;
            }
        }

        if (description === 'com') {
            basicUserFee = Math.max(basicUserFee, taxRules.common_car.minimum);
            basicUserFee = Math.min(basicUserFee, taxRules.common_car.maximum);
            sellerSpecialFee = amount * taxRules.seller_special_fee.common_car;
        } else if (description === 'lux') {
            basicUserFee = Math.max(basicUserFee, taxRules.luxury_car.minimum);
            basicUserFee = Math.min(basicUserFee, taxRules.luxury_car.maximum);
            sellerSpecialFee = amount * taxRules.seller_special_fee.luxury_car;
        }

        basicUserFee = Math.floor(basicUserFee * 100) / 100;
        sellerSpecialFee = Math.floor(sellerSpecialFee * 100) / 100;
        associationCost = Math.floor(associationCost * 100) / 100;

        const total = amount + basicUserFee + sellerSpecialFee + associationCost + taxRules.storage_fee;

        const taxes = {
            basic_user_fee: basicUserFee,
            seller_special_fee: sellerSpecialFee,
            association_cost: associationCost,
            storage_fee: taxRules.storage_fee,
            total: total
        };

        return taxes;
    }
}

export default TaxCalculator;
