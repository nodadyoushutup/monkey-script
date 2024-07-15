// ==UserScript==
// @name        PTP Torrent Checker
// @author      Voltaire w/ Updates by Korrug, Blackstrap & Chameleon
// @description Assist with checking torrents
// @namespace   PTPTorrentChecker
// @include     https://passthepopcorn.me/torrents.php?id=*
// @version     4.3106 (Beta)
// @downloadURL https://gitlab.com/Blackstrap/PTP/raw/beta/torrentChecker.user.js
// @updateURL   https://gitlab.com/Blackstrap/PTP/raw/beta/torrentChecker.user.js
// @grant       none
// ==/UserScript==

var version = "4.3106";

var torrent_info_rows = document.getElementsByClassName("torrent_info_row");

function setupErrorLog(group)
{
  let showRedundantError=getRedundantError();

  //for (var i = 0; i < torrent_info_rows.length; i++) {
  var t = group[0];//torrent_info_rows[i];

  var before = t.getElementsByClassName("movie-page__torrent__panel");
  before=before[before.length-2];
  var div = document.createElement("div");
  before.parentNode.insertBefore(div, before);
  div.setAttribute("class", "movie-page__torrent__panel");

  var title = document.createElement("div");
  title.setAttribute("style", "text-align:center");
  div.appendChild(title);
  title.innerHTML = "Torrent Checker Automated Tests";

  var logDiv = document.createElement("div");
  //logDiv.style.display = "none";
  logDiv.setAttribute("class", "torrentCheckerLog");
  logDiv.innerHTML = '<div class="errorTally" style="text-align:center;"></div>';
  div.appendChild(logDiv);

  var redundantErrorToggleBtn = document.createElement('a');
  redundantErrorToggleBtn.setAttribute('class', 'btn-display_log');
  redundantErrorToggleBtn.href='javascript:void(0);';
  redundantErrorToggleBtn.innerHTML='Redundant error area: <span class="torrentCheckerRedundantError">'+(showRedundantError?'On':'Off')+'</span>';
  title.appendChild(document.createElement('br'));
  title.appendChild(redundantErrorToggleBtn);
  redundantErrorToggleBtn.addEventListener('click', toggleRedundantError.bind(undefined, redundantErrorToggleBtn));

  var verbosityToggleBtn = document.createElement('a');
  verbosityToggleBtn.setAttribute('class', 'btn-display_log');
  verbosityToggleBtn.href='javascript:void(0);';
  verbosityToggleBtn.innerHTML='Log Verbosity: <span>'+getLogVerbosity()+'</span>';
  title.appendChild(document.createElement('br'));
  title.appendChild(verbosityToggleBtn);
  verbosityToggleBtn.addEventListener('click', toggleVerbosity.bind(undefined, logDiv, verbosityToggleBtn));
  /*
  var toggleDisplayLogBtn = document.createElement("a");
  toggleDisplayLogBtn.setAttribute("class", "btn-display_log");
  toggleDisplayLogBtn.style.display = "none";
  toggleDisplayLogBtn.href = "javascript:void(0);";
  toggleDisplayLogBtn.innerHTML = "<br />[ Show Results Log ]";
  title.appendChild(toggleDisplayLogBtn);
  toggleDisplayLogBtn.addEventListener("click", toggleDisplayLog.bind(null, t));
  */
  //}
}

main();

function toggleVerbosity(logDiv, verbosityToggleBtn)
{
  var span=verbosityToggleBtn.firstElementChild;
  switch(span.innerHTML)
  {
    case 'none':
      span.innerHTML='errors';
      break;
    case 'errors':
      span.innerHTML='errors and warnings';
      break;
    case 'errors and warnings':
      span.innerHTML='all';
      break;
    case 'all':
      span.innerHTML='none';
      break;
  }
  setLogVerbosity(span.innerHTML);
  adjustVerbosity(logDiv);
}
function adjustVerbosity(logDiv)
{
  var errors=logDiv.getElementsByClassName('error');
  var warnings=logDiv.getElementsByClassName('warning');
  var passes=logDiv.getElementsByClassName('pass');
  var level=getLogVerbosity();
  if(level=='none') {
    setVerbosityDisplay(errors, 'none');
    setVerbosityDisplay(warnings, 'none');
    setVerbosityDisplay(passes, 'none');
  } else if(level=='errors') {
    setVerbosityDisplay(errors, '');
    setVerbosityDisplay(warnings, 'none');
    setVerbosityDisplay(passes, 'none');
  } else if(level=='errors and warnings') {
    setVerbosityDisplay(errors, '');
    setVerbosityDisplay(warnings, '');
    setVerbosityDisplay(passes, 'none');
  } else if(level=='all') {
    setVerbosityDisplay(errors, '');
    setVerbosityDisplay(warnings, '');
    setVerbosityDisplay(passes, '');
  }

}
function setVerbosityDisplay(list, display)
{
  for(var i=0; i<list.length; i++)
  {
    list[i].style.display=display;
  }
}
function getLogVerbosity()
{
  return window.localStorage.torrentCheckerVerbosity?window.localStorage.torrentCheckerVerbosity:'none';
}
function setLogVerbosity(level)
{
  window.localStorage.torrentCheckerVerbosity=level;
}

function getRedundantError()
{
  return window.localStorage.torrentCheckerRedundantError?JSON.parse(window.localStorage.torrentCheckerRedundantError):true;
}
function toggleRedundantError(button)
{
  let redundantError=!getRedundantError();
  Array.from(document.querySelectorAll('.torrentCheckerRedundantError')).map(function(redundantError, span) { span.innerHTML=redundantError?'On':'Off'; }.bind(undefined, redundantError));
  //button.querySelector('span').innerHTML=redundantError?'On':'Off';
  window.localStorage.torrentCheckerRedundantError=redundantError;

  var torrent_info_rows = document.getElementsByClassName("torrent_info_row_results");
  for (var i = 0; i < torrent_info_rows.length; i++) {
    var t = torrent_info_rows[i];
    t.classList.toggle('hidden', !redundantError);
  }
}

function main() {
  // Handle the initially opened torrent if this is a torrent permalink.
  var searchParams = new URLSearchParams(window.document.URL);
  var initiallyOpenedTorrentId = searchParams.get("torrentid");
  if (initiallyOpenedTorrentId !== null) {
    var group = $("#torrent_" + initiallyOpenedTorrentId);
    if (group.length > 0) {
      validateGroup(group);
    }
  }

  // Mediainfo is loaded async, so use a mutation observer to detect when it's ready
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.removedNodes[0].textContent === "Loading...") {
        validateGroup($("#torrent_" + mutation.target.id.split("_").pop()));
      }
    });
  });

  // Validate new groups when opened and ready
  $('tr.torrent_info_row[style*="display: none"], tr.torrent_info_row:hidden').each((key, group) => {
    observer.observe($("#nfo_text_" + group.id.split("_").pop())[0], {
      childList: true
    });
  });
}

/**
 * Toggles display of message log on click
 * @param {object} t - The $ element associated with the log
 * @return null
 */
function toggleDisplayLog(t) {
  var logDiv = $(t)
  .find(".torrentCheckerLog")
  .get()[0];
  var btn = $(t)
  .find(".btn-display_log")
  .get()[0];

  logDiv.style.display = logDiv.style.display === "none" ? "block" : "none";
  btn.innerHTML =
    logDiv.style.display === "none" ? "<br />[ Show Results Log ]" : "<br />[ Hide Results Log ]";
}

function _getAppropriateBackgroundColor(elem) {
  var bgColor = getComputedStyle(elem)
  .backgroundColor.split("rgb(")[1]
  .split(")")[0]
  .split(", ");
  var rgb = "0,0,0";
  if ((parseInt(bgColor[0]) + parseInt(bgColor[1]) + parseInt(bgColor[2])) / 3 > 192)
    // if the panel's background is light set the log background to gray
    rgb = "128,128,128";
  return rgb;
}

/**
 * Logs messages to the checked torrent's log area
 * @param {string} message - The message to log
 * @param {string} color - The color of the message (red for error, yellow for warning, green for pass)
 * @param {object} group - The $ element for the checked torrent
 * @return null
 */
function log(message, color, group) {
  var logDiv = group.find(".torrentCheckerLog").get()[0];
  var div = document.createElement("div");
  var logVerbosity=getLogVerbosity();

  div.setAttribute(
    "style",
    "color: " +
    color +
    "; background:rgba(" +
    _getAppropriateBackgroundColor(logDiv.parentNode) +
    ",0.5); margin:2px; padding:4px;"
  );
  div.setAttribute("class", color == "red" ? "error" : color == "yellow" ? "warning" : color == "purple" ? "crash" : "pass");

  if(logVerbosity=='none' && color!=='purple')
    div.style.display='none';
  else if(logVerbosity=='errors' && color!=='red' && color!=='purple')
    div.style.display='none';
  else if(logVerbosity=='errors and warnings' && color!=='red' && color!=='yellow' && color!=='purple')
    div.style.display='none';

  div.innerHTML = message;
  var tally = logDiv.getElementsByClassName("errorTally")[0];
  logDiv.insertBefore(div, tally);

  var errors = logDiv.getElementsByClassName("error").length;
  var warnings = logDiv.getElementsByClassName("warning").length;
  var crashes = logDiv.getElementsByClassName("crash").length;
  var clear = logDiv.getElementsByTagName("div").length - 1 - errors - warnings - crashes;
  tally.innerHTML="";
  if(errors > 0)
    tally.innerHTML += "<span style='color:red;'>" + errors + " test" + (errors == 1 ? "" : "s") + " failed.</span><br />";
  if(warnings > 0)
    tally.innerHTML += "<span style='color:yellow;'>"+ warnings + " test" + (warnings == 1 ? "" : "s") + " passed with a warning.</span><br />";
  if(crashes > 0)
    tally.innerHTML += "<span style='color:rgb(255,128,255);'>"+ crashes + " test" + (crashes == 1 ? "" : "s") + " crashed.</span><br />";
  tally.innerHTML += clear + " test" + (clear == 1 ? "" : "s") + " passed.";

  var toggleDisplayLogBtn = group.find(".btn-display_log").get()[0];
  //toggleDisplayLogBtn.style.color = errors > 0 ? "red" : warnings > 0 ? "yellow" : "green";
  //toggleDisplayLogBtn.style.display = "inline";
}

/**
 * Runs the suit of tests against a group.
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function validateGroup(group) {
  setup(group);

  if(!parseMediaInfo(group))
  {
    log("validateGroup: Unable to run checks, no valid mediaInfo found", "red", group);
    addError(group, "Unable to run checks, no valid mediaInfo found");
    return;
  }
  let checks=[
    // Generic checks
    checkMediainfoAR,
    checkFrameRate,
    checkContainerCodec,
    checkImages,
    checkNonconformAnamorphic,
    // Specific checks
    checkBD,
    checkDiscSize,
    checkRemux,
    checkSD,
    checkSubtitles,
    checkMediaInfoCount,
    checkBDSizes,
    checkEnglishSubsReq,
    checkVariableFPS,
    checkHDR,
    checkXcodeAud,
    checkHEVC,
    checkCodec,
    checkSDHDres,
    checkAudio,
    checkCommentary,
    checkDVDVOBIFO,
    checkExtraneousFiles,
    checkBloatedAudio,
    checkSource,
    checkContainer,
    checkMediaInfoSizes,
    checkNumberOfStreams,
    checkTruncatedCorrupted,
    checkReleaseGroup,
    checkInterlaced,
    checkRuntimes,
    checkHandbrake,
    checkRemuxLosslessAudio,
    checkDVDFramerate
  ];
  for(var i=0; i<checks.length; i++)
  {
    try
    {
      checks[i](group);
    }
    catch(e)
    {
      log(`<div style="color:#0F0;">Checks: ${checks[i].name} crashed.<br />
      Report this <a href='/forums.php?action=viewthread&threadid=36866'>here</a> with at least the following text:<br />
      <div style="margin-left:10px; color:white; background:rgba(0,0,0,0.4);">${checks[i].name} failed on ${group[0].previousElementSibling.querySelector('a[title="Permalink"]').href} with reason ${e}</div></div>`, "purple", group);
    }
  }
  /*
  // Run generic checks
  checkMediainfoAR(group);
  checkFrameRate(group);
  checkContainerCodec(group)
  checkImages(group);
  checkNonconformAnamorphic(group);

  // Run specific checks
  checkBD(group);
  checkDiscSize(group);
  checkRemux(group);
  checkSD(group);
  checkSubtitles(group);
  checkEnglishSubsReq(group);
  checkVariableFPS(group);
  checkHDR(group);
  checkXcodeAud(group);
  checkHEVC(group);
  checkCodec(group);
  checkSDHDres(group);
  checkAudio(group);
  checkCommentary(group);
  checkDVDVOBIFO(group);
  checkExtraneousFiles(group);
  checkBloatedAudio(group);
  checkSource(group);
  checkContainer(group);
  checkMediaInfoSizes(group);
  checkNumberOfStreams(group);
  checkTruncatedCorrupted(group);
  */

  // Run after checks are complete;
  $(window).on("load", () => {
    displayErrors(group, true);
    sendStats(group);
  });
}

/**
 * Runs preflight setup
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */

function setup(group) {
  // Create someplace centralized to store errors for the group
  group.data("errors", []);

  let showRedundantError=getRedundantError();

  // Create place to display the results of the script
  group
    .find(".movie-page__torrent__panel")
    .find(".bbcode-table-guard")
    .last()
    .prepend("<div class='torrent_info_row_results"+(showRedundantError?'':' hidden')+"'></div>");

  // Make the new error log area
  setupErrorLog(group);
}

function checkDVDFramerate(group)
{
  var mediaInfo=parseMediaInfo(group);
  var shortInfos=getShortInfoText(group).split(' / ');
  if(shortInfos[2]!='DVD')
  {
    log("checkDVDFramerate: Not a DVD, passing", "green", group);
    return;
  }
  if(shortInfos[0]=='DVD5' || shortInfos[0]=='DVD9')
  {
    log("checkDVDFramerate: Not a DVD encode, passing", "green", group);
    return;
  }
  if(!mediaInfo.Video[0]['Color primaries'])
  {
    log("checkDVDFramerate: Video stream 1 doesn't have 'Color primaries' field, passing", "green", group);
    return;
  }
  if(_doesntContain(mediaInfo.Video[0]['Color primaries'], 'PAL') && _doesntContain(mediaInfo.Video[0]['Color primaries'], 'NTSC'))
  {
    log("checkDVDFramerate: Video stream 1's 'Color primaries' field doesn't have 'PAL' or 'NTSC', passing", "green", group);
    return;
  }
  var PAL=_contains(mediaInfo.Video[0]['Color primaries'], 'PAL');
  var PAL_framerates=[25, 50];
  var NTSC_framerates=[23.976, 29.97, 59.94];
  var framerate=parseFloat(mediaInfo.Video[0]['Frame rate']);
  if(_doesntContain(PAL_framerates, framerate) && _doesntContain(NTSC_framerates, framerate))
  {
    log("checkDVDFramerate: Video stream 1's framerate isn't PAL or NTSC", "yellow", group);
    return;
  }
  if(PAL && _doesntContain(PAL_framerates, framerate))
  {
    addError(group, "Mismatch between Framerate and Color primaries. Check for improper framerate.");
    log("checkDVDFramerate: Improper framerate, Video stream 1 framerate of "+framerate+" does not match the PAL indicator in the 'Color primaries' field.", "red", group);
    return;
  }
  else if(!PAL && _doesntContain(NTSC_framerates, framerate))
  {
    addError(group, "Mismatch between Framerate and Color primaries. Check for improper framerate.");
    log("checkDVDFramerate: Improper framerate, Video stream 1 framerate of "+framerate+" does not match the NTSC indicator in the 'Color primaries' field.", "red", group);
    return;
  }
    log("checkDVDFramerate: Video stream 1 is "+(PAL?'PAL':'NTSC')+" which agrees with its 'Color primaries' field.", "green", group);
}

