$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
        //Button Click (Add)
        $("#button").click(function(){
            var tb_name = document.getElementById("tb_name").value;

            if(tb_name){
                $('ol').append('<li id="'+ generateUUID() + '" class=""> <input name="done-todo" type="checkbox" class="done-todo"> <span>' + document.getElementById("tb_name").value + ' </span> </li>');
                document.getElementById("tb_name").value = "";
                filterData();
            }
        }); 

        //Select Filter
        $("#filters").on('click','li', function(){
            
            //change the active button
            document.getElementsByClassName("selected")[0].className = "";
            $(this).children('a').addClass('selected');

            //filter data
            filterData();
        });

        //Double Click (Rename)
        $("#ol_item").on('dblclick','span', function(){
            this.setAttribute('contenteditable','true');
            this.setAttribute('focus','true');
        });

        // Out of focus
        $("#ol_item").on('focusout','span', function(){
            this.setAttribute('focus','false');
            this.setAttribute('contenteditable','false');
        });

        //Checkbox checked
        $('body').on('click', '.done-todo', function(){
            if (this.checked) 
              $(this).closest("li").addClass("checked")
             else 
              $(this).closest("li").removeClass("checked")

            filterData();
        });
    });

    function filterData(){
        var temp_id = document.querySelector('.selected').id;

        $('#ol_item li').each(function(){
            if(temp_id == "all"){
                this.hidden = false;
            } else if (temp_id == "active") {
                if(this.childNodes[1].checked){
                    this.hidden = true;
                } else {
                    this.hidden = false;
                }
            } else if (temp_id == "complete") {
                if(!this.childNodes[1].checked){
                    this.hidden = true;
                } else {
                    this.hidden = false;
                }
            }
        });
    }