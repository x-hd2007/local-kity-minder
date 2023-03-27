(function()
{
    $('.btn.btn-default.btn-sm').click(function(){
        var $this = $(this);
        var dval = $this.data('type');
        var exportType;
        switch(dval) {
            case 'json':
                exportType = 'json';
                break;
            case 'km':
                exportType = 'json';
                break;
            case 'md':
                exportType = 'markdown';
                break;
            case 'png':
                exportType = 'png';
                break;
            case 'svg':
                exportType = 'svg';
                break;
            case 'import':
                exportType = 'import';
                break;
        }
        if (exportType == 'import') {
            return ;
        }

        editor.minder.exportData(exportType).then(function(content){
            var blob = new Blob([content]);
			switch(exportType){
				case 'json':
					break;
				case 'png':
					var arr = content.split(','), mime = arr[0].match(/:(.*?);/)[1],
					  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
					while (n--) {
					  u8arr[n] = bstr.charCodeAt(n);
					}
					blob = new Blob([u8arr], {type: mime});
					break;
				default:
					break;
            }
			var url = URL.createObjectURL(blob);
            var aLink = $("#downloadlink")[0];
			aLink.href = url;
            aLink.download = $('#node_text1').text() + '.' + dval;
            aLink.click();
        });

    });

    $("#fileInput").on('change', function(e) {
        var $this = $(this);
        var file = $this[0].files[0];
        var fileType = file.name.substr(file.name.lastIndexOf('.') + 1);
        switch(fileType){
            case 'md':
                fileType = 'markdown';
                break;
            case 'km':
            case 'json':
                fileType = 'json';
                break;
            default:
                alert('只支持.km、.md、.json文件');
                return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = reader.result;
            editor.minder.importData(fileType, content).then(function(data){
                $(fileInput).val('');
            });
        }
        reader.readAsText(file);
    });

})();