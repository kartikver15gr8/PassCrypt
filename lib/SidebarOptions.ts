import { RAW_ICONS } from "./icons";

const icons = RAW_ICONS;

export const sidebar_options = [
  {
    routePath: "/user/allitems",
    icon: icons.Stack,
    optName: "All Items",
  },
  {
    routePath: "/user/favorites",
    icon: icons.Favorites,
    optName: "Favorites",
  },
  {
    routePath: "",
    icon: icons.Trash,
    optName: "Trash",
  },
  {
    routePath: "/user/passwords",
    icon: icons.Lock,
    optName: "Logins",
  },
  {
    routePath: "/user/payments",
    icon: icons.Card,
    optName: "Payments",
  },
  {
    routePath: "/user/securenote",
    icon: icons.Folder,
    optName: "Secure Notes",
  },
  {
    routePath: "",
    icon: icons.Identity,
    optName: "Identity",
  },
];
