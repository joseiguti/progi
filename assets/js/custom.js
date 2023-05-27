import $ from 'jquery';
import TaxCalculator from './TaxCalculator';

/**
 * Initializes the tax calculation form and retrieves tax parameters from the API.
 */
$(document).ready(function() {

    const form = $('form');
    const amountField = $('#bid_calculation_amount');
    const descriptionField = $('#bid_calculation_description');
    let taxRules;
    let error = false;

    /**
     * Retrieves the tax parameters from the API.
     */
    function getTaxRules() {
        $.get('/api/liquidation/parameters')
            .done(function(response) {
                taxRules = response.parameters;
            })
            .fail(function() {
                showErrorMessage('An error occurred while fetching tax parameters. Please try again later.');
                error = true;
            });
    }

    /**
     * Displays an error message on the 'error-message' element.
     * @param {string} message - The error message to display.
     */
    function showErrorMessage(message) {
        $('#error-message').text(message).removeClass('d-none');
    }

    /**
     * Formats a given amount as currency.
     * @param {number} amount - The amount to format.
     * @returns {string} The formatted amount as currency.
     */
    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    /**
     * Calculates the taxes based on the entered amount and description.
     */
    function calculateTaxes() {
        if (error === false) {
            const amount = parseFloat(amountField.val().replace(/[^0-9]/g, ''));
            const description = descriptionField.val();
            const descriptionLabel = descriptionField.find('option:selected').text();

            const taxes = TaxCalculator.calculateTaxes(amount, description, taxRules);
            updateTable(taxes, amount, descriptionLabel);
        }
    }

    /**
     * Updates the table with the tax calculation results.
     * @param {object} taxes - The calculated taxes.
     * @param {number} amount - The entered amount.
     * @param {string} descriptionLabel - The selected description label.
     */
    function updateTable(taxes, amount, descriptionLabel) {
        $('#vehicle-price').text(formatCurrency(amount));
        $('#vehicle-type').text(descriptionLabel);
        $('#basic-fee').text(formatCurrency(taxes.basic_user_fee));
        $('#special-fee').text(formatCurrency(taxes.seller_special_fee));
        $('#association-fee').text(formatCurrency(taxes.association_cost));
        $('#storage-fee').text(formatCurrency(taxes.storage_fee));

        $('#total').text(formatCurrency(taxes.total));
        $('#result').removeClass('d-none');
    }

    /**
     * Hides the result table.
     */
    function hideTable() {
        $('#result').addClass('d-none');
    }

    // Event listener for the change event on the description field
    descriptionField.on('change', function() {
        if (descriptionField.val() !== '' && (amountField.val() !== '' && amountField.val() !== '0')) {
            calculateTaxes();
        } else {
            hideTable();
        }
    });

    // Event listener for the input event on the amount field
    amountField.on('input', function() {
        if (descriptionField.val() !== '' && (amountField.val() !== '' && amountField.val() !== '0')) {
            calculateTaxes();
        } else {
            hideTable();
        }
    });

    // Prevents the form from being submitted
    form.on('submit', function(event) {
        event.preventDefault();
    });

    // Retrieve tax rules from the API
    getTaxRules();

});
