import { format } from 'date-fns';

const bnMonths = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 
  'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBengaliDigits = (num: number | string): string => {
  return num.toString().split('').map(digit => bnDigits[parseInt(digit)] || digit).join('');
};

/**
 * Converts a Gregorian date to a Bengali date (Bangladesh version).
 * Simplified logic for UI purposes.
 */
export const getBengaliDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed
  const year = date.getFullYear();

  let bnDay = 0;
  let bnMonthIndex = 0;
  let bnYear = year - 593;

  // Simple date mapping for Bangladesh Bengali Calendar (starts April 14)
  if (month === 3 && day >= 14) { // April
    bnDay = day - 13;
    bnMonthIndex = 0;
  } else if (month === 4 && day <= 14) { // May
    bnDay = day + 17;
    bnMonthIndex = 0;
  } else if (month === 4 && day >= 15) {
    bnDay = day - 14;
    bnMonthIndex = 1;
  } else if (month === 5 && day <= 15) { // June
    bnDay = day + 16;
    bnMonthIndex = 1;
  } else if (month === 5 && day >= 16) {
    bnDay = day - 15;
    bnMonthIndex = 2;
  } else if (month === 6 && day <= 16) { // July
    bnDay = day + 15;
    bnMonthIndex = 2;
  } else if (month === 6 && day >= 17) {
    bnDay = day - 16;
    bnMonthIndex = 3;
  } else if (month === 7 && day <= 16) { // August
    bnDay = day + 15;
    bnMonthIndex = 3;
  } else if (month === 7 && day >= 17) {
    bnDay = day - 16;
    bnMonthIndex = 4;
  } else if (month === 8 && day <= 16) { // September
    bnDay = day + 15;
    bnMonthIndex = 4;
  } else if (month === 8 && day >= 17) {
    bnDay = day - 16;
    bnMonthIndex = 5;
  } else if (month === 9 && day <= 16) { // October
    bnDay = day + 14;
    bnMonthIndex = 5;
  } else if (month === 9 && day >= 17) {
    bnDay = day - 16;
    bnMonthIndex = 6;
  } else if (month === 10 && day <= 15) { // November
    bnDay = day + 15;
    bnMonthIndex = 6;
  } else if (month === 10 && day >= 16) {
    bnDay = day - 15;
    bnMonthIndex = 7;
  } else if (month === 11 && day <= 15) { // December
    bnDay = day + 15;
    bnMonthIndex = 7;
  } else if (month === 11 && day >= 16) {
    bnDay = day - 15;
    bnMonthIndex = 8;
  } else if (month === 0 && day <= 14) { // January
    bnDay = day + 15;
    bnMonthIndex = 8;
    bnYear--;
  } else if (month === 0 && day >= 15) {
    bnDay = day - 14;
    bnMonthIndex = 9;
    bnYear--;
  } else if (month === 1 && day <= 13) { // February
    bnDay = day + 17;
    bnMonthIndex = 9;
    bnYear--;
  } else if (month === 1 && day >= 14) {
    bnDay = day - 13;
    bnMonthIndex = 10;
    bnYear--;
  } else if (month === 2 && day <= 14) { // March
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const febDays = isLeapYear ? 31 : 30; // In Bangladesh, Falgun is 31 days in leap year
    bnDay = day + (isLeapYear ? 16 : 15);
    bnMonthIndex = 10;
    bnYear--;
  } else if (month === 2 && day >= 15) {
    bnDay = day - (format(date, 'yyyy') === year.toString() && day >= 15 ? 14 : 15); // Approximate
    bnMonthIndex = 11;
    bnYear--;
  } else {
      // Fallback
      bnDay = day;
      bnMonthIndex = month;
  }

  return {
    day: bnDay,
    month: bnMonths[bnMonthIndex],
    year: bnYear,
    full: `${toBengaliDigits(bnDay)} ${bnMonths[bnMonthIndex]} ${toBengaliDigits(bnYear)}`
  };
};