/**
 * Runs tests on images
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkImages(group) {
  var res = getResolution(group);
  var isAnamorphic = _isAnamorphic(res);
  // If anamorphic, display alternative DAR res in mediainfo
  // to avoid confusion when checking images
  if (isAnamorphic) {
    displayAltDar(group, res);
    log("Images: DAR is anamorphic, adding alternative DAR to mediainfo", "yellow", group);
  }
  _getScreenshots(group).each((key, image) => {
    // If the image is already loaded
    if (image.complete) {
      validateImage(group, image, res, key);
    } else {
      $(image).on("load", function() {
        validateImage(group, image, res, key);
      });
    }
  });
}

function checkHandbrake(group)
{
  var mediaInfo=parseMediaInfo(group);
  var shortInfo=getShortInfoText(group).split(' / ');
  if(mediaInfo.General['Writing application'] && mediaInfo.General['Writing application'].toLowerCase().indexOf('handbrake')==0 && shortInfo[2]=="WEB")
  {
    addError(group, "HandBrake encode detected. File is a WEBRip, not WEB-DL.");
    log("checkHandbrake: Handbrake encode detected with 'WEB'. File is a WEBRip, not WEB-DL.", "red", group);
  }
}

function checkReleaseGroup(group)
{
  var groupID = group[0].id.substring(8);
  let fileTRs=group[0].querySelectorAll("#files_"+groupID+' tr');
  let lowQualityGroups=['aXXo', 'BRrip', 'CM8', 'CrEwSaDe', 'CTFOH', 'DNL', 'FaNGDiNG0', 'HD2DVD',
                        'HDTime', 'ION10', 'iPlanet', 'KiNGDOM', 'mHD', 'mSD', 'nHD', 'nikt0', 'nSD',
                        'NhaNc3', 'PRODJi', 'SANTi', 'STUTTERSHIT', 'ViSION', 'VXT', 'WAF', 'x0r', 'YIFY',
                        'EVO', 'FRDS', 'Leffe', 'RDN', 'TERMiNAL'];

  let releaseGroup=false;
  let largestIndex=-1;
  let largestSize=-1;
  for(var i=1; i<fileTRs.length; i++)
  {
    let size=unsize(fileTRs[i].querySelectorAll('td')[1].textContent);
    if(size>largestSize)
    {
      largestIndex=i;
      largestSize=size;
    }
  }
  let filename=fileTRs[largestIndex].querySelector('td').textContent.slice(0,-4);
  for(var j=0; j<lowQualityGroups.length; j++)
  {
    var index=filename.indexOf(lowQualityGroups[j]);
    if(index>0 && index==(filename.length-lowQualityGroups[j].length))
    {
      releaseGroup=lowQualityGroups[j];
      break;
    }
  }
  //let releaseGroup=group[0].previousElementSibling.getAttribute('data-releasegroup');
  if(!releaseGroup)
  {
    log("checkReleaseGroup: Release group not in the list of Low-Quality Releases, might be fine.", "green", group);
    return;
  }
  var shortInfo = getShortInfoText(group);
  if(releaseGroup=="EVO" && _contains(shortInfo, "WEB"))
  {
    log("checkReleaseGroup: EVO release group, but the torrent is a WEB release - allowed.", "green", group);
    return;
  }

  log("checkReleaseGroup: "+releaseGroup+" release group, make sure it is not a Low-Quality Release.", "yellow", group);
  return;
}

function checkInterlaced(group) {
  var mediaInfo = parseMediaInfo(group);
  if(mediaInfo.Video.length==0)
  {
    log("checkInterlaced: Video streams not well found in mediaInfo, passing", "green", group);
    return;
  }
  if(typeof(mediaInfo.Video[0]['Scan type'])=='undefined')
  {
    log("checkInterlaced: First video stream doesn't have a 'Scan type' field, passing", "green", group);
    return;
  }
  var shortInfo = getShortInfoText(group);
  if((mediaInfo.Video[0]['Scan type'] == 'MBAFF' || mediaInfo.Video[0]['Scan type'] == 'Interlaced') && _contains(shortInfo, "1080p"))
  {
    addError(
      group,
      "shortInfo is 1080p but mediaInfo has a Scan Type that indicates Interlaced video"
    );
    log("checkInterlaced: shortInfo is 1080p but mediaInfo has a Scan Type of "+mediaInfo.Video[0]['Scan type']+", shortInfo should be 1080i", "red", group);
  }
  else if(mediaInfo.Video[0]['Scan type'] == 'Progressive' && _contains(shortInfo, "1080i"))
  {
    addError(
      group,
      "shortInfo is 1080i but mediaInfo has a Scan Type that indicates Progressive video"
    );
    log("checkInterlaced: shortInfo is 1080i but mediaInfo has a Scan Type of "+mediaInfo.Video[0]['Scan type']+", shortInfo should be 1080p", "red", group);
  }
}

function checkRuntimes(group)
{
  var mediaInfo=parseMediaInfo(group);
  if(mediaInfo.Video.length==0)
  {
    log("checkRuntimes: Video streams not well found in mediaInfo, passing", "green", group);
    return;
  }
  let video1Duration;
  let audio1Duration;
  let audioDurations=[];
  let generalDuration;
  try
  {
    video1Duration=getMediaInfoDuration(mediaInfo.Video[0].Duration);
    audio1Duration=mediaInfo.Audio.length>0?getMediaInfoDuration(mediaInfo.Audio[0].Duration):video1Duration;
    for(var i=0; i<mediaInfo.Audio.length; i++)
    {
      audioDurations.push(getMediaInfoDuration(mediaInfo.Audio[i].Duration));
    }
    generalDuration=getMediaInfoDuration(mediaInfo.General.Duration);
  } catch(e)
  {
    log("checkRuntimes: Durations not well found in mediaInfo, passing", "green", group);
    return;
  }
  //let difference=(video1Duration/generalDuration);
  //difference=difference>1?difference-1:1-difference;
  //if(difference>0.02)
  if(Math.abs(video1Duration-generalDuration)>120)
  {
    addError(
      group,
      "First video stream doesn't match the duration of the file"
    );
    log("checkRuntimes: Video stream 1 duration is "+mediaInfo.Video[0].Duration+", total duration is "+mediaInfo.General.Duration+", more than 120 seconds different", "red", group);
  }
  //difference=(audio1Duration/generalDuration);
  //difference=difference>1?difference-1:1-difference;
  //if(difference>0.02)
  if(Math.abs(audio1Duration-generalDuration)>120)
  {
    addError(
      group,
      "First audio stream doesn't match the duration of the file"
    );
    log("checkRuntimes: Audio stream 1 duration is "+mediaInfo.Audio[0].Duration+", total duration is "+mediaInfo.General.Duration+", more than 120 seconds different", "red", group);
  }

  for(var i=1; i<audioDurations.length; i++)
  {
    if(Math.abs(audioDurations[i]-generalDuration)>300)
    {
      addError(
        group,
        "Audio stream "+(i+1)+" doesn't match the duration of the file"
      );
      log("checkRuntimes: Audio stream "+(i+1)+" duration is "+mediaInfo.Audio[i].Duration+", total duration is "+mediaInfo.General.Duration+", more than 300 seconds different", "red", group);
    }
  }

  var shortInfo = getShortInfoText(group);
  var container=shortInfo.split(' / ')[1];
  var torrentType=document.querySelector('.basic-movie-list__torrent-edition__main').textContent;
  var movieRuntime = $("#movieinfo").find('strong:contains("Runtime")');
  movieRuntime = _runtimeInSeconds(
    movieRuntime
    .parent()
    .text()
    .substring(9)
  );
  if(container!='m2ts' && container!='VOB IFO' && container!='ISO' && torrentType!="Miniseries" && torrentType!="Movie Collection" && movieRuntime>0)
  {
    //console.log(mediaInfo.Video[0]);
    var framerate=parseFloat(mediaInfo.Video[0]['Frame rate']);
    var roundedDuration=Math.round(video1Duration/60)*60;
    var difference=Math.abs(roundedDuration-movieRuntime);
    //console.log(Math.abs(framerate-25)+' '+Math.abs(framerate-50));
    if(!(Math.abs(framerate-25)<0.1 || Math.abs(framerate-50)<0.1))
    {
      if(difference>300)
      {
        addError(group, "Runtime doesn't match IMDb. Check if it's a different cut.");
        log("checkRuntimes: Video stream 1 has a duration that is more than 5 minutes different than the IMDb runtime. Check if it's a different cut.", "red", group);
      }
    }
    else
    {
      var percent=((movieRuntime-roundedDuration)/movieRuntime)*100;
      //var percent=video1Duration/movieRuntime;
      //if(percent<1) percent=1/percent;
      console.log('checkRuntimes: '+percent+' '+difference+' '+roundedDuration+' '+movieRuntime);
      if(percent>=3.5 && percent<=6)
      {
        addError(group, "PAL speedup detected.");
        log("checkRuntimes: PAL speedup detected.", "red", group);
      }
      else if(percent>6 || difference>300)
      {
        var message="5 minutes";
        if(difference<300) message="6%";
        addError(group, "Runtime doesn't match IMDb. Check if it's a different cut.");
        log("checkRuntimes: Video stream 1 has a duration that is more than "+message+" different than the IMDb runtime. Check if it's a different cut.", "red", group);
      }
    }
  }
}
function getMediaInfoDuration(text)
{
  let numbers=text.split('ms')[0].match(/[0-9]+ ?\w/g).reverse();
  //console.log(numbers);
  let factors=[{index:'h', amount:3600},{index:'m', amount:60},{index:'s', amount:1}];
  let total=0;
  for(var i=0; i<numbers.length; i++)
  {
    for(var j=0; j<factors.length; j++)
    {
      if(numbers[i].indexOf(factors[j].index)!=-1)
      {
        total+=parseInt(numbers[i])*factors[j].amount;
        break;
      }
    }
  }
  return total;
}

function checkNumberOfStreams(group) {
  var mediaInfo = parseMediaInfo(group);
  var count=0;
  if(mediaInfo.Video && typeof(mediaInfo.Video)=="object")
    count+=mediaInfo.Video.length;
  if(mediaInfo.Audio && typeof(mediaInfo.Audio)=="object")
    count+=mediaInfo.Audio.length;
  if(mediaInfo.Text && typeof(mediaInfo.Text)=="object")
    count+=mediaInfo.Text.length;
  if(count>64)
  {
    addError(
      group,
      "More than 64 streams; will not play properly in MPC-HC"
    );
    log("checkNumberOfStreams: "+count+" streams, which is more than 64; will not play properly in MPC-HC", "red", group);
  }
  else
  {
    log("checkNumberOfStreams: Only "+count+" streams, pass", "green", group);
  }
}

function checkTruncatedCorrupted(group) {
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkTruncatedCorrupted: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  if(mediaInfo.General.IsTruncated=='Yes')
  {
    addError(
      group,
      "MediaInfo shows IsTruncated, probably corrupted mkv or bad/wrong MediaInfo"
    );
    log("checkTruncatedCorrupted: MediaInfo shows IsTruncated: Yes, corrupted or incorrect MediaInfo", "red", group);
  }
  else
  {
    log("checkTruncatedCorrupted: File is not truncated", "green", group);
  }
}

/**
 * Compare the torrent's AR with IMDB and add a warning if there is a mismatch
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkMediainfoAR(group) {
  var movieAR = $("#movieinfo").find('strong:contains("AR")');

  var failed = false;
  var torrentAR = _getTorrentAspectRatio(group);

  if(torrentAR=='3:2' || torrentAR=='5:4')
  {
    log("MediainfoAR: "+torrentAR+" is an unusual aspect ratio. Check screenshots for bad AR or poor cropping.", "red", group);
    addError(
      group,
      torrentAR+" is an unusual aspect ratio. Check screenshots for bad AR or poor cropping."
    );
  }
  // If there's no IMDB info then don't worry about it
  if (movieAR.length === 0) {
    log("MediainfoAR: No imdb info, skipping check", "green", group);
    return;
  }

  movieAR = movieAR[0].nextSibling.nodeValue.trim();
  if((movieAR.match(/:/g)||[]).length==2)
    movieAR=movieAR.replace(/:/,'.');
  var movieARDecimal = parseFloat(movieAR.split(":")[0]) / parseFloat(movieAR.split(":")[1]);
  var torrentARDecimal = parseFloat(torrentAR.split(":")[0]) / parseFloat(torrentAR.split(":")[1]);
  var isWEBDL = _isWEBDL(group);
  // Ignore mismatches that have less than a 6% margin of error
  if (Math.abs(torrentARDecimal - movieARDecimal) / torrentARDecimal > 0.06) {
    log("MediainfoAR: AR within 6%, close enough", "green", group);
  }

  // Also ignore mismatches for BD source and remuxes
  var shortInfo = getShortInfoText(group);

  if (
    movieAR !== torrentAR &&
    Math.abs(torrentARDecimal - movieARDecimal) / torrentARDecimal > 0.06 &&
    torrentAR !== "16:916:9"
  ) {
    if (isWEBDL) {
      addError(
        group,
        "AR mismatch, but appears to be a WEB-DL."
      );
      log(
        "MediainfoAR: This appears to be an untouched WEB-DL, so AR mismatch is expected. If this is a WEB encode, it should be properly cropped.",
        "fail",
        group
      );
      failed = true;
    } else if (
      _contains(shortInfo, "BD25") ||
      _contains(shortInfo, "BD50") ||
      _contains(shortInfo, "BD66") ||
      _contains(shortInfo, "BD100") ||
      _contains(shortInfo, "Remux") ||
      _contains(shortInfo, "DVD5") ||
      _contains(shortInfo, "DVD9")
    ) {
      addError(group, "AR mismatch is expected, but confirm OAR.");
      log("MediainfoAR: AR mismatch is expected, but confirm OAR.", "yellow", group);
    } else {
      addError(group, "AR mismatch between torrent (" + torrentAR + ") and IMDB (" + movieAR + ").");
      log(
        "MediainfoAR: AR mismatch between torrent (" + torrentAR + ") and IMDB (" + movieAR + ").",
        "red",
        group
      );
      failed = true;
    }
  }
  if (!failed) log("MediainfoAR: AR test passed.", "green", group);
}

/**
 * Check for improper container and/or codec
 * @param (object) group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkContainerCodec(group)
{
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkContainerCodec: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  var shortInfo = getShortInfoText(group);
  var failed=false;

  if(_contains(shortInfo, "AVI"))
  {
    // Only check the first video for 264
    if(mediaInfo.Video[0].Format.indexOf('264')!=-1)
    {
      addError(group, "AVI container detected with h.264/x264 codec.");
      log("checkContainerCodec: AVI container detected with h.264/x264 codec - torrent should probably be deleted, confirm.", "red", group);
    }
    else
    {
      addError(group, "AVI container detected.");
      log("checkContainerCodec: AVI container detected. Confirm if similar torrents exist in the group.", "red", group);
    }
    failed=true;
  }
  // If the mediaInfo doesn't have a `Complete name` then skip this part of the check - it's probably an untouched disc
  try
  {
    var extension=mediaInfo.General['Complete name'].split('\.');
    extension=extension[extension.length-1];
    if(_contains(mediaInfo.General.Format.toLowerCase(), "mpeg-4") && extension=="mkv")
    {
      addError(group, "Container is MP4 (renamed to .mkv).");
      log("checkContainerCodec: Container is MP4 (renamed to .mkv).", "red", group);
      failed=true;
    }
  } catch(e) {}

  if(mediaInfo.General.Format=="Matroska")
  {
    var badCodecs=["xvid", "divx", "mpeg-4 visual"];
    for(var i=0; i<mediaInfo.Video.length; i++)
    {
      var v=mediaInfo.Video[i];
      if(badCodecs.indexOf(v.Format.toLowerCase())!=-1)
      {
        addError(group, "Video stream "+v.ID+" has codec "+v.Format);
        log("checkContainerCodec: MKV file, video stream "+v.ID+" has codec "+v.Format+".", "red", group);
        failed=true;
      }
    }
  }

  //let validContainers=["matroska", "mpeg-4", "mpeg-ps", "dvd video", "bdav"];
  // mp4 no longer valid, apparently
  let validContainers=["matroska", "mpeg-ps", "dvd video", "bdav"];
  if(validContainers.indexOf(mediaInfo.General.Format.toLowerCase())==-1)
  {
    addError(group, "Container not MKV");
    log("checkContainerCodec: Container must be MKV, check.", "yellow", group);
    failed=true;
  }
  /*
  if(mediaInfo.General.Format.toLowerCase()=="mpeg-ps")
  {
    addError(group, "MPEG-PS container.");
    log("checkContainerCodec: MPG file with MPEG-PS container.", "red", group);
    failed=true;
  }
  */

  if(_contains(shortInfo, "265") && mediaInfo.Video[0].Format=='HEVC' && _contains(shortInfo, "WEB") && _contains(shortInfo, "1080p") && !mediaInfo.Video[0]['HDR format'])
  {
    log("checkContainerCodec: h.265/x265 codec on SDR 1080p WEB-DL, make sure it includes exhaustive comparisons against the AVC version.", "yellow", group);
    return;
  }
  if(_contains(shortInfo, "265") && (!_contains(shortInfo, "HDR") && !_contains(shortInfo, "2160p") && !_contains(shortInfo, "Dolby Vision")))
  {
    addError(group, "h.265/x265 while not HDR or 2160p");
    log("checkContainerCodec: h.265/x265 codec on non-HDR torrent with lower resolution than 2160p.", "red", group);
    failed=true;
  }
  if(_contains(shortInfo, "MP4") && _contains(shortInfo, "Dolby Vision"))
  {
    addError(group, "Torrent is MP4 with Dolby Vision");
    log("checkContainer: Torrent is an MP4 with Dolby Vision, should be MKV", "red", group);
    failed=true;
  }
  var DoViRulesDate=new Date('2022-11-26')*1;
  // put this in its own function if there is ever a need to check against when the torrent was uploaded in other places
  var torrentUploaded=new Date(group.get()[0].querySelector('.time').title+' GMT')*1;
  if(torrentUploaded>DoViRulesDate)
  {
    if(_contains(shortInfo, "Remux") && _contains(shortInfo, "HDR10") && !_contains(shortInfo, "Dolby Vision"))
    {
      log("checkContainer: HDR10-only remuxes from DoVi sources are not allowed anymore, please confirm whether the source contains a Dolby Vision layer or not.", "yellow", group);
    }
  }
  var groupID = group[0].id.substring(8);
  if(_contains(shortInfo, "Blu-ray") && _contains(shortInfo, 'Remux') && _contains(shortInfo, "Dolby Vision") && (_contains(shortInfo, "Hybrid") || _contains(group.get()[0].querySelector('#files_'+groupID+' td').textContent), "Hybrid"))
  {
    if(_doesntContain(mediaInfo.Video[0]['HDR format'], 'dvhe.07'))
    {
      addError(group, "Hybrid Dolby Vision (BD+WEB) not allowed");
      log("checkContainer: Hybrid Dolby Vision (BD+WEB) is currently not allowed (HDR Format of dvhe.07.* not found in first Video stream), please double check whether it's a true BD+WEB Hybrid Dolby Vision torrent.", "red", group);
      failed=true;
    }
  }

  if(!failed) log("checkContainerCodec: Improper container/codec test passed.", "green", group);
}

