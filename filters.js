// ==UserScript==
// @name           PTP Collection & Artist Filters
// @description    Filter torrents in a collection or on an artist's page that are marked as seeding, snatched, leeching and/or downloaded
// @version        1.0.2
// @author         kittenhat
// @require        https://code.jquery.com/jquery-3.6.0.min.js
// @match          *://passthepopcorn.me/collages.php?*id=*
// @match          *://passthepopcorn.me/artist.php?*id=*
// @match          *://passthepopcorn.me/user.php?*action=edit*
// ==/UserScript==

var $ = window.jQuery;

if (window.location.href.indexOf('user.php?action=edit') > -1) {
	var options = {};
	options.imdb = ($('#showimdbrating').is(':checked') ? true : false);
	options.mc = ($('#showmcrating').is(':checked') ? true : false);
	options.rt = ($('#showrtrating').is(':checked') ? true : false);
	options.ptp = ($('#showptprating').is(':checked') ? true : false);
	localStorage.setItem('cfilters_options', JSON.stringify(options));
} else if (window.location.href.indexOf('collages.php?id=') > -1) {
	$('.panel__body ul', '#filter_torrents_form').after('<div class="grid"><div class="nobr grid__item grid-u-1"><center><select id="cfilter_1" name="cfilter1" class="form__input"><option value="">Seeding</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_2" name="cfilter2" class="form__input"><option value="">Snatched</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_3" name="cfilter3" class="form__input"><option value="">Leeching</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_4" name="cfilter4" class="form__input"><option value="">Downloaded</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_5" name="cfilter5" class="form__input"><option value="">Show All Movies on One Page</option><option value="1">Yes</option><option value="0">No</option></select></center></div></div>');
	$('#filter_torrents_form').on('submit', async function() { sleep(triggerCollectionBuild); });
	$(document).on('click', '.pagination__link', async function() { sleep(triggerCollectionBuild); });
} else if (window.location.href.indexOf('artist.php?id=') > -1) {
	$('.panel__body ul', '#filter_torrents_form').after('<div class="grid"><div class="nobr grid__item grid-u-1"><center><select id="cfilter_1" name="cfilter1" class="form__input"><option value="">Seeding</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_2" name="cfilter2" class="form__input"><option value="">Snatched</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_3" name="cfilter3" class="form__input"><option value="">Leeching</option><option value="1">Show</option><option value="0">Hide</option></select> <select id="cfilter_4" name="cfilter4" class="form__input"><option value="">Downloaded</option><option value="1">Show</option><option value="0">Hide</option></select></center></div></div>');
	$(window).on('load', async function() { sleep(triggerArtistBuild); });
	$(document).on('click', '.js-basic-movie-list thead a', async function() { sleep(triggerArtistBuild); });
}

