// src/utils/stringUtils.js
// 10 String Methods used throughout the app

// 1. toUpperCase — role badge display
export const formatRole = (role) => role.toUpperCase();

// 2. toLowerCase — search comparison
export const normalizeSearch = (str) => str.toLowerCase();

// 3. trim — clean user input before saving
export const cleanInput = (str) => str.trim();

// 4. includes — search filter check
export const searchIncludes = (text, query) =>
  text.toLowerCase().includes(query.toLowerCase());

// 5. slice — truncate bio for card preview
export const truncateBio = (bio, maxLen = 60) =>
  bio.length > maxLen ? bio.slice(0, maxLen) + "..." : bio;

// 6. split — tags string to array
export const parseTags = (tagsStr) =>
  tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

// 7. replace — clean email display (mask domain)
export const maskEmail = (email) =>
  email.replace(/(.{3}).*(@.*)/, "$1***$2");

// 8. startsWith — username validation
export const isValidUsername = (username) => username.startsWith("@");

// 9. charAt + toUpperCase — capitalize first letter
export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// 10. padStart — format ID display
export const formatId = (id) =>
  String(id).padStart(4, "0");

// Bonus: template literal — format member summary string
export const formatSummary = (member) =>
  `${member.name} | ${member.role} | ${member.city} | ⭐ ${member.rating}`;
