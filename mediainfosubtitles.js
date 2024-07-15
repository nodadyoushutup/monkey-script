// ==UserScript==
// @namespace    https://openuserjs.org/users/SB100
// @name         PTP Subtitle Tags in BDInfo and MediaInfo boxes
// @description  Adds subtitle information ot BDInfo and MediaInfo boxes when browsing torrent descriptions
// @updateURL    https://openuserjs.org/meta/SB100/PTP_Subtitle_Tags_in_BDInfo_and_MediaInfo_boxes.meta.js
// @version      1.4.4
// @author       SB100
// @copyright    2021, SB100 (https://openuserjs.org/users/SB100)
// @license      MIT
// @match        https://passthepopcorn.me/torrents.php*id=*
// @match        https://passthepopcorn.me/forums.php?*action=viewthread*threadid=*
// @match        https://passthepopcorn.me/upload.php*
// ==/UserScript==

// ==OpenUserJS==
// @author SB100
// ==/OpenUserJS==

/**
 * =============================
 * ADVANCED OPTIONS
 * =============================
 */

// true = order the list alphabetically (appears with languages ordered); false = order by audio channel number (appears with numbers ordered)
const SETTING_ORDER_ALPHABETICAL = true;

// whether to remove forced subtitles from showing up in the box
const SETTING_REMOVE_FORCED = false;

// whether to treat forced subtitles as separate from non forced, when they're the same langauge. Only does something if you're not removing forced subtitles
const SETTING_TREAT_FORCED_SEPARATE = false;

// whether or not to show the [F] next to forced subtitles. Only does something if you're not removing forced subtitles
const SETTING_SHOW_FORCED_FLAG = true;

// whether or not to show the [I] next to subtitles that have more info available. Useful for seeing commentary tracks etc.
const SETTING_REMOVE_INFO = false;

// how bright to set duplicate subtitle langauges to. 70% is the default. 100% to disable any brightness changes
const SETTING_DUPLICATE_BRIGHTNESS = '70%';

// Limit the height of the subtitle list, making it a scrollable list
const SETTING_FADE_LONG_LIST = true;

/**
 * =============================
 * END ADVANCED OPTIONS
 * DO NOT MODIFY BELOW THIS LINE
 * =============================
 */

/**
 * Extract subtitle information from some text and turn into an object
 * Method 1 for MediaInfo blocks
 * Test against: https://passthepopcorn.me/forums.php?action=viewthread&threadid=36783&postid=1724914#post1724914
 */
