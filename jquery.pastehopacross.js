/**
 * PasteHopAcross jquery plugin
 * Paste across multiple inputs plugin, 
 * inspired by http://jsfiddle.net/D7jVR/
 */
(function ($) {
    jQuery.fn.pastehopacross = function(opts){ 
       if (!opts){ opts = {} }
        if (!opts.regexRemove){
            opts.regexRemove = false;   
        }
        if (!opts.inputs){
           opts.inputs = [];   
        }
        if (opts.inputs.length == 0){
            //return 
            return $(this);   
        }
 
        if (!opts.first_maxlength){
            opts.first_maxlength = $(this).attr('maxlength');
            if (!opts.first_maxlength){
                return $(this);
            }
        }
        
       $(this).on('paste', function(){
      
           //remove maxlength attribute
           $(this).removeAttr('maxlength'); 
           $(this).one("input.fromPaste", function(){
               var $firstBox = $(this);

                var pastedValue = $(this).val();
                if (opts.regexRemove){
                     pastedValue = pastedValue.replace(opts.regexRemove, "");
                }
               
                var str_pv = pastedValue;
                $(opts.inputs).each(function(){
                    var pv = str_pv.split('');
                    var maxlength;
                    if ($firstBox.get(0) == this){
                       maxlength = opts.first_maxlength;   
                    }else{
                       maxlength = $(this).attr('maxlength'); 
                    }
                    if (maxlength == undefined){
                        //paste them all!
                        maxlength = pv.length;   
                    }
                    //clear the value
                    $(this).val('');
                    var nwval = '';           
                    for (var i = 0; i < maxlength; ++i){
                        if (typeof(pv[i]) != 'undefined'){
                           nwval += pv[i];
                        }
                    }
                    $(this).val(nwval);
                    //remove everything from earlier
                    str_pv = str_pv.substring(maxlength);
                });
               
                //restore maxlength attribute
                $(this).attr('maxlength', opts.first_maxlength);
            });    
           
       });
       
       return $(this);
    }
})(jQuery);