/**
 * Check for improper framerates
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkFrameRate(group) {
  var failed = false;
  var allowedFramerates = ["23.976", "24.000", "25.000", "29.970", "59.940", "50.000"];
  var unusualFramerates = ["17.982", "18.000", "19.980", "20.000", "24.975", "18.750"];

  var framerate = getMediaInfo(group)
  .find("table.mediainfo__section")
  .find('td:contains("Frame rate:"):first') // dolby vision has two Video sections, only grab the framerate from the first
  .next()
  .text()
  .substr(0, 6)
  .replace(",", ".");
  // Force the string to always have 0 decimals, so 25 becomes 25.000 etc
  framerate = parseFloat(framerate).toFixed(3);
  var shortInfo = getShortInfoText(group);
  if(_contains(shortInfo, "m2ts") || _contains(shortInfo, "VOB IFO") || _contains(shortInfo, "Remux"))
  {
    log("Framerate: Not an encode, passed.", "green", group);
    return;
  }
  var year = parseInt($(".page__title")[0].firstChild.textContent.substr(-9, 4));

  if(_contains(unusualFramerates, framerate)) {
    addError(
      group,
      "Unusual Framerate detected. Check if it is proper."
    );
    log("Framerate: Framerate of "+framerate+" is unusual but may still be correct. Confirm.", "yellow", group);
    return;
  }

  if (_doesntContain(allowedFramerates, framerate)) {
    addError(group, "Improper framerate.");
    log("Framerate: Improper framerate.", "red", group);
    failed = true;
  } else if (framerate === "59.940" || framerate === "50.000") {
    if (_doesntContain(shortInfo, "Blu-ray")) {
      addError(
        group,
        "High Frame Rate, but the source isn't a blu-ray. Check if this has been deinterlaced."
      );
      log("Framerate: HFR, but the source isn't a blu-ray.", "red", group);
      failed = true;
    }
    if (!_isExact(shortInfo, "HFR") && _contains(shortInfo, "Blu-ray")) {
      addError(group, "ShortInfo must contain HFR.");
      log("Framerate: ShortInfo must contain HFR.", "red", group);
      failed = true;
    }
  } else if (framerate === "25.000" && _contains(shortInfo, "DVD / NTSC")) {
    addError(group, "Framerate is 25.000fps but this is NTSC.");
    log("Framerate: Framerate is 25.000fps but this is NTSC.", "red", group);
    failed = true;
  } else if (framerate !== "25.000" && _contains(shortInfo, "DVD / PAL")) {
    addError(group, "Source is PAL but the framerate is not 25.000fps.");
    log("Framerate: Source is PAL but the framerate is not 25.000fps.", "red", group);
    failed = true;
  } else if (framerate === "24.000") {
    if (_doesntContain(shortInfo, "Blu-ray") && _doesntContain(shortInfo, "WEB")) {
      addError(group, "Framerate is 24.000fps but the source is not Blu-ray or WEB.");
      log("Framerate: Framerate is 24.000fps but the source is not Blu-ray or WEB.", "red", group);
      failed = true;
    } else {
      log("Framerate: Framerate test passed.", "green", group);
      return;
    }
  } else if (
    framerate === "29.970" &&
    year >= 1980 &&
    _doesntContain(shortInfo, "VHS") &&
    _doesntContain(shortInfo, "DVD5") &&
    _doesntContain(shortInfo, "DVD9")
  ) {
    var isNotDocumentary = _doesntContain(
      $(".panel__heading__title:contains('IMDb tags')")
      .parent()
      .next()
      .text(),
      "documentary"
    );
    var isNotConcert = _doesntContain(
      $(".basic-movie-list__torrent-edition__main").text(),
      "Live Performance"
    );

    if (isNotConcert && isNotDocumentary) {
      addError(
        group,
        "Framerate is 29.970. Unless this was shot on video then it needs to be reverse telecined."
      );
      log(
        "Framerate: Framerate is 29.970. Unless this was shot on video then it needs to be reverse telecined.",
        "red",
        group
      );
      failed = true;
    } else {
      log("Framerate: Framerate test passed.", "green", group);
      return;
    }
  } else {
    log("Framerate: Framerate test passed.", "green", group);
    return;
  }
  if (!failed) log("Framerate: Framerate test passed.", "green", group);
}

function _isWEBDL(group) {
  var shortInfo = getShortInfoText(group);
  var fileName = getFileName(group).toLowerCase();
  if (_contains(shortInfo, "WEB")) {
    if (
      _contains(fileName, "webdl") ||
      _contains(fileName, "web-dl") ||
      _contains(fileName, "web.dl") ||
      _contains(shortInfo, "H.264")
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 * Make sure only correct groups are anamorphic
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkNonconformAnamorphic(group) {
  var failed = false;
  var shortInfo = getShortInfoText(group);
  var isAnamorphic = _isAnamorphic(getResolution(group));
  var isWEBDL = _isWEBDL(group);
  // added a check for 2160p blurays
  var is2160p = _contains(shortInfo, "2160p") && _contains(shortInfo, "Blu-Ray");
  var is720p1080orBluray =
      _contains(shortInfo, "720p") ||
      _contains(shortInfo, "1080p") ||
      _contains(shortInfo, "Blu-ray") ||
      _isExact(shortInfo, "HDTV");
  if (isAnamorphic && is2160p) {
    addError(group, "Non-conform resolution: UHD-sourced encodes should not be anamorphic.");
    log(
      "Non-conform Anamorphic: Non-conform resolution, UHD-sourced encodes should not be anamorphic.",
      "red",
      group
    );
    failed = true;
  } else if (isAnamorphic && is720p1080orBluray) {
    addError(group, "Non-conform resolution: HD-sourced encodes should not be anamorphic.");
    log(
      "Non-conform Anamorphic: Non-conform resolution, HD-sourced encodes should not be anamorphic.",
      "red",
      group
    );
    failed = true;
    // If file is TS, assume it's an untouched capture (anamorphic is correct)

    /* Psychical (#1928827): We stopped marking anamorphic VHS and TV rips as trumpable almost 2 years ago now.
  } else if (
    isAnamorphic &&
    _isExact(shortInfo, "TV") &&
    _doesntContain(shortInfo, "TS") &&
    _contains(shortInfo, "264")
  ) {
    addError(group, "Non-conform resolution: TV-sourced encodes should not be anamorphic.");
    log(
      "Non-conform Anamorphic: Non-conform resolution, TV-sourced encodes should not be anamorphic.",
      "red",
      group
    );
    failed = true;
  } else if (isAnamorphic && _contains(shortInfo, "VHS") && _contains(shortInfo, "264")) {
    addError(group, "Non-conform resolution: VHS-sourced encodes should not be anamorphic.");
    log(
      "Non-conform Anamorphic: Non-conform resolution, VHS-sourced encodes should not be anamorphic.",
      "red",
      group
    );
    failed = true;
    */
  } else if (!isAnamorphic && _isExact(shortInfo, "DVD") && _contains(shortInfo, "264")) {
    addError(group, "Non-conform resolution: DVD-sourced x264 should be anamorphic.");
    log(
      "Non-conform Anamorphic: Non-conform resolution, DVD-sourced encodes should be anamorphic.",
      "red",
      group
    );
    failed = true;
  } else if (isAnamorphic && _contains(shortInfo, "AVI")) {
    addError(group, "Non-conform resolution: AVIs should not be anamorphic.");
    log("Non-conform Anamorphic: Non-conform resolution, AVIs should not be anamorphic.", "red", group);
    failed = true;
  } else if (_isSD(shortInfo) && _contains(shortInfo, "WEB")) {
    if (isAnamorphic && !isWEBDL) {
      addError(
        group,
        "Non-conform resolution: This appears to be a WEB encode, and should not be anamorphic. Try to confirm."
      );
      log(
        "Non-conform Anamorphic: Non-conform resolution, This appears to be a WEB encode, and should not be anamorphic. Try to confirm.",
        "red",
        group
      );
      failed = true;
    }
  }
  if (!failed) log("Non-conform Anamorphic: Non-conform Anamorphic test passed.", "green", group);
}

function checkBD(group) {
  var shortInfo = getShortInfoText(group);
  // If it's not a BD then we're done here
  if (
    _doesntContain(shortInfo, "BD25") &&
    _doesntContain(shortInfo, "BD50") &&
    _doesntContain(shortInfo, "BD66") &&
    _doesntContain(shortInfo, "BD100")
  ) {
    log("checkBD: Not a BD, skipping test.", "green", group);
    return;
  }
  var mediaInfoText = group.find("blockquote.spoiler").text();
  if (_doesntContain(mediaInfoText, "Disc Title") && _doesntContain(mediaInfoText, "Disc Size")) {
    addError(group, "Missing BDInfo.");
    log("checkBD: Missing BDInfo.", "red", group);
  }
  if(_contains(mediaInfoText.split("CHAPTERS:")[0], " 0 kbps"))
  {
    addError(group, "BDInfo missing bitrates");
    log("checkBD: BDInfo has '0 kbps' entries, 'Scan Bitrates' button not clicked", "red", group);
  }
}

function checkDiscSize(group) {
  var sizes={
    dvd5:4707319808,
    dvd9:8547991552,
    bd25:25025314816,
    bd50:50050629632,
    bd66:66066831360,
    bd100:100103356416
  };
  var shortInfo = getShortInfoText(group);
  var size=parseInt(document.getElementById('group_torrent_header_'+group[0].id.substring(8)).getElementsByTagName('td')[1].getElementsByTagName('span')[0].title.replace(/,/g, ''));
  if(_contains(shortInfo, "DVD5") && size > sizes.dvd5)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than DVD5's maximum size of "+sizes.dvd5.toLocaleString()+" bytes", "red", group);
  }
  if(_contains(shortInfo, "DVD9") && size > sizes.dvd9)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than DVD9's maximum size of "+sizes.dvd9.toLocaleString()+" bytes", "red", group);
  }
  if(_contains(shortInfo, "DVD9") && size <= sizes.dvd5)
  {
    addError(group, "Torrent size smaller than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, smaller than DVD5's maximum size of "+sizes.dvd5.toLocaleString()+" bytes but has a container of DVD9", "red", group);
  }
  if(_contains(shortInfo, "BD25") && size > sizes.bd25)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than BD25's maximum size of "+sizes.bd25.toLocaleString()+" bytes. Check if multi-disc.", "red", group);
  }
  if(_contains(shortInfo, "BD50") && size > sizes.bd50)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than BD50's maximum size of "+sizes.bd50.toLocaleString()+" bytes. Check if multi-disc.", "red", group);
  }
  if(_contains(shortInfo, "BD50") && size <= sizes.bd25)
  {
    addError(group, "Torrent size smaller than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, smaller than BD25's maximum size of "+sizes.bd25.toLocaleString()+" bytes. Should be BD25.", "red", group);
  }
  if(_contains(shortInfo, "BD66") && size > sizes.bd66)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than BD66's maximum size of "+sizes.bd66.toLocaleString()+" bytes. Check if multi-disc.", "red", group);
  }
  if(_contains(shortInfo, "BD66") && size <= sizes.bd50)
  {
    addError(group, "Torrent size smaller than single disc");
    var disc='BD50';
    var s1=sizes.bd50;
    if(size <= sizes.bd25)
    {
      disc='BD25';
      s1=sizes.bd25;
    }
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, smaller than "+disc+"'s maximum size of "+s1.toLocaleString()+" bytes. Should be "+disc+".", "red", group);
  }
  if(_contains(shortInfo, "BD100") && size > sizes.bd100)
  {
    addError(group, "Torrent size larger than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, bigger than BD100's maximum size of "+sizes.bd100.toLocaleString()+" bytes. Check if multi-disc.", "red", group);
  }
  if(_contains(shortInfo, "BD100") && size <= sizes.bd66)
  {
    var disc='BD66';
    var s1='66';
    if(size <= sizes.bd50)
    {
      disc='BD50';
      s1=sizes.bd50;
    }
    if(size <= sizes.bd25)
    {
      disc='BD25';
      s1=sizes.bd25;
    }
    addError(group, "Torrent size smaller than single disc");
    log("checkDiscSize: Torrent is "+size.toLocaleString()+" bytes, smaller than "+disc+"'s maximum size of "+s1.toLocaleString()+" bytes. Should be "+disc+".", "red", group);
  }
}