async function buildArtist(movies, allMovies, roles, view, group, options, total) {
	var html = {}, list = [];
	var totaling = $('.search-form__footer__results').text().split();
	var lastSection = roles.length;
	var data = JSON.parse($('html').html().split('ungroupedCoverViewJsonData = ')[1].split(';\n')[0]);
	var authkey = data.AuthKey;
	var passkey = data.TorrentPass;

	if (movies !== false) {
		$('.search-form__footer__results').text('');

		for (var i = 0; i <= roles.length; i++) { 
			html[i] = '';
			$('#role_' + i + ' .cover-movie-list__container').html();
			$('#role_' + i + ' .small-cover-movie-list__container').html();
			$('#role_' + i + ' .js-huge_view_container').html();
			$('#role_' + i + ' .js-basic-movie-list__table-body').html();
		}

		$(movies).each(function(index, movie) {
			list.push(movie.GroupId);
			if (group == 0) {
				if (view === 'Cover') {
					html[lastSection]  += formatCover(movie, options);
				} else if (view === 'SmallCover') {
					html[lastSection] += formatSmallCover(movie);
				} else if (view === 'Huge') {
					html[lastSection] += formatHuge(movie, options, true);
				} else if (view === 'List') {
					html[lastSection] += formatList(movie, options, authkey, passkey);
				} else if (view === 'CompactList') {
					html[lastSection] += formatCompactList(movie, index, options, authkey, passkey);
				}
			} else {
				$(allMovies).each(function(aIndex, aMovie) {
					if (movie.GroupId == aMovie.GroupId) {
						$(roles).each(function(rIndex, rInfo) {
							if (rInfo.MovieIndices.indexOf(aIndex) > -1) {
								if (view === 'Cover') {
									html[rIndex] += formatCover(movie, options);
								} else if (view === 'SmallCover') {
									html[rIndex] += formatSmallCover(movie);
								} else if (view === 'Huge') {
									html[rIndex] += formatHuge(movie, options, true);
								} else if (view === 'List') {
									html[rIndex] += formatList(movie, options, authkey, passkey);
								} else if (view === 'CompactList') {
									html[rIndex] += formatCompactList(movie, index, options, authkey, passkey);
								}
							}
						});
					}
				});
			}
		});

		for (var i = 0; i <= roles.length; i++) {
			if (view === 'Cover') {
				$('#role_' + i + ' .cover-movie-list__container').html('<div class="cover-movie-list cover-movie-list--narrow js-cover-movie-list">' + html[i] + '</div');
			} else if (view === 'SmallCover') {
				$('#role_' + i + ' .small-cover-movie-list__container').html(html[i]);
			} else if (view === 'Huge') {
				$('#role_' + i + ' .js-huge_view_container').html(html[i]);
			} else if (view === 'List') {
				$('#role_' + i + ' .js-basic-movie-list__table-body').html(html[i]);
			} else if (view === 'CompactList') {
				$('#role_' + i + ' .js-basic-movie-list__table-body').html(html[i]);
			}
		}
	}
}

async function buildCollection(movies, view, allpages, options, total) {
	var html = '';
	var totaling = $('#filter_torrents_count').text().split();
	var data = JSON.parse($('html').html().split('coverViewJsonData[ 0 ] = ')[1].split(';\n')[0]);
	var authkey = data.AuthKey;
	var passkey = data.TorrentPass;
	$('.cover-movie-list, .small-cover-movie-list__container, .js-huge_view_container, .js-basic-movie-list__table-body').html('');

	if (movies !== false) {
		if (allpages == '1') { $('.pagination').html(''); }
		$('#filter_torrents_count').text('');

		$(movies).each(function(index, movie) {
			if (view === 'Cover') {
				html += formatCover(movie, options);
			} else if (view === 'SmallCover') {
				html += formatSmallCover(movie);
			} else if (view === 'Huge') {
				html += formatHuge(movie, options);
			} else if (view === 'List') {
				html += formatList(movie, options, authkey, passkey);				
			} else if (view === 'CompactList') {
				html += formatCompactList(movie, index, options, authkey, passkey);
			}
		});

		if (view === 'Cover') {
			$('.cover-movie-list').html(html);
		} else if (view === 'SmallCover') {
			$('.small-cover-movie-list__container').html(html);
		} else if (view === 'Huge') {
			$(".js-huge_view_container").html(html);
		} else if (view === 'List') {
			$(".js-basic-movie-list__table-body").html(html);
		} else if (view === 'CompactList') {
			$(".js-basic-movie-list__table-body").html(html);
		}

		if (allpages == '1') {
			$('#filter_torrents_count').text(movies.length + " Results out of " + totaling[0]);
		} else {

			$('#filter_torrents_count').text(movies.length + " results out of " + total + ' (' + totaling[0] + ' in collection)');
		}
	} else {
		$('#filter_torrents_count').text('0 results');
		$('#no_results_message').removeClass('hidden');
	}
}

