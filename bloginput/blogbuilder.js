$(document).ready(function() {  
  sectionFunctionality()
})



function sectionFunctionality() {
  $('div.addSection').on('click',function() {
    var sections = ['Text','Image','Video','HTML'];

    var width = String(100 / sections.length) + '%';
    var height = $(this).css("height");
    var containerStyle = 'style="height:'+ '100%' +';width:'+ width +
							';display:table-cell;"';

    var sectionContainer = sections.map(function(d) {
	return '<div '+ containerStyle +' class="container">'+ d +'</div>'
    }).join('');

    var child = '<div style="display:table;width:100%;height:'+ height +'">' +
		  '<div style="height:100%;display:table-cell;width:calc(100% - '
								      + height + ')">'+
			'<div style="display:table;width:100%;height:100%;">' +
				sectionContainer +
			'</div>' +
		  '</div>' +
		  '<div id="undo" style="background:red;display:table-cell;width:'
									+ height +'">'+
		  '</div>' +
	        '</div>';

    $(this).text('');
    $(this).attr('class','chooseContent');
    $(this).html(child);

    $('div#undo').on('click',function() {
      this.parentNode.parentNode.parentNode
	      .innerHTML = '<div class="addSection">&oplus;</div>';

      sectionFunctionality();
    });

  });
}
