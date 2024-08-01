import chalk from 'chalk'; // colors

/* 
OS logos
Used // https://www.freeformatter.com/javascript-escape.html to paste ascii so it doesn't mess with JS
*/

const logos = {
    artix: chalk.blue("    \r\n      \/\\  \r\n     \/  \\\r\n    \/`\'.,\\\r\n   \/     \',\r\n  \/      ,`\\\r\n \/   ,.\'`.  \\\r\n\/.,\'`     `\'.\\"),
    unknown: "___\r\n          (.\u00B7 |\r\n          (<> |\r\n         \/ __  \\\r\n        ( \/  \\ \/|\r\n       _\/\\ __)\/_)\r\n       \\\/-____\\\/",
    arch: chalk.blue("\/\\\\\r\n\t\t\t\t           \/  \\\\\r\n\t\t\t\t          \/\\\\   \\\\\r\n\t\t\t\t         \/      \\\\\r\n\t\t\t\t        \/   ,,   \\\\\r\n\t\t\t\t       \/   |  |  -\\\\\r\n\t\t\t\t      \/_-\'\'    \'\'-_\\\\"),
};

export { logos }; // Exports the logos variable