/**
 * Remux specific checks
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkRemux(group) {
  var failed = false;
  var shortInfo = getShortInfoText(group);
  var foundRemux=false;
  var remuxName='';
  var fileTRs=document.getElementById('files_'+group[0].id.substring(8)).getElementsByTagName('tr');
  for(var i=1; i<fileTRs.length; i++)
  {
    var fName=fileTRs[i].getElementsByTagName('td')[0].textContent;
    if(fName.toLowerCase().indexOf('remux')!=-1)
    {
      foundRemux=true;
      remuxName=fName;
    }
  }
  // If it's not a remux then we're done here
  if (_doesntContain(shortInfo, "Remux")) {
    if(foundRemux)
    {
      addError(group, "'Remux' found in filename but missing Remux in shortInfo");
      log("checkRemux: <em style='color:rgba(128,128,255,0.5);'>"+remuxName+"</em> has 'Remux' in it, but the shortInfo doesn't have the Remux tag. Check.", "red", group);
    }
    log("checkRemux: Not a Remux, skipping test.", "green", group);
    return;
  }
  // Check and see if the remux is UHD or HD
  var res = getResolution(group);
  // could probably remove the shortinfo and base the check on feature film location
  if (_contains(shortInfo, "265")) {
    if (res[0] !== 3840 || res[1] !== 2160) {
      addError(group, "UHD Remuxes must be 2160p.");
      log("checkRemux: UHD Remuxes must be 2160p.", "red", group);
      failed = true;
    }
  } else {
    if (res[0] !== 1920 || res[1] !== 1080) {
      addError(group, "HD Remuxes must be 1080p.");
      log("checkRemux: HD Remuxes must be 1080p.", "red", group);
      failed = true;
    }
  }
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkRemux: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  if(!mediaInfo.Menu && !mediaInfo["Menu #1"])
  {
    addError(group, "Chapters missing in Remux.");
    log("checkRemux: Remuxes must have chapters.", "red", group);
    failed=true;
  }
  if (!failed) log("checkRemux: checkRemux test passed.", "green", group);
}

function checkSD(group) {
  var failed = false;
  var shortInfo = getShortInfoText(group);
  var is480p576p = _contains(shortInfo, "480p") || _contains(shortInfo, "576p");
  var isWEBDL = _isWEBDL(group);
  var res = getResolution(group);
  var isAnamorphic = _isAnamorphic(res);
  if (_isSD(shortInfo) && _isHDSourced(shortInfo) && _contains(shortInfo, "264")) {
    //if (group.prevAll().find('.basic-movie-list__torrent-edition__sub:contains("High Definition")').length === 0 && _isHDSourced(shortInfo)) {
    if (!is480p576p) {
      addError(group, "Non-conform resolution: HD-sourced SD encodes must be either 480p or 576p.");
      log(
        "checkSD: Non-conform resolution, HD-sourced SD encodes must be either 480p or 576p.",
        "red",
        group
      );
      failed = true;
    }
  }

  if (_isSD(shortInfo) && !isAnamorphic && _contains(shortInfo, "WEB") && _contains(shortInfo, "264")) {
    if (!is480p576p && !isWEBDL) {
      addError(
        group,
        "Non-conform resolution: This appears to be a WEB encode, and should be either 480p or 576p. Try to confirm."
      );
      log(
        "checkSD: Non-conform resolution, this appears to be a WEB encode, and should be either 480p or 576p. Try to confirm.",
        "red",
        group
      );
      failed = true;
    }
  }

  if (
    _contains(shortInfo, "AVI") &&
    ((!isAnamorphic && (res[0] > 720 || res[1] > 576)) || (isAnamorphic && (res[2] > 720 || res[3] > 576)))
  ) {
    addError(group, "AVIs cannot be larger than 720x576 (it breaks compatability).");
    log("checkSD: AVIs cannot be larger than 720x576 (it breaks compatability).", "red", group);
    failed = true;
  }

  // For dvds ensure standard matches between shortinfo and mediainfo
  if (_contains(shortInfo, "DVD5") || _contains(shortInfo, "DVD9")) {
    var mediaInfoText = group.find("blockquote.spoiler").text();
    if (
      (_contains(shortInfo, "PAL") && _contains(mediaInfoText, " : NTSC")) ||
      (_contains(shortInfo, "NTSC") && _contains(mediaInfoText, " : PAL"))
    ) {
      addError(group, "NTSC / PAL missmatch between shortinfo and mediainfo.");
      log("checkSD: NTSC / PAL missmatch between shortinfo and mediainfo.", "red", group);
      failed = true;
    }

    if (_doesntContain(mediaInfoText, " : NTSC") && _doesntContain(mediaInfoText, " : PAL")) {
      addError(group, "Mediainfo does not list either NTSC or PAL.");
      log("checkSD: Mediainfo does not list either NTSC or PAL.", "red", group);
      failed = true;
    }
  }
  if (!failed) log("checkSD: checkSD test passed.", "green", group);
}

function checkBDSizes(group)
{
  var shortInfo=getShortInfoText(group);
  var container=shortInfo.split(' / ')[0];
  var applicableContainers=["BD25", "BD50", "BD66", "BD100"];
  if(applicableContainers.indexOf(container)==-1)
  {
    log("checkBDSizes: checkBDSizes passed, not a BD torrent", "green", group);
    return;
  }
  var torrentType=document.querySelector('.basic-movie-list__torrent-edition__main').textContent;
  var maySkip=false;
  if(torrentType=="Miniseries" || torrentType=="Movie Collection")
  {
    maySkip=true;
  }
  var BDInfo=parseMediaInfo(group);
  var generalSize=0;
  var playlistSize=0;
  //console.log('BDInfo: ');
  //console.log(BDInfo);
  if(BDInfo.type=="Quick Summary")
  {
    generalSize=BDInfo['Disc Size'];
    if(!generalSize)
    {
      log("checkBDSizes: Type is 'Quick Summary' but 'Disc Size' is not in BDInfo, can't check playlist size compared to disc size", "yellow", group);
      return;
    }
    playlistSize=BDInfo.Size;
  }
  else
  {
    generalSize=BDInfo.General['Disc Size'];
    playlistSize=BDInfo.Playlist_Report.Size;
  }
  if(!generalSize)
  {
    log("checkBDSizes: couldn't get General File size, possibly malformed BDInfo ('Disc Size' should be under the 'DISC INFO:' section)", "yellow", group);
    return;
  }
  generalSize=parseInt(generalSize.replace(/,/g, ''));
  playlistSize=parseInt(playlistSize.replace(/,/g, ''));
  if(playlistSize/generalSize<0.6)
  {
    if(maySkip)
    {
      log("checkBDSizes: checkBDSizes passed - Playlist size was under 60% of Disc size, but it was a "+torrentType, "green", group);
      return;
    }
    addError(group, "BDInfo Playlist size is less than 60% of Disc size. Check for 2in1.");
    log("checkBDSizes: Playlist size is "+(Math.round((playlistSize/generalSize)*100))+"% of Disc size. Check for 2in1.", "red", group);
    return;
  }
  log("checkBDSizes: checkBDSizes passed", "green", group);
}

function checkMediaInfoCount(group) {
  var groupID = group[0].id.substring(8);
  var shortInfo = getShortInfoText(group);
  var extension = shortInfo.split(' / ')[1].toLowerCase();
  if(extension=="m2ts" || extension=="iso")
  {
    log("checkMediaInfoCount: Test passed, does not apply to "+extension+" torrents", "green", group);
    return;
  }
  var regexp = new RegExp(extension+'$');
  var mainFiles = group.find("#files_"+groupID).find("td").filter(function(){ return $(this).text().match(regexp)!=null }).length;
  var mediaInfos = group[0].querySelectorAll('.mediainfo').length;
  if(mediaInfos<mainFiles)
  {
    addError(group, "MediaInfo count is less than File count");
    log("checkMediaInfoCount: MediaInfo count is "+mediaInfos+", File count (with extension ."+extension+") is "+mainFiles, "red", group);
    return;
  }
  log("checkMediaInfoCount: checkMediaInfoCount passed", "green", group);
}

function checkSubtitles(group) {
  var failed = false;
  var groupID = group[0].id.substring(8);
  var shortInfo = getShortInfoText(group);
  var mediaInfoText = group.find("blockquote.spoiler").text();
  var subtitlesInManager = group.find("#subtitle_manager").children('img[alt!="No Subtitles"]').length;
  var subtitlesInMediainfo;
  var subtitleFormats = [".srt", ".SRT", ".sub", ".SUB", ".ssa", ".SSA", ".sup", ".SUP", ".ass", ".ASS"];
  var subtitleRegex = new RegExp(subtitleFormats.join("$|") + "$");
  var subtitlesInFilelist = group
  .find("#files_" + groupID)
  .find("td")
  .filter(function() {
    return subtitleRegex.test($(this).text());
  }).length;
  var mediaInfo = parseMediaInfo(group);

  // Parse the subtitles from the bdinfo or the mediainfo
  if (
    _contains(shortInfo, "BD25") ||
    _contains(shortInfo, "BD50") ||
    _contains(shortInfo, "BD66") ||
    _contains(shortInfo, "BD100")
  ) {
    // There's two types of bdinfo, and they list subs differently
    var prefix;
    if (_contains(mediaInfoText, "SUBTITLES")) {
      prefix = "Presentation Graphics";
      subtitleRegex = new RegExp(prefix + " +(\\w+)", "m");
    } else {
      prefix = "Subtitle:";
      subtitleRegex = new RegExp(prefix + "\\s+(\\w+)", "m");
    }

    subtitlesInMediainfo = mediaInfoText
      .split("\n")
      .filter(text => {
      return _contains(text, prefix);
    })
      .map(sub => sub.match(subtitleRegex)[1]);

    for(var i=0; i<mediaInfo.Text.length; i++)
    {
      if(mediaInfo.Text[i]==undefined)
      {
        log("checkSubtitles: Language is not set for subtitle "+(i+1), "yellow", group);
        failed=true;
      }
    }
    subtitlesInMediainfo = subtitlesInMediainfo.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    }).length;

    console.log('here');
    if (
      (_contains(mediaInfoText, "Disc Title") || _contains(mediaInfoText, "Disc Label")) &&
      _contains(mediaInfoText, "Disc Size") &&
      subtitlesInManager !== subtitlesInMediainfo + subtitlesInFilelist
    ) {
      var error =
          subtitlesInManager +
          " internal subs in manager, " +
          subtitlesInMediainfo +
          " detected in bdinfo, and " +
          subtitlesInFilelist +
          " in file list.";
      addError(group, error);
      log("checkSubtitles: " + error, "red", group);
      failed = true;
    }
  } else if (_contains(shortInfo, "DVD5") || _contains(shortInfo, "DVD9")) {
    subtitlesInMediainfo = mediaInfoText
    // Check for whitespace
      .split(/\n\n|\n\s/)
      .filter(text => {
      return text.substr(0, 4) === "Text" || text.substr(1, 4) === "Text";
    })
      .map(sub => {
      // Every once in a while a sub won't list a language
      if (sub.match(/Language\s*?: (\w+)/m)) {
        return sub.match(/Language\s*?: (\w+)/m)[1];
      }
    });

    if(mediaInfo.Text)
    {
      for(var i=0; i<mediaInfo.Text.length; i++)
      {
        if(mediaInfo.Text[i].Language==undefined)
        {
          log("checkSubtitles: Language is not set for subtitle "+(i+1), "yellow", group);
          failed=true;
        }
      }
    }
    subtitlesInMediainfo = subtitlesInMediainfo.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    }).length;

    if (subtitlesInManager !== subtitlesInMediainfo + subtitlesInFilelist) {
      var error =
          subtitlesInManager +
          " internal subs in manager, " +
          subtitlesInMediainfo +
          " detected in mediainfo, and " +
          subtitlesInFilelist +
          " in file list.";
      addError(group, error);
      log("checkSubtitles: " + error, "red", group);
      failed = true;
    }
  } else {
    subtitlesInMediainfo = mediaInfoText
    // Check for whitespace
      .split(/\n\n|\n\s/)
      .filter(text => {
      return text.substr(0, 4) === "Text" || text.substr(1, 4) === "Text";
    })
      .map(sub => {
      // Every once in a while a sub won't list a language
      if (sub.match(/Language\s*?: (\w+)/m)) {
        //below seems to prevent detecting duplicates, such as English sdh and english subtitle
        return sub.match(/Language\s*?: (\w+)/m)[1];
        //return sub.match(/Language\s*?: (\w+)/m);
      }
      /*if(sub.match(/ID\s*?: (\w+)/m)){
                return sub.match(/ID\s*?: (\w+)/m)[1];
            }*/
    });

    if(mediaInfo.Text)
    {
      for(var i=0; i<mediaInfo.Text.length; i++)
      {
        if(mediaInfo.Text[i].Language==undefined)
        {
          log("checkSubtitles: Language is not set for subtitle "+(i+1), "yellow", group);
          failed=true;
        }
      }
    }
    subtitlesInMediainfo = subtitlesInMediainfo.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    }).length;

    if (subtitlesInManager !== subtitlesInMediainfo + subtitlesInFilelist) {
      var error =
          subtitlesInManager +
          " internal subs in manager, " +
          subtitlesInMediainfo +
          " detected in mediainfo, and " +
          subtitlesInFilelist +
          " in file list.";
      addError(group, error);
      log("checkSubtitles: " + error, "red", group);
      failed = true;
    }
  }
  if (!failed) log("checkSubtitles: checkSubtitles test passed.", "green", group);
}

function checkEnglishSubsReq(group) {
  var subtitlesInManager2 = group
  .find("#subtitle_manager")
  .find('img[alt="English"],img[alt="English - Forced"]').length;
  var movieLang = $("#movieinfo").find('strong:contains("Language")');
  movieLang = movieLang
    .parent()
    .text()
    .substring(10)
    .split(", ");
  try
  {
    var noEnglishSubsAlready = document.getElementById('trumpable_'+group[0].id.substring(8)).textContent.indexOf('No English Subtitles')!==-1;
    if(noEnglishSubsAlready) {
      log("checkEnglishSubsReq: No English subtitles detected, but found already trumpable for that reason.", "yellow", group);
      return;
    }
  } catch(e) {}
  if (movieLang === "" || (movieLang[0] == "English" && movieLang.length == 1)) {
    log(
      "checkEnglishSubsReq: English subtitles not required, english is the primary language in the movie. checkEnglishSubsReq test passed.",
      "green",
      group
    );
    return;
  } else if (movieLang[0] == "English" && movieLang.length > 1 && !subtitlesInManager2) {
    log(
      "checkEnglishSubsReq: English subtitles probably not required, english spoken movie but it has other languages. Maybe check, but it's probably fine.",
      "yellow",
      group
    );
    return;
  } else if (movieLang.indexOf("English") != -1 && !subtitlesInManager2) {
    addError(
      group,
      "No English subtitles detected, English not primary language."
    );
    log(
      "checkEnglishSubsReq: No English subtitles detected, English not primary language. Confirm and then report as trumpable for no English subs.",
      "red",
      group
    );
    return;
  } else if (!subtitlesInManager2) {
    addError(
      group,
      "No English subtitles detected."
    );
    log(
      "checkEnglishSubsReq: No English subtitles detected. Confirm and then report as trumpable for no English subs.",
      "red",
      group
    );
  } else {
    log(
      "checkEnglishSubsReq: English subtitles required and present. checkEnglishSubsReq test passed.",
      "green",
      group
    );
    return;
  }
}

