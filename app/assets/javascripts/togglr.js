$(window).load(function() {

 /* Variables
  * ======================= */
  var allowed_char_count = 140;
  var prefix_msg_on = "ON: ";
  var prefix_msg_off = "OFF: ";
  var prefix_msg = prefix_msg_on;
  var postfix_msg = " #togglr http://bit.ly/togglrnow";
  var default_msg = "I just toggled!";
  var span_count_left = $("#count_left");
  var textarea_optional_message = $("#optional_message");

 /* Toggle
  * ======================= */
  var toggle_demo = $('.toggle_demo :checkbox').iphoneStyle({
	checkedLabel: 'ON', 
	uncheckedLabel: 'OFF',
    onChange: function(elem, value) {
	  var status;
      if (value) status = "I'm at work now.";
      else status = "Today, it's day off.";
      $('div#status').html(status);
    }
  });
  setInterval(function() {
    toggle_demo.prop('checked', !toggle_demo.is(':checked')).iphoneStyle("refresh");
    return
  }, 4000);
	
  var toggle = $('.toggle :checkbox').iphoneStyle({
	checkedLabel: 'ON', 
	uncheckedLabel: 'OFF',
    onChange: function(elem, value) {
	  var status;
      if (value) {
	    status = "Okay. Do your best!";
	    prefix_msg = prefix_msg_on;
	  }
      else {
	    status = "Just relax. Take it easy...";
	    prefix_msg = prefix_msg_off;
	  }
      $('span#toggle_message').html(status);
	  calculateCharLeft();
    }
  });
	
 /* Message Character Count
  * ======================= */
  function calculateCharLeft() {
    var counter = textarea_optional_message.val().length;
    var existing = prefix_msg.length + counter + postfix_msg.length;
    var left = allowed_char_count - existing;

    if(left < 0){
      span_count_left.css("color","#b94a48");
    }
    else if(left < 25){
      span_count_left.css("color","#c09853");
    }
    else {
	  span_count_left.css("color","#bfbfbf");
	}
    span_count_left.text(left);
  }

  $(function () {
	if (toggle.is(':checked')) prefix_msg = prefix_msg_on;
	else prefix_msg = prefix_msg_off;
	calculateCharLeft();
	
    textarea_optional_message.keyup(function(){ calculateCharLeft(); });
    textarea_optional_message.change(function(){ calculateCharLeft(); });
  });
	
/* Sending Message
 * ======================= */
  function startLoading() {	
	$("#success").hide();
	$("#error").hide();
	
    // pre process
    $("#error").hide();
	toggle.attr("disabled", true).iphoneStyle("refresh");
	textarea_optional_message.attr("disabled", true);
	$("#send").attr("disabled", true);
	  
	// start loading
	$("#message_form").activity();
  }

  function stopLoading(is_error) {	
	  // stop loading
	  $("#message_form").activity(false);
	
	  // post process	
	  if (is_error) {
		$("#success").hide();
	    $("#error").show();
	  }
	  else {
		$("#success").show();
	    $("#error").hide();
	  }
	  toggle.removeAttr("disabled").iphoneStyle("refresh");
	  textarea_optional_message.removeAttr("disabled");
	  $("#send").removeAttr("disabled");
  }

  $(function() {
	$("#success").hide();
	$("#error").hide();
	
    $("#send").click(function() {
	  startLoading();
	
	  // message
	  var post_message = prefix_msg;
	  if (textarea_optional_message.val().length > 0) post_message += textarea_optional_message.val();
	  else post_message += default_msg;
	  post_message += postfix_msg;
	  
	  // post
	  var data = "msg=" + post_message + "&toggle=" + (toggle.is(':checked') ? "on" : "off");
	  $.ajax({
	    type: "POST",
	    url: "/tweet",
	    data: data,
	    success: function(obj) {
		  stopLoading(false);
		  $('#trends').html(obj.html_trends);
		  $('#your_toggle').html(obj.html_your_toggle);
	    },
	    error: function() {
		  stopLoading(true);
		}
	  });
	  return false;
    });
  });

});
