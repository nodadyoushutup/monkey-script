// ==UserScript==
// @name         PTP To Radarr
// @version      1.2
// @author       DirtyCajunRice
// @namespace    DirtyCajunRice
// @description  Easily add movies to Radarr straight from PTP
// @homepage     https://passthepopcorn.me/forums.php?action=viewthread&threadid=35294
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACTFBMVEUAAAD//////////////vu1t7j/zFCGiYz////+/v4xNjs7QEUpLjP////7+/smKzBHS09VWV1obG/////////////Z2tv/////////////////////yUdQVFg/Q0imqKp2enz19va2t7n///+XmZyTlZj/4JOOkJOEh4n/8tTY2trV1tf/9+L////r7Oz///////84PEEuMjdLT1RCRkv/zlmMj5FaXWGVl5plaGzq6+yYmpx0d3rU1dZ8f4L8/f3v7/C+wMG6u72bnaD/5qmgo6WsrrD/67mxs7XOz9H//PT///////////////////////////////////////////////82Oj//xDX/xj3/zE2JjI9SVlr/0mVdYWV4e3//1nLn5+jg4eKGiYttcHSAg4b/2XzMzc+wsrTGx8ijpqj/5KCdn6H/7cC9vsC6vL2+wMH////Q0dL/8c3k5eX/+evp6en19fXy8vL9/f3////l5ubz8/T///////////////////////////////////////////////////9YXGD/z1r/13b////c3d7HyMmqrK7s7O2Ii43/24X4+Pjy8/Opq63/7sT4+PjExcf9/f3R0tP/89bf4OHl5ubl5ebk5ebj4+Tt7u7/////////////////////////////////////////////////////wjAkKS4XHCEaHyT/wCkiJywYHiMfJSobICYhJiv/vyQeIygcIicVGh//wSz/vyctMTYSGB0KDxUSFx1vUO58AAAAsHRSTlMA5eTH5u77+uPx/fz+8uX++/r31Xkg9drSOhIJ/Pv79vb19fPz8/Pz8+vq6uno57yj/f38+/r5+fj49/f39vb19fT09PDw7+7u6+bOybimlHFgWCkeGAb+/v38+vn4+Pf39vb29vX19PTz8/Hw7e3t7Ovr6+jn5+bm5d3Y18G0sZuPi4J9ZF5EDwz5+fb19fX19PT08/Pv7ezs6+vq6ejo6Ojn3suvl5GHbFRQSjECARZmqHoAAAO5SURBVEjHjZXle9NQFMbblEFSN9Yic0UmbGMbc2FjbsBwd3d3d3d3t+ZG2yTrgH+MJPfmCQ8k3c6Hfjq/5n3Pvee9Fq0uDZw8Fg509XwabxlVDdhcqzObq2/W1h8OThy5/WKxq7HCSQHAMt7mjM7+wRH6J3Y3+HkqSsrF8KBso6voQsL+H8UZKRJDaiVSFbW7ihNZ6XfVSXJjlKV4llO+Qnlurwr1TTQVFM5kGfmPneltO/IcIKqwoKT6bvj8d2PgK+Gj5H7HbhzD8MJ8j0KTHChtdJ2YYAicTiYZMuqcilnlwrBpyzlescILa5OtH42snEgDJMnW4HI7RB6lANUK66lreBOc9B9gW6IArZjarCLurXZkxbGZsH35DxgnA1SS0jtlukpY8Zfp0IoALm8giueaAWMWR3I7cGTFz4uKFYqblYy9H28CjI3FFs/BkPskB7LizM4I9A8aA3SEpldOQcjBPDuAIy7bSHRfMAEikVhk/T70kf01UQreFt8GImgGRIZii7aMQUh7BRDU2xLNyzptDEBk5h6k61CLg+XUEWdnnTMCUMWHlk3B4UEeaHYqVhiQdnieKaBaye1AyFS/IH9EsFedMQOQrsmzNStJw/KhSJWdZgAqOnblAbSCt5dwJJ8SMAc0K/TK6ZBopUhuxlFzQLeycDaU5eOjw0dGAcTjufATbdRoAFo5EDQqUliQUJI+JwjsLWFLzU0j+bkdaKwKMPyzPJwIiNNXpyM1r/OeyZI4z+pec4Cmx2qL4U5y/NqMYfd/VeJzjQAkfo52yNtLeQHk425H+rWg2eWLRe7sQ2qep4s8Q0rZeM6s+p5BLTUkHVDFL3uKLsTBHHXnGOHJi0yiVwscWyarA8oqbEPira2pcKt/risgwuf1FX3oBRoQ/2vZdvsoUV02cQ1RcGa+RQcet8+QfrcpwOSh9dooX+V7KEZZZzGlseAdClkEbMIK81O3K43btMA4kDMMs09KbXIdg+06UD4Nxw65oQ74u8OrRdKahlDfv+l6vNKPWWGh0FvL81roWXvnWf6tD7UgG9f7C1eQMFbZpZuInm8Gcf+Z8EpbMQymt7tlBgpue0t914DFqOaH0iRq+c5Ct9W9f6ePFaD4ulWhs2avXF+WH/CC3bvUaxfg48P7kwtOQfFGNam7ygEYTuRFDr4JZU2uIjhKkxpvu+5jRfhSc2BBzr235/RRGtsoykpLFQBgAWVfdws/e9EyUl0KhjJuVK+oKW+q2nVSf6ESygoe7woEOotOTUjc9weXiUPgDnteIQAAAABJRU5ErkJggg==
// @supportURL   https://passthepopcorn.me/forums.php?action=viewthread&threadid=35294
// @match        https://passthepopcorn.me/*
// @require      https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@43fd0fe4de1166f343883511e53546e87840aeaf/gm_config.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @copyright    2019, dirtycajunrice (https://openuserjs.org//users/dirtycajunrice)
// @license      MIT
// @grant        GM.xmlHttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.openInTab
// @grant        GM.notification
// @grant        GM.registerMenuCommand
// ==/UserScript==

