$(document).ready(function() {  

  $('div.addSection').on('click',function() {
    var height = $(this).css("height");
    var child = '<div class="form" style="height:'+ height + ';">'+
			'<select>' +
			  '<option>hola</option>' +
			  '<option>hola</option>' +
			'</select>' +
		'</div>'+
		'<div class="delete" style="height:' + height + '"></div>';
    $(this).text("d");
    $(this).html(child)
  });


})
