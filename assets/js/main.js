	var employee_id = 0
	var baseUrl="https://nahdetmisrcards.github.io/business-cards/";//"https://apisnmg-staging.azurewebsites.net/eduhub/Files/Businesscard/";//"https://raw.githack.com/nahdetmisrApp/bussiness-cards-nahdetmisr/main/";
	function readCSV() {
		var xmlhttp = new XMLHttpRequest();
		  xmlhttp.open("GET", baseUrl+"data/Business%20Cards.csv", false); // `false` makes the request synchronous
		  xmlhttp.send();
		  if (xmlhttp.status==200) {
			result = xmlhttp.responseText;
		  }
		  var lines = result.split(/\r?\n/);
		  
		  // employee_number Starts with 1. Set according to employee data row number in data/Bussiness Cards.csv. Recieved as a parameter
		  // employee_number = 2
		  var employee_number =1;
		  var url = new URL(window.location.href);
		  
		  //url.searchParams.get("employee_number");
		  if(url.searchParams.get("employee_number")!=null)
		  employee_number=url.searchParams.get("employee_number");
		  
		  var data = lines[employee_number-1].split(";");
		
		  document.getElementById("photo").setAttribute("src",baseUrl+ "photos/" + employee_number + ".jpg");
		  document.getElementById("name").innerHTML = data[0];
	      document.getElementById("title_company").innerHTML = data[2];
	      document.getElementById("phone").innerHTML = data[3];
	      document.getElementById("email").innerHTML = data[1];
		  document.getElementById("address").innerHTML = data[5];
		  if(data.length>6)
		  {
			  
		  document.getElementById("addressDetails1").innerHTML = data[6];
		  document.getElementById("addressDetails2").innerHTML = data[7];
		  }
		  else
		  {
			 document.getElementsByClassName("addressDetails").Style.display="none";
		  }
		  <!--====== Adding LinkedIn Badge ======-->
		  var div = document.createElement("div");
		  div.className = "badge-base LI-profile-badge";
		  div.setAttribute("data-locale", "en_US");
		  div.setAttribute("data-size", "medium");
		  div.setAttribute("data-theme", "light");
		  div.setAttribute("data-type", "VERTICAL");
		  div.setAttribute("data-vanity", data[4]);
		  div.setAttribute("data-version", "v1");
		  document.getElementById("card").appendChild(div);
		  
		  // For debugging
		  //const welcomeTextNode = document.createTextNode("AAAAAAAAAAA");
		  //document.getElementById("card").appendChild(welcomeTextNode);
		  
		  document.getElementById("vcard_number").setAttribute("href", baseUrl+"vcards/" + employee_number + "-vcard.vcf");
		  document.getElementById("card_number_barcode").setAttribute("src", "https://api.qrserver.com/v1/create-qr-code/?data="+ baseUrl+"vcards/"+ employee_number + "-vcard.vcf&amp;size=100x100");
	}