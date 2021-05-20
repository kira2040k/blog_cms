function auth() {
  var xhttp = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (password == "") alert("set  password");
  if (username == "") alert("set username");
  xhttp.open("POST", "", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`username=${username}&password=${password}`);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.responseText);
      document.cookie = `token=${res.accessToken}`;
      window.location.replace("/admin_panel");
    } else {
      document.getElementById("login_status").className = "isa_error";
      document.getElementById("login_status").innerHTML =
        "username or password is incorrect";
    }
  };
}