async function filterMovies(list, seeding, snatched, leeching, downloaded) {
	var movies = [];
	var torrents = {seeding: [], snatched: [], leeching: [], downloaded: []};
	var push = false;

	$(list).each(function(index, groupInfo) {
		$(groupInfo['GroupingQualities']).each(function(qIndex, quality) {
			if (quality['CategoryName'] !== 'Other') {
				$(quality['Torrents']).each(function(tIndex, torrent) {
					if (torrent['ColorType'] !== undefined && torrent['ColorType'] == 'seeding') { torrents.seeding.push(groupInfo.GroupId); }
					if (torrent['ColorType'] !== undefined && torrent['ColorType'] == 'snatched') { torrents.snatched.push(groupInfo.GroupId); }
					if (torrent['ColorType'] !== undefined && torrent['ColorType'] == 'leeching') { torrents.leeching.push(groupInfo.GroupId); }
					if (torrent['ColorType'] !== undefined && torrent['ColorType'] == 'downloaded') { torrents.downloaded.push(groupInfo.GroupId); }
				});
			}
		});
	});

	$(list).each(function(index, groupInfo) {
		push = false;
		if (torrents.seeding.indexOf(groupInfo.GroupId) > -1) {
			if (seeding == '1') { push = true; }
		} else if (torrents.snatched.indexOf(groupInfo.GroupId) > -1) {
			if (snatched == '1') { push = true; }
		} else if (torrents.leeching.indexOf(groupInfo.GroupId) > -1) {
			if (leeching == '1') { push = true; }
		} else if (torrents.downloaded.indexOf(groupInfo.GroupId) > -1) {
			if (downloaded == '1') { push = true; }
		} else {
			if (seeding == '0' && snatched == '0' && leeching == '0' && downloaded == '0') { push = true; }
		}

		if (push === true) { movies.push(groupInfo); }
	});

	return await (movies.length > 0 ? movies : false);

}

function formatCompactList(movie, index, options, authkey, passkey) {
	var extraclass = (index % 2 != 0 ? " compact-movie-list__details-row--odd" : "");
	var html = '<tr class="basic-movie-list__details-row compact-movie-list__details-row' + extraclass + ' js-basic-movie-list__details-row"><td colspan="1"><span class="basic-movie-list__movie__title-row"><a href="torrents.php?id=' + movie['GroupId'] + '" class="basic-movie-list__movie__movie__title js-movie-tooltip-triggerer">' + movie['Title'] + '</a> <span class="basic-movie-list__movie__year">[' + movie['Year'] + ']</span><span class="basic-movie-list__movie__director-list"> by ';
	if (movie['Directors'] !== undefined) {
		for (var i = 0; i < movie['Directors'].length; i++) {
			html += '<a class="artist-info-link" href="artist.php?id=' + movie['Directors'][i]['Id'] + '">' + movie['Directors'][i]['Name'] + "</a>";
			if (i + 1 < movie['Directors'].length) { html += ", "; }
		}
	}
	html += '</span></span><div class="basic-movie-list__movie__ratings-and-tags">';
	if (options.imdb === true && movie['ImdbRating'] !== undefined) { html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="https://www.imdb.com/title/tt' + movie['ImdbId'] + '/" rel="noreferrer">IMDb</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['ImdbRating'] + '</span></div>'; }
	if (options.mc === true && movie['McRating'] !== undefined) { html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="' + movie['McUrl'] + '" rel="noreferrer">MC</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['McRating'] + '</span></div>'; }
	if (options.rt === true && movie['RtRating'] !== undefined) { html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="' + movie['RtUrl'] + '" rel="noreferrer">RT</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['RtRating'] + '</span></div>'; }
	if (options.ptp === true && movie['PtpRating'] !== undefined) { html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="torrents.php?action=ratings&id=' + movie['GroupId'] + '">PTP</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['PtpRating'] + '</span></div>'; }
	html += '<span class="basic-movie-list__movie__tags">';
	for (var i = 0; i < movie['Tags'].length; i++) {
		html += '<a href="torrents.php?taglist=' + movie['Tags'][i] + '&cover=1">' + movie['Tags'][i] + "</a>";
		if (i + 1 < movie['Tags'].length) { html += ", "; }
	}
	html += '</span><a href="#" class="basic-torrent-list__movie__torrent-opener-link" onclick="BrowseGroupToggle(this); return false;">[+]</a></div></td><td class="nobr">' + movie['MaxSize'] + '</td><td>' + movie['TotalSnatched'] + '</td><td>' + movie['TotalSeeders'] + '</td><td>' + movie['TotalLeechers'] + '</td></tr>';
	$(movie['GroupingQualities']).each(function (index, group) {
		html += '<tr class="basic-movie-list__torrent-row hidden"><td colspan="7" class="basic-movie-list__torrent-edition"><span class="basic-movie-list__torrent-edition__main">' + group['CategoryName'] + '</span> - <span class="basic-movie-list__torrent-edition__sub">' + group['QualityName'] + '</span></td></tr>';
		$(group['Torrents']).each(function (index, torrent) {
			extraclass = "";
			if (torrent['Title'].indexOf("torrent-info-link--user-seeding") > -1) { extraclass = " basic-movie-list__torrent-row--user-seeding"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-snatched") > -1) { extraclass = " basic-movie-list__torrent-row--user-snatched"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-leeching") > -1) { extraclass = " basic-movie-list__torrent-row--user-leeching"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-downloaded") > -1) { extraclass = " basic-movie-list__torrent-row--user-downloaded"; }
			html += '<tr class="basic-movie-list__torrent-row' + extraclass + ' hidden"><td><span class="basic-movie-list__torrent__action">[<a href="torrents.php?action=download&id=' + torrent['TorrentId'] + '&authkey=' + authkey + '&torrent_pass=' + passkey + '" title="Download" class="basic-movie-list__torrent__action__link">DL</a>]</span>' + torrent['Title'] + '</td><td class="nobr">' + torrent['Size'] + '</td><td>' + torrent['Snatched'] + '</td><td>' + torrent['Seeders'] + '</td><td>' + torrent['Leechers'] + '</td></tr>';
		});
	});

	return html;
}

