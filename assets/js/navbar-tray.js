
    $(document).ready(function(){
    // SUBLINK DRAWER FUNCTIONALITY ON SERVICES NAV SECTION

      var buttonSwitch = true;
      $(".services-button2").click(function(){
        // $(this).css("transform",(buttonSwitch) ? "rotate(45deg)" : "rotate(0deg)");
        $(".sub-links").css("display",(buttonSwitch) ? "block" : "none");
        buttonSwitch ? (buttonSwitch = false) : (buttonSwitch = true);
      })

    //


  })//end of jQuery scripts
