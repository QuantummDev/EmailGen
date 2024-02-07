const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const { randomBytes } = require('crypto');
require('dotenv').config()

// Function to fetch first names from GitHub raw file
async function fetchFirstNamesFromGitHub() {
    const url = 'https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.txt';

    try {
        const response = await axios.get(url);
        return response.data.split('\n').map(name => name.trim());
    } catch (error) {
        console.error('Error fetching first names from GitHub:', error);
        return [];
    }
}

// Function to generate a random local part (username)
function generateRandomLocalPart(realName, length) {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    const sanitizedRealName = realName.toLowerCase()
    const randomLocalPart = `${sanitizedRealName}${randomNumbers}`// Combine random numbers with sanitized real name
    return randomLocalPart;
}

// Function to generate a random password
function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Function to create multiple user accounts
async function createMultipleUsers(numAccounts) {
    const url = `https://${process.env.DOMAIN}/api/v1/add/mailbox`;
    const apiKey = process.env.APIKEY;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        }
    };

    const firstNames = await fetchFirstNamesFromGitHub();
    let accounts = '';

    for (let i = 0; i < numAccounts; i++) {
        const randomRealName = firstNames[Math.floor(Math.random() * firstNames.length)]; // Randomly select a real name
        const randomLocalPart = generateRandomLocalPart(randomRealName, 3); // Generate a random local part with real name and numbers
        const randomPassword = generateRandomPassword(12); // Generate a random password with 12 characters

        const email = `${randomLocalPart}@${process.env.DOMAIN}`;
        const account = `${email}:${randomPassword}\n`;
        accounts += account;
        try {
            const response = await axios.post(url, {
                local_part: randomLocalPart,
                domain: process.env.DOMAIN,
                name: randomRealName,
                quota: '3072',
                password: randomPassword,
                password2: randomPassword,
                active: '1',
                force_pw_update: '0',
                tls_enforce_in: '0',
                tls_enforce_out: '0'
            }, config);
            console.log(`Account ${i + 1} created.`);
        } catch (error) {
            console.error(`Error creating account ${i + 1}:`, error.response.data);
        }
    }

    return accounts;
}

// Function to write accounts to a file
async function writeAccountsToFile(accounts) {
    let filename = 'accounts.txt';
    let count = 1;
    while (fs.existsSync(filename)) {
        count++;
        filename = `accounts${count}.txt`;
    }

    try {
        await fs.promises.writeFile(filename, accounts);
        console.log(`Accounts saved to ${filename}`);
    } catch (error) {
        console.error('Error writing accounts to file:', error);
    }
}

// Function to ask for the number of accounts to generate
function askForNumberOfAccounts() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('How many accounts do you want to generate? ', async (numAccounts) => {
        const parsedNumAccounts = parseInt(numAccounts);
        if (!isNaN(parsedNumAccounts) && parsedNumAccounts > 0) {
            const accounts = await createMultipleUsers(parsedNumAccounts);
            await writeAccountsToFile(accounts);
            rl.close();
        } else {
            console.error('Please enter a valid number greater than 0.');
            rl.close();
        }
    });
}

// Call the function to ask for the number of accounts
askForNumberOfAccounts();
