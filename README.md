# Mailcow Email Generator Bot

This Node.js program is designed to generate Mailcow email accounts programmatically. It utilizes the Mailcow API to create email accounts with specified parameters, such as username, password, domain, etc. This can be particularly useful for automation tasks or bulk creation of email accounts.

## Prerequisites

Before running this program, ensure you have the following installed:

- Node.js (version 12 or above)
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/QuantummDev/EmailGen.git
```

## Navigate to the cloned directory:

```bash
cd EmailGen
```

## Install dependencies:

```bash
npm install
```

## Configuration

Before running the program, you need to configure it by providing your Mailcow API credentials and other necessary parameters. Follow these steps:

    Open .env.example file in the project directory.

    Fill in the following fields with your Mailcow API credentials and other desired parameters:

    ```
    DOMAIN=mail.yourdomain.xyz
    APIKEY=YourMailCowApiKey
    DEFAULTQUOTA=1024
    ```

    Rename the .env.example to .env

## Usage

To generate Mailcow email accounts, run the following command:

```bash
npm start
```

This will execute the program and generate email accounts based on the configuration provided in .env.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Thanks to the creators of Mailcow for providing a powerful email platform.
Thanks to the creator dominictarr for the github names.
This project was inspired by the need for automating email account creation tasks.

Feel free to customize this template according to your specific project needs. Make sure to replace placeholders such as `mail.yourdomain.xyz`, `YourMailCowApiKey` and `YourDefaultQuota` with your actual information.