import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function exportData() {
  chrome.storage.sync.get((data) => {
    let obj = data['point_automator']

    const a = document.createElement('a');
    a.href = 'data:text/plain,' + encodeURIComponent(JSON.stringify(obj));
    a.download = 'data.json';

    a.click();
  })
}

console.log('test')
function importData(evt: any) {
  $('#import').on('change', function (e: any) {
    var result = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(result);
    reader.addEventListener('load', function () {
      const obj = reader.result.toString()
      chrome.storage.sync.set({ 'point_automator': JSON.parse(obj) })
    })
  })
}

$('#export').click(exportData);
$('#import').click(importData);

