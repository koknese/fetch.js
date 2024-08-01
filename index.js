import { readFile } from 'fs' // for reading files
import { logos } from './logos.js' //ascii logos
import chalk from 'chalk'; // colors
import os from 'os';
import align from 'align-text';
import center from 'center-align';
import { exec } from "child_process";
import { uptime } from 'process';
/* My own os-release for convenience sake
NAME="Artix Linux"
PRETTY_NAME="Artix Linux"
ID=artix
BUILD_ID=rolling
ANSI_COLOR="0;36"
HOME_URL="https://www.artixlinux.org/"
DOCUMENTATION_URL="https://wiki.artixlinux.org/"
SUPPORT_URL="https://forum.artixlinux.org/"
BUG_REPORT_URL="https://bugs.artixlinux.org/"
PRIVACY_POLICY_URL="https://terms.artixlinux.org/docs/privacy-policy/"
LOGO=artixlinux-logo
*/


var lines;
readFile('/etc/os-release', 'utf8', (err, data) => { // reads os-release
    if (err) { // error handling
        console.error(err);
        return;
    }
    lines = data.match(/[^\r\n]+/g); // Divides every line of os-release into an array

    var distroID = extract(lines);
    var distroname = determining(lines);
    const hostname = os.hostname();
    const username = process.env.USER; // reads the username

    if (distroID in logos) {
        console.log(align(logos[distroID], 4));
    } else {console.log(logos.unknown);}
        console.log();
        console.log(center(align(chalk.red(username + "@" + hostname), 3)));
        console.log();
        console.log(center(align(`Distro: ${distroname}`, 2.99), 2.99));
    getDisplayServer((server) => {    // Checks for the server
        if (server == "x11"){
        console.log(center(align(`Server: Xorg`, 2.99), 2.99));
        } else if (server == "wayland"){
        console.log(center(align(`Server: Wayland`, 2.99), 2.99));
        } else if (server === "tty"){
        console.log(center(align(`Server: TTY`, 2.99), 2.99));
        } else {
        console.log(center(align(`Server: unk`, 2.99), 2.99));
        }
        getUptime((uptime) => {
        console.log(center(align(`Uptime: ${uptime}`, 2.99), 2.99))
        })
        getKernel((kernel) => {
        console.log(center(align(`Kernel: ${kernel}`, 2.99), 2.99))
        })
        
    })


});

function extract(lines) { // extracts the id of the distro from the line
    let calcLength = lines[2].length;
    let distroname = lines[2].slice(3, calcLength); // Removes the "ID=" part of the string
    return distroname;
}


function determining(lines) { // determines the distro name by extracting its pretty name
    let calcLengthName = lines[1].length;
    let prettyName = lines[1].slice(13, calcLengthName - 1);
    return prettyName;
}

function getDisplayServer(callback) {
    exec('echo $XDG_SESSION_TYPE', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            callback('unk');
            return;
        }
        const serverType = stdout.trim();
        callback(serverType);
    });
}

function getUptime(callback) { // gets uptime
    exec('uptime -p', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            callback('unk');
            return;
        }
        const uptimeLength = stdout.trim().length // calculates length of uptime -p to use for the slice method
        const uptime = stdout.trim().slice(3, uptimeLength);
        callback(uptime);
    });
}

function getKernel(callback) { // gets the kernel
    exec('uname -r', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            callback('unk');
            return;
        }
        const kernel = stdout.trim();
        callback(kernel);
    });
} // i'm sure youre starting to see a pattern here
