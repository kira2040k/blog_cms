function send() {
  let blog_title = document.getElementById("blog_title").value;
  let des = document.getElementById("des").value;
  let subject_title = document.getElementById("subject_title").value;
  let content = document.getElementById("content").value;
  let username = document.getElementById("username").value;
  let platform = document.getElementById("platform").value;
  if (blog_title == "") alert("set  blog title");
  if (des == "") alert("set description");
  if (subject_title == "") alert("set subject title");
  if (content == "") alert("set content");
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(
    `blog_title=${blog_title}&des=${des}&subject_title=${subject_title}&content=${content}&username=${username}&platform=${platform}`
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      let status = res.status;
      if (!status) {
        document.getElementById("status").className = "isa_error";
        document.getElementById("status").innerHTML = "error try again";
      }
      if (status) {
        document.getElementById("status").className = "isa_success";
        document.getElementById("status").innerHTML = "posted successfully";
      }
    } else {
      document.getElementById("status").className = "isa_error";
      document.getElementById("status").innerHTML = "try again";
    }
  };
}