function formatCover(movie, options) {
	var html = '<div class="cover-movie-list__movie js-movie-tooltip-triggerer"><a class="cover-movie-list__movie__cover-link" href="torrents.php?id=' + movie['GroupId'] + '" style="background:url(\'' + movie['Cover'] + '\') no-repeat top center scroll; background-size: cover;"></a><div class="cover-movie-list__movie__undercover"><div class="cover_movie_list__movie__title-row"><a href="torrents.php?id=' + movie['GroupId'] + '" class="cover-movie-list__movie__title">' + movie['Title'] + '</a> <span class="cover-movie-list__movie__year">[' + movie['Year'] + ']</span></div><div class="cover-movie-list__movie__rating-and-tags">';
	if (options.imdb === true && movie['ImdbRating'] !== undefined && movie['ImdbRating'] !== null) { html += '<a target="_blank" href="https://www.imdb.com/title/tt' + movie['ImdbId'] + '/" rel="noreferrer" class="cover-movie-list__movie__rating">' + movie['ImdbRating'] + '</a><span class="cover-movie-list__movie__tags">'; }
	for (var i = 0; i < movie['Tags'].length; i++) {
		html += '<a href="torrents.php?taglist=' + movie['Tags'][i] + '&cover=1" class="cover-movie-list__movie__tag">' + movie['Tags'][i] + "</a>";
		if (i + 1 < movie['Tags'].length && movie['Tags'].length > 1) { html += ', '; }
	}
	html += '</span></div></div></div>';

	return html;
}

