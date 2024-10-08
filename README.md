# Simple POS

Simple POS is a lightweight and user-friendly Point of Sale (POS) system built using React and Ionic. It’s designed for vendors looking for an easy-to-use solution for managing sales, inventory, and customer interactions directly from a mobile or web application.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Management**: Easily add, edit, and delete products with their details, such as price, category, and stock quantity.
- **Sales Transactions**: Create and process sales transactions, with the ability to apply discounts, taxes, and record payments.
- **Inventory Tracking**: Keep track of stock levels for each product and receive alerts when inventory is low.
- **Responsive Design**: Optimized for both mobile and web with a smooth, intuitive user interface.
- **Reports**: View sales reports to track daily, weekly, and monthly sales performance.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Ionic**: A hybrid framework for building high-quality mobile and desktop applications using web technologies.
- **Supabase** (optional): For backend services like authentication, cloud storage, and real-time data syncing.

## Installation

1. **Clone the repository**:
   ```powershell
   git clone https://github.com/sirgil-org/hotspot-admin
   cd simple-pos

2. **Install dependencies**:
    ```powershell
    yarn install

3. **Set up environment variables**: Create a .env file in the project root directory and add your configurations. This can include Firebase configuration if you’re using Firebase services.

    ```powershell
    VITE_SUPABASE_URL=
    VITE_SUPABASE_ANON_KEY=
    DIGITALOCEAN_ACCESS_TOKEN

4. **Run the project**:
    ```powershell
    yarn dev

5. **Run on simulator**:
    ```npx cap run ios|android

6. **Open workspace**:
    ```npx cap open ios|android 