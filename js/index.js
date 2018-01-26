/*页面加载完成*/

window.onload = function() {

loadProduct();
}

function loadProduct() {
	var xmlhttp;
	if(window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp = new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
        if (!(xmlhttp.readyState == 4 && xmlhttp.status == 200)) {
            return;
        }
        obj = JSON.parse(xmlhttp.responseText);
        var num = obj.data.length;
        var root = document.getElementById("root");
        for (var i = 0; i < num; i++) {
            var divItem = document.createElement("div");

            var img = document.createElement("img");
            img.src = obj.data[i].bgimg_url;
            img.className = "img"

            var ul = document.createElement("ul");
            ul.className = "sk_product clearfix";
            var j = obj.data[i].activity_list.length;
            for (var x = 0; x < j; x++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                var proImg = document.createElement("img");
                proImg.src = obj.data[i].activity_list[x].pro_url;
                a.appendChild(proImg);

                var title = document.createElement("p");
                title.textContent = obj.data[i].activity_list[x].tilte;

                var proImg = document.createElement("p");
                proImg.textContent = "￥" + obj.data[i].activity_list[x].price;

                li.appendChild(a);
                li.appendChild(title);
                li.appendChild(proImg);
                ul.appendChild(li);
            }

            divItem.appendChild(img);
            divItem.appendChild(ul);
            root.appendChild(divItem);
        }
    }

	xmlhttp.open("POST", "https://app.mingpinjiancai.com/v3.6/index.php?s=smj/goods/product", true);
	xmlhttp.send();
}