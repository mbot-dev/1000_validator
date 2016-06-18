
// URL to validate
var validatorURL = (function () {
	var url = 'http://localhost:9080/1000-validator/api/v1';
	return function () {
		return url;
	};
})();

// Dropped file list
var dropedFiles = [];

// Rest all inputs
var resetAll = function () {
	document.getElementById('pasteText').value = '';
	document.getElementById('selectedFile').value = '';
	document.getElementById('drop_list').innerHTML = '';
	dropedFiles = [];
};
 
// http://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleFileSelect (evt) {
	evt.stopPropagation();
	evt.preventDefault();

	dropedFiles = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0; i < dropedFiles.length; i++) {
		var f = dropedFiles[i];
		output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
		f.size, ' bytes, last modified: ',
		f.lastModifiedDate.toLocaleDateString(), '</li>');
	}
	document.getElementById('drop_list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

// http://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleDragOver (evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

var setupListeners = function () {
	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
};

var resetResults = function () {
	document.getElementById('pasteResult').innerHTML = '';
	document.getElementById('selectedFile').innerHTML = '';
	document.getElementById('dropResult').innerHTML = '';
};

var validatePaste = function () {
	resetResults();
	var xhttp = {};
	var arr = [];
	var text = document.getElementById('pasteText').value;
	if (text && text !== '') {
		xhttp = new XMLHttpRequest();
		xhttp.open('PUT', validatorURL(), true);   							// async = true
		xhttp.setRequestHeader('Content-type', 'application/xml');       	// http headder contentType
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState === 4 && xhttp.status/100 === 2) {
				// responseからJSONを生成する
				var data = JSON.parse(xhttp.responseText);
				arr.push('<p>');
				arr.push(JSON.stringify(data, null, 4));
				arr.push('<p>');
				document.getElementById('pasteResult').innerHTML = arr.join('');
			}
		}
		xhttp.send(text);
	} else {
		alert('検証するデータがありません。')
	}
};

// Send XML file
var sendXml = function (xmlFile, eleId) {
	// ToDo check ?
	var reader = new FileReader();
	var text = '';
	var xhttp = {};
	reader.onload = function (evt) {
		// file content
		text = evt.target.result;
		xhttp = new XMLHttpRequest();
		xhttp.open('PUT', validatorURL(), true);   							// async = true
		xhttp.setRequestHeader('Content-type', 'application/xml');       	// http headder contentType
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState === 4 && xhttp.status/100 === 2) {
				var data = JSON.parse(xhttp.responseText);
				var arr = [];
				arr.push('<p>');
				arr.push(JSON.stringify(data, null, 4));
				arr.push('</p>');
				document.getElementById(eleId).innerHTML = arr.join('');
			}
		}
		xhttp.send(text);
	};
	reader.readAsText(xmlFile);
};

var validateSelection = function () {
	resetResults();
	var test = document.getElementById('selectedFile');
	if (test.files && test.files.length > 0) {
		sendXml(test.files[0], 'selectionResult');
	} else {
		alert('検証するファイルが選択されていません。')
	}
};

var validateDrop = function () {
	resetResults();
	if (dropedFiles.length > 0) {
		sendXml(dropedFiles[0], 'dropResult');
	} else {
		alert('検証するファイルがドロップされていません。')
	}
};