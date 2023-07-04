const { connectDB, disconnectDB } = require('./config/db');
const { argv } = require('node:process');
const User = require('./models/userModel');
const Team = require('./models/teamModel');
const Friend = require('./models/friendModel');
const Game = require('./models/gameModel');
const Pub = require('./models/pubModel');
const {
    createRandomUser,
    createRandomGame,
    createRandomTeam,
    createRandomFriend,
    createRandomPub,
} = require('./fakeData/fakeData');
const { fakerPT_PT: faker } = require('@faker-js/faker');
const fs = require('fs');

async function generateUsers(quantity) {
    console.log('\nGenerating users...\n');
    const fakeUsers = faker.helpers.multiple(createRandomUser, {
        count: quantity,
    });
    console.log('\nUsers generated.\n');

    await User.create(fakeUsers);

    console.log('\nUsers added into DB.\n');
}

async function genereateTeams(quantity) {
    console.log('\nGenerating Teams...\n');
    const fakeTeams = faker.helpers.multiple(createRandomTeam, {
        count: quantity,
    });
    console.log('Teams generated.\n');
    await Team.create(fakeTeams);
    console.log('Teams added into DB.\n');
}

async function generateFriend(quantity) {
    console.log('\nGenerating Friends...\n');
    const fakeFriends = faker.helpers.multiple(createRandomFriend, {
        count: quantity,
    });

    console.log('Friends generated.\n');
    await Friend.create(fakeFriends);
    console.log('Friends added into DB.\n');
}

async function generatePub(quantity) {
    console.log('\nGenerating Pubs...\n');
    const fakePubs = faker.helpers.multiple(createRandomPub, {
        count: quantity,
    });
    console.log('Pubs generated.\n');
    await Pub.create(fakePubs);
    console.log('Pubs added into DB.\n');
}

async function generateGame(quantity) {
    console.log('\nGenerating Games...\n');
    const fakeGames = faker.helpers.multiple(createRandomGame, {
        count: quantity,
    });
    console.log('Games generated.\n');
    await Game.create(fakeGames);

    console.log('Games added into DB.\n');
}
async function dropDatabase() {
    console.log('\nDropping Database...');
    const users = await User.deleteMany({});
    const teams = await Team.deleteMany({});
    const friends = await Friend.deleteMany({});
    const games = await Game.deleteMany({});
    const pubs = await Pub.deleteMany({});

    console.log('\nDatabase dropped.\n');
}

async function setUsers() {
    const dir = './tempJSON';
    const users = await User.find();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!users) {
        throw new Error(
            'No users found. Make sure you have created USERS in DB.'
        );
    }

    try {
        fs.writeFileSync(dir + '/users.json', JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

async function setTeams() {
    const dir = './tempJSON';
    const teams = await Team.find();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!teams) {
        throw new Error(
            'No teams found. Make sure you have created TEAMS in DB.'
        );
    }

    try {
        fs.writeFileSync(dir + '/teams.json', JSON.stringify(teams));
    } catch (error) {
        console.log(error);
    }
}

function deleteFiles() {
    const dir = './tempJSON';

    fs.rmSync(dir, { recursive: true, force: true });
}

// Main
(async function () {
    const quantity = argv.length === 3 ? Number.parseInt(argv[2]) : 10;

    await connectDB();

    await dropDatabase();

    await generateUsers(quantity);

    await setUsers();

    await genereateTeams(quantity);

    await setTeams();

    await generateFriend(quantity);

    await generatePub(quantity);

    await generateGame(quantity);

    await disconnectDB();

    deleteFiles();

    console.log('\nDatabase Seed completed!');
})();
