// src/pages/home/homeUtils.js
// Advanced Array Methods for FaceApp Community

// arr.filter() — filter verified members
export const getVerifiedMembers = (members) =>
  members.filter((m) => m.verified === true);

// arr.map() — extract names list
export const getMemberNames = (members) =>
  members.map((m) => m.name);

// arr.sort() — sort by followers descending
export const sortByFollowers = (members) =>
  [...members].sort((a, b) => b.followers - a.followers);

// arr.sort() — sort by rating descending
export const sortByRating = (members) =>
  [...members].sort((a, b) => b.rating - a.rating);

// arr.sort() — sort by name A-Z
export const sortByName = (members) =>
  [...members].sort((a, b) => a.name.localeCompare(b.name));

// arr.reduce() — total followers across all members
export const getTotalFollowers = (members) =>
  members.reduce((acc, m) => acc + m.followers, 0);

// arr.reduce() — average rating
export const getAverageRating = (members) =>
  members.length
    ? (members.reduce((acc, m) => acc + m.rating, 0) / members.length).toFixed(1)
    : 0;

// arr.find() — find member by id
export const findMemberById = (members, id) =>
  members.find((m) => m.id === id);

// arr.includes() — check if city exists in members
export const cityExists = (members, city) =>
  members.map((m) => m.city).includes(city);

// arr.every() — check if all members have email
export const allHaveEmail = (members) =>
  members.every((m) => m.email && m.email.length > 0);

// arr.some() — check if any member has 5000+ followers
export const hasMegaInfluencer = (members) =>
  members.some((m) => m.followers >= 5000);

// Object CRUD Methods
// obj.key — access property
export const getMemberCity = (member) => member.city;

// Object.keys() — get all keys of a member object
export const getMemberKeys = (member) => Object.keys(member);

// Object.values() — get all values
export const getMemberValues = (member) => Object.values(member);

// Object.entries() — get key-value pairs
export const getMemberEntries = (member) => Object.entries(member);

// Object.assign() — merge/update member
export const updateMember = (original, updates) =>
  Object.assign({}, original, updates);

// delete operator — remove a property
export const removeSensitiveData = (member) => {
  const copy = { ...member };
  delete copy.email;
  return copy;
};
