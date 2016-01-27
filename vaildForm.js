;(function($){
	$.fn.validForm = function(a){
		var defaults = {
			src: [],
			errorType: 'alert' // alert or html(please set .err_box > .err_msg)
		}
		var b = $.extend({}, defaults, a);
		return this.each(function(){
			var $form = $(this), src = b.src, errorType = b.errorType, errorMsgArr = [];

			function init(){
				if($form.length>0){
					$form.on('submit',validForm);
				}else{
					console.log("form not found ...");
				}
			}

		    function validForm(event){
		        var isError = 0, $ele_focus;

		        errorMsgArr = [];
		       
		        $.each(src, function(i,v){
		            var $eles = v.name.split('|'),
		            valid = v.valid.split('|'),
		            msg = v.errMsg.split('|'),
		            $ele,_error;

		            for(var j= 0,len= $eles.length; j<len; j++){
		                $ele= $form.find("[name='"+$eles[j]+"']"); 
		                if($ele.length===0 || $ele.prop('disabled')===true){continue;}
		                _error= validFields($ele, valid, msg);                
		                if(_error>0){
		                    isError+=_error;
		                    if(!$ele_focus){$ele_focus=$ele;}
		                }
		            }
		        });
		        if(isError>0){
		            $ele_focus.focus();
		            if(errorType==='alert'){
		            	var msg= errorMsgArr.join('\n');
		            	alert(msg);
		            }
		        }
		        return (isError===0)?true: event.preventDefault() && false;
		    }

		    function isTrim(str){
		        return (str === null || str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === '')?true: false;
		    }

		    function isEmail(email){
		        return /^\w.+@\w.+\.\w{2,3}$/.test(email);
		    }

		    function isTel(tel){
		        return /^[\d-]{6,15}/.test(tel);
		    }

		    function isDate(date){
		        return /^\d{4}[-\/]\d{2}[-\/]\d{2}/.test(date); 
		    }

		    function isNumber(num){
		        return /^\d+$/.test(num)
		    }
		    function maxlength(str, number){
		    	return (str.length<=number);
		    }
		    function minlength(str, number){
		    	return (str.length>=number);
		    }
		    function validType(type, $ele, val){
		    	var _type= type.split(':'), n;
		    	if(_type.length===2){
		    		type= _type[0];
		    		n= _type[1];
		    	}
		        switch(type){
		            case 'trim':
		                return !isTrim(val);
		            case 'email':
		                return isEmail(val);
		            case 'checked':
		                return $ele.is(':checked');
		            case 'tel':
		                return isTel(val);
		            case 'date':
		                return isDate(val);    
		            case 'number':
		                return isNumber(val);
	                case 'max':
	                	return maxlength(val, n);
                	case 'min':
	                	return minlength(val ,n);
		            default:
		                return false;
		        }        
		    }

		    function validFields($ele, valid, msg){
		        var _error= 0;
		        for(var i=0, len= valid.length; i<len; i++){
		            if(!validType(valid[i], $ele, $ele.val()) && msg[i]){
		            	if(errorType==='alert'){
		            		errorMsgArr.push(msg[i]);
		            	}else{
		            		showErrMsg($ele, msg[i]);
		            	}		                
		                _error++;
		                break;
		            }
		       }       
		       return _error;
		    }

		    function showErrMsg($ele, msg){        
		        $ele.parents('.err_box').find('.err_msg').html(msg).show();          
		        if($ele.attr('type')==='text'){
		            $ele.addClass('err_border').parents('label').addClass('err_label');
		        }
		    }

		    function hideErrMsg($ele){
		        $ele.parents('.err_box').find('.err_msg').hide();
		        if($ele.attr('type')==='text'){
		            $ele.removeClass('err_border').parents('label').removeClass('err_label');
		        }
		    }

		    function findSrcNameIndex(v){
		        var arr=$.map(src, function(eles){
		            return eles.name;
		        });
		        var index=-1,j;
		        for(var i=0,len=arr.length; i<len; i++){
		            j= arr[i].indexOf(v);
		            if(j>=0){index= i;break;}
		        }
		        return index;
   			}  

		    init();
		});
	}
})(jQuery);