/*=========================  Version History  ==================================

Changelog 1.2   - Changed GM_config to older version. [Latest GM_config breaks things]

Changelog 1.1   - Add more error checks @catsouce.
                  Icons updated and converted to internal data by @catsouce.

Changelog 1.0   - Ported full 'Radarr v4' changes from IMDb Scout Mod by @catsouce.

Changelog 0.92  - Add extra check for wrong API key @hulkhorgen.

Changelog 0.91  - Support for Radarr v4 by @hulkhorgen.

Changelog 0.9   - Support for Radarr dev v3.1.0.4893 by @catsouce.

Changelog 0.8.9 - Debugging code cleanup by @catsouce.

Changelog 0.8.8 - Fix for non Chrome browsers. Updated to Greasemonkey v4 API by @catsouce.

Changelog 0.8.7 - Change of url for newer Radarr (openInTab) by @varovas.

Changelog 0.8.6 - Fix by @catsouce.

Changelog 0.8.5 - Fix by @bw.

Changelog 0.8.4 - Fixed href bug for covers
                  Fixed update logic

Changelog 0.8.3 - Major internal code refactor
                  Found lingering URL sanitization missed

Changelog 0.8.2 - Fixed autoupdate trying to update non-existant buttons

Changelog 0.8.1 - Fixed "Huge view" themeChecker for Raise
                  Fixed "Huge view" in collections
                  Added AutoUpdate for "Huge view"

Changelog 0.8.0 - Added "Huge view"

Changelog 0.7.1 - Fixed bug with GM_config iframe document access logic
                  Fixed bug with themeChecker

Changelog 0.7.0 - Added AutoSync to settings
                  Update buttons after a sync (manual and auto)

Changelog 0.6.1 - Added Stylesheet checking to fix cover buttons.
                  Confirmed working on all official and supported custom stylesheets + Raise

Changelog 0.6.0 - Added error checking to help debug issues
                  Added Radarr URL sanitization

*/

