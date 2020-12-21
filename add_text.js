    (function() {
      var httpRequest;
      httpRequest       = new XMLHttpRequest();
      httpRequestIntro  = new XMLHttpRequest();
      httpRequestInstr  = new XMLHttpRequest();

      if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
      }

      httpRequest.onreadystatechange      = setContents;
      httpRequestIntro.onreadystatechange = setContentsIntro;
      // httpRequestInstr.onreadystatechange = setContentsInstr;

      //Open then send the request to your page
      httpRequest.open('GET', "https://misc.lmta.lt/junctions/files/texts/content_text.txt");
      httpRequest.send();

      httpRequestIntro.open('GET', "https://misc.lmta.lt/junctions/files/texts/intro.txt");
      httpRequestIntro.send();

      httpRequestInstr.open('GET', "https://misc.lmta.lt/junctions/files/texts/instrukcija.txt");
      httpRequestInstr.send();
       

      function setContents() {
       if (httpRequest.readyState === XMLHttpRequest.DONE) {
         if (httpRequest.status === 200) {
          //Set the contents of your p tag
           document.getElementById("content_text").innerHTML = httpRequest.responseText;
          } else {
           alert('There was a problem with the request.');
          }
        }
      }

      function setContentsIntro() {
       if (httpRequestIntro.readyState === XMLHttpRequest.DONE) {
         if (httpRequestIntro.status === 200) {
          //Set the contents of your p tag
           document.getElementById("content_text_intro").innerHTML = httpRequestIntro.responseText;
           document.getElementById("content_text_intro_left").innerHTML = httpRequestIntro.responseText;
          } else {
           alert('There was a problem with the request.');
          }
        }
      }

      // function setContentsInstr() {
      //  if (httpRequestInstr.readyState === XMLHttpRequest.DONE) {
      //    if (httpRequestInstr.status === 200) {
      //     //Set the contents of your p tag
      //      // document.getElementById("instructions_text").innerHTML = httpRequestInstr.responseText;
      //      document.getElementById("instructions_text_left").innerHTML = httpRequestInstr.responseText;
      //     } else {
      //      alert('There was a problem with the request.');
      //     }
      //   }
      // }

    })(); 