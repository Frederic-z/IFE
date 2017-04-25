window.onload = function () {
	var container = document.getElementById('container');
	var aBtn = document.getElementsByTagName('input');
	var inpData = document.getElementById('inpData');
	
	aBtn[1].onclick = function (){
		var aLi = addLi();
		
		container.insertBefore(aLi, container.firstChild)
		inpData.value = '';
	}
	
	aBtn[2].onclick = function (){
		var aLi = addLi();
		container.insertBefore(aLi, container.lastChild)
		inpData.value = '';
	}
	
	aBtn[3].onclick = function (){
		alert(container.firstChild.innerHTML)
		container.removeChild(container.firstChild)
	}
	
	aBtn[4].onclick = function (){
		alert(container.lastElementChild.em);
		container.removeChild(container.lastChild)
	}
	
	function addLi(){
		if(!(/^[0-9]+$/).test(inpData.value)) {
			alert('lll');
			return
		}			
		var aLi = document.createElement('li');
		aLi.innerHTML = inpData.value;
		aLi.addEventListener('click', remove);
		return aLi;
	}
	
	function remove(){
		this.parentNode.removeChild(this);
	}
}