function checkVariableFPS(group) {
  //this works mostly, but let's try another way
  var mediaInfoText = group.find("blockquote.spoiler").text();
  //this is the test
  var shortInfo = getShortInfoText(group);
  // If it's a BD, DVD or remux then we're done here
  if (
    _contains(shortInfo, "BD25") ||
    _contains(shortInfo, "BD50") ||
    _contains(shortInfo, "BD66") ||
    _contains(shortInfo, "BD100") ||
    _contains(shortInfo, "DVD5") ||
    _contains(shortInfo, "DVD9")
  ) {
    log(
      "checkVariabeFPS: BD, DVD, and remuxes automatically pass. checkVariableFPS test passed.",
      "green",
      group
    );
    return;
  }
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkVariableFPS: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  if (
    _contains(mediaInfoText, "Minimum frame rate") ||
    _contains(mediaInfoText, "Frame rate mode                          : Variable") ||
    mediaInfo.Video[0]['Frame rate mode']=='Variable'
  ) {
    addError(group, "This encode has variable framerate, so it is trumpable for improper FPS.");
    log(
      "checkVariabeFPS: This encode has variable framerate, so it is trumpable for improper FPS.",
      "red",
      group
    );
  } else {
    log("checkVariabeFPS: Variable FPS not detected. checkVariableFPS test passed.", "green", group);
    return;
  }
}

function checkHDR(group) {
  var failed = false;
  var shortInfo = getShortInfoText(group);
  var mediaInfoText = group.find(".mediainfo").next().text();
  var tenBit = false;
  var hdr = false;
  var hdrTenPlus = false;
  var dolbyVision = false;
  var dolbyAtmos = false;
  var webMP4 = false;

  //first let's set some variables
  if (_contains(mediaInfoText, "10 bits")) {
    tenBit = true;
  }

  if(_contains(shortInfo, "MP4 / WEB")) {
    webMP4 = true;
  }
  /*
  // 11/29/2022 change, check for dolby vision from the `HDR format` field of the first video stream

  if (_contains(mediaInfoText, "Dolby Vision")) {
    dolbyVision = true;
    hdr = true;
  }*/
  var mediaInfo=parseMediaInfo(group);
  // try to set the values, but if it fails then just leave them as being false
  try
  {
    hdr=mediaInfo.Video[0]["HDR format"].indexOf('HDR10 compatible')!=-1;
    dolbyVision=mediaInfo.Video[0]["HDR format"].indexOf('dvhe')!=-1;
  } catch(e) {}

  if (_contains(mediaInfoText, "Dolby Atmos") && !_contains(mediaInfoText, "MP4 / WEB")) {
    dolbyAtmos = true;
  }

  if (_contains(mediaInfoText, "HDR10+")) {
    hdrTenPlus = true;
    hdr = true;
  }

  if (
    _isExact(mediaInfoText, "HDR") ||
    _contains(mediaInfoText, "/ hdr /") ||
    _contains(mediaInfoText, "/ hdr10 /") ||
    _contains(mediaInfoText, "HDR10") ||
    _contains(mediaInfoText, "HDR10+ Profile B compatible") ||
    _contains(mediaInfoText, "Mastering display") ||
    (mediaInfo.Video.length>0 && mediaInfo.Video[0]["HDR format"])
  ) {
    hdr = true;
  }

  //check for HDR on UHD blu-ray (no HDR is uncommon)
  if (!hdr && _contains(shortInfo, "Blu-ray") && _contains(shortInfo, "2160p")) {
    addError(group, "No HDR metadata detected. Check for HDR to confirm.");
    log("checkHDR: No HDR metadata detected. Check for HDR to confirm.", "yellow", group);
    failed = true;
  }
  //check for an HDR 10-bit film
  else if (hdr && tenBit) {
    if (!_isExact(shortInfo, "HDR10") && !hdrTenPlus && !(dolbyVision)) {
      addError(group, "ShortInfo must contain HDR10.");
      log("checkHDR: ShortInfo must contain HDR10.", "red", group);
      failed = true;
    }

    if (!_isExact(shortInfo, "Dolby Vision") && dolbyVision) {
      addError(group, "ShortInfo must contain Dolby Vision.");
      log("checkHDR: ShortInfo must contain Dolby Vision.", "red", group);
      failed = true;
    }

    if (!_isExact(shortInfo, "HDR10+") && hdrTenPlus) {
      addError(group, "ShortInfo must contain HDR10+.");
      log("checkHDR: ShortInfo must contain HDR10+.", "red", group);
      failed = true;
    } else if (_isExact(shortInfo, "HDR10+") && _isExact(shortInfo, "HDR10")) {
      addError(group, "HDR10+ negates the need to mark as HDR10.");
      log("HDR10+ negates the need to mark as HDR10.", "red", group);
      failed = true;
    }

    if (_isExact(shortInfo, "HDR10") && _isExact(shortInfo, "10-bit")) {
      addError(group, "HDR10 negates the need to mark as 10-bit.");
      log("checkHDR: HDR10 negates the need to mark as 10-bit.", "red", group);
      failed = true;
    }
  }

  if (!_isExact(shortInfo, "Dolby Atmos") && dolbyAtmos) {
    addError(group, "ShortInfo must contain Dolby Atmos.");
    log("checkHDR: ShortInfo must contain Dolby Atmos.", "red", group);
    failed = true;
  }

  if (_isExact(shortInfo, "HDR10") || _isExact(shortInfo, "HDR10+")) {
    if (!hdr) {
      addError(group, "Shortinfo indicates HDR, but MI doesn't.");
      log("checkHDR: Shortinfo indicates HDR, but MI doesn't.", "red", group);
      failed = true;
    } else if (!tenBit) {
      addError(
        group,
        "Mediainfo doesn't reflect 10-bit, but shortinfo indicates. Confirm and edit if necessary."
      );
      log(
        "checkHDR: Mediainfo doesn't reflect 10-bit, but shortinfo indicates. Confirm and edit if necessary.",
        "red",
        group
      );
      failed = true;
    }
  }
  //check for a 10bit film that isn't HDR
  else if (!hdr && !webMP4) {
    if (tenBit && _doesntContain(shortInfo, "10-bit")) {
      addError(group, "Shortinfo must include 10-bit in edition field.");
      log("checkHDR: Shortinfo must include 10-bit in edition field.", "red", group);
      failed = true;
    } else if (!tenBit && _isExact(shortInfo, "10-bit")) {
      addError(
        group,
        "Mediainfo doesn't reflect 10-bit, but shortinfo indicates. Confirm and edit if necessary."
      );
      log(
        "checkHDR: Mediainfo doesn't reflect 10-bit, but shortinfo indicates. Confirm and edit if necessary.",
        "red",
        group
      );
      failed = true;
    }
  }

  if (!failed) log("checkHDR: checkHDR test passed.", "green", group);
}

function checkXcodeAud(group) {
  var shortInfo = getShortInfoText(group);
  if (
    _contains(shortInfo, "Blu-ray") ||
    _contains(shortInfo, "HD-DVD") ||
    _contains(shortInfo, "WEB") ||
    _contains(shortInfo, "AVI") ||
    _contains(shortInfo, "DVD5") ||
    _contains(shortInfo, "DVD9")
  ) {
    log("checkXcodeAud: Blu-ray, HD-DVD, WEB, AVI, DVD5, and DVD9 skipped. checkXcodeAud test passed.", "green", group);
    return;
  }
  var AudioInfo;
  AudioInfo = getMediaInfo(group)
    .find('caption.mediainfo__section__caption:contains("Audio")')
    .next()
    .text();
  if (_contains(AudioInfo, "AAC") || _contains(AudioInfo, "MP3")) {
    addError(group, "Audio may be transcoded.");
    log("checkXcodeAud: Audio may be transcoded.", "red", group);
  } else if (_contains(shortInfo, " DVD ") && !(_contains(AudioInfo, " AC-3") || _contains(AudioInfo, " DTS"))) {
    //} else if ((_contains(shortInfo, " DVD ") && !(_contains(shortInfo, " VOB IFO ") || _contains(shortInfo, " ISO "))) && !(_contains(AudioInfo, " AC-3 ") || _contains(AudioInfo, " DTS "))) {
    console.log(AudioInfo);
    addError(group, "Audio may be transcoded.");
    log("checkXcodeAud: DVD rip with audio not AC-3 or DTS. Audio may be transcoded.", "red", group);
  } else {
    log("checkXcodeAud: checkXcodeAud test passed.", "green", group);
    return;
  }
}

function checkHEVC(group) {
  var shortInfo = getShortInfoText(group);
  if (_contains(shortInfo, "HEVC")) {
    addError(group, "Shortinfo should be H.265 or x265, not HEVC. Please edit.");
    log("checkHEVC: Shortinfo should be H.265 or x265, not HEVC. Please edit.", "red", group);
  } else {
    log("checkHEVC: checkHEVC test passed.", "green", group);
  }
}

function checkCodec(group) {
  var shortInfo = getShortInfoText(group);
  var mediainfo = getMediaInfo(group);
  var micodec = mediainfo
  .find("table.mediainfo__section")
  .find('td:contains("Codec")')
  .next()
  .text();
  var sicodec = shortInfo.split(' / ')[0];
  //if its a source disc, skip it
  if (
    _contains(shortInfo, "BD25") ||
    _contains(shortInfo, "BD50") ||
    _contains(shortInfo, "BD66") ||
    _contains(shortInfo, "BD100") ||
    _contains(shortInfo, "DVD5") ||
    _contains(shortInfo, "DVD9")
  ) {
    log("checkCodec: Source discs are skipped. checkCodec test passed.", "green", group);
    return;
  }

  if(sicodec == 'h265')
  {
    addError(group, "ShortInfo is h265, should be H.265");
    log("checkCodec: shortInfo is h265, should be H.265", "red", group);
    return;
  }

  var codecs=[{micodec:"HEVC", sicodec:["H.265", "x265"]},
              {micodec:"h265", sicodec:["H.265"]},
              //{micodec:"x265", sicodec:["x265"]},
              {micodec:"h264", sicodec:["H.264"]},
              //{micodec:"x264", sicodec:["x264"]},
              //{micodec:"VC-1", sicodec:["VC-1"]},
              //{micodec:"XviD", sicodec:["XviD"]},
              //{micodec:"DivX", sicodec:["DivX"]},
              //{micodec:"", sicodec:[], extendedError:""},
             ];
  var standardError="Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.";
  micodec=micodec.split(' (')[0];
  /*
  if(split.length>1)
  {
    micodec=split[0];
    if(!_contains(shortInfo, '10-bit'))
    {
      addError(group, "MediaInfo codec is 10-bit but 10-bit is missing from shortInfo");
      log("checkCodec: MediaInfo codec is 10-bit but 10-bit is missing from shortInfo", "red", group);
    }
  }
  */
  if(micodec != sicodec)
  {
    var found=false;
    for(var i=0; i<codecs.length; i++)
    {
      if(_contains(micodec, codecs[i].micodec))
      {
        found=true;
        var foundCodec=false;
        for(var j=0; j<codecs[i].sicodec.length; j++)
        {
          if(_contains(shortInfo, codecs[i].sicodec[j]))
          {
            foundCodec=true;
            break;
          }
        }
        if(!foundCodec)
        {
          addError(group, standardError);
          log("checkCodec: "+standardError+"<br /><span style='position:relative; left:40px;'>MediaInfo codec is "+codecs[i].micodec+" and shortInfo is not "+codecs[i].sicodec.join(' or ')+"</span>", "red", group);
          return;
        }
        break;
      }
    }
    if(!found)
    {
      addError(group, standardError);
      log("checkCodec: "+standardError+"<br /><span style='position:relative; left:40px;'>Mediainfo codec is "+micodec+" and shortInfo codec is "+sicodec+"</span>", "red", group);
      return;
      //throw("MediaInfo codec not found in check. MediaInfo codec was "+micodec+", shortInfo codec was "+(shortInfo.split(' / ')[0]));
    }
  }
  log("checkCodec: checkCodec test passed.", "green", group);
  // Chameleon: I'm not sure who wrote the below comment, but I decided to refactor the code to something nicer - mostly because I needed to extend it
  //javascript is shit so im doing this in a... different way
  /*
  if (_contains(micodec, "HEVC")) {
    if (_contains(shortInfo, "H.265") || _contains(shortInfo, "x265")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "MI indicates UHD but shortInfo doesn't. Confirm and edit if necessary.");
      log(
        "checkCodec: MI indicates UHD but shortInfo doesn't. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is HEVC and shortInfo is not H.265/x265</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "h265")) {
    if (_contains(shortInfo, "H.265")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "MI indicates h265 but ShortInfo does not. Confirm and edit if necessary.");
      log(
        "checkCodec: ShortInfo indicates UHD but MI does not. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is H.265 and shortInfo codec is not h265</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "x265")) {
    if (_contains(shortInfo, "x265")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "MI indicates x265 but ShortInfo does not. Confirm and edit if necessary.");
      log(
        "checkCodec: ShortInfo indicates UHD but MI does not. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is H.265 and shortInfo codec is not h265</span>",
        "red",
        group
      );
    }
  } else if (_contains(shortInfo, "H.265") || _contains(shortInfo, "265")) {
    if (_contains(micodec, "HEVC") || _contains(micodec, "265")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "ShortInfo indicates UHD but MI does not. Confirm and edit if necessary.");
      log(
        "checkCodec: ShortInfo indicates UHD but MI does not. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>shortInfo codec is H.265/x265 and MI codec is not HEVC/x265</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "h264")) {
    if (_contains(shortInfo, "H.264")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.");
      log(
        "checkCodec: Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is h264 and shortInfo codec is not H.264</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "x264")) {
    if (_contains(shortInfo, "x264")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.");
      log(
        "checkCodec: Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is x264 and shortInfo codec is not x264</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "x265")) {
    if (_contains(shortInfo, "x265")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.");
      log(
        "checkCodec: Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is x265 and shortInfo codec is not x265</span>",
        "red",
        group
      );
    }
  } else if (_contains(micodec, "VC-1")) {
    if (_contains(shortInfo, "VC-1")) {
      log("checkCodec: checkCodec test passed.", "green", group);
      return;
    } else {
      addError(group, "Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.");
      log(
        "checkCodec: Mismatch between MI Codec and shortInfo Codec. Confirm and edit if necessary.<br />" +
        "<span style='position:relative; left:40px;>MI codec is VC-1 and shortInfo codec is not VC-1</span>",
        "red",
        group
      );
    }
  } else {
    log("checkCodec: checkCodec test passed.", "green", group);
    return;
  }
  */
}

