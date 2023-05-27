# Bid Calculation App

This repository contains a bid calculation application built with Symfony 6. It allows users to calculate bid amounts based on vehicle base price and type, using predefined tax rules and parameters.

## Prerequisites

- PHP 8.0 or higher
- Composer (https://getcomposer.org/)
- Node.js and npm (https://nodejs.org/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/joseiguti/progi.git
   
2. Clone the repository:
   
   ```bash
   composer install
   
3. Install JavaScript dependencies:
   
   ```bash
   npm install
 
4. Build the assets:
   
   ```bash
   npm run build
   
5. Set up the environment variables:
  - Create a copy of the .env file: cp .env .env.local
  - Modify the .env.local file and update any necessary configuration (e.g., database credentials).

6. Set up the database (if applicable):

   ```bash
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate

7. Start the development server:
   
   ```bash
   symfony serve
   
8. Access the application in your browser:
   
   Open your web browser and visit http://localhost:8000/bid/calculation
   
   
## Usage

Use the provided bid calculation form on the path /bid/calculation to enter the vehicle base price and select the vehicle type.
You don't need to do click or submit, just complete the form to get the total bid amount, including taxes and fees.



