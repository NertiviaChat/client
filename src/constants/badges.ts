import { bitwiseContains } from "@/utils/bitwise";

export const CREATOR = 1;
export const CUTE = 2;
export const DEVELOPER = 4;
export const SUPPORTER = 8;
export const IDEA_QUEEN = 16;
export const BUG_CATCHER = 32;
export const TRANSLATOR = 64;
export const CONTRIBUTOR = 128;
export const EMPLOYEES = 256;
export const OLD_USER = 512;
// next value = 256

export interface Badge {
  name: string;
  iconURL: string;
  color: string;
}

// when adding a new badge, place it in the order you want and add lastest key * 2 as the new key.
export const badges: Record<number, Badge> = {
  1: {
    name: "Creator",
    iconURL: process.env.VUE_APP_TWEMOJI_LOCATION + "/1f451.png",
    color: "#ffcc4d",
  },
  2: {
    name: "Cute",
    iconURL: process.env.VUE_APP_TWEMOJI_LOCATION + "/1f33a.png",
    color: "#f4abba",
  },
  4: {
    name: "Developer",
    iconURL: process.env.VUE_APP_TWEMOJI_LOCATION + "/2728.png",
    color: "#6853b9",
  },
  8: {
    name: "Supporter",
    iconURL: "https://nertivia-cdn.ciach795.com/7246094052045623296/7250138445484396544/Supporter%20-%20Badge.png",
    color: "#dd2e44",
  },
  16: {
    name: "Idea Queen",
    iconURL: process.env.VUE_APP_TWEMOJI_LOCATION + "/1f4a0.png",
    color: "#78d4ff",
  },
  32: {
    name: "Bug Catcher",
    iconURL: "https://nertivia-cdn.ciach795.com/7246094052045623296/7250137839998865408/Bug%20Hunter%20Badge.png",
    color: "#e234eb",
  },
  64: {
    name: "Translator",
    iconURL: "https://nertivia-cdn.ciach795.com/7246094052045623296/7250138323539202048/Translator%20-%20Badge.png",
    color: "#1fffb4",
  },
  128: {
    name: "Contributor",
    iconURL: process.env.VUE_APP_TWEMOJI_LOCATION + "/1f5a5.png",
    color: "#cf24ff",
  },
   256: {
    name: "Employees",
    iconURL: "https://nertivia-cdn.ciach795.com/7234162370073858048/7250253054568566784/bnr.png",
    color: "#2596be",
  },
  512: {
    name: "Old User",
    iconURL: "https://nertivia-cdn.ciach795.com/7246094052045623296/7250138069146275840/Old%20User%20-%20Badge.png",
    color: "#E30B5C",
  },
};

export function highPriorityBadge(flags: number) {
  const key = Object.keys(badges).find((key) =>
    bitwiseContains(flags, parseInt(key))
  );
  if (!key) return null;
  return badges[key];
}
export function getBadges(flags: number) {
  const badgesArr: Badge[] = [];
  const keysArr = Object.keys(badges);
  for (let i = 0; i < keysArr.length; i++) {
    const flag = parseInt(keysArr[i]);
    if (!bitwiseContains(flags, flag)) continue;
    badgesArr.push(badges[flag]);
  }
  return badgesArr;
}