GM_config.init({
    "id": "PTPToRadarr",
    "title": "PTP To Radarr Settings",
    "css": `#PTPToRadarr {background: #333333;}
            #PTPToRadarr .field_label {color: #fff;}
            #PTPToRadarr .config_header {color: #fff; padding-bottom: 10px;}
            #PTPToRadarr .reset {color: #f00; text-align: center;}
            #PTPToRadarr .config_var {text-align: center;}
            #PTPToRadarr_radarr_syncbutton_var {float: left;}
            #PTPToRadarr .reset_holder {text-align: center;}
            #PTPToRadarr_radarr_minimumavailability_var {padding-right: 95;}
            #PTPToRadarr_radarr_apikey_var {padding-left: 49;}
            #PTPToRadarr_radarr_url_var {padding-left: 69;}
            #PTPToRadarr .saveclose_buttons {margin: 16px 10px 10px; padding: 2px 12px; background-color: #e7e7e7; color: black; text-decoration: none; border: none; border-radius: 6px;}
            #PTPToRadarr_field_radarr_syncbutton {background-color: #e7e7e7; color: black; text-decoration: none; border: none; border-radius: 6px; margin-left: 10px; margin-top: 16px; height: 20px;}`,
    "events": {
        "open": function(doc) {
            let style = this.frame.style;
            style.width = "400px";
            style.height = "300px";
            style.inset = "";
            style.top = "1%";
            style.right = "5%";
            doc.getElementById("PTPToRadarr_buttons_holder").prepend(doc.getElementById("PTPToRadarr_radarr_syncbutton_var"));
        }
    },
    "fields": {
        "radarr_url": {
            "label": "Radarr URL",
            "type": "text",
            "default": "https://domain.tld/radarr"
        },
        "radarr_apikey": {
            "label": "Radarr API Key",
            "type": "text",
            "default": ""
        },
        "radarr_profileid": {
            "label": "Radarr Quality Profile ID",
            "type": "text",
            "default": "1"
        },
        "radarr_rootfolderpath": {
            "label": "Radarr Root Folder Path",
            "type": "text",
            "default": "/mnt/movies"
        },
        "radarr_minimumavailability":
        {
            "label": "Minimum Availability",
            "type": "select",
            "options": ["announced", "inCinemas", "released"],
            "default": "released"
        },
        "radarr_searchformovie": {
            "label": "Search for movie on request",
            "type": "checkbox",
            "default": false
        },
        "radarr_sync_interval":
        {
            "label": "AutoSync Interval (Minutes)",
            "type": "select",
            "options": ["15", "30", "60", "120", "360", "1440", "Never"],
            "default": "Never"
        },
        "radarr_syncbutton": {
            "label": "Sync Radarr Movies",
            "type": "button",
            "click": get_radarr_movies
        }
    }
});

GM.registerMenuCommand("PTP To Radarr Settings",() => GM_config.open());

let url = window.location.href;
let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");

var current_page_type = "";
if (document.getElementById("torrent-table")) {
    current_page_type = "singletorrent";
}
else {
    current_page_type = "multi";
}
if (current_page_type) {
    set_html(false);
}

let interval = GM_config.get("radarr_sync_interval");
if (interval != "Never") {
    let millisecondInterval = Number(interval) * 60000;
    window.setTimeout(() => autoSync(millisecondInterval));
    window.setInterval(() => autoSync(millisecondInterval), millisecondInterval);
}

function themeChecker () {
    let typeAThemes = ["marcel.css", "ptp-raise"];
    let isThemeA = false;
    typeAThemes.forEach((theme) => {
        if (document.head.querySelector("[href*=\"" + theme + "\"]")) {
            isThemeA = true;
        }
    });

    // Add "position: relative" to specific elements if it's a Type A theme
    if (isThemeA) {
        const coverMovies = document.querySelectorAll(".cover-movie-list__movie, .huge-movie-list__movie");
        coverMovies.forEach(movie => {
            movie.style.position = 'relative';
        });
    }

    return isThemeA;
}

