const faker = require('faker');

class Utils {
    static generateRandomNumber(min = 1000, max = 9999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomEmail() {
        return faker.internet.email();
    }

    static generateRandomDate(start = new Date(2000, 0, 1), end = new Date()) {
        return faker.date.between(start, end).toISOString().split('T')[0];
    }

    static generateRandomString(length = 10) {
        return faker.random.alphaNumeric(length);
    }

    static generateRandomPhoneNumber() {
        return faker.phone.phoneNumber();
    }
}

module.exports = Utils;