function formatHuge(movie, options, additional = false) {
	var html = '<div class="huge-movie-list__movie"><div class="huge-movie-list__movie__cover"><a class="huge-movie-list__movie__cover__link" href="torrents.php?id=' + movie['GroupId'] + '" style="background: url(\'' + movie['Cover'] + '\') no-repeat top center scroll; background-size: cover;"></a></div><div class="huge-movie-list__movie__details"><div class="huge-movie-list__movie__title-row"><a class="huge-movie-list__movie__title" href="torrents.php?id=' + movie['GroupId'] + '" title = "View Torrent">' + movie['Title'] + '</a> <span class="huge-movie-list__movie__year">' + movie['Year'] + '</span><span class="huge-movie-list__movie__director-list"> by ';
	if (movie['Directors'] !== undefined) {
		if (movie['Directors'].length > 2) {
			html += 'Various Directors';
		} else {
			for (var i = 0; i < movie['Directors'].length; i++) {
				html += '<a class="huge-movie-list__movie_director" href="artist.php?id=' + movie['Directors'][i]['Id'] + '">' + movie['Directors'][i]['Name'] + "</a>";
				if (i + 1 < movie['Directors'].length && movie['Directors'].length > 1) { html += ', '; }
			}
		}
	}

	html += '</div><div class="huge-movie-list__movie__tag-list">';
	for (var i = 0; i < movie['Tags'].length; i++) {
		html += '<a href="torrents.php?taglist=' + movie['Tags'][i] + '">' + movie['Tags'][i] + "</a>";
		if (i + 1 < movie['Tags'].length) { html += ", "; }
	}
	html += '</div>';

	if (additional === true) {
		if (movie['AdditionalInfoHtml'] !== undefined && movie['AdditionalInfoHtml'] !== '') {
			html += '<div class="huge-movie-list__movie__additional-info">' + movie['AdditionalInfoHtml'] + '</div>';
		}
	}

	html += '<table class="huge-movie-list__movie__ratings-and-synopsis"><tbody><tr><td width="1%"><table class="huge-movie-list__movie__ratings"><tbody>';
	if (options.imdb === true && movie['ImdbRating'] !== undefined) { html += '<tr><td colspan="1" class="nobr huge-movie-list__movie__ratings__icon-column" width="1%"><center><a target="_blank" class="rating" href="https://www.imdb.com/title/tt' + movie['ImdbId'] + '/" rel="noreferrer"><img src="https://static.passthepopcorn.me/static/common/ratings/x1_imdb.png" style="height: 32px; width: 32px;" title="IMDb"></a></center></td><td class="nobr huge-movie-list__movie__ratings__votes-column" width="99%"><span class="rating">' + movie['ImdbRating'] + '</span> <span class="mid">/</span> <span class="outof">10</span><br />(' + movie['ImdbVoteCount'] + ' votes)</td></tr>'; }
	if (options.mc === true && movie['McRating'] !== undefined) { html += '<tr><td colspan="1" class="nobr huge-movie-list__movie__ratings__icon-column" width="1%"><center><a target="_blank" class="rating" href="' + movie['McUrl'] + '" rel="noreferrer"><img src="https://static.passthepopcorn.me/static/common/ratings/x2_metacritic.png" style="height: 32px; width: 32px;" title="Metacritic"></a></center></td><td class="huge-movie-list__movie__ratings__votes-column" width="99%"><span class="rating">' + movie['McRating'] + '</span> <span class="mid">/</span> <span class="outof">100</span><br />(' + movie['ImdbVoteCount'] + ' votes)</td></tr>'; }
	if (options.rt === true && movie['RtRating'] !== undefined) { html += '<tr><td colspan="1" class="nobr huge-movie-list__movie__ratings__icon-column" width="1%"><center><a target="_blank" class="rating" href="' + movie['RtUrl'] + '" rel="noreferrer"><img src="' + (movie['RtRating'] < 60 ? "https://static.passthepopcorn.me/static/common/ratings/x3_splat.png" : "https://static.passthepopcorn.me/static/common/ratings/x3_tomatoes.png") + '" style="height: 32px; width: 32px;" title="Rotten Tomatoes"></a></center></td><td class="huge-movie-list__movie__ratings__votes-column" width="99%"><span class="rating">' + movie['RtRating'] + '</span> <span class="mid">/</span> <span class="outof">100</span></td></tr>'; }
	if (options.ptp === true && movie['PtpRating'] !== undefined) {
		html += '<tr><td colspan="1" class="huge-movie-list__movie__ratings__icon-column" width="1%"><center><div><a href="torrents.php?action=ratings&id=' + movie['GroupId'] + '"><img src="https://static.passthepopcorn.me/static/common/ratings/x4_ptp.png" style="height: 32px; width: 32px;" title="User Ratings"></a></div></center></td><td colspan="1" class="nobr huge-movie-list__movie__ratings__votes-column" width="99%"><span class="rating"><span>' + movie['PtpRating'] + '%</span></span><br><span class="rating"> (' + movie['PtpVoteCount'] + ')</span></td></tr>';
	} else {
		html += '<tr><td colspan="1" class="huge-movie-list__movie__ratings__icon-column" width="1%"><center><div><a href="torrents.php?action=ratings&id=' + movie['GroupId'] + '"><img src="https://static.passthepopcorn.me/static/common/ratings/x4_ptp.png" style="height: 32px; width: 32px;" title="User Ratings"></a></div></center></td><td colspan="1" class="nobr huge-movie-list__movie__ratings__votes-column" width="99%"><span class="rating"><span>0%</span></span><br><span class="rating"> (0 votes)</span></td></tr>';
	}

	html += '</tbody></table></td><td width="99%"><div class="huge-movie-list__movie__synopsis">' + movie['Synopsis'] + '</div></td></tr></tbody></table><div class="huge-movie-list__movie__action-row">';
	if (movie['YoutubeId'] !== undefined) { html += '<span class="huge-movie-list__movie__trailer"><a href="#" onclick="ShowYoutubePopUp(\'' + movie['YoutubeId'] + '\'); return false;">Trailer</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;'; }
	html += '<span class="huge-movie-list__movie__bookmark"><a href="#" onclick="CoverTooltipBookmark(this, ' + movie['GroupId'] + '); return false;">Bookmark</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="huge-movie-list__movie__rate"><a href="#" onclick="ShowHugeViewVoteWindow(this, ' + movie['GroupId'] + '); return false;">Rate</a></span></div><div class="huge-movie-list__movie__torrent-summary">';
	if (movie['TorrentSummary']['Sd'] !== undefined) { html += '<div class="huge-movie-list__movie__torrent-summary__row"><span class="huge-movie-list__movie__torrent-summary__row__title">SD: </span>' + movie['TorrentSummary']['Sd'].join(", ") + '</div>'; }
	if (movie['TorrentSummary']['Hd'] !== undefined) { html += '<div class="huge-movie-list__movie__torrent-summary__row"><span class="huge-movie-list__movie__torrent-summary__row__title">HD: </span>' + movie['TorrentSummary']['Hd'].join(", ") + '</div>'; }
	if (movie['TorrentSummary']['Uhd'] !== undefined) { html += '<div class="huge-movie-list__movie__torrent-summary__row"><span class="huge-movie-list__movie__torrent-summary__row__title">UHD: </span>' + movie['TorrentSummary']['Uhd'].join(", ") + '</div>'; }
	html += '<div class="huge-movie-list__movie__torrent-summary__row huge-movie-list__movie__torrent-summary__latest-row"><span class="huge-movie-list__movie__torrent-summary__row__title">Latest: </span>' + movie['LatestTorrentTitle'] + '</div></div></div></div>';

	return html;
}