function clickswap (imdbid, titleSlug) {
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let button = document.getElementById("ptptoradarr-" + imdbid)
    button.firstChild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACTFBMVEUAAAD//////////////vu1t7j/zFCGiYz////+/v4xNjs7QEUpLjP////7+/smKzBHS09VWV1obG/////////////Z2tv/////////////////////yUdQVFg/Q0imqKp2enz19va2t7n///+XmZyTlZj/4JOOkJOEh4n/8tTY2trV1tf/9+L////r7Oz///////84PEEuMjdLT1RCRkv/zlmMj5FaXWGVl5plaGzq6+yYmpx0d3rU1dZ8f4L8/f3v7/C+wMG6u72bnaD/5qmgo6WsrrD/67mxs7XOz9H//PT///////////////////////////////////////////////82Oj//xDX/xj3/zE2JjI9SVlr/0mVdYWV4e3//1nLn5+jg4eKGiYttcHSAg4b/2XzMzc+wsrTGx8ijpqj/5KCdn6H/7cC9vsC6vL2+wMH////Q0dL/8c3k5eX/+evp6en19fXy8vL9/f3////l5ubz8/T///////////////////////////////////////////////////9YXGD/z1r/13b////c3d7HyMmqrK7s7O2Ii43/24X4+Pjy8/Opq63/7sT4+PjExcf9/f3R0tP/89bf4OHl5ubl5ebk5ebj4+Tt7u7/////////////////////////////////////////////////////wjAkKS4XHCEaHyT/wCkiJywYHiMfJSobICYhJiv/vyQeIygcIicVGh//wSz/vyctMTYSGB0KDxUSFx1vUO58AAAAsHRSTlMA5eTH5u77+uPx/fz+8uX++/r31Xkg9drSOhIJ/Pv79vb19fPz8/Pz8+vq6uno57yj/f38+/r5+fj49/f39vb19fT09PDw7+7u6+bOybimlHFgWCkeGAb+/v38+vn4+Pf39vb29vX19PTz8/Hw7e3t7Ovr6+jn5+bm5d3Y18G0sZuPi4J9ZF5EDwz5+fb19fX19PT08/Pv7ezs6+vq6ejo6Ojn3suvl5GHbFRQSjECARZmqHoAAAO5SURBVEjHjZXle9NQFMbblEFSN9Yic0UmbGMbc2FjbsBwd3d3d3d3t+ZG2yTrgH+MJPfmCQ8k3c6Hfjq/5n3Pvee9Fq0uDZw8Fg509XwabxlVDdhcqzObq2/W1h8OThy5/WKxq7HCSQHAMt7mjM7+wRH6J3Y3+HkqSsrF8KBso6voQsL+H8UZKRJDaiVSFbW7ihNZ6XfVSXJjlKV4llO+Qnlurwr1TTQVFM5kGfmPneltO/IcIKqwoKT6bvj8d2PgK+Gj5H7HbhzD8MJ8j0KTHChtdJ2YYAicTiYZMuqcilnlwrBpyzlescILa5OtH42snEgDJMnW4HI7RB6lANUK66lreBOc9B9gW6IArZjarCLurXZkxbGZsH35DxgnA1SS0jtlukpY8Zfp0IoALm8giueaAWMWR3I7cGTFz4uKFYqblYy9H28CjI3FFs/BkPskB7LizM4I9A8aA3SEpldOQcjBPDuAIy7bSHRfMAEikVhk/T70kf01UQreFt8GImgGRIZii7aMQUh7BRDU2xLNyzptDEBk5h6k61CLg+XUEWdnnTMCUMWHlk3B4UEeaHYqVhiQdnieKaBaye1AyFS/IH9EsFedMQOQrsmzNStJw/KhSJWdZgAqOnblAbSCt5dwJJ8SMAc0K/TK6ZBopUhuxlFzQLeycDaU5eOjw0dGAcTjufATbdRoAFo5EDQqUliQUJI+JwjsLWFLzU0j+bkdaKwKMPyzPJwIiNNXpyM1r/OeyZI4z+pec4Cmx2qL4U5y/NqMYfd/VeJzjQAkfo52yNtLeQHk425H+rWg2eWLRe7sQ2qep4s8Q0rZeM6s+p5BLTUkHVDFL3uKLsTBHHXnGOHJi0yiVwscWyarA8oqbEPira2pcKt/risgwuf1FX3oBRoQ/2vZdvsoUV02cQ1RcGa+RQcet8+QfrcpwOSh9dooX+V7KEZZZzGlseAdClkEbMIK81O3K43btMA4kDMMs09KbXIdg+06UD4Nxw65oQ74u8OrRdKahlDfv+l6vNKPWWGh0FvL81roWXvnWf6tD7UgG9f7C1eQMFbZpZuInm8Gcf+Z8EpbMQymt7tlBgpue0t914DFqOaH0iRq+c5Ct9W9f6ePFaD4ulWhs2avXF+WH/CC3bvUaxfg48P7kwtOQfFGNam7ygEYTuRFDr4JZU2uIjhKkxpvu+5jRfhSc2BBzr235/RRGtsoykpLFQBgAWVfdws/e9EyUl0KhjJuVK+oKW+q2nVSf6ESygoe7woEOotOTUjc9weXiUPgDnteIQAAAABJRU5ErkJggg==";
    button.removeEventListener("click", new_movie_lookup, false);
    button.addEventListener("click", function () {
        GM.openInTab(radarr_url.concat("/movie/", titleSlug), "active");
    }, false);
}

