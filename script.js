let getSummaryData = async () => { 

	let response = await fetch('https://raw.githubusercontent.com/UCB-INFO-FRONTEND-WEBARCH/assignment-solutions/master/solutions.json'); 

	if (!response.ok) { 
		throw new Error(`HTTP error! status: ${response.status}`); 
	} else { return response.json(); } 
}

function toggleClass(el, className) {

	Array.from(document.getElementsByClassName("userRowselected")).forEach((el) =>{
		el.className = "userRow"
	});

	if (el.className.indexOf(className) >= 0) {
		el.className = el.className.replace(className,"");
	}
	else {
		el.className  += className;
	}
}


getSummaryData().then((response) => { 
	/* This is where your code should be */ 
	console.log(response); 

	/* End section where your code should be */

	// Summary
	const ctc = response.summary.count_tasks_created;
	const ctd = response.summary.count_tasks_deleted;
	const cte = response.summary.count_tasks_edited;

	const docTc = document.getElementById("tc");
	const docTd = document.getElementById("td");
	const docTe = document.getElementById("te");

	docTc.innerHTML += ctc;
	docTd.innerHTML += ctd;
	docTe.innerHTML += cte;

	// Top 5 Tags
	

	var t5t_text = ""
	var t5t = response.summary.top_five_tags
	var listOfTags = [];
	var t5t_html = document.getElementById("t5t");

	Object.keys(t5t).forEach((tag) => {
	
		var Perc1 = ((t5t[tag].count/(response.summary.count_tasks_created-response.summary.count_tasks_deleted))*100).toFixed(2)
		t5t_text = t5t[tag].name + ", " + t5t[tag].count + ", " +  Perc1 + "%"
		listOfTags.push("<li>" + t5t_text + "</li>");
	})
	
	t5t_html.innerHTML = listOfTags.join('');


	// Table
	


	const summaryByUser = response.summary_by_user;
	var rows = ""

	Object.keys(summaryByUser).forEach((username) => {
		var row = `<tr class="userRow" onclick="toggleClass(this, 'selected')">`;

		row += "<td>" + summaryByUser[username].name + "</td>";
		row += "<td>" + summaryByUser[username].count_tasks_created + "</td>";
		row += "<td>" + summaryByUser[username].count_tasks_deleted + "</td>";
		row += "<td>" + summaryByUser[username].count_tasks_edited + "</td>";

		var t5tU = "";

 	// (tag.count)/ (count_tasks_created – count_tasks_deleted)

		summaryByUser[username].top_five_tags.forEach((tag) => {

			var Perc = ((tag.count/(summaryByUser[username].count_tasks_created-summaryByUser[username].count_tasks_deleted))*100).toFixed(2);

			t5tU += "(" + tag.name + ", " + tag.count + ", " + Perc + "%" + "), "
		})
		row += "<td>" + t5tU + "</td>";

		row += "</tr>"

		rows += row;
	})

	var table = document.getElementById("sumByU");
	table.innerHTML += rows;

	console.log(summaryByUser);
});	