function formatList(movie, options, authkey, passkey) {
	var extraclass = '';
	var html = '<tr class="group basic-movie-list__details-row js-basic-movie-list__details-row"><td class="js-basic-movie-list__rowspan" rowspan="' + movie['RowSpan'] + '" data-rowspan="' + movie['RowSpan'] + '"><a href="torrents.php?id=' + movie['GroupId'] + '" class="basic-movie-list__movie__cover-link"><img src="' + movie['Cover'] + '" class="basic-movie-list__movie__cover js-movie-tooltip-triggerer"></a></td><td colspan="5"><span class="basic-movie-list__movie__title-row"><a href="torrents.php?id=' + movie['GroupId'] + '" class="basic-movie-list__movie__title">' + movie['Title'] + '</a> <span class="basic-movie-list__movie__year">[' + movie['Year'] + ']</span><span class="basic-movie-list__movie__director-list"> by ';
	if (movie['Directors'] !== undefined) {
		for (var i = 0; i < movie['Directors'].length; i++) {
			html += '<a class="artist-info-link" href="artist.php?id=' + movie['Directors'][i]['Id'] + '">' + movie['Directors'][i]['Name'] + "</a>";
			if (i + 1 < movie['Directors'].length) { html += ", "; }
		}
	}
	html += '</span></span><span class="basic-movie-list__movie__bookmark"><a href="#" onclick="CoverTooltipBookmark(this, ' + movie['GroupId'] + '); return false;">Bookmark</a></span><div class="basic-movie-list__movie__ratings-and-tags">';
	if (options.imdb === true && movie['ImdbRating'] !== undefined) {
		html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="https://www.imdb.com/title/tt' + movie['ImdbId'] + '/" rel="noreferrer">IMDb</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['ImdbRating'] + '</span></div>';
	}
	if (options.mc === true && movie['McRating'] !== undefined) {
		html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="' + movie['McUrl'] + '" rel="noreferrer">MC</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['McRating'] + '</span></div>';
	}
	if (options.rt === true && movie['RtRating'] !== undefined) {
		html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="' + movie['RtUrl'] + '" rel="noreferrer">RT</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['RtRating'] + '</span></div>';
	}
	if (options.ptp === true && movie['PtpRating'] !== undefined) {
		html += '<div class="basic-movie-list__movie__rating-container"><span class="basic-movie-list__movie__rating__title"><a target="_blank" href="torrents.php?action=ratings&id=' + movie['GroupId'] + '">PTP</a>: </span><span class="basic-movie-list__movie__rating__rating">' + movie['PtpRating'] + '</span></div>';
	}
	html += '<span class="basic-movie-list__movie__tags">';
	for (var i = 0; i < movie['Tags'].length; i++) {
		html += '<a href="torrents.php?taglist=' + movie['Tags'][i] + '&cover=1">' + movie['Tags'][i] + "</a>";
		if (i + 1 < movie['Tags'].length) { html += ", "; }
	}
	html += '</span></div></td></tr>';
	$(movie['GroupingQualities']).each(function (index, group) {
		html += '<tr class="basic-movie-list__torrent-row"><td colspan="5" class="basic-movie-list__torrent-edition"><span class="basic-movie-list__torrent-edition__main">' + group['CategoryName'] + '</span> - <span class="basic-movie-list__torrent-edition__sub">' + group['QualityName'] + '</span></td></tr>';
		$(group['Torrents']).each(function (index, torrent) {
			if (torrent['Title'].indexOf("torrent-info-link--user-seeding") > -1) { extraclass = " basic-movie-list__torrent-row--user-seeding"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-snatched") > -1) { extraclass = " basic-movie-list__torrent-row--user-snatched"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-leeching") > -1) { extraclass = " basic-movie-list__torrent-row--user-leeching"; }
			if (torrent['Title'].indexOf("torrent-info-link--user-downloaded") > -1) { extraclass = " basic-movie-list__torrent-row--user-downloaded"; }
			html += '<tr class="basic-movie-list__torrent-row' + extraclass + '"><td><span class="basic-movie-list__torrent__action">[<a href="torrents.php?action=download&id=' + torrent['TorrentId'] + '&authkey=' + authkey + '&torrent_pass=' + passkey + '" title="Download" class="basic-movie-list__torrent__action__link">DL</a>]</span>' + torrent['Title'] + '</td><td class="nobr">' + torrent['Size'] + '</td><td>' + torrent['Snatched'] + '</td><td>' + torrent['Seeders'] + '</td><td>' + torrent['Leechers'] + '</td></tr>';
		});
	});

	return html;
}

