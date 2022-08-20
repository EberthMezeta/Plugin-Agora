const USER_INPUT = document.getElementById("id_usuario");
const PASSWORD_INPUT = document.getElementById("id_password");
const TITLE_INPUT = document.getElementById("id_title");
const DESCRIPTION_INPUT = document.getElementById("id_description");
const COMMENT_INPUT = document.getElementById("id_comment");

const USERNAME_CONTAINER = document.getElementById("fitem_id_usuario");
const PASSWORD_CONTAINER = document.getElementById("fitem_id_password");
const LOGIN_BTN_CONTAINER = document.getElementById("fitem_id_loginBTN");
const LOGOUT_BTN_CONTAINER = document.getElementById("fitem_id_logoutBTN");

const FILE_PICKER_CONTAINER = document.getElementById("fitem_id_userfile");
const TITLE_CONTAINER = document.getElementById("fitem_id_title");
const DECRIPTION_CONTAINER = document.getElementById("fitem_id_description");
const COMMENT_CONTAINER = document.getElementById("fitem_id_comment");
const SUBMIT_BTN_CONTAINER = document.getElementById("fitem_id_submitBTN");

const LOGIN_BTN = document.getElementById("id_loginBTN");
const LOGOUT_BTN = document.getElementById("id_logoutBTN");

var access_token = "";

LOGOUT_BTN_CONTAINER.style.display = "none";
FILE_PICKER_CONTAINER.style.display = "none";
TITLE_CONTAINER.style.display = "none";
DECRIPTION_CONTAINER.style.display = "none";
COMMENT_CONTAINER.style.display = "none";
SUBMIT_BTN_CONTAINER.style.display = "none";

LOGIN_BTN.addEventListener("click", () => {
  //Logica del servicio

  loginService();
});

LOGOUT_BTN.addEventListener("click", () => {
  //cerrar sesion

  logoutService();
});

const loginService = async () => {
  try {
    let username = USER_INPUT.value;
    let password = PASSWORD_INPUT.value;

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(
      "http://localhost/moodle4/blocks/simplehtml/services/login.php",
      {
        method: "POST",
        body: formData,
      }
    );
    let data = await response.json();

    console.log(data);

    console.log(data["access_token"]);

    access_token = data["access_token"];

    if (!data["status"]) {
      return;
    }

    hideLoginForm();
  } catch (error) {
    console.log(error);
  }
};

const logoutService = async () => {
  try {
    console.log(access_token);

    let formData = new FormData();

    formData.append("access_token", access_token);

    const response = await fetch(
      "http://localhost/moodle4/blocks/simplehtml/services/logout.php",
      {
        method: "POST",
        body: formData,
      }
    );

    let data = await response.json();
    console.log(data);

    if (!data["status"]) {
      return;
    }

    showLoginForm();
  } catch (error) {
    console.log(error);
  }
};

const hideLoginForm = async () => {
  USERNAME_CONTAINER.style.display = "none";
  PASSWORD_CONTAINER.style.display = "none";
  LOGIN_BTN_CONTAINER.style.display = "none";

  LOGOUT_BTN_CONTAINER.style.display = "";
  FILE_PICKER_CONTAINER.style.display = "";
  TITLE_CONTAINER.style.display = "";
  DECRIPTION_CONTAINER.style.display = "";
  COMMENT_CONTAINER.style.display = "";
  SUBMIT_BTN_CONTAINER.style.display = "";

  USER_INPUT.value = "";
  PASSWORD_INPUT.value = "";
  TITLE_INPUT.value = "";
  DESCRIPTION_INPUT.value = "";
  COMMENT_INPUT.value = "";
};

const showLoginForm = async () => {
  USERNAME_CONTAINER.style.display = "";
  PASSWORD_CONTAINER.style.display = "";
  LOGIN_BTN_CONTAINER.style.display = "";

  LOGOUT_BTN_CONTAINER.style.display = "none";
  FILE_PICKER_CONTAINER.style.display = "none";
  TITLE_CONTAINER.style.display = "none";
  DECRIPTION_CONTAINER.style.display = "none";
  COMMENT_CONTAINER.style.display = "none";
  SUBMIT_BTN_CONTAINER.style.display = "none";

  USER_INPUT.value = "";
  PASSWORD_INPUT.value = "";
  TITLE_INPUT.value = "";
  DESCRIPTION_INPUT.value = "";
  COMMENT_INPUT.value = "";
};
