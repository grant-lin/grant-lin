$(document).ready(function(){
  console.log('working');

    //tell the sumbit event to not perform the default behavoirs.
  
      var _name = $('#name');
      console.log(_name);

      _name.setCustomValidity('Need your name bro!');
      
      _name.addEventListener('input', function () {
      // Note: if (this.checkValidity()) won't work
      // as setCustomValidity('with a message') will set
      // the field as invalid.
        console.log('input addEventListener is working');
        if (this.val().trim() === '') {
          console.log('checking if field is empty');
          this.setCustomValidity('Need your email bro!');
        }
        else {
          this.setCustomValidity('');
        }
      }, false);

      _name.addEventListener('invalid', function () {
        if (this.val().trim() !== '') {
          this.setCustomValidity("'" + this.value + "' is not a valid email bro!");
        }
      }, false);

});