function formatSmallCover(movie) {
	return '<div class="small-cover-movie-list__movie js-movie-tooltip-triggerer"><a href="torrents.php?id=' + movie['GroupId'] + '" class="small-cover-movie-list__movie__link" style="background: url(\'' + movie['Cover'] + '\') no-repeat top center scroll; background-size: cover;"></a></div>';
}

async function getCollectionMovies(allpages) {
	var pages = getPages();
	var movies = [], temp = [], temp2 = [], promises = [], table, html, request, tempurl = '';

	if (allpages == 1) {
		for (var i = 1; i <= pages; i++) {
			tempurl = replaceUrlParam(document.URL, 'page', i);

			request = $.ajax({
				url: tempurl,
				dataType: 'html',
				method: 'GET'
			});
			promises.push(request);
		}
	} else {
		request = $.ajax({
			url: document.URL,
			dataType: 'html',
			method: 'GET'
		});
		promises.push(request);
	}

	await Promise.all(promises).then(async (responseList) => {
		responseList.map(response => temp);

		$(responseList).each(async function(index, content) {
			table = await JSON.parse(content.split('coverViewJsonData[ 0 ] = ')[1].split(';\n')[0]);
			$(table['Movies']).each(async function() { await movies.push($(this)[0]); });
		});
	});

	return await movies;
}