function checkSource(group)
{
  var shortInfo = getShortInfoText(group);
  var res = getResolution(group);
  if(_contains(shortInfo, "DVD") && !_contains(shortInfo, "HD-DVD")) {
    if(_contains(shortInfo, "720p")) {
      addError(group, "DVDs cannot be 720p.");
      log("checkSource: DVDs cannot be 720p.", "red", group);
    } else if(_contains(shortInfo, "1080p")) {
      addError(group, "DVDs cannot be 1080p.");
      log("checkSource: DVDs cannot be 1080p.", "red", group);
    } else if(_contains(shortInfo, "2160p")) {
      addError(group, "DVDs cannot be 2160p.");
      log("checkSource: DVDs cannot be 2160p.", "red", group);
    }
  }
}

function checkSDHDres(group) {
  var shortInfo = getShortInfoText(group);
  let resolutions=[{group:'480p', upper:854, lower:480},
                   {group:'576p', upper:1024, lower:576},
                   {group:'720p', upper:1280, lower:720},
                   {group:'1080p', upper:1920, lower:1080},
                   {group:'2160p', upper:3840, lower:2160},
                  ];
  var res = getResolution(group);
  var movieAR = false;
  try
  {
    movieAR = $("#movieinfo").find('strong:contains("AR")');
    movieAR = movieAR[0].nextSibling.nodeValue.trim();
    if((movieAR.match(/:/g)||[]).length==2)
      movieAR=movieAR.replace(/:/,'.');
    movieAR=parseFloat(movieAR.split(":")[0])/parseFloat(movieAR.split(":")[1]);
  } catch(e){}
  if (_contains(shortInfo, "264")) {
    let found=false;
    for(var i=0; i<resolutions.length; i++)
    {
      let r=resolutions[i];
      if(_contains(shortInfo, r.group)) {
        found=true;

        if(movieAR && !isNaN(movieAR))
        {
          let perfectHeight=Math.round(r.upper/movieAR);
          //let perfectWidth=Math.round(r.lower/movieAR.h);
          if(perfectHeight<=r.lower)
          {
            if(res[0]==r.upper && res[1]==perfectHeight) {}
            else {
              //addError(group, "Torrent resolution is not perfect. "+r.group+" with an aspect ratio of "+_prettyNumber(movieAR)+":1 must be "+r.upper+"x"+perfectHeight+".");
              log("checkSDHDres: Torrent resolution is not perfect. "+r.group+" with an aspect ratio of "+_prettyNumber(movieAR)+":1 must be "+r.upper+"x"+perfectHeight+" (torrent is "+res[0]+"x"+res[1]+"). Imdb aspect ratio might be wrong.", "yellow", group);
            }
          }
          else
          {
            let perfectWidth=Math.round(r.lower*movieAR);
            if(res[0]==perfectWidth && res[1]==r.lower) {}
            else {
              //addError(group, "Torrent resolution is not perfect. "+r.group+" with an aspect ratio of "+_prettyNumber(movieAR)+":1 must be "+perfectWidth+"x"+r.lower+".");
              log("checkSDHDres: Torrent resolution is not perfect. "+r.group+" with an aspect ratio of "+_prettyNumber(movieAR)+":1 must be "+perfectWidth+"x"+r.lower+" (torrent is "+res[0]+"x"+res[1]+"). Imdb aspect ratio might be wrong.", "yellow", group);
            }
          }
        }
        //else
        {
          // Chameleon: Slightly unorthodox 'do nothing' passing ifs; the logic made more sense to me this way rather than inverting it to find the fails
          if (res[0]==r.upper && res[1]==r.lower) {}
          else if (res[0]==r.upper && res[1]<=r.lower) {}
          else if (res[0]<=r.upper && res[1]==r.lower) {}
          else if (r.group=='1080p' || r.group=='2160p')
          {
            //addError(group, "Torrent may be non-conform resolution.");
            log("checkSDHDres: Torrent may be non-conform resolution. "+r.group+" should maximise "+r.upper+"x"+r.lower+" (torrent is "+res[0]+"x"+res[1]+").", "yellow", group);
          }
          else {
            addError(group, "Non-conform resolution. "+r.group+" must maximise "+r.upper+"x"+r.lower+".");
            log("checkSDHDres: Non-conform resolution. "+r.group+" must maximise "+r.upper+"x"+r.lower+" (torrent is "+res[0]+"x"+res[1]+").", "red", group);
          }
        }
      }
    }
    if(!found)
    {
      // Couldn't find the resolution group - we want to know what the hell is going on with this torrent so we can add it to the test (new HD resolution?)
      // ... Turns out, no, sometimes people just don't put in the resolution group and it's legitimately trumpable as non-conform resolution
      //throw 'checkSDHDres: unknown resolution group '+shortInfo;
    }
  } else {
    log("checkSDHDres: checkSDHDres test passed.", "green", group);
    return;
  }
}


function checkMediaInfoSizes(group)
{
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkMediaInfoSizes: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  var generalSize = 0;
  try
  {
    let fileSize=mediaInfo.General['File size'];
    if(!fileSize) fileSize=mediaInfo.General['File Size'];
    generalSize=unsize(fileSize.replace(/(\d)\s+(?=\d)/g, '$1'));
  } catch(e) { log("checkMediaInfoSizes: couldn't get General File size", "yellow", group); }
  var totalSize=0;
  for(var i=0; i<mediaInfo.Video.length; i++)
  {
    try
    {
      totalSize+=unsize(mediaInfo.Video[i]['Stream size'].replace(/(\d)\s+(?=\d)/g, '$1'));
    } catch(e){}
  }
  if(totalSize==0)
  {
    log("checkMediaInfoSizes: checkMediaInfoSizes test passed - no video stream sizes found, aborting.", "green", group);
    return;
  }
  var totalVideoSize=totalSize;
  for(var i=0; i<mediaInfo.Audio.length; i++)
  {
    try
    {
      totalSize+=unsize(mediaInfo.Audio[i]['Stream size'].replace(/(\d)\s+(?=\d)/g, '$1'));
    } catch(e){}
  }
  if(totalSize*0.98 > generalSize)
  {
    addError(group, "MediaInfo General File size is smaller than the sum of video track sizes.");
    log("checkMediaInfoSizes: MediaInfo General File size is smaller than 98% of the sum of video track sizes.", "red", group);
    return;
  }
  if(totalSize==totalVideoSize && totalSize<generalSize)
  {
    log("checkMediaInfoSizes: checkMediaInfoSizes test passed - no audio stream sizes found and the total video stream sizes are smaller than the General File size.", "green", group);
    return;
  }
  var percent=(Math.abs(generalSize-totalSize)/generalSize)*100;
  if(percent>10)
  {
    addError(group, "MediaInfo General size is more than 10% different than the sum of video and audio track sizes.");
    log("checkMediaInfoSizes: MediaInfo General size is more than 10% different than the sum of video and audio track sizes. <br />&nbsp;&nbsp; General: "+resizeBytes(generalSize)+
        ", Total: "+resizeBytes(totalSize)+" ("+(Math.round(percent*100)/100)+"% difference)", "red", group);
  }
  else
  {
    log("checkMediaInfoSizes: checkMediaInfoSizes test passed.", "green", group);
    return;
  }
}

function checkContainer(group) {
  var shortInfo = getShortInfoText(group);
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkContainer: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }

  var failed=false;

  var pairs=[
    ["MKV", "Matroska"],
    ["MP4", "MPEG-4"],
    ["AVI", "AVI"],
    ["ISO / DVD", "DVD Video"],
    ["m2ts", "BDAV"],
    ["ISO / Blu-ray", "BDAV"],
    ["TS", "MPEG-TS"]
  ];
  for(var i=0; i<pairs.length; i++)
  {
    var p=pairs[i];
    if(_contains(shortInfo, ' '+p[0]) && mediaInfo.General.Format != p[1])
    {
      addError(group, "MediaInfo container doesn't match shortInfo.");
      log("checkContainer: shortInfo shows container of "+p[0]+", MediaInfo shows "+mediaInfo.General.Format, "red", group);
      failed=true;
      break;
    }
  }

  var fileTRs=document.getElementById('files_'+group[0].id.substring(8)).getElementsByTagName('tr');
  var files=[];
  for(var i=1; i<fileTRs.length; i++)
  {
    files.push(fileTRs[i].getElementsByTagName('td')[0].textContent);
  }

  var found=false;
  if(_doesntContain(shortInfo, "m2ts"))
  {
    for(var i=0; i<pairs.length; i++)
    {
      for(var j=0; j<files.length; j++)
      {
        var extension=files[j].split('\.');
        if(extension[extension.length-1].toLowerCase()==pairs[i][0].split(' ')[0].toLowerCase())
        {
          found=true;
          break;
        }
      }
      if(found) break;
    }
  }

  if(!found)
  {
    var extension=getMediaInfo(group).get()[0].previousElementSibling.textContent.split(/\./);
    if(extension.length==1 && _doesntContain(shortInfo, "m2ts"))
    {
      addError(group, "MediaInfo file doesn't have a file extension and isn't m2ts.");
      log("checkContainer: MediaInfo file doesn't have a file extension and isn't m2ts.", "red", group);
      failed=true;
    }
    else if(_doesntContain(shortInfo, "m2ts"))
    {
      for(var i=0; i<pairs.length; i++)
      {
        var p=pairs[i];
        if(_contains(shortInfo, ' '+p[0]) && extension[extension.length-1].toLowerCase() !== p[0].split(' ')[0].toLowerCase())
        {
          addError(group, "MediaInfo file doesn't match shortInfo.");
          log("checkContainer: MediaInfo file has an extension of "+extension[extension.length-1].toLowerCase()+" but shortInfo has "+p[0].toLowerCase()+".", "red", group);
          failed=true;
          break;
        }
      }
    }
    var container=shortInfo.split(' / ')[1];
    var skips=['m2ts', 'VOB IFO'];
    if(!failed && skips.indexOf(container)==-1)
    {
      addError(group, "File extension doesn't match MediaInfo extension.");
      log("checkContainer: MediaInfo file extension doesn't match any file in the file list.", "red", group);
      failed=true;
    }
  }

  if(!failed)
  {
    log("checkContainer: Containers match, passed.", "green", group);
  }
}

function checkAudio(group) {
  var shortInfo = getShortInfoText(group);
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkAudio: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  if(!_contains(mediaInfo.General.Format.toLowerCase(), "dvd video") && !_contains(mediaInfo.General.Format.toLowerCase(), "bdav"))
  {
    let foundPCM=false;
    for(var i=0; i<mediaInfo.Audio.length; i++)
    {
      if(mediaInfo.Audio[i].Format=="PCM")
      {
        log("checkAudio: Torrent has PCM audio (track "+(i+1)+") and is not an untouched DVD or BluRay.", "red", group);
        foundPCM=true;
      }
    }
    if(foundPCM)
    {
      addError(group, "PCM audio detected.");
      return;
    }
  }
  if (_doesntContain(shortInfo, "2160p")) {
    log("checkAudio: All but 2160p skip this test. checkAudio test passed.", "green", group);
    return;
  }
  var mediaInfoText = group.find("blockquote.spoiler").text();
  if (_contains(mediaInfoText, "Dolby Atmos") && _doesntContain(shortInfo, "Dolby Atmos")) {
    addError(group, "shortInfo must contain Dolby Atmos");
    log("checkAudio: shortInfo must contain Dolby Atmos if it contains Atmos.", "red", group);
  } else if (_contains(shortInfo, "Dolby Atmos") && _doesntContain(mediaInfoText, "Atmos")) {
    addError(group, "shortInfo indicates Atmos but MI doesn't. Confirm.");
    log("checkAudio: shortInfo indicates Atmos but MI doesn't. Confirm.", "red", group);
  }
  if (_contains(mediaInfoText, "DTS:X") || _contains(mediaInfoText, "X / MA")) {
    if (_doesntContain(shortInfo, "DTS:X")) {
      addError(group, "shortInfo must contain DTS:X");
      log("checkAudio: mediaInfo contains DTS:x(X / MA) so shortInfo must contain DTS:X.", "red", group);
    } else {
      log("checkAudio: checkAudio test passed.", "green", group);
      return;
    }
  } else if (_contains(shortInfo, "DTS:X")) {
    if (_doesntContain(mediaInfoText, "DTS:X") && _doesntContain(mediaInfoText, "Format profile : X") && mediaInfo.Audio[0].Format!=="DTS XLL X") {
      addError(group, "shortInfo indicates DTS:X but MI doesn't. Confirm.");
      log("checkAudio: shortInfo indicates DTS:X but MI doesn't. Confirm.", "red", group);
    } else {
      log("checkAudio: checkAudio test passed.", "green", group);
      return;
    }
  } else {
    log("checkAudio: checkAudio test passed.", "green", group);
    return;
  }
}

