$(document).ready(function() {  
  sectionFunctionality()
})



function sectionFunctionality() {
  $('div.addSection').on('click',function() {
      var sections = ['Text','Image','Video','HTML'];
      var height = $(this).css("height");

      var child = sectionGenerator(sections,height);

      if(this.getAttribute('class') == 'addSection') {
          $(this).text('');
          $(this).attr('class','chooseContent');
          $(this).html(child);
	  //this.querySelector('.container:first-child').id = 'selectedContainer';
	  $(this).append(sectionGenerator(['Title','Subtitle','Paragraph'],height/2));
	  $(this).append('<textarea style="resize:none;padding:0px;margin:20px;width:calc(100% - 40px);height:200px;"></textarea>');
      }

      $('div.container').on('click',function() {
	  this.parentNode.querySelectorAll('.container').forEach(function(d) {
	    d.id = '';
	  });
	  this.id = 'selectedContainer';
      });


      $('div#undo').on('click',function() {
          $(this.parentNode.parentNode.parentNode)
	      .html('<div class="addSection">&oplus;</div>');

          sectionFunctionality();
      });

  });
};


function sectionGenerator(sections,height) {

      var width = String(100 / sections.length) + '%';
      var containerStyle = 'style="height:'+ '100%' +';width:'+ width +
							';display:table-cell;"';

      var sectionContainer = sections.map(function(d,i) {
	  var id = i == 0 ? 'id="selectedContainer" ' : '';
	  var str_ = '<div '+ id + containerStyle +' class="container">'+ d +'</div>';
	  return str_;
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

      return child;
}