function set_html (update) {
    let theme = themeChecker();
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let coverView = document.querySelector(".cover-movie-list__container:not(.hidden)");
    let coverViewMovies = Array.from(document.getElementsByClassName("cover-movie-list__movie__rating-and-tags"));
    let listView = document.querySelector(".basic-movie-list");
    let listViewMovies = Array.from(document.getElementsByClassName("basic-movie-list__movie__ratings-and-tags"));
    let hugeView = document.querySelector(".huge-movie-list__movie");
    let hugeViewMovies = Array.from(document.getElementsByClassName("huge-movie-list__movie__ratings"));
    if (update) {
        let buttons = document.querySelectorAll("[id^=\"ptptoradarr-tt\"]");
        if (buttons.length === 0) {
            return;
        }
        buttons.forEach((button) => {
            window.setTimeout(function () {
                button.parentNode.removeChild(button);
            });
        });
    }
    if (current_page_type == "singletorrent") {
        let a = document.querySelector("[href*=\"://www.imdb.com/title/tt\"]");;
        let movie = document.querySelector(".panel__body");
        if (a) {
            buttonBuilder(movie, a.href, "single", theme);
        }
    }
    else if (current_page_type == "multi") {
        if (coverView && !coverView.classList.contains("hidden")) {
            coverViewMovies.forEach((movie) => {
                window.setTimeout(() => {
                    let a = movie.querySelector("[href*=\"://www.imdb.com/title/tt\"]");
                    if (a) {
                        buttonBuilder(movie, a.href, "medium", theme);
                    }
                });
            });
        }
        else if (listView && !listView.classList.contains("hidden")) {
            listViewMovies.forEach((movie) => {
                window.setTimeout(() => {
                    let a = movie.querySelector("[href*=\"://www.imdb.com/title/tt\"]");
                    if (a) {
                        buttonBuilder(movie, a.href, "small", theme);
                    }
                });
            });
        }
        else if (hugeView) {
            hugeViewMovies.forEach((movie) => {
                window.setTimeout(() => {
                    let a = movie.querySelector("[href*=\"://www.imdb.com/title/tt\"]");
                    if (a) {
                        buttonBuilder(movie, a.href, "large", theme);
                    }
                });
            });
        }
    }
}

