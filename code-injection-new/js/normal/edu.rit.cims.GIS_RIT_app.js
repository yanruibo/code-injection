





		$(document).ready(function () {
			$.ajax({
				type: "GET",
				url: "http://www.rit.edu/gis/public/mobile/GISlinks.xml",
				dataType: "xml",
				success: function (xml) {
					var list = document.getElementById('details');

					$(xml).find('entry').each(function () {

						/* Load the information from the xml file into variables. */
						var name = $(this).find('name').text();
						var url = $(this).find('url').text();
						var icon = $(this).find('icon').text();

						var listItem = document.createElement('li');
						listItem.setAttribute('data-icon', 'custom');
						listItem.innerHTML = '<a href="' + url + '"><img src="images/' + icon + '32.png" />' + name + '</a>';
						list.appendChild(listItem);
						// Call the refresh method on the list whose content we just generated so
						// that jQuery mobile will apply its special styles and render it properly.
						$(list).listview('refresh');
					});
				}
			});
		});

	









		/* As recommended by O'Reilly's jQuery Mobile: Up and Running, 1st edition, page 241. */
		/* Also see http://jquerymobile.com/demos/1.2.0/docs/pages/phonegap.html for this and other recommendations. */
		$(document).bind("mobileinit", function() {
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			$.mobile.pushState = false;
		});
	






















































		$(document).ready(function () {
			$.ajax({
				type: "GET",
				url: "http://www.rit.edu/gis/public/mobile/GISlinksAR.xml",
				dataType: "xml",
				success: function (xml) {
					var list = document.getElementById('details');

					$(xml).find('entry').each(function () {

						/* Load the information from the xml file into variables. */
						var name = $(this).find('name').text();
						var url = $(this).find('url').text();
						var icon = $(this).find('icon').text();

						var listItem = document.createElement('li');
						listItem.setAttribute('data-icon', 'custom');
						listItem.innerHTML = '<a href="' + url + '"><img src="images/white32.png"/ >' + name + '</a>';
						list.appendChild(listItem);
						// Call the refresh method on the list whose content we just generated so
						// that jQuery mobile will apply its special styles and render it properly.
						$(list).listview('refresh');
					});
				}
			});
		});

	






























































		$(document).ready(function () {
			$.ajax({
				type: "GET",
				url: "http://www.rit.edu/news/lib/rss/gis.rss",
				dataType: "xml",
				success: function (xml) {
					var list = document.getElementById('details');

					$(xml).find('item').each(function () {

						/* Load the information from the xml file into variables. */
						var date = $(this).find('pubDate').text();
						var title = $(this).find('title').text();
						var url = $(this).find('link').text();

						var str = date.split(" ");
						var wday = str[0];
						var day = str[1];
						var month = str[2];
						var year = str[3];

						var listItem = document.createElement('li');
						listItem.setAttribute('data-icon', 'custom');
						listItem.innerHTML = '<a href="' + url + '"><span class="gray">' + wday + ' ' + day + ' ' + month + ' ' + year + '<br /></span><span class="green">' + title + '</span></a>';
						list.appendChild(listItem);
						$(list).listview('refresh');
					});
				}
			});
		});

	


















































		$(document).ready(function () {
			$.ajax({
				type: "GET",
				url: "http://www.rit.edu/gis/public/mobile/GISdirectory.xml",
				dataType: "xml",
				success: function (xml) {
					var content = document.getElementById('details');
					var i = 1;

					$(xml).find('entry').each(function () {
						var id = 'id' + i;
						var selector = '#id' + i;
						i++;

						/* Load the person's information from the xml file into variables. */
						var title = $(this).find('title').text();
						var firstname = $(this).find('fname').text();
						var lastname = $(this).find('lname').text();
						var fullname = title + ' ' + firstname + ' ' + lastname;
						var position = $(this).find('position').text();
						var bldg = $(this).find('bldg').text();
						var room = $(this).find('room').text();
						var phone = $(this).find('telephone').text();
						var email = $(this).find('email').text();

						/* Create a div with data-role="collapsible" to contain the content for this person. */
						var div = document.createElement('div');
						div.setAttribute('data-role', 'collapsible');
						div.setAttribute('id', id);
						var heading = document.createElement('h1');
						heading.innerHTML = fullname;
						var table = document.createElement('table');
						
						var filename = "http://www.rit.edu/gis/public/mobile/headshots/headshot-" + lastname.toLowerCase() + ".jpg";

						table.innerHTML = '<tr><td><img src="' + filename + '" alt="photo" /></td><td class="dir-name">' + fullname + '</td></tr>';
						table.innerHTML += '<tr class="dir-left"><td>Position:</td><td class="dir-right">' + position + '</td></tr>';
						table.innerHTML += '<tr class="dir-left"><td>Building:</td><td class="dir-right">' + bldg + '</td></tr>';
						table.innerHTML += '<tr class="dir-left"><td>Room:</td><td class="dir-right">' + room + '</td></tr>';
						table.innerHTML += '<tr class="dir-left"><td>Phone:</td><td><a href="tel:' + phone + '" class="dir-right">' + phone + '</a></td></tr>';
						table.innerHTML += '<tr class="dir-left"><td>E-mail:</td><td><a href="mailto:' + email + '" class="dir-right">' + email + '</a></td></tr>';

						content.appendChild(div);
						div.appendChild(heading);
						div.appendChild(table);

						// Call the collapsible() method on the div whose content we just generated so that
						// jQuery mobile will apply its special styles to make it a collapsible item.
						// The following two lines accomplish the same thing.
						//jQuery(selector).collapsible();
						$(selector).collapsible();
					});
				}
			});
		});

	










		$(document).ready(function () {
			$.ajax({
				type: "GET",
				url: "http://www.rit.edu/gis/public/mobile/GISdirectory.xml",
				dataType: "xml",
				success: function (xml) {
					var content = document.getElementById('details');
					var i = 1;

					$(xml).find('entry').each(function () {
						var faculty = $(this).attr('faculty');
						if (faculty == '1') {
							var id = 'id' + i;
							var selector = '#id' + i;
							i++;

							/* Load the person's information from the xml file into variables. */
							var title = $(this).find('title').text();
							var firstname = $(this).find('fname').text();
							var lastname = $(this).find('lname').text();
							var fullname = title + ' ' + firstname + ' ' + lastname;
							var education = $(this).find('education').text();
							var expertise = $(this).find('expertise').text();
							var bio = $(this).find('bio').text();

							/* Create a div with data-role="collapsible" to contain the content for this person. */
							var div = document.createElement('div');
							div.setAttribute('data-role', 'collapsible');
							div.setAttribute('id', id);

							var heading = document.createElement('h1');
							heading.innerHTML = fullname;

							var filename = "http://www.rit.edu/gis/public/mobile/headshots/headshot-" + lastname.toLowerCase() + ".jpg";

							var table = document.createElement('table');
							table.innerHTML = '<tr><td><img src="' + filename + '" alt="photo" /></td><td class="dir-name">&nbsp;&nbsp;' + fullname + '</td></tr>';

							var info = document.createElement('div');
							info.innerHTML = '<p class="bios-title">Education</p><p class="bios-para">' + education + '</p>';
							info.innerHTML += '<p class="bios-title">Expertise</p><p class="bios-para">' + expertise + '</p>';
							info.innerHTML += '<p class="bios-title">Short Biography</p><p class="bios-para">' + bio + '</p>';

							content.appendChild(div);
							div.appendChild(heading);
							div.appendChild(table);
							div.appendChild(info);

							// The following two lines accomplish the same thing.
							jQuery(selector).collapsible();
							//$(selector).collapsible();
						}
					});
				}
			});
		});

	