function checkCommentary(group) {
  var AudioInfoHeading = getMediaInfo(group)
  .find('caption.mediainfo__section__caption:contains("Audio")');
  var mediaInfo = parseMediaInfo(group);
  if(!mediaInfo)
  {
    log("checkCommentary: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }
  var AudioInfo=AudioInfoHeading
  .next()
  .text();
  var trackCount=AudioInfoHeading[0].parentNode.querySelectorAll('tr').length;
  var shortInfo=getShortInfoText(group);
  if (_contains(AudioInfo, "Commentary")) {
    if (_doesntContain(shortInfo, "With Commentary")) {
      addError(group, "shortInfo should contain 'With Commentary'");
      log("checkCommentary: shortInfo should contain 'With Commentary'.", "red", group);
    } else {
      log(
        "checkCommentary: checkCommentary test passed (has commentary and 'With Commentary' in shortInfo).",
        "green",
        group
      );
      return;
    }
  } else if (trackCount>1 && (_doesntContain(shortInfo, "With Commentary") && _doesntContain(shortInfo, "Dual Audio")) && (_doesntContain(shortInfo, "VOB IFO") && _doesntContain(shortInfo, "m2ts") && _doesntContain(shortInfo, "ISO"))) {
    console.log(_doesntContain(shortInfo, "With Commentary"));
    console.log(_doesntContain(shortInfo, "Dual Audio"));
    console.log(shortInfo);
    addError(group, "shortInfo doesn't have 'With Commentary' or 'Dual Audio' with "+trackCount+" audio tracks");
    log("checkCommentary: checkCommentary warning - more than one audio track but shortInfo doesn't contain 'With Commentary' or 'Dual Audio'; check to be sure it doesn't need it.", "red", group);
  } else {
    log("checkCommentary: checkCommentary test passed (no commentary).", "green", group);
    return;
  }
}

/**
 * Check if the torrent has extraneous files
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkExtraneousFiles(group) {
  var blacklist=[/.srm$/, /.h264$/, /.ac3$/, /.dts$/, /.m4a$/, /.dtsma$/, /.h265$/, /.thd$/, /.wav$/, /esktop.ini$/, /humbs.db$/, /.xml$/, /.DS_Store$/, /.miniso$/];
  var failed=false;
  var fileRows=document.getElementById('files_'+group[0].id.substring(8)).getElementsByTagName('tr');
  for(var i=1; i<fileRows.length; i++)
  {
    for(var j=0; j<blacklist.length; j++)
    {
      var file=fileRows[i].firstElementChild.textContent;
      if(file.match(blacklist[j])!==null && !(j==11 && _contains(getShortInfoText(group), "m2ts")))
      {
        failed=true;
        var fileExt=blacklist[j].toString().replace(/[\/\$]/g, '');
        log("checkExtraneousFiles: '"+file+"' has an extension that is on the extraneous files list.", "red", group);
        addError(group, "Has extraneous files.");
      }
    }
  }
  if(!failed)
    log("checkExtraneousFiles: No extraneous files found.", "green", group);
}

/**
 * Check if the torrent has bloated audio
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkBloatedAudio(group)
{
  var shortInfo = getShortInfoText(group);
  var mediaInfo = parseMediaInfo(group);
  var torrentType = getType(group);
  var live=false;
  if(torrentType=='Live Performance') live=true;
  var live_message=' Can be ignored due to Live Performance category.';
  var uploadYear=parseInt(group[0].querySelector('.time').title.split(' ')[2]);

  if(!mediaInfo)
  {
    log("checkBloatedAudio: Unable to run test, can't find mediaInfo", "red", group);
    return;
  }

  if(_contains(shortInfo, "VOB IFO") || _contains(shortInfo, "Remux") || _contains(shortInfo, "m2ts") || _contains(shortInfo, "ISO"))
  {
    log("checkBloatedAudio: Untouched uploads can't be bloated.", "green", group);
    return;
  }

  if(_contains(shortInfo, "2160p"))
  {
    log("checkBloatedAudio: 2160p encodes can do what they like.", "green", group);
    return;
  }

  if(mediaInfo.Audio.length==0)
  {
    addError(group, "No audio.");
    log("checkBloatedAudio: No audio tracks found, make sure that's right.", "yellow", group);
    return;
  }


  var mf=mediaInfo.Audio[0].Format;
  var bloatedFormats=["PCM", "DTS-MA", "DTS-HD HR", "DTS XBR", "MLP FBA", "MLP FBA 16-ch", "TrueHD", "DTS XLL", "DTS XLL X", "DTS ES XLL"];
  //if(mf=="PCM" || mf=="DTS-MA" || mf=="DTS-HD HR" || mf=="DTS XBR" || mf=="MLP FBA" || mf=="MLP FBA 16-ch" || mf=="TrueHD" || mf=="DTS XLL" || mf=="DTS XLL X" || (mf=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="24 bits"))
  if(bloatedFormats.indexOf(mf)!=-1 || (mf=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="24 bits"))
  {
    var displayName=mediaInfo.Audio[0]["Commercial name"]?mediaInfo.Audio[0]["Commercial name"]:mediaInfo.Audio[0].Format;
    if(mf=="FLAC" && uploadYear<2020)
    {
      log("checkBloatedAudio: Primary audio track is "+(mediaInfo.Audio[0].Format=="FLAC"?"24-bit ":"")+displayName+". Can be ignored for legacy uploads before 2020.", "yellow", group);
      return;
    }
    if(!live)
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Primary audio track is "+(mediaInfo.Audio[0].Format=="FLAC"?"24-bit ":"")+displayName+".", "red", group);
    }
    else
    {
      log("checkBloatedAudio: Primary audio track is "+(mediaInfo.Audio[0].Format=="FLAC"?"24-bit ":"")+displayName+"."+live_message, "yellow", group);
    }
    return;
  }

  if(mediaInfo.Audio[0]["Format/Info"]=="Digital Theater Systems" && mediaInfo.Audio[0]["Format profile"]=="MA / Core")
  {
    if(!live)
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Primary audio track is DTS-MA.", "red", group);
    }
    else
    {
      log("checkBloatedAudio: Primary audio track is DTS-MA."+live_message, "yellow", group);
    }
    return;
  }

  if(mediaInfo.Audio[0]["Format/Info"]=="Digital Theater Systems" && mediaInfo.Audio[0]["Channel(s)"]=="2 channels")
  {
    if(uploadYear<2020)
    {
      log("checkBloatedAudio: Primary audio track is DTS but is a stereo track. Can be ignored for legacy uploads before 2020.", "yellow", group);
      return;
    }
    if(!live)
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Primary audio track is DTS but is a stereo track.", "red", group);
    }
    else
    {
      log("checkBloatedAudio: Primary audio track is DTS but is a stereo track."+live_message, "yellow", group);
    }
    return;
  }

  if(mediaInfo.Audio[0]["Format/Info"]=="Digital Theater Systems" && mediaInfo.Audio[0]["Channel(s)"]=="1 channel")
  {
    if(uploadYear<2020)
    {
      log("checkBloatedAudio: Primary audio track is DTS but is a mono track. Can be ignored for legacy uploads before 2020.", "yellow", group);
      return;
    }
    if(!live)
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Primary audio track is DTS but is a mono track.", "red", group);
    }
    else
    {
      log("checkBloatedAudio: Primary audio track is DTS but is a mono track."+live_message, "yellow", group);
    }
    return;
  }

  for(var i=1; i<mediaInfo.Audio.length; i++)
  {
    if(mediaInfo.Audio[1].Format=='FLAC' && mediaInfo.Audio[i]["Bit depth"]=="24 bits")
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Audio track "+(i+1)+" is 24-bit FLAC.", "red", group);
      return;
    }
  }

  log("checkBloatedAudio: Audio is not bloated.", "green", group);
  return; // no longer use the whitelist

  if(_isSD(shortInfo))
  {
    if(mediaInfo.Audio[0].Format!=="AAC" && mediaInfo.Audio[0].Format!=="AC3" && !(mediaInfo.Audio[0].Format=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="16 bits"))
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Audio track 1 wasn't AAC, AC3, or 16-bit FLAC.", "red", group);
    }
    for(var i=1; i<mediaInfo.Audio.length; i++)
    {
      if(mediaInfo.Audio[i].Format!=="AAC")
      {
        addError(group, "Bloated audio.");
        log("checkBloatedAudio: Audio track "+(i+1)+" wasn't AAC.", "red", group);
      }
    }
  }
  if(_contains(shortInfo, "720p"))
  {
    if(mediaInfo.Audio[0].Format!=="DTS" && mediaInfo.Audio[0].Format!=="AAC" && mediaInfo.Audio[0].Format!=="AC3" && !(mediaInfo.Audio[0].Format=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="16 bits"))
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Audio track 1 wasn't DTS, AAC, AC3, or 16-bit FLAC.", "red", group);
    }
    for(var i=1; i<mediaInfo.Audio.length; i++)
    {
      console.log(mediaInfo.Audio[i].Format);
      if(mediaInfo.Audio[i].Format!=="AAC")
      {
        addError(group, "Bloated audio.");
        log("checkBloatedAudio: Audio track "+(i+1)+" wasn't AAC.", "red", group);
      }
    }
  }
  if(_contains(shortInfo, "1080p"))
  {
    if(mediaInfo.Audio[0].Format!=="E-AC3" && !(mediaInfo.Audio[0].Format=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="16 bits"))
    {
      addError(group, "Bloated audio.");
      log("checkBloatedAudio: Audio track 1 wasn't E-AC3 or 16-bit FLAC.", "red", group);
    }
    for(var i=1; i<mediaInfo.Audio.length; i++)
    {
      if(mediaInfo.Audio[i].Format!=="AAC" && !(mediaInfo.Audio[0].Format=="FLAC" && mediaInfo.Audio[0]["Bit depth"]=="16 bits"))
      {
        addError(group, "Bloated audio.");
        log("checkBloatedAudio: Audio track "+(i+1)+" wasn't AAC or 16-bit FLAC.", "red", group);
      }
    }
  }
  if(_contains(shortInfo, "2160p"))
  {
    for(var i=1; i<mediaInfo.Audio.length; i++)
    {
      if(mediaInfo.Audio[i].Format!=="FLAC" && mediaInfo.Audio[i]["Bit depth"]!=="16 bits")
      {
        addError(group, "Bloated audio.");
        log("checkBloatedAudio: Audio track "+(i+1)+" wasn't 16-bit FLAC.", "red", group);
      }
    }
  }
}

function checkRemuxLosslessAudio(group)
{
  var shortInfo = getShortInfoText(group);
  var mediaInfo = parseMediaInfo(group);
  if(shortInfo.indexOf('Remux')==-1)
  {
    log("checkRemuxLosslessAudio: checkRemuxLosslessAudio test passed, torrent isn't a Remux.", "green", group);
    return;
  }
  var found=false;
  for(var i=0; i<mediaInfo.Audio.length; i++)
  {
    try
    {
      if(mediaInfo.Audio[i]['Compression mode'].indexOf('Lossless')!=-1)
      {
        found=true;
        break;
      }
    }
    catch(e)
    {
      if(mediaInfo.Audio[i].Format!="PCM")
      {
        log("checkRemuxLosslessAudio: Remux audio track "+(i+1)+" doesn't have a compression mode and isn't PCM. Unable to check.", "yellow", group);
        return;
      }
      found=true;
      break;
    }
  }
  if(!found)
  {
    addError(group, "Remux with no lossless audio");
    log("checkRemuxLosslessAudio: Remux with no lossless audio. Check if source has lossless available.", "red", group);
  }
  else
  {
    log("checkRemuxLosslessAudio: checkRemuxLosslessAudio test passed, torrent has a lossless audio track.", "green", group);
  }
}

function parseMediaInfo(group)
{
  var mediaInfo=getMediaInfo(group);
  var text="";
  try
  {
    text=mediaInfo.get()[0].nextElementSibling.textContent;
  }
  catch(e)
  {
    return false;
  }
  var sections=text.split(/\n\s*\n/);
  var mediaInfoObject={General:{}, Video:[], Audio:[], Text:[]};
  if(sections[0].split('\n')[0].trim()!="General")
  {
    // Chameleon: Eh, nothing uses BDInfo checks except the container check
    //   leave parsing this out properly until it's needed
    // Chameleon: *A few years later* "The time has come, the walrus said"
    mediaInfoObject.General.Format='BDAV';
    if(text.indexOf('DISC INFO:')==-1 && text.indexOf('PLAYLIST REPORT:')==-1)
    {
      mediaInfoObject={type:"Quick Summary"};
      var lines=sections[0].split('\n');
      for(var i=0; i<lines.length; i++)
      {
        var l=lines[i];
        var separateAt=l.indexOf(':');
        var field=l.substring(0, separateAt).trim();
        var value=l.substring(separateAt+1).trim();
        mediaInfoObject[field]=value;
      }
      mediaInfoObject.General={Format:'BDAV'};
      mediaInfoObject.Text=[];
      mediaInfoObject.Video=[];
      return mediaInfoObject;
    }

    //if(sections[0].split('\n')[0].trim()!="DISC INFO:") return mediaInfoObject;
    var general=sections.indexOf("DISC INFO:")+1;
    if(sections[general+1].indexOf('Disc Label:')==0) sections[general]+='\n'+sections[general+1];
    var lines=sections[general].split('\n');
    for(var i=0; i<lines.length; i++)
    {
      var l=lines[i];
      var separateAt=l.indexOf(':');
      var field=l.substring(0, separateAt).trim();
      var value=l.substring(separateAt+1).trim();
      mediaInfoObject.General[field]=value;
    }
    var playlistReport=sections.indexOf("PLAYLIST REPORT:")+1;
    var lines=sections[playlistReport].split('\n');
    mediaInfoObject.Playlist_Report={};
    for(var i=0; i<lines.length; i++)
    {
      var l=lines[i];
      var separateAt=l.indexOf(':');
      var field=l.substring(0, separateAt).trim();
      var value=l.substring(separateAt+1).trim();
      mediaInfoObject.Playlist_Report[field]=value;
    }
    return mediaInfoObject;
  }
  for(var i=0; i<sections.length; i++)
  {
    var section=sections[i];
    var object={};
    var lines=section.split('\n');
    var sectionName=lines[0].trim();
    for(var j=1; j<lines.length; j++)
    {
      var line=lines[j];
      var separateAt=line.indexOf(' : ');
      var space=3;
      if(separateAt==-1)
      {
        separateAt=line.indexOf(':');
        space=2;
      }
      var field=line.substring(0, separateAt).trim();
      var value=line.substring(separateAt+space).trim();
      object[field]=value;
    }
    if(sectionName=='General')
      mediaInfoObject.General=object;
    else if(sectionName.split(' #')[0]=='Video')
      mediaInfoObject.Video.push(object);
    else if(sectionName.split(' #')[0]=='Audio')
      mediaInfoObject.Audio.push(object);
    else if(sectionName.split(' #')[0]=='Text')
      mediaInfoObject.Text.push(object);
    else
      mediaInfoObject[sectionName]=object;
  }
  return mediaInfoObject;
}

/**
 * Check the right IFO/VOB was selected
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return null
 */
function checkDVDVOBIFO(group) {
  if (getShortInfoText(group).indexOf("VOB IFO") == -1) {
    log("checkDVDVOBIFO: checkDVDVOBIFO test passed, torrent isn't a DVD.", "green", group);
    return;
  }

  var failed = false;

  var mediainfos = group.find("table.mediainfo--in-release-description").get();

  var ifo = false;
  var ifoName='';
  for (var i = 0; i < mediainfos.length; i++) {
    if (mediainfos[i].previousElementSibling.textContent.toLowerCase().indexOf(".ifo") != -1) {
      ifo = mediainfos[i];
      ifoName=ifo.previousElementSibling.textContent.toLowerCase().split(/[0-9].ifo$/)[0];
      break;
    }
  }
  if (!ifo) {
    addError(group, "Missing IFO mediainfo");
    log("checkDVDVOBIFO: Missing IFO mediainfo.", "red", group);
    failed=true;
  }
  var vob = false;
  var vobName='';
  for(var i=0; i<mediainfos.length; i++)
  {
    if(mediainfos[i].previousElementSibling.textContent.toLowerCase().indexOf(".vob") != -1) {
      vob = mediainfos[i];
      vobName=vob.previousElementSibling.textContent.toLowerCase().split(/[0-9].vob$/)[0];
      break;
    }
  }
  if (!vob) {
    addError(group, "Missing VOB mediainfo");
    log("checkDVDVOBIFO: Missing VOB mediainfo.", "red", group);
    failed=true;
  }

  if(vobName !== ifoName)
  {
    addError(group, "IFO and VOB do not match");
    log("checkDVDVOBIFO: IFO and VOB do not match.", "red", group);
    failed=true;
  }

  for(var i=0; i<mediainfos.length; i++)
  {
    if(mediainfos[i].previousElementSibling.textContent.match(/.BUP$/)!==null)
    {
      addError("MediaInfo detected for .BUP file");
      log("checkDVDVOBIFO: MediaInfo for .BUP file", "red", group);
      failed=true;
    }
  }

  var ifoRuntime = false;
  try {
    ifoRuntime = _runtimeInSeconds(
      $(ifo)
      .find("td td:contains('Runtime:')")
      .get()[0]
      .nextElementSibling.textContent.trim()
    );
  } catch (e) {
    log("checkDVDVOBIFO: Couldn't find Runtime from IFO.", "yellow", group);
    failed=true;
  }
  var movieRuntime = $("#movieinfo").find('strong:contains("Runtime")');
  movieRuntime = _runtimeInSeconds(
    movieRuntime
    .parent()
    .text()
    .substring(9)
  );
  if (Math.abs(ifoRuntime - movieRuntime) > 120) {
    log(
      "checkDVDVOBIFO: IFO runtime is more than two minutes different than Movie Info runtime.",
      "yellow",
      group
    );
    failed = true;
  }

  // The chosen VOB/IFO should be for the main feature, which should be the largest sum of .VOB filesizes?
  var files=document.getElementById('files_'+group[0].id.substring(8)).getElementsByTagName('tr');
  /*var files = group
    .find("#files_" + group.selector.split("_")[1])
    .get()[0]
    .getElementsByTagName("tr");*/
  var largest = { ifo: "", size: 0 };
  var vobTotal = 0;
  var ifoName = "";
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    if (f.firstElementChild.textContent.toLowerCase().indexOf(".ifo") != -1) {
      if (vobTotal > largest.size) {
        largest = { ifo: ifoName, size: vobTotal };
      }
      ifoName = f.firstElementChild.textContent.split("/");
      ifoName = ifoName[ifoName.length - 1];
      vobTotal = 0;
    } else if (f.firstElementChild.textContent.toLowerCase().indexOf(".vob" != -1)) {
      vobTotal += unsize(f.lastElementChild.textContent);
    }
  }
  if(vobTotal > largest.size) {
    largest = { ifo: ifoName, size: vobTotal };
  }

  if (ifo.previousElementSibling.textContent != largest.ifo) {
    log(
      "checkDVDVOBIFO: Mediainfo IFO isn't from the largest sum of VOB files<br />" +
      "<span style='position:relative; left:40px;'>Check if the correct IFO is: " +
      largest.ifo +
      "</span>",
      "yellow",
      group
    );
    failed = true;
  }

  if (!failed) {
    log("checkDVDVOBIFO: IFO and VOB look right.", "green", group);
  }
}

// convert KiB/MiB/GiB notation to bytes
function unsize(size) {
  size = size.replace(/,/g, "");
  if (size.indexOf("KiB") != -1) {
    return parseFloat(size) * Math.pow(1024, 1);
  }
  if (size.indexOf("MiB") != -1) {
    return parseFloat(size) * Math.pow(1024, 2);
  }
  if (size.indexOf("GiB") != -1) {
    return parseFloat(size) * Math.pow(1024, 3);
  }
}

function resizeBytes(size)
{
  var i=1;
  var comparison=size/Math.pow(1024, i);
  while(comparison>1)
  {
    i++;
    comparison=size/Math.pow(1024, i);
  }
  var suffixes=['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  return Math.round((size/Math.pow(1024, i-1)*100))/100+' '+suffixes[i-1];
}

// convert runtime from '1d 1h 23mn 5s' format to the equivalent number of seconds
function _runtimeInSeconds(time) {
  var total = 0;
  if (time.indexOf("d") != -1) {
    total += parseInt(time) * (60 * 60 * 24);
    time = time.split("d ")[1];
  }
  if (time && time.indexOf("h") != -1) {
    total += parseInt(time) * (60 * 60);
    time = time.split("h ")[1];
  }
  if (time && time.indexOf("mn") != -1) {
    total += parseInt(time) * 60;
    time = time.split("mn ")[1];
  }
  if (time && time.indexOf("s") != -1) {
    total += parseInt(time);
  }
  return total;
}

// Calculate alternative DAR resolution
function displayAltDar(group, resolution) {
  var DARWidth = resolution[0];
  var DARHeight = resolution[1];
  var SARWidth = resolution[2];
  var SARHeight = resolution[3];
  var torrentAR = _getTorrentAspectRatio(group).split(":");
  var darRes;

  if (DARWidth === SARWidth) {
    DARHeight = SARHeight.toFixed();
    if (torrentAR.length === 1) {
      DARWidth = (SARHeight * torrentAR[0]).toFixed();
    } else {
      DARWidth = DARWidth = ((SARHeight / torrentAR[1]) * torrentAR[0]).toFixed();
    }
  } else if (DARHeight === SARHeight) {
    DARWidth = SARWidth.toFixed();
    if (torrentAR.length === 1) {
      DARHeight = (SARWidth / torrentAR[0]).toFixed();
    } else {
      DARHeight = ((SARWidth / torrentAR[0]) * torrentAR[1]).toFixed();
    }
  }

  darRes = DARWidth + "x" + DARHeight;

  getMediaInfo(group)
    .find("table.mediainfo__section")
    .find('td:contains("~>")')
    .append('<span class="dar-res" title="Alternative DAR Resolution">' + " (" + darRes + ")" + "</span>");

  $(group)
    .find("span.dar-res")
    .css("color", "#c5c5c5");
}

/**
 * Put a red border around any images that are the incorrect size
 * @param {object} group - The $ "group" element to run the analysis on.
 * @param {object} image - The html image element to run the analysis on.
 * @param {array} resolution - [DARWidth, DARHeight, SARWidth, SARHeight]
 * @param {int} key - The image index
 * @return null
 */
function validateImage(group, image, resolution, key) {
  var DARWidth = resolution[0];
  var DARHeight = resolution[1];
  var SARWidth = resolution[2];
  var SARHeight = resolution[3];
  var imageWidth = image.naturalWidth;
  var imageHeight = image.naturalHeight;
  var imageRes = +imageWidth + "x" + +imageHeight;
  var isAnamorphic = _isAnamorphic(resolution);
  // What is the acceptable margin of error allowed in the image's size?
  var widthErrorMargin = isAnamorphic ? 20 : 3;
  var heightErrorMargin = isAnamorphic ? 10 : 2;
  // Ignored images (non-screenshots)
  var ignoredImageSizes = ["300x95", "500x175", "2511x877"];

  // Is the imagine with the allowed margin of error?
  if (
    _dimensionsWithinMarginOfError(
      DARWidth,
      imageWidth,
      DARHeight,
      imageHeight,
      widthErrorMargin,
      heightErrorMargin
    )
  ) {
    log("validateImage: Image " + (key + 1) + " AR within margin of error", "green", group);
    return;
  }

  // No?  Did the server calculate the DAR wrong?  Let's check the alternative way.
  var torrentAR = _getTorrentAspectRatio(group).split(":");

  var savedDARWidth = DARWidth;
  var savedDARHeight = DARHeight;

  if (isAnamorphic && DARWidth === SARWidth) {
    DARHeight = SARHeight;
    if (torrentAR.length === 1) {
      DARWidth = SARHeight * torrentAR[0];

      if (
        _dimensionsWithinMarginOfError(
          DARWidth,
          imageWidth,
          DARHeight,
          imageHeight,
          widthErrorMargin,
          heightErrorMargin
        )
      ) {
        log("validateImage: Image " + (key + 1) + " AR within margin of error", "green", group);
        return;
      }
    } else {
      DARWidth = (SARHeight / torrentAR[1]) * torrentAR[0];

      if (
        _dimensionsWithinMarginOfError(
          DARWidth,
          imageWidth,
          DARHeight,
          imageHeight,
          widthErrorMargin,
          heightErrorMargin
        )
      ) {
        log("validateImage: Image " + (key + 1) + " AR within margin of error", "green", group);
        return;
      }
    }
  } else if (isAnamorphic && DARHeight === SARHeight) {
    DARWidth = SARWidth;
    if (torrentAR.length === 1) {
      DARHeight = SARWidth / torrentAR[0];

      if (
        _dimensionsWithinMarginOfError(
          DARWidth,
          imageWidth,
          DARHeight,
          imageHeight,
          widthErrorMargin,
          heightErrorMargin
        )
      ) {
        log("validateImage: Image " + (key + 1) + " AR within margin of error", "green", group);
        return;
      }
    } else {
      DARHeight = (SARWidth / torrentAR[0]) * torrentAR[1];

      if (
        _dimensionsWithinMarginOfError(
          DARWidth,
          imageWidth,
          DARHeight,
          imageHeight,
          widthErrorMargin,
          heightErrorMargin
        )
      ) {
        log("validateImage: Image " + (key + 1) + " AR within margin of error", "green", group);
        return;
      }
    }
  } // Should we ignore the image? (not a screenshot)
  if (ignoredImageSizes.indexOf(imageRes) === -1) {
    // No?  Well I guess it's wrong then.  Let's throw a nice obnoxious red border around it.
    addError(group, "One, or more, images are the wrong size.");

    var SARError = imageRes == SARWidth + "x" + SARHeight ? " (the Storage Aspect Ratio)" : "";
    var altResolution = isAnamorphic ? " or " + savedDARWidth + "x" + savedDARHeight : "";
    log(
      "validateImage: Image " +
      (key + 1) +
      " has the wrong resolution, adding red border to it<br />" +
      "<span style='position:relative; left:40px;'>Resolution should be " +
      DARWidth +
      "x" +
      DARHeight +
      altResolution +
      " but was " +
      imageRes +
      SARError +
      ".</span>",
      "red",
      group
    );

    $(image).css({ border: "5px solid red" });
  } else {
    log(
      "validateImage: Image " + key + " is in a resolution that is ignored (" + imageRes + ")",
      "yellow",
      group
    );
  }
}

/**
 * @param  {int} width - Expected width
 * @param  {int} imageWidth - Width of the image
 * @param  {int} height - Expected height
 * @param  {int} imageHeight - Height of the image
 * @param  {int} widthErrorMargin - Acceptable margin of error for the width in pixels
 * @param  {int} heightErrorMargin - Acceptable margin of error for the height in pixels
 * @return {boolean} Are the dimensions withing the acceptable margin of error?
 */
function _dimensionsWithinMarginOfError(
width,
 imageWidth,
 height,
 imageHeight,
 widthErrorMargin,
 heightErrorMargin
) {
  return (
    Math.abs(width - imageWidth) <= widthErrorMargin && Math.abs(height - imageHeight) <= heightErrorMargin
  );
}

/**
 * Get a single mediainfo to work with.  Is there just one? Cool, use that.
 * Are there multiple ones? Choose the first IFO. Is there no IFO?
 * They're probably all mkv/avi, just take the first one.
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return {mediainfo} single $ object holding the correct mediainfo
 */
function getMediaInfo(group) {
  var mediainfos = group.find("table.mediainfo--in-release-description");
  if (mediainfos.length === 1) {
    return mediainfos;
  }

  // attempt to find the correct mediainfo by filename
  var ms=mediainfos.get();
  for(var i=0; i<ms.length; i++)
  {
    var m=ms[i];
    var completeName=m.previousElementSibling.textContent;
    var files=document.getElementById('files_'+group[0].id.substring(8)).getElementsByTagName('tr');
    for(var j=0; j<files.length; j++)
    {
      //console.log(completeName);
      //console.log(files[j].firstElementChild.textContent.trim());
      if(files[j].firstElementChild.textContent.trim()==completeName)
      {
        return $(m);
      }
    }
  }

  if(_contains(getShortInfoText(group), "VOB IFO")) {
    var dvdMediaInfo = mediainfos
    .prevAll('a:contains("IFO"):not([class])')
    .first()
    .next();
    if (dvdMediaInfo.length === 1) {
      return dvdMediaInfo;
    } else {
      return mediainfos.first();
    }
  } else {
    return mediainfos.first();
  }
}

/**
 * Get the expected dimensions of images for a group
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return {Array} [DARWidth, DARWeight, SARWidth, SARHeight]
 */
function getResolution(group) {
  var mediainfo = getMediaInfo(group);
  // Get the listed resolution in the format ["DARWidthxDARWeight", "SARWidthxSARHeight"]
  var res = mediainfo
  .find("table.mediainfo__section")
  .find('td:contains("Resolution")')
  .next()
  .text()
  .split(" ~> ");

  // Sometimes the parser will display 2160p instead of a ### x ### resolution\
  // Ignore DV layer
  if (res[0] === "2160p" || res[0] === "2160p1080p" || res[0] === "3840x21601920x1080") {
    return [3840, 2160, false, false];
  }

  // Sometimes the parser will display 1080p or 1080i instead of a ### x ### resolution
  if (res[0] === "1080p" || res[0] === "1080i") {
    return [1920, 1080, false, false];
  }

  // Sometimes the parser will display 720p instead of a ### x ### resolution
  if (res[0] === "720p") {
    return [1280, 720, false, false];
  }

  // If the resolution is anamorphic then return both DAR and SAR
  if (res[1]) {
    return _splitAndParseResolution(res[1]).concat(_splitAndParseResolution(res[0]));
  }

  // Otherwise just return the DAR and set the SAR values to false
  return _splitAndParseResolution(res[0]).concat([false, false]);
}

function _splitAndParseResolution(resString) {
  return [parseInt(resString.split("x")[0]), parseInt(resString.split("x")[1])];
}

/**
 * Get the "short info" description for a torrent
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return {String} e.g. "DVD9 / VOB IFO / DVD / PAL"
 */
function getShortInfoText(group) {
  return group
    .prev()
    .find(".torrent-info-link")
    .text();
}

/**
 * Get the file name of a torrent
 * @param {object} group - The $ "group" element to run the analysis on.
 * @return {String} - data attribute
 */
function getFileName(group) {
  return group.prev().data("releasename")+"";
}

/**
 * Add an error to the error array and update the visible error list
 * @param {object} group - The $ "group" element to run the analysis on.
 */
function addError(group, newError) {
  if (newError && _doesntContain(group.data("errors"), newError)) {
    group.data("errors").push(newError);
    displayErrors(group);
  }
}

function getType(group)
{
  var header=group.prev()[0];
  while(header && header.getAttribute('class')!='group_torrent') header=header.previousElementSibling;
  return header.querySelector('.basic-movie-list__torrent-edition__main').textContent;
}

/**
 * Display all current errors
 * @param {object} group - The $ "group" element to run the analysis on.
 * @param {boolean} finalRun - Set to true when it's the last run
 */
function displayErrors(group, finalRun) {
  var results = "";

  if (group.data("errors").length > 0) {
    var errorMessage = "WARNING(S):";
    group.data("errors").forEach(value => {
      errorMessage += "<br />&#8227; " + value;
    });

    results =
      "<div class='torrent_info_row_errors' style='color: red; background:rgba(" +
      _getAppropriateBackgroundColor(group.get()[0]) +
      ",0.5); padding:8px; border-radius:4px; font-size: 1.5em; margin-bottom: 1em;'>" +
      errorMessage +
      "</div>";
  }

  group.find(".torrent_info_row_results").html(results);
}

/**
 * Send error stats to the server to we can collect metrics
 * @param {object} group - The $ "group" element to run the analysis on.
 */
function sendStats(group) {
  var stats = {
    ScriptVersion: version,
    GroupID: group[0].id.substring(8),
    TorrentID: TGroupID, //Populated on the torrent page automagically
    Checked: _isChecked(group),
    Mediainfos: group.find("table.mediainfo--in-release-description").length,
    Screenshots: _getScreenshots(group).length,
    Errors: group.data("errors")
  };

  $.post("tools.php?action=ajax_checkingstats", AddAntiCsrfTokenToPostData(stats));
}

function _isAnamorphic(res) {
  return res[2] !== false;
}

function _isChecked(group) {
  return (
    group
    .prev()
    .children()
    .find("a[title='Check torrent']").length === 0
  );
}

function _isHDSourced(shortInfo) {
  return _contains(shortInfo, "Blu-ray") || _contains(shortInfo, "HD-DVD") || _contains(shortInfo, "HDTV");
}

function _isSD(shortInfo) {
  return (
    _doesntContain(shortInfo, "720p") &&
    _doesntContain(shortInfo, "1080p") &&
    _doesntContain(shortInfo, "1080i") &&
    _doesntContain(shortInfo, "2160p")
  );
}

function _getScreenshots(group) {
  return group.find("img.bbcode__image:not(.hidden a img.bbcode__image)");
}

function _getTorrentAspectRatio(group) {
  var ar=getMediaInfo(group)
  .find("table.mediainfo__section")
  .find('td:contains("Aspect ratio:")')
  .next()
  .text();
  if(ar.indexOf(':')==-1) ar=ar+':1';
  return ar;
}

function _contains(source, keywords) {
  return source.indexOf(keywords) !== -1;
}

function _isExact(source, keywords) {
  var array = source.split(" / ");
  return array.indexOf(keywords) > -1;
}

function _doesntContain(source, keywords) {
  return source.indexOf(keywords) === -1;
}

function _prettyNumber(num) {
  return Math.floor(num*100)/100;
}