async function buttonBuilder (movie, href, type, theme) {
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let imdbid = href.match(/tt\d+/)[0];
    let exists = await check_exists(imdbid);
    let button = document.createElement("button");
    let img = document.createElement("img");
    button.id = "ptptoradarr-" + imdbid;
    button.type = type;
    Object.assign(button.style, {border: "none", backgroundColor: "transparent"});
    Object.assign(img.style, {border: "none", backgroundColor: "transparent"});
    Object.assign(img, {height: 32, width: 32});
    button.appendChild(img);
    img.imdbid = imdbid;
    if (type == "single") {
        Object.assign(button.style, {position: "absolute", top: "5%", zIndex: 10});
        movie.style.position = "relative";
        console.log(movie)
        movie.prepend(button);
    }
    else if (type == "small") {
        Object.assign(img, {height: 16, width: 16});
        movie.appendChild(button);
    }
    else if (type == "medium") {
        let posterContainer = movie.closest(".cover-movie-list__movie");
        posterContainer.prepend(button);
        Object.assign(button.style, {position: "absolute", top: "0", zIndex: 10});
        if (theme) {
            posterContainer.style.position = "relative";
        }
    }
    else if (type == "large") {
        let posterContainer = movie.closest(".huge-movie-list__movie").firstChild;
        posterContainer.prepend(button);
        Object.assign(button.style, {position: "absolute", top: "0", zIndex: 10});
        if (theme) {
            button.style.left = "3%";
            posterContainer.style.position = "relative";
        }
    }
    if (exists) {
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZiwgMjAyMi8wOC8xNi0xODowMjo0MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0xMS0xMVQxNDo1NDoyMS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMTEtMTFUMTQ6NTQ6NDctMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMTEtMTFUMTQ6NTQ6NDctMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFhOGU3ZjViLTkzNDAtNDE0Yi05YWUyLWJjNDU0ZWY5MTZiOSIgeG1wTU06RG9jdW1lbnRJRD0i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";
        button.addEventListener("click", function () {
            GM.openInTab(radarr_url.concat("/movie/", exists[0].titleSlug), "active");
        }, false);
    }
    else {
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAACklpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAAEiJnVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/stRzjPAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAACuSURBVFiFY8xfK3GGYQAB00BaPuoABgYGBhZyNXZ53TVG5pdtUz5LjjkDHgKjDhh1wKgDiHYAer6nllqiHAAzkBiDSVFLtAOwWUCqHC7ASGx1TKrhxBbNRIcAKWU9KWpJigJiDCa1UiI5DeCzgJwaESMNIMc1PgNJqY7xmUl2QYRsELltAQYGChoklFoMA0OnKB62DsCbBsgpWkkFAx4CA+4AoisjWoEBD4FRBwAAW4JAQ90lrYsAAAAASUVORK5CYII=";
        $(button).click(function() {
           new_movie_lookup(imdbid);
        });
    }
}

function errorNotificationHandler (error, expected, errormsg) {
    let prestring = "PTPToRadar::";
    if (expected) {
        console.log(prestring + "Error: " + errormsg + " Actual Error: " + error);
        GM.notification("Error: " + errormsg);
    }
    else {
        console.log(prestring + "Unexpected Error: Please report this error in the forum. Actual Error: " + error);
        GM.notification("Unexpected Error: Please report this error in the forum. Actual Error: " + error);
    }
}

function get_radarr_movies() {
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let radarr_apikey = GM_config.get("radarr_apikey");
    GM.xmlHttpRequest({
        method: "GET",
        url: radarr_url.concat("/api/v3/movie"),
        headers: {
            "X-Api-Key": radarr_apikey,
            "Accept": "application/json"
        },
        onload: function(response) {
            if (response.status == 200) {
                const responseJSON = JSON.parse(response.responseText);
                GM.setValue("existing_movies", JSON.stringify(responseJSON));
                let timestamp = + new Date()
                GM.setValue("last_sync_timestamp", timestamp)
                console.log("PTPToRadarr::Sync: Setting last sync timestamp to " + timestamp)
                GM.notification("Radarr Sync Complete!", "PTP To Radarr");
                set_html(true);
            } else if (response.status == 401) {
                GM.notification("Error: Invalid Radarr API Key.", "PTP To Radarr");
            } else {
                GM.notification("Error: Status " + response.status, "PTP To Radarr");
            }
        },
        onerror: function() {
          GM.notification("Request Error.\nCheck Radarr URL!", "PTP To Radarr");
        },
        onabort: function() {
          GM.notification("Request is aborted.", "PTP To Radarr");
        }
    });
}

