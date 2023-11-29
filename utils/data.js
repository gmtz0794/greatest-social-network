const usernames = [
  'user1',
  'user2',
  'user3',
];

const thoughtDescriptions = [
  'This is a cool thought!',
  'Just had an amazing experience!',
  'Thinking about the future...',
  'Feeling grateful today.',
  'Random thought of the day!',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () => getRandomArrItem(usernames);

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      username: getRandomUsername(),
      thoughtDescription: getRandomArrItem(thoughtDescriptions),
    });
  }
  return results;
};

module.exports = { getRandomUsername, getRandomThoughts };