function getPages() {
	var pages = 1;
	var pagination = $('.pagination__link--last');

	if (pagination !== undefined && pagination !== null && pagination.length > 0) { pages = getURLParams(pagination[0].href)['page']; }

	return pages;
}

function getURLParams(urll) {
	var url = decodeURIComponent(urll);
	var vars = [], hash;
	var hashes = url.slice(window.location.href.indexOf('?') + 1).split('&');

	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
}

function replaceUrlParam(urll, paramName, paramValue) {
	var url = decodeURIComponent(urll);
	if (paramValue == null) { paramValue = ''; }
	var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
	if (url.search(pattern) >= 0) { return url.replace(pattern, '$1' + paramValue + '$2'); }
	url = url.replace(/[?#]$/, '');
	return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
}

async function sleep(fn) {
	await timeout(2000);
	return fn();
}

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function triggerArtistBuild() {
    var options;
	if (localStorage.getItem('cfilters_options') === null) {
		options = {imdb: true, mc: true, rt: true, ptp: true};
		localStorage.setItem('cfilters_options', JSON.stringify(options));
	} else {
		options = JSON.parse(localStorage.getItem('cfilters_options'));
	}

	var url = getURLParams(document.URL);
	var view = localStorage.getItem('ArtistViewMode');
	var group = localStorage.getItem('ArtistGroupByRole');

	if (url['cfilter1'] === '' && url['cfilter2'] === '' && url['cfilter3'] === '' && url['cfilter4'] === '') { return; }

	var seeding = (url['cfilter1'] === '' ? '1' : url['cfilter1']);
	var snatched = (url['cfilter2'] === '' ? '1' : url['cfilter2']);
	var leeching = (url['cfilter3'] === '' ? '1' : url['cfilter3']);
	var downloaded = (url['cfilter4'] === '' ? '1' : url['cfilter4']);

	if (seeding == '1' && snatched == '1' && leeching == '1' && downloaded == '1') { return; }

	if (view === undefined || view === null) { view = 'Cover'; }
	if (group === undefined || group === null) { group = 0; }

	var data = JSON.parse($('html').html().split('ungroupedCoverViewJsonData = ')[1].split(';\n')[0]);
	var tempMovies = data.Movies;
	var roles = JSON.parse($('html').html().split('movieIndicesPerRole = ')[1].split(';\n')[0]);

	var movies = await filterMovies(tempMovies, seeding, snatched, leeching, downloaded, options);

	await buildArtist(movies, tempMovies, roles, view, group, options, tempMovies.length);
}

async function triggerCollectionBuild() {
    var options;
	if (localStorage.getItem('cfilters_options') === null) {
		options = {imdb: true, mc: true, rt: true, ptp: true};
		localStorage.setItem('cfilters_options', JSON.stringify(options));
	} else {
		options = JSON.parse(localStorage.getItem('cfilters_options'));
	}

	var url = getURLParams(document.URL);
	var view = localStorage.getItem('CollectionViewMode');
	var seeding = (url['cfilter1'] === undefined || url['cfilter1'] === null ? '1' : url['cfilter1']);
	var snatched = (url['cfilter2'] === undefined || url['cfilter2'] === null ? '1' : url['cfilter2']);
	var leeching = (url['cfilter3'] === undefined || url['cfilter3'] === null ? '1' : url['cfilter3']);
	var downloaded = (url['cfilter4'] === undefined || url['cfilter4'] === null ? '1' : url['cfilter4']);
	var allpages = (url['cfilter5'] === undefined || url['cfilter5'] === null ? '0' : url['cfilter5']);

	if (seeding == '1' && snatched == '1' && leeching == '1' && downloaded == '1' && allpages == '0') { return; }

	if (view === undefined || view === null) { view = 'Cover'; }

	var tempMovies = await getCollectionMovies(allpages);

	var movies = await filterMovies(tempMovies, seeding, snatched, leeching, downloaded, options);

	await buildCollection(movies, view, allpages, options, tempMovies.length);
}
