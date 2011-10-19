/*
	Project: JsExp
	File: js/customMultipleSelect_radio.js
	Last edited: October 19, 2011, 8:12 am
	Author : Vetri

*/


var obj = {
    init: function () {

        this.select = $('.mulSel'); // the select box should have class mulSel
        this.selectValues = $('.mulSel')[0].options; //select the options
        this.selectTexts = [];
		/****************************Configuration***********************/
        this.grid = 2;  // configure grid here  - you can have 1 or 2)
		this.theme = $('.theme input:radio:checked').val();//configure theme you can have select1 or select2)
		
		$('.theme input:radio').bind('change',function(){
				$("#msg").parent().removeClass().addClass(this.value);
		});
		
        for (var i = 0; i < this.selectValues.length; i++) {
            this.selectTexts.push(this.selectValues[i].text);
        }
        this.buildCustomSelect();

	},
    buildCustomSelect: function () {// builds the pseudo select box

		this.firstWave = '<div class="'+this.theme+'"><div class="customSelect bloc"><div class="selectCustom"><div class="defMsg">Click here ...</div></div><div class="clear"></div><div class="restAll"><ul>';
        this.restWave = [];
        for (var i = 0; i < this.selectTexts.length; i++) {
            this.restWave.push('<li><input type="radio" name=	"' + this.selectTexts[i] + '" id="' + i + '"/><label for="' + i + '"/>' + this.selectTexts[i] + '</label></li>');
        }
        this.endList = '</ul></div></div><div id="msg"></div><div class="infoMsg">Deselect by clicking on the selected info blocks on top not on radio</div></div>';
        this.wholeBread = [this.firstWave, this.restWave.join(' '), this.endList];
        this.wholeBreadText = this.wholeBread.join(' ');
        this.printHere();
		
    },
    printHere: function () {

		this.select[0].style.display = 'none';
        this.parentElem = this.select[0].parentNode;
        this.sibling = document.createElement("div");
        this.sibling.innerHTML = this.wholeBreadText;
        this.parentElem.appendChild(this.sibling);
		$("#msg").hide();
        $(".restAll").hide();
        $(".infoMsg").hide();
        if (this.grid === 2) {
            $(".restAll ul li:even").addClass("floater");
        } else {
            $(".restAll ul li:even").removeClass("floater");
        }
        $(".defMsg").mousedown(function () {
            $(".restAll").toggle("slow");
        });
        this.counter = 0;
        this.doHere();

    },
    doHere: function () {
       
        this.radio = $(".restAll input:radio");
        for (var i = 0; i < this.radio.length; i++) {
            $(this.radio[i]).bind('change', (function (i) {
                return function () {
                    if (this.checked == true) {
                        this.optVal = $($(".restAll input:radio")[i]).attr('id');
                        $(".selectCustom").append('<div class="opt" id="' + this.optVal + '">' + this.name + '<span class="close">x</span></div>');
						$(".mulSel")[0].options[i].selected = true; //selects the actual select box which is hidden
                        $(".selectCustom>div.opt").live('click', function () {
                            $(this).remove();
                            this.sp = $(this).attr('id');
                            $($(".restAll input:radio")[this.sp]).attr('checked', false);
							$(".mulSel")[0].options[this.sp].selected = false; 
                            obj.count("live");
                        });
                        obj.count();

                    }
                }
            })(i));
        }

    },
    count: function (arg) {

        this.counter = $(".restAll input:checked").length;
        if (arg === "live") {
            if (this.counter < 3 && this.counter !== 0) {
                $("#msg").hide('slow');
            } else if (this.counter === 0) {
                $(".defMsg").show('slow');
                $(".restAll").hide();
                $(".infoMsg").hide();
            }
        }
        if (this.counter === 3) {
            this.show();
        } else if (this.counter > 3) {
            $("#msg").hide('slow');
        } else if (this.counter === 1) {
            $(".defMsg").hide('slow');
            $(".infoMsg").show('slow');
        };

    },
    show: function () {

		$("#msg").text("You have seleced three options").show("slow");
		
    }
};

$(document).ready(function () {
    obj.init();
});