async function check_exists (imdbid) {
    let movieliststr = await GM.getValue("existing_movies", "{}");
    let movie_list = JSON.parse(movieliststr);
    let filter = null
    try {
        filter = movie_list.filter(movie => movie.imdbId == imdbid);
    }
    catch (e) {
        if (e instanceof TypeError) {
            return false
        }
        else {
            errorNotificationHandler(e, false)
            return false
        }
    }
    if (!filter.length) {
        return false
    }
    else {
        return filter
    };
}

async function autoSync (interval) {
    let currentTimestamp = + new Date();
    let lastSyncTimestamp = await GM.getValue("last_sync_timestamp", 0);
    if (currentTimestamp - lastSyncTimestamp >= interval) {
        let notification = "It has been " + ((currentTimestamp - lastSyncTimestamp) / 60000).toFixed(1) +
            " minutes since your last sync which exceeds your threshold of " +
            (interval / 60000) + " minutes. AutoSyncing...";
        console.log(notification);
        GM.notification(notification);
        get_radarr_movies();
    }
}

function new_movie_lookup (imdbid) {
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let radarr_apikey = GM_config.get("radarr_apikey");
    let movie = "";
    GM.xmlHttpRequest({
        method: "GET",
        url: radarr_url.concat("/api/v3/movie/lookup/imdb?imdbId=", imdbid),
        headers: {
            "X-Api-Key": radarr_apikey,
            "Accept": "application/json"
        },
        onload: function(response) {
            let responseJSON = null;
            if (!response.responseJSON) {
                if (response.status == 401) {
                    GM.notification("Error: Invalid Radarr API Key.", "PTP To Radarr");
                    return;
                } else if (!response.responseText) {
                    GM.notification("No results found.", "PTP To Radarr");
                    return;
                }
                responseJSON = JSON.parse(response.responseText);
                add_movie(responseJSON, imdbid);
            }
        },
        onerror: function() {
          GM.notification("Request Error.\nCheck Radarr URL!", "PTP To Radarr");
        },
        onabort: function() {
          GM.notification("Request is aborted.", "PTP To Radarr");
        }
    });
}

function add_movie (movie, imdbid) {
    let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
    let radarr_apikey = GM_config.get("radarr_apikey");
    movie.qualityProfileId = parseInt(GM_config.get("radarr_profileid"));
    movie.rootFolderPath = GM_config.get("radarr_rootfolderpath");
    movie.monitored = true;
    movie.minimumAvailability = GM_config.get("radarr_minimumavailability");
    if (GM_config.get("radarr_searchformovie")) {
        movie.addOptions = {searchForMovie: true};
    } else {
        movie.addOptions = {searchForMovie: false};
    }
    GM.xmlHttpRequest({
        method: "POST",
        url: radarr_url.concat("/api/v3/movie"),
        headers: {
            "X-Api-Key": radarr_apikey,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(movie),
        onload: function(response) {
            const responseJSON = JSON.parse(response.responseText);
            if (response.status == 201) {
                clickswap(imdbid, responseJSON.titleSlug);
                GM.notification(responseJSON.title + " Sucessfully sent to Radarr", "PTP To Radarr")
            } else {
                GM.notification("Error: " + responseJSON[0].errorMessage, "PTP To Radarr");
            }
        },
        onerror: function() {
          GM.notification("Request Error.\nCheck Radarr URL!", "PTP To Radarr");
        },
        onabort: function() {
          GM.notification("Request is aborted.", "PTP To Radarr");
        }
    });
}
