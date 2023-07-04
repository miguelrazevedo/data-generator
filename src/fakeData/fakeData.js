const { fakerPT_PT: faker, fakerEN, fakerPT_BR } = require('@faker-js/faker');
const User = require('../models/userModel');
const Team = require('../models/teamModel');
const fs = require('fs');
const { randEmail, randPhoneNumber } = require('@ngneat/falso');
function getUsersFile() {
    try {
        return JSON.parse(fs.readFileSync('./tempJSON/users.json', 'utf-8'));
    } catch (error) {
        console.log(error);
    }
}

function getTeamsFile() {
    try {
        return JSON.parse(fs.readFileSync('./tempJSON/teams.json', 'utf-8'));
    } catch (error) {
        console.log(error);
    }
}

function removeFromArray(array, index) {
    return array.splice(index, 1);
}

function generateTeamMembers(users) {
    let members = [];
    for (let i = 0; i < 9; i++) {
        const index = Math.floor(Math.random() * users.length);
        const random = users[index];

        members.push(random.email);

        // Remove user, to make sure it doesn't get chosen anymore
        const newarr = removeFromArray(users, index);
    }
    return members;
}

function createRandomUser() {
    let firstname = faker.person.firstName();
    let lastname = faker.person.lastName();
    let email = randEmail({ length: 1, firstname, lastname })[0];
    let phoneNumber = randPhoneNumber({ countryCode: 'PT' });
    let country = 'PT';

    const random = Math.floor(Math.random() * 15);
    if (random < 5) {
        firstname = fakerEN.person.firstName();
        lastname = fakerEN.person.lastName();
        email = randEmail({ length: 1, firstname, lastname })[0];
        country = 'UK';
        phoneNumber = randPhoneNumber({ countryCode: 'UK' });
    } else if (random >= 5 && random < 10) {
        firstname = fakerPT_BR.person.firstName();
        lastname = fakerPT_BR.person.lastName();
        email = randEmail({ length: 1, firstname, lastname })[0];
        country = 'BR';
        phoneNumber = randPhoneNumber({ countryCode: 'BR' });
    }

    return {
        fullname: firstname + ' ' + lastname,
        email: email,
        password: faker.internet.password(),
        resetCode: faker.string.alphanumeric(6),
        birthdate: faker.date.between({
            from: '1995-01-01T00:00:00.000Z',
            to: '2003-12-31T00:00:00.000Z',
        }),
        country: country,
        phoneNumber: phoneNumber,
    };
}

function createRandomTeam() {
    const users = getUsersFile();

    if (!users) {
        throw new Error('Cannot create team. Make sure you have USERS in DB.');
    }

    const randomIndex = Math.floor(Math.random() * users.length);
    const createdBy = users[randomIndex];

    // Remove user from array, to make sure it doesn't get chosen again
    const newarr = removeFromArray(users, randomIndex);

    const country = faker.location.country();

    const members = generateTeamMembers(users);
    members.unshift(createdBy.email);
    return {
        name: country,
        username: createdBy.email,
        date: faker.date.between({
            from: '2020-01-01T00:00:00.000Z',
            to: '2022-12-31T00:00:00.000Z',
        }),
        country: country,
        members: members,
    };
}

function createRandomPub() {
    const users = getUsersFile();
    if (!users) {
        throw new Error('Cannot create pubs. Make sure you have users in DB.');
    }

    const randomIndex = Math.floor(Math.random() * users.length);
    const createdBy = users[randomIndex];

    return {
        username: createdBy.email,
        date: faker.date.between({
            from: '2023-01-01T00:00:00.000Z',
            to: '2023-07-01T00:00:00.000Z',
        }),
        content: faker.word.words({ count: { min: 5, max: 10 } }),
        profileImage: 1,
    };
}

function createRandomGame() {
    const users = getUsersFile();
    const teams = getTeamsFile();

    if (!users) {
        throw new Error('Cannot create Games. Make sure you have USERS in DB.');
    }

    if (!teams) {
        throw new Error('Cannot create Games. Make sure you have TEAMS in DB.');
    }

    const randomIndex = Math.floor(Math.random() * users.length);
    const createdBy = users[randomIndex];

    let status = 'Finished';
    const randomNumber = Math.floor(Math.random() * 100);

    // Pending | Finished
    if (randomNumber < 50) {
        if (randomNumber % 2 === 0) {
            status = 'Pending';
        } else {
            status = 'Finished';
        }
        // Approved | Rejected
    } else {
        if (randomNumber % 2 === 0) {
            status = 'Approved';
        } else {
            status = 'Rejected';
        }
    }

    const randomTeam1_index = Math.floor(Math.random() * teams.length);
    const team1 = teams[randomTeam1_index];

    const newarr = removeFromArray(teams, randomTeam1_index);

    const randomTeam2_index = Math.floor(Math.random() * teams.length);
    const team2 = teams[randomTeam2_index];

    if (status === 'Pending') {
        return {
            username: createdBy.email,
            idTeam1: team1.name,
            idTeam2: team2.name,
            location: fakerEN.location.city(),
            gameDateTime: faker.date.between({
                from: '2023-01-01T00:00:00.000Z',
                to: '2023-07-01T00:00:00.000Z',
            }),
            status: status,
        };
    } else if (status === 'Approved' || status === 'Rejected') {
        return {
            username: createdBy.email,
            idTeam1: team1.name,
            idTeam2: team2.name,
            location: fakerEN.location.city(),
            gameDateTime: faker.date.between({
                from: '2023-01-01T00:00:00.000Z',
                to: '2023-07-01T00:00:00.000Z',
            }),
            status: status,
            info: {
                goals1: 0,
                goals2: 0,
                win: '',
            },
        };
    }

    const randomG1 = Math.floor(Math.random() * 3);
    const randomG2 = Math.floor(Math.random() * 3);

    return {
        username: createdBy.email,
        idTeam1: team1.name,
        idTeam2: team2.name,
        location: fakerEN.location.city(),
        gameDateTime: faker.date.between({
            from: '2023-01-01T00:00:00.000Z',
            to: '2023-07-01T00:00:00.000Z',
        }),
        status: status,
        info: {
            goals1: randomG1,
            goals2: randomG2,
            win: randomG1 > randomG2 ? team1.name : team2.name,
        },
    };
}

function createRandomFriend() {
    const users = getUsersFile();

    if (!users) {
        throw new Error('Cannot create Games. Make sure you have USERS in DB.');
    }

    const randomIndex1 = Math.floor(Math.random() * users.length);
    const user1 = users[randomIndex1];

    const newarr = removeFromArray(users, randomIndex1);

    const randomIndex2 = Math.floor(Math.random() * users.length);
    const user2 = users[randomIndex2];

    return { user1: user1.email, user2: user2.email };
}

module.exports = {
    createRandomUser,
    createRandomTeam,
    createRandomPub,
    createRandomGame,
    createRandomFriend,
};