function extract1(text) {
  const textGroups = text.match(/(?:Text).+?(?=^\s?$)/imgs);
  if (!textGroups) {
    return null;
  }

  return textGroups
    .map((group, index) => {
      const idMatch = group.match(/Text #([\d]+)/i);
      const languageMatch = group.match(/Language[\s]*?:[\s]*?([\w]+)/i);
      const forcedMatch = group.match(/Forced[\s]*?:[\s]*?([\w]+)/i);
      const titleMatch = group.match(/Title[\s]*?:[\s]*?([^\r\n]+)/i);

      if (!languageMatch) {
        return null;
      }

      const shouldIncludeTitle =
        titleMatch &&
        titleMatch[1]
        .trim()
        .toLowerCase()
        .startsWith(languageMatch[1].toLowerCase()) === false;
      const title = shouldIncludeTitle ?
        titleMatch[1].trim().replace(/\[(?:Forced|Full)\]$/i, '') :
        null;

      return {
        id: idMatch ? idMatch[1] : index + 1,
        language: languageMatch[1],
        forced: !!(forcedMatch && forcedMatch[1].toLowerCase() === 'yes'),
        title,
      };
    })
    .filter((g) => g !== null);
}

/**
 * Extract subtitle information from some text and turn into an object
 * Method 2 for BDInfo blocks
 * Test against: https://passthepopcorn.me/forums.php?action=viewthread&threadid=36783&postid=1834414#post1834414
 */
function extract2(text) {
  const subtitleInfo = text.match(/(?:SUBTITLES:\n).+?(?=^$)/imgs);
  if (!subtitleInfo) {
    return null;
  }

  const languages = [...subtitleInfo[0].matchAll(/Graphics[\s]+?([\w]+)\s/gi)];
  return languages.map((language, index) => ({
    id: index + 1,
    language: language[1],
    forced: false,
    title: null,
  }));
}

/**
 * Extract subtitle information from some text and turn into an object
 * Method 3 for BDInfo blocks
 * Test against: https://passthepopcorn.me/forums.php?action=viewthread&threadid=39079&postid=1887208#post1887208
 */
function extract3(text) {
  const subtitleInfo = [...text.matchAll(/Subtitle:[\s]+?([^\s]+)/gi)];
  if (!subtitleInfo) {
    return null;
  }

  return subtitleInfo.map((info, index) => ({
    id: index + 1,
    language: info[1],
    forced: false,
    title: null,
  }));
}

/**
 * Extract subtitle information from the mediainfo blockquote and turn into an object
 */
function extractSubtitles(mediaInfoElem) {
  const blockquote = mediaInfoElem.nextElementSibling;
  const blockquoteText = `${blockquote.innerText}\r\n`;

  const textGroups =
    extract1(blockquoteText) ||
    extract2(blockquoteText) ||
    extract3(blockquoteText);
  if (!textGroups) {
    return null;
  }

  if (SETTING_ORDER_ALPHABETICAL) {
    textGroups.sort((a, b) => {
      if (a.language > b.language) return 1;
      if (b.language > a.language) return -1;
      return 0;
    });
  }
  else {
    textGroups.sort((a, b) => a.id - b.id);
  }

  if (SETTING_REMOVE_FORCED) {
    return textGroups.filter((group) => group.forced === false);
  }

  return textGroups;
}

/**
 * Builds the text that goes into the title attribute tag when you hover over a row
 */
function buildTitleAttr(isForced, hasTitle, title) {
  if (isForced && hasTitle) {
    return `Forced; ${title}`;
  }

  if (isForced) {
    return 'Forced';
  }

  if (hasTitle) {
    return title;
  }

  return null;
}

/**
 * Create the subtitle column
 */
function createSubtitleTable(texts) {
  const seen = new Set();

  const rows = texts
    .map((text) => {
      const key = SETTING_TREAT_FORCED_SEPARATE ?
        `${text.language}::${text.forced}` :
        text.language;
      const color = seen.has(key) ? SETTING_DUPLICATE_BRIGHTNESS : '100%';
      seen.add(key);

      const isForced = text.forced && SETTING_SHOW_FORCED_FLAG;
      const hasTitle =
        text.title && text.title.length > 0 && SETTING_REMOVE_INFO === false;
      const title = buildTitleAttr(isForced, hasTitle, text.title);

      const flags = [];
      if (isForced) flags.push('F');
      if (hasTitle) flags.push('I');

      return `<tr ${title ? `title="${title}"` : ''}>
  <td><span style='filter: brightness(${color});'>#${text.id}:</span></td>
  <td><span style='filter: brightness(${color}); white-space: nowrap;'>${
        text.language
      } <span style="font-size:.8em;">${
        flags.length > 0 ? `[${flags.join('|')}]` : ''
      }</span></td>
</tr>`;
    })
    .join('');

  // header
  const div = document.createElement('div');
  div.innerHTML = `<div class="mediainfo__section__caption">Subtitles</div>`;

  // main content
  const table = document.createElement('table');
  table.classList.add('mediainfo__section');
  table.innerHTML = `<tbody>${rows}</tbody>`;

  // scroll and fade
  const maxHeightContainer = document.createElement('div');
  maxHeightContainer.classList.add('mediainfo__section__subtitles');
  maxHeightContainer.appendChild(table);

  // based on setting, apply scroll and fade
  div.appendChild(SETTING_FADE_LONG_LIST ? maxHeightContainer : table);

  return div;
}

/**
 * Sets the height of the new column to match the tallest existing column
 */
function setHeight(mediaInfoBox) {
  const subtitleInfo = mediaInfoBox.querySelector(
    '.mediainfo__section__subtitles'
  );
  if (!subtitleInfo || !SETTING_FADE_LONG_LIST) {
    return;
  }

  // first set to 0 so we don't affect the calculations underneath
  // really, this sets the height to the min-height value in the css
  subtitleInfo.style.height = 0;

  // loop through other boxes and find the largest height, without the column we just added
  const maxHeight = Array.from(
      mediaInfoBox.querySelectorAll('.mediainfo__section tbody')
    )
    .slice(0, -1)
    .reduce((result, body) => {
      const mediaStyle = window.getComputedStyle(body);
      const height = parseInt(mediaStyle.height, 10);

      return height > result ? height : result;
    }, 0);

  // set to the largest height
  subtitleInfo.style.height = `${maxHeight}px`;
}

/**
 * Find subtitle information and add it as a column to the first bd/mediainfo block we find
 */
function moveSubToInfoBox(mediaInfoBox) {
  if (mediaInfoBox.classList.contains('mediainfo--with-subtitles')) {
    return;
  }

  // find subtitles from the mediainfo box
  const texts = extractSubtitles(mediaInfoBox);
  if (!texts || texts.length === 0) {
    return;
  }

  // create the new subtitle info table
  const subtitleTable = createSubtitleTable(texts);

  // create the new column
  const td = document.createElement('td');
  td.appendChild(subtitleTable);

  // add new table to mediainfo
  mediaInfoBox.querySelector('tbody tr').appendChild(td);
  mediaInfoBox.classList.add('mediainfo--with-subtitles');

  // set the height of the box to match the largest column
  setHeight(mediaInfoBox);
}

/**
 * All the custom styling that powers the mediainfo subtitles box
 */
function createStyleTag() {
  const css = `
.mediainfo__section__subtitles {
  display: block;
  max-height: 230px;
  min-height: 100px;
  padding-bottom: 15px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
}

.mediainfo__section__subtitles:hover {
  overflow-y: scroll;
}

.mediainfo__section td + td {
  padding-left: 3px;
}`;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
}

(function main() {
  // check we have observers available to us
  if (!MutationObserver) return;

  // create our css styles
  createStyleTag();

  // observer config - only interested in tree modifications
  const config = {
    childList: true,
    subtree: true
  };

  // Check modified nodes and run the subtitle function if we find a valid match
  const callback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      Array.from(mutation.target.querySelectorAll('.mediainfo')).forEach(
        (mediaInfoBox) => moveSubToInfoBox(mediaInfoBox)
      );
    });
  };

  // create an observer instance with the callback
  const observer = new MutationObserver(callback);

  // Start observing the target node for mutations
  observer.observe(document, config);

  // and run for anything that was already on the page
  Array.from(document.querySelectorAll('.mediainfo')).forEach((mediaInfo) =>
    moveSubToInfoBox(mediaInfo)
  );
})();
